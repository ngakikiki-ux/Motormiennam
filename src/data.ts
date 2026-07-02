import { Product, NewsItem, ReviewItem, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'gk48ev',
    category: 'electric',
    categoryVi: 'Xe tải điện',
    categoryEn: 'Electric Trucks',
    name: 'GK48EV VAN EV',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: '480.000.000 VNĐ (Tặng 7tr)',
    priceEn: '480,000,000 VND (7M Promo)',
    shortDescVi: 'Xe bán tải điện (Van EV) thế hệ mới 2026. Giải pháp vận tải xanh đô thị không lo cấm giờ, tiết kiệm tối đa.',
    shortDescEn: 'Next-generation 2026 electric cargo van (Van EV). Dynamic green city logistics with zero traffic hour restrictions.',
    dimensions: '4.500 x 1.680 x 1.980 mm',
    power: '60 kW (82 HP)',
    engineOrBattery: 'Lithium Iron Phosphate (LFP) - Bảo hành chính hãng',
    payload: '945 kg',
    fuelConsumption: '0 VNĐ khí thải (Khoảng 250 - 300 km mỗi lần sạc)',
    warranty: '5 năm hoặc 150.000 km',
    featuresVi: [
      'Động cơ điện hiệu suất cao hoạt động siêu êm ái',
      'Giá niêm yết công bố: 480.000.000 VNĐ (Đã bao gồm VAT)',
      'Khuyến mại đặc biệt: Tặng ngay voucher 7.000.000 VNĐ khi đặt cọc',
      'Thiết kế khoang hàng rộng rãi, tải trọng tối ưu di chuyển nội đô'
    ],
    featuresEn: [
      'High-performance silent electric drive motor',
      'Listed MSRP: 480,000,000 VND (VAT included)',
      'Special launch promotion: 7,000,000 VND discount voucher upon deposit',
      'Spacious volumetric cargo department optimized for urban transport'
    ]
  },
  {
    id: 'ev-300',
    category: 'electric',
    categoryVi: 'Xe tải điện',
    categoryEn: 'Electric Trucks',
    name: 'KIM LONG EV-300',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 890.000.000 VNĐ',
    priceEn: 'From 890,000,000 VND',
    shortDescVi: 'Giải pháp vận tải xanh thế hệ mới. Động cơ điện hiệu suất cao, tiết kiệm chi phí vận hành tối đa.',
    shortDescEn: 'The next generation green logistics solution. High efficiency electric motor with ultra-low operating cost.',
    dimensions: '5.990 x 2.050 x 2.980 mm',
    power: '120 kW (163 HP)',
    engineOrBattery: 'Lithium Iron Phosphate (LFP) - 105 kWh (Sạc nhanh 20%-80% trong 45 phút)',
    payload: '1.990 kg',
    fuelConsumption: '0 VNĐ khí thải (Khoảng 350 km mỗi lần sạc đầy)',
    warranty: '7 năm hoặc 200.000 km (Riêng Pin bảo hành 8 năm)',
    featuresVi: [
      'Động cơ điện đồng bộ nam châm vĩnh cửu hiệu suất 96%',
      'Hệ thống thu hồi năng lượng phanh thông minh (Regenerative Braking)',
      'Cabin hiện đại với màn hình giải trí 10 inch tích hợp camera lùi',
      'Hệ thống an toàn chủ động ABS, EBD, hỗ trợ khởi hành ngang dốc'
    ],
    featuresEn: [
      'Permanent magnet synchronous motor with 96% efficiency',
      'Intelligent regenerative braking energy recovery system',
      'Modern cabin with 10-inch smart screen and integrated reverse camera',
      'Active safety systems including ABS, EBD, and Hill-start Assist Control'
    ]
  },
  {
    id: 'kiman9-199',
    category: 'light',
    categoryVi: 'Xe tải nhẹ',
    categoryEn: 'Light Trucks',
    name: 'KIM LONG KIMAN9 (1.99T)',
    image: 'https://images.unsplash.com/photo-1591768793355-74d75b51a55d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1591768793355-74d75b51a55d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506306813292-261595f32a0c?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 336.000.000 VNĐ',
    priceEn: 'From 336,000,000 VND',
    shortDescVi: 'Xe tải nhẹ thế hệ mới KIMAN9 tải trọng 1.99 Tấn. Thiết kế khung gầm chắc khỏe, đa dạng loại thùng bệ theo chuẩn đăng kiểm.',
    shortDescEn: 'Next-generation light truck KIMAN9 with 1.99 Ton payload capacity. Heavy-duty chassis with versatile cargo options.',
    dimensions: '5.500 x 1.850 x 2.550 mm',
    power: '110 HP',
    engineOrBattery: 'Động cơ phun điện tử EURO 5 tiết kiệm nhiên liệu',
    payload: '1.990 kg',
    fuelConsumption: '8.2 Lít / 100 km',
    warranty: '3 năm hoặc 100.000 km',
    featuresVi: [
      'Bảng giá các phiên bản (Đã bao gồm VAT):',
      '1. Chassis (Sắt xi): 336.000.000 VNĐ',
      '2. Thùng Lửng (Tôn đen): 352.000.000 VNĐ',
      '3. Thùng Mui Bạt 3B/5B (Inox 430): 369.000.000đ - 373.000.000đ',
      '4. Thùng Kín / Kín 1 Cửa Hông (Inox 430): 377.000.000 VNĐ'
    ],
    featuresEn: [
      'MSRP pricelist by bodies (VAT included):',
      '1. Chassis Frame model: 336,000,000 VND',
      '2. Dropside / Flatbed (Steel): 352,000,000 VND',
      '3. Canvas canopy 3B / 5B (Stainless 430): 369M - 373M VND',
      '4. Standard Box / Side-door Box (Stainless 430): 377,000,000 VND'
    ]
  },
  {
    id: 'kiman9-249',
    category: 'light',
    categoryVi: 'Xe tải nhẹ',
    categoryEn: 'Light Trucks',
    name: 'KIM LONG KIMAN9 (2.49T)',
    image: 'https://images.unsplash.com/photo-1591768793355-74d75b51a55d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1591768793355-74d75b51a55d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506306813292-261595f32a0c?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 389.000.000 VNĐ',
    priceEn: 'From 389,000,000 VND',
    shortDescVi: 'Xe tải nhẹ KIMAN9 phiên bản nâng tải trọng 2.49 Tấn. Tối ưu hóa hiệu năng kinh tế, bền bỉ và tiện nghi vượt tầm phân khúc.',
    shortDescEn: 'KIMAN9 series upgraded to 2.49-ton payload. Excellent economic efficiency, extremely durable and comfortable.',
    dimensions: '5.820 x 1.910 x 2.650 mm',
    power: '120 HP',
    engineOrBattery: 'Động cơ Diesel EURO 5 thế hệ mới mạnh mẽ',
    payload: '2.490 kg',
    fuelConsumption: '9.0 Lít / 100 km',
    warranty: '3 năm hoặc 100.000 km',
    featuresVi: [
      'Bảng giá các phiên bản (Đã bao gồm VAT):',
      '1. Chassis (Sắt xi): 389.000.000 VNĐ',
      '2. Thùng Lửng (Tôn đen): 406.000.000 VNĐ',
      '3. Thùng Mui Bạt 3B/5B (Inox 430): 424.000.000đ - 429.000.000đ',
      '4. Thùng Kín / Kín 1 Cửa Hông (Inox 430): 431.500.000 VNĐ'
    ],
    featuresEn: [
      'MSRP pricelist by bodies (VAT included):',
      '1. Chassis Frame model: 389,000,000 VND',
      '2. Dropside / Flatbed (Steel): 406,000,000 VND',
      '3. Canvas canopy 3B / 5B (Stainless 430): 424M - 429M VND',
      '4. Standard Box / Side-door Box (Stainless 430): 431,500,000 VND'
    ]
  },
  {
    id: 'king-m',
    category: 'medium',
    categoryVi: 'Xe tải trung',
    categoryEn: 'Medium Trucks',
    name: 'KIM LONG King-M',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 680.000.000 VNĐ',
    priceEn: 'From 680,000,000 VND',
    shortDescVi: 'Sự lựa chọn hoàn hảo cho vận tải liên tỉnh tầm trung. Bền bỉ vượt thời gian, tải trọng tối ưu.',
    shortDescEn: 'The perfect choice for medium interprovincial transport. Timeless durability with optimal payload.',
    dimensions: '8.450 x 2.450 x 3.550 mm',
    power: '160 HP',
    engineOrBattery: 'Động cơ Diesel Common Rail tăng áp, dung tích 3.8L',
    payload: '7.300 kg',
    fuelConsumption: '12.5 Lít / 100 km',
    warranty: '5 năm hoặc 150.000 km',
    featuresVi: [
      'Động cơ công nghệ Đức tiên tiến siêu tiết kiệm nhiên liệu',
      'Hộp số sàn 6 cấp mượt mà, tỷ số truyền tối ưu leo dốc',
      'Hệ thống phanh khí nén 2 dòng (phanh hơi lốc-kê) an toàn tuyệt đối',
      'Ghế lái bóng hơi êm ái cho tài xế chạy đường dài'
    ],
    featuresEn: [
      'Advanced German technology engine, highly fuel-efficient',
      'Smooth 6-speed manual transmission, optimized for hill climbing',
      'Dual-circuit pneumatic braking (full air brakes) for absolute safety',
      'Pneumatic suspension driver seat for premium long-haul comfort'
    ]
  },
  {
    id: 'heavy-d',
    category: 'heavy',
    categoryVi: 'Xe tải nặng',
    categoryEn: 'Heavy Trucks',
    name: 'KIM LONG Heavy-D',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 1.250.000.000 VNĐ',
    priceEn: 'From 1,250,000,000 VND',
    shortDescVi: 'Người khổng lồ trên mọi hành trình. Thiết kế 3 chân bền bỉ, chịu tải nặng vượt mọi địa hình.',
    shortDescEn: 'The giant of the roads. Durable 3-axle design, built to conquer heavy payloads across all terrains.',
    dimensions: '11.980 x 2.500 x 3.650 mm',
    power: '340 HP',
    engineOrBattery: 'Động cơ Diesel thế hệ mới, dung tích 9.7L',
    payload: '15.000 kg',
    fuelConsumption: '22 Lít / 100 km',
    warranty: '3 năm hoặc 200.000 km',
    featuresVi: [
      'Cầu sau vi sai tỷ số truyền lớn lực kéo cực đại đường đèo dốc',
      'Lớp sắt-xi kép 2 lớp siêu cứng gia cường chịu tải cự ly siêu nặng',
      'Cabin đôi có giường nằm rộng rãi cao cấp, cách âm hoàn hảo',
      'Hệ thống điều khiển ga tự động Cruise Control giảm mệt mỏi cho tài xế'
    ],
    featuresEn: [
      'High-ratio differential rear axles for maximum pull on steep passes',
      'Double-layered high-rigidity chassis reinforced for extreme payloads',
      'Sizable double cabin with dynamic sleeper berth, quiet acoustic damping',
      'Cruise Control system to relieve driver fatigue on long highways'
    ]
  },
  {
    id: 'prime-t',
    category: 'tractor',
    categoryVi: 'Xe đầu kéo',
    categoryEn: 'Tractors / Prime Movers',
    name: 'KIM LONG Prime-T',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 1.850.000.000 VNĐ',
    priceEn: 'From 1,850,000,000 VND',
    shortDescVi: 'Trái tim của ngành logistics đường dài. Sức kéo khủng, vận hành bền bỉ siêu bền.',
    shortDescEn: 'The heart of long-haul logistics. Extreme pulling capacity, reliable and long-lasting operations.',
    dimensions: '6.900 x 2.500 x 3.900 mm',
    power: '420 HP hoặc 460 HP',
    engineOrBattery: 'Động cơ Weichai EURO 5 tăng áp liên hoàn',
    payload: 'Sức kéo thiết kế đến 40.000 kg',
    fuelConsumption: '28-32 Lít / 100 km (Có tải)',
    warranty: '3 năm hoặc vô hạn km',
    featuresVi: [
      'Hộp số Fast Gear 12 số tiến 2 số lùi trợ lực hơi nhẹ nhàng',
      'Hệ thống xử lý khí thải SCR thông minh đạt chuẩn EURO 5 thân thiện môi trường',
      'Mâm kéo JOST của Đức cao cấp chống rung lắc khớp nối',
      'Hệ thống treo khí nén Cabin 4 điểm êm ái vượt địa hình mấp mô'
    ],
    featuresEn: [
      'Fast Gear transmission with 12 forward/2 reverse pneumatic-assisted speeds',
      'Eco-friendly SCR intelligent exhaust treatment meeting EURO 5 standard',
      'Premium German JOST fifth wheel connector reducing coupling vibrations',
      '4-point pneumatic cabin suspension for flawless ride quality on bumpy roads'
    ]
  },
  {
    id: 'x9-van',
    category: 'minibus',
    categoryVi: 'Minibus & Van',
    categoryEn: 'Minibus & Van',
    name: 'KIM LONG X9 VAN',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: '530.000.000 VNĐ',
    priceEn: '530,000,000 VND',
    shortDescVi: 'Dòng xe tải Van KIM LONG X9 (phiên bản Van 2026). Thiết kế hiện đại sang trọng, tải trọng ưu việt chạy phố 24/7.',
    shortDescEn: 'KIM LONG X9 Cargo Van 2026. Elegant, grand cargo space, optimized payload for unrestricted 24/7 city transport.',
    dimensions: '4.900 x 1.840 x 2.150 mm',
    power: '130 HP',
    engineOrBattery: 'Động cơ Diesel phun điện tử siêu tiết kiệm',
    payload: '950 kg',
    fuelConsumption: '7.8 Lít / 100 km',
    warranty: '3 năm hoặc 100.000 km',
    featuresVi: [
      'Giá niêm yết: 530.000.000 VNĐ (Đã bao gồm VAT)',
      'Giá bán tối thiểu hỗ trợ: 530.000.000 VNĐ',
      'Vận chuyển hàng hóa linh hoạt, sang trọng tương đương xe du lịch',
      'Trang bị hệ thống lái trợ lực, điều hòa khoang lái mát sâu cực nhanh'
    ],
    featuresEn: [
      'Listed Price: 530,000,000 VND (VAT included)',
      'Minimum supported price: 530,000,000 VND',
      'Highly flexible logistics capability with executive visual presence',
      'Equipped with hydraulic power steering and rapid deep cabin cooling AC'
    ]
  },
  {
    id: 'kimlong-x9',
    category: 'minibus',
    categoryVi: 'Minibus',
    categoryEn: 'Minibus',
    name: 'KIM LONG X9 (16 Chỗ)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: '719.000.000 VNĐ',
    priceEn: '719,000,000 VND',
    shortDescVi: 'Chuẩn mực xe khách 16 chỗ thế hệ mới 2026. Động cơ DK5E tiết kiệm dầu, không gian nội thất thoáng đãng êm ái.',
    shortDescEn: 'Standard 2026 16-seater passenger van. Fuel-efficient DK5E engine with upscale, spacious and quiet cabin.',
    dimensions: '4.900 x 1.840 x 2.240 mm',
    power: '135 HP',
    engineOrBattery: 'Động cơ DK5E công nghệ hiện đại tối ưu',
    payload: '16 chỗ ngồi rộng rãi',
    fuelConsumption: '8.0 Lít / 100 km',
    warranty: '3 năm hoặc 100.000 km',
    featuresVi: [
      'Giá công bố bán lẻ: 719.000.000 VNĐ (Đã có VAT)',
      'Giá bán tối thiểu hỗ trợ đại lý: 699.000.000 VNĐ',
      'Hàng ghế bọc da cao cấp với góc ngả thoải mái cho hành khách',
      'Điều hòa đa vùng độc lập kết hợp cửa gió riêng biệt từng hàng ghế'
    ],
    featuresEn: [
      'Listed Retail Price: 719,000,000 VND (VAT included)',
      'Minimum retail support price: 699,000,000 VND',
      'Plush passenger seats with high recline angle comfort',
      'Independent multi-zone air-conditioning with individual passenger vents'
    ]
  },
  {
    id: 'kimlong-99n29',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 99 N29 (Bus 29 Ghế)',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 1.990.000.000 VNĐ',
    priceEn: 'From 1,990,000,000 VND',
    shortDescVi: 'Xe khách 29 chỗ ngồi thế hệ mới dài 9m2 và 12m của KIM LONG. Sang trọng, đẳng cấp và vận hành êm ái cực đỉnh.',
    shortDescEn: 'Next-generation 29-seat coach by KIM LONG (9.2m & 12m). Highly elegant, dynamic and incredibly quiet.',
    dimensions: '9.200 x 2.450 x 3.400 mm hoặc 12.000 x 2.500 x 3.500 mm',
    power: '240 HP / 375 HP',
    engineOrBattery: 'Động cơ Weichai / Yuchai Euro 5',
    payload: '29 Ghế ngồi cao cấp',
    fuelConsumption: '14.5 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Bảng giá dòng xe 29 ghế ngồi (Đã bao gồm VAT):',
      '1. Bản 9m2 Tiêu chuẩn (Yuchai 2026): 1.990.000.000 VNĐ (Không có bản đưa đón)',
      '2. Bản 12m Tiêu chuẩn (Yuchai/Weichai): 3.440.000.000 VNĐ (Tối thiểu 3.410.000.000đ)',
      '3. Bản 12m Đưa đón (Yuchai/Weichai): 2.960.000.000 VNĐ (Tối thiểu 2.930.000.000đ)'
    ],
    featuresEn: [
      'Pricing breakdown for 29-seat coach (VAT included):',
      '1. 9.2m Standard model (Yuchai 2026): 1,990,000,000 VND (No shuttle version)',
      '2. 12m Standard model (Yuchai/Weichai): 3,440,000,000 VND (Min: 3,410,000,000 VND)',
      '3. 12m Shuttle model (Yuchai/Weichai): 2,960,000,000 VND (Min: 2,930,000,000 VND)'
    ]
  },
  {
    id: 'kimlong-29n35',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 29 N35 (Bus 29 Ghế - 9m2)',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: '2.010.000.000 VNĐ',
    priceEn: '2,010,000,000 VND',
    shortDescVi: 'Phiên bản xe khách 29 ghế ngồi chiều dài 9m2 cao cấp KIM LONG 29 N35, sử dụng động cơ Yuchai Euro 5.',
    shortDescEn: 'Premium 29-seat seated coach 9.2m series KIM LONG 29 N35, featuring advanced Yuchai Euro 5 engine.',
    dimensions: '9.200 x 2.450 x 3.420 mm',
    power: '240 HP',
    engineOrBattery: 'Động cơ Yuchai Euro 5 khỏe khoắn và bền bỉ',
    payload: '29 Ghế ngồi ngả rộng rãi',
    fuelConsumption: '14.0 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Giá công bố niêm yết: 2.010.000.000 VNĐ (Không có phiên bản đưa đón)',
      'Giá bán tối thiểu hỗ trợ đại lý: 2.010.000.000 VNĐ',
      'Nội thất sang trọng bọc da, trang bị đèn trần LED tinh tế dải màu ấn tượng',
      'Trang bị treo khí nén bầu hơi Komman triệt tiêu xóc nảy'
    ],
    featuresEn: [
      'Listed MSRP Price: 2,010,000,000 VND (No shuttle version)',
      'Minimum supported retail price: 2,010,000,000 VND',
      'Upscale leather-wrapped seats, exquisite linear LED roof lighting',
      'Advanced Komman air suspension bellows absorbing all bumps'
    ]
  },
  {
    id: 'kimlong-99n47',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 99 N47 (Bus 47 Ghế)',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 2.610.000.000 VNĐ',
    priceEn: 'From 2,610,000,000 VND',
    shortDescVi: 'Xe khách cỡ lớn 47 ghế ngồi chiều dài 12m thương hiệu KIM LONG. Sự kết hợp hoàn hảo giữa công suất và trải nghiệm di chuyển.',
    shortDescEn: 'Large 47-seat 12m coach under KIM LONG brand. Harmonizing maximum torque and supreme ride quality.',
    dimensions: '12.000 x 2.500 x 3.550 mm',
    power: '375 HP',
    engineOrBattery: 'Động cơ Yuchai / Weichai Euro 5 công suất lớn',
    payload: '47 Ghế ngồi',
    fuelConsumption: '18.0 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Chi tiết bảng giá (Đã bao gồm VAT):',
      '1. Bản Tiêu chuẩn (Yuchai/Weichai): 2.960.000.000 VNĐ (Giá tối thiểu 2.930.000.000đ)',
      '2. Bản Đưa đón (Yuchai/Weichai): 2.610.000.000 VNĐ (Giá tối thiểu 2.580.000.000đ)',
      'Trang bị bầu hơi, phanh Retarder điện từ an toàn tuyệt đối khi đổ dốc đèo'
    ],
    featuresEn: [
      'Detailed price sheet (VAT included):',
      '1. Standard model (Yuchai/Weichai): 2,960,000,000 VND (Min: 2,930,000,000 VND)',
      '2. Shuttle model (Yuchai/Weichai): 2,610,000,000 VND (Min: 2,580,000,000 VND)',
      'Air suspension, Retarder electromagnetic brake system for absolute downhill security'
    ]
  },
  {
    id: 'kimlong-99g34',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 99 G34 (34 Giường VIP)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 3.609.000.000 VNĐ',
    priceEn: 'From 3,609,000,000 VND',
    shortDescVi: 'Xe khách giường nằm cao cấp 34 giường VIP của KIM LONG. Không gian phòng riêng tư độc lập, trang bị tối tân.',
    shortDescEn: 'KIM LONG luxury 34 VIP sleeper suites coach. Features private individual cabins and modern multimedia entertainment.',
    dimensions: '12.180 x 2.500 x 3.600 mm',
    power: '375 HP',
    engineOrBattery: 'Động cơ Diesel Weichai/Yuchai Euro 5',
    payload: '34 Giường phòng VIP',
    fuelConsumption: '19.0 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Báo giá chi tiết các phiên bản (Đã gồm VAT):',
      '1. Bản Cao cấp (Yuchai/Weichai): 3.739.000.000 VNĐ (Tối thiểu 3.709.000.000đ)',
      '2. Bản Tiêu chuẩn: 3.609.000.000 VNĐ (Tối thiểu 3.579.000.000đ - Cắt giảm LCD, đèn tam cấp, đèn khoang giường)',
      'Khoang giường nằm siêu rộng có rèm che riêng tư, sạc USB, tivi giải trí sắc nét'
    ],
    featuresEn: [
      'Detailed pricing breakdown (VAT included):',
      '1. Premium model (Yuchai/Weichai): 3,739,000,000 VND (Min: 3,709,000,000 VND)',
      '2. Standard model: 3,609,000,000 VND (Min: 3,579,000,000 VND - without LCD screen/stair/bed lights)',
      'Wide sleeper compartments with private curtains, USB charging, independent LED TV'
    ]
  },
  {
    id: 'kimlong-99g32',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 99 G32 + WC (32 Giường VIP)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 3.709.000.000 VNĐ',
    priceEn: 'From 3,709,000,000 VND',
    shortDescVi: 'Mẫu xe giường nằm 32 khoang VIP trang bị thêm hệ thống nhà vệ sinh WC khép kín cực kỳ tiện nghi, sạch sẽ.',
    shortDescEn: 'Premium 32 VIP bed cabins coach featuring integrated flush toilet (WC), the ultimate standard of trans-province travel.',
    dimensions: '12.180 x 2.500 x 3.600 mm',
    power: '375 HP',
    engineOrBattery: 'Động cơ Yuchai / Weichai Euro 5 bốc bỉ',
    payload: '32 Giường nằm VIP + WC',
    fuelConsumption: '19.5 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Báo giá chi tiết các phiên bản (Đã gồm VAT):',
      '1. Bản Cao cấp (Yuchai/Weichai): 3.839.000.000 VNĐ (Tối thiểu 3.809.000.000đ)',
      '2. Bản Tiêu chuẩn: 3.709.000.000 VNĐ (Tối thiểu 3.679.000.000đ - Cắt giảm LCD, đèn tam cấp, đèn khoang giường)',
      'Trang bị WC khép kín khử mùi, trần đèn LED 3D bầu trời sao lung linh giảm mỏi mắt'
    ],
    featuresEn: [
      'Detailed pricing breakdown (VAT included):',
      '1. Premium model (Yuchai/Weichai): 3,839,000,000 VND (Min: 3,809,000,000 VND)',
      '2. Standard model: 3,709,000,000 VND (Min: 3,679,000,000 VND - without LCD screen/stair/bed lights)',
      'Odorless private onboard restroom (WC), grand 3D starlight LED ceiling'
    ]
  },
  {
    id: 'kimlong-99g24',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 99 G24 (24 Phòng VIP)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 3.809.000.000 VNĐ',
    priceEn: 'From 3,809,000,000 VND',
    shortDescVi: 'Cung điện di động đích thực với 24 phòng VIP siêu rộng rãi, trang bị ghế massage cao cấp mang lại hành trình 5 sao.',
    shortDescEn: 'A true mobile palace with 24 ultra-spacious VIP single suites, integrated luxury massage chairs for a 5-star travel experience.',
    dimensions: '12.180 x 2.500 x 3.620 mm',
    power: '410 HP',
    engineOrBattery: 'Động cơ Weichai / Yuchai Euro 5 hiệu năng cao',
    payload: '24 Cabin đơn VIP',
    fuelConsumption: '20.0 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Báo giá chi tiết các phiên bản (Đã gồm VAT):',
      '1. Bản Cao cấp (Yuchai/Weichai): 3.989.000.000 VNĐ (Tối thiểu 3.959.000.000đ)',
      '2. Bản Tiêu chuẩn (Yuchai): 3.809.000.000 VNĐ (Tối thiểu 3.779.000.000đ - Cắt giảm LCD, đèn tam cấp, đèn khoang giường)',
      'Hệ thống ghế massage đa điểm nâng niu cơ thể hành khách suốt hành trình dài'
    ],
    featuresEn: [
      'Detailed pricing breakdown (VAT included):',
      '1. Premium model (Yuchai/Weichai): 3,989,000,000 VND (Min: 3,959,000,000 VND)',
      '2. Standard model (Yuchai): 3,809,000,000 VND (Min: 3,779,000,000 VND - without LCD/stair/bed lights)',
      'Multi-point orthopedic massage seats relaxing passenger muscles during long journeys'
    ]
  },
  {
    id: 'kimlong-99g22',
    category: 'bus',
    categoryVi: 'Xe bus',
    categoryEn: 'Buses',
    name: 'KIM LONG 99 G22 + WC (Cung Điện Di Động)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    priceVi: 'Từ 3.859.000.000 VNĐ',
    priceEn: 'From 3,859,000,000 VND',
    shortDescVi: 'Đỉnh cao xa hoa xa lộ: 22 khoang cabin cung điện hoàng gia có tích hợp nhà vệ sinh, tiện ích giải trí thượng lưu.',
    shortDescEn: 'The pinnacle of luxury highway travel: 22 royal palace single bed compartments with integrated WC and luxury amenities.',
    dimensions: '12.180 x 2.500 x 3.650 mm',
    power: '410 HP',
    engineOrBattery: 'Động cơ Weichai / Yuchai Euro 5 công nghệ hàng đầu',
    payload: '22 Cung điện VIP + WC',
    fuelConsumption: '20.5 Lít / 100 km',
    warranty: '3 năm hoặc 150.000 km',
    featuresVi: [
      'Báo giá chi tiết các phiên bản (Đã gồm VAT):',
      '1. Bản Cao cấp (Yuchai/Weichai): 4.039.000.000 VNĐ (Tối thiểu 4.009.000.000đ)',
      '2. Bản Tiêu chuẩn: 3.859.000.000 VNĐ (Tối thiểu 3.829.000.000đ - Cắt giảm LCD, đèn tam cấp, đèn khoang giường)',
      'Cabin bọc da siêu lớn, tai nghe headphone riêng, cổng sạc, rèm che tuyệt đối riêng tư'
    ],
    featuresEn: [
      'Detailed pricing breakdown (VAT included):',
      '1. Premium model (Yuchai/Weichai): 4,039,000,000 VND (Min: 4,009,000,000 VND)',
      '2. Standard model: 3,859,000,000 VND (Min: 3,829,000,000 VND - without LCD/stair/bed lights)',
      'Ultra-spacious leather suites, custom headphones, multi-outlets, complete privacy curtains'
    ]
  }
];

