require('dotenv').config();
const mongoose = require('mongoose');
const AutoPart = require('./models/AutoPart');
const Category = require('./models/Category');
const User = require('./models/User');
const connectDB = require('./config/db');

const schematicProducts = [
    // --- Engine Bay ---
    {
        name: 'Lọc dầu động cơ Bosch Premium',
        categoryName: 'Động cơ',
        price: 180000,
        description: 'Lọc các tạp chất, mạt kim loại trong dầu nhờn để bảo vệ động cơ hoạt động trơn tru.',
        stock: 15,
        brand: 'Bosch',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-BOSCH-OIL-FIL-01'
    },
    {
        name: 'Lọc dầu động cơ Denso Japan',
        categoryName: 'Động cơ',
        price: 220000,
        description: 'Lọc các tạp chất, mạt kim loại trong dầu nhờn để bảo vệ động cơ hoạt động trơn tru.',
        stock: 8,
        brand: 'Denso',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-DENSO-OIL-FIL-02'
    },
    {
        name: 'Lọc dầu động cơ Mann-Filter',
        categoryName: 'Động cơ',
        price: 250000,
        description: 'Lọc các tạp chất, mạt kim loại trong dầu nhờn để bảo vệ động cơ hoạt động trơn tru.',
        stock: 12,
        brand: 'Mann',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-MANN-OIL-FIL-03'
    },
    {
        name: 'Lọc gió động cơ K&N High-Flow',
        categoryName: 'Động cơ',
        price: 850000,
        description: 'Lọc sạch bụi bẩn trong không khí trước khi đưa vào buồng đốt, tăng công suất buồng nổ.',
        stock: 2,
        brand: 'K&N',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1627055964894-39f88d2f5a60?q=80&w=600',
        sku: 'SKU-KN-AIR-FIL-01'
    },
    {
        name: 'Lọc gió động cơ Wix Filters',
        categoryName: 'Động cơ',
        price: 320000,
        description: 'Lọc sạch bụi bẩn trong không khí trước khi đưa vào buồng đốt, tăng công suất buồng nổ.',
        stock: 3,
        brand: 'Wix',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1627055964894-39f88d2f5a60?q=80&w=600',
        sku: 'SKU-WIX-AIR-FIL-02'
    },
    {
        name: 'Lọc gió động cơ Sakura Indonesia',
        categoryName: 'Động cơ',
        price: 190000,
        description: 'Lọc sạch bụi bẩn trong không khí trước khi đưa vào buồng đốt, tăng công suất buồng nổ.',
        stock: 1,
        brand: 'Sakura',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1627055964894-39f88d2f5a60?q=80&w=600',
        sku: 'SKU-SAKURA-AIR-FIL-03'
    },
    {
        name: 'Bộ bugi đánh lửa NGK Iridium IX (4 cái)',
        categoryName: 'Động cơ',
        price: 960000,
        description: 'Bugi tạo ra tia lửa điện để kích nổ hỗn hợp khí nén và nhiên liệu trong buồng xi-lanh.',
        stock: 24,
        brand: 'NGK',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1549487561-1250f2f35f5f?q=80&w=600',
        sku: 'SKU-NGK-SPK-PLG-01'
    },
    {
        name: 'Bộ bugi đánh lửa Denso Iridium Power (4 cái)',
        categoryName: 'Động cơ',
        price: 1100000,
        description: 'Bugi tạo ra tia lửa điện để kích nổ hỗn hợp khí nén và nhiên liệu trong buồng xi-lanh.',
        stock: 18,
        brand: 'Denso',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1549487561-1250f2f35f5f?q=80&w=600',
        sku: 'SKU-DENSO-SPK-PLG-02'
    },
    {
        name: 'Dây curoa tổng Bando Ribstar Japan',
        categoryName: 'Động cơ',
        price: 420000,
        description: 'Truyền động từ trục khuỷu động cơ tới máy phát điện, máy nén điều hòa và bơm nước làm mát.',
        stock: 10,
        brand: 'Bando',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-BANDO-BELT-01'
    },
    {
        name: 'Dây curoa tổng Gates Micro-V',
        categoryName: 'Động cơ',
        price: 480000,
        description: 'Truyền động từ trục khuỷu động cơ tới máy phát điện, máy nén điều hòa và bơm nước làm mát.',
        stock: 15,
        brand: 'Gates',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-GATES-BELT-02'
    },
    {
        name: 'Bình chứa nước làm mát Toyota Genuine Parts',
        categoryName: 'Động cơ',
        price: 550000,
        description: 'Lưu trữ nước giải nhiệt phụ và duy trì áp suất an toàn cho hệ thống két nước làm mát tuần hoàn.',
        stock: 5,
        brand: 'Toyota',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-TOYOTA-COOL-TANK-01'
    },
    {
        name: 'Bình chứa nước làm mát Meyle Germany',
        categoryName: 'Động cơ',
        price: 380000,
        description: 'Lưu trữ nước giải nhiệt phụ và duy trì áp suất an toàn cho hệ thống két nước làm mát tuần hoàn.',
        stock: 7,
        brand: 'Meyle',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-MEYLE-COOL-TANK-02'
    },
    {
        name: 'Bình ắc quy ô tô GS Battery 12V 60Ah',
        categoryName: 'Động cơ',
        price: 1650000,
        description: 'Cung cấp năng lượng dòng cao khởi động động cơ xe và lưu trữ điện năng phụ tải phụ.',
        stock: 2,
        brand: 'GS',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-GS-BATTERY-01'
    },
    {
        name: 'Bình ắc quy ô tô Varta Silver Dynamic',
        categoryName: 'Động cơ',
        price: 2450000,
        description: 'Cung cấp năng lượng dòng cao khởi động động cơ xe và lưu trữ điện năng phụ tải phụ.',
        stock: 1,
        brand: 'Varta',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-VARTA-BATTERY-02'
    },
    {
        name: 'Van hằng nhiệt Tama Japan OEM',
        categoryName: 'Động cơ',
        price: 290000,
        description: 'Van tự động đóng mở dựa trên nhiệt độ để điều phối dòng tuần hoàn két nước giải nhiệt động cơ.',
        stock: 11,
        brand: 'Tama',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-TAMA-THERMO-01'
    },
    {
        name: 'Van hằng nhiệt Gates Thermostat',
        categoryName: 'Động cơ',
        price: 340000,
        description: 'Van tự động đóng mở dựa trên nhiệt độ để điều phối dòng tuần hoàn két nước giải nhiệt động cơ.',
        stock: 6,
        brand: 'Gates',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-GATES-THERMO-02'
    },

    // --- Brake System ---
    {
        name: 'Đĩa phanh tản nhiệt Brembo Carbon Coated (Cặp)',
        categoryName: 'Hệ thống phanh',
        price: 3800000,
        description: 'Đĩa ma sát lớn chịu lực ép trực tiếp để chuyển động năng thành nhiệt năng dừng xe.',
        stock: 6,
        brand: 'Brembo',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-BREMBO-ROTOR-01'
    },
    {
        name: 'Đĩa phanh tản nhiệt Bosch QuietCast Pair',
        categoryName: 'Hệ thống phanh',
        price: 1950000,
        description: 'Đĩa ma sát lớn chịu lực ép trực tiếp để chuyển động năng thành nhiệt năng dừng xe.',
        stock: 12,
        brand: 'Bosch',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-BOSCH-ROTOR-02'
    },
    {
        name: 'Bộ má phanh gốm ceramic Akebono ProACT',
        categoryName: 'Hệ thống phanh',
        price: 1250000,
        description: 'Má phanh gốm chịu mài mòn cao, sinh ít bụi bẩn và chịu nhiệt độ hoạt động cực lớn.',
        stock: 2,
        brand: 'Akebono',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-AKEBONO-PADS-01'
    },
    {
        name: 'Bộ má phanh gốm Bendix Premium Metal',
        categoryName: 'Hệ thống phanh',
        price: 850000,
        description: 'Má phanh gốm chịu mài mòn cao, sinh ít bụi bẩn và chịu nhiệt độ hoạt động cực lớn.',
        stock: 3,
        brand: 'Bendix',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-BENDIX-PADS-02'
    },
    {
        name: 'Cùm phanh thủy lực Brembo Red Performance',
        categoryName: 'Hệ thống phanh',
        price: 5400000,
        description: 'Vỏ cùm chứa piston thủy lực trực tiếp đẩy má phanh áp chặt vào bề mặt đĩa phanh.',
        stock: 4,
        brand: 'Brembo',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-BREMBO-CALIPER-01'
    },
    {
        name: 'Cùm phanh thủy lực Nissin Japan OEM',
        categoryName: 'Hệ thống phanh',
        price: 2800000,
        description: 'Vỏ cùm chứa piston thủy lực trực tiếp đẩy má phanh áp chặt vào bề mặt đĩa phanh.',
        stock: 7,
        brand: 'Nissin',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-NISSIN-CALIPER-02'
    },
    {
        name: 'Xy lanh phanh chính TRW Automotive Cylinder',
        categoryName: 'Hệ thống phanh',
        price: 1850000,
        description: 'Bộ phận trung tâm chuyển đổi lực bàn đạp của tài xế thành áp suất dầu thủy lực.',
        stock: 8,
        brand: 'TRW',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-TRW-CYLINDER-01'
    },
    {
        name: 'Xy lanh phanh chính Aisin Japan Cylinder',
        categoryName: 'Hệ thống phanh',
        price: 2100000,
        description: 'Bộ phận trung tâm chuyển đổi lực bàn đạp của tài xế thành áp suất dầu thủy lực.',
        stock: 5,
        brand: 'Aisin',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-6708146bc9c5?q=80&w=600',
        sku: 'SKU-AISIN-CYLINDER-02'
    },
    {
        name: 'Dầu phanh DOT 4 Castrol DOT4 Fluid 1L',
        categoryName: 'Hệ thống phanh',
        price: 250000,
        description: 'Chất lỏng chịu áp cao truyền lực phanh, có khả năng hút ẩm tốt bảo vệ hệ thống đường ống phanh.',
        stock: 30,
        brand: 'Castrol',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1616885317770-36b6cb90b8ff?q=80&w=600',
        sku: 'SKU-CASTROL-FLUID-01'
    },
    {
        name: 'Dầu phanh DOT 4 Liqui Moly Brake DOT4',
        categoryName: 'Hệ thống phanh',
        price: 290000,
        description: 'Chất lỏng chịu áp cao truyền lực phanh, có khả năng hút ẩm tốt bảo vệ hệ thống đường ống phanh.',
        stock: 25,
        brand: 'Liqui Moly',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1616885317770-36b6cb90b8ff?q=80&w=600',
        sku: 'SKU-LIQUIMOLY-FLUID-02'
    },

    // --- Suspension System ---
    {
        name: 'Bộ giảm chấn dầu Bilstein B6 Performance (Cặp)',
        categoryName: 'Hệ thống treo',
        price: 6800000,
        description: 'Piston thụt triệt tiêu dao động đàn hồi tự do giúp lốp xe bám sát mặt đường khi di chuyển.',
        stock: 8,
        brand: 'Bilstein',
        partType: 'OEM',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-BILSTEIN-SHOCK-01'
    },
    {
        name: 'Bộ giảm chấn dầu KYB Excel-G Gas Shock (Cặp)',
        categoryName: 'Hệ thống treo',
        price: 3400000,
        description: 'Piston thụt triệt tiêu dao động đàn hồi tự do giúp lốp xe bám sát mặt đường khi di chuyển.',
        stock: 14,
        brand: 'KYB',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-KYB-SHOCK-02'
    },
    {
        name: 'Lò xo cuộn thép giảm chấn Eibach Pro-Kit Springs',
        categoryName: 'Hệ thống treo',
        price: 4200000,
        description: 'Hấp thụ các va chạm đột ngột từ mặt gồ ghề và nâng đỡ toàn bộ trọng lực xe ổn định.',
        stock: 6,
        brand: 'Eibach',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-EIBACH-SPRING-01'
    },
    {
        name: 'Lò xo cuộn thép Tein S-Tech Sport Coil',
        categoryName: 'Hệ thống treo',
        price: 3900000,
        description: 'Hấp thụ các va chạm đột ngột từ mặt gồ ghề và nâng đỡ toàn bộ trọng lực xe ổn định.',
        stock: 10,
        brand: 'Tein',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-TEIN-SPRING-02'
    },
    {
        name: 'Thanh rô-tuyn cân bằng trước Lemforder Germany Link',
        categoryName: 'Hệ thống treo',
        price: 750000,
        description: 'Hạn chế độ xoắn nghiêng thân xe khi bo cua tốc độ cao, giữ ổn định song song trục gầm.',
        stock: 2,
        brand: 'Lemforder',
        partType: 'OES',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-LEMFORDER-LINK-01'
    },
    {
        name: 'Thanh rô-tuyn cân bằng 555 Japan Stabilizer',
        categoryName: 'Hệ thống treo',
        price: 480000,
        description: 'Hạn chế độ xoắn nghiêng thân xe khi bo cua tốc độ cao, giữ ổn định song song trục gầm.',
        stock: 3,
        brand: '555',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-555-LINK-02'
    },
    {
        name: 'Càng chữ A gầm xe dưới Meyle Heavy Duty Pair',
        categoryName: 'Hệ thống treo',
        price: 2900000,
        description: 'Liên kết bánh xe vào khung xe tạo vị trí chuyển động thẳng góc khi giảm xóc thụt lên xuống.',
        stock: 5,
        brand: 'Meyle',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-MEYLE-ARM-01'
    },
    {
        name: 'Càng chữ A gầm xe dưới CTR Korea Control Arm',
        categoryName: 'Hệ thống treo',
        price: 1800000,
        description: 'Liên kết bánh xe vào khung xe tạo vị trí chuyển động thẳng góc khi giảm xóc thụt lên xuống.',
        stock: 9,
        brand: 'CTR',
        partType: 'Aftermarket',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600',
        sku: 'SKU-CTR-ARM-02'
    }
];

