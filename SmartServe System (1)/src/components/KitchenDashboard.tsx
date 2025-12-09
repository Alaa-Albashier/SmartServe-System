import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Package, TrendingUp, AlertCircle } from 'lucide-react';
import { topMeals, mockIngredients } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KitchenDashboardProps {
  onNavigate: (page: string) => void;
}

export function KitchenDashboard({ onNavigate }: KitchenDashboardProps) {
  const shortageItems = mockIngredients.filter(i => i.status === 'shortage');
  const lowStockItems = mockIngredients.filter(i => i.currentStock <= i.minimumLevel * 1.2);

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {shortageItems.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <div className="text-gray-900">Stock Alert!</div>
                <p className="text-gray-700 mt-1">
                  {shortageItems.length} ingredient(s) are running low. Please inform the manager.
                </p>
                <Button 
                  onClick={() => onNavigate('inventory')}
                  size="sm"
                  className="mt-3 bg-orange-600 hover:bg-orange-700"
                >
                  View Inventory
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Today's Orders</CardTitle>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">142 orders</div>
            <p className="text-green-600 mt-2">+18% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Low Stock Items</CardTitle>
            <Package className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{lowStockItems.length} items</div>
            <p className="text-orange-600 mt-2">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Ingredients</CardTitle>
            <Package className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{mockIngredients.length} items</div>
            <p className="text-blue-600 mt-2">In inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Meals & Low Stock Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Items Today</CardTitle>
            <CardDescription>Focus on these high-demand dishes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topMeals} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="count" fill="#2ECC71" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Ingredients</CardTitle>
            <CardDescription>Monitor these items carefully</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.length > 0 ? (
                <>
                  {lowStockItems.slice(0, 5).map((ingredient) => (
                    <div 
                      key={ingredient.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        ingredient.status === 'shortage' 
                          ? 'bg-red-50 border-red-100' 
                          : 'bg-orange-50 border-orange-100'
                      }`}
                    >
                      <div>
                        <div className="text-gray-800">{ingredient.name}</div>
                        <div className="text-gray-600">
                          Current: {ingredient.currentStock} {ingredient.unit} | Min: {ingredient.minimumLevel} {ingredient.unit}
                        </div>
                      </div>
                      <div className={ingredient.status === 'shortage' ? 'text-red-600' : 'text-orange-600'}>
                        {ingredient.status === 'shortage' ? 'Critical' : 'Low'}
                      </div>
                    </div>
                  ))}
                  <Button 
                    onClick={() => onNavigate('inventory')}
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    View Full Inventory
                  </Button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  All ingredients are well stocked!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common kitchen tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => onNavigate('inventory')}
              className="bg-green-600 hover:bg-green-700 h-auto py-6 flex flex-col gap-2"
            >
              <Package className="w-6 h-6" />
              <span>Update Inventory</span>
            </Button>
            <Button 
              onClick={() => onNavigate('sales')}
              className="bg-blue-600 hover:bg-blue-700 h-auto py-6 flex flex-col gap-2"
            >
              <TrendingUp className="w-6 h-6" />
              <span>View Sales</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