export const BENEFITS = [
  {
    id: 'consult',
    iconName: 'UserCheck',
    titleVi: 'Tư vấn tận tâm',
    titleEn: 'Dedicated Advice',
    descVi: 'Khảo sát nhu cầu vận tải thực tế, tư vấn dòng xe chính xác giúp tối ưu hóa chi phí đầu tư ban đầu.',
    descEn: 'Survey your real transport logistics needs to advise the perfect vehicle, optimizing initial investment.'
  },
  {
    id: 'installment',
    iconName: 'Percent',
    titleVi: 'Hỗ trợ trả góp',
    titleEn: 'Installment Support',
    descVi: 'Liên kết ngân hàng uy tín toàn quốc, hỗ trợ vay 75% - 85% giá trị xe với lãi suất cực thấp, thủ tục nhanh.',
    descEn: 'Partnered with major domestic banks to fund 75% - 85% of car value at low interest with minimal paperwork.'
  },
  {
    id: 'delivery',
    iconName: 'Truck',
    titleVi: 'Giao xe tận nơi',
    titleEn: 'Home Delivery',
    descVi: 'Giao xe trên toàn quốc, cam kết bàn giao đúng tiến độ hợp đồng, kiểm tra nghiêm ngặt trước khi xuất showroom.',
    descEn: 'Countrywide delivery, guaranteed strictly on schedule with detailed multi-point pre-delivery inspections.'
  },
  {
    id: 'registration',
    iconName: 'FileText',
    titleVi: 'Hỗ trợ đăng ký',
    titleEn: 'Registration Service',
    descVi: 'Hỗ trợ trọn gói thủ tục đăng ký, đăng kiểm, ra biển số, xin phù hiệu vận tải nhanh gọn trong ngày.',
    descEn: 'Comprehensive support for vehicle registration, emissions checking, plates, and transport license badges.'
  },
  {
    id: 'insurance',
    iconName: 'ShieldCheck',
    titleVi: 'Bảo hiểm xe',
    titleEn: 'Vehicle Insurance',
    descVi: 'Tư vấn và bán bảo hiểm vật chất, bảo hiểm dân sự chính hãng chất lượng cao, bồi thường nhanh chóng.',
    descEn: 'Consulting and processing official top-tier damage and liability insurance with prompt claim approvals.'
  },
  {
    id: 'aftersales',
    iconName: 'Wrench',
    titleVi: 'Chăm sóc sau bán',
    titleEn: 'After-sales Care',
    descVi: 'Đồng hành trọn đời xe. Nhắc lịch bảo dưỡng định kỳ, hỗ trợ kỹ thuật cứu hộ 24/7 và phụ tùng Kim Long chính hãng.',
    descEn: 'Lifelong partnership. Periodic service reminders, 24/7 breakdown technical support, and genuine parts.'
  }
];

