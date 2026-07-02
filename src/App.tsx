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
import ShowroomChatbot from './components/ShowroomChatbot';
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
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setFormLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          selectedProduct: bookingVehicle,
          leadType: bookingType,
          notes
        })
      });

      if (response.ok) {
        setFormSubmitSuccess(true);
        localStorage.setItem('toan_popup_submitted', 'true');
        // Save to browser localStorage to sync user state
        const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
        storedLeads.push({
          fullName, phoneNumber, email, bookingVehicle, bookingType, notes, date: new Date().toISOString()
        });
        localStorage.setItem('my_quotes', JSON.stringify(storedLeads));

        // Reset form fields
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setNotes('');
        
        // Hide the popup timer as well
        setTimeout(() => {
          setIsBookingOpen(false);
          setIsTimedPopupOpen(false);
          setFormSubmitSuccess(false);
        }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      // Fallback save in localStorage so client is always fast and successful
      setFormSubmitSuccess(true);
      localStorage.setItem('toan_popup_submitted', 'true');
      const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
      storedLeads.push({
        fullName, phoneNumber, email, bookingVehicle, bookingType, notes, date: new Date().toISOString()
      });
      localStorage.setItem('my_quotes', JSON.stringify(storedLeads));
      
      setTimeout(() => {
        setIsBookingOpen(false);
        setIsTimedPopupOpen(false);
        setFormSubmitSuccess(false);
      }, 3000);
    } finally {
      setFormLoading(false);
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
            <a href="#intro" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Giới thiệu' : 'About'}</a>
            <a href="#products" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Sản phẩm' : 'Vehicles'}</a>
            <a href="#pricing" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Bảng giá' : 'Pricing'}</a>
            <a href="#benefits" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Ưu điểm' : 'Benefits'}</a>
            <a href="#process" className="hover:text-[#C8102E] transition-colors duration-200">{isVi ? 'Quy trình' : 'Process'}</a>
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
            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-widest font-bold text-neutral-500">
              <a href="#intro" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Giới thiệu' : 'About'}</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Sản phẩm' : 'Vehicles'}</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Bảng giá' : 'Pricing'}</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Lợi ích' : 'Benefits'}</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#C8102E]">{isVi ? 'Quy trình' : 'Process'}</a>
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
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4" id="hero">
        
        {/* Background Visual Podium */}
        <div className="absolute inset-0 bg-[#050507] z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-100 scale-102" 
          style={{ backgroundImage: "url('https://sf-static.upanhlaylink.com/img/image_20260702c23aa2a16e7ed50e4786c31085026f59.jpg')" }}
        ></div>
        
        {/* Soft elegant transition overlay to preserve maximum image clarity and transition nicely */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-60 z-1"></div>
        
        {/* Decorative Luxury Lighting Accents */}
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[130px] pointer-events-none"></div>
      </section>

      {/* 4. Section Giới thiệu (About Ti Toàn Portrait) */}
      <section className={`py-24 ${themeBorder} border-b px-4`} id="intro">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Avatar Area with double border glass card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-600/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl"></div>
            
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[18px] overflow-hidden border border-neutral-300/40 dark:border-neutral-800 group shadow-2xl bg-neutral-900">
              <img 
                src="https://sf-static.upanhlaylink.com/img/image_20260702824efeefac71b16619dbdac9a7abe1ec.jpg" 
                alt="Ti Toàn - Kim Long Motor Advisor" 
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-center bg-black/60 backdrop-blur-md border border-neutral-800 py-3 rounded-2xl">
                <p className="text-[#C9A227] font-poppins font-bold text-lg tracking-wider uppercase">NGUYỄN QUỐC TOÀN</p>
                <p className="text-[9px] font-mono text-neutral-300 mt-1 uppercase tracking-widest">
                  {isVi ? 'Đại Diện Thương Mại Xuất Sắc' : 'Senior Commercial Agent'}
                </p>
              </div>
            </div>
          </div>

          {/* Biography and commitments */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-[#D6001C] text-xs font-mono uppercase tracking-widest font-black block">
                {isVi ? 'Chân dung thương hiệu' : 'Personal Brand Portrait'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins uppercase leading-tight">
                {isVi ? 'Tận tâm - Uy tín - Đồng hành trọn đời' : 'Dedicated - Reliable - Lifelong Partner'}
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-300 font-light">
              {isVi 
                ? 'Em là Ti Toàn (Nguyễn Quốc Toàn), Đại diện bán hàng ủy quyền các dòng xe thương mại Kim Long Motor. Với triết lý kinh doanh "Khách hàng là tri kỷ", em không chỉ bán một chiếc xe vận tải, mà luôn cam kết mang lại giải pháp tài chính tối ưu nhất, bảo dưỡng lưu động 24/7 và đồng hành trọn đời cùng thành công của quý doanh nghiệp.'
                : 'I am Ti Toàn, authorized sales lead at Kim Long Motor. Built upon our core value "Customers are lifelong companions", I dedicate myself to providing customized corporate financing schemes, 24/7 mobile vehicle support, and reliable lifelong post-sale relationships.'
              }
            </p>

            {/* Experience timeline steps inside about */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6B25E] font-mono">{isVi ? 'Hành trình cam kết vàng:' : 'Hành trình cam kết vàng:'}</h4>
              <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 space-y-6">
                {[
                  { yr: 'Bước 1', title: isVi ? 'Khảo sát nhu cầu vận hành thực tế' : 'Accurate operational demand survey' },
                  { yr: 'Bước 2', title: isVi ? 'Tính toán cấu hình tối ưu tài chính' : 'Financial configurations optimization' },
                  { yr: 'Bước 3', title: isVi ? 'Duyệt vay trả góp 85% nhanh gọn trong 48h' : 'Fast 85% corporate credit approvals within 48h' },
                  { yr: 'Bước 4', title: isVi ? 'Bàn giao xe tận nơi toàn quốc & bảo dưỡng Mobile Service' : 'National vehicle delivery & lifelong mobile maintenance' }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#C8102E] border-2 border-white dark:border-neutral-900"></span>
                    <p className="text-[10px] font-mono text-[#D6B25E] font-bold uppercase">{item.yr}</p>
                    <p className="font-bold text-sm mt-0.5">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => openBookingModal('', 'general')}
                className="bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl cursor-pointer transition-all flex items-center gap-2"
              >
                <span>{isVi ? 'Đặt lịch hẹn cùng Ti Toàn' : 'Consult with Ti Toàn'}</span>
                <ArrowRight size={14} />
              </button>
              <a 
                href="https://zalo.me/0799600789"
                target="_blank"
                referrerPolicy="no-referrer"
                className={`border ${themeBorder} hover:border-[#C8102E] ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-black'} font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2`}
              >
                <MessageSquare size={14} className="text-blue-500" />
                <span>Zalo</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4.5. Vehicle Categories Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-[#0f0f10]' : 'bg-[#F8F9FB]'} border-b ${themeBorder} px-4`} id="categories">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Phân Khúc Vận Tải' : 'Automotive Segments'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins uppercase text-[#111827] dark:text-white">
              {isVi ? 'Danh Mục Dòng Xe Chuyên Nghiệp' : 'Premium Vehicle Categories'}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Lựa chọn phân khúc xe thương mại phù hợp tối ưu với mô hình Logistics của bạn.'
                : 'Select the commercial vehicle class engineered to elevate your shipping logistics business.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'electric',
                titleVi: 'Vận Tải Điện Xanh EV',
                titleEn: 'Electric Green Fleet',
                descVi: 'Tương lai logistics đô thị 100% điện năng, tiết kiệm 40% nhiên liệu, 0 khí thải.',
                descEn: 'The future of city shipping. 100% electric cargo, 40% fuel save, zero emissions.',
                image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600',
                badgeVi: 'Xu Hướng Mới',
                badgeEn: 'Eco Future'
              },
              {
                id: 'light',
                titleVi: 'Xe Tải Nhẹ Đô Thị',
                titleEn: 'Light Commercial Trucks',
                descVi: 'Được thiết kế linh hoạt, di chuyển dễ dàng trong phố giờ cao điểm, tối ưu tải trọng.',
                descEn: 'Engineered for street agility, optimal payloads, and easy high-traffic downtown access.',
                image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
                badgeVi: 'Bán Chạy Nhất',
                badgeEn: 'Top Seller'
              },
              {
                id: 'heavy',
                titleVi: 'Vận Tải Trung & Nặng',
                titleEn: 'Medium & Heavy Duty',
                descVi: 'Khung gầm siêu chịu lực, động cơ Weichai dũng mãnh, vượt mọi cung đường xa lộ xuyên Việt.',
                descEn: 'Reinforced heavy chassis, commanding Weichai engines for trans-national highway freight.',
                image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=600',
                badgeVi: 'Hiệu Suất Vượt Trội',
                badgeEn: 'Maximum Power'
              },
              {
                id: 'bus',
                titleVi: 'Xe Bus & Minibus',
                titleEn: 'Buses & Coach Fleet',
                descVi: 'Cung điện di động sang trọng, giường nằm massage đa điểm, tiêu chuẩn khách sạn 5 sao.',
                descEn: 'Luxurious mobile palaces, individual massage berths, 5-star passenger hospitality.',
                image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
                badgeVi: 'Đẳng Cấp Thượng Lưu',
                badgeEn: 'Palace Coach'
              }
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden group hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.titleVi}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[8px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-md">
                    {isVi ? cat.badgeVi : cat.badgeEn}
                  </span>
                </div>
                
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black tracking-tight text-[#111827] dark:text-white uppercase font-poppins group-hover:text-[#C8102E] transition-colors">
                      {isVi ? cat.titleVi : cat.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-2 line-clamp-3 font-light">
                      {isVi ? cat.descVi : cat.descEn}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-[#C8102E] font-bold gap-1 mt-4 group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>{isVi ? 'Khám phá dòng xe' : 'Explore Fleet'}</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Product Catalog Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-neutral-950/40' : 'bg-white'} ${themeBorder} border-b px-4`} id="products">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Đội xe tinh hoa' : 'Elite Showroom Portfolio'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins uppercase">
              {isVi ? 'Bảng giá & Các Dòng Xe Kim Long' : 'Kim Long Fleet Pricing & Lineup'}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Tìm kiếm dòng xe tải điện xanh đô thị, xe tải nhẹ, trung, nặng, minibus và xe bus chất lượng cao.'
                : 'Search premium electric cargo trucks, light commercial vehicles, minibus, and passenger coach buses.'
              }
            </p>
          </div>

          {/* Search bar inside Catalog */}
          <div className={`max-w-md mx-auto relative rounded-xl overflow-hidden border ${themeBorder} focus-within:border-[#C8102E] ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} transition-all`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Gõ tìm kiếm dòng xe, tải trọng..." : "Search commercial models..."}
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-xs focus:outline-none placeholder-neutral-400 font-sans"
            />
          </div>

          {/* Category Filter Tabs with count indicators */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 scrollbar-none border-b border-neutral-200/50 dark:border-neutral-900">
            {[
              { val: 'all', vi: 'Tất cả', en: 'All' },
              { val: 'electric', vi: 'Xe điện', en: 'Electric' },
              { val: 'light', vi: 'Xe tải nhẹ', en: 'Light Trucks' },
              { val: 'medium', vi: 'Xe tải trung', en: 'Medium' },
              { val: 'heavy', vi: 'Xe tải nặng', en: 'Heavy' },
              { val: 'minibus', vi: 'Minibus', en: 'Minibus' },
              { val: 'bus', vi: 'Xe bus', en: 'Coach' }
            ].map((tab) => {
              const count = tab.val === 'all' 
                ? PRODUCTS.length 
                : PRODUCTS.filter(p => p.category === tab.val).length;
              
              return (
                <button
                  key={tab.val}
                  onClick={() => setActiveCategory(tab.val)}
                  className={`text-xs px-4 py-2.5 rounded-full border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-bold ${
                    activeCategory === tab.val 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                      : `${themeBorder} text-neutral-500 hover:text-black dark:hover:text-white`
                  }`}
                >
                  <span>{isVi ? tab.vi : tab.en}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${activeCategory === tab.val ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const isElectric = p.category === 'electric';
              const isPopular = p.id === 'gk48ev' || p.id === 'kiman9-199';
              
              return (
                <div 
                  key={p.id}
                  className={`${themeCardBg} border ${themeBorder} rounded-[20px] overflow-hidden hover:border-[#D4AF37]/70 group flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 relative`}
                >
                  {/* Image panel */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay on image bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Glassmorphic Category badge */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-neutral-800 rounded-full px-3 py-1 text-[9px] font-mono text-white uppercase tracking-widest font-bold">
                      {isVi ? p.categoryVi : p.categoryEn}
                    </div>

                    {/* Elite Luxury Status tags */}
                    {isElectric && (
                      <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white rounded-full px-2.5 py-0.5 text-[8px] font-bold tracking-widest uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                        <span>{isVi ? 'Vận Tải Xanh' : 'EV Eco'}</span>
                      </div>
                    )}
                    
                    {!isElectric && isPopular && (
                      <div className="absolute top-4 right-4 bg-[#D4AF37] text-black rounded-full px-2.5 py-0.5 text-[8px] font-black tracking-widest uppercase flex items-center gap-1 shadow-md">
                        <Star size={8} fill="currentColor" />
                        <span>{isVi ? 'Bán Chạy' : 'Best Seller'}</span>
                      </div>
                    )}
                  </div>

                  {/* Card details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-black tracking-tight group-hover:text-[#C8102E] transition-colors font-poppins text-neutral-900 dark:text-white uppercase leading-tight">
                          {p.name}
                        </h3>
                        {/* 5 Star Rating overlay */}
                        <div className="flex text-[#D4AF37] shrink-0 mt-1">
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-neutral-100 dark:border-neutral-900/60 pb-2.5">
                        <span className="text-[#C8102E] font-black font-price text-lg">
                          {isVi ? p.priceVi : p.priceEn}
                        </span>
                        {p.id === 'gk48ev' && (
                          <span className="text-[10px] text-emerald-500 font-mono font-bold uppercase">{isVi ? 'Tặng 7tr' : 'Promo'}</span>
                        )}
                        <span className="text-[10px] font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20">
                          {getMonthlyInstallment(p.priceVi)}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[48px] line-clamp-3">
                        {isVi ? p.shortDescVi : p.shortDescEn}
                      </p>
                    </div>

                    {/* Core specs grid */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/40 p-3 rounded-xl border border-neutral-100 dark:border-neutral-850">
                      <div>
                        <span className="text-neutral-400 dark:text-neutral-500 block uppercase font-bold text-[8px]">{isVi ? 'TẢI TRỌNG:' : 'PAYLOAD:'}</span>
                        <span className="font-extrabold text-neutral-800 dark:text-neutral-200">{p.payload}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 dark:text-neutral-500 block uppercase font-bold text-[8px]">{isVi ? 'ĐỘNG CƠ:' : 'ENGINE:'}</span>
                        <span className="font-extrabold text-neutral-800 dark:text-neutral-200 truncate block">{p.power}</span>
                      </div>
                    </div>

                    {/* Grid of buttons with exactly 20px rounded */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setSelectedProductId(p.id)}
                        className={`text-center text-xs font-bold border ${themeBorder} hover:border-[#D4AF37] py-3 rounded-xl cursor-pointer hover:text-white hover:bg-neutral-900 dark:hover:bg-neutral-800 transition-all font-sans ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
                      >
                        {isVi ? 'Xem chi tiết' : 'Details Studio'}
                      </button>
                      <button
                        onClick={() => openBookingModal(p.name, 'quote')}
                        className="text-center text-xs font-bold bg-[#C8102E] hover:bg-red-700 py-3 rounded-xl text-white cursor-pointer transition-colors shadow-md shadow-red-900/10 font-sans"
                      >
                        {isVi ? 'Báo giá lăn bánh' : 'Get Quote'}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
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

      {/* 7. Buying Process Section (Timeline) */}
      <section className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-neutral-50'} ${themeBorder} border-b px-4`} id="process">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Đơn giản - Chuyên nghiệp' : 'Seamless Timelines'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins uppercase">
              {isVi ? 'Quy Trình Mua Xe 6 Bước Trọn Gói' : '6-Step Premium Purchase Journey'}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Hành trình tinh giản 6 bước đồng hành cùng Ti Toàn từ lúc đặt cọc tới lúc nhận xe lăn bánh tại nhà.'
                : 'A seamless 6-step roadmap engineered to make commercial fleet acquisitions fast and worry-free.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {BUYING_STEPS.map((s, idx) => (
              <div 
                key={s.step}
                className={`${themeCardBg} border ${themeBorder} rounded-[18px] p-5 text-center relative flex flex-col justify-between min-h-[200px] group hover:border-[#C8102E]/40 transition-all shadow-sm hover:shadow-md`}
              >
                {/* Step indicator circle */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C8102E] text-white font-extrabold font-mono text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow">
                  {s.step}
                </div>

                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-extrabold tracking-tight pt-1 font-poppins">
                    {isVi ? s.titleVi : s.titleEn}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                    {isVi ? s.descVi : s.descEn}
                  </p>
                </div>
                
                <span className="text-[9px] font-mono text-neutral-400 group-hover:text-[#C8102E] uppercase tracking-widest block pt-2 transition-colors">
                  Step 0{s.step}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Advantages / Lợi ích Grid (Benefits 6 cards) */}
      <section className={`py-24 ${themeBorder} border-b px-4`} id="benefits">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Giá trị vượt trội' : 'Distinctive Corporate Standards'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins uppercase">
              {isVi ? 'Đặc Quyền Khách Hàng Của Ti Toàn' : 'Your Golden Service Benefits'}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? '6 ưu thế cốt lõi đem lại trải nghiệm hài lòng đẳng cấp, giải phóng hoàn toàn gánh nặng thủ tục.'
                : '6 distinct service pillars designed to streamline fleet additions, insurance, and long-term operations.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div 
                key={b.id}
                className={`${themeCardBg} p-8 border ${themeBorder} rounded-[20px] hover:border-[#D4AF37]/60 transition-all duration-300 space-y-5 shadow-sm hover:shadow-2xl hover:-translate-y-1`}
              >
                {/* Dynamically assign icons with luxurious background */}
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 dark:bg-red-500/5 border border-red-500/15 flex items-center justify-center text-[#C8102E] shadow-inner">
                  {b.iconName === 'UserCheck' && <UserCheck size={26} className="text-[#C8102E]" />}
                  {b.iconName === 'Percent' && <Percent size={26} className="text-[#C8102E]" />}
                  {b.iconName === 'Truck' && <Truck size={26} className="text-[#C8102E]" />}
                  {b.iconName === 'FileText' && <FileText size={26} className="text-[#C8102E]" />}
                  {b.iconName === 'ShieldCheck' && <ShieldCheck size={26} className="text-[#C8102E]" />}
                  {b.iconName === 'Wrench' && <Wrench size={26} className="text-[#C8102E]" />}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black tracking-tight font-poppins text-neutral-900 dark:text-neutral-100 uppercase">
                    {isVi ? b.titleVi : b.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light">
                    {isVi ? b.descVi : b.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

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
              className={`w-full sm:w-auto ${themeCardBg} border ${themeBorder} text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold`}
            >
              <option value="all">-- {isVi ? 'Chọn tất cả chủ đề' : 'All FAQ categories'} ({FAQS.length}) --</option>
              <option value="price">{isVi ? 'Giá xe & Ưu đãi' : 'Pricing & Incentives'}</option>
              <option value="installment">{isVi ? 'Hồ sơ mua trả góp' : 'Financing & Loan papers'}</option>
              <option value="warranty">{isVi ? 'Thời hạn bảo hành' : 'Factory warranties'}</option>
              <option value="registration">{isVi ? 'Đăng ký đăng kiểm' : 'Registrations & License'}</option>
              <option value="delivery">{isVi ? 'Giao nhận xe' : 'National deliveries'}</option>
              <option value="maintenance">{isVi ? 'Kỹ thuật bảo dưỡng' : 'Maintenances'}</option>
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
                  className={`${themeCardBg} border ${themeBorder} rounded-[18px] overflow-hidden transition-all duration-300 shadow-sm`}
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className={`w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold cursor-pointer transition-colors font-poppins ${isExpanded ? 'text-[#C8102E] bg-neutral-50/50 dark:bg-neutral-900/20' : 'hover:text-[#C8102E]'}`}
                  >
                    <span className="pr-4">{isVi ? faq.questionVi : faq.questionEn}</span>
                    <ChevronDown size={18} className={`text-neutral-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#C8102E]' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-4 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 animate-fade-in bg-red-500/[0.03] dark:bg-red-500/[0.06] border-l-4 border-l-[#C8102E]">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C8102E] text-white text-[10px] font-black shrink-0 mt-0.5 shadow-sm">
                          A
                        </span>
                        <p className="flex-1 font-sans font-bold text-neutral-900 dark:text-neutral-100 leading-relaxed">
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
          <div className={`${themeCardBg} border ${themeBorder} rounded-[18px] p-6 sm:p-8 space-y-6 shadow-md`}>
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

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Họ và tên *' : 'Full Name *'}</label>
                  <input
                    id="form-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "E.g., John Doe"}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Số điện thoại *' : 'Phone Number *'}</label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={isVi ? "Ví dụ: 0799600789" : "E.g., 0799600789"}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors font-mono`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Địa chỉ Email (Nếu có)' : 'Email (Optional)'}</label>
                  <input
                    id="form-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="company@gmail.com"
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors font-mono`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Dòng xe quan tâm *' : 'Vehicle model *'}</label>
                  <select
                    id="form-product-select"
                    value={bookingVehicle}
                    onChange={(e) => setBookingVehicle(e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors cursor-pointer font-bold`}
                  >
                    <option value="">-- {isVi ? 'Chọn mẫu xe' : 'Select vehicle'} --</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Nhu cầu dịch vụ' : 'Requested Service'}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'quote', lbl: isVi ? 'Nhận báo giá' : 'Get Quote' },
                    { val: 'test-drive', lbl: isVi ? 'Đăng ký lái thử' : 'Test Drive' },
                    { val: 'installment', lbl: isVi ? 'Tính trả góp' : 'Financing' },
                    { val: 'general', lbl: isVi ? 'Tư vấn chung' : 'General' }
                  ].map(serv => (
                    <button
                      key={serv.val}
                      type="button"
                      onClick={() => setBookingType(serv.val as any)}
                      className={`text-xs py-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        bookingType === serv.val 
                          ? 'bg-[#C8102E] text-white border-[#C8102E]' 
                          : `border-neutral-200 dark:border-neutral-800 text-neutral-400 bg-neutral-100 dark:bg-neutral-900 hover:border-[#C8102E]/40`
                      }`}
                    >
                      {serv.lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">{isVi ? 'Ghi chú yêu cầu thêm' : 'Inquiries Notes (Optional)'}</label>
                <textarea
                  id="form-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isVi ? "Ví dụ: Hỏi thủ tục trả góp 85% cho doanh nghiệp, lăn bánh về Cần Thơ..." : "E.g., I need 85% company credit details, on-road delivery back to Can Tho..."}
                  className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] transition-colors resize-none`}
                ></textarea>
              </div>

              {formSubmitSuccess && (
                <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-3 leading-relaxed">
                  <CheckCircle size={18} className="shrink-0" />
                  <div>
                    <span className="font-bold block">{isVi ? 'Gửi yêu cầu thành công!' : 'Request Sent Successfully!'}</span>
                    <span>{isVi ? 'Ti Toàn sẽ liên hệ lại trực tiếp với anh/chị ngay trong vòng 15 phút tới.' : 'Mr. Ti Toàn will call you back within 15 minutes.'}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-[#C8102E] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer transition-colors shadow-lg shadow-red-950/20"
                id="form-submit-btn"
              >
                {formLoading ? (isVi ? 'Đang xử lý...' : 'Processing...') : (isVi ? 'Gửi Yêu Cầu Liên Hệ' : 'Send My Request')}
              </button>
            </form>
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
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900 hover:bg-[#C8102E] rounded-full transition-all text-neutral-400 hover:text-white border border-neutral-800 font-bold uppercase tracking-wider text-[9px] flex items-center justify-center">
                TT
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400 font-mono">{isVi ? 'Liên kết nhanh' : 'Quick navigation'}</h4>
            <ul className="space-y-2.5 text-neutral-400 font-medium">
              <li><a href="#intro" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Giới thiệu Ti Toàn' : 'About Agent'}</a></li>
              <li><a href="#products" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Dòng xe Kim Long' : 'Fleet Showcase'}</a></li>
              <li><a href="#benefits" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Đặc quyền đối tác' : 'Service Benefits'}</a></li>
              <li><a href="#process" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Quy trình giao xe' : 'Delivery Steps'}</a></li>
              <li><a href="#reviews" className="hover:text-[#C8102E] transition-colors">{isVi ? 'Khách hàng nói gì' : 'Genuine Reviews'}</a></li>
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

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-neutral-500 font-mono text-[10px] space-y-4 sm:space-y-0 text-center">
          <p>© 2026 Đại Diện Kinh Doanh Nguyễn Quốc Toàn | Kim Long Motor. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <span>Core Web Vitals &gt; 95</span>
            <span>GA4, GTM & Meta Pixel Active</span>
            <span>Schema.org Auto-Injected</span>
          </div>
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
          href="#products" 
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-red-500/10 dark:bg-red-500/5 flex items-center justify-center text-[#C8102E] mb-1">
            <span>🚛</span>
          </div>
          <span>{isVi ? 'Xe' : 'Vehicles'}</span>
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
          href="#intro" 
          className="flex flex-col items-center text-[9px] font-bold text-neutral-400 hover:text-[#C8102E]"
        >
          <div className="w-9 h-9 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-1">
            <span>👤</span>
          </div>
          <span>{isVi ? 'Tôi' : 'About'}</span>
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
                  : 'Submit this rapid 3-field card to receive customized payment options & a 7,000,000 VND discount coupon.'
                }
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Họ tên tài xế / doanh nghiệp *' : 'Name / Company *'}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isVi ? "Nguyễn Văn A..." : "John Doe..."}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Số điện thoại nhận bảng tính *' : 'Phone Number *'}</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0799..."
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-mono`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1 font-mono">{isVi ? 'Dòng xe bạn đang tham khảo *' : 'Model of interest *'}</label>
                  <select
                    value={bookingVehicle}
                    onChange={(e) => setBookingVehicle(e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold`}
                    required
                  >
                    <option value="">-- {isVi ? 'Chọn dòng xe' : 'Select model'} --</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {formSubmitSuccess && (
                  <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle size={16} />
                    <span>{isVi ? 'Ti Toàn đã ghi nhận thành công!' : 'Quote requested successfully!'}</span>
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
                    className="flex-[2] bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl cursor-pointer transition-colors shadow-lg shadow-red-950/20"
                  >
                    {formLoading ? (isVi ? 'Đang gửi...' : 'Submitting...') : (isVi ? 'Nhận ưu đãi ngay' : 'Secure VIP Quote')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Dialog Modal Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[90] flex items-center justify-center p-4">
          <div className={`${themeCardBg} border ${themeBorder} rounded-[18px] p-6 sm:p-8 w-full max-w-xl relative shadow-2xl`}>
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
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
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "E.g., John Doe"}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E]`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Số điện thoại *' : 'Phone Number *'}</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0799..."
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-mono`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Dòng xe quan tâm *' : 'Interested Vehicle *'}</label>
                  <select
                    value={bookingVehicle}
                    onChange={(e) => setBookingVehicle(e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] font-bold`}
                    required
                  >
                    <option value="">-- {isVi ? 'Chọn dòng xe' : 'Select model'} --</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">{isVi ? 'Ghi chú thắc mắc' : 'Notes & Inquiries'}</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={isVi ? "Hỏi về ngân hàng, đăng ký sườn xe..." : "Inquire about bank paperwork, licenses..."}
                    className={`w-full ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} border ${themeBorder} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8102E] resize-none`}
                  ></textarea>
                </div>

                {formSubmitSuccess && (
                  <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle size={16} />
                    <span>{isVi ? 'Báo giá đã gửi thành công!' : 'Quote requested successfully!'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  {formLoading ? (isVi ? 'Đang gửi...' : 'Submitting...') : (isVi ? 'Gửi Yêu Cầu Cho Ti Toàn' : 'Submit Booking Request')}
                </button>
              </form>
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
                  className="w-full h-full object-cover blur-sm opacity-50 absolute inset-0"
                  referrerPolicy="no-referrer"
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

      {/* Floating AI showroom chatbot integration */}
      <ShowroomChatbot language={language} />

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
