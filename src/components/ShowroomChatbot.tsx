import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall } from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

interface ShowroomChatbotProps {
  language: Language;
}

export default function ShowroomChatbot({ language }: ShowroomChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isVi = language === 'vi';

  // Welcome message based on language
  const getWelcomeMessage = (): Message => ({
    id: 'welcome',
    role: 'model',
    content: isVi
      ? "Xin chào! Em là Trợ lý AI của anh Ti Toàn tại Kim Long Motor. Em có thể hỗ trợ giải đáp gì cho Anh/Chị về các dòng xe thương mại, tải điện EV-300 hay chính sách mua xe trả góp 85% ạ?"
      : "Hello! I am Ti Toàn's AI Assistant at Kim Long Motor. How may I help you today with our commercial trucks, EV-300 electric vehicles, or our 85% installment program?"
  });

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([getWelcomeMessage()]);
    } else {
      // Update welcome message if language toggled and it's the only message
      setMessages(prev => {
        if (prev.length === 1 && prev[0].id === 'welcome') {
          return [getWelcomeMessage()];
        }
        return prev;
      });
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = isVi
    ? [
        { label: 'Xe tải điện EV-300', text: 'Tư vấn giúp tôi dòng xe tải điện Kim Long EV-300' },
        { label: 'Thủ tục mua trả góp 85%', text: 'Chính sách mua xe tải trả góp cần hồ sơ gì và lãi suất thế nào?' },
        { label: 'Dòng xe tải nhẹ KIMAN9', text: 'Xe tải nhẹ Kim Long KIMAN9 giá bao nhiêu và tải trọng thế nào?' }
      ]
    : [
        { label: 'EV-300 Electric Truck', text: 'Tell me about Kim Long EV-300 electric truck specifications' },
        { label: '85% Installment Loan', text: 'What is the paperwork and interest rate for truck installment loans?' },
        { label: 'KIMAN9 Light Truck', text: 'How much is the KIMAN9 light truck and what is its payload?' }
      ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          language
        })
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: 'model',
          content: data.reply
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: 'model',
          content: isVi
            ? "Rất tiếc, đường truyền kết nối của em bị gián đoạn. Anh/Chị có thể bấm nút gọi trực tiếp anh Ti Toàn 0799.600.789 để nhận tư vấn ngay lập tức nhé!"
            : "Oops, I had trouble connecting to the AI server. You can call Mr. Ti Toàn directly at 0799.600.789 for instant guidance!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end" id="ai-chatbot-wrapper">
      {/* Chat Window */}
      {isOpen && (
        <div 
          id="chat-window"
          className="mb-4 w-[92vw] sm:w-[380px] h-[520px] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out animate-fade-in"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-red-700 to-black text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-red-500 flex items-center justify-center text-red-500">
                <Bot size={20} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-tight text-white flex items-center gap-1">
                  Ti Toàn AI Assistant
                  <Sparkles size={12} className="text-yellow-400" />
                </h4>
                <p className="text-xs text-neutral-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping"></span>
                  {isVi ? 'Hỗ trợ trực tuyến' : 'Online Consult'}
                </p>
              </div>
            </div>
            <button 
              id="close-chat-btn"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-950 scrollbar-thin scrollbar-thumb-neutral-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.role === 'user' 
                      ? 'bg-neutral-800 border-neutral-700 text-white' 
                      : 'bg-red-950/40 border-red-900 text-red-400'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-tr-none'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-900 flex items-center justify-center shrink-0 text-red-400">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-2xl rounded-tl-none text-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-neutral-900 border-t border-neutral-800 flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qp.text)}
                className="text-[11px] bg-neutral-950 border border-neutral-800 hover:border-red-600 text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center space-x-2">
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder={isVi ? "Nhập câu hỏi tại đây..." : "Type your question..."}
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
            />
            <button
              id="send-chat-btn"
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:hover:bg-red-600 transition-colors flex items-center justify-center shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        id="toggle-chat-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 border border-red-500/30 group cursor-pointer"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium text-xs whitespace-nowrap inline-block">
          {isVi ? 'Tư vấn AI ngay' : 'AI Consultant'}
        </span>
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
    </div>
  );
}