export const BUYING_STEPS = [
  {
    step: 1,
    titleVi: 'Tư vấn nhu cầu',
    titleEn: 'Needs Consultation',
    descVi: 'Gặp gỡ, trao đổi về mặt hàng vận chuyển, cung đường di chuyển và tải trọng mong muốn.',
    descEn: 'Meet and discuss cargo types, regular shipping routes, and the targeted payload capacity.'
  },
  {
    step: 2,
    titleVi: 'Báo giá & Khuyến mãi',
    titleEn: 'Quote & Promotion',
    descVi: 'Cung cấp bảng giá lăn bánh chi tiết kèm theo các chương trình khuyến mãi, quà tặng hiện hành.',
    descEn: 'Receive a fully detailed on-road price sheet breakdown along with active promotional gifts.'
  },
  {
    step: 3,
    titleVi: 'Lái thử trải nghiệm',
    titleEn: 'Experience Test Drive',
    descVi: 'Trực tiếp ngồi sau vô lăng, lái thử dòng xe thực tế tại showroom để kiểm chứng cảm giác lái.',
    descEn: 'Directly sit behind the wheel and test-drive the actual vehicles at the showroom to check feel.'
  },
  {
    step: 4,
    titleVi: 'Ký hợp đồng & Đặt cọc',
    titleEn: 'Contract & Deposit',
    descVi: 'Hoàn thiện hồ sơ hợp đồng mua bán, làm thủ tục vay ngân hàng trả góp (nếu có).',
    descEn: 'Finalize buying contract paperwork, submit bank application for installment loans if applicable.'
  },
  {
    step: 5,
    titleVi: 'Bàn giao xe',
    titleEn: 'Vehicle Handover',
    descVi: 'Tiến hành lễ bàn giao xe trang trọng, chụp ảnh kỷ niệm và hướng dẫn sử dụng chi tiết.',
    descEn: 'Perform a grand vehicle handover ceremony, take photos, and provide detailed functional reviews.'
  },
  {
    step: 6,
    titleVi: 'Bảo hành & Bảo dưỡng',
    titleEn: 'Warranty & Maintenance',
    descVi: 'Thực hiện chế độ bảo dưỡng định kỳ tại trạm dịch vụ Kim Long Motor 3S toàn quốc.',
    descEn: 'Follow up with routine inspections and maintenance at dynamic 3S service stations nationwide.'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Nguyễn Văn Hùng',
    roleVi: 'Giám đốc Công ty Vận tải Hùng Phát',
    roleEn: 'Director of Hung Phat Logistics',
    rating: 5,
    commentVi: 'Tôi đã đầu tư lô 5 xe Kim Long EV-300 qua tư vấn của Ti Toàn. Em Toàn tư vấn rất chân thành, tính toán chi phí sạc điện so với dầu rất chi tiết giúp công ty tối ưu được 40% chi phí vận hành. Giao xe đúng hẹn và hỗ trợ ngân hàng vay 80% thủ tục nhanh gọn.',
    commentEn: 'I invested in a fleet of 5 Kim Long EV-300 electric trucks through Ti Toàn. He consulted extremely transparently, calculating fuel vs electricity costs in great detail, saving us 40% in operation costs. Superb and on-time.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    handoverImage: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800',
    vehicleModel: 'KIM LONG EV-300'
  },
  {
    id: 'rev-2',
    name: 'Phạm Minh Trí',
    roleVi: 'Chủ cơ sở phân phối nông sản Đà Lạt',
    roleEn: 'Owner of Da Lat Agricultural Distribution',
    rating: 5,
    commentVi: 'Mua xe tải nhẹ KIMAN9 của Ti Toàn làm tôi cực kỳ an tâm. Lúc xe gặp sự cố nhỏ trên đường đèo lúc đêm muộn, gọi điện em ấy vẫn nhấc máy hướng dẫn tận tình và điều đội cứu hộ lưu động đến xử lý ngay lập tức. Làm việc cực kỳ có trách nhiệm.',
    commentEn: 'Buying the KIMAN9 truck from Ti Toàn gave me absolute peace of mind. When I had a small glitch on a mountain pass late at night, he picked up right away and dispatched mobile rescue service to solve it. Immensely responsible.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    handoverImage: 'https://images.unsplash.com/photo-1591768793355-74d75b51a55d?auto=format&fit=crop&q=80&w=800',
    vehicleModel: 'KIM LONG KIMAN9 (1.99T)'
  },
  {
    id: 'rev-3',
    name: 'Trần Thị Mỹ Linh',
    roleVi: 'Đại diện Công ty Du lịch Thành Đạt',
    roleEn: 'Representative of Thanh Dat Travel Co.',
    rating: 5,
    commentVi: 'Dòng xe 16 chỗ KIM LONG X9 rất sang trọng, khách du lịch của chúng tôi khen suốt vì ghế bọc da êm ái và mát sâu. Ti Toàn hỗ trợ đăng ký biển số vàng và xin phù hiệu xe hợp đồng trọn gói, chúng tôi chỉ việc nhận xe và chạy ngay.',
    commentEn: 'The KIM LONG X9 minibus is outstandingly luxury. Our tourists frequently praise the plush leather seats and deep cooling AC. Ti Toàn processed all gold-plate commercial registrations and contract permits. Zero hassle.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    handoverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    vehicleModel: 'KIM LONG X9 (16 Chỗ)'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    category: 'installment',
    categoryVi: 'Chính sách trả góp',
    categoryEn: 'Installment Policy',
    titleVi: 'Hướng dẫn thủ tục vay trả góp xe tải Kim Long Motor mới nhất 2026',
    titleEn: 'Latest 2026 Guide to Kim Long Truck Installment Loans',
    summaryVi: 'Chi tiết các bước chuẩn bị hồ sơ cá nhân và doanh nghiệp để được duyệt vay lên đến 85% giá trị xe với lãi suất ưu đãi tối ưu.',
    summaryEn: 'Comprehensive guidelines on personal and corporate paperwork to secure up to 85% financing at highly optimal interest rates.',
    contentVi: 'Mua xe tải trả góp là phương thức đầu tư thông minh được 90% khách hàng lựa chọn để tối ưu dòng tiền quay vòng vốn. Tại Kim Long Motor, Ti Toàn kết nối trực tiếp với các ngân hàng lớn như BIDV, VietinBank, TPBank để mang đến gói lãi suất chỉ từ 6.5%/năm. Hồ sơ cực đơn giản chỉ cần CCCD đối với cá nhân hoặc báo cáo tài chính nội bộ đối với doanh nghiệp. Thời gian phê duyệt hồ sơ nhanh chóng chỉ trong vòng 48h làm việc.',
    contentEn: 'Buying trucks on installment is a smart financing method chosen by 90% of logistics businesses to maximize working capital. At Kim Long Motor, Ti Toàn connects directly with major banks like BIDV, VietinBank, and TPBank to bring low-rate packages from 6.5% annually. Paperwork is simple, requiring national ID for individuals or financial statements for firms. Approvals take under 48 working hours.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    date: '2026-06-25',
    author: 'Ti Toàn'
  },
  {
    id: 'news-2',
    category: 'knowledge',
    categoryVi: 'Kiến thức xe',
    categoryEn: 'Vehicle Knowledge',
    titleVi: 'Xe tải điện: Chi phí sạc điện thực tế có rẻ hơn chạy dầu Diesel không?',
    titleEn: 'Electric Trucks: Is Charging Really Cheaper Than Diesel Fuel?',
    summaryVi: 'Bài phân tích so sánh chi tiết bài toán kinh tế giữa điện năng và dầu Diesel trên quãng đường 100km thực tế của xe tải nhẹ EV-300.',
    summaryEn: 'A detailed economic analysis comparing electrical power and Diesel fuel consumption over 100km for the EV-300 light truck.',
    contentVi: 'Được trang bị pin LFP dung tích 105 kWh, Kim Long EV-300 có thể di chuyển 350km cho một lần sạc đầy. Chi phí cho một số điện tại trạm sạc công cộng hiện nay khoảng 3.850đ, nghĩa là sạc đầy pin tốn khoảng 400.000đ. Trung bình chi phí nhiên liệu khoảng 114.000đ cho mỗi 100km. Trong khi đó, một xe tải chạy dầu cùng tải trọng tiêu thụ khoảng 9-10 lít dầu Diesel, tương đương khoảng 180.000đ - 200.000đ. Như vậy xe tải điện tiết kiệm khoảng 40% chi phí nhiên liệu trực tiếp và giảm tới 70% chi phí bảo dưỡng định kỳ do không có bugi, lọc dầu, piston phức tạp.',
    contentEn: 'Equipped with a 105 kWh LFP battery, the Kim Long EV-300 covers up to 350km on a full charge. Costing approximately 3,850 VND per kWh at commercial charging stations, a full charge costs around 400,000 VND. This equates to fuel costs of only 114,000 VND per 100km. Meanwhile, a Diesel truck with similar payload consumes about 9-10 liters of fuel, costing 180,000 to 200,000 VND. Electric trucks therefore slash fuel expenses by 40% and periodic maintenance by 70%.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    date: '2026-06-18',
    author: 'Ti Toàn'
  },
  {
    id: 'news-3',
    category: 'promotion',
    categoryVi: 'Tin khuyến mãi',
    categoryEn: 'Promotions',
    titleVi: 'Siêu khuyến mãi Kim Long Motor: Miễn phí 100% lệ phí trước bạ tháng này',
    titleEn: 'Kim Long Mega Promo: 100% Registration Tax Subsidy This Month',
    summaryVi: 'Cơ hội vàng sở hữu xe tải thương mại Kim Long với hỗ trợ trước bạ 100% cùng gói phụ tùng bảo dưỡng chính hãng trị giá 20 triệu.',
    summaryEn: 'A golden opportunity to acquire commercial vehicles with full tax subsidies and maintenance parts package worth 20M VND.',
    contentVi: 'Nhằm tri ân khách hàng đồng hành, Kim Long Motor triển khai chương trình khuyến mãi quy mô lớn nhất năm. Tất cả khách hàng ký hợp đồng mua xe trong tháng này qua Ti Toàn sẽ được hỗ trợ toàn bộ 100% phí trước bạ lăn bánh, tặng kèm định vị GPS hợp chuẩn, phù hiệu vận tải xe tải cùng phiếu bảo dưỡng miễn phí 3 lần đầu. Số lượng có hạn, liên hệ ngay Hotline để đặt cọc giữ khuyến mãi.',
    contentEn: 'To appreciate our customers, Kim Long Motor launched our biggest campaign this year. All customers signing contracts through Ti Toàn this month will receive a full 100% registration fee rebate, GPS tracker, contract commercial badge, and 3 complimentary service cycles.',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800',
    date: '2026-06-10',
    author: 'Ti Toàn'
  }
];

