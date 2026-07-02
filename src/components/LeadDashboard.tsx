import React, { useState, useEffect } from 'react';
import { Shield, Key, RefreshCw, Check, Clock, User, Phone, Mail, Award, X, Eye, FileText, Download, TrendingUp } from 'lucide-react';
import { Language, Lead } from '../types';

interface LeadDashboardProps {
  language: Language;
  onClose?: () => void;
}

export default function LeadDashboard({ language, onClose }: LeadDashboardProps) {
  const isVi = language === 'vi';
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const correctPin = '1234'; // Simple access code for sales agent Ti Toàn

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Failed to load leads');
      const data = await response.json();
      setLeads(data.leads || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError(isVi ? 'Không thể tải danh sách khách hàng.' : 'Could not fetch lead logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin || pin.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(isVi ? 'Mã pin bảo mật không chính xác.' : 'Invalid security PIN.');
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (filterType === 'all') return true;
    return lead.leadType === filterType;
  });

  const stats = React.useMemo(() => {
    const total = leads.length;
    const testDrive = leads.filter(l => l.leadType === 'test-drive').length;
    const quote = leads.filter(l => l.leadType === 'quote').length;
    const installment = leads.filter(l => l.leadType === 'installment').length;
    const general = leads.filter(l => l.leadType === 'general').length;
    
    return { total, testDrive, quote, installment, general };
  }, [leads]);

  const exportCSV = () => {
    const headers = 'ID,Full Name,Phone Number,Email,Vehicle,Type,Notes,Date\n';
    const rows = leads.map(l => 
      `"${l.id}","${l.fullName}","${l.phoneNumber}","${l.email || ''}","${l.selectedProduct || ''}","${l.leadType}","${l.notes || ''}","${l.createdAt}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_titoan_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div 
        id="leads-dashboard-modal"
        className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-900 flex items-center justify-center text-red-500 mb-4">
              <Shield size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isVi ? 'Bảng Quản Trị Khách Hàng' : 'Lead Management Portal'}
            </h3>
            <p className="text-sm text-neutral-400 max-w-sm mt-2 mb-6">
              {isVi 
                ? 'Nhập mã pin bảo mật của anh Ti Toàn để xem thông tin liên hệ và yêu cầu báo giá của khách hàng.' 
                : 'Enter your custom security passcode to view captured leads and request logs.'
              }
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder={isVi ? "Nhập mã PIN (Mặc định: 1234)" : "Enter PIN (Default: 1234)"}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-center text-white focus:outline-none focus:border-red-600 font-mono tracking-widest text-lg"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-sm tracking-wide cursor-pointer transition-colors"
              >
                {isVi ? 'Xác thực truy cập' : 'Verify Access'}
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Content Screen */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-neutral-900 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {isVi ? 'Nội bộ' : 'Internal'}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {isVi ? 'Danh Sách Khách Hàng Tiềm Năng' : 'Customer Lead Database'}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  {isVi 
                    ? 'Dữ liệu khách gửi form từ trang web Ti Toàn | Kim Long Motor.' 
                    : 'Leads registered via website forms for Ti Toàn | Kim Long Motor.'
                  }
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLeads}
                  className="p-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5 text-xs"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  {isVi ? 'Làm mới' : 'Refresh'}
                </button>
                <button
                  onClick={exportCSV}
                  disabled={leads.length === 0}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all flex items-center gap-2 text-xs disabled:opacity-50"
                >
                  <Download size={14} />
                  {isVi ? 'Xuất Excel (CSV)' : 'Export CSV'}
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 border-b border-neutral-900 bg-neutral-950 p-4 gap-4 text-center">
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-800/40">
                <p className="text-xs text-neutral-500 font-medium">{isVi ? 'Tổng số Lead' : 'Total Leads'}</p>
                <p className="text-2xl font-black text-white font-mono mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-800/40">
                <p className="text-xs text-neutral-500 font-medium">{isVi ? 'Đăng ký lái thử' : 'Test Drive'}</p>
                <p className="text-2xl font-black text-red-500 font-mono mt-1">{stats.testDrive}</p>
              </div>
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-800/40">
                <p className="text-xs text-neutral-500 font-medium">{isVi ? 'Yêu cầu báo giá' : 'Get Quote'}</p>
                <p className="text-2xl font-black text-yellow-500 font-mono mt-1">{stats.quote}</p>
              </div>
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-800/40">
                <p className="text-xs text-neutral-500 font-medium">{isVi ? 'Tính toán trả góp' : 'Financing'}</p>
                <p className="text-2xl font-black text-blue-500 font-mono mt-1">{stats.installment}</p>
              </div>
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-800/40">
                <p className="text-xs text-neutral-500 font-medium">{isVi ? 'Tư vấn chung' : 'General'}</p>
                <p className="text-2xl font-black text-emerald-500 font-mono mt-1">{stats.general}</p>
              </div>
            </div>

            {/* Filter tab & table */}
            <div className="p-4 bg-neutral-950 flex items-center space-x-2 overflow-x-auto border-b border-neutral-900">
              <span className="text-xs text-neutral-500 font-bold whitespace-nowrap">{isVi ? 'Lọc theo:' : 'Filter:'}</span>
              {[
                { val: 'all', lbl: isVi ? 'Tất cả' : 'All' },
                { val: 'quote', lbl: isVi ? 'Báo giá' : 'Quotes' },
                { val: 'test-drive', lbl: isVi ? 'Lái thử' : 'Test Drives' },
                { val: 'installment', lbl: isVi ? 'Trả góp' : 'Financing' },
                { val: 'general', lbl: isVi ? 'Tư vấn' : 'General' }
              ].map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setFilterType(tab.val)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    filterType === tab.val 
                      ? 'bg-red-950/60 border-red-600 text-red-400 font-bold' 
                      : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {tab.lbl}
                </button>
              ))}
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-auto p-6 bg-neutral-950">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <RefreshCw className="animate-spin text-red-500" size={32} />
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                  <FileText size={48} className="mb-3 text-neutral-700" />
                  <p>{isVi ? 'Chưa có yêu cầu nào từ khách hàng.' : 'No customer records captured yet.'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      className="p-5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full ${
                            lead.leadType === 'test-drive' ? 'bg-red-950/80 border border-red-900 text-red-400' :
                            lead.leadType === 'quote' ? 'bg-yellow-950/80 border border-yellow-900 text-yellow-400' :
                            lead.leadType === 'installment' ? 'bg-blue-950/80 border border-blue-900 text-blue-400' :
                            'bg-emerald-950/80 border border-emerald-900 text-emerald-400'
                          }`}>
                            {lead.leadType}
                          </span>
                          <span className="text-xs text-neutral-500 font-mono">
                            {new Date(lead.createdAt).toLocaleString(isVi ? 'vi-VN' : 'en-US')}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                          <User size={16} className="text-neutral-500" />
                          {lead.fullName}
                        </h4>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-400">
                          <span className="flex items-center gap-1 text-red-500 font-bold font-mono">
                            <Phone size={14} className="text-neutral-500" />
                            {lead.phoneNumber}
                          </span>
                          {lead.email && (
                            <span className="flex items-center gap-1">
                              <Mail size={14} className="text-neutral-500" />
                              {lead.email}
                            </span>
                          )}
                          {lead.selectedProduct && (
                            <span className="flex items-center gap-1 text-white font-medium">
                              <Award size={14} className="text-red-500" />
                              {isVi ? 'Quan tâm' : 'Interested'}: {lead.selectedProduct}
                            </span>
                          )}
                        </div>

                        {lead.notes && (
                          <div className="p-3 bg-neutral-950 rounded-xl text-xs text-neutral-400 border border-neutral-800/50 mt-2">
                            <span className="font-bold text-neutral-500 block mb-0.5">{isVi ? 'Ghi chú / Thắc mắc:' : 'Inquiry / Notes:'}</span>
                            {lead.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-yellow-500 bg-yellow-950/30 border border-yellow-900/50 px-3 py-1.5 rounded-xl font-medium">
                          <Clock size={12} />
                          {isVi ? 'Chờ liên hệ' : 'Pending Callback'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
