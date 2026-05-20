import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    fetchProductById, createProduct, updateProduct, fetchCategories, uploadImage
} from '../../services/productService';
import { Loader2, ArrowLeft, Save, Package, DollarSign, Boxes, Image, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFileUrl } from '../../lib/utils';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    // Form state
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [brand, setBrand] = useState('');
    const [sku, setSku] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [partType, setPartType] = useState('Aftermarket');
    const [carCompatibilities, setCarCompatibilities] = useState([]);
    const [compatibleVINs, setCompatibleVINs] = useState('');

    // Local states for adding compatibility item
    const [compatBrand, setCompatBrand] = useState('');
    const [compatModel, setCompatModel] = useState('');
    const [compatYear, setCompatYear] = useState('');

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Load categories for dropdown
    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await fetchCategories();
                setCategories(data);
            } catch (_) {}
        };
        load();
    }, []);

    // Load product for edit
    useEffect(() => {
        if (isEditMode) {
            const load = async () => {
                try {
                    const { data } = await fetchProductById(id);
                    setName(data.name);
                    setCategoryId(data.category?._id || '');
                    setPrice(data.price);
                    setDescription(data.description);
                    setStock(data.stock);
                    setImageUrl(data.imageUrl);
                    setBrand(data.brand);
                    setSku(data.sku || '');
                    setIsActive(data.isActive);
                    setPartType(data.partType || 'Aftermarket');
                    setCarCompatibilities(data.carCompatibilities || []);
                    setCompatibleVINs((data.compatibleVINs || []).join(', '));
                } catch (err) {
                    setError(err.response?.data?.message || err.message);
                } finally {
                    setLoading(false);
                }
            };
            load();
        }
    }, [id, isEditMode]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        if (!categoryId) {
            setError('Vui lòng chọn danh mục');
            return;
        }
        try {
            setSaving(true);
            const payload = {
                name,
                category: categoryId,
                price: Number(price),
                description,
                stock: Number(stock),
                imageUrl,
                brand,
                sku: sku || undefined,
                isActive,
                partType,
                carCompatibilities,
                compatibleVINs,
            };
            if (isEditMode) {
                await updateProduct(id, payload);
            } else {
                await createProduct(payload);
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setSaving(false);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const res = await uploadImage(formData);
            setImageUrl(res.data.image);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <div className="animate-fade-in pb-12 max-w-4xl mx-auto text-white/90">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" asChild className="bg-transparent border-slate-700 text-white hover:bg-slate-800">
                    <Link to="/admin/products">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {isEditMode ? 'Cập nhật thông tin sản phẩm' : 'Điền đầy đủ thông tin sản phẩm'}
                    </p>
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6 bg-red-950/30 border-red-900/50 text-red-400">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submitHandler} className="space-y-6">
                {/* Basic Info */}
                <Card className="bg-[#18181b] border-slate-800 shadow-xl shadow-black/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2 text-base">
                            <Package size={16} /> Thông tin cơ bản
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        {/* Name */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="name" className="text-slate-300">
                                Tên sản phẩm <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="VD: Lọc dầu động cơ Toyota"
                                required
                                className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label className="text-slate-300">
                                Danh mục <span className="text-red-400">*</span>
                            </Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger className="bg-[#09090b] border-slate-700 text-white">
                                    <SelectValue placeholder="– Chọn danh mục –" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181b] border-slate-700 text-white">
                                    {categories.map((cat) => (
                                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Brand */}
                        <div className="space-y-2">
                            <Label htmlFor="brand" className="text-slate-300">
                                Thương hiệu <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="VD: Bosch, Toyota, Denso"
                                required
                                className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600"
                            />
                        </div>

                        {/* SKU */}
                        <div className="space-y-2">
                            <Label htmlFor="sku" className="text-slate-300">SKU (tuỳ chọn)</Label>
                            <Input
                                id="sku"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                placeholder="VD: TOY-OIL-001"
                                className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description" className="text-slate-300">
                                Mô tả <span className="text-red-400">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mô tả chi tiết về sản phẩm..."
                                required
                                className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Inventory */}
                <Card className="bg-[#18181b] border-slate-800 shadow-xl shadow-black/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2 text-base">
                            <DollarSign size={16} /> Giá & Tồn kho
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-slate-300">
                                Giá (VNĐ) <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="1000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="bg-[#09090b] border-slate-700 text-white"
                            />
                            {price > 0 && (
                                <p className="text-xs text-slate-500">{Number(price).toLocaleString('vi-VN')}₫</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock" className="text-slate-300 flex items-center gap-2">
                                <Boxes size={14} /> Số lượng tồn kho <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="stock"
                                type="number"
                                min="0"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                                className="bg-[#09090b] border-slate-700 text-white"
                            />
                            {stock <= 5 && stock >= 0 && (
                                <p className="text-xs text-red-400">⚠️ Tồn kho thấp!</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Vehicle Fitment & Part Classification */}
                <Card className="bg-[#18181b] border-slate-800 shadow-xl shadow-black/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2 text-base">
                            Tương thích xe & Phân loại
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Part Origin classification */}
                        <div className="space-y-2">
                            <Label className="text-slate-300">Phân loại phụ tùng (Origin Type)</Label>
                            <Select value={partType} onValueChange={setPartType}>
                                <SelectTrigger className="bg-[#09090b] border-slate-700 text-white">
                                    <SelectValue placeholder="Chọn phân loại" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181b] border-slate-700 text-white">
                                    <SelectItem value="OEM">OEM (Linh kiện chính hãng gốc)</SelectItem>
                                    <SelectItem value="OES">OES (Linh kiện chính hãng thay thế)</SelectItem>
                                    <SelectItem value="Aftermarket">Aftermarket (Linh kiện của bên thứ ba)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Compatible VINs */}
                        <div className="space-y-2">
                            <Label htmlFor="compatibleVINs" className="text-slate-300">Danh sách số VIN tương thích (cách nhau bằng dấu phẩy)</Label>
                            <Textarea
                                id="compatibleVINs"
                                value={compatibleVINs}
                                onChange={(e) => setCompatibleVINs(e.target.value)}
                                placeholder="VD: J2CARTOYOTACAMRY, J2CARHONDACIVIC9"
                                rows={2}
                                className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600"
                            />
                        </div>

                        {/* Compatibility List & Form */}
                        <div className="border-t border-slate-800 pt-4 space-y-4">
                            <Label className="text-slate-300 block">Thêm đời xe tương thích</Label>
                            <div className="grid gap-3 grid-cols-1 md:grid-cols-4 items-end bg-[#09090b]/50 p-4 border border-slate-800 rounded-sm">
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-slate-400">Hãng xe</Label>
                                    <Input
                                        value={compatBrand}
                                        onChange={(e) => setCompatBrand(e.target.value)}
                                        placeholder="VD: Toyota"
                                        className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-slate-400">Dòng xe</Label>
                                    <Input
                                        value={compatModel}
                                        onChange={(e) => setCompatModel(e.target.value)}
                                        placeholder="VD: Camry"
                                        className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-slate-400">Năm sản xuất</Label>
                                    <Input
                                        type="number"
                                        value={compatYear}
                                        onChange={(e) => setCompatYear(e.target.value)}
                                        placeholder="VD: 2020"
                                        className="bg-[#09090b] border-slate-700 text-white placeholder:text-slate-600 text-xs"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        if (!compatBrand || !compatModel || !compatYear) {
                                            alert('Vui lòng điền đủ thông tin hãng xe, dòng xe và năm sản xuất!');
                                            return;
                                        }
                                        const newItem = {
                                            carBrand: compatBrand.trim(),
                                            carModel: compatModel.trim(),
                                            carYear: Number(compatYear)
                                        };
                                        setCarCompatibilities([...carCompatibilities, newItem]);
                                        setCompatBrand('');
                                        setCompatModel('');
                                        setCompatYear('');
                                    }}
                                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs py-2 w-full border-slate-700"
                                >
                                    Thêm xe
                                </Button>
                            </div>

                            {/* Added list */}
                            {carCompatibilities.length > 0 && (
                                <div className="space-y-2 mt-4 max-h-48 overflow-y-auto border border-slate-800 p-2 rounded-sm custom-scrollbar">
                                    {carCompatibilities.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-[#09090b]/80 border border-slate-800 rounded px-3 py-2 text-xs">
                                            <span className="font-bold text-slate-200">
                                                {item.carBrand} {item.carModel} ({item.carYear})
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCarCompatibilities(carCompatibilities.filter((_, i) => i !== idx));
                                                }}
                                                className="text-red-400 hover:text-red-300 font-bold"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Image */}
                <Card className="bg-[#18181b] border-slate-800 shadow-xl shadow-black/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2 text-base">
                            <Image size={16} /> Hình ảnh
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">
                                Hình ảnh sản phẩm <span className="text-red-400">*</span>
                            </Label>
                            
                            <div className="flex items-center gap-4">
                                <Input
                                    type="file"
                                    id="image-product-upload"
                                    accept="image/*"
                                    onChange={uploadFileHandler}
                                    disabled={uploading}
                                    className="bg-[#09090b] border-slate-700 text-slate-300 file:bg-slate-800 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:hover:bg-slate-700 cursor-pointer"
                                />
                                {uploading && <Loader2 className="animate-spin text-slate-400" size={18} />}
                            </div>

                        </div>
                        {imageUrl && (
                            <div className="mt-4 relative inline-block">
                                <img
                                    src={getFileUrl(imageUrl)}
                                    alt="preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-slate-700 shadow-md"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <p className="text-xs text-slate-500 mt-1 truncate max-w-[128px]" title={imageUrl}>{imageUrl}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Status */}
                <Card className="bg-[#18181b] border-slate-800 shadow-xl shadow-black/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white">Hiển thị sản phẩm</p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {isActive ? 'Sản phẩm đang được hiển thị cho khách hàng' : 'Sản phẩm đang được ẩn'}
                                </p>
                            </div>
                            <Switch checked={isActive} onCheckedChange={setIsActive} />
                        </div>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-white text-black hover:bg-slate-200 font-semibold py-6 text-base"
                >
                    {saving ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang lưu...</>
                    ) : (
                        <><Save className="mr-2 h-5 w-5" /> {isEditMode ? 'Lưu thay đổi' : 'Tạo sản phẩm'}</>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ProductEdit;
