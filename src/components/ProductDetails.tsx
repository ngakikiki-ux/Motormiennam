import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, HelpCircle, PhoneCall, Calendar, Percent, Sparkles, MessageSquare } from 'lucide-react';
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
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);
  const [activeTab, setActiveTab] = useState<'specs' | 'calculator'>('specs');

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[80] flex justify-end">
      <div 
        id="product-details-drawer"
        className="w-full max-w-4xl bg-neutral-950 border-l border-neutral-800 h-full flex flex-col overflow-y-auto relative animate-slide-in-right"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-neutral-400 hover:text-white bg-black/60 backdrop-blur-md border border-neutral-800 rounded-full hover:border-red-600 transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Hero Image Section */}
        <div className="relative h-[250px] sm:h-[400px] w-full bg-neutral-900 border-b border-neutral-800 shrink-0">
          <img 
            src={activeImage} 
            alt={product.name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {isVi ? product.categoryVi : product.categoryEn}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">{product.name}</h1>
            <p className="text-red-500 font-extrabold font-mono text-lg sm:text-2xl mt-1">
              {isVi ? product.priceVi : product.priceEn}
            </p>
          </div>
        </div>

        {/* Gallery Selector */}
        {product.gallery && product.gallery.length > 1 && (
          <div className="px-6 py-4 bg-neutral-900/50 border-b border-neutral-800/60 flex gap-3 overflow-x-auto">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                  activeImage === img ? 'border-red-500 ring-2 ring-red-500/20 scale-95' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}

        {/* Content Wrapper */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick specs banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{isVi ? 'Tải trọng' : 'Payload'}</span>
              <p className="font-bold text-white mt-1 text-sm sm:text-base">{product.payload}</p>
            </div>
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{isVi ? 'Công suất' : 'Power'}</span>
              <p className="font-bold text-white mt-1 text-sm sm:text-base">{product.power}</p>
            </div>
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{isVi ? 'Bảo hành' : 'Warranty'}</span>
              <p className="font-bold text-red-500 mt-1 text-xs sm:text-sm">{product.warranty.split(' (')[0]}</p>
            </div>
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{isVi ? 'Tiêu hao' : 'Consumption'}</span>
              <p className="font-bold text-white mt-1 text-xs sm:text-sm truncate">{product.fuelConsumption.split(' (')[0]}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight uppercase border-l-2 border-red-600 pl-3">
              {isVi ? 'Tổng quan' : 'Overview'}
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              {isVi ? product.shortDescVi : product.shortDescEn}
            </p>
          </div>

          {/* Tab Selection (Specs vs Calculator) */}
          <div className="border-b border-neutral-800 flex space-x-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-bold text-sm tracking-wide transition-all border-b-2 cursor-pointer ${
                activeTab === 'specs' ? 'border-red-600 text-white' : 'border-transparent text-neutral-500 hover:text-white'
              }`}
            >
              {isVi ? 'Thông số kỹ thuật & Tiện nghi' : 'Specs & Features'}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`pb-3 font-bold text-sm tracking-wide transition-all border-b-2 cursor-pointer ${
                activeTab === 'calculator' ? 'border-red-600 text-white' : 'border-transparent text-neutral-500 hover:text-white'
              }`}
            >
              {isVi ? 'Dự toán vay trả góp 85%' : 'Installment Forecast'}
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              {/* Left Column: Specs Table */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-red-500">{isVi ? 'Bảng thông số chi tiết' : 'Technical Specifications'}</h4>
                <div className="border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800">
                  <div className="grid grid-cols-5 p-3.5 text-xs">
                    <span className="col-span-2 text-neutral-500">{isVi ? 'Kích thước bao' : 'Dimensions'}</span>
                    <span className="col-span-3 text-white font-medium font-mono text-right">{product.dimensions}</span>
                  </div>
                  <div className="grid grid-cols-5 p-3.5 text-xs">
                    <span className="col-span-2 text-neutral-500">{isVi ? 'Công suất cực đại' : 'Max Power'}</span>
                    <span className="col-span-3 text-white font-medium font-mono text-right">{product.power}</span>
                  </div>
                  <div className="grid grid-cols-5 p-3.5 text-xs">
                    <span className="col-span-2 text-neutral-500">{isVi ? 'Động cơ / Pin sạc' : 'Engine / Battery'}</span>
                    <span className="col-span-3 text-white font-medium text-right text-xs leading-tight">{product.engineOrBattery}</span>
                  </div>
                  <div className="grid grid-cols-5 p-3.5 text-xs">
                    <span className="col-span-2 text-neutral-500">{isVi ? 'Tải trọng cho phép' : 'Allowable Payload'}</span>
                    <span className="col-span-3 text-white font-medium font-mono text-right">{product.payload}</span>
                  </div>
                  <div className="grid grid-cols-5 p-3.5 text-xs">
                    <span className="col-span-2 text-neutral-500">{isVi ? 'Mức tiêu hao' : 'Consumption'}</span>
                    <span className="col-span-3 text-white font-medium font-mono text-right">{product.fuelConsumption}</span>
                  </div>
                  <div className="grid grid-cols-5 p-3.5 text-xs">
                    <span className="col-span-2 text-neutral-500">{isVi ? 'Thời hạn bảo hành' : 'Warranty Period'}</span>
                    <span className="col-span-3 text-red-400 font-medium text-right">{product.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Features list */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-red-500">{isVi ? 'Trang bị nổi bật' : 'Key Highlights'}</h4>
                <ul className="space-y-3">
                  {(isVi ? product.featuresVi : product.featuresEn).map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-neutral-400 leading-relaxed">
                      <CheckCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-neutral-900 border border-neutral-800/80 rounded-2xl flex items-center space-x-3 text-xs text-neutral-400">
                  <ShieldCheck size={20} className="text-red-500 shrink-0" />
                  <p>{isVi ? 'Đồng hành hỗ trợ dịch vụ bảo dưỡng lưu động Mobile Service 24/7.' : 'Backed up by 24/7 Mobile Service support on the roads.'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Embedded Loan Calculator */}
              <LoanCalculator 
                language={language} 
                initialVehiclePrice={
                  product.id === 'ev-300' ? 890000000 :
                  product.id === 'star-x' ? 345000000 :
                  product.id === 'king-m' ? 680000000 :
                  product.id === 'heavy-d' ? 1250000000 :
                  product.id === 'prime-t' ? 1850000000 :
                  product.id === 'solati-m' ? 1050000000 :
                  1950000000
                }
                vehicleName={product.name}
              />
            </div>
          )}

          {/* Action CTAs inside the modal drawer */}
          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onOpenBookingForm(product.name, 'quote')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-sm cursor-pointer transition-colors text-center flex items-center justify-center gap-2"
            >
              <Percent size={16} />
              {isVi ? 'Nhận báo giá lăn bánh' : 'Get On-Road Quote'}
            </button>
            <button
              onClick={() => onOpenBookingForm(product.name, 'test-drive')}
              className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-red-600 py-4 rounded-xl font-bold text-sm cursor-pointer transition-colors text-center flex items-center justify-center gap-2"
            >
              <Calendar size={16} className="text-red-500" />
              {isVi ? 'Đăng ký lái thử xe' : 'Book a Test Drive'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