export const FAQS: FAQItem[] = [
  // 1-3 Price FAQs
  {
    id: 'faq-1',
    category: 'price',
    questionVi: 'Bảng giá niêm yết của xe Kim Long Motor đã bao gồm thuế VAT chưa?',
    questionEn: 'Are the listed Kim Long Motor vehicle prices inclusive of VAT?',
    answerVi: 'Tất cả giá xe tải, xe bus thương mại Kim Long công bố trên website đều đã bao gồm thuế giá trị gia tăng (VAT) 10% nhưng chưa bao gồm các chi phí đăng ký lăn bánh khác như lệ phí trước bạ, phí biển số, bảo hiểm, phí đường bộ.',
    answerEn: 'Yes, all listed commercial truck and bus prices published on our website include the standard 10% VAT, but exclude on-road registration costs (taxes, licensing, registration fees, insurance, road tax).'
  },
  {
    id: 'faq-2',
    category: 'price',
    questionVi: 'Chi phí lăn bánh hoàn thiện một chiếc xe tải nhẹ bao gồm những khoản gì?',
    questionEn: 'What expenses make up the total on-road price for a light truck?',
    answerVi: 'Chi phí đăng ký lăn bánh hoàn thiện gồm có: Lệ phí trước bạ (2% giá trị xe đối với xe tải), phí biển số, bảo hiểm trách nhiệm dân sự bắt buộc, bảo hiểm thân vỏ tự nguyện, phí kiểm định đăng kiểm, phí bảo trì đường bộ (1 hoặc 2 năm) và chi phí dịch vụ đăng ký.',
    answerEn: 'On-road registration costs include: Registration tax (2% of truck value), license plate fee, compulsory third-party liability insurance, voluntary physical damage insurance, vehicle inspection fee, road maintenance fee (1 or 2 years), and handling services.'
  },
  {
    id: 'faq-3',
    category: 'price',
    questionVi: 'Tôi có nhận được thêm ưu đãi giảm giá sâu nếu mua xe số lượng lớn cho công ty không?',
    questionEn: 'Are there bulk purchase discounts available for corporate fleet orders?',
    answerVi: 'Chắc chắn có. Ti Toàn luôn có chính sách chiết khấu giá bán đặc biệt hấp dẫn cho các khách hàng doanh nghiệp vận tải mua lô từ 3 xe trở lên, kèm theo các cam kết ưu tiên bảo dưỡng dịch vụ 3S lưu động tận nơi.',
    answerEn: 'Absolutely. Ti Toàn offers exceptional commercial fleet discounts and attractive incentive schemes for corporate orders of 3 or more vehicles, alongside dedicated 3S onsite mobile maintenance priority agreements.'
  },
  // 4-7 Installment FAQs
  {
    id: 'faq-4',
    category: 'installment',
    questionVi: 'Thủ tục mua xe tải trả góp qua ngân hàng cần chuẩn bị những giấy tờ gì?',
    questionEn: 'What documents are required to secure an installment loan for a truck?',
    answerVi: 'Đối với cá nhân: CCCD, Giấy chứng nhận độc thân hoặc Giấy đăng ký kết hôn. Đối với doanh nghiệp: Giấy phép ĐKKD, CCCD người đại diện pháp luật, báo cáo tài chính năm gần nhất và tờ khai VAT 6 tháng gần nhất.',
    answerEn: 'For individuals: ID Card, proof of single status or marriage certificate. For businesses: Business registration license, ID card of legal representative, latest year financial report, and VAT filings for the past 6 months.'
  },
  {
    id: 'faq-5',
    category: 'installment',
    questionVi: 'Hạn mức vay tối đa của ngân hàng đối với dòng xe Kim Long Motor là bao nhiêu?',
    questionEn: 'What is the maximum bank financing percentage for Kim Long vehicles?',
    answerVi: 'Hiện nay các ngân hàng đối tác liên kết của Kim Long hỗ trợ cho vay tối đa từ 75% đến 85% giá trị xe trên hợp đồng, thời hạn vay linh hoạt kéo dài từ 2 đến 7 năm tùy theo hồ sơ tài chính của khách hàng.',
    answerEn: 'Our strategic banking partners offer financing caps up to 75% - 85% of the vehicle contract value, with flexible amortization periods ranging from 2 to 7 years depending on your financial profile.'
  },
  {
    id: 'faq-6',
    category: 'installment',
    questionVi: 'Bị nợ xấu nhóm 2 có hỗ trợ làm thủ tục vay mua xe tải trả góp được không?',
    questionEn: 'Can I purchase a truck on installments if I have group 2 bad debt?',
    answerVi: 'Nợ xấu nhóm 2 vẫn có thể được xem xét hỗ trợ tại một số tổ chức tài chính hoặc ngân hàng thương mại cổ phần tư nhân liên kết. Ti Toàn sẽ trực tiếp thẩm định hồ sơ của anh/chị để đưa ra phương án xử lý phù hợp và khả thi nhất.',
    answerEn: 'Group 2 bad debt can still be evaluated for approval by specific associated private credit institutions and commercial banks. Ti Toàn will personally audit your dossier to recommend the most feasible solution.'
  },
  {
    id: 'faq-7',
    category: 'installment',
    questionVi: 'Lãi suất trả góp trung bình hiện nay khoảng bao nhiêu phần trăm một năm?',
    questionEn: 'What is the average annual interest rate for vehicle installments currently?',
    answerVi: 'Lãi suất ưu đãi năm đầu tiên hiện dao động từ 6.5% - 8.5%/năm (tương đương khoảng 0.55% - 0.7% mỗi tháng). Sau thời gian ưu đãi, lãi suất sẽ thả nổi theo biên độ biên thị trường, thường cộng thêm 3% - 4%.',
    answerEn: 'The promotional interest rate for the first year currently ranges from 6.5% to 8.5% annually (approx 0.55% - 0.7% monthly). Following the promo phase, rates float based on the market index, generally adding 3% - 4% margins.'
  },
  // 8-10 Warranty FAQs
  {
    id: 'faq-8',
    category: 'warranty',
    questionVi: 'Chính sách bảo hành chính hãng của xe tải điện Kim Long EV-300 là bao nhiêu năm?',
    questionEn: 'What is the official warranty policy for the Kim Long EV-300 electric truck?',
    answerVi: 'Xe tải điện EV-300 có chế độ bảo hành vượt trội lên tới 7 năm hoặc 200.000 km cho toàn bộ xe. Đặc biệt, bộ phận Pin LFP cao cấp được áp dụng gói bảo hành riêng biệt lên đến 8 năm giúp khách hàng hoàn toàn yên tâm đầu tư.',
    answerEn: 'The EV-300 electric truck enjoys an extraordinary warranty of 7 years or 200,000 km on the overall vehicle. Furthermore, the high-end LFP battery is backed by a separate dedicated warranty of 8 years.'
  },
  {
    id: 'faq-9',
    category: 'warranty',
    questionVi: 'Khi xe gặp sự cố thì tôi phải mang xe đi bảo hành ở những địa điểm nào?',
    questionEn: 'Where should I take my vehicle for warranty service when a fault occurs?',
    answerVi: 'Anh/chị có thể đưa xe đến bất kỳ trung tâm bảo hành, đại lý ủy quyền 3S của Kim Long Motor trên khắp 63 tỉnh thành Việt Nam. Ti Toàn cũng cung cấp dịch vụ hỗ trợ cứu hộ kỹ thuật khẩn cấp 24/7 di động tận nơi.',
    answerEn: 'You can bring your vehicle to any official Kim Long Motor 3S authorized dealership or service center across all 63 provinces in Vietnam. Ti Toàn also coordinates 24/7 rapid mobile technical roadside assistance.'
  },
  {
    id: 'faq-10',
    category: 'warranty',
    questionVi: 'Những hạng mục hao mòn tự nhiên nào không thuộc phạm vi bảo hành miễn phí?',
    questionEn: 'Which natural wear-and-tear items are excluded from free warranty coverage?',
    answerVi: 'Các chi tiết hao mòn tự nhiên theo thời gian sử dụng như má phanh, lốp xe, chổi gạt mưa, các bóng đèn sợi đốt, dầu mỡ động cơ, lọc nhớt và lọc gió sẽ không nằm trong danh mục bảo hành miễn phí từ hãng.',
    answerEn: 'Natural wear items associated with routine usage such as brake pads, tires, windshield wipers, halogen light bulbs, engine lubricants, fuel/oil filters, and air filters are excluded from free warranty coverage.'
  },
  // 11-13 Registration FAQs
  {
    id: 'faq-11',
    category: 'registration',
    questionVi: 'Ti Toàn có hỗ trợ làm trọn gói thủ tục đăng ký ra biển số vàng kinh doanh không?',
    questionEn: 'Does Ti Toàn assist in registering commercial gold plates?',
    answerVi: 'Có hỗ trợ trọn gói. Ti Toàn hỗ trợ chuẩn bị giấy tờ đăng ký, nộp thuế trước bạ, nộp hồ sơ công an, bấm biển số vàng kinh doanh vận tải và hỗ trợ đăng ký xin cấp phù hiệu xe tải/xe hợp đồng nhanh gọn.',
    answerEn: 'Yes, absolutely. Ti Toàn provides complete handling from preparation, payment of tax, submission to vehicle registry, license plate issuance, to registering contract or fleet commercial transportation stickers.'
  },
  {
    id: 'faq-12',
    category: 'registration',
    questionVi: 'Thời gian hoàn tất thủ tục đăng ký đăng kiểm và ra biển số xe mất bao lâu?',
    questionEn: 'How long does it take to complete registration, inspection, and plate issuance?',
    answerVi: 'Thông thường dịch vụ trọn gói của Ti Toàn chỉ mất đúng 1 ngày làm việc là xe có thể bấm biển số và lưu hành hợp pháp trên đường, giúp khách hàng tiết kiệm tối đa thời gian chờ đợi.',
    answerEn: 'Typically, with Ti Toàn’s handling service, it takes only 1 business day to run taxes, inspect the vehicle, and stamp the license plate, getting your truck road-ready in record time.'
  },
  {
    id: 'faq-13',
    category: 'registration',
    questionVi: 'Mua xe tải đứng tên cá nhân có đăng ký chạy xe hợp đồng kinh doanh vận tải được không?',
    questionEn: 'Can an individually registered truck be used for commercial logistics?',
    answerVi: 'Hoàn toàn được. Anh/chị chỉ cần tham gia vào một hợp tác xã vận tải tại địa phương, dán phù hiệu xe tải hợp chuẩn và lắp thiết bị giám sát hành trình GPS theo đúng quy định pháp luật hiện hành.',
    answerEn: 'Definitely. You only need to join a local transportation cooperative, install an approved GPS tracking device, and paste the required transport badge to comply with state transport regulations.'
  },
  // 14-16 Delivery FAQs
  {
    id: 'faq-14',
    category: 'delivery',
    questionVi: 'Giao xe tận nơi thì tôi có phải tự chịu thêm chi phí vận chuyển xe về nhà không?',
    questionEn: 'Do I have to pay extra transportation fees for home vehicle delivery?',
    answerVi: 'Tùy theo cự ly khoảng cách và dòng xe, Ti Toàn luôn cố gắng cân đối ngân sách để miễn phí vận chuyển giao xe tận nhà cho khách hàng trong bán kính 100km từ showroom gần nhất.',
    answerEn: 'Depending on the distance and model, Ti Toàn always strives to balance budgets to offer complimentary home delivery within a 100km radius from our nearest regional showroom.'
  },
  {
    id: 'faq-15',
    category: 'delivery',
    questionVi: 'Khi nhận xe bàn giao, tôi có được kiểm tra chất lượng xe trước khi ký biên bản không?',
    questionEn: 'Can I do a full check of the vehicle before signing the handover papers?',
    answerVi: 'Rất khuyến khích điều đó. Tại buổi lễ giao xe, Ti Toàn sẽ cùng anh/chị tiến hành kiểm tra chi tiết theo bảng danh mục PDI chính hãng, nghiệm thu nước sơn, lốp xe, hoạt động Cabin, khoang lái trước khi ký bàn giao.',
    answerEn: 'Highly encouraged. At the handover, Ti Toàn will guide you through our comprehensive PDI checklist, inspecting body paint, tires, cabin mechanics, dashboard electronics, and cargo holds before formal signs.'
  },
  {
    id: 'faq-16',
    category: 'delivery',
    questionVi: 'Kim Long Motor có hỗ trợ giao xe vào những khung giờ đẹp, giờ phong thủy không?',
    questionEn: 'Does Kim Long Motor support deliveries during specific feng shui hours?',
    answerVi: 'Có, Ti Toàn tôn trọng văn hóa tâm linh của người làm vận tải nên luôn linh hoạt hỗ trợ giao xe đúng ngày lành, tháng tốt, giờ phong thủy mà gia chủ yêu cầu để mang lại nhiều may mắn, tài lộc.',
    answerEn: 'Yes. Ti Toàn respects local business traditions, so we gladly accommodate handovers during custom auspicious dates and feng shui hours specified by our customers to bring prosperity and luck.'
  },
  // 17-20 Maintenance FAQs
  {
    id: 'faq-17',
    category: 'maintenance',
    questionVi: 'Mốc thời gian hoặc số km cần đưa xe tải đi bảo dưỡng định kỳ lần đầu là bao nhiêu?',
    questionEn: 'When is the first routine maintenance cycle scheduled for a new truck?',
    answerVi: 'Đối với xe tải mới xuất xưởng, mốc bảo dưỡng đầu tiên cực kỳ quan trọng là tại 1.000 km đến 2.000 km đầu tiên (hoặc 1 tháng đầu) để thay dầu bôi trơn rốt-đa, xiết lại gầm bệ và kiểm tra tổng quát.',
    answerEn: 'For brand new trucks, the first service is highly critical and scheduled at the 1,000 km to 2,000 km milestone (or first month) to flush engine run-in lubricants, tighten chassis bolts, and perform general checks.'
  },
  {
    id: 'faq-18',
    category: 'maintenance',
    questionVi: 'Chi phí bảo dưỡng định kỳ xe tải điện Kim Long EV-300 có cao không?',
    questionEn: 'Are the periodic maintenance costs for the Kim Long EV-300 electric truck high?',
    answerVi: 'Cực kỳ rẻ. Do xe tải điện không dùng động cơ đốt trong nên không cần thay dầu máy, lọc dầu, lọc xăng thường xuyên. Chi phí bảo dưỡng của xe tải điện chỉ bằng khoảng 30% so với xe tải chạy dầu Diesel truyền thống.',
    answerEn: 'Extremely inexpensive. Since electric trucks possess no internal combustion engines, they bypass routine oil, spark plug, and fuel filter changes. Service fees are only about 30% of diesel alternatives.'
  },
  {
    id: 'faq-19',
    category: 'maintenance',
    questionVi: 'Tôi có cần đặt lịch hẹn trước khi mang xe đến làm bảo dưỡng sửa chữa không?',
    questionEn: 'Do I need to book an appointment before bringing my truck for maintenance?',
    answerVi: 'Nên đặt hẹn trước. Anh/chị chỉ cần gọi Hotline hoặc nhắn Zalo cho Ti Toàn trước 1 ngày để hệ thống Service của đại lý chuẩn bị khoang kỹ thuật và vật tư phụ tùng sẵn sàng, giúp tiết kiệm thời gian chờ đợi tối đa.',
    answerEn: 'It is highly recommended. Just call or text Ti Toàn via Zalo 1 day in advance so that our service workshop can reserve a dedicated repair bay and prepare genuine parts, minimizing wait times.'
  },
  {
    id: 'faq-20',
    category: 'maintenance',
    questionVi: 'Kim Long Motor có cung cấp dịch vụ sửa chữa lưu động khi xe hỏng hóc trên đường không?',
    questionEn: 'Does Kim Long Motor provide road assistance services for on-road failures?',
    answerVi: 'Có. Chúng tôi sở hữu đội xe kỹ thuật sửa chữa Mobile Service lưu động 24/7 sẵn sàng cứu hộ kỹ thuật, chuẩn đoán lỗi và khắc phục hỏng hóc nhanh chóng trực tiếp trên tuyến đường xe của khách hàng.',
    answerEn: 'Yes. We run a professional Mobile Service fleet operating 24/7, fully equipped with state-of-the-art diagnostic instruments and genuine replacement parts to perform swift roadside repairs.'
  }
];
