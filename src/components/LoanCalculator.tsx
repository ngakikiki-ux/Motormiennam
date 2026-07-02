import React, { useState, useMemo } from 'react';
import { Calculator, Percent, Calendar, DollarSign, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface LoanCalculatorProps {
  language: Language;
  initialVehiclePrice?: number;
  vehicleName?: string;
}

export default function LoanCalculator({ language, initialVehiclePrice = 890000000, vehicleName }: LoanCalculatorProps) {
  const isVi = language === 'vi';

  const [price, setPrice] = useState<number>(initialVehiclePrice);
  const [loanPercent, setLoanPercent] = useState<number>(80);
  const [durationYears, setDurationYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(7.5);

  const formatCurrency = (val: number) => {
    if (isVi) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val / 25000); // Mock USD conversion
  };

  const results = useMemo(() => {
    const loanAmount = (price * loanPercent) / 100;
    const upfrontAmount = price - loanAmount;
    const totalMonths = durationYears * 12;
    const monthlyRate = interestRate / 12 / 100;

    // Standard reducing balance interest method (Dư nợ giảm dần)
    const monthlyPrincipal = loanAmount / totalMonths;
    const firstMonthInterest = loanAmount * monthlyRate;
    const firstMonthTotal = monthlyPrincipal + firstMonthInterest;

    // Let's generate a quick amortization breakdown
    let remainingDebt = loanAmount;
    let totalInterest = 0;
    const amortization = [];

    for (let m = 1; m <= Math.min(totalMonths, 12); m++) {
      const interest = remainingDebt * monthlyRate;
      const principal = monthlyPrincipal;
      const totalPayment = principal + interest;
      totalInterest += interest;
      
      amortization.push({
        month: m,
        principal,
        interest,
        totalPayment,
        remainingDebt: Math.max(0, remainingDebt - principal)
      });

      remainingDebt -= principal;
    }

    // Estimate total interest over whole life
    let tempDebt = loanAmount;
    let computedTotalInterest = 0;
    for (let m = 1; m <= totalMonths; m++) {
      const interest = tempDebt * monthlyRate;
      computedTotalInterest += interest;
      tempDebt -= monthlyPrincipal;
    }

    return {
      loanAmount,
      upfrontAmount,
      totalMonths,
      monthlyPrincipal,
      firstMonthInterest,
      firstMonthTotal,
      computedTotalInterest,
      totalPayment: loanAmount + computedTotalInterest,
      sampleSchedule: amortization
    };
  }, [price, loanPercent, durationYears, interestRate]);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8" id="installment-loan-calculator">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-red-950/50 border border-red-900 rounded-xl text-red-500">
          <Calculator size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {isVi ? 'Tính toán Trả góp Thông minh' : 'Smart Installment Calculator'}
          </h3>
          <p className="text-xs text-neutral-400">
            {vehicleName 
              ? `${isVi ? 'Đang tính toán cho' : 'Calculating for'}: ${vehicleName}` 
              : (isVi ? 'Dự toán khoản vay theo dư nợ giảm dần' : 'Estimate loans based on reducing balance method')
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input parameters */}
        <div className="lg:col-span-7 space-y-6">
          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2 flex justify-between">
              <span>{isVi ? 'Giá trị xe (VNĐ)' : 'Vehicle Price'}</span>
              <span className="text-red-500 font-bold font-mono">{formatCurrency(price)}</span>
            </label>
            <div className="relative rounded-xl overflow-hidden">
              <input
                id="calc-price-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                step={10000000}
                className="w-full bg-neutral-950 border border-neutral-800 text-white font-mono rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <input
              type="range"
              min={200000000}
              max={3000000000}
              step={50000000}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="w-full accent-red-600 mt-3 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
              <span>200 TR</span>
              <span>1.5 TỶ</span>
              <span>3 TỶ</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Loan Percent */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2 flex justify-between">
                <span>{isVi ? 'Tỷ lệ vay (%)' : 'Loan Ratio'}</span>
                <span className="text-white font-bold font-mono">{loanPercent}%</span>
              </label>
              <select
                id="calc-loan-percent"
                value={loanPercent}
                onChange={(e) => setLoanPercent(parseInt(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
              >
                <option value={50}>50% ({isVi ? 'Trả trước' : 'Downpayment'} 50%)</option>
                <option value={60}>60% ({isVi ? 'Trả trước' : 'Downpayment'} 40%)</option>
                <option value={70}>70% ({isVi ? 'Trả trước' : 'Downpayment'} 30%)</option>
                <option value={75}>75% ({isVi ? 'Trả trước' : 'Downpayment'} 25%)</option>
                <option value={80}>80% ({isVi ? 'Trả trước' : 'Downpayment'} 20%)</option>
                <option value={85}>85% ({isVi ? 'Trả trước' : 'Downpayment'} 15% - {isVi ? 'Tối đa' : 'Max'})</option>
              </select>
            </div>

            {/* Loan Duration */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2 flex justify-between">
                <span>{isVi ? 'Thời hạn vay' : 'Loan Term'}</span>
                <span className="text-white font-bold font-mono">{durationYears} {isVi ? 'Năm' : 'Years'} ({durationYears * 12} {isVi ? 'tháng' : 'mos'})</span>
              </label>
              <select
                id="calc-loan-duration"
                value={durationYears}
                onChange={(e) => setDurationYears(parseInt(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(yr => (
                  <option key={yr} value={yr}>{yr} {isVi ? 'Năm' : 'Years'} ({yr * 12} {isVi ? 'Tháng' : 'Months'})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2 flex justify-between">
              <span>{isVi ? 'Lãi suất ưu đãi (%/Năm)' : 'Interest Rate (%/Yr)'}</span>
              <span className="text-red-500 font-bold font-mono">{interestRate}% / {isVi ? 'năm' : 'yr'}</span>
            </label>
            <input
              type="range"
              min={5}
              max={12}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
              <span>5.0%</span>
              <span>7.5% (Trung bình)</span>
              <span>12.0%</span>
            </div>
          </div>

          <div className="p-4 bg-yellow-950/20 border border-yellow-900/40 rounded-xl flex items-start space-x-3 text-xs text-yellow-500/90 leading-relaxed">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <p>
              {isVi 
                ? "Bảng tính mang tính chất tham khảo giúp chuẩn bị ngân sách. Thực tế lãi suất có thể thay đổi tùy thuộc từng ngân hàng và lịch sử tín dụng của khách hàng. Hãy liên hệ Ti Toàn để nhận bảng duyệt vay chính thức từ ngân hàng liên kết."
                : "This calculation is for reference. Actual interest rates depend on specific commercial banks and your credit score. Contact Ti Toàn for the officially customized bank proposal."
              }
            </p>
          </div>
        </div>

        {/* Results summary panel */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-neutral-800 pb-3">
              <span className="text-xs text-neutral-400 uppercase tracking-wider">{isVi ? 'Khoản tự có ban đầu' : 'Initial Downpayment (Min)'}</span>
              <p className="text-2xl font-price text-white mt-0.5">{formatCurrency(results.upfrontAmount)}</p>
              <p className="text-[10px] text-neutral-500">{(100 - loanPercent)}% {isVi ? 'giá trị xe cần chuẩn bị trước' : 'of vehicle price to prepare'}</p>
            </div>

            <div className="border-b border-neutral-800 pb-3">
              <span className="text-xs text-neutral-400 uppercase tracking-wider">{isVi ? 'Số tiền Ngân hàng hỗ trợ vay' : 'Bank Funded Amount'}</span>
              <p className="text-xl font-price text-red-500 mt-0.5">{formatCurrency(results.loanAmount)}</p>
              <p className="text-[10px] text-neutral-500">{loanPercent}% {isVi ? 'giá trị xe trả góp' : 'of vehicle price funded'}</p>
            </div>

            <div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">{isVi ? 'Trả tháng đầu tiên (Ước tính)' : 'First Month Est. Payment'}</span>
              <p className="text-2xl font-price text-yellow-500 mt-0.5">{formatCurrency(results.firstMonthTotal)}</p>
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>Gốc: {formatCurrency(results.monthlyPrincipal)}</span>
                <span>Lãi: {formatCurrency(results.firstMonthInterest)}</span>
              </div>
            </div>
          </div>

          {/* Quick Schedule Sneakpeek */}
          <div className="bg-neutral-950/50 border border-neutral-800/80 rounded-xl p-4">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
              {isVi ? 'Tiến độ dư nợ giảm dần (12 tháng đầu)' : 'Amortization (First 12 months)'}
            </h4>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 text-xs">
              {results.sampleSchedule.map((row) => (
                <div key={row.month} className="flex justify-between items-center py-1 border-b border-neutral-900 font-mono">
                  <span className="text-neutral-500">{isVi ? 'Tháng' : 'Month'} {row.month}</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{formatCurrency(row.totalPayment)}</span>
                    <span className="text-[10px] text-neutral-500 block">({isVi ? 'Lãi' : 'Int'}: {formatCurrency(row.interest)})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-red-500">
              <CheckCircle size={14} />
              <span>{isVi ? 'Bao nợ xấu, duyệt nhanh 48h' : 'Fast 48h approval, bad-debt help'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
