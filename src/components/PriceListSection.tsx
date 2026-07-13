import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Download, CheckCircle, Search, Calendar, 
  FileText, Sparkles, Filter, ShieldAlert, ChevronRight, HelpCircle, 
  Flame, DollarSign, Fuel, Award, ArrowRight, Tag, Info, Settings,
  MapPin, Check
} from 'lucide-react';
import { PRODUCTS } from '../data';

export interface VehiclePriceItem {
  dong: 'BUS GHẾ' | 'BUS GIƯỜNG' | 'TẢI';
  loaiXe: string;
  maLoai: string;
  phienBan: string;
  dongCoQuyCach: string;
  namSx: number;
  giaCongBo: number | string;
  ghiChu: string;
}

interface PriceListSectionProps {
  language: 'vi' | 'en';
  isDarkMode: boolean;
  isAdminUnlocked?: boolean;
  onOpenBooking: (vehicleName: string, type: 'quote' | 'test-drive' | 'installment' | 'general') => void;
  onOpenAdminLogin?: () => void;
  onSelectProduct?: (productId: string) => void;
}

const getVehicleImage = (row: VehiclePriceItem): string => {
  const maLoaiClean = row.maLoai.toLowerCase();
  
  if (maLoaiClean.includes('kiman9')) {
    const is199 = maLoaiClean.includes('1.99') || row.loaiXe.includes('1.99');
    const suffix = is199 ? '199t' : '249t';
    const pb = row.phienBan.toLowerCase();
    
    let body = 'thung-kin'; // fallback/default
    if (pb.includes('chassis')) {
      body = 'chassis';
    } else if (pb.includes('lửng')) {
      body = 'thung-lung';
    } else if (pb.includes('kín')) {
      body = 'thung-kin';
    } else if (pb.includes('3b')) {
      body = 'mui-bat-3b';
    } else if (pb.includes('5b')) {
      body = 'mui-bat-5b';
    }
    
    return `/images/vehicles/kiman9-${suffix}-${body}.webp`;
  }

  // Try to find matching product name or keyword in PRODUCTS
  const found = PRODUCTS.find(p => {
    const pNameClean = p.name.toLowerCase();
    
    // Exact match or partial name match
    if (pNameClean.includes(maLoaiClean) || maLoaiClean.includes(pNameClean)) {
      return true;
    }
    
    // Check key models
    if (maLoaiClean.includes('x9') && pNameClean.includes('x9')) {
      // Check if version is 16 chỗ / minibus versus van
      if (row.phienBan.includes('16') || row.loaiXe.toLowerCase().includes('bus')) {
        return pNameClean.includes('16');
      }
      return pNameClean.includes('van');
    }
    if (maLoaiClean.includes('29') && pNameClean.includes('29')) {
      return true;
    }
    if (maLoaiClean.includes('47') && pNameClean.includes('47')) {
      return true;
    }
    if (maLoaiClean.includes('g34') && pNameClean.includes('g34')) {
      return true;
    }
    if (maLoaiClean.includes('g32') && pNameClean.includes('g32')) {
      return true;
    }
    return false;
  });

  if (found) return found.image;

  // Fallback images depending on category
  if (row.dong === 'TẢI') {
    return '/images/vehicles/vehicle-placeholder.svg';
  } else if (row.dong === 'BUS GIƯỜNG') {
    return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'; // luxury coach bus
  } else {
    return 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'; // bus
  }
};

const getMatchingProductId = (row: VehiclePriceItem): string | null => {
  const found = PRODUCTS.find(p => {
    const maLoaiClean = row.maLoai.toLowerCase();
    const pNameClean = p.name.toLowerCase();
    
    if (pNameClean.includes(maLoaiClean) || maLoaiClean.includes(pNameClean)) {
      return true;
    }
    
    if (maLoaiClean.includes('x9') && pNameClean.includes('x9')) {
      if (row.phienBan.includes('16') || row.loaiXe.toLowerCase().includes('bus')) {
        return pNameClean.includes('16');
      }
      return pNameClean.includes('van');
    }
    if (maLoaiClean.includes('29') && pNameClean.includes('29')) return true;
    if (maLoaiClean.includes('47') && pNameClean.includes('47')) return true;
    if (maLoaiClean.includes('g34') && pNameClean.includes('g34')) return true;
    if (maLoaiClean.includes('g32') && pNameClean.includes('g32')) return true;
    if (maLoaiClean.includes('kiman9') && pNameClean.includes('kiman9')) {
      if (row.phienBan.includes('1.99') || row.loaiXe.includes('1.99')) {
        return pNameClean.includes('1.99');
      }
      return pNameClean.includes('2.49');
    }
    return false;
  });
  return found ? found.id : null;
};

