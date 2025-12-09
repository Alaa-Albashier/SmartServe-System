# SmartServe - Quick Start Guide for Role-Based Interfaces

## 🚀 Getting Started

SmartServe now has **three separate login interfaces** for different users. This guide shows you how to access each one.

---

## 🔐 Login Instructions

### Step 1: Open the Login Page
When you first load SmartServe, you'll see the login screen.

### Step 2: Select Your Role
Use the dropdown menu labeled "Login As" to choose:
- **Restaurant Owner / Manager** - Full system access
- **Kitchen Staff** - Kitchen operations interface
- **Supplier** - Supplier order portal

### Step 3: Enter Credentials (Demo Mode)
- Email: Any valid email format (e.g., test@example.com)
- Password: Any password (e.g., password123)
- *Note: In demo mode, any credentials work*

### Step 4: Click Login
You'll be automatically taken to your role-specific dashboard.

---

## 👨‍💼 Restaurant Owner/Manager Interface

### What You'll See:
**Navigation Menu (7 items):**
1. 📊 Dashboard
2. 📈 Sales
3. 🧠 Forecast
4. 📦 Inventory
5. 🛒 Orders
6. 📄 Reports
7. ⚙️ Settings

### Dashboard Features:
- **Top Row Stats:**
  - Today's Sales: PKR 8,600 (+8.9% from yesterday)
  - Low Stock Items: Number of items needing restocking
  - Pending Orders: Orders awaiting delivery

- **Charts & Insights:**
  - Top 5 Meals Sold (Bar chart)
  - Ingredient Forecast Summary (Low stock alerts)

- **Quick Actions:**
  - Generate Forecast (Green button)
  - Create Order (Blue button)
  - View Inventory (Purple button)

### Access Level: ✅ FULL ACCESS
- Create supplier orders
- Run forecasting algorithms
- View financial reports
- Manage all inventory
- Access all analytics

---

## 👨‍🍳 Kitchen Staff Interface

### What You'll See:
**Navigation Menu (4 items):**
1. 📊 Dashboard
2. 📦 Inventory
3. 📈 Sales
4. ⚙️ Settings

### Dashboard Features:
- **Alert Banner (if applicable):**
  - 🚨 Orange alert showing critical stock shortages
  - "Stock Alert! X ingredient(s) are running low"
  - Quick button to view inventory

- **Top Row Stats:**
  - Today's Orders: 142 orders (+18% from yesterday)
  - Low Stock Items: Number of items needing attention
  - Total Ingredients: Total items in inventory

- **Charts & Insights:**
  - Popular Items Today (Focus on high-demand dishes)
  - Low Stock Ingredients (Color-coded: Red=Critical, Orange=Low)

- **Quick Actions:**
  - Update Inventory (Green button)
  - View Sales (Blue button)

### Access Level: 🔒 LIMITED ACCESS
- ✅ Can view and update inventory
- ✅ Can see sales data (read-only)
- ✅ Can see popular items
- ❌ Cannot create orders
- ❌ Cannot access forecasting
- ❌ Cannot view financial reports

### Key Differences from Owner:
- **Focused on Operations:** No financial metrics
- **Action-Oriented:** Emphasizes what needs to be done now
- **Stock Alerts Prominent:** Critical information at the top
- **Simplified Navigation:** Only 4 menu items vs. 7

---

## 🚚 Supplier Interface

### What You'll See:
**Navigation Menu (3 items):**
1. 📊 Dashboard
2. 🛒 Orders
3. ⚙️ Settings

### Dashboard Features:
- **Top Row Stats:**
  - Incoming Orders: Number awaiting response
  - Completed Deliveries: Deliveries this week
  - Total Revenue: PKR total from all orders

- **Incoming Orders Table:**
  - Order ID, Restaurant Name, Items, Total Cost, Status
  - **Actions for each order:**
    - 👁️ View (See detailed items)
    - ✅ Accept (Green button)
    - ❌ Decline (Red button)

- **Recent Deliveries Table:**
  - Completed orders with delivery confirmation
  - Order history and revenue tracking

### Access Level: 🔒 SUPPLIER PORTAL
- ✅ Can view orders from restaurants
- ✅ Can accept/decline orders
- ✅ Can confirm deliveries
- ✅ Can track revenue
- ❌ Cannot see restaurant sales data
- ❌ Cannot access restaurant inventory
- ❌ Cannot see forecasting data

