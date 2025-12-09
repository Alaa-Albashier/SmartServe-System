import { useState } from 'react';
import { UserRole } from './types';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { KitchenDashboard } from './components/KitchenDashboard';
import { SalesPage } from './components/SalesPage';
import { ForecastPage } from './components/ForecastPage';
import { InventoryPage } from './components/InventoryPage';
import { OrdersPage } from './components/OrdersPage';
import { SupplierPortal } from './components/SupplierPortal';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('owner');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'supplier') {
      setCurrentPage('supplier-dashboard');
    } else if (role === 'kitchen') {
      setCurrentPage('kitchen-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    // Supplier views
    if (userRole === 'supplier') {
      switch (currentPage) {
        case 'supplier-dashboard':
        case 'supplier-orders':
          return <SupplierPortal />;
        case 'settings':
          return <SettingsPage />;
        default:
          return <SupplierPortal />;
      }
    }

    // Kitchen staff views
    if (userRole === 'kitchen') {
      switch (currentPage) {
        case 'kitchen-dashboard':
          return <KitchenDashboard onNavigate={handleNavigate} />;
        case 'inventory':
          return <InventoryPage />;
        case 'sales':
          return <SalesPage />;
        case 'settings':
          return <SettingsPage />;
        default:
          return <KitchenDashboard onNavigate={handleNavigate} />;
      }
    }

    // Restaurant owner views (full access)
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'sales':
        return <SalesPage />;
      case 'forecast':
        return <ForecastPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'orders':
        return <OrdersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <DashboardLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        userRole={userRole}
      >
        {renderPage()}
      </DashboardLayout>
      <Toaster />
    </>
  );
}