const getVersionSpecs = (item: VehiclePriceItem, isVi: boolean) => {
  const maLoaiClean = item.maLoai.toLowerCase();
  const phienBanClean = item.phienBan.toLowerCase();
  const loaiXeClean = item.loaiXe.toLowerCase();

  let chieuDai = isVi ? 'Đang cập nhật' : 'TBD';
  let taiTrongGhe = isVi ? 'Theo phiên bản' : 'By version';
  let nhienLieu = isVi ? 'Diesel' : 'Diesel';
  let congNang = isVi ? 'Vận tải hàng hóa & hành khách' : 'Freight & Passenger logistics';

  if (maLoaiClean.includes('x9')) {
    if (maLoaiClean.includes('van') || phienBanClean.includes('van')) {
      chieuDai = '4.9 m';
      taiTrongGhe = isVi ? '945 kg (2 chỗ)' : '945 kg (2 seats)';
      nhienLieu = isVi ? 'Diesel (DK5E)' : 'Diesel (DK5E)';
      congNang = isVi ? 'Vận tải hàng hóa nội đô 24/7' : '24/7 Urban cargo delivery';
    } else {
      chieuDai = '4.9 m';
      taiTrongGhe = isVi ? '16 chỗ' : '16 seats';
      nhienLieu = isVi ? 'Diesel (DK5E)' : 'Diesel (DK5E)';
      congNang = isVi ? 'Đưa đón học sinh, nhân viên, du lịch' : 'School/Staff shuttle, tourism';
    }
  } else if (maLoaiClean.includes('29 n29')) {
    chieuDai = loaiXeClean.includes('12m') ? '12 m' : '9.2 m';
    taiTrongGhe = isVi ? '29 ghế' : '29 seats';
    nhienLieu = isVi ? 'Diesel (Yuchai/Weichai)' : 'Diesel (Yuchai/Weichai)';
    congNang = phienBanClean.includes('đưa đón') 
      ? (isVi ? 'Đưa đón học sinh, công nhân viên' : 'Staff & school shuttle')
      : (isVi ? 'Vận tải hành khách tuyến cố định, du lịch' : 'Fixed-route & tourism service');
  } else if (maLoaiClean.includes('29 n35')) {
    chieuDai = '9.2 m';
    taiTrongGhe = isVi ? '29 ghế' : '29 seats';
    nhienLieu = isVi ? 'Diesel (Yuchai)' : 'Diesel (Yuchai)';
    congNang = isVi ? 'Hành khách tuyến ngắn, du lịch lữ hành' : 'Short-haul passenger & travel';
  } else if (maLoaiClean.includes('29 n24')) {
    chieuDai = '9.2 m';
    taiTrongGhe = isVi ? '29 ghế' : '29 seats';
    nhienLieu = isVi ? 'Diesel (Yuchai)' : 'Diesel (Yuchai)';
    congNang = isVi ? 'Vận tải khách liên tỉnh và hợp đồng' : 'Interprovincial & contract logistics';
  } else if (maLoaiClean.includes('n47')) {
    chieuDai = '12.2 m';
    taiTrongGhe = isVi ? '47 ghế' : '47 seats';
    nhienLieu = isVi ? 'Diesel (Yuchai/Weichai)' : 'Diesel (Yuchai/Weichai)';
    congNang = phienBanClean.includes('đưa đón') 
      ? (isVi ? 'Đưa đón học sinh, công nhân viên' : 'School/corporate transport')
      : (isVi ? 'Vận chuyển du lịch chất lượng cao, lữ hành' : 'High-quality tour & travel');
  } else if (maLoaiClean.includes('g34')) {
    chieuDai = '12.2 m';
    taiTrongGhe = isVi ? '34 giường' : '34 sleeper berths';
    nhienLieu = isVi ? 'Diesel (Yuchai/Weichai)' : 'Diesel (Yuchai/Weichai)';
    congNang = isVi ? 'Vận tải giường nằm liên tỉnh' : 'Interprovincial passenger lines';
  } else if (maLoaiClean.includes('g32')) {
    chieuDai = '12.2 m';
    taiTrongGhe = isVi ? '32 giường + WC' : '32 berths + WC';
    nhienLieu = isVi ? 'Diesel (Yuchai/Weichai)' : 'Diesel (Yuchai/Weichai)';
    congNang = isVi ? 'Tuyến du lịch dài ngày, tiện nghi cao cấp' : 'Long-distance VIP routes';
  } else if (maLoaiClean.includes('g24')) {
    chieuDai = '12.2 m';
    taiTrongGhe = isVi ? '24 giường limousine' : '24 limousine suites';
    nhienLieu = isVi ? 'Diesel (Yuchai/Weichai)' : 'Diesel (Yuchai/Weichai)';
    congNang = isVi ? 'Chuyên cơ mặt đất VIP chất lượng cao' : 'High-end VIP Limousine service';
  } else if (maLoaiClean.includes('g22')) {
    chieuDai = '12.2 m';
    taiTrongGhe = isVi ? '22 giường cabin + WC' : '22 cabin suites + WC';
    nhienLieu = isVi ? 'Diesel (Yuchai/Weichai)' : 'Diesel (Yuchai/Weichai)';
    congNang = isVi ? 'Cabin cung điện di động cao cấp nhất' : 'Luxury business-class mobile palace';
  } else if (maLoaiClean.includes('gk48ev') || maLoaiClean.includes('van điện')) {
    chieuDai = '4.5 m';
    taiTrongGhe = isVi ? '945 kg (2 chỗ)' : '945 kg (2 seats)';
    nhienLieu = isVi ? '100% Điện (Pin LFP)' : '100% Electric (LFP battery)';
    congNang = isVi ? 'Giao hàng thành phố 24/7 không lo cấm giờ' : 'City freight 24/7 without bans';
  } else if (maLoaiClean.includes('kiman9')) {
    chieuDai = '5.5 m';
    nhienLieu = isVi ? 'Diesel (Euro 5)' : 'Diesel (Euro 5)';
    if (maLoaiClean.includes('1.99t')) {
      taiTrongGhe = isVi ? '1.99 Tấn' : '1.99 Tons';
      congNang = isVi ? 'Vận tải đa dụng, giấy phép lái xe B2' : 'Multi-purpose hauling, B2 license';
    } else {
      taiTrongGhe = isVi ? '2.49 Tấn' : '2.49 Tons';
      congNang = isVi ? 'Tối ưu hóa tải trọng đi xuyên đô thị' : 'Maximized payload for urban transit';
    }
  }

  return { chieuDai, taiTrongGhe, nhienLieu, congNang };
};