### Key Features:
- **Order Management:** Accept or decline incoming orders
- **Detail View:** Click "View" to see all items in an order
- **Revenue Tracking:** See total earnings from orders
- **Restaurant Info:** View which restaurant sent each order

---

## 🎨 Visual Indicators

### Role Badges (In Sidebar):
- 🟢 **Owner** - Green badge with shield icon
- 🔵 **Kitchen** - Blue badge with shield icon
- 🟣 **Supplier** - Purple badge with shield icon

### User Information (Top Right):
- **Owner:** "Restaurant Owner" / owner@restaurant.com
- **Kitchen:** "Kitchen Staff" / kitchen@restaurant.com
- **Supplier:** "Supplier User" / supplier@example.com

---

## 📱 Navigation Tips

### Switching Pages:
- Click any menu item in the sidebar to navigate
- Active page is highlighted in green
- Page title appears in the top header

### Logging Out:
- Click the "Logout" button at the bottom of the sidebar
- You'll be returned to the login screen
- Role selection resets for next login

### Attempting Unauthorized Access:
- If you try to access a restricted page, you'll be redirected to your default dashboard
- Navigation only shows pages you're authorized to see

---

## 🧪 Testing Scenarios

### Test Owner Access:
1. Login as Owner
2. Notice 7 navigation items
3. Click "Forecast" → See forecasting page
4. Click "Orders" → Create supplier orders
5. Click "Reports" → View business reports

### Test Kitchen Access:
1. Login as Kitchen Staff
2. Notice only 4 navigation items
3. See orange alert banner if stock is low
4. Click "Inventory" → Update stock levels
5. Try to access "Orders" → Not in menu (restricted)

### Test Supplier Access:
1. Login as Supplier
2. Notice only 3 navigation items
3. See incoming orders from restaurants
4. Click "View" on an order → See detailed items
5. Click "Accept" → Confirm order acceptance

---

## 🔄 Switching Between Roles

**To test different roles:**
1. Click "Logout" in the current interface
2. Select a different role from the dropdown
3. Login again to see the new interface
4. Compare the available features

---

## 📊 Quick Comparison

| Feature | Owner | Kitchen | Supplier |
|---------|-------|---------|----------|
| **Menu Items** | 7 | 4 | 3 |
| **Primary Focus** | Business Management | Kitchen Operations | Order Fulfillment |
| **Dashboard Type** | Comprehensive | Operational | Order Portal |
| **Financial Data** | Full | None | Revenue Only |
| **Inventory Access** | Full Control | View & Update | None |
| **Order Management** | Create Orders | None | Accept/Decline |
| **Reports** | Yes | No | No |
| **Forecasting** | Yes | No | No |

---

## 💡 Best Practices

### For Owners:
- Start with Dashboard to see overall status
- Check Forecast regularly for demand prediction
- Review Reports weekly for business insights
- Create orders based on forecast recommendations

### For Kitchen Staff:
- Check Dashboard first thing each day
- Monitor low stock alerts throughout shift
- Update inventory as items are used
- View Sales to see popular items

### For Suppliers:
- Check Dashboard for new incoming orders
- Respond to orders promptly (Accept/Decline)
- Track completed deliveries
- Monitor revenue and order history

---

## 🆘 Troubleshooting

**Problem:** Can't see certain menu items
- **Solution:** Check that you're logged in with the correct role

**Problem:** Redirected when trying to access a page
- **Solution:** That page is restricted for your role

**Problem:** Want to access a different interface
- **Solution:** Logout and login with a different role

---

## 📚 More Information

- **Detailed Documentation:** See `ROLE_BASED_ACCESS.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`
- **Full Guidelines:** See `/guidelines/Guidelines.md`

---

## 🎯 Summary

SmartServe provides **three optimized interfaces** designed specifically for each user type:

- **Owners** get complete business management tools
- **Kitchen Staff** get focused operational tools
- **Suppliers** get order management portal

Each interface shows only what's needed for that role, creating a **cleaner, more efficient experience** for everyone.

---

**Ready to Start?** Go to the login page and select your role! 🚀

**SmartServe - Intelligent Restaurant Management**
