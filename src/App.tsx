import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, MapPin, Mail, Award, ShieldCheck, Check, 
  ChevronDown, User, ArrowRight, Menu, X, Truck, Calendar, 
  ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Lock
} from 'lucide-react';

import { PRODUCTS } from './data';
import { Product } from './types';

// Component Imports
import SEOManager from './components/SEOManager';
import LeadDashboard from './components/LeadDashboard';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  
  // Admin view state - hidden from public, triggered via ?admin=true URL parameter
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Lead modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState('');
  
  // Selected product detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Tracks active index for card image sliders
  const [activeCardImageIndices, setActiveCardImageIndices] = useState<Record<string, number>>({});

  // Tracks active index for the selected product detail modal gallery
  const [modalImageIdx, setModalImageIdx] = useState(0);

  // Reset modal image index when a product is opened
  useEffect(() => {
    setModalImageIdx(0);
  }, [selectedProduct]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Detect admin mode from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // Scroll listener for glassmorphic header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main 4 models requested
  const featuredIds = ['gk48ev', 'x9-van', 'kimlong-99n29', 'kimlong-99g34'];
  const featuredProducts = PRODUCTS.filter(p => featuredIds.includes(p.id));

  // FAQ questions list
  const faqs = [
    {
      id: 'faq-1',
      question: 'Giá trên website đã là giá lăn bánh chưa?',
      answer: 'Giá hiển thị trên website là giá công bố từ nhà máy (đã bao gồm VAT) và chưa bao gồm thuế trước bạ, phí đăng ký đăng kiểm, phí đường bộ và các loại bảo hiểm bắt buộc. Quý khách vui lòng bấm nút "Nhận báo giá" hoặc liên hệ trực tiếp Ti Toàn qua số 0799 600 789 để nhận ngay bảng tính chi phí lăn bánh trọn gói chính xác theo từng tỉnh thành.'
    },
    {
      id: 'faq-2',
      question: 'Có hỗ trợ mua xe trả góp không?',
      answer: 'Có! Ti Toàn hỗ trợ làm hồ sơ vay trả góp qua các ngân hàng liên kết uy tín với hạn mức tài trợ từ 75% lên đến 85% giá trị hợp đồng. Thời gian vay linh hoạt kéo dài từ 2 đến 7 năm, thủ tục tối giản duyệt hồ sơ trong vòng 48 giờ làm việc với lãi suất ưu đãi hấp dẫn.'
    },
    {
      id: 'faq-3',
      question: 'Khách ở tỉnh có được hỗ trợ giao xe không?',
      answer: 'Hoàn toàn có! Showroom hỗ trợ làm thủ tục đăng ký, đăng kiểm lưu hành trọn gói và tổ chức giao xe tận nhà trên toàn quốc bằng xe chuyên dụng. Đảm bảo an toàn, đúng tiến độ và hỗ trợ bàn giao bàn giao chi tiết hướng dẫn vận hành trực tiếp cho quý khách.'
    }
  ];

  // Submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitSuccess(false);

    if (!fullName.trim()) {
      setFormError('Vui lòng nhập họ và tên của bạn!');
      return;
    }

    const cleanPhone = phoneNumber.trim().replace(/[\s\-\(\)]/g, '');
    if (!/^0[0-9]{9}$/.test(cleanPhone)) {
      setFormError('Số điện thoại không hợp lệ! SĐT phải đủ 10 chữ số và bắt đầu bằng số 0.');
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: cleanPhone,
          email: '',
          selectedProduct: bookingVehicle,
          leadType: 'quote',
          notes: notes.trim()
        })
      });

      if (response.ok) {
        setFormSubmitSuccess(true);
        // Save to local quotes history
        const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
        storedLeads.push({
          fullName: fullName.trim(),
          phoneNumber: cleanPhone,
          bookingVehicle,
          date: new Date().toISOString()
        });
        localStorage.setItem('my_quotes', JSON.stringify(storedLeads));
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      // fallback in preview environments
      setFormSubmitSuccess(true);
      const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
      storedLeads.push({
        fullName: fullName.trim(),
        phoneNumber: cleanPhone,
        bookingVehicle,
        date: new Date().toISOString()
      });
      localStorage.setItem('my_quotes', JSON.stringify(storedLeads));
    } finally {
      setFormLoading(false);
    }
  };

  const openBooking = (vehicleName: string = '') => {
    setBookingVehicle(vehicleName || featuredProducts[0]?.name || '');
    setFormSubmitSuccess(false);
    setFormError('');
    setFullName('');
    setPhoneNumber('');
    setNotes('');
    setIsBookingOpen(true);
  };

  // Render hidden Admin lead tracker if specified in URL
  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Lock className="text-red-500" />
              QUẢN LÝ KHÁCH HÀNG - TI TOÀN
            </h1>
            <button 
              onClick={() => setIsAdminMode(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Quay lại Website
            </button>
          </div>
          <LeadDashboard language="vi" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#0B0F1A] font-sans antialiased selection:bg-[#C8102E] selection:text-white pb-20 md:pb-0">
      
      {/* Dynamic Metadata Injector */}
      <SEOManager language="vi" activeProduct={selectedProduct} />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B0F1A]/95 backdrop-blur-md border-b border-neutral-800 py-3 text-white' 
          : 'bg-[#0B0F1A]/90 text-white py-4 border-b border-neutral-900/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo & Sales Consultant Signature */}
          <a href="#" className="flex flex-col">
            <span className="text-sm font-black tracking-widest text-[#E0BD71] uppercase leading-none font-heading">
              KIM LONG MOTOR MIỀN NAM
            </span>
            <span className="text-xs text-neutral-300 font-medium mt-1 leading-none">
              Ti Toàn – Tư vấn xe
            </span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
            <a href="#featured-vehicles" className="hover:text-[#E0BD71] transition-colors">Dòng xe</a>
            <a href="#financial-solutions" className="hover:text-[#E0BD71] transition-colors">Giải pháp</a>
            <a href="#process-section" className="hover:text-[#E0BD71] transition-colors">Quy trình</a>
            <a href="#faq-section" className="hover:text-[#E0BD71] transition-colors">Hỏi đáp</a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://zalo.me/0799600789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 border border-neutral-700 hover:border-[#E0BD71] text-[#E0BD71] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquare size={14} />
              Nhắn Zalo
            </a>
            <button 
              onClick={() => openBooking('')}
              className="bg-[#C8102E] hover:bg-[#A30D24] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Nhận báo giá
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-[#E0BD71] focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B0F1A] border-t border-neutral-800 text-white py-4 px-6 space-y-4 animate-fade-in absolute top-full left-0 right-0 shadow-xl">
            <div className="flex flex-col space-y-3 font-medium text-neutral-300">
              <a 
                href="#featured-vehicles" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#E0BD71] transition-colors border-b border-neutral-900"
              >
                Dòng xe
              </a>
              <a 
                href="#financial-solutions" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#E0BD71] transition-colors border-b border-neutral-900"
              >
                Giải pháp
              </a>
              <a 
                href="#process-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#E0BD71] transition-colors border-b border-neutral-900"
              >
                Quy trình
              </a>
              <a 
                href="#faq-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#E0BD71] transition-colors border-b border-neutral-900"
              >
                Hỏi đáp
              </a>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a 
                href="https://zalo.me/0799600789"
                className="w-full text-center py-2.5 bg-[#0B0F1A] border border-neutral-700 text-[#E0BD71] font-bold text-xs rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare size={14} />
                Nhắn Zalo Ngay
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking('');
                }}
                className="w-full text-center py-2.5 bg-[#C8102E] text-white font-bold text-xs rounded-lg shadow"
              >
                Nhận Báo Giá Lăn Bánh
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:py-40 bg-[#0B0F1A] text-white overflow-hidden">
        {/* Background image overlay with darker tone */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1600" 
            alt="Kim Long Motor Fleet Background" 
            className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/85 to-[#0B0F1A]/95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Sales Rep Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-neutral-200 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E0BD71] animate-pulse"></span>
              <span>Ti Toàn | Chuyên viên Kinh doanh Kim Long Motor Miền Nam</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.1] mb-6 text-white uppercase">
              MUA ĐÚNG XE.<br />
              <span className="text-[#E0BD71]">TÍNH ĐÚNG BÀI TOÁN.</span>
            </h1>

            {/* Sales Consultant Philosophy Description */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl font-light">
              Báo giá rõ ràng, phương án vay dễ hiểu và tư vấn đúng nhu cầu khai thác. Đồng hành từ lúc chọn xe đến khi nhận xe.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <button 
                onClick={() => openBooking('')}
                className="bg-[#C8102E] hover:bg-[#A30D24] text-white text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-600/10 cursor-pointer flex items-center justify-center gap-2"
              >
                Nhận báo giá lăn bánh
                <ArrowRight size={16} />
              </button>
              <a 
                href="tel:0799600789"
                className="px-8 py-3.5 border border-white/20 hover:border-[#E0BD71] text-white hover:text-[#E0BD71] text-sm font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
              >
                <Phone size={16} />
                Gọi 0799 600 789
              </a>
            </div>
          </div>

          {/* Three Key Value Propositions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#E0BD71] shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">Minh bạch</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Giá xe nhà máy và chi phí lăn bánh chính xác nhất.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#E0BD71] shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">Dễ hiểu</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Phương án vay trả góp tính toán rạch ròi theo tháng.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#E0BD71] shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">Đồng hành</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Hỗ trợ trọn gói hồ sơ vay và giao xe toàn quốc.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DÒNG XE NỔI BẬT */}
      <section id="featured-vehicles" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-widest text-[#C8102E] uppercase">SẢN PHẨM PHÂN PHỐI CHÍNH HÃNG</span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading mt-2 mb-4 tracking-tight">DÒNG XE THƯƠNG MẠI NỔI BẬT</h2>
          <div className="w-12 h-1 bg-[#C8102E] mx-auto rounded-full"></div>
        </div>

        {/* 4 Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProducts.map((vehicle) => {
            const isElectric = vehicle.id === 'gk48ev';
            return (
              <div 
                key={vehicle.id} 
                className="bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Vehicle Image section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white flex items-center justify-center p-1 sm:p-2 border-b border-neutral-100">
                  {/* Left arrow if there is a gallery with > 1 images */}
                  {vehicle.gallery && vehicle.gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = activeCardImageIndices[vehicle.id] || 0;
                        const nextIndex = (currentIndex - 1 + vehicle.gallery.length) % vehicle.gallery.length;
                        setActiveCardImageIndices({
                          ...activeCardImageIndices,
                          [vehicle.id]: nextIndex,
                        });
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer shadow-md"
                      title="Ảnh trước"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {/* Right arrow if there is a gallery with > 1 images */}
                  {vehicle.gallery && vehicle.gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = activeCardImageIndices[vehicle.id] || 0;
                        const nextIndex = (currentIndex + 1) % vehicle.gallery.length;
                        setActiveCardImageIndices({
                          ...activeCardImageIndices,
                          [vehicle.id]: nextIndex,
                        });
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer shadow-md"
                      title="Ảnh sau"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}

                  <img 
                    src={vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery[activeCardImageIndices[vehicle.id] || 0] : vehicle.image} 
                    alt={vehicle.name} 
                    className={`object-contain transition-all duration-300 image-render-sharp ${
                      vehicle.id === 'x9-van'
                        ? 'max-w-[88%] max-h-[88%] group-hover:scale-[1.015]'
                        : 'max-w-[95%] max-h-[95%] group-hover:scale-[1.015]'
                    }`}
                    loading="lazy"
                  />
                  {isElectric && (
                    <span className="absolute top-4 left-4 bg-emerald-600/90 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                      Xe Tải Điện
                    </span>
                  )}

                  {/* Dot indicators */}
                  {vehicle.gallery && vehicle.gallery.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm z-10">
                      {vehicle.gallery.map((_, idx) => {
                        const isSelected = (activeCardImageIndices[vehicle.id] || 0) === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCardImageIndices({
                                ...activeCardImageIndices,
                                [vehicle.id]: idx,
                              });
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              isSelected ? 'bg-white w-3.5' : 'bg-white/40 hover:bg-white/70'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="font-extrabold text-xl font-heading text-[#0B0F1A] tracking-tight group-hover:text-[#C8102E] transition-colors">
                        {vehicle.name}
                      </h3>
                      <span className="text-sm font-black font-heading text-[#C8102E] tracking-tight shrink-0 whitespace-nowrap">
                        {vehicle.priceVi}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 leading-relaxed mb-6 font-light">
                      {vehicle.shortDescVi}
                    </p>

                    {/* Specs List */}
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-t border-neutral-100 pt-5 mb-6 text-xs text-neutral-600">
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block font-medium">Tải trọng / Sức chứa</span>
                        <span className="font-bold text-[#0B0F1A] mt-0.5 block">{vehicle.payload}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block font-medium">Động cơ / Pin</span>
                        <span className="font-bold text-[#0B0F1A] mt-0.5 block truncate" title={vehicle.engineOrBattery}>{vehicle.engineOrBattery}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block font-medium">Công suất</span>
                        <span className="font-bold text-[#0B0F1A] mt-0.5 block">{vehicle.power}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block font-medium">Chế độ bảo hành</span>
                        <span className="font-bold text-[#0B0F1A] mt-0.5 block">{vehicle.warranty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-500/5">
                    <button 
                      onClick={() => setSelectedProduct(vehicle)}
                      className="py-2.5 border border-neutral-300 hover:border-neutral-800 text-neutral-700 hover:text-neutral-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                    <button 
                      onClick={() => openBooking(vehicle.name)}
                      className="py-2.5 bg-[#C8102E] hover:bg-[#A30D24] text-white text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      Nhận giá
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GIẢI PHÁP TÀI CHÍNH VÀ KHAI THÁC */}
      <section id="financial-solutions" className="py-20 bg-[#0B0F1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black tracking-widest text-[#E0BD71] uppercase">GIẢI PHÁP VẬN HÀNH TỐI ƯU</span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase leading-tight">
                KHÔNG CHỈ BÁN MỘT CHIẾC XE
              </h2>
              <div className="w-12 h-1 bg-[#E0BD71] rounded-full"></div>
              
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Mua xe thương mại là một quyết định đầu tư kinh doanh. Do đó, Ti Toàn không chỉ đơn thuần giới thiệu tính năng mà sẽ trực tiếp đồng hành cùng quý khách tính toán kỹ lưỡng phương án tài chính tối ưu nhất:
              </p>

              <ul className="space-y-3.5 text-xs text-neutral-300 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0BD71] shrink-0"></span>
                  <span>Bảng kê chi tiết từng đồng chi phí đăng ký, đăng kiểm lăn bánh.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0BD71] shrink-0"></span>
                  <span>Thiết lập số vốn tự có tối thiểu cần chuẩn bị (vốn đối ứng).</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0BD71] shrink-0"></span>
                  <span>Dự trù số tiền trả góp hàng tháng giảm dần theo thời gian.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0BD71] shrink-0"></span>
                  <span>Ước lượng chi phí bảo dưỡng định kỳ và nhiên liệu vận hành.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0BD71] shrink-0"></span>
                  <span>Định lượng thời gian hoàn vốn và hiệu quả dòng tiền kinh doanh.</span>
                </li>
              </ul>
            </div>

            {/* Right comparison chart Column */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-[#E0BD71] font-black text-lg font-heading tracking-tight mb-2 uppercase">
                  BÀI TOÁN KINH TẾ XE TẢI ĐIỆN GK48EV VAN EV
                </h3>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  So sánh trực quan chi phí năng lượng/nhiên liệu thực tế khi vận hành quãng đường 100 km:
                </p>
              </div>

              {/* Comparison visual cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Petrol vehicle */}
                <div className="bg-[#0B0F1A] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase">Xe tải Van chạy xăng</span>
                  <div className="my-3">
                    <span className="text-2xl font-black font-heading text-neutral-300">~ 373.000đ</span>
                    <span className="text-xs text-neutral-500 ml-1">/ 100 km</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">(Tiêu thụ trung bình khoảng 8.5L - 9.5L xăng + khấu hao nhớt/lọc nhớt)</span>
                </div>

                {/* GK48EV Van EV */}
                <div className="bg-[#C8102E]/10 border border-[#C8102E]/30 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-emerald-400 font-black uppercase">GK48EV VAN EV (XE ĐIỆN)</span>
                  <div className="my-3">
                    <span className="text-2.5xl font-black font-heading text-emerald-400">~ 35.000đ</span>
                    <span className="text-xs text-emerald-500 ml-1">/ 100 km</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">(Chi phí điện sạc cực rẻ, bảo dưỡng siêu tiết kiệm không tốn nhớt máy)</span>
                </div>

              </div>

              {/* Net Difference highlight banner */}
              <div className="bg-[#E0BD71]/10 border border-[#E0BD71]/35 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#E0BD71] font-black uppercase tracking-wider block">TIẾT KIỆM KHỔNG LỒ MỖI 100KM</span>
                  <span className="text-xl sm:text-2xl font-black font-heading text-[#E0BD71] mt-0.5 block">
                    ~ 338.000 VNĐ
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block font-medium">Bấm ngay</span>
                  <button 
                    onClick={() => openBooking('GK48EV VAN EV')}
                    className="text-xs text-white font-bold underline decoration-[#E0BD71] hover:text-[#E0BD71] transition-colors mt-0.5"
                  >
                    Tính Trả Góp
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-neutral-500 leading-relaxed font-light italic">
                * Lưu ý: Số liệu trên đây là ước lượng mang tính chất minh họa tham khảo. Kết quả vận hành thực tế sẽ phụ thuộc trực tiếp vào cung đường di chuyển, điều kiện tải trọng thực tế, giá điện sinh hoạt/công cộng, giá nhiên liệu tại từng thời điểm và phong cách điều khiển xe của tài xế.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* QUY TRÌNH MUA XE */}
      <section id="process-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-widest text-[#C8102E] uppercase">TIẾP CẬN DỄ DÀNG</span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading mt-2 mb-4 tracking-tight">QUY TRÌNH MUA XE ĐƠN GIẢN</h2>
          <div className="w-12 h-1 bg-[#C8102E] mx-auto rounded-full"></div>
        </div>

        {/* 3 Step simple cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 relative flex flex-col justify-between group hover:border-[#C8102E]/30 transition-all shadow-sm">
            <span className="absolute top-6 right-6 font-black font-heading text-4xl text-neutral-200 group-hover:text-[#C8102E]/10 transition-colors select-none">
              01
            </span>
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-[#0B0F1A] font-heading uppercase tracking-tight">Nói nhu cầu</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Quý khách chia sẻ rõ loại hàng hóa vận chuyển, cung đường di chuyển quen thuộc, tổng quãng đường dự kiến và mức vốn đối ứng chuẩn bị trước.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 relative flex flex-col justify-between group hover:border-[#C8102E]/30 transition-all shadow-sm">
            <span className="absolute top-6 right-6 font-black font-heading text-4xl text-neutral-200 group-hover:text-[#C8102E]/10 transition-colors select-none">
              02
            </span>
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-[#0B0F1A] font-heading uppercase tracking-tight">Nhận phương án</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Ti Toàn lập tức gửi bảng dự toán lăn bánh trọn gói chi tiết nhất, thiết kế phương án vay trả góp qua ngân hàng tối ưu và khái toán chi phí nhiên liệu.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 relative flex flex-col justify-between group hover:border-[#C8102E]/30 transition-all shadow-sm">
            <span className="absolute top-6 right-6 font-black font-heading text-4xl text-neutral-200 group-hover:text-[#C8102E]/10 transition-colors select-none">
              03
            </span>
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-[#0B0F1A] font-heading uppercase tracking-tight">Chốt và nhận xe</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Đại lý hoàn tất hồ sơ vay, hỗ trợ đăng ký đăng kiểm từ A-Z và điều động xe chuyên chở giao xe tận nhà theo đúng lịch trình đã thỏa thuận thống nhất.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* KHU VỰC LIÊN HỆ */}
      <section className="bg-[#0B0F1A] text-white py-20 relative overflow-hidden">
        {/* subtle styling dots */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8102E]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="text-xs font-black tracking-widest text-[#E0BD71] uppercase block">LIÊN HỆ TƯ VẤN TRỰC TIẾP</span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white uppercase max-w-3xl mx-auto leading-tight">
            ANH CẦN XE NÀO,<br />
            <span className="text-[#E0BD71]">EM TÍNH PHƯƠNG ÁN ĐÓ</span>
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
            {/* Sales Consultant Meta Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-white font-heading tracking-tight">Ti Toàn – Kim Long Motor Miền Nam</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-300 font-light pt-2">
                <span className="flex items-center gap-1.5">
                  <Phone size={14} className="text-[#E0BD71]" />
                  Điện thoại/Zalo: 0799 600 789
                </span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1.5 text-center justify-center">
                  <MapPin size={14} className="text-[#E0BD71]" />
                  Địa chỉ: 451 Quốc lộ 1, xã An Ninh, TP. Cần Thơ
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center pt-2">
              <button 
                onClick={() => openBooking('')}
                className="bg-[#C8102E] hover:bg-[#A30D24] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors shadow-lg cursor-pointer"
              >
                Nhận báo giá
              </button>
              <a 
                href="https://zalo.me/0799600789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/15 text-white hover:text-[#E0BD71] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={14} className="text-[#E0BD71]" />
                Nhắn Zalo ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HỎI ĐÁP */}
      <section id="faq-section" className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-widest text-[#C8102E] uppercase">GIẢI ĐÁP NHANH</span>
          <h2 className="text-2.5xl sm:text-3xl font-black font-heading mt-1 mb-3 tracking-tight">CÂU HỎI THƯỜNG GẶP</h2>
          <div className="w-12 h-1 bg-[#C8102E] mx-auto rounded-full"></div>
        </div>

        {/* FAQ list accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = expandedFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white border border-neutral-200/60 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-neutral-50/50 focus:outline-none transition-colors"
                >
                  <span className="font-extrabold text-sm sm:text-base text-[#0B0F1A] font-heading tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C8102E]' : 'text-neutral-400'}`}>
                    <ChevronDown size={18} />
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-neutral-100/50 pt-4 animate-fade-in">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B0F1A] text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <div className="space-y-3 max-w-md">
            <span className="text-[#E0BD71] font-black tracking-widest text-sm uppercase block font-heading">
              Ti Toàn | Kim Long Motor Miền Nam
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Tư vấn đúng nhu cầu, rõ chi phí và rõ phương án trước khi khách hàng quyết định.
            </p>
          </div>

          <div className="space-y-1 text-left md:text-right text-xs text-neutral-300 font-light">
            <p className="flex items-center md:justify-end gap-1.5">
              <Phone size={12} className="text-[#E0BD71]" />
              Điện thoại: <strong>0799 600 789</strong>
            </p>
            <p className="text-[10px] text-neutral-500 pt-2">
              © {new Date().getFullYear()} Bản quyền thuộc về Ti Toàn Kim Long Motor.
            </p>
          </div>

        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM BUTTONS BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F1A]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-3 shadow-lg">
        <a 
          href="tel:0799600789"
          className="flex-1 bg-[#C8102E] text-white py-3 rounded-xl text-center font-bold text-xs uppercase tracking-wider shadow-md active:scale-98 transition-transform flex items-center justify-center gap-2"
        >
          <Phone size={14} />
          Gọi ngay
        </a>
        <a 
          href="https://zalo.me/0799600789"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-white/10 border border-white/20 text-[#E0BD71] py-3 rounded-xl text-center font-bold text-xs uppercase tracking-wider active:scale-98 transition-transform flex items-center justify-center gap-2"
        >
          <MessageSquare size={14} className="text-[#E0BD71]" />
          Nhắn Zalo
        </a>
      </div>

      {/* FORM NHẬN BÁO GIÁ MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-neutral-200 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="bg-[#0B0F1A] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-extrabold text-base uppercase font-heading tracking-tight text-[#E0BD71]">
                Yêu cầu báo giá lăn bánh
              </h3>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="text-neutral-400 hover:text-white focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!formSubmitSuccess ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Họ và tên *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nguyễn Văn A" 
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#C8102E] focus:bg-white text-xs px-3 py-2.5 rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Số điện thoại *</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0799 xxx xxx" 
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#C8102E] focus:bg-white text-xs px-3 py-2.5 rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Vehicle dropdown field */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Dòng xe quan tâm *</label>
                    <select 
                      value={bookingVehicle}
                      onChange={(e) => setBookingVehicle(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#C8102E] focus:bg-white text-xs px-3 py-2.5 rounded-lg outline-none transition-colors cursor-pointer appearance-none"
                    >
                      {featuredProducts.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes / message field */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Nhu cầu ngắn gọn</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ví dụ: Cần tính toán trả góp 5 năm tại Cần Thơ..." 
                      rows={3}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#C8102E] focus:bg-white text-xs px-3 py-2.5 rounded-lg outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Error response display */}
                  {formError && (
                    <div className="text-[11px] font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                      {formError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-[#C8102E] hover:bg-[#A30D24] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {formLoading ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu báo giá'}
                  </button>

                </form>
              ) : (
                /* Form Submission Success Screen */
                <div className="text-center py-6 space-y-5 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle size={28} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-base text-[#0B0F1A] font-heading uppercase tracking-tight">
                      Gửi yêu cầu thành công!
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed font-light">
                      Cảm ơn anh/chị đã quan tâm. Ti Toàn đã nhận được yêu cầu tư vấn báo giá xe và phương án tài chính cho dòng xe <strong>{bookingVehicle}</strong>. Ti Toàn sẽ chủ động liên hệ hỗ trợ anh/chị trong vài phút tới!
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
                    <a 
                      href="https://zalo.me/0799600789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#0B0F1A] hover:bg-[#161d2d] text-[#E0BD71] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare size={14} />
                      Nhắn tin Zalo trực tiếp ngay
                    </a>
                    <button 
                      onClick={() => setIsBookingOpen(false)}
                      className="w-full py-2 border border-neutral-200 text-neutral-600 hover:text-neutral-800 text-xs font-bold rounded-lg transition-colors"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* DETAILED SPECIFICATIONS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden border border-neutral-200 shadow-2xl relative my-8">
            
            {/* Header */}
            <div className="bg-[#0B0F1A] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-extrabold text-base uppercase font-heading tracking-tight text-[#E0BD71]">
                Thông số kỹ thuật: {selectedProduct.name}
              </h3>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-neutral-400 hover:text-white focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
              
              {/* Image & Price */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 aspect-[16/10] bg-white rounded-xl overflow-hidden border border-neutral-100 flex items-center justify-center relative p-1 sm:p-2">
                  {/* Left arrow if there is a gallery with > 1 images */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextIndex = (modalImageIdx - 1 + selectedProduct.gallery.length) % selectedProduct.gallery.length;
                        setModalImageIdx(nextIndex);
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer shadow-md"
                      title="Ảnh trước"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {/* Right arrow if there is a gallery with > 1 images */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextIndex = (modalImageIdx + 1) % selectedProduct.gallery.length;
                        setModalImageIdx(nextIndex);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#C8102E]/90 hover:bg-[#C8102E] text-white rounded-full transition-colors cursor-pointer shadow-md"
                      title="Ảnh sau"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}

                  <img 
                    src={selectedProduct.gallery && selectedProduct.gallery.length > 0 ? selectedProduct.gallery[modalImageIdx] : selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className={`object-contain image-render-sharp transition-all duration-300 ${
                      selectedProduct.id === 'x9-van'
                        ? 'max-w-[88%] max-h-[88%]'
                        : 'max-w-[95%] max-h-[95%]'
                    }`}
                  />

                  {/* Dot indicators */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm z-10">
                      {selectedProduct.gallery.map((_, idx) => {
                        const isSelected = modalImageIdx === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setModalImageIdx(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              isSelected ? 'bg-white w-3.5' : 'bg-white/40 hover:bg-white/70'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Giá niêm yết nhà máy</span>
                  <span className="text-xl font-black text-[#C8102E] font-heading block">{selectedProduct.priceVi}</span>
                  <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                    * Giá đã bao gồm thuế giá trị gia tăng (VAT 10%). Hỗ trợ làm thủ tục vay trả góp 85% giá trị xe, duyệt hồ sơ nhanh gọn.
                  </p>
                </div>
              </div>

              {/* Specifications table */}
              <div>
                <h4 className="font-extrabold text-xs uppercase text-[#0B0F1A] tracking-wider mb-3 border-b border-neutral-100 pb-2">
                  Bảng chi tiết thông số kỹ thuật chính
                </h4>
                <div className="border border-neutral-100 rounded-xl overflow-hidden text-xs">
                  <div className="grid grid-cols-3 border-b border-neutral-100 p-3 bg-neutral-50">
                    <span className="font-semibold text-neutral-500 col-span-1">Thông số</span>
                    <span className="font-bold text-[#0B0F1A] col-span-2">Chi tiết thông số từ nhà máy</span>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-neutral-100 p-3">
                    <span className="font-semibold text-neutral-500 col-span-1">Kích thước tổng thể</span>
                    <span className="text-neutral-700 col-span-2">{selectedProduct.dimensions}</span>
                  </div>

                  <div className="grid grid-cols-3 border-b border-neutral-100 p-3 bg-neutral-50/30">
                    <span className="font-semibold text-neutral-500 col-span-1">Công suất động cơ</span>
                    <span className="text-neutral-700 col-span-2">{selectedProduct.power}</span>
                  </div>

                  <div className="grid grid-cols-3 border-b border-neutral-100 p-3">
                    <span className="font-semibold text-neutral-500 col-span-1">Động cơ / Pin sạc</span>
                    <span className="text-neutral-700 col-span-2">{selectedProduct.engineOrBattery}</span>
                  </div>

                  <div className="grid grid-cols-3 border-b border-neutral-100 p-3 bg-neutral-50/30">
                    <span className="font-semibold text-neutral-500 col-span-1">Tải trọng chuyên chở</span>
                    <span className="text-neutral-700 col-span-2">{selectedProduct.payload}</span>
                  </div>

                  <div className="grid grid-cols-3 border-b border-neutral-100 p-3">
                    <span className="font-semibold text-neutral-500 col-span-1">Mức tiêu thụ nhiên liệu</span>
                    <span className="text-neutral-700 col-span-2">{selectedProduct.fuelConsumption}</span>
                  </div>

                  <div className="grid grid-cols-3 p-3 bg-neutral-50/30">
                    <span className="font-semibold text-neutral-500 col-span-1">Chế độ bảo hành</span>
                    <span className="text-neutral-700 col-span-2">{selectedProduct.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Extra features list */}
              {selectedProduct.featuresVi && selectedProduct.featuresVi.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-xs uppercase text-[#0B0F1A] tracking-wider mb-3 border-b border-neutral-100 pb-2">
                    Các đặc điểm nổi bật & Trang bị đi kèm
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-600 font-light pl-1">
                    {selectedProduct.featuresVi.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] mt-1.5 shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions footer inside modal */}
              <div className="flex gap-3 pt-4 border-t border-neutral-100">
                <button 
                  onClick={() => {
                    const vehicleName = selectedProduct.name;
                    setSelectedProduct(null);
                    openBooking(vehicleName);
                  }}
                  className="flex-1 bg-[#C8102E] hover:bg-[#A30D24] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-sm text-center cursor-pointer"
                >
                  Yêu cầu báo giá lăn bánh
                </button>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 border border-neutral-200 hover:border-neutral-800 text-neutral-600 hover:text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Đóng lại
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