export default function PriceListSection({
  language,
  isDarkMode,
  isAdminUnlocked = false,
  onOpenBooking,
  onOpenAdminLogin,
  onSelectProduct
}: PriceListSectionProps) {
  const isVi = language === 'vi';
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [filterFuel, setFilterFuel] = useState<string>('all');
  const [filterPayload, setFilterPayload] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Complete data parsed from PDF (Only published price / giaCongBo)
  const pricingData: VehiclePriceItem[] = [
    // BUS GHẾ
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Mini bus',
      maLoai: 'KIM LONG X9',
      phienBan: '16 chỗ',
      dongCoQuyCach: 'DK5E Diesel',
      namSx: 2026,
      giaCongBo: 719000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (12m)',
      maLoai: 'KIM LONG 29 N29',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3440000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (12m)',
      maLoai: 'KIM LONG 29 N29',
      phienBan: 'Đưa đón',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 2960000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (9m2)',
      maLoai: 'KIM LONG 29 N29',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai Diesel',
      namSx: 2026,
      giaCongBo: 1990000000,
      ghiChu: 'Không có phiên bản đưa đón'
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (9m2)',
      maLoai: 'KIM LONG 29 N35',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai Diesel',
      namSx: 2026,
      giaCongBo: 2010000000,
      ghiChu: 'Không có phiên bản đưa đón'
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (9m2)',
      maLoai: 'KIM LONG 29 N24',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai Diesel',
      namSx: 2026,
      giaCongBo: 'Liên hệ',
      ghiChu: 'Không có phiên bản đưa đón'
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 47 ghế (12m)',
      maLoai: 'KIM LONG 99 N47',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 2960000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 47 ghế (12m)',
      maLoai: 'KIM LONG 99 N47',
      phienBan: 'Đưa đón',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 2610000000,
      ghiChu: ''
    },

    // BUS GIƯỜNG
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 34 giường',
      maLoai: 'KIM LONG 99 G34',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3739000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 34 giường',
      maLoai: 'KIM LONG 99 G34',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3609000000,
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 32 giường + WC',
      maLoai: 'KIM LONG 99 G32 + WC',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3839000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 32 giường + WC',
      maLoai: 'KIM LONG 99 G32 + WC',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3709000000,
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 24 giường',
      maLoai: 'KIM LONG 99 G24',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3989000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 24 giường',
      maLoai: 'KIM LONG 99 G24',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai Diesel',
      namSx: 2026,
      giaCongBo: 3809000000,
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 22 giường + WC',
      maLoai: 'KIM LONG 99 G22 + WC',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 4039000000,
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 22 giường + WC',
      maLoai: 'KIM LONG 99 G22 + WC',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai Diesel',
      namSx: 2026,
      giaCongBo: 3859000000,
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },

    // TẢI
    {
      dong: 'TẢI',
      loaiXe: 'GK48EV',
      maLoai: 'GK48EV Van điện',
      phienBan: 'VAN EV',
      dongCoQuyCach: 'Pin LFP 100% Điện',
      namSx: 2026,
      giaCongBo: 480000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIM LONG X9 VAN',
      maLoai: 'KIM LONG X9 VAN',
      phienBan: 'VAN',
      dongCoQuyCach: 'DK5E Diesel',
      namSx: 2026,
      giaCongBo: 530000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'CHASSIS',
      dongCoQuyCach: 'Động cơ phun điện tử EURO 5',
      namSx: 2026,
      giaCongBo: 336000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG LỬNG',
      dongCoQuyCach: 'Bửng sắt tôn đen dập nguội',
      namSx: 2026,
      giaCongBo: 352000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG KÍN 1 CỬA HÔNG',
      dongCoQuyCach: 'Vách Inox 430 dập sóng',
      namSx: 2026,
      giaCongBo: 377000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG KÍN',
      dongCoQuyCach: 'Vách Inox 430 tiêu chuẩn',
      namSx: 2026,
      giaCongBo: 377000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG MUI BẠT 3B',
      dongCoQuyCach: 'Bửng sắt dập, vách Inox 430',
      namSx: 2026,
      giaCongBo: 369000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG MUI BẠT 5B',
      dongCoQuyCach: 'Bửng sắt dập, vách Inox 430',
      namSx: 2026,
      giaCongBo: 373000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'CHASSIS',
      dongCoQuyCach: 'Động cơ phun điện tử EURO 5',
      namSx: 2026,
      giaCongBo: 389000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG LỬNG',
      dongCoQuyCach: 'Bửng sắt tôn đen dập nguội',
      namSx: 2026,
      giaCongBo: 406000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG KÍN 1 CỬA HÔNG',
      dongCoQuyCach: 'Vách Inox 430 dập sóng',
      namSx: 2026,
      giaCongBo: 431500000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG KÍN',
      dongCoQuyCach: 'Vách Inox 430 tiêu chuẩn',
      namSx: 2026,
      giaCongBo: 431500000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG MUI BẠT 3B',
      dongCoQuyCach: 'Bửng sắt dập, vách Inox 430',
      namSx: 2026,
      giaCongBo: 424000000,
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG MUI BẠT 5B',
      dongCoQuyCach: 'Bửng sắt dập, vách Inox 430',
      namSx: 2026,
      giaCongBo: 429000000,
      ghiChu: ''
    }
  ];

  // Advanced pricing filter calculations
  const filteredData = pricingData.filter(item => {
    // 1. Category Filter
    if (filterType !== 'all') {
      if (filterType === 'bus-ghe' && item.dong !== 'BUS GHẾ') return false;
      if (filterType === 'bus-giuong' && item.dong !== 'BUS GIƯỜNG') return false;
      if (filterType === 'tai' && item.dong !== 'TẢI') return false;
    }

    // 2. Price filter
    const price = typeof item.giaCongBo === 'number' ? item.giaCongBo : 0;
    if (filterPrice !== 'all') {
      if (filterPrice === 'under-500m' && (price === 0 || price > 500000000)) return false;
      if (filterPrice === '500m-1b' && (price < 500000000 || price > 1000000000)) return false;
      if (filterPrice === '1b-3b' && (price < 1000000000 || price > 3000000000)) return false;
      if (filterPrice === 'above-3b' && price < 3000000000) return false;
    }

    // 3. Fuel filter
    if (filterFuel !== 'all') {
      const isElec = (item.maLoai.toLowerCase().includes('ev') || item.dongCoQuyCach.toLowerCase().includes('điện')) && 
                     !item.dongCoQuyCach.toLowerCase().includes('phun điện tử') && 
                     !item.maLoai.toLowerCase().includes('kiman');
      if (filterFuel === 'electric' && !isElec) return false;
      if (filterFuel === 'diesel' && isElec) return false;
    }

    // 4. Capacity / Payload filter
    if (filterPayload !== 'all') {
      const isBus = item.dong.startsWith('BUS');
      if (filterPayload === 'under-2t' && (!item.maLoai.includes('1.99T') && !item.phienBan.includes('VAN'))) return false;
      if (filterPayload === 'above-2t' && (!item.maLoai.includes('2.49T') && !isBus)) return false;
      if (filterPayload === 'bus-29' && (!item.loaiXe.includes('29'))) return false;
      if (filterPayload === 'bus-giuong' && (!isBus || !item.loaiXe.includes('giường'))) return false;
    }

    // 5. Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchLoaiXe = item.loaiXe.toLowerCase().includes(q);
      const matchMaLoai = item.maLoai.toLowerCase().includes(q);
      const matchPhienBan = item.phienBan.toLowerCase().includes(q);
      const matchDong = item.dong.toLowerCase().includes(q);
      return matchLoaiXe || matchMaLoai || matchPhienBan || matchDong;
    }
    return true;
  });

  // Calculate realistic monthly installment
  const getCardInstallment = (priceVal: number | string) => {
    const cleanNum = typeof priceVal === 'number' ? priceVal : 0;
    if (cleanNum === 0) return isVi ? 'Trả góp từ 4.5 Tr/tháng' : 'Est. installment from 4.5M/mo';
    const loanAmount = cleanNum * 0.8;
    const principalPerMonth = loanAmount / 84;
    const avgInterestPerMonth = (loanAmount * 0.08) / 12;
    const totalPerMonth = principalPerMonth + avgInterestPerMonth;
    const millionVnd = (totalPerMonth / 1000000).toFixed(1);
    return isVi ? `Trả góp dự kiến từ ${millionVnd} Tr/tháng` : `Est. installment from ${millionVnd}M/mo`;
  };

  // Group filtered versions by maLoai
  interface ProductGroup {
    maLoai: string;
    dong: 'BUS GHẾ' | 'BUS GIƯỜNG' | 'TẢI';
    loaiXe: string;
    namSx: number;
    image: string;
    items: VehiclePriceItem[];
  }

  const groupsMap = new Map<string, ProductGroup>();
  filteredData.forEach(item => {
    const key = item.maLoai;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        maLoai: item.maLoai,
        dong: item.dong,
        loaiXe: item.loaiXe,
        namSx: item.namSx,
        image: getVehicleImage(item),
        items: []
      });
    }
    groupsMap.get(key)!.items.push(item);
  });

  const productGroups = Array.from(groupsMap.values());

  // Simulated download
  const handleDownload = (type: 'pdf' | 'excel') => {
    setShowNotification(
      isVi 
        ? `Đang chuẩn bị tải tài liệu Bảng giá ngày 18/06/2026 dạng ${type.toUpperCase()}...` 
        : `Preparing official Price List document (${type.toUpperCase()})...`
    );
    setTimeout(() => {
      setShowNotification(null);
      const element = document.createElement("a");
      const file = new Blob([`BẢNG GIÁ CHÍNH THỨC DÒNG XE KIM LONG - 18/06/2026\nĐại diện thương mại: Ti Toàn\nSĐT: 0799.600.789`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `Kim-Long-Motor-Price-List-18-06-2026.${type === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  const isDark = isDarkMode;
  const cardBg = isDark ? 'bg-[#121214] border-neutral-850' : 'bg-white border-[#E5E7EB]';

  return (
    <section className={`py-24 ${isDark ? 'bg-[#0d0d0f]' : 'bg-[#F5F7FA]'} px-4 relative scroll-mt-20`} id="pricing">
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white border-l-4 border-[#C8102E] rounded-r-xl px-5 py-4 shadow-2xl flex items-center space-x-3 animate-slide-in-right">
          <div className="w-2 h-2 bg-[#C8102E] rounded-full animate-ping"></div>
          <span className="text-xs font-bold font-mono">{showNotification}</span>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* MAIN INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Pricing Database Cards Grid + Advanced Filters */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* COMPACT MULTI-SELECT FILTER BAR (Scrollable horizontally on mobile) */}
            <div className={`p-4 sm:p-5 rounded-2xl ${cardBg} border shadow-sm space-y-4 text-left`}>
              <div className="flex items-center justify-between border-b pb-3 border-neutral-100 dark:border-neutral-900">
                <div className="flex flex-wrap items-center gap-2">
                  <Filter size={15} className="text-[#C8102E]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-poppins text-[#16324F] dark:text-white">
                    {isVi ? 'Bộ Lọc Catalogue' : 'Catalogue Filters'}
                  </span>
                  <span className="bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                    {filteredData.length} {isVi ? 'phiên bản' : 'versions'}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setFilterType('all');
                    setFilterPrice('all');
                    setFilterFuel('all');
                    setFilterPayload('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono font-bold text-neutral-400 hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  {isVi ? 'Đặt lại bộ lọc' : 'Reset filters'}
                </button>
              </div>

              {/* Flex horizontal scroll container on mobile, grid on desktop */}
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-3 pb-2 lg:pb-0 scrollbar-none flex-nowrap whitespace-nowrap lg:whitespace-normal">
                
                {/* 1. Vehicle Type */}
                <div className="space-y-1 shrink-0 w-[170px] lg:w-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">{isVi ? 'Phân Khúc:' : 'Category:'}</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-neutral-950 text-gray-950 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold shadow-sm"
                  >
                    <option value="all">{isVi ? 'Tất cả dòng xe' : 'All classes'}</option>
                    <option value="bus-ghe">{isVi ? 'Xe Bus Ghế' : 'Coach Bus'}</option>
                    <option value="bus-giuong">{isVi ? 'Xe Bus Giường' : 'Sleeper Bus'}</option>
                    <option value="tai">{isVi ? 'Xe Tải / Xe Van' : 'Truck & Cargo Van'}</option>
                  </select>
                </div>

                {/* 2. Price Range */}
                <div className="space-y-1 shrink-0 w-[170px] lg:w-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">{isVi ? 'Mức Giá:' : 'Price range:'}</label>
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-neutral-950 text-gray-950 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold shadow-sm"
                  >
                    <option value="all">{isVi ? 'Tất cả mức giá' : 'All prices'}</option>
                    <option value="under-500m">{isVi ? 'Dưới 500 Triệu' : 'Under 500M'}</option>
                    <option value="500m-1b">{isVi ? '500 Triệu - 1 Tỷ' : '500M - 1B'}</option>
                    <option value="1b-3b">{isVi ? '1 Tỷ - 3 Tỷ' : '1B - 3B'}</option>
                    <option value="above-3b">{isVi ? 'Trên 3 Tỷ' : 'Above 3B'}</option>
                  </select>
                </div>

                {/* 3. Capacity / Payload */}
                <div className="space-y-1 shrink-0 w-[170px] lg:w-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">{isVi ? 'Tải Trọng / Ghế:' : 'Payload / Seats:'}</label>
                  <select
                    value={filterPayload}
                    onChange={(e) => setFilterPayload(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-neutral-950 text-gray-950 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold shadow-sm"
                  >
                    <option value="all">{isVi ? 'Tất cả tải trọng' : 'All sizes'}</option>
                    <option value="under-2t">{isVi ? 'Tải nhẹ dưới 2T' : 'Light duty < 2T'}</option>
                    <option value="above-2t">{isVi ? 'Tải nặng & Bus' : 'Heavy freight & Bus'}</option>
                    <option value="bus-29">{isVi ? 'Dòng xe 29 ghế' : '29 Seats Coach'}</option>
                    <option value="bus-giuong">{isVi ? 'Dòng giường nằm' : 'Sleeper lines'}</option>
                  </select>
                </div>

                {/* 4. Fuel type */}
                <div className="space-y-1 shrink-0 w-[170px] lg:w-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">{isVi ? 'Nhiên Liệu:' : 'Fuel / Eco:'}</label>
                  <select
                    value={filterFuel}
                    onChange={(e) => setFilterFuel(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-neutral-950 text-gray-950 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold shadow-sm"
                  >
                    <option value="all">{isVi ? 'Tất cả nhiên liệu' : 'All fuels'}</option>
                    <option value="electric">{isVi ? '100% Điện (EV)' : '100% Electric (EV)'}</option>
                    <option value="diesel">{isVi ? 'Động cơ Diesel' : 'Diesel Fuel'}</option>
                  </select>
                </div>

              </div>

              {/* Text Search inside filters */}
              <div className="relative pt-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input 
                  type="text"
                  placeholder={isVi ? "Gõ tìm nhanh dòng xe, mã loại (X9, G34, N29, thùng kín, mui bạt...)" : "Instant database search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:border-[#C8102E] font-sans ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-black'
                  }`}
                />
              </div>
            </div>

            {/* VEHICLE PRICING CATALOGUE (GROUPED DESIGN) */}
            <div className="space-y-4">
              {productGroups.length === 0 ? (
                <div className={`p-12 text-center rounded-2xl ${cardBg} border shadow-sm`}>
                  <ShieldAlert className="mx-auto text-neutral-400 shrink-0 mb-3" size={32} />
                  <p className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    {isVi ? 'Không tìm thấy dòng xe nào phù hợp với bộ lọc hiện tại.' : 'No models match selected filter options.'}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{isVi ? 'Vui lòng đặt lại bộ lọc hoặc gõ từ khóa khác.' : 'Try resetting the filters or modifying search keyword.'}</p>
                </div>
              ) : (
                productGroups.map((group, groupIdx) => {
                  const isElectric = group.items.some(row => 
                    (row.maLoai.toLowerCase().includes('ev') || row.dongCoQuyCach.toLowerCase().includes('điện')) && 
                    !row.dongCoQuyCach.toLowerCase().includes('phun điện tử') && 
                    !row.maLoai.toLowerCase().includes('kiman')
                  );

                  const matchingProductId = getMatchingProductId(group.items[0]);

                  return (
                    <div 
                      key={groupIdx} 
                      className={`p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-[#E5E7EB] dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-750 transition-all duration-200 flex flex-col lg:flex-row gap-6`}
                    >
                      {/* Left Column: Image & Details button */}
                      <div className="w-full lg:w-1/4 shrink-0 flex flex-col gap-4">
                        <div className="w-full rounded-xl overflow-hidden bg-[#F5F7FA] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative group aspect-[16/10]">
                          <img 
                            src={group.image} 
                            alt={group.maLoai} 
                            loading="lazy"
                            decoding="async"
                            width="320"
                            height="200"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                            referrerPolicy="no-referrer"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = "/images/vehicles/vehicle-placeholder.svg";
                            }}
                          />
                          {isElectric ? (
                            <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-emerald-500/20">
                              EV ELECTRIC
                            </span>
                          ) : (
                            <span className="absolute top-3 left-3 bg-amber-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-amber-500/20">
                              DIESEL CO
                            </span>
                          )}
                        </div>
                        
                        {matchingProductId && (
                          <button
                            onClick={() => onSelectProduct?.(matchingProductId)}
                            className="w-full inline-flex items-center justify-center gap-2 border border-[#16324F] hover:bg-[#16324F]/5 text-[#16324F] dark:text-blue-400 dark:border-blue-400 font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all cursor-pointer"
                          >
                            <span>{isVi ? 'Xem chi tiết dòng xe' : 'View Details'}</span>
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>

                      {/* Middle Column: General specs & Model Segment info */}
                      <div className="w-full lg:w-1/4 shrink-0 space-y-3.5 lg:border-r border-neutral-100 dark:border-neutral-800 lg:pr-6 text-left flex flex-col justify-start">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-2.5 py-0.5 rounded">
                            {group.dong}
                          </span>
                          <span className="text-xs text-neutral-400 font-mono">
                            {isVi ? `Đời xe ${group.namSx}` : `Model Year ${group.namSx}`}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black tracking-tight text-[#16324F] dark:text-white uppercase font-poppins leading-tight">
                          {group.maLoai}
                        </h3>

                        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-150 dark:border-neutral-850">
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-0.5">
                            {isVi ? 'Phân khúc sản phẩm:' : 'Product Line:'}
                          </p>
                          <p className="text-xs font-bold text-[#16324F] dark:text-neutral-300">
                            {group.loaiXe}
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <p className="flex items-center gap-2">
                            <Fuel size={14} className="text-[#C8102E] shrink-0" />
                            <span>{isElectric ? (isVi ? 'Vận tải xanh không phát thải' : 'Zero emissions logis') : (isVi ? 'Động cơ phun dầu điện tử' : 'Common Rail Direct Inj.')}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Award size={14} className="text-[#D6B25E] shrink-0" />
                            <span>{isVi ? 'Chất lượng tiêu chuẩn quốc tế' : 'Global manufacturing std.'}</span>
                          </p>
                        </div>
                      </div>

                      {/* Right Column: Versions list & Action buttons */}
                      <div className="flex-1 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-left font-mono border-b pb-2 border-neutral-100 dark:border-neutral-800">
                          {isVi ? `Danh sách phiên bản (${group.items.length})` : `Available versions (${group.items.length})`}
                        </p>

                        <div className="space-y-6">
                          {group.items.map((version, versionIdx) => {
                            const specs = getVersionSpecs(version, isVi);
                            const numericPrice = typeof version.giaCongBo === 'number' ? version.giaCongBo : 0;

                            return (
                              <div 
                                key={versionIdx}
                                className="border-b border-neutral-150 dark:border-neutral-850 last:border-0 pb-5 last:pb-0 space-y-3.5 text-left"
                              >
                                {/* Version Title */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h4 className="text-xs sm:text-sm font-black text-[#16324F] dark:text-white uppercase tracking-wide flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]"></span>
                                    <span>{version.phienBan}</span>
                                  </h4>
                                  {version.ghiChu && (
                                    <span className="bg-red-500/10 text-red-500 text-xs font-semibold px-2 py-0.5 rounded border border-red-500/20 italic">
                                      * {version.ghiChu}
                                    </span>
                                  )}
                                </div>

                                {/* Specifications Grid - strictly at least 12px (text-xs) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-600 dark:text-neutral-300 font-medium bg-neutral-50/50 dark:bg-neutral-950/40 p-3 rounded-xl border border-neutral-100 dark:border-neutral-850">
                                  <div>
                                    <span className="text-neutral-400 uppercase tracking-wider text-xs font-bold">{isVi ? 'Chiều dài:' : 'Length:'}</span>{' '}
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{specs.chieuDai}</span>
                                  </div>
                                  <div>
                                    <span className="text-neutral-400 uppercase tracking-wider text-xs font-bold">{isVi ? 'Tải trọng/Ghế:' : 'Cap/Seats:'}</span>{' '}
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{specs.taiTrongGhe}</span>
                                  </div>
                                  <div>
                                    <span className="text-neutral-400 uppercase tracking-wider text-xs font-bold">{isVi ? 'Động cơ:' : 'Engine:'}</span>{' '}
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{specs.nhienLieu}</span>
                                  </div>
                                  <div>
                                    <span className="text-neutral-400 uppercase tracking-wider text-xs font-bold">{isVi ? 'Thùng bệ:' : 'Body spec:'}</span>{' '}
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold truncate block max-w-[200px]" title={version.dongCoQuyCach}>{version.dongCoQuyCach}</span>
                                  </div>
                                  <div className="sm:col-span-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-2 mt-0.5">
                                    <span className="text-neutral-400 uppercase tracking-wider text-xs font-bold block mb-0.5">{isVi ? 'Ứng dụng chính / Công năng:' : 'Main Purpose / Application:'}</span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold leading-relaxed block">{specs.congNang}</span>
                                  </div>
                                </div>

                                {/* Pricing and Installments - strictly at least 12px (text-xs), Price is prominent 26-30px */}
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
                                  <div className="space-y-1">
                                    <span className="text-xs font-bold text-neutral-400 block tracking-wider uppercase font-mono">
                                      {isVi ? 'GIÁ NIÊM YẾT – ĐÃ BAO GỒM VAT' : 'MSRP – VAT INCLUDED'}
                                    </span>
                                    <span className="text-[#C8102E] font-black font-poppins text-2xl sm:text-[28px] block leading-none">
                                      {numericPrice > 0 ? `${new Intl.NumberFormat('vi-VN').format(numericPrice)} VNĐ` : (isVi ? 'Liên hệ' : 'Contact')}
                                    </span>
                                  </div>

                                  <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                                    <span className="inline-block bg-[#FFF5D8] text-[#8A6200] font-black text-xs px-3 py-1.5 rounded-lg border border-[#FFE7A8] shadow-sm uppercase tracking-wider">
                                      {getCardInstallment(version.giaCongBo)}
                                    </span>
                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 block leading-tight text-left sm:text-right font-medium max-w-xs">
                                      {isVi 
                                        ? 'Khoản trả góp mang tính tham khảo, phụ thuộc khoản vay, thời hạn, lãi suất và hồ sơ khách hàng.'
                                        : 'Installment is a reference only, subject to exact bank rates & loan terms.'}
                                    </span>
                                  </div>
                                </div>

                                {/* Action buttons per version */}
                                <div className="pt-2">
                                  <button
                                    onClick={() => onOpenBooking(`${version.maLoai} ${version.phienBan}`, 'quote')}
                                    className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                                  >
                                    <FileText size={14} />
                                    <span>{isVi ? 'Nhận báo giá lăn bánh' : 'Get Quote'}</span>
                                  </button>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* TABLE NOTES - Clean Customer-Facing text (Strictly text-xs 12px or larger) */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-sm text-xs font-sans text-neutral-500 dark:text-neutral-400 space-y-2.5 text-left leading-relaxed`}>
              <p className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                {isVi ? 'CHÍNH SÁCH ÁP DỤNG BẢNG GIÁ:' : 'PRICING TERMS & CONDITIONS:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>
                  {isVi 
                    ? 'Giá niêm yết công bố ở trên đã bao gồm thuế giá trị gia tăng (VAT) 10% nhưng chưa bao gồm các lệ phí lăn bánh như lệ phí trước bạ, chi phí biển số, bảo hiểm, phí dịch vụ đăng ký, đăng kiểm.' 
                    : 'All listed MSRP prices include 10% VAT tax but exclude licensing, registration service fees, road tax, and insurance plans.'}
                </li>
                <li>
                  {isVi 
                    ? 'Các chương trình khuyến mãi giảm giá trực tiếp, hỗ trợ lệ phí trước bạ và quà tặng kèm theo xe tùy thuộc vào chính sách bán hàng cụ thể tại từng thời điểm ký hợp đồng.' 
                    : 'Promotional discounts, tax subsidies, and complimentary packages are subject to specific retail campaigns at active contract dates.'}
                </li>
                <li>
                  {isVi 
                    ? 'Đại diện thương mại Ti Toàn cam kết đồng hành, liên kết với hệ thống các ngân hàng thương mại uy tín toàn quốc để hỗ trợ hạn mức cho vay trả góp lên tới 85% giá trị xe.' 
                    : 'Representative Ti Toan partners with leading commercial banks nationwide to secure customized installment loans up to 85% of vehicle value.'}
                </li>
              </ul>
            </div>

          </div>

          {/* RIGHT: High-converting interactive Sidebar (3 cols wide) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Direct Contact Card (strictly text-xs 12px or larger) */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-xl text-left space-y-5`}>
              <h3 className="text-xs font-black uppercase tracking-wide text-[#C8102E] border-b pb-3 border-neutral-100 dark:border-neutral-900 font-sans">
                {isVi ? 'HỖ TRỢ TRỰC TIẾP' : 'FLEET SALE ENQUIRIES'}
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="tel:0799600789"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#C8102E]/5 border border-[#C8102E]/10 hover:border-[#C8102E] transition-all group cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-lg bg-[#C8102E]/10 text-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white transition-all shrink-0">
                    <Phone size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-neutral-800 dark:text-white truncate">0799.600.789</p>
                    <p className="text-xs text-neutral-400 truncate">{isVi ? 'Gọi tư vấn chính sách' : 'Direct corporate support'}</p>
                  </div>
                </a>

                <a 
                  href="https://zalo.me/0799600789"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500 transition-all group cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
                    <MessageSquare size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-neutral-800 dark:text-white truncate">0799.600.789</p>
                    <p className="text-xs text-neutral-400 truncate">{isVi ? 'Chat Zalo Ti Toàn' : 'Chat Zalo official'}</p>
                  </div>
                </a>

                <button
                  onClick={() => onOpenBooking('', 'quote')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:border-amber-500 transition-all group cursor-pointer text-left text-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                      <FileText size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-xs text-neutral-800 dark:text-white truncate">{isVi ? 'Yêu cầu báo giá xe' : 'Get custom quote'}</p>
                      <p className="text-xs text-neutral-400 truncate">{isVi ? 'Nhận file qua Zalo/Email' : 'We reply within 10 min'}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Document Download Widget (strictly text-xs 12px or larger) */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-xl text-left space-y-4`}>
              <h3 className="text-xs font-black uppercase tracking-wide text-[#C8102E] border-b pb-3 border-neutral-100 dark:border-neutral-900 font-sans">
                {isVi ? 'TẢI FILE VĂN BẢN' : 'DOWNLOADS'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed font-medium">
                {isVi 
                  ? 'Bản phân phối chính thức cho đại lý và đối tác, đầy đủ dấu đỏ phụ trách kinh doanh từ tổng công ty.' 
                  : 'Get the exact duplicate of the legal factory notification signed by Business Director.'}
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={14} />
                  <span>{isVi ? 'Bảng giá PDF chính thức' : 'Official PDF List'}</span>
                </button>

                <button
                  onClick={() => handleDownload('excel')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Download size={14} />
                  <span>{isVi ? 'Bảng tính Excel' : 'Excel Sheet'}</span>
                </button>
              </div>
            </div>

            {/* Quality Standard Badges (strictly text-xs 12px or larger) */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-xl text-left space-y-3.5`}>
              <h3 className="text-xs font-black uppercase tracking-wide text-[#C8102E] border-b pb-3 border-neutral-100 dark:border-neutral-900 font-sans">
                {isVi ? 'CAM KẾT DỊCH VỤ' : 'OUR GUARANTEES'}
              </h3>
              <ul className="space-y-3 text-xs">
                {[
                  {
                    vi: 'Giá đại lý chính thức từ nhà máy Kim Long, hỗ trợ các điều khoản tốt nhất.',
                    en: 'Direct authorized factory pricing with optimal financing.'
                  },
                  {
                    vi: 'Hỗ trợ trả góp lên đến 85% giá trị xe, thủ tục nhanh gọn toàn quốc.',
                    en: 'Fleet financing support up to 85% with simple legal terms.'
                  },
                  {
                    vi: 'Cam kết bàn giao xe đúng tiến độ, bảo hành bảo dưỡng chính hãng 24/7.',
                    en: 'Guaranteed punctual delivery and official 24/7 service centers.'
                  }
                ].map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-sans">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed font-medium">
                      {isVi ? note.vi : note.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
