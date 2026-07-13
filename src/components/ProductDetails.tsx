import React, { useState } from 'react';
import { 
  X, CheckCircle, ArrowRight, ShieldCheck, HelpCircle, PhoneCall, Calendar, 
  Percent, Sparkles, MessageSquare, Maximize2, RotateCw, ChevronLeft, 
  ChevronRight, ZoomIn, ZoomOut, Compass, Info, ShieldAlert
} from 'lucide-react';
import { Product, Language } from '../types';
import LoanCalculator from './LoanCalculator';

interface ProductDetailsProps {
  product: Product;
  language: Language;
  onClose: () => void;
  onOpenBookingForm: (productName: string, type: 'quote' | 'test-drive' | 'installment') => void;
}

export default function ProductDetails({ product, language, onClose, onOpenBookingForm }: ProductDetailsProps) {
  const isVi = language === 'vi';
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'compare' | 'calculator'>('specs');
  
  // Interactive 360 spin state
  const [is360Mode, setIs360Mode] = useState(false);
  const [spinIndex, setSpinIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Fullscreen Zoom lightbox state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Parse price string to number for loan calculator
  const parsePrice = (priceStr: string): number => {
    const numericStr = priceStr.replace(/[^0-9]/g, '');
    const val = parseInt(numericStr, 10);
    return isNaN(val) ? 500000000 : val;
  };

  const vehiclePrice = parsePrice(product.priceVi);

  // Spin rotation using gallery images as angles
  const angles = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    if (Math.abs(diffX) > 15) {
      if (diffX > 0) {
        setSpinIndex((prev) => (prev + 1) % angles.length);
      } else {
        setSpinIndex((prev) => (prev - 1 + angles.length) % angles.length);
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile 360 spin
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - startX;
    if (Math.abs(diffX) > 12) {
      if (diffX > 0) {
        setSpinIndex((prev) => (prev + 1) % angles.length);
      } else {
        setSpinIndex((prev) => (prev - 1 + angles.length) % angles.length);
      }
      setStartX(e.touches[0].clientX);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[80] flex justify-end font-sans selection:bg-red-600 selection:text-white">
      <div 
        id="product-details-drawer"
        className="w-full max-w-4xl bg-neutral-950 border-l border-neutral-800 h-full flex flex-col overflow-y-auto relative animate-slide-in-right"
      >
        {/* Top Sticky bar inside drawer */}
        <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between z-50">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              {isVi ? 'Đại Diện Kinh Doanh Ti Toàn' : 'Corporate Agent Showroom'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-full hover:border-red-600 transition-all cursor-pointer flex items-center justify-center"
            id="close-drawer-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Media stage (Hero or 360 rotate) */}
        <div className="relative h-[280px] sm:h-[450px] w-full bg-[#0d0d0d] border-b border-neutral-800 shrink-0 group select-none overflow-hidden">
          {is360Mode ? (
            // 360 Spin Mode
            <div 
              className="w-full h-full flex flex-col items-center justify-center relative cursor-ew-resize bg-radial-gradient"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <img 
                src={angles[spinIndex]} 
                alt={`${product.name} 360`} 
                width="640"
                height="400"
                className="max-h-[80%] max-w-[90%] object-contain pointer-events-none transition-all duration-150"
                referrerPolicy="no-referrer"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/vehicles/vehicle-placeholder.svg";
                }}
              />
              
              <div className="absolute top-4 left-4 bg-red-600/10 border border-red-500/30 rounded-full px-3 py-1 text-[9px] font-mono text-red-400 flex items-center gap-1.5 uppercase">
                <RotateCw size={10} className="animate-spin-slow" />
                <span>360° Studio Rotate</span>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-neutral-800 rounded-full px-4 py-2 text-[10px] text-neutral-400 font-mono text-center flex items-center gap-2">
                <Compass size={14} className="text-yellow-500" />
                <span>{isVi ? 'Vuốt hoặc kéo chuột để xoay xe' : 'Drag left or right to spin vehicle'}</span>
              </div>
            </div>
          ) : (
            // Static / Gallery Mode
            <div className="w-full h-full relative">
              <img 
                src={angles[activeImageIdx]} 
                alt={product.name} 
                width="800"
                height="500"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102" 
                referrerPolicy="no-referrer"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/vehicles/vehicle-placeholder.svg";
                }}
              />
              
              {/* Overlay shadow gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30"></div>
              
              {/* Floating metadata info */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest font-mono">
                  {isVi ? product.categoryVi : product.categoryEn}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">{product.name}</h1>
                <p className="text-yellow-500 font-extrabold font-mono text-lg sm:text-2xl mt-1">
                  {isVi ? product.priceVi : product.priceEn}
                </p>
              </div>

              {/* Expand to Fullscreen Lightbox Button */}
              <button
                onClick={() => {
                  setZoomScale(1);
                  setIsFullscreen(true);
                }}
                className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-black/90 backdrop-blur-md border border-neutral-800 hover:border-red-600 rounded-full text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                title={isVi ? 'Phóng to ảnh' : 'Zoom Image'}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          )}

          {/* Toggle 360 Spin Mode Button */}
          {angles.length > 1 && (
            <button
              onClick={() => setIs360Mode(!is360Mode)}
              className={`absolute bottom-6 right-6 px-4 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase transition-all z-20 shadow-lg flex items-center gap-1.5 cursor-pointer ${
                is360Mode 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-black/80 hover:bg-black border border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <RotateCw size={12} className={is360Mode ? 'animate-spin' : ''} />
              <span>{is360Mode ? (isVi ? 'Ảnh tĩnh' : 'Still Photo') : (isVi ? 'Xoay 360°' : 'Rotate 360°')}</span>
            </button>
          )}
        </div>

        {/* Gallery Slider Thumbnail Panel */}
        {!is360Mode && angles.length > 1 && (
          <div className="px-6 py-3 bg-neutral-900/60 border-b border-neutral-850 flex items-center justify-between gap-4 shrink-0">
            <div className="flex gap-2.5 overflow-x-auto scrollbar-none py-1">
              {angles.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-14 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer relative ${
                    activeImageIdx === idx 
                      ? 'border-red-600 ring-2 ring-red-600/20 scale-95' 
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} angle ${idx}`} 
                    width="80"
                    height="56"
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/images/vehicles/vehicle-placeholder.svg";
                    }}
                  />
                  {activeImageIdx === idx && (
                    <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex space-x-1.5">
              <button 
                onClick={() => setActiveImageIdx((prev) => (prev - 1 + angles.length) % angles.length)}
                className="p-1.5 bg-neutral-950 border border-neutral-800 rounded-full hover:border-neutral-600 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setActiveImageIdx((prev) => (prev + 1) % angles.length)}
                className="p-1.5 bg-neutral-950 border border-neutral-800 rounded-full hover:border-neutral-600 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Details and content space */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Bento-style quick specifications metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-[18px] text-center hover:border-red-600/20 transition-all group">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono font-bold block">{isVi ? 'TẢI TRỌNG CHÍNH' : 'PAYLOAD'}</span>
              <p className="font-bold text-white mt-1.5 text-base sm:text-lg group-hover:text-red-500 transition-colors">{product.payload}</p>
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-[18px] text-center hover:border-red-600/20 transition-all group">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono font-bold block">{isVi ? 'CÔNG SUẤT ĐỘNG CƠ' : 'MAX TORQUE'}</span>
              <p className="font-bold text-white mt-1.5 text-base sm:text-lg group-hover:text-red-500 transition-colors">{product.power}</p>
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-[18px] text-center hover:border-red-600/20 transition-all group">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono font-bold block">{isVi ? 'HẠN BẢO HÀNH' : 'WARRANTY'}</span>
              <p className="font-bold text-yellow-500 mt-1.5 text-xs sm:text-sm">{product.warranty.split(' (')[0]}</p>
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-[18px] text-center hover:border-red-600/20 transition-all group">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono font-bold block">{isVi ? 'TIÊU THỤ' : 'FUEL USAGE'}</span>
              <p className="font-bold text-white mt-1.5 text-xs sm:text-sm truncate">{product.fuelConsumption.split(' (')[0]}</p>
            </div>
          </div>

          {/* Luxury tab bar (Specs vs Comparison matrix vs Loan calculator) */}
          <div className="border-b border-neutral-800 flex space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'specs' ? 'border-red-600 text-white' : 'border-transparent text-neutral-500 hover:text-white'
              }`}
            >
              {isVi ? 'Thông số & Tiện nghi' : 'Specs & Features'}
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'compare' ? 'border-red-600 text-white' : 'border-transparent text-neutral-500 hover:text-white'
              }`}
            >
              {isVi ? 'So sánh phiên bản' : 'Trim Comparison'}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'calculator' ? 'border-red-600 text-white' : 'border-transparent text-neutral-500 hover:text-white'
              }`}
            >
              {isVi ? 'Dự toán vay trả góp 85%' : 'Installment Calculator'}
            </button>
          </div>

          {/* TAB CONTENT: 1. Specs & Overview */}
          {activeTab === 'specs' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 flex items-center gap-1.5">
                  <Info size={14} />
                  {isVi ? 'TỔNG QUAN DÒNG XE' : 'VEHICLE PREVIEW OVERVIEW'}
                </h3>
                <p className="text-neutral-300 leading-relaxed text-sm">
                  {isVi ? product.shortDescVi : product.shortDescEn}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Specs Table */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">
                    {isVi ? 'Bảng thông số kỹ thuật' : 'Detailed Specifications'}
                  </h4>
                  <div className="border border-neutral-850 rounded-[18px] overflow-hidden divide-y divide-neutral-850 bg-neutral-900/10">
                    <div className="grid grid-cols-5 p-4 text-xs">
                      <span className="col-span-2 text-neutral-500 font-medium">{isVi ? 'Kích thước bao' : 'Dimensions'}</span>
                      <span className="col-span-3 text-white font-mono text-right font-medium">{product.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-5 p-4 text-xs">
                      <span className="col-span-2 text-neutral-500 font-medium">{isVi ? 'Công suất động cơ' : 'Max Output Power'}</span>
                      <span className="col-span-3 text-white font-mono text-right font-medium">{product.power}</span>
                    </div>
                    <div className="grid grid-cols-5 p-4 text-xs">
                      <span className="col-span-2 text-neutral-500 font-medium">{isVi ? 'Động cơ / Pin sạc' : 'Engine / Battery'}</span>
                      <span className="col-span-3 text-white text-right leading-relaxed font-medium">{product.engineOrBattery}</span>
                    </div>
                    <div className="grid grid-cols-5 p-4 text-xs">
                      <span className="col-span-2 text-neutral-500 font-medium">{isVi ? 'Tải trọng định mức' : 'Allowable Payload'}</span>
                      <span className="col-span-3 text-white font-mono text-right font-medium">{product.payload}</span>
                    </div>
                    <div className="grid grid-cols-5 p-4 text-xs">
                      <span className="col-span-2 text-neutral-500 font-medium">{isVi ? 'Nhiên liệu / Năng lượng' : 'Energy Consumption'}</span>
                      <span className="col-span-3 text-white text-right font-medium">{product.fuelConsumption}</span>
                    </div>
                    <div className="grid grid-cols-5 p-4 text-xs">
                      <span className="col-span-2 text-neutral-500 font-medium">{isVi ? 'Chính sách bảo hành' : 'Factory Warranty'}</span>
                      <span className="col-span-3 text-red-400 text-right font-bold">{product.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Features highlight list */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">
                    {isVi ? 'Tiện nghi & Trang bị nổi bật' : 'Features & Cabin Tech'}
                  </h4>
                  <ul className="space-y-3.5">
                    {(isVi ? product.featuresVi : product.featuresEn).map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        <CheckCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-[18px] flex items-center space-x-3.5 text-xs text-neutral-400">
                    <ShieldCheck size={22} className="text-yellow-500 shrink-0" />
                    <p>{isVi ? 'Đồng hành hỗ trợ trọn đời bởi dịch vụ bảo dưỡng lưu động Mobile Service 24/7 của Ti Toàn.' : 'Guaranteed 24/7 Mobile Service assistance support for logistics partners.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: 2. Trim Comparisons (Standard vs Premium) */}
          {activeTab === 'compare' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{isVi ? 'So sánh phiên bản chi tiết' : 'Detailed Version Comparisons'}</h3>
                <p className="text-xs text-neutral-500">{isVi ? 'Giúp bạn dễ dàng chọn lựa giữa phiên bản Tiêu chuẩn tối ưu chi phí và Cao cấp đầy đủ tiện nghi.' : 'Choose the best trim corresponding to your corporate logistics budgets.'}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-400 border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-white uppercase font-mono text-[10px] tracking-wider">
                      <th className="py-3 px-4">{isVi ? 'Tính năng' : 'Specification'}</th>
                      <th className="py-3 px-4 text-neutral-400">{isVi ? 'Bản Tiêu chuẩn' : 'Standard Trim'}</th>
                      <th className="py-3 px-4 text-red-500 font-bold">{isVi ? 'Bản Cao cấp (Khuyên dùng)' : 'Premium Trim (Recommended)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">{isVi ? 'Giá công bố' : 'Listed MSRP'}</td>
                      <td className="py-3.5 px-4">{product.priceVi}</td>
                      <td className="py-3.5 px-4 text-red-400 font-extrabold">{product.priceVi} <span className="text-[10px] block text-neutral-500 font-normal">({isVi ? 'Đã bao gồm khuyến mãi VIP' : 'Promo applied'})</span></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">{isVi ? 'Động cơ & truyền động' : 'Engine & Powertrain'}</td>
                      <td className="py-3.5 px-4">{isVi ? 'Tiêu chuẩn Euro 5 bền bỉ' : 'Standard Euro 5'}</td>
                      <td className="py-3.5 px-4 text-neutral-200">{isVi ? 'Linh kiện Weichai / Yuchai đồng bộ cao' : 'Weichai/Yuchai premium synchronization'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">{isVi ? 'Màn hình giải trí' : 'Cabin Infotainment'}</td>
                      <td className="py-3.5 px-4">{isVi ? 'FM/Radio tiêu chuẩn' : 'Standard FM/Audio'}</td>
                      <td className="py-3.5 px-4 text-neutral-200">{isVi ? 'Màn hình cảm ứng LCD 10 inch thông minh' : '10-inch smart touchscreen display'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">{isVi ? 'Ghế ngồi & Tiện nghi' : 'Plush Seats & AC'}</td>
                      <td className="py-3.5 px-4">{isVi ? 'Vải nỉ cao cấp tiêu chuẩn' : 'Standard durable fabric'}</td>
                      <td className="py-3.5 px-4 text-neutral-200">{isVi ? 'Bọc da cao cấp, chống bám bụi' : 'Premium eco-leather comfortable seats'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">{isVi ? 'Hệ thống an toàn' : 'Safety Upgrades'}</td>
                      <td className="py-3.5 px-4">{isVi ? 'Phanh tang trống, trợ lực dầu' : 'Drum brakes, hydraulic help'}</td>
                      <td className="py-3.5 px-4 text-red-500 font-bold">{isVi ? 'Phanh khí nén ABS + Phanh điện tử Retarder chống lật' : 'Pneumatic ABS + electromagnetic Retarder safety'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">{isVi ? 'Hỗ trợ bàn giao' : 'Agent Support'}</td>
                      <td className="py-3.5 px-4">{isVi ? 'Đăng ký tại điểm' : 'Dealer registry'}</td>
                      <td className="py-3.5 px-4 text-yellow-500 font-bold">{isVi ? 'Bàn giao xe tận nhà, bao trọn gói đăng kiểm biển vàng' : 'Full service gold commercial plates & home delivery'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB CONTENT: 3. Dynamic Loan installment calculator */}
          {activeTab === 'calculator' && (
            <div className="animate-fade-in">
              <LoanCalculator 
                language={language} 
                initialVehiclePrice={vehiclePrice}
                vehicleName={product.name}
              />
            </div>
          )}

          {/* Bottom Call-to-action panel within drawer */}
          <div className="border-t border-neutral-800/80 pt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onOpenBookingForm(product.name, 'quote')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest cursor-pointer transition-colors text-center flex items-center justify-center gap-2 border border-red-500/20 shadow-lg hover:shadow-red-900/20"
            >
              <Percent size={14} />
              {isVi ? 'Nhận báo giá lăn bánh' : 'Get On-Road Quote'}
            </button>
            <button
              onClick={() => onOpenBookingForm(product.name, 'test-drive')}
              className="flex-1 bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 hover:border-red-600 py-4 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors text-center flex items-center justify-center gap-2"
            >
              <Calendar size={14} className="text-red-500" />
              {isVi ? 'Đăng ký lái thử xe' : 'Book a Test Drive'}
            </button>
            <a
              href="https://zalo.me/0799600789"
              target="_blank"
              referrerPolicy="no-referrer"
              className="px-6 bg-blue-950/40 hover:bg-blue-900/30 text-blue-400 border border-blue-900/40 hover:border-blue-500 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageSquare size={14} />
              Zalo
            </a>
          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox image modal (Gallery zoom) */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/98 z-[99] flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 bg-neutral-900 hover:bg-neutral-800 rounded-full text-white border border-neutral-800 hover:border-red-600 transition-all cursor-pointer z-[100]"
          >
            <X size={20} />
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 border border-neutral-800 px-6 py-3 rounded-full flex items-center space-x-6 z-[100]">
            <button 
              onClick={() => setZoomScale(prev => Math.max(0.5, prev - 0.25))}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-xs font-mono text-white select-none w-12 text-center">{Math.round(zoomScale * 100)}%</span>
            <button 
              onClick={() => setZoomScale(prev => Math.min(3, prev + 0.25))}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ZoomIn size={18} />
            </button>
            <button 
              onClick={() => setZoomScale(1)}
              className="text-[10px] font-mono font-bold uppercase text-red-500 hover:text-red-400 cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center overflow-auto select-none">
            <img 
              src={angles[activeImageIdx]} 
              alt={product.name} 
              style={{ transform: `scale(${zoomScale})` }}
              className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-200 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
