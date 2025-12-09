# SmartServe - Role-Based Access Control

## Overview
SmartServe implements a comprehensive role-based access control (RBAC) system with three distinct user roles, each with specific permissions and interfaces tailored to their responsibilities.

---

## User Roles & Access Levels

### 1. Restaurant Owner/Manager (Full Access)
**Role ID:** `owner`

**Access:**
- ✅ Dashboard - Complete overview with sales, inventory alerts, and forecasting
- ✅ Sales Analytics - Detailed sales data and trends
- ✅ Ingredient Forecasting - AI-powered demand prediction
- ✅ Inventory Management - Full control over stock levels
- ✅ Supplier Order Management - Create and manage orders
- ✅ Reports - Generate comprehensive business reports
- ✅ Settings - System configuration and preferences

**Key Features:**
- Complete visibility across all operations
- Financial data and revenue tracking
- Advanced analytics and forecasting tools
- Order creation and supplier management
- Business intelligence reports

**Login Credentials (Demo):**
- Email: owner@restaurant.com
- Role: Restaurant Owner / Manager

---

### 2. Kitchen Staff (Limited Access)
**Role ID:** `kitchen`

**Access:**
- ✅ Kitchen Dashboard - Simplified view focused on operations
- ✅ Inventory Management - View and update stock levels
- ✅ Sales View - Read-only access to see popular items
- ✅ Settings - Basic profile settings

**Restricted From:**
- ❌ Ingredient Forecasting
- ❌ Supplier Order Management
- ❌ Financial Reports
- ❌ Advanced Analytics

**Key Features:**
- Real-time low stock alerts
- Today's order count and popular items
- Ability to update inventory levels
- Focus on operational needs
- Critical shortage notifications

**Login Credentials (Demo):**
- Email: kitchen@restaurant.com
- Role: Kitchen Staff

**Dashboard Highlights:**
- Alert banner for critical stock shortages
- Today's order statistics
- Popular items chart for prep planning
- Low stock ingredient monitoring
- Quick access to inventory updates

---

### 3. Supplier (Supplier Portal)
**Role ID:** `supplier`

**Access:**
- ✅ Supplier Dashboard - Order overview and statistics
- ✅ Order Management - View, accept, decline orders
- ✅ Settings - Profile and business settings

**Restricted From:**
- ❌ Restaurant sales data
- ❌ Ingredient forecasting
- ❌ Restaurant inventory
- ❌ Restaurant reports

**Key Features:**
- Incoming order notifications
- Order acceptance/decline workflow
- Delivery confirmation
- Revenue tracking
- Restaurant order details
- Order history

**Login Credentials (Demo):**
- Email: supplier@example.com
- Role: Supplier

**Dashboard Highlights:**
- Incoming orders requiring action
- Completed deliveries tracking
- Total revenue from orders
- Detailed order items view
- Accept/Decline order controls

---

## Technical Implementation

### Role-Based Routing
The application uses a centralized routing system in `App.tsx` that enforces access control:

```typescript
// Supplier views only
if (userRole === 'supplier') {
  // Only supplier-specific pages accessible
}

// Kitchen staff views only
if (userRole === 'kitchen') {
  // Limited to kitchen dashboard, inventory, sales
}

// Owner views (full access)
// All pages accessible
```

### Navigation Menus
Each role has a custom navigation menu defined in `DashboardLayout.tsx`:

**Owner Menu:**
- Dashboard, Sales, Forecast, Inventory, Orders, Reports, Settings

**Kitchen Menu:**
- Dashboard, Inventory, Sales, Settings

**Supplier Menu:**
- Dashboard, Orders, Settings

### Visual Role Indicators
- **Sidebar Badge:** Color-coded role indicator (Green=Owner, Blue=Kitchen, Purple=Supplier)
- **Header Info:** Role-specific user information display
- **Shield Icon:** Visual security indicator

---

## Page Access Matrix

| Page | Owner | Kitchen | Supplier |
|------|-------|---------|----------|
| Dashboard | ✅ Full | ✅ Kitchen View | ✅ Supplier View |
| Sales Analytics | ✅ | ✅ Read-only | ❌ |
| Ingredient Forecasting | ✅ | ❌ | ❌ |
| Inventory Management | ✅ | ✅ | ❌ |
| Supplier Orders | ✅ | ❌ | ✅ |
| Reports | ✅ | ❌ | ❌ |
| Settings | ✅ | ✅ | ✅ |

---

## Security Features

1. **Role-Based Page Rendering:** Pages are conditionally rendered based on user role
2. **Navigation Restrictions:** Menu items only show accessible pages
3. **Default Redirects:** Invalid page access redirects to role's default dashboard
4. **Visual Feedback:** Clear role identification throughout the interface
5. **Logout Protection:** Session ends when user logs out

---

## How to Test Different Roles

1. **Login Page:** Use the dropdown to select your role
2. **Enter any email/password** (demo mode - no validation)
3. **Click Login** to access the role-specific interface

### Testing Scenarios:

**As Owner:**
- Log in as Owner → Full dashboard with forecasting and orders
- Access all 7 menu items
- Create supplier orders

**As Kitchen Staff:**
- Log in as Kitchen → Simplified kitchen dashboard
- See low stock alerts
- Update inventory
- View sales (read-only)

**As Supplier:**
- Log in as Supplier → Supplier portal
- View incoming orders from restaurants
- Accept/decline orders
- Track deliveries

---

## Future Enhancements

- [ ] User authentication with database
- [ ] Multi-restaurant support for suppliers
- [ ] Role permissions customization
- [ ] Activity logging and audit trails
- [ ] Real-time notifications by role
- [ ] Mobile-responsive role interfaces

---

## Code Structure

```
/App.tsx                      # Main routing and role logic
/components/
  ├── LoginPage.tsx           # Role selection and authentication
  ├── DashboardLayout.tsx     # Role-based navigation
  ├── Dashboard.tsx           # Owner dashboard
  ├── KitchenDashboard.tsx    # Kitchen staff dashboard
  ├── SupplierPortal.tsx      # Supplier dashboard
  ├── [Other Pages].tsx       # Shared pages with role filtering
/types/index.ts               # UserRole type definition
```

---

## Contact & Support

For questions about role configuration or access issues, please refer to the main documentation or contact the development team.

**SmartServe** - Intelligent Restaurant Management System
