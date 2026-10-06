export interface OrderItem {
  id: string;
  name: string;
  packageOption: string;
  count: number;
  price: number;
}

export type OrderStatus = '결제완료' | '배송중' | '배송완료';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  deliveryMemo?: string;
  paymentMethod: string;
  cardNumberMasked: string;
  userEmail?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface ProductOption {
  id: string;
  name: string;
  subtext: string;
  pouchCount: number;
  price: number;
  originalPrice: number;
  bonus?: string;
  popular?: boolean;
}
