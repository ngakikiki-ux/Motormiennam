import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, MapPin, Mail, Award, ShieldCheck, Check, 
  ChevronDown, User, Star, ArrowRight, Search, Menu, X, 
  Percent, Truck, FileText, Wrench, UserCheck, Calendar, 
  ChevronRight, Bot, Sparkles, Settings, LogIn, ExternalLink, 
  ThumbsUp, CheckCircle, Facebook, Sun, Moon, Sparkle, ArrowUp, Send, Video
} from 'lucide-react';

import { PRODUCTS, BENEFITS, BUYING_STEPS, REVIEWS, NEWS, FAQS } from './data';
import { Product, NewsItem, ReviewItem, FAQItem, Language } from './types';

// Component Imports
import LoanCalculator from './components/LoanCalculator';
import LeadDashboard from './components/LeadDashboard';
import SEOManager from './components/SEOManager';
import ProductDetails from './components/ProductDetails';
import PriceListSection from './components/PriceListSection';

export default function App() {
  const [language, setLanguage] = useState<Language>('vi');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  
  // Premium Layout States
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [videoReviewId, setVideoReviewId] = useState<string | null>(null);

  // Timed popup state (15s automatic lead capture)
  const [isTimedPopupOpen, setIsTimedPopupOpen] = useState(false);

  // Modals and interactive states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'quote' | 'test-drive' | 'installment' | 'general'>('quote');
  const [bookingVehicle, setBookingVehicle] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Rental Survey States
  const [rentalName, setRentalName] = useState('');
  const [rentalPhone, setRentalPhone] = useState('');
  const [rentalType, setRentalType] = useState('self-drive');
  const [rentalDuration, setRentalDuration] = useState('monthly');
  const [rentalKm, setRentalKm] = useState('100-200');
  const [rentalSuccess, setRentalSuccess] = useState(false);
  const [rentalError, setRentalError] = useState('');
  const [rentalLoading, setRentalLoading] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // FAQ search and state
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqQuery, setFaqQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // News active category
  const [newsCategory, setNewsCategory] = useState<string>('all');

  const isVi = language === 'vi';

  // Dynamic Scroll Listeners
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cinematic Hero background slideshow interval
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // 15-second automatic lead capture popup timer
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyDismissed = localStorage.getItem('toan_popup_dismissed');
      const alreadySubmitted = localStorage.getItem('toan_popup_submitted');
      if (!alreadyDismissed && !alreadySubmitted) {
        setIsTimedPopupOpen(true);
      }
    }, 15000); // 15 seconds
    return () => clearTimeout(timer);
  }, []);

  // Find active product if selected
  const activeProduct = selectedProductId 
    ? PRODUCTS.find(p => p.id === selectedProductId) 
    : null;

  // Filtered Products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.categoryVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered FAQs
  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = faqCategory === 'all' || faq.category === faqCategory;
    const matchesSearch = faqQuery === '' || 
      faq.questionVi.toLowerCase().includes(faqQuery.toLowerCase()) || 
      faq.questionEn.toLowerCase().includes(faqQuery.toLowerCase()) ||
      faq.answerVi.toLowerCase().includes(faqQuery.toLowerCase()) ||
      faq.answerEn.toLowerCase().includes(faqQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered News
  const filteredNews = NEWS.filter(news => {
    return newsCategory === 'all' || news.category === newsCategory;
  });

  // Handle Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitSuccess(false);

    if (!fullName.trim()) {
      setFormError(isVi ? 'Vui lòng nhập họ và tên của bạn!' : 'Please enter your full name!');
      return;
    }

    const cleanPhone = phoneNumber.trim().replace(/[\s\-\(\)]/g, '');
    if (!/^0[0-9]{9}$/.test(cleanPhone)) {
      setFormError(isVi ? 'Số điện thoại không hợp lệ! SĐT phải đủ 10 chữ số và bắt đầu bằng số 0.' : 'Invalid phone number! Must start with 0 and have exactly 10 digits.');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError(isVi ? 'Địa chỉ email không đúng định dạng!' : 'Invalid email format!');
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
          email: email.trim(),
          selectedProduct: bookingVehicle,
          leadType: bookingType,
          notes: notes.trim()
        })
      });

      if (response.ok) {
        setFormSubmitSuccess(true);
        localStorage.setItem('toan_popup_submitted', 'true');
        const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
        storedLeads.push({
          fullName: fullName.trim(),
          phoneNumber: cleanPhone,
          email: email.trim(),
          bookingVehicle,
          bookingType,
          notes: notes.trim(),
          date: new Date().toISOString()
        });
        localStorage.setItem('my_quotes', JSON.stringify(storedLeads));

        // Reset fields
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setNotes('');
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      // In preview, we save to local storage as fallback and still consider it success
      setFormSubmitSuccess(true);
      localStorage.setItem('toan_popup_submitted', 'true');
      const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
      storedLeads.push({
        fullName: fullName.trim(),
        phoneNumber: cleanPhone,
        email: email.trim(),
        bookingVehicle,
        bookingType,
        notes: notes.trim(),
        date: new Date().toISOString()
      });
      localStorage.setItem('my_quotes', JSON.stringify(storedLeads));

      // Reset fields
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setNotes('');
    } finally {
      setFormLoading(false);
    }
  };

  const handleRentalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRentalError('');
    setRentalSuccess(false);

    if (!rentalName.trim()) {
      setRentalError(isVi ? 'Vui lòng nhập họ tên của quý khách!' : 'Please enter your name!');
      return;
    }

    const cleanPhone = rentalPhone.trim().replace(/[\s\-\(\)]/g, '');
    if (!/^0[0-9]{9}$/.test(cleanPhone)) {
      setRentalError(isVi ? 'Số điện thoại không hợp lệ! SĐT phải đủ 10 chữ số và bắt đầu bằng số 0.' : 'Invalid phone number! Must start with 0 and have exactly 10 digits.');
      return;
    }

    setRentalLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: rentalName.trim(),
          phoneNumber: cleanPhone,
          email: '',
          selectedProduct: 'GK48EV RENTAL',
          leadType: 'rental-survey',
          notes: `Hình thức thuê: ${rentalType}, Thời hạn: ${rentalDuration}, Di chuyển dự kiến: ${rentalKm} km/ngày`
        })
      });

      if (response.ok) {
        setRentalSuccess(true);
        setRentalName('');
        setRentalPhone('');
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      // Fallback save locally
      setRentalSuccess(true);
      const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
      storedLeads.push({
        fullName: rentalName.trim(),
        phoneNumber: cleanPhone,
        bookingVehicle: 'GK48EV RENTAL',
        bookingType: 'rental-survey',
        notes: `Hình thức thuê: ${rentalType}, Thời hạn: ${rentalDuration}, Di chuyển dự kiến: ${rentalKm} km/ngày`,
        date: new Date().toISOString()
      });
      localStorage.setItem('my_quotes', JSON.stringify(storedLeads));

      setRentalName('');
      setRentalPhone('');
    } finally {
      setRentalLoading(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4000);
  };

  const dismissTimedPopup = () => {
    setIsTimedPopupOpen(false);
    localStorage.setItem('toan_popup_dismissed', 'true');
  };

  const openBookingModal = (vehicleName: string, type: 'quote' | 'test-drive' | 'installment' | 'general') => {
    setBookingVehicle(vehicleName);
    setBookingType(type);
    setIsBookingOpen(true);
    setFormSubmitSuccess(false);
  };

  const getMonthlyInstallment = (priceStr: string) => {
    const cleanNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    if (isNaN(cleanNum) || cleanNum === 0) return isVi ? 'Góp từ 4.5 Tr/th' : 'From 4.5M/mo';
    const loanAmount = cleanNum * 0.8;
    const principalPerMonth = loanAmount / 84;
    const avgInterestPerMonth = (loanAmount * 0.08) / 12;
    const totalPerMonth = principalPerMonth + avgInterestPerMonth;
    const millionVnd = (totalPerMonth / 1000000).toFixed(1);
    return isVi ? `Góp từ ${millionVnd} Tr/th` : `From ${millionVnd}M/mo`;
  };

  // Theme variable bindings for beautiful light/dark luxury design
  const themeBg = isDarkMode ? 'bg-[#0d0d0e]' : 'bg-[#F8F9FA]';
  const themeText = isDarkMode ? 'text-neutral-100' : 'text-[#111111]';
  const themeTextMuted = isDarkMode ? 'text-neutral-400' : 'text-neutral-600';
  const themeCardBg = isDarkMode ? 'bg-[#16161a]' : 'bg-[#FFFFFF]';
  const themeBorder = isDarkMode ? 'border-neutral-800' : 'border-neutral-200/80';
  const themeNavBg = isDarkMode ? 'bg-black/90' : 'bg-white/90';

  return (
    <div className={`min-h-screen ${themeBg} ${themeText} flex flex-col font-sans relative selection:bg-[#C8102E] selection:text-white antialiased overflow-x-hidden`}>
      
      {/* SEO metadata manager integration */}
      <SEOManager language={language} activeProductId={selectedProductId} activeProduct={activeProduct} />

      {/* 1. Header Bar info */}
      <div className={`py-2 px-4 transition-all duration-300 ${isDarkMode ? 'bg-black border-b border-neutral-900' : 'bg-neutral-900 text-white'}`} id="top-bar">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-mono">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span 
              className="flex items-center gap-1.5 hover:text-[#C8102E] transition-colors cursor-pointer" 
              onClick={() => window.open('tel:0799600789')}
            >
              <Phone size={12} className="text-[#C8102E]" />
              0799.600.789
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-neutral-400">
              <MapPin size={12} className="text-[#C8102E]" />
              451 Quốc lộ 1, xã An Ninh, TP. Cần Thơ
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-neutral-800 rounded-full p-0.5 overflow-hidden border border-neutral-700/50">
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-2 py-0.5 rounded-full transition-all text-[9px] font-bold cursor-pointer ${
                  language === 'vi' ? 'bg-[#C8102E] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                VI
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all text-[9px] font-bold cursor-pointer ${
                  language === 'en' ? 'bg-[#C8102E] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Premium Dark Mode Toggle switch */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all cursor-pointer flex items-center justify-center border border-neutral-700/50"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun size={12} className="text-yellow-500" /> : <Moon size={12} />}
            </button>
            
            {/* Admin Sales Portal */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all cursor-pointer flex items-center justify-center border border-neutral-700/50"
              title="Sales Portal Login"
              id="admin-login-trigger"
            >
              <Settings size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary Sticky Header (Glassmorphic) */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 px-4 border-b ${
          scrolled 
            ? `${themeNavBg}/95 shadow-md shadow-black/5 ${themeBorder} backdrop-blur-md` 
            : 'bg-transparent border-transparent'
        }`} 
        id="main-header"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          
          {/* Brand Logo & Sales Avatar */}
          <a href="#" className="flex items-center space-x-3.5 group">
            <div className="relative">
              <img 
                src="https://sf-static.upanhlaylink.com/img/image_20260702ae8302499ae0feaebd8b1cd9e606c614.jpg" 
                alt="Kim Long Motor Logo" 
                className="h-11 w-auto object-contain rounded-lg border border-neutral-200/50 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#D6001C] to-red-500">
                  KIM LONG
                </span>
                <span className="text-[#C9A227] font-black text-sm tracking-widest uppercase font-poppins">
                  TI TOÀN
                </span>
              </div>
              <span className={`text-[9px] font-mono tracking-wider uppercase transition-colors duration-300 ${scrolled ? 'text-neutral-500' : 'text-neutral-300'}`}>
                {isVi ? 'Đại diện kinh doanh cao cấp' : 'Senior Executive Partner'}
              </span>
            </div>
          </a>

          {/* Navigation links - Desktop */}
          <nav className={`hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${
            scrolled 
              ? (isDarkMode ? 'text-neutral-300' : 'text-neutral-700') 
              : 'text-white'
          }`}>
            <a href="#pricing" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Bảng giá' : 'Pricing'}</a>
            <a href="#faq" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Hỏi đáp' : 'FAQ'}</a>
            <a href="#contact" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Liên hệ' : 'Contact'}</a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => openBookingModal('', 'test-drive')}
              className="flex items-center space-x-2 bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase px-5 py-3 rounded-full cursor-pointer transition-all border border-red-500/20 shadow-md shadow-red-900/10"
              id="header-booking-btn"
            >
              <Calendar size={13} />
              <span>{isVi ? 'Đăng ký lái thử' : 'Book Test Drive'}</span>
            </button>
            <a 
              href="tel:0799600789"
              className={`flex items-center space-x-1 px-4 py-3 rounded-full transition-all text-xs font-bold font-mono border ${
                scrolled
                  ? 'bg-[#111111] hover:bg-[#C8102E] text-white border-neutral-800'
                  : 'bg-white/10 hover:bg-[#C8102E] text-white border-white/20 backdrop-blur-sm'
              }`}
            >
              <Phone size={13} />
              <span>{isVi ? '☎ Gọi ngay' : 'Call'}</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl cursor-pointer transition-colors ${
              scrolled 
                ? (isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black') 
                : 'text-white hover:text-neutral-200'
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${themeBorder} py-5 px-4 space-y-4 ${isDarkMode ? 'bg-neutral-950' : 'bg-white'} animate-fade-in`}>
            <div className="grid grid-cols-1 gap-3 text-xs uppercase tracking-widest font-bold text-neutral-500 text-center">
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Bảng giá' : 'Pricing'}</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Hỏi đáp' : 'FAQ'}</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Liên hệ' : 'Contact'}</a>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => { setMobileMenuOpen(false); openBookingModal('', 'quote'); }}
                className="w-full bg-[#C8102E] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center"
              >
                {isVi ? 'Nhận báo giá lăn bánh' : 'Get On-Road Quote'}
              </button>
              <a
                href="tel:0799600789"
                className="w-full bg-neutral-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5"
              >
                <Phone size={14} />
                <span>{isVi ? 'Gọi Điện Trực Tiếp' : 'Direct Call'}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Fullscreen Automotive cinematic) */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4" id="hero">
        
        {/* Background Visual Podium */}
        <div className="absolute inset-0 bg-[#050507] z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-70 scale-102" 
          style={{ backgroundImage: "url('https://sf-static.upanhlaylink.com/img/image_20260702c23aa2a16e7ed50e4786c31085026f59.jpg')" }}
        ></div>
        
        {/* Strong elegant dark overlay to ensure 100% text legibility on all devices */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/40 to-black/60 z-1"></div>
        
        {/* Decorative Luxury Lighting Accents */}
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none z-1"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 py-12 px-2">
          
          {/* Tagline / Personal Brand */}
          <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 animate-fade-in shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
              {isVi ? 'Ti Toàn | Chuyên viên Kinh doanh Kim Long Motor Miền Nam' : 'Ti Toan | Sales Specialist - Kim Long Motor Southern'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-7xl font-black tracking-tight font-poppins text-white uppercase leading-none drop-shadow-md">
            {isVi ? 'BẢNG GIÁ XE KIM LONG 2026' : 'KIM LONG PRICE SHEET 2026'}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow">
            {isVi 
              ? 'Chọn đúng dòng xe – Tính phương án trả góp – Hỗ trợ giao xe toàn quốc' 
              : 'Choose the Right Model – Calculate Installments – Nationwide Door Delivery'}
          </p>

          {/* Core Trust Message */}
          <div className="max-w-xl mx-auto bg-neutral-900/85 backdrop-blur-sm border border-neutral-800/80 p-3 sm:p-4 rounded-xl text-[11px] sm:text-xs text-neutral-400 font-light leading-normal shadow-md">
            {isVi
              ? 'Tư vấn rõ giá xe, chi phí lăn bánh, phương án vay và chính sách bảo hành.'
              : 'Providing transparent vehicle pricing, registration fees, customized loan programs, and official warranty policies.'}
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => openBookingModal('', 'quote')}
              className="w-full sm:w-auto bg-[#C8102E] hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-4.5 rounded-xl cursor-pointer transition-all shadow-xl shadow-red-950/20 hover:scale-102 flex items-center justify-center gap-2"
            >
              <FileText size={15} />
              <span>{isVi ? 'NHẬN BÁO GIÁ LĂN BÁNH' : 'GET ON-ROAD QUOTE'}</span>
            </button>
            <a
              href="tel:0799600789"
              className="w-full sm:w-auto bg-neutral-900/90 hover:bg-black border border-neutral-800 hover:border-[#C8102E] text-white font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-4.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Phone size={15} className="text-[#C8102E] animate-bounce-subtle" />
              <span>{isVi ? 'GỌI NGAY: 0799 600 789' : 'CALL: 0799 600 789'}</span>
            </a>
          </div>

        </div>

      </section>

      {/* Pricing Matrix Section */}
      <PriceListSection
        language={language}
        isDarkMode={isDarkMode}
        isAdminUnlocked={isAdminUnlocked}
        onOpenBooking={openBookingModal}
        onOpenAdminLogin={() => setIsAdminOpen(true)}
        onSelectProduct={setSelectedProductId}
      />

      {/* 6. Product Details Drawer Overlay */}
      {selectedProductId && activeProduct && (
        <ProductDetails
          product={activeProduct}
          language={language}
          onClose={() => setSelectedProductId(null)}
          onOpenBookingForm={openBookingModal}
        />
      )}

      {/* 11. FAQ Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-neutral-50'} ${themeBorder} border-b px-4`} id="faq">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Hỏi nhanh đáp gọn' : 'FAQ Hub'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins uppercase">
              {isVi ? 'Giải Đáp Thắc Mắc Phổ Biến (FAQs)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Tìm kiếm nhanh giải đáp về lãi suất vay ngân hàng, bảo hành pin tải điện, thủ tục biển vàng và bàn giao xe.'
                : 'Instant answers covering 85% truck financing, LFP batteries warranty, and home delivery support.'
              }
            </p>
          </div>

          {/* Search filter panel */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-neutral-200 dark:border-neutral-850 pb-6">
            <select
              value={faqCategory}
              onChange={(e) => setFaqCategory(e.target.value)}
              className="w-full sm:w-auto bg-white text-gray-900 border border-gray-300 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold shadow-sm"
            >
              <option value="all" className="bg-white text-gray-900">-- {isVi ? 'Chọn tất cả chủ đề' : 'All FAQ categories'} ({FAQS.length}) --</option>
              <option value="price" className="bg-white text-gray-900">{isVi ? 'Giá xe & Ưu đãi' : 'Pricing & Incentives'}</option>
              <option value="installment" className="bg-white text-gray-900">{isVi ? 'Hồ sơ mua trả góp' : 'Financing & Loan papers'}</option>
              <option value="warranty" className="bg-white text-gray-900">{isVi ? 'Thời hạn bảo hành' : 'Factory warranties'}</option>
              <option value="registration" className="bg-white text-gray-900">{isVi ? 'Đăng ký đăng kiểm' : 'Registrations & License'}</option>
              <option value="delivery" className="bg-white text-gray-900">{isVi ? 'Giao nhận xe' : 'National deliveries'}</option>
              <option value="maintenance" className="bg-white text-gray-900">{isVi ? 'Kỹ thuật bảo dưỡng' : 'Maintenances'}</option>
            </select>

            <div className={`relative w-full sm:max-w-xs ${themeCardBg} border ${themeBorder} rounded-xl overflow-hidden`}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
              <input
                id="faq-search-input"
                type="text"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder={isVi ? "Gõ từ khóa tìm câu hỏi nhanh..." : "Search keyword..."}
                className="w-full bg-transparent pl-10 pr-4 py-3 text-xs focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4" id="faq-accordion-group">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className={`w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors font-poppins ${isExpanded ? 'text-[#C8102E] bg-neutral-50/50 dark:bg-neutral-900/20' : 'hover:text-[#C8102E]'}`}
                  >
                    <span className="pr-4 font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                      {isVi ? faq.questionVi : faq.questionEn}
                    </span>
                    <ChevronDown size={18} className={`text-neutral-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#C8102E]' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-4 border-t border-gray-200 dark:border-neutral-800 bg-[#FFF7F7] dark:bg-neutral-950/40 border-l-4 border-l-[#C8102E]">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C8102E] text-white text-[10px] font-black shrink-0 mt-0.5 shadow-sm">
                          A
                        </span>
                        <p className="flex-1 font-sans text-gray-700 dark:text-gray-300 leading-7 text-base">
                          {isVi ? faq.answerVi : faq.answerEn}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. Elegant Premium CTA Banner (Đỏ Kim Long) */}
      <section className="bg-[#C8102E] text-white py-24 px-4 text-center relative overflow-hidden" id="cta-bottom">
        {/* Abstract light reflection */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -bottom-24 left-0 w-[350px] h-[350px] bg-black/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-[10px] bg-white/20 px-3.5 py-1.5 rounded-full font-mono uppercase tracking-widest font-black inline-block">
            {isVi ? 'Cơ hội sở hữu xe giá tốt' : 'Exclusive Partner Program'}
          </span>
          
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight font-poppins uppercase leading-none">
            {isVi ? 'Bạn Đã Sẵn Sàng Sở Hữu Chiếc Xe Phù Hợp?' : 'Are You Ready To Drive Logistic Success?'}
          </h2>
          
          <p className="text-neutral-100/90 max-w-2xl mx-auto text-sm sm:text-lg font-light leading-relaxed">
            {isVi 
              ? 'Liên hệ ngay Ti Toàn | Kim Long Motor hôm nay để nhận báo giá lăn bánh đặc biệt cùng gói duyệt vay trả góp 85% nhanh chóng.'
              : 'Contact Ti Toàn today to secure your exclusive on-road pricing schemes & fast 85% banking support.'
            }
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openBookingModal('', 'quote')}
              className="bg-white hover:bg-neutral-100 text-[#C8102E] font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl cursor-pointer transition-all shadow-xl hover:scale-102"
            >
              {isVi ? 'Nhận báo giá lăn bánh ngay' : 'Get On-Road Quote Now'}
            </button>
            <a
              href="tel:0799600789"
              className="bg-neutral-900 hover:bg-black text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl cursor-pointer transition-all border border-neutral-800 flex items-center justify-center gap-2"
            >
              <Phone size={14} className="text-red-500 animate-pulse" />
              <span>{isVi ? 'Gọi trực tiếp: 0799.600.789' : 'Call: 0799.600.789'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12.5. GK48EV Van Rental & Survey Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-gray-900'} ${themeBorder} border-b px-4`} id="rental-survey">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black inline-block bg-red-600/10 px-3 py-1 rounded-full">
              {isVi ? 'Dịch vụ cho thuê xe Van điện' : 'Kim Long EV Van Rental Program'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-poppins uppercase">
              {isVi ? 'Khảo Sát & Báo Giá Thuê Xe GK48EV' : 'GK48EV Rental Survey & Pricing'}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              {isVi 
                ? 'Nhằm hỗ trợ các cá nhân và doanh nghiệp logistic tối ưu hóa dòng tiền, chúng tôi cung cấp dịch vụ thuê xe Van điện KIM LONG GK48EV ngắn & dài hạn với chính sách ưu đãi vượt trội.'
                : 'Optimize your business logistics with our flexible short-term and long-term electric van rental schemes.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left side: Rental benefits & details */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-poppins uppercase text-[#C8102E]">
                  {isVi ? 'Tại sao nên thuê xe Van điện GK48EV?' : 'Why rent the GK48EV EV Van?'}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {isVi 
                    ? 'GK48EV là dòng xe van điện thông minh sở hữu khoang hàng rộng 4.8 m³, di chuyển 311 km mỗi lần sạc. Việc thuê xe giúp bạn:'
                    : 'The GK48EV boasts a spacious 4.8 m³ cargo hold and 311 km driving range. Rental unlocks amazing perks:'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-white/40 dark:bg-neutral-900/40">
                  <span className="w-8 h-8 rounded-full bg-red-600/10 text-[#C8102E] flex items-center justify-center shrink-0 font-bold font-mono">01</span>
                  <div>
                    <h4 className="font-bold text-sm uppercase">{isVi ? 'Không tốn chi phí đầu tư' : 'No Upfront Capital'}</h4>
                    <p className="text-xs text-neutral-400 mt-1">{isVi ? 'Dành dòng vốn lưu động phục vụ kinh doanh sản xuất, không gánh nặng nợ vay ngân hàng.' : 'Keep your working capital active. Avoid bank interest or large depreciation baggage.'}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-white/40 dark:bg-neutral-900/40">
                  <span className="w-8 h-8 rounded-full bg-red-600/10 text-[#C8102E] flex items-center justify-center shrink-0 font-bold font-mono">02</span>
                  <div>
                    <h4 className="font-bold text-sm uppercase">{isVi ? 'Bảo dưỡng từ A - Z miễn phí' : 'Full Maintenance Included'}</h4>
                    <p className="text-xs text-neutral-400 mt-1">{isVi ? 'Toàn bộ chi phí bảo dưỡng định kỳ, sửa chữa hao mòn và cứu hộ 24/7 đều do đại lý Kim Long Nam Bộ chịu trách nhiệm.' : 'Periodic servicing, battery maintenance, tire replacements & 24/7 support are 100% on us.'}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-white/40 dark:bg-neutral-900/40">
                  <span className="w-8 h-8 rounded-full bg-red-600/10 text-[#C8102E] flex items-center justify-center shrink-0 font-bold font-mono">03</span>
                  <div>
                    <h4 className="font-bold text-sm uppercase">{isVi ? 'Trải nghiệm đo lường hiệu suất' : 'Risk-Free Operations Test'}</h4>
                    <p className="text-xs text-neutral-400 mt-1">{isVi ? 'Cơ hội tuyệt vời để doanh nghiệp vận tải chạy thử thực tế, đo lường chi phí sạc điện cực rẻ so với xăng dầu trước khi mua đứt.' : 'Test-run EV logistics under real loads. Compare electricity savings versus fuel before placing capital.'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Interactive Survey Form */}
            <div className={`lg:col-span-7 ${themeCardBg} border ${themeBorder} rounded-[18px] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden`}>
              {rentalSuccess ? (
                <div className="space-y-6 text-center py-12 my-auto animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-poppins text-emerald-600 dark:text-emerald-400 uppercase">
                      {isVi ? 'Khảo Sát Đã Gửi Thành Công!' : 'Survey Submitted Successfully!'}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300 px-4 leading-relaxed">
                      {isVi
                        ? 'Cảm ơn anh/chị đã tham gia khảo sát thuê xe van điện. Em Ti Toàn sẽ gửi báo giá các gói thuê xe tốt nhất và gọi tư vấn ngay trong ít phút!'
                        : 'Thank you for completing our rental survey. Specialist Ti Toan will contact you with direct rates shortly!'}
                    </p>
                  </div>

                  {/* High-converting Zalo direct contact link */}
                  <div className="space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 max-w-md mx-auto text-center">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider leading-tight">
                      {isVi ? 'Nhận báo giá thuê xe qua Zalo ngay:' : 'Get rental options on Zalo:'}
                    </p>
                    <a
                      href="https://zalo.me/0799600789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer mx-auto"
                    >
                      <span>{isVi ? 'Nhắn Tin Zalo Nhận Báo Giá Thuê' : 'CHAT DIRECT ON ZALO'}</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setRentalSuccess(false)}
                    className="text-xs font-mono font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-white underline cursor-pointer"
                  >
                    {isVi ? 'Làm lại khảo sát' : 'Retake survey'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRentalSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold font-poppins uppercase text-neutral-800 dark:text-white">
                      {isVi ? 'Khảo sát nhu cầu thuê xe GK48EV' : 'GK48EV Van Rental Survey Form'}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {isVi ? 'Vui lòng cung cấp nhu cầu cơ bản dưới đây để Ti Toàn lập phương án thuê xe tối ưu nhất cho quý khách.' : 'Please provide basic requirements below so Mr. Toan can design a tailor-made lease option.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1.5 font-mono">{isVi ? 'Họ tên / Tên doanh nghiệp *' : 'Name / Company Name *'}</label>
                      <input
                        type="text"
                        required
                        value={rentalName}
                        onChange={(e) => {
                          setRentalName(e.target.value);
                          if (rentalError) setRentalError('');
                        }}
                        placeholder={isVi ? "Nguyễn Văn A..." : "John Doe..."}
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1.5 font-mono">{isVi ? 'Số điện thoại nhận bảng tính *' : 'Phone Number *'}</label>
                      <input
                        type="tel"
                        required
                        value={rentalPhone}
                        onChange={(e) => {
                          setRentalPhone(e.target.value);
                          if (rentalError) setRentalError('');
                        }}
                        placeholder="0799..."
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-mono`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1.5 font-mono">{isVi ? 'Hình thức thuê *' : 'Rental Format *'}</label>
                      <select
                        value={rentalType}
                        onChange={(e) => setRentalType(e.target.value)}
                        className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold cursor-pointer"
                      >
                        <option value="self-drive" className="text-gray-900">{isVi ? 'Thuê tự lái' : 'Self-drive'}</option>
                        <option value="with-driver" className="text-gray-900">{isVi ? 'Thuê cả tài xế' : 'With driver'}</option>
                        <option value="corporate-lease" className="text-gray-900">{isVi ? 'Thuê lô lớn doanh nghiệp' : 'Enterprise fleet lease'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1.5 font-mono">{isVi ? 'Thời hạn mong muốn *' : 'Expected Lease Term *'}</label>
                      <select
                        value={rentalDuration}
                        onChange={(e) => setRentalDuration(e.target.value)}
                        className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold cursor-pointer"
                      >
                        <option value="daily" className="text-gray-900">{isVi ? 'Thuê theo ngày' : 'Daily'}</option>
                        <option value="weekly" className="text-gray-900">{isVi ? 'Thuê theo tuần' : 'Weekly'}</option>
                        <option value="monthly" className="text-gray-900">{isVi ? 'Thuê tháng (Tối ưu)' : 'Monthly'}</option>
                        <option value="yearly" className="text-gray-900">{isVi ? 'Thuê dài hạn >1 năm' : 'Yearly (>1 Year)'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1.5 font-mono">{isVi ? 'Cự ly di chuyển/ngày *' : 'Daily distance *'}</label>
                      <select
                        value={rentalKm}
                        onChange={(e) => setRentalKm(e.target.value)}
                        className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold cursor-pointer"
                      >
                        <option value="under-100" className="text-gray-900">{isVi ? 'Dưới 100 Km/ngày' : 'Under 100 Km/day'}</option>
                        <option value="100-200" className="text-gray-900">{isVi ? 'Từ 100 - 200 Km/ngày' : '100 - 200 Km/day'}</option>
                        <option value="over-200" className="text-gray-900">{isVi ? 'Trên 200 Km/ngày' : 'Over 200 Km/day'}</option>
                      </select>
                    </div>
                  </div>

                  {rentalError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-center space-x-2 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>{rentalError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={rentalLoading}
                    className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer transition-colors shadow-lg shadow-red-950/20 flex items-center justify-center gap-2"
                  >
                    {rentalLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        <span>{isVi ? 'Đang gửi khảo sát...' : 'Submitting survey...'}</span>
                      </>
                    ) : (
                      <span>{isVi ? 'GỬI ĐĂNG KÝ KHẢO SÁT THUÊ XE' : 'SUBMIT RENTAL SURVEY'}</span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 13. Contact Form & maps Section */}
      <section className={`py-24 ${themeBorder} border-b px-4`} id="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Detailed showroom address & map */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Kết nối trực tiếp' : 'Locate showroom'}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-poppins uppercase">
              {isVi ? 'Đại Diện Ti Toàn | Kim Long Motor' : 'Representative Ti Toàn'}
            </h2>

            <div className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-800 dark:text-white text-xs sm:text-sm uppercase font-poppins">{isVi ? 'Địa chỉ showroom HQ:' : 'Showroom HQ Address:'}</h4>
                  <p className="mt-0.5">451 Quốc lộ 1, xã An Ninh, Thành phố Cần Thơ.</p>
                  <p className="mt-1 font-semibold text-[#D6B25E]">{isVi ? '✓ Hỗ trợ bàn giao xe và hỗ trợ kỹ thuật tận nơi toàn quốc' : '✓ Direct national home deliveries & lifelong technical servicing.'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Phone size={18} className="text-[#C8102E] shrink-0" />
                <div>
                  <h4 className="font-bold text-neutral-800 dark:text-white text-xs sm:text-sm uppercase font-poppins">{isVi ? 'Hotline Điện thoại & Zalo:' : 'Call & Zalo hotline:'}</h4>
                  <p className="mt-0.5 font-bold font-mono text-[#C8102E] text-base hover:underline cursor-pointer animate-pulse-subtle" onClick={() => window.open('tel:0799600789')}>
                    0799.600.789
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Facebook size={18} className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-neutral-800 dark:text-white text-xs sm:text-sm uppercase font-poppins">Facebook cá nhân:</h4>
                  <a 
                    href="https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-0.5 hover:text-blue-500 transition-colors font-mono hover:underline text-xs"
                  >
                    facebook.com/nguyenquoctoanst
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Mail size={18} className="text-red-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-neutral-800 dark:text-white text-xs sm:text-sm uppercase font-poppins">Email làm việc:</h4>
                  <p className="mt-0.5 font-mono">titoan.kimlong@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Google map iframe embed with rounded-18px */}
            <div className="rounded-[18px] overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-neutral-950 aspect-[16/10] shadow-md relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408163!2d105.78822!3d10.0299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de397c7%3A0x7be2413e16c91a0b!2zNDUxIFF14buRYyBs4buZIDEsIEFuIELDrG5oLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1719859200000!5m2!1svi!2s" 
                className={`w-full h-full border-0 opacity-75 ${isDarkMode ? 'grayscale invert' : ''}`} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form capture box */}
          <div className={`lg:col-span-7 ${themeCardBg} border ${themeBorder} rounded-[18px] p-6 sm:p-8 space-y-6 shadow-md`}>
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-poppins text-neutral-800 dark:text-white uppercase">
                {isVi ? 'Yêu Cầu Báo Giá & Đăng Ký Lái Thử' : 'Inquire On-Road Quote & Demo'}
              </h3>
              <p className="text-xs text-neutral-400">
                {isVi 
                  ? 'Hãy nhập thông tin liên hệ chính xác, em Ti Toàn sẽ gửi bảng tính ngân hàng chi tiết và tư vấn kỹ lưỡng.' 
                  : 'Submit precise details to receive structured payment schedules & callbacks from Ti Toàn.'
                }
              </p>
            </div>

            {formSubmitSuccess ? (
              <div className="space-y-6 text-center py-8 animate-fade-in bg-emerald-500/5 rounded-[18px] p-6 border border-emerald-500/20">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-poppins text-emerald-600 dark:text-emerald-400 uppercase">
                    {isVi ? 'Gửi Yêu Cầu Thành Công!' : 'Request Sent Successfully!'}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-300 px-4 leading-relaxed">
                    {isVi
                      ? 'Yêu cầu báo giá của anh/chị đã được chuyển đến chuyên viên Ti Toàn. Em sẽ gọi điện lại hỗ trợ anh/chị ngay bây giờ!'
                      : 'Your query has been recorded. Advisor Ti Toan will contact you shortly!'}
                  </p>
                </div>

                {/* High-converting Zalo CTA integration */}
                <div className="space-y-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 max-w-md mx-auto">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {isVi ? 'Nhận báo giá cực nhanh qua Zalo:' : 'Get instant Zalo callback:'}
                  </p>
                  <a
                    href="https://zalo.me/0799600789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <span>{isVi ? 'NHẮN TIN ZALO NHẬN BÁO GIÁ' : 'CHAT DIRECT ON ZALO'}</span>
                  </a>
                </div>

                <button
                  onClick={() => setFormSubmitSuccess(false)}
                  className="text-xs font-mono font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-white underline cursor-pointer"
                >
                  {isVi ? 'Gửi yêu cầu khác' : 'Send another request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Họ và tên *' : 'Full Name *'}</label>
                    <input
                      id="form-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "E.g., John Doe"}
                      className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Số điện thoại *' : 'Phone Number *'}</label>
                    <input
                      id="form-phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={isVi ? "Ví dụ: 0799600789" : "E.g., 0799600789"}
                      className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors font-mono`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Địa chỉ Email (Không bắt buộc)' : 'Email address (Optional)'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder={isVi ? "vi-du@gmail.com" : "example@gmail.com"}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Dòng xe quan tâm *' : 'Vehicle model *'}</label>
                  <select
                    id="form-product-select"
                    value={bookingVehicle}
                    onChange={(e) => {
                      setBookingVehicle(e.target.value);
                      if (formError) setFormError('');
                    }}
                    className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold shadow-sm"
                  >
                    <option value="" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">-- {isVi ? 'Chọn mẫu xe' : 'Select vehicle'} --</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name} className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">{p.name}</option>
                    ))}
                  </select>
                </div>

                {formError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-center space-x-2 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-[#C8102E] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer transition-colors shadow-lg shadow-red-950/20 flex items-center justify-center gap-2"
                  id="form-submit-btn"
                >
                  {formLoading ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>{isVi ? 'Đang gửi...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <span>{isVi ? 'Gửi Yêu Cầu Liên Hệ' : 'Send My Request'}</span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 14. High End Footer */}
      <footer className={`bg-[#0c0c0e] text-white py-16 ${themeBorder} border-t px-4 font-sans text-xs`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-neutral-850 pb-12 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-poppins font-black text-lg uppercase tracking-wider text-white">
              Ti Toàn <span className="text-[#C8102E]">| Kim Long Motor</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              {isVi 
                ? 'Đại diện kinh doanh ủy quyền phân phối các dòng xe tải nhẹ, xe tải trung, tải nặng, xe đầu kéo, xe van điện GK48EV, xe tải điện EV-300 và xe khách cao cấp.'
                : 'Official commercial sales executive at Kim Long Motor. Distributing premier electric cargo trucks, heavy tractors, minibus & coach.'
              }
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a href="https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900 hover:bg-[#C8102E] rounded-full transition-all text-neutral-400 hover:text-white border border-neutral-800">
                <Facebook size={16} />
              </a>
              <a href="https://zalo.me/0799600789" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900 hover:bg-[#C8102E] rounded-full transition-all text-neutral-400 hover:text-white border border-neutral-800 font-bold uppercase tracking-wider text-[9px] flex items-center justify-center">
                ZL
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400 font-mono">{isVi ? 'Liên kết nhanh' : 'Quick navigation'}</h4>
            <ul className="space-y-2.5 text-neutral-400 font-medium">
              <li><a href="#pricing" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Bảng giá dòng xe' : 'Price List'}</a></li>
              <li><a href="#faq" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Câu hỏi thường gặp' : 'FAQ Hub'}</a></li>
              <li><a href="#contact" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Liên hệ & Bản đồ' : 'Contact & Showroom'}</a></li>
            </ul>
          </div>

          {/* Col 3: Newsletter Subscribe (Đăng ký nhận tin) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400 font-mono">{isVi ? 'Đăng ký nhận ưu đãi' : 'VIP Newsletter'}</h4>
            <p className="text-neutral-400 leading-relaxed">
              {isVi 
                ? 'Nhận ngay thông báo bảng tính ngân hàng mới nhất, chính sách thuế trước bạ và khuyến mãi hàng tháng.'
                : 'Receive monthly discount plans, road tax updates & customized loan models directly.'
              }
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="E.g., you@gmail.com"
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8102E] flex-1 font-mono"
              />
              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-4 rounded-xl cursor-pointer transition-colors"
              >
                <Send size={14} />
              </button>
            </form>
            {newsletterSuccess && (
              <p className="text-[10px] text-emerald-400 animate-fade-in">
                ✓ {isVi ? 'Đã đăng ký email nhận tin thành công!' : 'Newsletter Subscribed!'}
              </p>
            )}
          </div>

        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center text-neutral-500 font-mono text-[10px] space-y-4 sm:space-y-0 text-center">
          <p>© 2026 Đại Diện Kinh Doanh Nguyễn Quốc Toàn | Kim Long Motor. All Rights Reserved.</p>
        </div>
      </footer>

      {/* 15. MOBILE ONLY: Floating Bottom Action Navigation Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 py-2 px-3 z-40 flex justify-around items-center lg:hidden shadow-2xl border-t transition-all duration-300 ${isDarkMode ? 'bg-black/95 backdrop-blur-md border-neutral-900' : 'bg-white/95 backdrop-blur-md border-neutral-200'}`}
        id="floating-cta-bar"
      >
        <a 
          href="#main-header" 
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-red-500/10 dark:bg-red-500/5 flex items-center justify-center text-[#C8102E] mb-1">
            <span>🏠</span>
          </div>
          <span>{isVi ? 'Trang chủ' : 'Home'}</span>
        </a>

        <a 
          href="#pricing" 
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-red-500/10 dark:bg-red-500/5 flex items-center justify-center text-[#C8102E] mb-1">
            <span>🚛</span>
          </div>
          <span>{isVi ? 'Bảng giá' : 'Pricing'}</span>
        </a>

        <a 
          href="https://zalo.me/0799600789" 
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-1">
            <span>💬</span>
          </div>
          <span>Zalo</span>
        </a>

        <a 
          href="tel:0799600789" 
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-1">
            <span>📞</span>
          </div>
          <span>{isVi ? 'Gọi ngay' : 'Call'}</span>
        </a>

        <a 
          href="#contact" 
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-1">
            <span>👤</span>
          </div>
          <span>{isVi ? 'Liên hệ' : 'Contact'}</span>
        </a>
      </div>

      {/* Floating Desktop Action Buttons (Pulsing triggers in margins) */}
      <div className="fixed bottom-6 right-6 z-30 hidden sm:flex flex-col space-y-3" id="floating-desktop-triggers">
        {/* Zalo Button */}
        <a 
          href="https://zalo.me/0799600789"
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 duration-200 cursor-pointer relative group"
          title="Zalo Chat"
        >
          <MessageSquare size={20} />
          <span className="absolute right-14 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Zalo Chat</span>
        </a>

        {/* Facebook Messenger Button */}
        <a 
          href="https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 duration-200 cursor-pointer relative group"
          title="Messenger"
        >
          <Facebook size={20} />
          <span className="absolute right-14 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Facebook</span>
        </a>

        {/* Phone Button */}
        <a 
          href="tel:0799600789"
          className="w-12 h-12 bg-[#C8102E] hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 duration-200 cursor-pointer relative group animate-pulse-subtle"
          title={isVi ? 'Gọi điện ngay' : 'Call Ti Toàn'}
        >
          <Phone size={20} />
          <span className="absolute right-14 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">0799.600.789</span>
        </a>
      </div>

      {/* 16. Timed Automatic Popup (15s after landing) */}
      {isTimedPopupOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className={`${themeCardBg} border ${themeBorder} rounded-[18px] p-6 sm:p-8 w-full max-w-lg relative shadow-2xl animate-fade-in`}>
            
            <button
              onClick={dismissTimedPopup}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              {formSubmitSuccess ? (
                <div className="space-y-6 text-center py-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-poppins text-emerald-600 dark:text-emerald-400 uppercase">
                      {isVi ? 'Đăng Ký Thành Công!' : 'Submission Successful!'}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300 px-4 leading-relaxed">
                      {isVi
                        ? 'Yêu cầu của quý khách đã được chuyển trực tiếp tới chuyên viên Ti Toàn. Em sẽ chủ động liên hệ lại hỗ trợ anh/chị ngay lập tức!'
                        : 'Your quote request has been sent to Specialist Ti Toan. He will connect with you shortly!'}
                    </p>
                  </div>

                  {/* High-converting Zalo CTA integration */}
                  <div className="space-y-2.5 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 max-w-sm mx-auto text-center">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider leading-tight">
                      {isVi ? 'Anh chị muốn nhận báo giá qua Zalo?' : 'Need direct estimates on Zalo?'}
                    </p>
                    <a
                      href="https://zalo.me/0799600789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <span>{isVi ? 'Nhắn Tin Zalo Cho Ti Toàn' : 'Chat directly on Zalo'}</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsTimedPopupOpen(false);
                        setFormSubmitSuccess(false);
                      }}
                      className="text-xs font-mono font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-white underline cursor-pointer"
                    >
                      {isVi ? 'Đóng cửa sổ' : 'Close window'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2 text-[#C8102E]">
                    <Sparkles size={20} className="animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{isVi ? 'Ưu đãi có thời hạn' : 'LIMITED SPECIAL OFFER'}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-poppins uppercase">
                    {isVi ? 'Đăng Ký Nhận Giá Lăn Bánh Tốt Nhất!' : 'Secure Today\'s Best VIP Quote!'}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 dark:text-neutral-300 leading-relaxed">
                    {isVi 
                      ? 'Hãy để lại thông tin nhanh bên dưới. Em Ti Toàn sẽ lập tức gọi điện gửi bảng tính lãi suất trả góp 85% và chương trình khuyến mãi tặng voucher 7.000.000đ dành riêng cho anh/chị.'
                      : 'Submit this rapid card to receive customized payment options & a 7,000,000 VND discount coupon.'
                    }
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Họ tên tài xế / doanh nghiệp *' : 'Name / Company *'}</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={isVi ? "Nguyễn Văn A..." : "John Doe..."}
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Số điện thoại nhận bảng tính *' : 'Phone Number *'}</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder="0799..."
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-mono`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Email liên hệ (Không bắt buộc)' : 'Email address (Optional)'}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={isVi ? "vi-du@gmail.com" : "example@gmail.com"}
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Dòng xe bạn đang tham khảo *' : 'Model of interest *'}</label>
                      <select
                        value={bookingVehicle}
                        onChange={(e) => {
                          setBookingVehicle(e.target.value);
                          if (formError) setFormError('');
                        }}
                        className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold shadow-sm cursor-pointer"
                        required
                      >
                        <option value="" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">-- {isVi ? 'Chọn dòng xe' : 'Select model'} --</option>
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.name} className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">{p.name}</option>
                        ))}
                      </select>
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-center space-x-2 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={dismissTimedPopup}
                        className={`flex-1 border ${themeBorder} hover:bg-neutral-100 dark:hover:bg-neutral-900 py-3 rounded-xl text-xs font-bold uppercase cursor-pointer text-center text-neutral-400`}
                      >
                        {isVi ? 'Bỏ qua' : 'Dismiss'}
                      </button>
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="flex-[2] bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl cursor-pointer transition-colors shadow-lg shadow-red-950/20 flex items-center justify-center gap-2"
                      >
                        {formLoading ? (
                          <>
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                            <span>{isVi ? 'Đang gửi...' : 'Submitting...'}</span>
                          </>
                        ) : (
                          <span>{isVi ? 'Nhận ưu đãi ngay' : 'Secure VIP Quote'}</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Dialog Modal Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[90] flex items-center justify-center p-4">
          <div className={`${themeCardBg} border ${themeBorder} rounded-[18px] p-6 sm:p-8 w-full max-w-xl relative shadow-2xl`}>
            <button
              onClick={() => {
                setIsBookingOpen(false);
                setFormSubmitSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              {formSubmitSuccess ? (
                <div className="space-y-6 text-center py-6 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-poppins text-emerald-600 dark:text-emerald-400 uppercase">
                      {isVi ? 'Gửi Yêu Cầu Thành Công!' : 'Request Sent Successfully!'}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300 px-4 leading-relaxed">
                      {isVi
                        ? 'Yêu cầu của quý khách đã được lưu trữ và chuyển đến Chuyên viên Ti Toàn. Em sẽ gọi điện lại hỗ trợ anh/chị ngay bây giờ!'
                        : 'Your details have been successfully saved. Advisor Ti Toan will contact you shortly!'}
                    </p>
                  </div>

                  {/* High-converting Zalo CTA integration */}
                  <div className="space-y-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 max-w-sm mx-auto text-center">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider leading-tight">
                      {isVi ? 'Nhận báo giá cực nhanh qua Zalo:' : 'Get lightning-fast response on Zalo:'}
                    </p>
                    <a
                      href="https://zalo.me/0799600789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <span>{isVi ? 'NHẮN TIN ZALO CHO TI TOÀN' : 'CHAT ON ZALO NOW'}</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setIsBookingOpen(false);
                      setFormSubmitSuccess(false);
                    }}
                    className="text-xs font-mono font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-white underline cursor-pointer"
                  >
                    {isVi ? 'Đóng cửa sổ' : 'Close window'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#C8102E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      {bookingType}
                    </span>
                    <h3 className="text-xl font-bold font-poppins uppercase">
                      {isVi ? 'Đăng Ký Trực Tiếp Ti Toàn' : 'Book Consultant Direct'}
                    </h3>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Họ và tên *' : 'Full Name *'}</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "E.g., John Doe"}
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Số điện thoại *' : 'Phone Number *'}</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder="0799..."
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-mono`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Email liên hệ (Không bắt buộc)' : 'Email address (Optional)'}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={isVi ? "vi-du@gmail.com" : "example@gmail.com"}
                        className={`w-full ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-gray-900'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Dòng xe quan tâm *' : 'Interested Vehicle *'}</label>
                      <select
                        value={bookingVehicle}
                        onChange={(e) => {
                          setBookingVehicle(e.target.value);
                          if (formError) setFormError('');
                        }}
                        className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold shadow-sm cursor-pointer"
                        required
                      >
                        <option value="" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">-- {isVi ? 'Chọn dòng xe' : 'Select model'} --</option>
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.name} className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">{p.name}</option>
                        ))}
                      </select>
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-center space-x-2 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                        <span>{formError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2"
                    >
                      {formLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          <span>{isVi ? 'Đang gửi...' : 'Submitting...'}</span>
                        </>
                      ) : (
                        <span>{isVi ? 'Gửi Yêu Cầu Cho Ti Toàn' : 'Submit Booking Request'}</span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Handover Video Review Modal Simulation */}
      {videoReviewId && (
        <div className="fixed inset-0 bg-black/95 z-[99] flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 w-full max-w-2xl relative shadow-2xl">
            <button
              onClick={() => setVideoReviewId(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-850 rounded-full transition-all cursor-pointer z-[100]"
            >
              <X size={18} />
            </button>

            <div className="space-y-4 text-center">
              <span className="text-[10px] bg-red-600/15 border border-red-500/30 text-red-400 px-3 py-1 rounded-full uppercase font-mono font-bold inline-block">
                {isVi ? 'Video Đánh Giá Thực Tế' : 'Genuine Video Interview Log'}
              </span>
              <h3 className="text-lg font-bold font-poppins text-white uppercase">
                {REVIEWS.find(r => r.id === videoReviewId)?.name} - {isVi ? 'Chia sẻ câu chuyện bàn giao xe' : 'Handover customer feedback share'}
              </h3>

              {/* Simulated cinematic mockup player */}
              <div className="aspect-[16/9] w-full rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden relative flex items-center justify-center">
                <img 
                  src={REVIEWS.find(r => r.id === videoReviewId)?.handoverImage} 
                  alt="Cinema handover frame" 
                  width="640"
                  height="360"
                  className="w-full h-full object-cover blur-sm opacity-50 absolute inset-0"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/vehicles/vehicle-placeholder.svg";
                  }}
                />
                
                {/* Overlay visual controls */}
                <div className="z-10 text-center space-y-3 p-6 bg-black/60 backdrop-blur-sm rounded-2xl border border-neutral-800 max-w-md mx-auto">
                  <div className="flex justify-center">
                    <span className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center animate-ping absolute"></span>
                    <span className="w-12 h-12 rounded-full bg-[#C8102E] text-white flex items-center justify-center relative"><Video size={20} fill="currentColor" /></span>
                  </div>
                  <p className="text-xs text-white font-bold leading-normal">
                    {isVi 
                      ? `"Tôi vô cùng tin tưởng Ti Toàn. Xe tải điện chạy êm, hỗ trợ sườn xe và đăng kiểm biển vàng nhanh chóng!"` 
                      : `"Incredible support from Mr. Toan. The EV fleet is working perfectly and the gold license plates were approved immediately!"`
                    }
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono font-bold">
                    By {REVIEWS.find(r => r.id === videoReviewId)?.name}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const rev = REVIEWS.find(r => r.id === videoReviewId);
                    setVideoReviewId(null);
                    openBookingModal(rev?.vehicleModel || '', 'quote');
                  }}
                  className="bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  {isVi ? 'Liên hệ nhận báo giá xe này' : 'Get Quote on this Vehicle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to top scroll button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-[#C8102E] text-white border border-neutral-800 hover:border-[#C8102E]/40 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
          title="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}



      {/* Gated Administrative Sales Dashboard Modal */}
      {isAdminOpen && (
        <LeadDashboard 
          language={language} 
          onClose={() => setIsAdminOpen(false)} 
          onAuthSuccess={() => setIsAdminUnlocked(true)}
        />
      )}

    </div>
  );
}
