import { Timestamp } from 'firebase/firestore';

export interface Order {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  quantity: number;
  message: string;
  orderType: 'retail' | 'distributor';
  pricePerPack: number;
  totalPrice: number;
  createdAt: Timestamp;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export type OrderStatus = Order['status'];

export interface OrderFilters {
  status: OrderStatus | 'all';
  orderType: 'all' | 'retail' | 'distributor';
  searchQuery: string;
  dateFrom?: Date;
  dateTo?: Date;
}