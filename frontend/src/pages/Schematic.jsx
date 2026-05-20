import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Info, ShoppingCart, Zap, RefreshCw, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Schematic = () => {
    const { addToCart } = useContext(CartContext);
    const [activeTab, setActiveTab] = useState('engine'); // 'engine', 'brake', 'suspension'
    const [selectedPartId, setSelectedPartId] = useState('oil-filter');
    const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
    const [addedCartAlert, setAddedCartAlert] = useState('');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Parts data
    const categoriesData = {
        engine: [
            {
                id: 'oil-filter',
                name: 'Lọc dầu động cơ',
                desc: 'Lọc các tạp chất, mạt kim loại trong dầu nhờn để bảo vệ động cơ hoạt động trơn tru.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 440, y: 390 },
                brands: [
                    { id: 'of-b1', name: 'Bosch Premium', price: 180000, stock: 15, brandName: 'Bosch' },
                    { id: 'of-b2', name: 'Denso Japan', price: 220000, stock: 8, brandName: 'Denso' },
                    { id: 'of-b3', name: 'Mann-Filter', price: 250000, stock: 12, brandName: 'Mann' }
                ]
            },
            {
                id: 'air-filter',
                name: 'Lọc gió động cơ',
                desc: 'Lọc sạch bụi bẩn trong không khí trước khi đưa vào buồng đốt, tăng công suất buồng nổ.',
                status: 'low-stock',
                statusText: 'Sắp hết hàng',
                hotspot: { x: 210, y: 380 },
                brands: [
                    { id: 'af-b1', name: 'K&N High-Flow', price: 850000, stock: 2, brandName: 'K&N' },
                    { id: 'af-b2', name: 'Wix Filters', price: 320000, stock: 3, brandName: 'Wix' },
                    { id: 'af-b3', name: 'Sakura Indonesia', price: 190000, stock: 1, brandName: 'Sakura' }
                ]
            },
            {
                id: 'spark-plugs',
                name: 'Bộ bugi đánh lửa (4 cái)',
                desc: 'Bugi tạo ra tia lửa điện để kích nổ hỗn hợp khí nén và nhiên liệu trong buồng xi-lanh.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 400, y: 260 },
                brands: [
                    { id: 'sp-b1', name: 'NGK Iridium IX', price: 960000, stock: 24, brandName: 'NGK' },
                    { id: 'sp-b2', name: 'Denso Iridium Power', price: 1100000, stock: 18, brandName: 'Denso' }
                ]
            },
            {
                id: 'belt',
                name: 'Dây curoa tổng',
                desc: 'Truyền động từ trục khuỷu động cơ tới máy phát điện, máy nén điều hòa và bơm nước làm mát.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 570, y: 310 },
                brands: [
                    { id: 'bt-b1', name: 'Bando Ribstar Japan', price: 420000, stock: 10, brandName: 'Bando' },
                    { id: 'bt-b2', name: 'Gates Micro-V', price: 480000, stock: 15, brandName: 'Gates' }
                ]
            },
            {
                id: 'coolant-tank',
                name: 'Bình chứa nước làm mát',
                desc: 'Lưu trữ nước giải nhiệt phụ và duy trì áp suất an toàn cho hệ thống két nước làm mát tuần hoàn.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 190, y: 160 },
                brands: [
                    { id: 'ct-b1', name: 'Toyota Genuine Parts', price: 550000, stock: 5, brandName: 'Toyota' },
                    { id: 'ct-b2', name: 'Meyle Germany', price: 380000, stock: 7, brandName: 'Meyle' }
                ]
            },
            {
                id: 'battery',
                name: 'Bình ắc quy ô tô',
                desc: 'Cung cấp năng lượng dòng cao khởi động động cơ xe và lưu trữ điện năng phụ tải phụ.',
                status: 'low-stock',
                statusText: 'Sắp hết hàng',
                hotspot: { x: 610, y: 150 },
                brands: [
                    { id: 'by-b1', name: 'GS Battery 12V 60Ah', price: 1650000, stock: 2, brandName: 'GS' },
                    { id: 'by-b2', name: 'Varta Silver Dynamic', price: 2450000, stock: 1, brandName: 'Varta' }
                ]
            },
            {
                id: 'thermostat',
                name: 'Van hằng nhiệt',
                desc: 'Van tự động đóng mở dựa trên nhiệt độ để điều phối dòng tuần hoàn két nước giải nhiệt động cơ.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 480, y: 190 },
                brands: [
                    { id: 'ts-b1', name: 'Tama Japan OEM', price: 290000, stock: 11, brandName: 'Tama' },
                    { id: 'ts-b2', name: 'Gates Thermostat', price: 340000, stock: 6, brandName: 'Gates' }
                ]
            }
        ],
        brake: [
            {
                id: 'brake-rotor',
                name: 'Đĩa phanh tản nhiệt (Cặp)',
                desc: 'Đĩa ma sát lớn chịu lực ép trực tiếp để chuyển động năng thành nhiệt năng dừng xe.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 400, y: 320 },
                brands: [
                    { id: 'br-b1', name: 'Brembo Carbon Coated', price: 3800000, stock: 6, brandName: 'Brembo' },
                    { id: 'br-b2', name: 'Bosch QuietCast Pair', price: 1950000, stock: 12, brandName: 'Bosch' }
                ]
            },
            {
                id: 'brake-pads',
                name: 'Bộ má phanh gốm ceramic',
                desc: 'Má phanh gốm chịu mài mòn cao, sinh ít bụi bẩn và chịu nhiệt độ hoạt động cực lớn.',
                status: 'low-stock',
                statusText: 'Sắp hết hàng',
                hotspot: { x: 375, y: 220 },
                brands: [
                    { id: 'bp-b1', name: 'Akebono ProACT', price: 1250000, stock: 2, brandName: 'Akebono' },
                    { id: 'bp-b2', name: 'Bendix Premium Metal', price: 850000, stock: 3, brandName: 'Bendix' }
                ]
            },
            {
                id: 'brake-caliper',
                name: 'Cùm phanh thủy lực (Caliper)',
                desc: 'Vỏ cùm chứa piston thủy lực trực tiếp đẩy má phanh áp chặt vào bề mặt đĩa phanh.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 470, y: 220 },
                brands: [
                    { id: 'bc-b1', name: 'Brembo Red Performance', price: 5400000, stock: 4, brandName: 'Brembo' },
                    { id: 'bc-b2', name: 'Nissin Japan OEM', price: 2800000, stock: 7, brandName: 'Nissin' }
                ]
            },
            {
                id: 'master-cylinder',
                name: 'Xy lanh phanh chính',
                desc: 'Bộ phận trung tâm chuyển đổi lực bàn đạp của tài xế thành áp suất dầu thủy lực.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 250, y: 450 },
                brands: [
                    { id: 'mc-b1', name: 'TRW Automotive Cyl', price: 1850000, stock: 8, brandName: 'TRW' },
                    { id: 'mc-b2', name: 'Aisin Japan Cylinder', price: 2100000, stock: 5, brandName: 'Aisin' }
                ]
            },
            {
                id: 'brake-fluid',
                name: 'Dầu phanh DOT 4',
                desc: 'Chất lỏng chịu áp cao truyền lực phanh, có khả năng hút ẩm tốt bảo vệ hệ thống đường ống phanh.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 230, y: 350 },
                brands: [
                    { id: 'bf-b1', name: 'Castrol DOT4 Fluid 1L', price: 250000, stock: 30, brandName: 'Castrol' },
                    { id: 'bf-b2', name: 'Liqui Moly Brake DOT4', price: 290000, stock: 25, brandName: 'Liqui Moly' }
                ]
            }
        ],
        suspension: [
            {
                id: 'shock-absorber',
                name: 'Bộ giảm chấn dầu (Cặp)',
                desc: 'Piston thụt triệt tiêu dao động đàn hồi tự do giúp lốp xe bám sát mặt đường khi di chuyển.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 400, y: 340 },
                brands: [
                    { id: 'sa-b1', name: 'Bilstein B6 Performance', price: 6800000, stock: 8, brandName: 'Bilstein' },
                    { id: 'sa-b2', name: 'KYB Excel-G Gas Shock', price: 3400000, stock: 14, brandName: 'KYB' }
                ]
            },
            {
                id: 'coil-spring',
                name: 'Lò xo cuộn thép giảm chấn',
                desc: 'Hấp thụ các va chạm đột ngột từ mặt gồ ghề và nâng đỡ toàn bộ trọng lực xe ổn định.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 400, y: 200 },
                brands: [
                    { id: 'cs-b1', name: 'Eibach Pro-Kit Springs', price: 4200000, stock: 6, brandName: 'Eibach' },
                    { id: 'cs-b2', name: 'Tein S-Tech Sport Coil', price: 3900000, stock: 10, brandName: 'Tein' }
                ]
            },
            {
                id: 'sway-bar-link',
                name: 'Thanh rô-tuyn cân bằng trước',
                desc: 'Hạn chế độ xoắn nghiêng thân xe khi bo cua tốc độ cao, giữ ổn định song song trục gầm.',
                status: 'low-stock',
                statusText: 'Sắp hết hàng',
                hotspot: { x: 500, y: 310 },
                brands: [
                    { id: 'sb-b1', name: 'Lemforder Germany Link', price: 750000, stock: 2, brandName: 'Lemforder' },
                    { id: 'sb-b2', name: '555 Japan Stabilizer', price: 480000, stock: 3, brandName: '555' }
                ]
            },
            {
                id: 'control-arm',
                name: 'Càng chữ A gầm xe dưới',
                desc: 'Liên kết bánh xe vào khung xe tạo vị trí chuyển động thẳng góc khi giảm xóc thụt lên xuống.',
                status: 'in-stock',
                statusText: 'Còn hàng',
                hotspot: { x: 300, y: 480 },
                brands: [
                    { id: 'ca-b1', name: 'Meyle Heavy Duty Pair', price: 2900000, stock: 5, brandName: 'Meyle' },
                    { id: 'ca-b2', name: 'CTR Korea Control Arm', price: 1800000, stock: 9, brandName: 'CTR' }
                ]
            }
        ]
    };

    // Get selected part details
    const activeParts = categoriesData[activeTab];
    const selectedPart = activeParts.find(p => p.id === selectedPartId) || activeParts[0];

    // Handle adding to cart using CartContext
    const handleAddToCart = (brandItem) => {
        const productObj = {
            _id: brandItem.id,
            name: `${selectedPart.name} (${brandItem.name})`,
            price: brandItem.price,
            stock: brandItem.stock,
            brand: brandItem.brandName || 'OES Brand',
            imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400' // General auto part placeholder
        };
        addToCart(productObj, 1);
        setAddedCartAlert(`Đã thêm ${productObj.name} vào giỏ hàng!`);
        setTimeout(() => setAddedCartAlert(''), 3000);
    };

    return (
        <div className={`schematic-page min-h-screen py-12 px-6 md:px-12 transition-colors duration-500 ${
            theme === 'dark' ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Custom Theme Variables injection */}
            <style dangerouslySetInnerHTML={{__html: `
                .schematic-theme-container {
                    --bg-panel: ${theme === 'dark' ? '#1e293b' : '#ffffff'};
                    --bg-canvas: ${theme === 'dark' ? '#0b0f19' : '#ffffff'};
                    --border-line: ${theme === 'dark' ? '#334155' : '#e2e8f0'};
                    --text-title: ${theme === 'dark' ? '#f8fafc' : '#0f172a'};
                    --text-body: ${theme === 'dark' ? '#cbd5e1' : '#475569'};
                    --text-light: ${theme === 'dark' ? '#94a3b8' : '#64748b'};
                }
            `}} />

            <div className="schematic-theme-container max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
                            <span>Bản đồ kỹ thuật</span>
                            <span className="w-1 h-1 rounded-full bg-orange-500" />
                            <span>Đồ họa tương tác</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight" style={{ color: 'var(--text-title)' }}>
                            Sơ đồ hệ thống linh kiện xe
                        </h1>
                        <p className="text-sm font-medium mt-2" style={{ color: 'var(--text-body)' }}>
                            Chọn sơ đồ cụm hệ thống để tra cứu trực quan và xem tồn kho của từng phụ tùng phụ trợ.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Light / Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-3 rounded-full border transition-all duration-300 ${
                                theme === 'dark' 
                                    ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                            }`}
                            title="Đổi giao diện Sáng / Tối"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <Link
                            to="/shop"
                            className="px-6 py-3.5 bg-orange-500 text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:translate-y-[-1px] transition-all"
                        >
                            Quay lại cửa hàng
                        </Link>
                    </div>
                </div>

                {/* Toast Alert */}
                {addedCartAlert && (
                    <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm shadow-2xl animate-bounce">
                        {addedCartAlert}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex border-b mb-8" style={{ borderColor: 'var(--border-line)' }}>
                    <button
                        onClick={() => { setActiveTab('engine'); setSelectedPartId('oil-filter'); }}
                        className={`pb-4 px-6 font-black text-xs uppercase tracking-[0.15em] transition-all relative ${
                            activeTab === 'engine'
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : 'text-slate-400 hover:text-orange-400'
                        }`}
                    >
                        Khoang Động Cơ
                    </button>
                    <button
                        onClick={() => { setActiveTab('brake'); setSelectedPartId('brake-rotor'); }}
                        className={`pb-4 px-6 font-black text-xs uppercase tracking-[0.15em] transition-all relative ${
                            activeTab === 'brake'
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : 'text-slate-400 hover:text-orange-400'
                        }`}
                    >
                        Hệ Thống Phanh
                    </button>
                    <button
                        onClick={() => { setActiveTab('suspension'); setSelectedPartId('shock-absorber'); }}
                        className={`pb-4 px-6 font-black text-xs uppercase tracking-[0.15em] transition-all relative ${
                            activeTab === 'suspension'
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : 'text-slate-400 hover:text-orange-400'
                        }`}
                    >
                        Hệ Thống Treo
                    </button>
                </div>

                {/* Main Content Layout */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left: Interactive Canvas (2 columns) */}
                    <div className="lg:col-span-2 rounded-xl border p-6 flex flex-col items-center justify-center transition-all shadow-xl"
                         style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-line)' }}>
                        <div className="w-full flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Nhấp chọn linh kiện (chấm nhấp nháy) để xem chi tiết
                            </span>
                            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Còn hàng</span>
                                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Sắp hết hàng</span>
                            </div>
                        </div>

                        {/* Interactive SVG Render */}
                        <div className="w-full aspect-[4/3] max-w-[700px] relative overflow-hidden bg-slate-900/5 dark:bg-black/20 rounded-lg p-2 border border-dashed border-slate-700/20">
                            {activeTab === 'engine' && (
                                <svg viewBox="0 0 800 600" className="w-full h-full select-none">
                                    {/* Definitions for gradients */}
                                    <defs>
                                        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                                        </radialGradient>
                                        <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#334155" />
                                            <stop offset="100%" stopColor="#1e293b" />
                                        </linearGradient>
                                        <linearGradient id="engineBlockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#4b5563" />
                                            <stop offset="100%" stopColor="#1f2937" />
                                        </linearGradient>
                                    </defs>

                                    {/* Car Engine Compartment Outer Bounds */}
                                    <rect x="50" y="40" width="700" height="520" rx="30" fill="url(#chassisGrad)" stroke="#475569" strokeWidth="4" />
                                    <rect x="70" y="60" width="660" height="480" rx="20" fill="none" stroke="#334155" strokeDasharray="6,6" strokeWidth="2" />
                                    
                                    {/* Main Radiator / Fan Grille (Front of car - top) */}
                                    <rect x="200" y="70" width="400" height="25" fill="#0f172a" rx="4" stroke="#475569" strokeWidth="1.5" />
                                    <line x1="220" y1="82" x2="580" y2="82" stroke="#334155" strokeWidth="6" strokeDasharray="3,3" />

                                    {/* Engine Base block (Center) */}
                                    <rect x="250" y="160" width="300" height="280" rx="16" fill="url(#engineBlockGrad)" stroke="#6b7280" strokeWidth="3" />
                                    <rect x="280" y="210" width="240" height="180" rx="8" fill="#111827" stroke="#374151" strokeWidth="2" />

                                    {/* Intake pipe & Manifold (Air flow) */}
                                    <path d="M 210,380 Q 210,240 280,240 L 320,240" fill="none" stroke="#475569" strokeWidth="24" strokeLinecap="round" />
                                    <path d="M 210,380 Q 210,240 280,240 L 320,240" fill="none" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" />

                                    {/* Coolant Hoses */}
                                    <path d="M 190,160 Q 300,100 480,180" fill="none" stroke="#1d4ed8" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
                                    <path d="M 480,195 L 480,120 L 400,120 L 400,95" fill="none" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" opacity="0.6" />

                                    {/* Spark Plug Wires */}
                                    <path d="M 320,270 L 400,260 M 320,285 L 400,260 M 320,300 L 400,260 M 320,315 L 400,260" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.8" />

                                    {/* Serpentine belt pulleys & routing path */}
                                    <path d="M 570,220 L 570,390 A 30,30 0 0,1 540,420 L 520,320 L 570,220" fill="none" stroke="#090d16" strokeWidth="12" strokeLinecap="round" />
                                    <circle cx="570" cy="220" r="16" fill="#374151" stroke="#6b7280" strokeWidth="2" />
                                    <circle cx="570" cy="310" r="22" fill="#374151" stroke="#6b7280" strokeWidth="2" />
                                    <circle cx="570" cy="390" r="26" fill="#374151" stroke="#6b7280" strokeWidth="2" />

                                    {/* Radiator Fans */}
                                    <circle cx="340" cy="115" r="25" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                                    <circle cx="460" cy="115" r="25" fill="#1e293b" stroke="#334155" strokeWidth="2" />

                                    {/* --- CLICKABLE PART DRAWINGS --- */}

                                    {/* Ắc Quy (Battery) */}
                                    <g onClick={() => setSelectedPartId('battery')} className="cursor-pointer group">
                                        <rect x="580" y="100" width="110" height="90" rx="8" fill={selectedPartId === 'battery' ? '#374151' : '#1f2937'} stroke={selectedPartId === 'battery' ? '#f97316' : '#4b5563'} strokeWidth={selectedPartId === 'battery' ? '3' : '2'} />
                                        <rect x="600" y="90" width="16" height="10" fill="#dc2626" />
                                        <rect x="654" y="90" width="16" height="10" fill="#2563eb" />
                                        <text x="635" y="150" fill="#9ca3af" fontSize="16" fontWeight="bold" textAnchor="middle" className="group-hover:fill-white transition-colors">12V</text>
                                    </g>

                                    {/* Bình nước làm mát (Coolant Reservoir) */}
                                    <g onClick={() => setSelectedPartId('coolant-tank')} className="cursor-pointer group">
                                        <ellipse cx="190" cy="160" rx="45" ry="35" fill={selectedPartId === 'coolant-tank' ? '#e2e8f0' : '#f1f5f9'} stroke={selectedPartId === 'coolant-tank' ? '#f97316' : '#cbd5e1'} strokeWidth={selectedPartId === 'coolant-tank' ? '3' : '2'} opacity="0.9" />
                                        <rect x="180" y="120" width="20" height="8" fill="#1e3a8a" rx="2" />
                                        <path d="M 155,160 L 225,160" stroke="#3b82f6" strokeWidth="3" opacity="0.4" />
                                    </g>

                                    {/* Lọc gió động cơ (Air Filter Box) */}
                                    <g onClick={() => setSelectedPartId('air-filter')} className="cursor-pointer group">
                                        <rect x="140" y="320" width="115" height="110" rx="10" fill={selectedPartId === 'air-filter' ? '#1f2937' : '#111827'} stroke={selectedPartId === 'air-filter' ? '#f97316' : '#374151'} strokeWidth={selectedPartId === 'air-filter' ? '3' : '2'} />
                                        <line x1="160" y1="340" x2="230" y2="340" stroke="#4b5563" strokeWidth="4" />
                                        <line x1="160" y1="365" x2="230" y2="365" stroke="#4b5563" strokeWidth="4" />
                                        <line x1="160" y1="390" x2="230" y2="390" stroke="#4b5563" strokeWidth="4" />
                                        <line x1="160" y1="415" x2="230" y2="415" stroke="#4b5563" strokeWidth="4" />
                                    </g>

                                    {/* Lọc dầu (Oil Filter) */}
                                    <g onClick={() => setSelectedPartId('oil-filter')} className="cursor-pointer group">
                                        <circle cx="440" cy="390" r="26" fill={selectedPartId === 'oil-filter' ? '#ea580c' : '#d97706'} stroke={selectedPartId === 'oil-filter' ? '#f97316' : '#b45309'} strokeWidth={selectedPartId === 'oil-filter' ? '3' : '2'} />
                                        <circle cx="440" cy="390" r="16" fill="none" stroke="#fef3c7" strokeWidth="2" strokeDasharray="4,4" />
                                    </g>

                                    {/* Bugi (Spark Plugs Coils) */}
                                    <g onClick={() => setSelectedPartId('spark-plugs')} className="cursor-pointer group">
                                        <rect x="360" y="235" width="80" height="50" rx="4" fill={selectedPartId === 'spark-plugs' ? '#4b5563' : '#374151'} stroke={selectedPartId === 'spark-plugs' ? '#f97316' : '#1f2937'} strokeWidth={selectedPartId === 'spark-plugs' ? '2.5' : '1.5'} />
                                        <circle cx="375" cy="260" r="6" fill="#b91c1c" />
                                        <circle cx="391" cy="260" r="6" fill="#b91c1c" />
                                        <circle cx="408" cy="260" r="6" fill="#b91c1c" />
                                        <circle cx="425" cy="260" r="6" fill="#b91c1c" />
                                    </g>

                                    {/* Van Hằng Nhiệt (Thermostat) */}
                                    <g onClick={() => setSelectedPartId('thermostat')} className="cursor-pointer group">
                                        <path d="M 450,190 L 510,190 L 500,215 L 460,215 Z" fill={selectedPartId === 'thermostat' ? '#94a3b8' : '#64748b'} stroke={selectedPartId === 'thermostat' ? '#f97316' : '#475569'} strokeWidth={selectedPartId === 'thermostat' ? '2.5' : '1.5'} />
                                        <circle cx="480" cy="190" r="12" fill="#d1d5db" stroke="#9ca3af" />
                                    </g>

                                    {/* Pulley/Belt spot link */}
                                    <g onClick={() => setSelectedPartId('belt')} className="cursor-pointer group">
                                        <path d="M 570,310 A 22,22 0 1,1 569.9,310 Z" fill="none" stroke={selectedPartId === 'belt' ? '#f97316' : 'transparent'} strokeWidth="4" />
                                    </g>


                                    {/* --- HOTSPOT PULSING DOTS --- */}
                                    {categoriesData.engine.map(part => {
                                        const isSelected = selectedPartId === part.id;
                                        const isLowStock = part.status === 'low-stock';
                                        const color = isLowStock ? '#ef4444' : '#10b981';

                                        return (
                                            <g key={part.id} onClick={() => setSelectedPartId(part.id)} className="cursor-pointer">
                                                {/* Selection ring */}
                                                {isSelected && (
                                                    <circle cx={part.hotspot.x} cy={part.hotspot.y} r="18" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" />
                                                )}
                                                {/* Pulsing glow ring */}
                                                <circle cx={part.hotspot.x} cy={part.hotspot.y} r="10" fill={color} opacity="0.4">
                                                    <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                                                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                                {/* Solid center dot */}
                                                <circle cx={part.hotspot.x} cy={part.hotspot.y} r="6" fill={color} stroke="#ffffff" strokeWidth="1.5" />
                                            </g>
                                        );
                                    })}
                                </svg>
                            )}

                            {activeTab === 'brake' && (
                                <svg viewBox="0 0 800 600" className="w-full h-full select-none">
                                    {/* Brake system schema */}
                                    <defs>
                                        <linearGradient id="rotorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#94a3b8" />
                                            <stop offset="50%" stopColor="#cbd5e1" />
                                            <stop offset="100%" stopColor="#475569" />
                                        </linearGradient>
                                        <linearGradient id="caliperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="100%" stopColor="#991b1b" />
                                        </linearGradient>
                                    </defs>

                                    {/* Background Chassis Grid */}
                                    <rect x="50" y="40" width="700" height="520" rx="30" fill="#111827" stroke="#374151" strokeWidth="4" />
                                    <circle cx="400" cy="300" r="280" fill="#1f2937" opacity="0.3" />

                                    {/* Big Brake Rotor (Đĩa phanh) */}
                                    <g onClick={() => setSelectedPartId('brake-rotor')} className="cursor-pointer">
                                        <circle cx="400" cy="300" r="190" fill="url(#rotorGrad)" stroke={selectedPartId === 'brake-rotor' ? '#f97316' : '#64748b'} strokeWidth={selectedPartId === 'brake-rotor' ? '6' : '3'} />
                                        {/* Rotor slots for cooling */}
                                        <line x1="400" y1="130" x2="400" y2="170" stroke="#1f2937" strokeWidth="4" strokeDasharray="6,4" />
                                        <line x1="400" y1="430" x2="400" y2="470" stroke="#1f2937" strokeWidth="4" strokeDasharray="6,4" />
                                        <line x1="230" y1="300" x2="270" y2="300" stroke="#1f2937" strokeWidth="4" strokeDasharray="6,4" />
                                        <line x1="530" y1="300" x2="570" y2="300" stroke="#1f2937" strokeWidth="4" strokeDasharray="6,4" />
                                        {/* Diagonal cooling slots */}
                                        <path d="M 290,190 L 320,220 M 510,190 L 480,220 M 290,410 L 320,380 M 510,410 L 480,380" stroke="#1f2937" strokeWidth="4" />
                                        
                                        {/* Center Wheel Hub Attachment */}
                                        <circle cx="400" cy="300" r="75" fill="#334155" stroke="#475569" strokeWidth="3" />
                                        <circle cx="400" cy="300" r="45" fill="#1e293b" />
                                        
                                        {/* Wheel studs */}
                                        <circle cx="400" cy="265" r="8" fill="#94a3b8" />
                                        <circle cx="435" cy="290" r="8" fill="#94a3b8" />
                                        <circle cx="420" cy="330" r="8" fill="#94a3b8" />
                                        <circle cx="380" cy="330" r="8" fill="#94a3b8" />
                                        <circle cx="365" cy="290" r="8" fill="#94a3b8" />
                                    </g>

                                    {/* Brake Caliper assembly (Cùm phanh - top right) */}
                                    <g onClick={() => setSelectedPartId('brake-caliper')} className="cursor-pointer">
                                        <path d="M 480,105 C 550,130 590,190 590,260 L 530,250 C 530,200 500,160 460,140 Z" fill="url(#caliperGrad)" stroke={selectedPartId === 'brake-caliper' ? '#f97316' : '#ef4444'} strokeWidth={selectedPartId === 'brake-caliper' ? '3' : '1.5'} />
                                        <rect x="520" y="130" width="30" height="80" rx="6" fill="#7f1d1d" transform="rotate(25, 535, 170)" />
                                    </g>

                                    {/* Brake Pads (Inside Caliper bracket) */}
                                    <g onClick={() => setSelectedPartId('brake-pads')} className="cursor-pointer">
                                        <path d="M 455,145 C 485,160 505,190 510,225 L 485,225 C 480,200 465,180 445,165 Z" fill={selectedPartId === 'brake-pads' ? '#f97316' : '#d97706'} stroke="#451a03" strokeWidth="1" />
                                    </g>

                                    {/* Hydraulic Brake fluid hose */}
                                    <path d="M 545,150 Q 560,90 350,90 L 250,90 L 250,290" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
                                    <path d="M 545,150 Q 560,90 350,90 L 250,90 L 250,290" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

                                    {/* Master Cylinder (Xy lanh phanh chính - bottom left) */}
                                    <g onClick={() => setSelectedPartId('master-cylinder')} className="cursor-pointer group">
                                        <rect x="180" y="400" width="140" height="75" rx="8" fill={selectedPartId === 'master-cylinder' ? '#334155' : '#1e293b'} stroke={selectedPartId === 'master-cylinder' ? '#f97316' : '#475569'} strokeWidth="2.5" />
                                        <circle cx="180" cy="437" r="25" fill="#475569" />
                                        <rect x="145" y="425" width="20" height="24" fill="#64748b" />
                                    </g>

                                    {/* Brake Fluid Reservoir (Dầu phanh - above master cylinder) */}
                                    <g onClick={() => setSelectedPartId('brake-fluid')} className="cursor-pointer group">
                                        <ellipse cx="230" cy="350" rx="35" ry="25" fill={selectedPartId === 'brake-fluid' ? '#e2e8f0' : '#f1f5f9'} stroke={selectedPartId === 'brake-fluid' ? '#f97316' : '#cbd5e1'} strokeWidth="2" opacity="0.9" />
                                        <rect x="220" y="320" width="20" height="8" fill="#1e3a8a" />
                                        <path d="M 200,355 L 260,355" stroke="#f59e0b" strokeWidth="3" opacity="0.7" />
                                    </g>


                                    {/* --- HOTSPOT PULSING DOTS --- */}
                                    {categoriesData.brake.map(part => {
                                        const isSelected = selectedPartId === part.id;
                                        const isLowStock = part.status === 'low-stock';
                                        const color = isLowStock ? '#ef4444' : '#10b981';

                                        return (
                                            <g key={part.id} onClick={() => setSelectedPartId(part.id)} className="cursor-pointer">
                                                {/* Selection ring */}
                                                {isSelected && (
                                                    <circle cx={part.hotspot.x} cy={part.hotspot.y} r="18" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" />
                                                )}
                                                {/* Pulsing glow ring */}
                                                <circle cx={part.hotspot.x} cy={part.hotspot.y} r="10" fill={color} opacity="0.4">
                                                    <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                                                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                                {/* Solid center dot */}
                                                <circle cx={part.hotspot.x} cy={part.hotspot.y} r="6" fill={color} stroke="#ffffff" strokeWidth="1.5" />
                                            </g>
                                        );
                                    })}
                                </svg>
                            )}

                            {activeTab === 'suspension' && (
                                <svg viewBox="0 0 800 600" className="w-full h-full select-none">
                                    {/* Suspension system schema */}
                                    {/* Background Chassis Grid */}
                                    <rect x="50" y="40" width="700" height="520" rx="30" fill="#111827" stroke="#374151" strokeWidth="4" />
                                    
                                    {/* Structural chassis member (Top attachment) */}
                                    <rect x="300" y="80" width="200" height="40" rx="8" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
                                    <circle cx="400" cy="100" r="16" fill="#374151" stroke="#9ca3af" strokeWidth="2" />

                                    {/* Shock Absorber Strut Body (Giảm xóc) */}
                                    <g onClick={() => setSelectedPartId('shock-absorber')} className="cursor-pointer">
                                        {/* Outer shock absorber cylinder body */}
                                        <rect x="382" y="240" width="36" height="200" rx="6" fill={selectedPartId === 'shock-absorber' ? '#2563eb' : '#1e3a8a'} stroke="#3b82f6" strokeWidth="2" />
                                        {/* Inner piston shaft sliding inside */}
                                        <rect x="393" y="100" width="14" height="150" fill="#cbd5e1" stroke="#9ca3af" strokeWidth="1" />
                                        {/* Lower attachment eyelet */}
                                        <circle cx="400" cy="440" r="16" fill="#374151" stroke="#6b7280" strokeWidth="2" />
                                    </g>

                                    {/* Coil Spring wrapped around the shock (Lò xo cuộn) */}
                                    <g onClick={() => setSelectedPartId('coil-spring')} className="cursor-pointer">
                                        {/* Left and right helical coils projected as overlapping paths/lines */}
                                        <path d="
                                            M 360,140 L 440,160 
                                            M 360,180 L 440,200 
                                            M 360,220 L 440,240 
                                            M 360,260 L 440,280 
                                            M 360,300 L 440,320 
                                            M 360,340 L 440,360
                                        " fill="none" stroke={selectedPartId === 'coil-spring' ? '#f97316' : '#d97706'} strokeWidth="14" strokeLinecap="round" opacity="0.95" />
                                        <path d="
                                            M 360,140 L 440,160 
                                            M 360,180 L 440,200 
                                            M 360,220 L 440,240 
                                            M 360,260 L 440,280 
                                            M 360,300 L 440,320 
                                            M 360,340 L 440,360
                                        " fill="none" stroke="#fef3c7" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
                                    </g>

                                    {/* Lower Control Arm (Càng chữ A - bottom) */}
                                    <g onClick={() => setSelectedPartId('control-arm')} className="cursor-pointer">
                                        <path d="M 400,440 L 220,480 L 250,510 L 400,440 L 550,480 L 520,510 Z" fill={selectedPartId === 'control-arm' ? '#374151' : '#1f2937'} stroke={selectedPartId === 'control-arm' ? '#f97316' : '#4b5563'} strokeWidth="3" />
                                        <circle cx="220" cy="480" r="10" fill="#9ca3af" />
                                        <circle cx="550" cy="480" r="10" fill="#9ca3af" />
                                        <circle cx="400" cy="440" r="10" fill="#e5e7eb" />
                                    </g>

                                    {/* Sway Bar / Stabilizer Link (Thanh cân bằng - right) */}
                                    <g onClick={() => setSelectedPartId('sway-bar-link')} className="cursor-pointer">
                                        <line x1="430" y1="200" x2="500" y2="310" stroke={selectedPartId === 'sway-bar-link' ? '#f97316' : '#94a3b8'} strokeWidth="10" strokeLinecap="round" />
                                        <circle cx="430" cy="200" r="8" fill="#374151" stroke="#6b7280" />
                                        <circle cx="500" cy="310" r="8" fill="#374151" stroke="#6b7280" />
                                    </g>


                                    {/* --- HOTSPOT PULSING DOTS --- */}
                                    {categoriesData.suspension.map(part => {
                                        const isSelected = selectedPartId === part.id;
                                        const isLowStock = part.status === 'low-stock';
                                        const color = isLowStock ? '#ef4444' : '#10b981';

                                        return (
                                            <g key={part.id} onClick={() => setSelectedPartId(part.id)} className="cursor-pointer">
                                                {/* Selection ring */}
                                                {isSelected && (
                                                    <circle cx={part.hotspot.x} cy={part.hotspot.y} r="18" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" />
                                                )}
                                                {/* Pulsing glow ring */}
                                                <circle cx={part.hotspot.x} cy={part.hotspot.y} r="10" fill={color} opacity="0.4">
                                                    <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                                                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                                {/* Solid center dot */}
                                                <circle cx={part.hotspot.x} cy={part.hotspot.y} r="6" fill={color} stroke="#ffffff" strokeWidth="1.5" />
                                            </g>
                                        );
                                    })}
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Right: Info Details Panel (1 column) */}
                    <div className="rounded-xl border p-6 flex flex-col justify-between h-[600px] transition-all shadow-xl"
                         style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-line)' }}>
                        
                        {/* Upper Details Block */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-line)' }}>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Thông tin linh kiện
                                </span>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm ${
                                    selectedPart.status === 'in-stock' 
                                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}>
                                    {selectedPart.statusText}
                                </span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--text-title)' }}>
                                    {selectedPart.name}
                                </h2>
                                <p className="text-xs font-medium mt-3 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                                    {selectedPart.desc}
                                </p>
                            </div>

                            {/* Brand Offers */}
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                                    Thương hiệu khuyên dùng
                                </span>
                                
                                <div className="space-y-3">
                                    {selectedPart.brands.map(brand => (
                                        <div key={brand.id} className={`p-4 rounded-lg border flex flex-col justify-between gap-3 transition-all ${
                                            theme === 'dark' 
                                                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' 
                                                : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                                        }`}>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="text-sm font-bold" style={{ color: 'var(--text-title)' }}>
                                                        {brand.name}
                                                    </h4>
                                                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                                                        Tồn kho: {brand.stock} cái
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-orange-500">
                                                        {brand.price.toLocaleString('vi-VN')}₫
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleAddToCart(brand)}
                                                className="w-full py-2 bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-500 text-[10px] font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1.5 border border-orange-500/20"
                                            >
                                                <ShoppingCart size={12} /> Thêm vào giỏ
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lower Action Info */}
                        <div className="border-t pt-4 mt-auto flex items-center gap-2" style={{ borderColor: 'var(--border-line)' }}>
                            <Info size={14} className="text-slate-400 shrink-0" />
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                Dữ liệu giá & tồn kho cập nhật trực tiếp theo thời gian thực.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schematic;
