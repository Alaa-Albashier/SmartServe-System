import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Brain, Package, ShoppingCart } from 'lucide-react';
import { topMeals, mockIngredients } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const todaySales = 8600;
  const yesterdaySales = 7900;
  const salesTrend = ((todaySales - yesterdaySales) / yesterdaySales) * 100;

  const shortageItems = mockIngredients.filter(i => i.status === 'shortage');

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Today's Sales</CardTitle>
            {salesTrend > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">PKR {todaySales.toLocaleString()}</div>
            <p className={`mt-2 ${salesTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesTrend > 0 ? '+' : ''}{salesTrend.toFixed(1)}% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Low Stock Items</CardTitle>
            <Package className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{shortageItems.length} items</div>
            <p className="text-orange-600 mt-2">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pending Orders</CardTitle>
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">1 order</div>
            <p className="text-blue-600 mt-2">Awaiting delivery</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Meals & Forecast Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Meals Sold (Last 7 Days)</CardTitle>
            <CardDescription>Most popular items this week</CardDescription>
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
            <CardTitle>Ingredient Forecast Summary</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shortageItems.slice(0, 5).map((ingredient) => (
                <div key={ingredient.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <div className="text-gray-800">{ingredient.name}</div>
                    <div className="text-gray-600">
                      Stock: {ingredient.currentStock} {ingredient.unit} | Need: {ingredient.predictedNeed} {ingredient.unit}
                    </div>
                  </div>
                  <div className="text-red-600">Order: {ingredient.suggestedOrder} {ingredient.unit}</div>
                </div>
              ))}
              <Button 
                onClick={() => onNavigate('forecast')}
                variant="outline" 
                className="w-full mt-4"
              >
                View Full Forecast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => onNavigate('forecast')}
              className="bg-green-600 hover:bg-green-700 h-auto py-6 flex flex-col gap-2"
            >
              <Brain className="w-6 h-6" />
              <span>Generate Forecast</span>
            </Button>
            <Button 
              onClick={() => onNavigate('orders')}
              className="bg-blue-600 hover:bg-blue-700 h-auto py-6 flex flex-col gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Create Order</span>
            </Button>
            <Button 
              onClick={() => onNavigate('inventory')}
              className="bg-purple-600 hover:bg-purple-700 h-auto py-6 flex flex-col gap-2"
            >
              <Package className="w-6 h-6" />
              <span>View Inventory</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
