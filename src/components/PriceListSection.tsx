import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Download, CheckCircle, Lock, Unlock, 
  Search, Calendar, FileText, Sparkles, Filter, ShieldAlert,
  HelpCircle, Eye, EyeOff
} from 'lucide-react';

export interface VehiclePriceItem {
  dong: 'BUS GHẾ' | 'BUS GIƯỜNG' | 'TẢI';
  loaiXe: string;
  maLoai: string;
  phienBan: string;
  dongCoQuyCach: string;
  namSx: number;
  giaCongBo: number | string;
  giaToiThieu: number | string;
  khuyenMai: number | string;
  hoaHongQuanLy: number | string;
  hoaHongTvbh: number | string;
  thuongNongQuanLy: number | string;
  thuongNongTvbh: number | string;
  ghiChu: string;
}

interface PriceListSectionProps {
  language: 'vi' | 'en';
  isDarkMode: boolean;
  isAdminUnlocked?: boolean;
  onOpenBooking: (vehicleName: string, type: 'quote' | 'test-drive' | 'installment' | 'general') => void;
  onOpenAdminLogin?: () => void;
}

export default function PriceListSection({
  language,
  isDarkMode,
  isAdminUnlocked = false,
  onOpenBooking,
  onOpenAdminLogin
}: PriceListSectionProps) {
  const isVi = language === 'vi';
  const [activeFilter, setActiveFilter] = useState<'all' | 'bus-ghe' | 'bus-giuong' | 'tai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [showPublicOnly, setShowPublicOnly] = useState<boolean>(true); // User toggle to hide/show partner columns when authorized

  // Complete data parsed from PDF
  const pricingData: VehiclePriceItem[] = [
    // BUS GHẾ
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Mini bus',
      maLoai: 'KIM LONG X9',
      phienBan: '16 chỗ',
      dongCoQuyCach: 'DK5E',
      namSx: 2026,
      giaCongBo: 719000000,
      giaToiThieu: 699000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '4.500.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 5000000,
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (12m)',
      maLoai: 'KIM LONG 29 N29',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3440000000,
      giaToiThieu: 3410000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (12m)',
      maLoai: 'KIM LONG 29 N29',
      phienBan: 'Đưa đón',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 2960000000,
      giaToiThieu: 2930000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (9m2)',
      maLoai: 'KIM LONG 29 N29',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai',
      namSx: 2026,
      giaCongBo: 1990000000,
      giaToiThieu: 1990000000,
      khuyenMai: 2000000,
      hoaHongQuanLy: 2000000,
      hoaHongTvbh: 5000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Không có phiên bản đưa đón'
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (9m2)',
      maLoai: 'KIM LONG 29 N35',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai',
      namSx: 2026,
      giaCongBo: 2010000000,
      giaToiThieu: 2010000000,
      khuyenMai: 2000000,
      hoaHongQuanLy: 2000000,
      hoaHongTvbh: 5000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Không có phiên bản đưa đón'
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 29 ghế (9m2)',
      maLoai: 'KIM LONG 29 N24',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai',
      namSx: 2026,
      giaCongBo: 'liên hệ PMH',
      giaToiThieu: 'liên hệ PMH',
      khuyenMai: 'x',
      hoaHongQuanLy: 'liên hệ PMH',
      hoaHongTvbh: 'liên hệ PMH',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Không có phiên bản đưa đón'
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 47 ghế (12m)',
      maLoai: 'KIM LONG 99 N47',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 2960000000,
      giaToiThieu: 2930000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GHẾ',
      loaiXe: 'Bus 47 ghế (12m)',
      maLoai: 'KIM LONG 99 N47',
      phienBan: 'Đưa đón',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 2610000000,
      giaToiThieu: 2580000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },

    // BUS GIƯỜNG
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 34 giường',
      maLoai: 'KIM LONG 99 G34',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3739000000,
      giaToiThieu: 3709000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 34 giường',
      maLoai: 'KIM LONG 99 G34',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3609000000,
      giaToiThieu: 3579000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 32 giường + WC',
      maLoai: 'KIM LONG 99 G32 + WC',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3839000000,
      giaToiThieu: 3809000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 32 giường + WC',
      maLoai: 'KIM LONG 99 G32 + WC',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3709000000,
      giaToiThieu: 3679000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 24 giường',
      maLoai: 'KIM LONG 99 G24',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3989000000,
      giaToiThieu: 3959000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 24 giường',
      maLoai: 'KIM LONG 99 G24',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai',
      namSx: 2026,
      giaCongBo: 3809000000,
      giaToiThieu: 3779000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 22 giường + WC',
      maLoai: 'KIM LONG 99 G22 + WC',
      phienBan: 'Cao cấp',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 4039000000,
      giaToiThieu: 4009000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'BUS GIƯỜNG',
      loaiXe: 'Bus 22 giường + WC',
      maLoai: 'KIM LONG 99 G22 + WC',
      phienBan: 'Tiêu chuẩn',
      dongCoQuyCach: 'Yuchai/Weichai',
      namSx: 2026,
      giaCongBo: 3859000000,
      giaToiThieu: 3829000000,
      khuyenMai: 'x',
      hoaHongQuanLy: 'x',
      hoaHongTvbh: '18.000.000 (nhận từ nhà máy)',
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: 'Cắt giảm LCD, đèn tam cấp, đèn nội thất khoang giường'
    },

    // TẢI
    {
      dong: 'TẢI',
      loaiXe: 'GK48EV',
      maLoai: 'GK48EV',
      phienBan: 'VAN EV',
      dongCoQuyCach: '-',
      namSx: 2026,
      giaCongBo: 480000000,
      giaToiThieu: 480000000,
      khuyenMai: 7000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIM LONG X9 VAN',
      maLoai: 'KIM LONG X9 VAN',
      phienBan: 'VAN',
      dongCoQuyCach: '-',
      namSx: 2026,
      giaCongBo: 530000000,
      giaToiThieu: 530000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'CHASSIS',
      dongCoQuyCach: '-',
      namSx: 2026,
      giaCongBo: 336000000,
      giaToiThieu: 336000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG LỬNG',
      dongCoQuyCach: 'Tôn đen',
      namSx: 2026,
      giaCongBo: 352000000,
      giaToiThieu: 352000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG KÍN 1 CỬA HÔNG',
      dongCoQuyCach: 'Inox 430',
      namSx: 2026,
      giaCongBo: 377000000,
      giaToiThieu: 377000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG KÍN',
      dongCoQuyCach: 'Inox 430',
      namSx: 2026,
      giaCongBo: 377000000,
      giaToiThieu: 377000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG MUI BẠT 3B',
      dongCoQuyCach: 'Bửng tôn đen, vách Inox 430',
      namSx: 2026,
      giaCongBo: 369000000,
      giaToiThieu: 369000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (1.99T)',
      maLoai: 'KIMAN9 (1.99T)',
      phienBan: 'THÙNG MUI BẠT 5B',
      dongCoQuyCach: 'Bửng tôn đen, vách Inox 430',
      namSx: 2026,
      giaCongBo: 373000000,
      giaToiThieu: 373000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'CHASSIS',
      dongCoQuyCach: '-',
      namSx: 2026,
      giaCongBo: 389000000,
      giaToiThieu: 389000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG LỬNG',
      dongCoQuyCach: 'Tôn đen',
      namSx: 2026,
      giaCongBo: 406000000,
      giaToiThieu: 406000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG KÍN 1 CỬA HÔNG',
      dongCoQuyCach: 'Inox 430',
      namSx: 2026,
      giaCongBo: 431500000,
      giaToiThieu: 431500000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG KÍN',
      dongCoQuyCach: 'Inox 430',
      namSx: 2026,
      giaCongBo: 431500000,
      giaToiThieu: 431500000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG MUI BẠT 3B',
      dongCoQuyCach: 'Bửng tôn đen, vách Inox 430',
      namSx: 2026,
      giaCongBo: 424000000,
      giaToiThieu: 424000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    },
    {
      dong: 'TẢI',
      loaiXe: 'KIMAN9 (2.49T)',
      maLoai: 'KIMAN9 (2.49T)',
      phienBan: 'THÙNG MUI BẠT 5B',
      dongCoQuyCach: 'Bửng tôn đen, vách Inox 430',
      namSx: 2026,
      giaCongBo: 429000000,
      giaToiThieu: 429000000,
      khuyenMai: 1000000,
      hoaHongQuanLy: 1000000,
      hoaHongTvbh: 4000000,
      thuongNongQuanLy: 'x',
      thuongNongTvbh: 'x',
      ghiChu: ''
    }
  ];

  // Format helper for numbers with localized dots
  const formatValue = (val: number | string, isSensitive: boolean = false) => {
    if (isSensitive && !isAdminUnlocked) {
      return (
        <span className="inline-flex items-center gap-1 text-neutral-400 dark:text-neutral-600 italic font-medium bg-neutral-100 dark:bg-neutral-800/50 px-1.5 py-0.5 rounded text-[10px]">
          <Lock size={10} className="shrink-0" />
          {isVi ? 'Bảo mật' : 'Locked'}
        </span>
      );
    }
    if (typeof val === 'string') {
      if (val === 'x') return <span className="text-neutral-400">-</span>;
      return <span className="font-sans text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{val}</span>;
    }
    return new Intl.NumberFormat('vi-VN').format(val);
  };

  // Filter and search
  const filteredData = pricingData.filter(item => {
    // 1. Category Filter
    if (activeFilter === 'bus-ghe' && item.dong !== 'BUS GHẾ') return false;
    if (activeFilter === 'bus-giuong' && item.dong !== 'BUS GIƯỜNG') return false;
    if (activeFilter === 'tai' && item.dong !== 'TẢI') return false;

    // 2. Search query
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
    <section className={`py-16 ${isDark ? 'bg-[#0d0d0f]' : 'bg-[#F2F4F7]'} px-4 relative scroll-mt-20`} id="pricing">
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white border-l-4 border-[#D6001C] rounded-r-xl px-5 py-4 shadow-2xl flex items-center space-x-3 animate-slide-in-right">
          <div className="w-2 h-2 bg-[#D6001C] rounded-full animate-ping"></div>
          <span className="text-xs font-bold font-mono">{showNotification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* UPPER ANNOUNCEMENT BAR */}
        <div className={`p-6 sm:p-8 rounded-[20px] ${cardBg} border shadow-xl relative overflow-hidden text-left space-y-4`}>
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#D6001C]"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[#D6001C] text-[10px] font-mono uppercase tracking-wider font-extrabold bg-[#D6001C]/10 px-2.5 py-1 rounded-full border border-[#D6001C]/20">
                SỐ: 2606-41/TBKD
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white uppercase font-sans tracking-tight">
                {isVi ? 'BẢNG GIÁ CHÍNH THỨC & KHUYẾN MÃI' : 'OFFICIAL COMMERCIAL PRICING & PROMOTIONS'}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs font-light max-w-3xl leading-relaxed">
                {isVi 
                  ? 'Giá bán công bố, ưu đãi đặc biệt cho các dòng xe khách Kim Long Bus, xe tải nhẹ Kiman và xe tải điện Van chính hãng.'
                  : 'Official retail prices and premium promotional campaigns for Kim Long Bus, Kiman Light Trucks and EV Vans.'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0 bg-neutral-100 dark:bg-neutral-900 px-4 py-3 rounded-xl border border-neutral-200/50 dark:border-neutral-800">
              <Calendar size={18} className="text-[#D6001C]" />
              <div className="text-left font-mono">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isVi ? 'Áp dụng từ ngày' : 'Effective Date'}</p>
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">18/06/2026</p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-900 pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-500" />
              {isVi ? 'Đã bao gồm thuế giá trị gia tăng (VAT)' : 'Price includes standard VAT tax'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-500" />
              {isVi ? 'Áp dụng trên Toàn quốc' : 'Effective nationwide'}
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-500" />
              {isVi ? 'Đại diện phân phối: TI TOÀN (0799.600.789)' : 'Authorized Representative: TI TOAN'}
            </span>
          </div>
        </div>

        {/* MAIN INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Pricing Database Table */}
          <div className="lg:col-span-9 space-y-6">
            <div className={`p-5 sm:p-6 rounded-[20px] ${cardBg} border shadow-xl space-y-6 text-left`}>
              
              {/* Filter Controls & Search */}
              <div className="flex flex-col gap-4 border-b pb-5 border-neutral-100 dark:border-neutral-900">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { key: 'all', vi: 'Tất cả', en: 'All' },
                      { key: 'bus-ghe', vi: 'Bus Ghế', en: 'Coach Bus' },
                      { key: 'bus-giuong', vi: 'Bus Giường', en: 'Sleeper Bus' },
                      { key: 'tai', vi: 'Xe Tải / Van', en: 'Truck / Van' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveFilter(tab.key as any)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                          activeFilter === tab.key
                            ? 'bg-[#D6001C] text-white shadow-lg shadow-red-600/15'
                            : `${isDark ? 'bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'}`
                        }`}
                      >
                        {isVi ? tab.vi : tab.en}
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-500 animate-pulse" />
                    <span>{isVi ? 'Đại Lý Ủy Quyền Cấp 1' : 'Official Authorized Partner'}</span>
                  </div>
                </div>

                {/* Live Search Input */}
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text"
                    placeholder={isVi ? "Gõ từ khóa tìm nhanh (ví dụ: G34, X9, Thùng Kín, Thùng Lửng, 16 chỗ...)" : "Instant database search (e.g. G24, Chassis, Van, 16 seats...)"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-[#D6001C] font-sans ${
                      isDark 
                        ? 'bg-neutral-900/60 border-neutral-800 text-white placeholder-neutral-500' 
                        : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400'
                    }`}
                  />
                </div>
              </div>

              {/* Responsive Table Container */}
              <div className="overflow-x-auto rounded-xl border border-neutral-100 dark:border-neutral-850 shadow-inner">
                <table className="w-full text-left border-collapse table-auto min-w-[850px]">
                  <thead>
                    <tr className="bg-neutral-900 text-white text-[10px] font-mono uppercase tracking-wider border-b border-neutral-850">
                      <th className="py-4 px-4 font-bold text-left sticky left-0 bg-neutral-900 border-r border-neutral-850 w-[200px]">{isVi ? 'DÒNG XE' : 'VEHICLE MODEL'}</th>
                      <th className="py-4 px-3 font-bold border-r border-neutral-850">{isVi ? 'PHIÊN BẢN' : 'VERSION'}</th>
                      <th className="py-4 px-3 font-bold border-r border-neutral-850">{isVi ? 'QUY CÁCH / ĐỘNG CƠ' : 'SPECIFICATION'}</th>
                      <th className="py-4 px-2 font-bold text-center border-r border-neutral-850 w-[60px]">{isVi ? 'NĂM' : 'YEAR'}</th>
                      <th className="py-4 px-4 font-bold text-right border-r border-neutral-850 w-[140px]">{isVi ? 'GIÁ CÔNG BỐ (VAT)' : 'RETAIL PRICE (VAT)'}</th>
                      <th className="py-4 px-3 font-bold text-center border-r border-neutral-850 w-[120px]">{isVi ? 'KHUYẾN MÃI' : 'PROMOTION'}</th>
                      <th className="py-4 px-4 font-bold text-right border-r border-neutral-850 bg-[#D6001C]/10 text-[#FFD7D7] w-[160px]">{isVi ? 'GIÁ ƯU ĐÃI (QUAN TRỌNG)' : 'SPECIAL NET PRICE'}</th>
                      <th className="py-4 px-3 font-bold text-center w-[120px]">{isVi ? 'LIÊN HỆ' : 'ACTION'}</th>
                    </tr>
                  </thead>

                  <tbody className="text-[11px] font-mono">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-neutral-400 bg-neutral-50 dark:bg-neutral-900/30">
                          <ShieldAlert className="mx-auto text-neutral-400 shrink-0 mb-2" size={24} />
                          {isVi ? 'Không tìm thấy dòng xe phù hợp với từ khóa tra cứu.' : 'No vehicle specifications match your filters.'}
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((row, index) => {
                        const isEven = index % 2 === 0;
                        const rowBg = isEven 
                          ? (isDark ? 'bg-neutral-900/20' : 'bg-neutral-50/50') 
                          : 'bg-transparent';
                        
                        // Parse values safely
                        const numericGiaCongBo = typeof row.giaCongBo === 'number' ? row.giaCongBo : 0;
                        const numericKhuyenMai = typeof row.khuyenMai === 'number' ? row.khuyenMai : 0;
                        const netPriceVal = numericGiaCongBo - numericKhuyenMai;
                        const hasPromo = numericKhuyenMai > 0;

                        return (
                          <tr key={index} className={`${rowBg} hover:bg-[#D6001C]/5 transition-colors border-b ${isDark ? 'border-neutral-850' : 'border-neutral-200/50'}`}>
                            {/* DÒNG XE / LOẠI XE */}
                            <td className="py-3 px-4 font-bold text-neutral-900 dark:text-neutral-100 sticky left-0 bg-white dark:bg-[#121214] font-sans border-r dark:border-neutral-850 shadow-[2px_0_5px_rgba(0,0,0,0.03)] text-left">
                              <div className="font-extrabold text-[12px] text-neutral-900 dark:text-white leading-tight">
                                {row.maLoai}
                              </div>
                              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light mt-0.5">
                                {row.loaiXe}
                              </div>
                            </td>

                            {/* PHIÊN BẢN */}
                            <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300 font-sans text-xs border-r dark:border-neutral-850 font-medium text-left">
                              {row.phienBan}
                            </td>

                            {/* QUY CÁCH / ĐỘNG CƠ */}
                            <td className="py-3 px-3 text-neutral-500 dark:text-neutral-400 font-sans text-xs border-r dark:border-neutral-850 text-left">
                              {row.dongCoQuyCach || '-'}
                            </td>

                            {/* NĂM */}
                            <td className="py-3 px-2 text-center text-neutral-400 border-r dark:border-neutral-850">
                              {row.namSx}
                            </td>

                            {/* GIÁ CÔNG BỐ */}
                            <td className="py-3 px-4 text-right border-r dark:border-neutral-850">
                              {hasPromo ? (
                                <span className="line-through text-neutral-400 dark:text-neutral-500 text-[11px] block">
                                  {new Intl.NumberFormat('vi-VN').format(numericGiaCongBo)} đ
                                </span>
                              ) : (
                                <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs">
                                  {numericGiaCongBo > 0 ? `${new Intl.NumberFormat('vi-VN').format(numericGiaCongBo)} đ` : (typeof row.giaCongBo === 'string' ? row.giaCongBo : '-')}
                                </span>
                              )}
                            </td>

                            {/* KHUYẾN MÃI */}
                            <td className="py-3 px-3 text-center border-r dark:border-neutral-850">
                              {hasPromo ? (
                                <span className="inline-block bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">
                                  -{new Intl.NumberFormat('vi-VN').format(numericKhuyenMai)}đ
                                </span>
                              ) : (
                                <span className="text-neutral-400">-</span>
                              )}
                            </td>

                            {/* GIÁ ƯU ĐÃI (CRITICAL!) */}
                            <td className="py-3 px-4 text-right font-black text-[#D6001C] text-sm border-r dark:border-neutral-850 bg-[#D6001C]/5">
                              {netPriceVal > 0 ? (
                                <>
                                  <div className="font-bold text-[13px] text-[#D6001C] tracking-tight">
                                    {new Intl.NumberFormat('vi-VN').format(netPriceVal)} đ
                                  </div>
                                  <span className="block text-[8px] text-neutral-400 dark:text-neutral-500 font-light font-sans">{isVi ? 'Đã gồm VAT' : 'VAT Incl.'}</span>
                                </>
                              ) : (
                                <div className="font-bold text-[11px] text-neutral-500 tracking-tight">
                                  {typeof row.giaCongBo === 'string' ? row.giaCongBo : (isVi ? 'Liên hệ' : 'Contact')}
                                </div>
                              )}
                            </td>

                            {/* HÀNH ĐỘNG */}
                            <td className="py-3 px-3 text-center">
                              <button 
                                onClick={() => onOpenBooking(`${row.maLoai} ${row.phienBan}`, 'quote')}
                                className="bg-[#D6001C] hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md w-full sm:w-auto"
                              >
                                {isVi ? 'Báo giá' : 'Quote'}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* TABLE NOTES - Clean Customer-Facing text */}
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 text-[11px] font-sans text-neutral-500 dark:text-neutral-400 space-y-2.5 text-left leading-relaxed">
                <p className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                  {isVi ? 'CHÍNH SÁCH ÁP DỤNG BẢNG GIÁ:' : 'PRICING TERMS & CONDITIONS:'}
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-light">
                  <li>
                    {isVi 
                      ? 'Giá công bố ở trên đã bao gồm thuế giá trị gia tăng (VAT) 10% nhưng chưa bao gồm các lệ phí trước bạ, chi phí biển số, bảo hiểm, phí dịch vụ đăng ký, đăng kiểm trọn gói.' 
                      : 'All listed MSRP prices include 10% VAT tax but exclude licensing, registration service fees, road tax, and insurance plans.'}
                  </li>
                  <li>
                    {isVi 
                      ? 'Các chương trình ưu đãi, quà tặng và gói phụ kiện kèm theo xe tùy thuộc vào chính sách kinh doanh cụ thể tại từng thời điểm đặt xe thực tế.' 
                      : 'Promotional discounts, complimentary accessories, and custom packages are subject to specific retail campaigns at active order dates.'}
                  </li>
                  <li>
                    {isVi 
                      ? 'Hỗ trợ mua xe trả góp liên kết thông qua các tổ chức tài chính và ngân hàng đối tác uy tín với mức cho vay lên tới 85% giá trị xe, thủ tục hồ sơ nhanh chóng toàn quốc.' 
                      : 'Comprehensive financing support via Tier 1 domestic banking partners with loan approvals up to 85% and rapid approval.'}
                  </li>
                  <li>
                    {isVi 
                      ? 'Đối với khách hàng mua xe theo lô phục vụ dự án lớn (Fleet): Vui lòng liên hệ trực tiếp Đại diện thương mại xuất sắc TI TOÀN để nhận cơ chế chính sách tốt nhất.' 
                      : 'For high-volume fleet acquisitions and commercial tenders: please reach out directly to Commercial Representative Ti Toan to request specialized corporate pricing.'}
                  </li>
                </ul>
              </div>

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
                  ? 'Bản phân phối chính thức cho đại lý và đối tác, đầy đủ dấu đỏ phụ trách kinh doanh.' 
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