const seed = async () => {
    try {
        await connectDB();

        // 1. Get an admin user to assign as category creator
        let adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            adminUser = await User.findOne({});
        }
        if (!adminUser) {
            console.error('No users found in database! Please run seed.js or createAdmin.js first.');
            process.exit(1);
        }

        console.log(`Using user ${adminUser.email} (ID: ${adminUser._id}) as creator.`);

        // 2. Resolve or create categories
        const categoryMap = {};
        const categoriesToCheck = ['Động cơ', 'Hệ thống phanh', 'Hệ thống treo'];

        const slugify = (text) => {
            return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        };

        for (const catName of categoriesToCheck) {
            let cat = await Category.findOne({ name: catName });
            if (!cat) {
                // If it is 'Động cơ', check slug compatibility
                if (catName === 'Động cơ') {
                    cat = await Category.findOne({ slug: 'ng-c' });
                }
            }
            if (!cat) {
                cat = new Category({
                    name: catName,
                    slug: slugify(catName),
                    description: `Danh mục phụ tùng ${catName.toLowerCase()}`,
                    createdBy: adminUser._id
                });
                await cat.save();
                console.log(`Created new category: ${catName}`);
            } else {
                console.log(`Reusing existing category: ${cat.name} (ID: ${cat._id})`);
            }
            categoryMap[catName] = cat._id;
        }

        // 3. Loop and add products
        let addedCount = 0;
        let updatedCount = 0;

        for (const p of schematicProducts) {
            const catId = categoryMap[p.categoryName];
            
            // Check if product with same name/brand already exists
            let part = await AutoPart.findOne({ sku: p.sku });
            if (!part) {
                part = await AutoPart.findOne({ name: p.name, brand: p.brand });
            }

            if (part) {
                // Update
                part.price = p.price;
                part.stock = p.stock;
                part.category = catId;
                part.description = p.description;
                part.partType = p.partType;
                part.imageUrl = p.imageUrl;
                await part.save();
                updatedCount++;
            } else {
                // Insert
                part = new AutoPart({
                    name: p.name,
                    brand: p.brand,
                    price: p.price,
                    stock: p.stock,
                    category: catId,
                    description: p.description,
                    partType: p.partType,
                    imageUrl: p.imageUrl,
                    sku: p.sku,
                    createdBy: adminUser._id,
                    rating: 0,
                    numReviews: 0,
                    carCompatibilities: [
                        { carBrand: 'Toyota', carModel: 'Camry', carYear: 2020 },
                        { carBrand: 'Honda', carModel: 'Civic', carYear: 2019 }
                    ]
                });
                await part.save();
                addedCount++;
            }
        }

        console.log(`Seeding complete! Added ${addedCount} products. Updated ${updatedCount} products.`);
        process.exit(0);
    } catch (err) {
        console.error('Error during seeding schematic products:', err);
        process.exit(1);
    }
};

seed();
