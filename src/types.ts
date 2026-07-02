export interface Product {
  id: string;
  category: 'electric' | 'light' | 'medium' | 'heavy' | 'tractor' | 'minibus' | 'bus';
  categoryVi: string;
  categoryEn: string;
  name: string;
  image: string;
  gallery: string[];
  priceVi: string;
  priceEn: string;
  shortDescVi: string;
  shortDescEn: string;
  // Specifications
  dimensions: string;
  power: string;
  engineOrBattery: string;
  payload: string;
  fuelConsumption: string;
  warranty: string;
  featuresVi: string[];
  featuresEn: string[];
}

export interface NewsItem {
  id: string;
  category: 'knowledge' | 'experience' | 'installment' | 'promotion' | 'activities';
  categoryVi: string;
  categoryEn: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  contentVi: string;
  contentEn: string;
  image: string;
  date: string;
  author: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  roleVi: string;
  roleEn: string;
  rating: number;
  commentVi: string;
  commentEn: string;
  avatar: string;
  handoverImage?: string;
  vehicleModel: string;
}

export interface FAQItem {
  id: string;
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
  category: 'price' | 'installment' | 'warranty' | 'registration' | 'delivery' | 'maintenance';
}

export interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  selectedProduct?: string;
  leadType: 'test-drive' | 'quote' | 'installment' | 'general';
  notes?: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
}

export type Language = 'vi' | 'en';
