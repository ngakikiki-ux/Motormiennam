import React, { useEffect, useState } from 'react';
import { ShieldCheck, Server, Search, Check, Globe, HelpCircle, Code, Eye } from 'lucide-react';
import { Language, Product, FAQItem } from '../types';

interface SEOManagerProps {
  language: Language;
  activeProductId?: string | null;
  activeProduct?: Product | null;
}

export default function SEOManager({ language, activeProductId, activeProduct }: SEOManagerProps) {
  const [showAuditPanel, setShowAuditPanel] = useState(false);
  const isVi = language === 'vi';

  // Dynamic Title & Meta Description logic
  useEffect(() => {
    let title = '';
    let description = '';
    let ogTitle = '';
    let ogDescription = '';

    if (activeProduct) {
      title = isVi 
        ? `${activeProduct.name} - Giá xe & Thông số kỹ thuật | Kim Long Motor Miền Nam` 
        : `${activeProduct.name} - Price & Tech Specs | Kim Long Motor Southern`;
      
      description = isVi
        ? `Chi tiết xe thương mại ${activeProduct.name}. Tải trọng ${activeProduct.payload}, công suất ${activeProduct.power}. Hỗ trợ trả góp 85%, giao xe tận nơi. Liên hệ Ti Toàn ngay.`
        : `Detailed specs of commercial ${activeProduct.name}. Payload ${activeProduct.payload}, power ${activeProduct.power}. 85% financing support, home delivery. Contact Ti Toàn now.`;
      
      ogTitle = title;
      ogDescription = description;
    } else {
      title = isVi
        ? 'Kim Long Motor Miền Nam'
        : 'Kim Long Motor Southern';
      
      description = isVi
        ? 'Đại lý xe điện Kim Long Motor Miền Nam'
        : 'Kim Long Motor Southern EV Dealership';
      
      ogTitle = isVi 
        ? 'Kim Long Motor Miền Nam' 
        : 'Kim Long Motor Southern';
      
      ogDescription = isVi 
        ? 'Website chính thức Kim Long Motor Miền Nam' 
        : 'Official Website of Kim Long Motor Southern';
    }

    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Open Graph tags for premium SEO
    const ogTags = [
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: activeProduct?.image || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800' }
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

  }, [language, activeProduct]);

  // Inject Structured Schema.org data dynamically
  useEffect(() => {
    // Remove existing schemas to avoid duplicates
    const oldSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    oldSchemas.forEach(el => el.remove());

    const host = window.location.origin;

    // 1. Person Schema for Sales Consultant Ti Toàn
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ti Toàn",
      "jobTitle": "Sales Representative",
      "worksFor": {
        "@type": "AutoDealer",
        "name": "Kim Long Motor",
        "image": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "451 Quốc lộ 1, xã An Ninh",
          "addressLocality": "Thành phố Cần Thơ",
          "addressCountry": "VN"
        },
        "telephone": "0799600789"
      },
      "url": host,
      "telephone": "+84799600789"
    };

    // 2. FAQ Schema for user's key items
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Chính sách bảo hành xe Kim Long EV-300 thế nào?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Xe tải điện EV-300 được bảo hành chính hãng lên đến 7 năm hoặc 200.000 km, riêng bộ phận Pin LFP thông minh bảo hành lên đến 8 năm."
          }
        },
        {
          "@type": "Question",
          "name": "Hạn mức mua xe tải Kim Long trả góp tối đa bao nhiêu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Các đối tác ngân hàng liên kết hỗ trợ cho vay trả góp tối đa lên đến 85% giá trị hợp đồng, thời gian vay tối đa 7 năm."
          }
        }
      ]
    };

    // Inject Person Schema
    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.text = JSON.stringify(personSchema);
    document.head.appendChild(personScript);

    // Inject FAQ Schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

  }, [activeProduct]);

  return null;
}
