export type UserRole = 'owner' | 'kitchen' | 'supplier';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface SalesData {
  id: string;
  date: string;
  itemSold: string;
  quantity: number;
  revenue: number;
}

export interface Ingredient {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  minimumLevel: number;
  predictedNeed?: number;
  suggestedOrder?: number;
  status?: 'ok' | 'shortage';
  lastUpdated: string;
}

export interface WastageLog {
  id: string;
  item: string;
  quantity: number;
  reason: string;
  date: string;
}

export interface Order {
  id: string;
  supplierName: string;
  restaurantName?: string;
  date: string;
  totalItems: number;
  status: 'pending' | 'delivered' | 'confirmed';
  items: OrderItem[];
  totalCost: number;
}

export interface OrderItem {
  ingredient: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface MealSale {
  name: string;
  count: number;
}
