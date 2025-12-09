import { ReactNode } from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Brain, 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  User,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userRole: UserRole;
}

const ownerMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'forecast', label: 'Forecast', icon: Brain },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const kitchenMenuItems = [
  { id: 'kitchen-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const supplierMenuItems = [
  { id: 'supplier-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'supplier-orders', label: 'Orders', icon: ShoppingCart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function DashboardLayout({ children, currentPage, onNavigate, onLogout, userRole }: DashboardLayoutProps) {
  const menuItems = userRole === 'supplier' 
    ? supplierMenuItems 
    : userRole === 'kitchen'
    ? kitchenMenuItems
    : ownerMenuItems;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-gray-800">SmartServe</span>
          </div>
          <div className="mt-4">
            <Badge 
              variant="outline" 
              className={`w-full justify-center ${
                userRole === 'owner' 
                  ? 'border-green-200 bg-green-50 text-green-700' 
                  : userRole === 'kitchen'
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-purple-200 bg-purple-50 text-purple-700'
              }`}
            >
              <Shield className="w-3 h-3 mr-1" />
              {userRole === 'owner' 
                ? 'Owner' 
                : userRole === 'kitchen'
                ? 'Kitchen'
                : 'Supplier'}
            </Badge>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-gray-800">
                {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-green-700" />
                </div>
                <div className="hidden md:block">
                  <div className="text-gray-800">
                    {userRole === 'supplier' 
                      ? 'Supplier User' 
                      : userRole === 'kitchen'
                      ? 'Kitchen Staff'
                      : 'Restaurant Owner'}
                  </div>
                  <div className="text-gray-500">
                    {userRole === 'supplier' 
                      ? 'supplier@example.com' 
                      : userRole === 'kitchen'
                      ? 'kitchen@restaurant.com'
                      : 'owner@restaurant.com'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}