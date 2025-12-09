import { SalesData, Ingredient, WastageLog, Order, MealSale } from '../types';

export const mockSalesData: SalesData[] = [
  { id: '1', date: '2025-10-28', itemSold: 'Chicken Biryani', quantity: 45, revenue: 2250 },
  { id: '2', date: '2025-10-28', itemSold: 'Chicken Karahi', quantity: 32, revenue: 1920 },
  { id: '3', date: '2025-10-28', itemSold: 'Roti', quantity: 120, revenue: 360 },
  { id: '4', date: '2025-10-27', itemSold: 'Chicken Biryani', quantity: 38, revenue: 1900 },
  { id: '5', date: '2025-10-27', itemSold: 'Chicken Karahi', quantity: 28, revenue: 1680 },
  { id: '6', date: '2025-10-27', itemSold: 'Dal Makhani', quantity: 25, revenue: 1000 },
  { id: '7', date: '2025-10-26', itemSold: 'Chicken Biryani', quantity: 42, revenue: 2100 },
  { id: '8', date: '2025-10-26', itemSold: 'Mutton Korma', quantity: 18, revenue: 1440 },
];

export const topMeals: MealSale[] = [
  { name: 'Chicken Biryani', count: 125 },
  { name: 'Roti', count: 120 },
  { name: 'Chicken Karahi', count: 92 },
  { name: 'Dal Makhani', count: 68 },
  { name: 'Mutton Korma', count: 45 },
];

export const mockIngredients: Ingredient[] = [
  { 
    id: '1', 
    name: 'Basmati Rice', 
    currentStock: 25, 
    unit: 'kg', 
    minimumLevel: 20, 
    predictedNeed: 45,
    suggestedOrder: 20,
    status: 'shortage',
    lastUpdated: '2025-10-28' 
  },
  { 
    id: '2', 
    name: 'Chicken', 
    currentStock: 15, 
    unit: 'kg', 
    minimumLevel: 10,
    predictedNeed: 32,
    suggestedOrder: 20,
    status: 'shortage',
    lastUpdated: '2025-10-28' 
  },
  { 
    id: '3', 
    name: 'Tomatoes', 
    currentStock: 30, 
    unit: 'kg', 
    minimumLevel: 15,
    predictedNeed: 22,
    suggestedOrder: 0,
    status: 'ok',
    lastUpdated: '2025-10-27' 
  },
  { 
    id: '4', 
    name: 'Onions', 
    currentStock: 40, 
    unit: 'kg', 
    minimumLevel: 20,
    predictedNeed: 28,
    suggestedOrder: 0,
    status: 'ok',
    lastUpdated: '2025-10-27' 
  },
  { 
    id: '5', 
    name: 'Cooking Oil', 
    currentStock: 8, 
    unit: 'L', 
    minimumLevel: 10,
    predictedNeed: 15,
    suggestedOrder: 10,
    status: 'shortage',
    lastUpdated: '2025-10-28' 
  },
  { 
    id: '6', 
    name: 'Yogurt', 
    currentStock: 12, 
    unit: 'kg', 
    minimumLevel: 8,
    predictedNeed: 18,
    suggestedOrder: 10,
    status: 'shortage',
    lastUpdated: '2025-10-28' 
  },
  { 
    id: '7', 
    name: 'Garam Masala', 
    currentStock: 3, 
    unit: 'kg', 
    minimumLevel: 2,
    predictedNeed: 4,
    suggestedOrder: 0,
    status: 'ok',
    lastUpdated: '2025-10-26' 
  },
  { 
    id: '8', 
    name: 'Fresh Coriander', 
    currentStock: 5, 
    unit: 'kg', 
    minimumLevel: 3,
    predictedNeed: 8,
    suggestedOrder: 5,
    status: 'shortage',
    lastUpdated: '2025-10-28' 
  },
];

export const mockWastage: WastageLog[] = [
  { id: '1', item: 'Tomatoes', quantity: 2, reason: 'Spoiled', date: '2025-10-27' },
  { id: '2', item: 'Fresh Coriander', quantity: 0.5, reason: 'Expired', date: '2025-10-26' },
  { id: '3', item: 'Yogurt', quantity: 1, reason: 'Contaminated', date: '2025-10-25' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    supplierName: 'Fresh Farms Supply',
    date: '2025-10-28',
    totalItems: 3,
    status: 'pending',
    items: [
      { ingredient: 'Basmati Rice', quantity: 20, unit: 'kg', price: 800 },
      { ingredient: 'Chicken', quantity: 20, unit: 'kg', price: 1600 },
      { ingredient: 'Cooking Oil', quantity: 10, unit: 'L', price: 500 },
    ],
    totalCost: 2900,
  },
  {
    id: 'ORD-002',
    supplierName: 'Green Valley Organics',
    date: '2025-10-27',
    totalItems: 2,
    status: 'delivered',
    items: [
      { ingredient: 'Tomatoes', quantity: 15, unit: 'kg', price: 300 },
      { ingredient: 'Onions', quantity: 20, unit: 'kg', price: 400 },
    ],
    totalCost: 700,
  },
  {
    id: 'ORD-003',
    supplierName: 'Spice Masters',
    date: '2025-10-26',
    totalItems: 4,
    status: 'delivered',
    items: [
      { ingredient: 'Garam Masala', quantity: 2, unit: 'kg', price: 600 },
      { ingredient: 'Yogurt', quantity: 10, unit: 'kg', price: 400 },
      { ingredient: 'Fresh Coriander', quantity: 5, unit: 'kg', price: 250 },
      { ingredient: 'Basmati Rice', quantity: 25, unit: 'kg', price: 1000 },
    ],
    totalCost: 2250,
  },
];

export const salesChartData = [
  { date: '10/01', sales: 4500 },
  { date: '10/02', sales: 5200 },
  { date: '10/03', sales: 4800 },
  { date: '10/04', sales: 6100 },
  { date: '10/05', sales: 5500 },
  { date: '10/06', sales: 7200 },
  { date: '10/07', sales: 6800 },
  { date: '10/08', sales: 5900 },
  { date: '10/09', sales: 6400 },
  { date: '10/10', sales: 5800 },
  { date: '10/11', sales: 6200 },
  { date: '10/12', sales: 7500 },
  { date: '10/13', sales: 7100 },
  { date: '10/14', sales: 6900 },
  { date: '10/15', sales: 7800 },
  { date: '10/16', sales: 8200 },
  { date: '10/17', sales: 7600 },
  { date: '10/18', sales: 6800 },
  { date: '10/19', sales: 7200 },
  { date: '10/20', sales: 6500 },
  { date: '10/21', sales: 7900 },
  { date: '10/22', sales: 8500 },
  { date: '10/23', sales: 8100 },
  { date: '10/24', sales: 7400 },
  { date: '10/25', sales: 7800 },
  { date: '10/26', sales: 8300 },
  { date: '10/27', sales: 7900 },
  { date: '10/28', sales: 8600 },
];
