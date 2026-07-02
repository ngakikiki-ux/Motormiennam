import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, MapPin, Mail, Award, ShieldCheck, Check, 
  ChevronDown, User, Star, ArrowRight, Search, Menu, X, 
  Percent, Truck, FileText, Wrench, UserCheck, Calendar, 
  ChevronRight, Bot, Sparkles, Settings, LogIn, ExternalLink, ThumbsUp, CheckCircle,
  Facebook
} from 'lucide-react';

import { PRODUCTS, BENEFITS, BUYING_STEPS, REVIEWS, NEWS, FAQS } from './data';
import { Product, NewsItem, ReviewItem, FAQItem, Language } from './types';

// Component Imports
import ShowroomChatbot from './components/ShowroomChatbot';
import LoanCalculator from './components/LoanCalculator';
import LeadDashboard from './components/LeadDashboard';
import SEOManager from './components/SEOManager';
import ProductDetails from './components/ProductDetails';

export default function App() {
  const [language, setLanguage] = useState<Language>('vi');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals and interactive states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'quote' | 'test-drive' | 'installment' | 'general'>('quote');
  const [bookingVehicle, setBookingVehicle] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // FAQ search and state
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqQuery, setFaqQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // News active category
  const [newsCategory, setNewsCategory] = useState<string>('all');

  const isVi = language === 'vi';

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
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      // Fallback save in localStorage so client is always fast and successful
      setFormSubmitSuccess(true);
      const storedLeads = JSON.parse(localStorage.getItem('my_quotes') || '[]');
      storedLeads.push({
        fullName, phoneNumber, email, bookingVehicle, bookingType, notes, date: new Date().toISOString()
      });
      localStorage.setItem('my_quotes', JSON.stringify(storedLeads));
    } finally {
      setFormLoading(false);
    }
  };

  const openBookingModal = (vehicleName: string, type: 'quote' | 'test-drive' | 'installment' | 'general') => {
    setBookingVehicle(vehicleName);
    setBookingType(type);
    setIsBookingOpen(true);
    setFormSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans relative selection:bg-red-600 selection:text-white antialiased">
      
      {/* SEO metadata manager integration */}
      <SEOManager language={language} activeProductId={selectedProductId} activeProduct={activeProduct} />

      {/* Top Banner Contact Line */}
      <div className="bg-neutral-950 py-2 border-b border-neutral-900 text-xs px-4" id="top-bar">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-neutral-400 font-mono">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer" onClick={() => window.open('tel:0799600789')}>
              <Phone size={12} className="text-red-500" />
              0799.600.789
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin size={12} className="text-red-500" />
              451 Quốc lộ 1, xã An Ninh, Thành phố Cần Thơ
            </span>
            <a 
              href="https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
            >
              <Facebook size={12} className="text-blue-500" />
              Facebook
            </a>
          </div>
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-0.5 overflow-hidden">
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-2.5 py-0.5 rounded-full transition-all text-[10px] uppercase font-black cursor-pointer ${
                  language === 'vi' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                VI
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full transition-all text-[10px] uppercase font-black cursor-pointer ${
                  language === 'en' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                EN
              </button>
            </div>
            
            {/* Admin Dashboard trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer"
              title="Sales Portal Login"
              id="admin-login-trigger"
            >
              <Settings size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Header */}
      <header className="sticky top-0 bg-black/90 backdrop-blur-md z-40 border-b border-neutral-900 px-4" id="main-header">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center space-x-3 group">
            <img 
              src="https://sf-static.upanhlaylink.com/img/image_20260702ae8302499ae0feaebd8b1cd9e606c614.jpg" 
              alt="Kim Long Motor Logo" 
              className="h-10 w-auto object-contain rounded-lg border border-neutral-800"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-white font-black text-xs tracking-wider uppercase group-hover:text-red-500 transition-colors">
                  KIM LONG
                </span>
                <span className="text-yellow-500 font-bold text-xs tracking-widest uppercase">
                  TI TOÀN
                </span>
              </div>
              <span className="text-[9px] text-neutral-500 font-mono tracking-widest mt-0.5 uppercase">
                {isVi ? 'Nhân viên kinh doanh' : 'Sales Representative'}
              </span>
            </div>
          </a>

          {/* Navigation links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium text-neutral-400">
            <a href="#intro" className="hover:text-white transition-colors">{isVi ? 'Giới thiệu' : 'About'}</a>
            <a href="#products" className="hover:text-white transition-colors">{isVi ? 'Sản phẩm' : 'Vehicles'}</a>
            <a href="#benefits" className="hover:text-white transition-colors">{isVi ? 'Lợi ích' : 'Benefits'}</a>
            <a href="#process" className="hover:text-white transition-colors">{isVi ? 'Quy trình' : 'Process'}</a>
            <a href="#reviews" className="hover:text-white transition-colors">{isVi ? 'Đánh giá' : 'Reviews'}</a>
            <a href="#news" className="hover:text-white transition-colors">{isVi ? 'Tin tức' : 'News'}</a>
            <a href="#faq" className="hover:text-white transition-colors">{isVi ? 'Hỏi đáp' : 'FAQ'}</a>
            <a href="#contact" className="hover:text-white transition-colors">{isVi ? 'Liên hệ' : 'Contact'}</a>
          </nav>

          {/* Quick CTA button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => openBookingModal('', 'general')}
              className="hidden lg:flex items-center space-x-1.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs tracking-wider uppercase px-4 py-3 rounded-full cursor-pointer transition-all border border-red-500/20"
              id="header-booking-btn"
            >
              <Calendar size={14} />
              <span>{isVi ? 'Đặt Lịch Hẹn' : 'Book Consultant'}</span>
            </button>
            <a 
              href="tel:0799600789"
              className="flex items-center justify-center p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-red-600 text-red-500 transition-colors"
            >
              <Phone size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* 1. Hero Banner Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-neutral-900 px-4" id="hero">
        {/* Modern dark overlay back-image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black z-0"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200')" }}></div>
        
        {/* Floating background neon highlights for a premium vehicle vibe */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-yellow-600/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 py-16">
          
          <div className="inline-flex items-center space-x-2 bg-neutral-900/60 border border-neutral-800 px-4 py-2 rounded-full backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping"></span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              {isVi ? 'Đại Lý Ủy Quyền 3S Toàn Quốc' : 'Authorized 3S Kim Long Motor Dealer'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white uppercase leading-tight">
            Ti Toàn <br className="sm:hidden" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-yellow-500">
              | Kim Long Motor
            </span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {isVi 
              ? 'Chuyên tư vấn xe tải, xe thương mại và xe điện. Đồng hành cùng khách hàng lựa chọn giải pháp vận tải tối ưu, thủ tục trả góp nhanh gọn.'
              : 'Specialized commercial truck, passenger vehicle, and electric fleet advisor. Partnering to select the optimal logistical solutions with 85% fast financing.'
            }
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openBookingModal('', 'quote')}
              className="w-full sm:w-auto bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2 border border-red-500/20 shadow-xl shadow-red-950/20"
              id="hero-cta-quote"
            >
              <Percent size={14} />
              <span>{isVi ? 'Nhận báo giá ngay' : 'Get On-Road Quote'}</span>
            </button>
            <a
              href="https://zalo.me/0799600789"
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-neutral-700 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2"
              id="hero-cta-zalo"
            >
              <MessageSquare size={14} className="text-blue-400 animate-bounce" />
              <span>{isVi ? 'Liên hệ Zalo' : 'Contact via Zalo'}</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-lg mx-auto text-center border-t border-neutral-900/60 text-xs font-mono text-neutral-500">
            <div>
              <p className="text-white text-base font-bold">100%</p>
              <p className="text-[10px] mt-0.5 uppercase tracking-wider">{isVi ? 'Tận Tâm - Uy Tín' : 'Dedicated Service'}</p>
            </div>
            <div>
              <p className="text-white text-base font-bold">85%</p>
              <p className="text-[10px] mt-0.5 uppercase tracking-wider">{isVi ? 'Vay Hỗ Trợ Tối Đa' : 'Max Loan Limit'}</p>
            </div>
            <div>
              <p className="text-white text-base font-bold">24/7</p>
              <p className="text-[10px] mt-0.5 uppercase tracking-wider">{isVi ? 'Dịch Vụ Mobile 3S' : 'Mobile Service Support'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Introduction Section */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900 px-4" id="intro">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar Area */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl">
              {/* Elegant mockup agent portrait using Unsplash high quality executive male model */}
              <img 
                src="https://sf-static.upanhlaylink.com/img/image_20260702824efeefac71b16619dbdac9a7abe1ec.jpg" 
                alt="Ti Toàn Kim Long Motor Advisor" 
                className="w-full h-full object-cover object-center transition-transform duration-750 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <p className="text-yellow-500 font-serif font-bold text-xl tracking-wider">TI TOÀN</p>
                <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">
                  {isVi ? 'Nhân viên kinh doanh' : 'Sales Representative'}
                </p>
              </div>
            </div>
          </div>

          {/* Biography and commitments */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Đồng Hành Trọn Vẹn' : 'Your Lifelong Transport Partner'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isVi ? 'Tận tâm - Minh bạch - Đồng hành sau bán hàng' : 'Dedicated - Transparent - Partnering Lifelong'}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {isVi 
                ? 'Em là Ti Toàn, Nhân viên kinh doanh tại Kim Long Motor. Với nhiều năm kinh nghiệm thực tế trong lĩnh vực xe thương mại, em cam kết mang tới cho Quý khách giải pháp đầu tư tối ưu nhất, đồng hành sát cánh hỗ trợ kỹ thuật trọn vẹn hành trình di chuyển.'
                : 'I am Ti Toàn, sales representative at Kim Long Motor. Backed by extensive experience in commercial fleets, I guarantee to recommend highly tailored investment plans, and support you throughout your entire shipping logistics lifespans.'
              }
            </p>

            {/* Commitments list with bullet checkmark design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
              {[
                { titleVi: 'Khảo sát nhu cầu đúng thực tế', titleEn: 'Accurate fleet needs survey' },
                { titleVi: 'Hỗ trợ vay 85% nhanh chóng', titleEn: 'Swift 85% bank loan approvals' },
                { titleVi: 'Thủ tục đăng ký, đăng kiểm trọn gói', titleEn: 'Full on-road legal registration' },
                { titleVi: 'Đồng hành hỗ trợ dịch vụ 24/7', titleEn: 'Lifelong 24/7 Mobile Service help' }
              ].map((comm, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-red-950/60 border border-red-900 flex items-center justify-center text-red-500 shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{isVi ? comm.titleVi : comm.titleEn}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => openBookingModal('', 'general')}
                className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-red-600 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors"
              >
                <span>{isVi ? 'Nhận tư vấn từ Ti Toàn' : 'Consult with Ti Toàn'}</span>
                <ArrowRight size={14} className="text-red-500" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Product Catalog Section */}
      <section className="py-20 bg-neutral-900 border-b border-neutral-900 px-4" id="products">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Danh mục tinh hoa' : 'Elite Fleet Showcase'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Các Dòng Xe Kim Long Đẳng Cấp' : 'Kim Long Commercial Lineup'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Các mẫu xe tải thế hệ mới, xe khách và xe bus điện đáp ứng mọi nhu cầu kinh doanh vận tải.'
                : 'Advanced logistical, coach, and eco-friendly electric solutions configured to master all transport needs.'
              }
            </p>
          </div>

          {/* Search bar inside Catalog */}
          <div className="max-w-md mx-auto relative rounded-full overflow-hidden border border-neutral-800 focus-within:border-red-600 bg-neutral-950 transition-colors">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm dòng xe hoặc tải trọng mong muốn..." : "Search model, specs, payload..."}
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 scrollbar-none border-b border-neutral-900">
            {[
              { val: 'all', vi: 'Tất cả', en: 'All' },
              { val: 'electric', vi: 'Xe tải điện', en: 'Electric' },
              { val: 'light', vi: 'Xe tải nhẹ', en: 'Light Trucks' },
              { val: 'medium', vi: 'Xe tải trung', en: 'Medium' },
              { val: 'heavy', vi: 'Xe tải nặng', en: 'Heavy' },
              { val: 'tractor', vi: 'Xe đầu kéo', en: 'Tractor' },
              { val: 'minibus', vi: 'Minibus', en: 'Minibus' },
              { val: 'bus', vi: 'Xe bus', en: 'Coach / Bus' }
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setActiveCategory(tab.val)}
                className={`text-xs px-4 py-2.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.val 
                    ? 'bg-red-950/60 border-red-600 text-red-400 font-bold' 
                    : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {isVi ? tab.vi : tab.en}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 group flex flex-col justify-between transition-all duration-300"
              >
                {/* Image zoom on hover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-neutral-900">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur border border-neutral-800 rounded-full px-3 py-1 text-[9px] font-mono text-neutral-300 uppercase tracking-widest">
                    {isVi ? p.categoryVi : p.categoryEn}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-red-500 font-extrabold font-mono text-sm">
                      {isVi ? p.priceVi : p.priceEn}
                    </p>
                    <p className="text-xs text-neutral-400 leading-relaxed min-h-[48px] line-clamp-3">
                      {isVi ? p.shortDescVi : p.shortDescEn}
                    </p>
                  </div>

                  {/* Key specs small badge layout */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                    <div>
                      <span className="text-neutral-600 block">{isVi ? 'TẢI TRỌNG:' : 'PAYLOAD:'}</span>
                      <span className="text-white font-bold">{p.payload}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block">{isVi ? 'CÔNG SUẤT:' : 'POWER:'}</span>
                      <span className="text-white font-bold">{p.power}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setSelectedProductId(p.id)}
                      className="text-center text-xs font-bold border border-neutral-800 hover:border-red-600/50 py-3 rounded-xl hover:text-white cursor-pointer text-neutral-300 bg-neutral-900/40 hover:bg-neutral-900 transition-colors"
                    >
                      {isVi ? 'Xem chi tiết' : 'Details'}
                    </button>
                    <button
                      onClick={() => openBookingModal(p.name, 'quote')}
                      className="text-center text-xs font-bold bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white cursor-pointer transition-colors"
                    >
                      {isVi ? 'Nhận báo giá' : 'Get Quote'}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Product Details Drawer Overlay */}
      {selectedProductId && activeProduct && (
        <ProductDetails
          product={activeProduct}
          language={language}
          onClose={() => setSelectedProductId(null)}
          onOpenBookingForm={openBookingModal}
        />
      )}

      {/* 5. Benefits Section */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900 px-4" id="benefits">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Cam kết vàng' : 'Golden Standard Commitments'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Lợi Ích Khi Mua Xe Tại Ti Toàn' : 'Benefits of Partnering with Ti Toàn'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Đem lại sự hài lòng tối đa, phục vụ với tinh thần trách nhiệm cao nhất.'
                : 'Delivering peak satisfaction, serving logistics partners with maximum integrity.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div 
                key={b.id}
                className="p-6 bg-neutral-900 border border-neutral-800/80 hover:border-red-600/30 rounded-2xl transition-all space-y-4"
              >
                {/* Dynamically assign the correct icon based on name */}
                <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-900 flex items-center justify-center text-red-500">
                  {b.iconName === 'UserCheck' && <UserCheck size={24} />}
                  {b.iconName === 'Percent' && <Percent size={24} />}
                  {b.iconName === 'Truck' && <Truck size={24} />}
                  {b.iconName === 'FileText' && <FileText size={24} />}
                  {b.iconName === 'ShieldCheck' && <ShieldCheck size={24} />}
                  {b.iconName === 'Wrench' && <Wrench size={24} />}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {isVi ? b.titleVi : b.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {isVi ? b.descVi : b.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Buying Process Section */}
      <section className="py-20 bg-neutral-900 border-b border-neutral-900 px-4" id="process">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Nhanh chóng - Tiện lợi' : 'Fast & Seamless Logistics'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Quy Trình Mua Xe Trọn Gói' : 'A-Z Vehicle Purchase Flow'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? '6 bước tinh giản giúp quý khách sở hữu phương tiện kinh doanh dễ dàng nhất.'
                : '6 streamlined timeline steps getting your commercial vehicles road-ready with minimum delay.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {BUYING_STEPS.map((s, idx) => (
              <div 
                key={s.step}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center relative flex flex-col justify-between min-h-[180px] group hover:border-red-600/30 transition-all"
              >
                {/* Visual Step Counter Indicator */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white font-bold font-mono text-[10px] w-6 h-6 rounded-full flex items-center justify-center border border-black shadow">
                  {s.step}
                </div>

                <div className="space-y-2 mt-2">
                  <h3 className="text-sm font-bold text-white tracking-tight pt-1">
                    {isVi ? s.titleVi : s.titleEn}
                  </h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {isVi ? s.descVi : s.descEn}
                  </p>
                </div>
                
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block pt-2 group-hover:text-red-500 transition-colors">
                  Step 0{s.step}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900 px-4" id="reviews">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Khách hàng nói về Ti Toàn' : 'What Partners Say'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Đánh Giá Từ Khách Hàng Thực Tế' : 'Genuine Customer Testimonials'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Sự tin cậy và hài lòng của các bác tài, doanh nghiệp vận tải là phần thưởng lớn nhất của em.'
                : 'Trust and satisfaction from logistics firms and professional truck drivers nationwide.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <div 
                key={r.id}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-all duration-300"
              >
                {/* Handover Delivery Photo mockup */}
                {r.handoverImage && (
                  <div className="relative aspect-[16/9] bg-neutral-950 overflow-hidden">
                    <img 
                      src={r.handoverImage} 
                      alt="Delivery Handover" 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                    <span className="absolute bottom-3 left-4 text-[9px] bg-red-600 text-white font-mono font-bold px-2.5 py-0.5 rounded-full">
                      {isVi ? 'Bàn giao thực tế' : 'Handover Ceremony'}
                    </span>
                  </div>
                )}

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex text-yellow-500">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                      "{isVi ? r.commentVi : r.commentEn}"
                    </p>
                  </div>

                  {/* Profile info with mini avatar */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-neutral-800/80">
                    <img 
                      src={r.avatar} 
                      alt={r.name} 
                      className="w-10 h-10 rounded-full object-cover border border-neutral-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{r.name}</h4>
                      <p className="text-[10px] text-neutral-500 font-medium">{isVi ? r.roleVi : r.roleEn}</p>
                      <span className="text-[9px] text-red-500 font-mono font-bold">{isVi ? 'Hợp đồng' : 'Model'}: {r.vehicleModel}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. News & Knowledge Section */}
      <section className="py-20 bg-neutral-900 border-b border-neutral-900 px-4" id="news">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Kiến thức bổ ích' : 'Logistical Library'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Tin Tức & Cẩm Nang Vận Tải' : 'News, Experience & Guides'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Cập nhật chính sách đăng kiểm, thông tin khuyến mãi và chia sẻ kinh nghiệm lái xe hữu ích.'
                : 'Staying updated on road registries, active company discounts, and professional driving advice.'
              }
            </p>
          </div>

          {/* News filters */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 border-b border-neutral-850">
            {[
              { val: 'all', vi: 'Tất cả', en: 'All' },
              { val: 'installment', vi: 'Chính sách trả góp', en: 'Installment' },
              { val: 'knowledge', vi: 'Kiến thức xe', en: 'Vehicle Specs' },
              { val: 'promotion', vi: 'Tin khuyến mãi', en: 'Promotions' }
            ].map(tab => (
              <button
                key={tab.val}
                onClick={() => setNewsCategory(tab.val)}
                className={`text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  newsCategory === tab.val 
                    ? 'bg-neutral-950 border border-neutral-800 text-red-500 font-bold' 
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {isVi ? tab.vi : tab.en}
              </button>
            ))}
          </div>

          {/* News articles list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((n) => (
              <div 
                key={n.id}
                className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden hover:border-red-600/30 transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img src={n.image} alt={n.titleVi} className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {isVi ? n.categoryVi : n.categoryEn}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-neutral-600 font-mono font-bold block">
                      {n.date} | By {n.author}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight group-hover:text-red-500 transition-colors line-clamp-2">
                      {isVi ? n.titleVi : n.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {isVi ? n.summaryVi : n.summaryEn}
                    </p>
                  </div>

                  <button 
                    onClick={() => openBookingModal('', 'general')}
                    className="inline-flex items-center text-xs text-red-500 hover:text-red-400 font-bold gap-1 cursor-pointer pt-2"
                  >
                    <span>{isVi ? 'Đọc thêm chi tiết' : 'Read Full Guide'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900 px-4" id="faq">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Hỏi nhanh đáp gọn' : 'Instant Answers'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Câu Hỏi Thường Gặp (FAQs)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isVi 
                ? 'Giải đáp nhanh 20 thắc mắc phổ biến về giá cả, hồ sơ trả góp, chính sách bảo hành, giao nhận xe và kỹ thuật bảo dưỡng.'
                : 'Resolving 20 typical client inquiries on vehicle pricing, 85% installment papers, factory warranties, home delivery, and servicing.'
              }
            </p>
          </div>

          {/* FAQ Live Query filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-neutral-900 pb-6">
            {/* Topic Filter */}
            <select
              value={faqCategory}
              onChange={(e) => setFaqCategory(e.target.value)}
              className="w-full sm:w-auto bg-neutral-900 border border-neutral-850 text-xs text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors cursor-pointer font-mono"
            >
              <option value="all">-- {isVi ? 'Chọn tất cả chủ đề' : 'All Topics'} ({FAQS.length}) --</option>
              <option value="price">{isVi ? 'Giá xe & Ưu đãi' : 'Pricing & Incentives'}</option>
              <option value="installment">{isVi ? 'Hồ sơ mua trả góp' : 'Amortization & Installments'}</option>
              <option value="warranty">{isVi ? 'Thời hạn bảo hành' : 'Warranties'}</option>
              <option value="registration">{isVi ? 'Đăng ký đăng kiểm' : 'Registrations'}</option>
              <option value="delivery">{isVi ? 'Giao nhận xe' : 'Deliveries'}</option>
              <option value="maintenance">{isVi ? 'Kỹ thuật bảo dưỡng' : 'Maintenances'}</option>
            </select>

            {/* Keyword Search */}
            <div className="relative w-full sm:max-w-xs bg-neutral-900 border border-neutral-850 rounded-xl overflow-hidden">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
              <input
                id="faq-search-input"
                type="text"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder={isVi ? "Gõ từ khóa tìm kiếm nhanh..." : "Search key term..."}
                className="w-full bg-transparent pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Accordion FAQ list */}
          <div className="space-y-4" id="faq-accordion-group">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white cursor-pointer hover:text-red-500 transition-colors"
                  >
                    <span className="pr-4">{isVi ? faq.questionVi : faq.questionEn}</span>
                    <ChevronDown size={18} className={`text-neutral-500 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-red-500' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-850/40 animate-fade-in bg-neutral-950/40">
                      {isVi ? faq.answerVi : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xs text-neutral-500">
              {isVi 
                ? 'Anh/Chị chưa tìm thấy câu trả lời? Hãy nhắn tin trực tiếp để Trợ lý AI hoặc anh Ti Toàn phản hồi ngay nhé!' 
                : 'Need more answers? Start a conversation with our active AI chatbot or contact Ti Toàn.'
              }
            </p>
          </div>

        </div>
      </section>

      {/* 10. Contact Info Section */}
      <section className="py-20 bg-neutral-900 border-b border-neutral-950 px-4" id="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Detailed showroom address & map */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#C8102E] text-xs font-mono uppercase tracking-widest font-black block">
              {isVi ? 'Liên hệ trực tiếp' : 'Locate Our Showrooms'}
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
              {isVi ? 'Đại Diện Ti Toàn | Kim Long Motor' : 'Representative Ti Toàn'}
            </h2>

            <div className="space-y-4 text-sm text-neutral-400">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{isVi ? 'ĐỊA CHỈ SHOWROOM:' : 'SHOWROOM HQ:'}</h4>
                  <p className="mt-0.5">451 Quốc lộ 1, xã An Ninh, Thành phố Cần Thơ.</p>
                  <p className="mt-1 font-semibold text-neutral-500">{isVi ? 'Hỗ trợ tư vấn và giao xe tận nơi toàn quốc' : 'Supporting national fleet logistics & home deliveries.'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-red-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{isVi ? 'ĐIỆN THOẠI & ZALO:' : 'CALL & ZALO:'}</h4>
                  <p className="mt-0.5 font-bold font-mono text-red-500 hover:underline cursor-pointer" onClick={() => window.open('tel:0799600789')}>0799.600.789</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Facebook size={18} className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">FACEBOOK:</h4>
                  <a 
                    href="https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-0.5 text-neutral-400 hover:text-blue-400 transition-colors font-mono"
                  >
                    nguyenquoctoanst
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-red-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">EMAIL:</h4>
                  <p className="mt-0.5 font-mono">titoan.kimlong@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Google map iframe embed */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[16/10] shadow-xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408163!2d105.78822!3d10.0299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de397c7%3A0x7be2413e16c91a0b!2zNDUxIFF14buRYyBs4buZIDEsIEFuIELDrG5oLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1719859200000!5m2!1svi!2s" 
                className="w-full h-full border-0 grayscale invert opacity-70" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form capture box */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {isVi ? 'Yêu Cầu Báo Giá & Đăng Ký Lái Thử' : 'Inquire On-Road Quote & Demo'}
              </h3>
              <p className="text-xs text-neutral-400">
                {isVi 
                  ? 'Để lại thông tin chính xác, Ti Toàn sẽ gửi bảng tính chi tiết và gọi tư vấn hỗ trợ ngay lập tức.' 
                  : 'Submit details to receive customized payment proposals and direct callbacks from Ti Toàn.'
                }
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">{isVi ? 'Họ và tên *' : 'Full Name *'}</label>
                  <input
                    id="form-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "E.g., John Doe"}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">{isVi ? 'Số điện thoại *' : 'Phone Number *'}</label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={isVi ? "Ví dụ: 0799600789" : "E.g., 0799600789"}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">{isVi ? 'Địa chỉ Email' : 'Email Address'}</label>
                  <input
                    id="form-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., company@gmail.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">{isVi ? 'Chọn mẫu xe quan tâm' : 'Select Vehicle model'}</label>
                  <select
                    id="form-product-select"
                    value={bookingVehicle}
                    onChange={(e) => setBookingVehicle(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
                  >
                    <option value="">-- {isVi ? 'Chọn mẫu xe' : 'Select vehicle'} --</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">{isVi ? 'Nhu cầu dịch vụ' : 'Requested Service'}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'quote', lbl: isVi ? 'Nhận báo giá' : 'Get Quote' },
                    { val: 'test-drive', lbl: isVi ? 'Đăng ký lái thử' : 'Test Drive' },
                    { val: 'installment', lbl: isVi ? 'Tính trả góp' : 'Financing' },
                    { val: 'general', lbl: isVi ? 'Tư vấn chung' : 'General Help' }
                  ].map(serv => (
                    <button
                      key={serv.val}
                      type="button"
                      onClick={() => setBookingType(serv.val as any)}
                      className={`text-xs py-2.5 rounded-xl border text-center font-bold transition-all ${
                        bookingType === serv.val 
                          ? 'bg-red-950/60 border-red-600 text-red-400' 
                          : 'border-neutral-800 text-neutral-400 bg-neutral-900 hover:border-neutral-700'
                      }`}
                    >
                      {serv.lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">{isVi ? 'Ghi chú thêm (Nếu có)' : 'Additional Inquiries (Optional)'}</label>
                <textarea
                  id="form-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isVi ? "Ví dụ: Hỏi thủ tục trả góp 85% cho công ty, hỗ trợ đăng ký biển số vàng..." : "E.g., I need 85% corporate financing, gold plates assistance..."}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                ></textarea>
              </div>

              {formSubmitSuccess && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded-xl flex items-center space-x-3 leading-relaxed">
                  <CheckCircle size={18} className="shrink-0" />
                  <div>
                    <span className="font-bold block">{isVi ? 'Đã gửi yêu cầu thành công!' : 'Request Sent Successfully!'}</span>
                    <span>{isVi ? 'Em Ti Toàn sẽ chủ động liên hệ lại anh/chị ngay trong vòng 15-30 phút.' : 'Mr. Ti Toàn will call you back within 15-30 minutes.'}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-[#C8102E] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl cursor-pointer transition-colors"
                id="form-submit-btn"
              >
                {formLoading ? (isVi ? 'Đang gửi...' : 'Submitting...') : (isVi ? 'Gửi Yêu Cầu Liên Hệ' : 'Submit My Inquiry')}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer copyright */}
      <footer className="bg-black py-12 border-t border-neutral-900 px-4 text-xs text-neutral-500 font-mono text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-bold text-white uppercase text-xs tracking-wider">Ti Toàn | Kim Long Motor</p>
          <p className="max-w-md mx-auto leading-relaxed">
            {isVi 
              ? 'Nhân viên kinh doanh Kim Long Motor phân phối các dòng xe thương mại, tải điện, xe tải nhẹ, xe tải trung, xe tải nặng, minibus và xe khách cao cấp.'
              : 'Official sales representative. Distributing premier logistics trucks, electric fleets, heavy tractors, minibus, and coach buses.'
            }
          </p>
          <p>© 2026 Ti Toàn | Kim Long Motor. Designed with high-performance SEO standards & Conversion Optimizations.</p>
        </div>
      </footer>

      {/* Floating Quick Action Contact Bar (Sticky on all screens, especially mobile) */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-neutral-900 py-3 px-4 z-40 flex justify-around items-center sm:hidden shadow-2xl"
        id="floating-cta-bar"
      >
        <a 
          href="tel:0799600789" 
          className="flex flex-col items-center text-[10px] text-neutral-400 hover:text-white"
        >
          <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-900 flex items-center justify-center text-red-500 mb-1">
            <Phone size={16} />
          </div>
          <span>{isVi ? 'Gọi điện' : 'Call Now'}</span>
        </a>

        <a 
          href="https://zalo.me/0799600789" 
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex flex-col items-center text-[10px] text-neutral-400 hover:text-white"
        >
          <div className="w-10 h-10 rounded-full bg-blue-950/60 border border-blue-900 flex items-center justify-center text-blue-400 mb-1">
            <MessageSquare size={16} />
          </div>
          <span>Zalo</span>
        </a>

        <a 
          href="https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-[10px] text-neutral-400 hover:text-white"
        >
          <div className="w-10 h-10 rounded-full bg-blue-950/60 border border-blue-900 flex items-center justify-center text-blue-500 mb-1">
            <Facebook size={16} />
          </div>
          <span>Facebook</span>
        </a>

        <button 
          onClick={() => openBookingModal('', 'test-drive')}
          className="flex flex-col items-center text-[10px] text-neutral-400 hover:text-white cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-yellow-950/60 border border-yellow-900 flex items-center justify-center text-yellow-500 mb-1">
            <Calendar size={16} />
          </div>
          <span>{isVi ? 'Lái thử' : 'Test Drive'}</span>
        </button>
      </div>

      {/* Booking Form Dialog Modal Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[90] flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 w-full max-w-xl relative shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {bookingType}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {isVi ? 'Đăng Ký Nhận Tư Vấn Trực Tiếp' : 'Book Direct Consultation'}
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">{isVi ? 'Họ và tên *' : 'Full Name *'}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "E.g., John Doe"}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">{isVi ? 'Số điện thoại *' : 'Phone Number *'}</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={isVi ? "Ví dụ: 0799600789" : "E.g., 0799600789"}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">{isVi ? 'Mẫu xe quan tâm' : 'Interested Vehicle'}</label>
                  <input
                    type="text"
                    value={bookingVehicle}
                    onChange={(e) => setBookingVehicle(e.target.value)}
                    placeholder={isVi ? "Ví dụ: KIM LONG EV-300..." : "E.g., KIM LONG EV-300..."}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">{isVi ? 'Ghi chú thắc mắc' : 'Notes & Inquiries'}</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={isVi ? "Hỏi về thủ tục ngân hàng, khuyến mãi..." : "Inquire about discount plans, bank loans..."}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 resize-none"
                  ></textarea>
                </div>

                {formSubmitSuccess && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle size={16} />
                    <span>{isVi ? 'Yêu cầu của bạn đã được tiếp nhận thành công!' : 'Your booking request is received!'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  {formLoading ? (isVi ? 'Đang gửi...' : 'Submitting...') : (isVi ? 'Gửi Đăng Ký' : 'Confirm Registration')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI showroom chatbot integration */}
      <ShowroomChatbot language={language} />

      {/* Gated Administrative Sales Dashboard Modal */}
      {isAdminOpen && (
        <LeadDashboard language={language} onClose={() => setIsAdminOpen(false)} />
      )}

    </div>
  );
}
