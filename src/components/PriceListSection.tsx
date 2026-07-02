import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Download, CheckCircle, Search, Calendar, 
  FileText, Sparkles, Filter, ShieldAlert, ChevronRight, HelpCircle, 
  Flame, DollarSign, Fuel, Award
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
}

const getVehicleImage = (row: VehiclePriceItem): string => {
  // Try to find matching product name or keyword in PRODUCTS
  const found = PRODUCTS.find(p => {
    const maLoaiClean = row.maLoai.toLowerCase();
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
    if (maLoaiClean.includes('kiman9') && pNameClean.includes('kiman9')) {
      if (row.phienBan.includes('1.99') || row.loaiXe.includes('1.99')) {
        return pNameClean.includes('1.99');
      }
      return pNameClean.includes('2.49');
    }
    return false;
  });

  if (found) return found.image;

  // Fallback images depending on category
  if (row.dong === 'TẢI') {
    return 'https://images.unsplash.com/photo-1591768793355-74d75b51a55d?auto=format&fit=crop&q=80&w=800';
  } else if (row.dong === 'BUS GIƯỜNG') {
    return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'; // luxury coach bus
  } else {
    return 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'; // bus
  }
};

export default function PriceListSection({
  language,
  isDarkMode,
  isAdminUnlocked = false,
  onOpenBooking,
  onOpenAdminLogin
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
      const isElec = item.maLoai.toLowerCase().includes('ev') || item.dongCoQuyCach.toLowerCase().includes('điện');
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
    if (cleanNum === 0) return isVi ? 'Từ 4.5 Tr/th' : 'From 4.5M/mo';
    const loanAmount = cleanNum * 0.8;
    const principalPerMonth = loanAmount / 84;
    const avgInterestPerMonth = (loanAmount * 0.08) / 12;
    const totalPerMonth = principalPerMonth + avgInterestPerMonth;
    const millionVnd = (totalPerMonth / 1000000).toFixed(1);
    return isVi ? `Trả góp từ ${millionVnd} Tr/tháng` : `Installment from ${millionVnd}M/mo`;
  };

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
  const cardBg = isDark ? 'bg-[#121214] border-neutral-850' : 'bg-white border-neutral-200/70';

  return (
    <section className={`py-24 ${isDark ? 'bg-[#0d0d0f]' : 'bg-[#F2F4F7]'} px-4 relative scroll-mt-20`} id="pricing">
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white border-l-4 border-[#C8102E] rounded-r-xl px-5 py-4 shadow-2xl flex items-center space-x-3 animate-slide-in-right">
          <div className="w-2 h-2 bg-[#C8102E] rounded-full animate-ping"></div>
          <span className="text-xs font-bold font-mono">{showNotification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* MAIN INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Pricing Database Cards Grid + Advanced Filters */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ADVANCED MULTI-SELECT FILTER PANEL */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-lg space-y-4 text-left`}>
              <div className="flex items-center justify-between border-b pb-3 border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-[#C8102E]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-poppins">{isVi ? 'Bộ Lọc Thông Minh' : 'Advanced Filters'}</span>
                </div>
                <button 
                  onClick={() => {
                    setFilterType('all');
                    setFilterPrice('all');
                    setFilterFuel('all');
                    setFilterPayload('all');
                    setSearchQuery('');
                  }}
                  className="text-[10px] font-mono text-neutral-400 hover:text-[#C8102E]"
                >
                  {isVi ? 'Đặt lại bộ lọc' : 'Reset filters'}
                </button>
              </div>

              {/* Grid of filters requested: Vehicle Type, Price, Payload, Fuel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Vehicle Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">{isVi ? 'Dòng Xe:' : 'Vehicle Type:'}</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full text-xs bg-white text-gray-900 border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer shadow-sm"
                  >
                    <option value="all" className="bg-white text-gray-900">{isVi ? 'Tất cả phân khúc' : 'All classes'}</option>
                    <option value="bus-ghe" className="bg-white text-gray-900">{isVi ? 'Xe Bus Ghế' : 'Coach Bus'}</option>
                    <option value="bus-giuong" className="bg-white text-gray-900">{isVi ? 'Xe Bus Giường Nằm' : 'Sleeper Bus'}</option>
                    <option value="tai" className="bg-white text-gray-900">{isVi ? 'Xe Tải / Xe Van' : 'Truck & Cargo Vans'}</option>
                  </select>
                </div>

                {/* 2. Price Range */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">{isVi ? 'Mức Giá:' : 'Price Range:'}</label>
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full text-xs bg-white text-gray-900 border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer shadow-sm"
                  >
                    <option value="all" className="bg-white text-gray-900">{isVi ? 'Tất cả khoảng giá' : 'All prices'}</option>
                    <option value="under-500m" className="bg-white text-gray-900">{isVi ? 'Dưới 500 Triệu' : 'Under 500M VND'}</option>
                    <option value="500m-1b" className="bg-white text-gray-900">{isVi ? '500 Triệu - 1 Tỷ' : '500M - 1B VND'}</option>
                    <option value="1b-3b" className="bg-white text-gray-900">{isVi ? '1 Tỷ - 3 Tỷ' : '1B - 3B VND'}</option>
                    <option value="above-3b" className="bg-white text-gray-900">{isVi ? 'Trên 3 Tỷ' : 'Above 3B VND'}</option>
                  </select>
                </div>

                {/* 3. Capacity / Payload */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">{isVi ? 'Tải Trọng / Ghế:' : 'Payload / Seats:'}</label>
                  <select
                    value={filterPayload}
                    onChange={(e) => setFilterPayload(e.target.value)}
                    className="w-full text-xs bg-white text-gray-900 border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer shadow-sm"
                  >
                    <option value="all" className="bg-white text-gray-900">{isVi ? 'Tất cả tải trọng' : 'All sizes'}</option>
                    <option value="under-2t" className="bg-white text-gray-900">{isVi ? 'Tải nhẹ dưới 2 Tấn' : 'Light duty < 2 Tons'}</option>
                    <option value="above-2t" className="bg-white text-gray-900">{isVi ? 'Vận tải nặng / Xe khách' : 'Heavy freight / Bus'}</option>
                    <option value="bus-29" className="bg-white text-gray-900">{isVi ? 'Dòng 29 chỗ' : '29 Seats Coach'}</option>
                    <option value="bus-giuong" className="bg-white text-gray-900">{isVi ? 'Khoang Giường Nằm' : 'Luxury Sleeper'}</option>
                  </select>
                </div>

                {/* 4. Fuel type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">{isVi ? 'Nhiên Liệu:' : 'Fuel / Eco:'}</label>
                  <select
                    value={filterFuel}
                    onChange={(e) => setFilterFuel(e.target.value)}
                    className="w-full text-xs bg-white text-gray-900 border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer shadow-sm"
                  >
                    <option value="all" className="bg-white text-gray-900">{isVi ? 'Tất cả nhiên liệu' : 'All fuels'}</option>
                    <option value="electric" className="bg-white text-gray-900">{isVi ? '100% Động Cơ Điện (EV)' : '100% Electric EV'}</option>
                    <option value="diesel" className="bg-white text-gray-900">{isVi ? 'Động Cơ Diesel' : 'Diesel Fuel'}</option>
                  </select>
                </div>

              </div>

              {/* Text Search inside filters */}
              <div className="relative pt-2">
                <Search size={14} className="absolute left-3.5 top-[18px] text-neutral-400" />
                <input 
                  type="text"
                  placeholder={isVi ? "Gõ tìm kiếm nhanh dòng xe, mã loại (X9, G34, N29, 34 giường, thùng kín...)" : "Instant database search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:border-[#C8102E] font-sans ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-black'
                  }`}
                />
              </div>
            </div>

            {/* VEHICLE PRICING LIST */}
            <div className="space-y-4">
              {filteredData.length === 0 ? (
                <div className={`p-12 text-center rounded-[20px] ${cardBg} border shadow-inner`}>
                  <ShieldAlert className="mx-auto text-neutral-400 shrink-0 mb-3" size={32} />
                  <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    {isVi ? 'Không tìm thấy cấu hình dòng xe phù hợp với bộ lọc.' : 'No models match selected options.'}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{isVi ? 'Vui lòng đặt lại bộ lọc hoặc gõ từ khóa khác.' : 'Try resetting the filters.'}</p>
                </div>
              ) : (
                filteredData.map((row, index) => {
                  const isElectric = row.maLoai.toLowerCase().includes('ev') || row.dongCoQuyCach.toLowerCase().includes('điện');
                  const numericPrice = typeof row.giaCongBo === 'number' ? row.giaCongBo : 0;
                  
                  return (
                    <div 
                      key={index} 
                      className={`rounded-2xl border ${cardBg} p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#C8102E]/30 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-5`}
                    >
                      {/* Left Side Container: Image & Info */}
                      <div className="flex flex-col sm:flex-row gap-5 flex-1 min-w-0 items-start sm:items-center">
                        {/* Vehicle Representative Image */}
                        <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0 shadow-sm relative">
                          <img 
                            src={getVehicleImage(row)} 
                            alt={row.maLoai} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Model Name, Version & Segment badges */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded">
                              {row.dong}
                            </span>
                            {isElectric ? (
                              <span className="text-[8px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">
                                EV
                              </span>
                            ) : (
                              <span className="text-[8px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20">
                                Diesel
                              </span>
                            )}
                            <span className="text-[10px] text-neutral-400 font-mono">Đời {row.namSx}</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <h3 className="text-lg sm:text-2xl font-black tracking-tight text-[#C8102E] dark:text-red-500 uppercase font-poppins block">
                              {row.maLoai}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                              <span className="font-semibold bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded text-neutral-800 dark:text-neutral-200">
                                {row.loaiXe}
                              </span>
                              <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
                              <span className="font-bold text-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20 uppercase tracking-wider text-[11px]">
                                {row.phienBan}
                              </span>
                            </div>
                          </div>

                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex flex-wrap gap-x-4 gap-y-1">
                            <span className="flex items-center gap-1.5">
                              <span className="font-bold text-neutral-400 uppercase text-[8px]">{isVi ? 'Động cơ/Quy cách:' : 'Engine/Spec:'}</span>
                              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{row.dongCoQuyCach}</span>
                            </span>
                            {row.ghiChu && (
                              <span className="text-red-500 font-medium italic">
                                * {row.ghiChu}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Installment & Pricing & Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100 dark:border-neutral-900">
                        {/* Installment Badge */}
                        <div className="text-left sm:text-right space-y-1">
                          <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-500 bg-amber-500/5 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10 block w-fit sm:ml-auto">
                            {getCardInstallment(row.giaCongBo)}
                          </span>
                          <span className="text-[8px] text-neutral-400 block uppercase font-bold tracking-wider">{isVi ? 'GIÁ CÔNG BỐ (VAT):' : 'MSRP (VAT):'}</span>
                          <span className="text-[#C8102E] font-black font-poppins text-lg block leading-none">
                            {numericPrice > 0 ? `${new Intl.NumberFormat('vi-VN').format(numericPrice)} VNĐ` : (isVi ? 'Liên hệ' : 'Contact')}
                          </span>
                        </div>

                        {/* CTA button */}
                        <button 
                          onClick={() => onOpenBooking(`${row.maLoai} ${row.phienBan}`, 'quote')}
                          className="bg-[#C8102E] hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-red-900/10 flex items-center justify-center gap-1.5"
                        >
                          <span>{isVi ? 'Nhận báo giá' : 'Get Quote'}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* TABLE NOTES - Clean Customer-Facing text */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-sm text-[11px] font-sans text-neutral-500 dark:text-neutral-400 space-y-2.5 text-left leading-relaxed`}>
              <p className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                {isVi ? 'CHÍNH SÁCH ÁP DỤNG BẢNG GIÁ:' : 'PRICING TERMS & CONDITIONS:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-light">
                <li>
                  {isVi 
                    ? 'Giá niêm yết công bố ở trên đã bao gồm thuế giá trị gia tăng (VAT) 10% nhưng chưa bao gồm các lệ phí lăn bánh lăn bánh như lệ phí trước bạ, chi phí biển số, bảo hiểm, phí dịch vụ đăng ký, đăng kiểm.' 
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
            
            {/* Direct Contact Card */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-xl text-left space-y-5`}>
              <h3 className="text-sm font-black uppercase tracking-wide text-[#C8102E] border-b pb-3 border-neutral-100 dark:border-neutral-900 font-sans">
                {isVi ? 'HỖ TRỢ TRỰC TIẾP' : 'FLEET SALE ENQUIRIES'}
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="tel:0799600789"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#C8102E]/5 border border-[#C8102E]/10 hover:border-[#C8102E] transition-all group cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-lg bg-[#C8102E]/10 text-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white transition-all shrink-0">
                    <Phone size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-neutral-800 dark:text-white truncate">0799.600.789</p>
                    <p className="text-[10px] text-neutral-400 truncate">{isVi ? 'Gọi tư vấn chính sách' : 'Direct corporate support'}</p>
                  </div>
                </a>

                <a 
                  href="https://zalo.me/0799600789"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500 transition-all group cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-neutral-800 dark:text-white truncate">0799.600.789</p>
                    <p className="text-[10px] text-neutral-400 truncate">{isVi ? 'Chat Zalo Ti Toàn' : 'Chat Zalo official'}</p>
                  </div>
                </a>

                <button
                  onClick={() => onOpenBooking('', 'quote')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:border-amber-500 transition-all group cursor-pointer text-left text-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-xs text-neutral-800 dark:text-white truncate">{isVi ? 'Yêu cầu báo giá xe' : 'Get custom quote'}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{isVi ? 'Nhận file qua Zalo/Email' : 'We reply within 10 min'}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Document Download Widget */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-xl text-left space-y-4`}>
              <h3 className="text-sm font-black uppercase tracking-wide text-[#C8102E] border-b pb-3 border-neutral-100 dark:border-neutral-900 font-sans">
                {isVi ? 'TẢI FILE VĂN BẢN' : 'DOWNLOADS'}
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed font-light">
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

            {/* Quality Standard Badges */}
            <div className={`p-6 rounded-[20px] ${cardBg} border shadow-xl text-left space-y-3.5`}>
              <h3 className="text-sm font-black uppercase tracking-wide text-[#C8102E] border-b pb-3 border-neutral-100 dark:border-neutral-900 font-sans">
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
                    <span className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed font-light">
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
