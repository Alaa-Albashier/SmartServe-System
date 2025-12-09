import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download } from 'lucide-react';
import { salesChartData, topMeals, mockWastage } from '../data/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useState } from 'react';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';

const COLORS = ['#2ECC71', '#3498DB', '#9B59B6', '#E74C3C', '#F39C12'];

export function ReportsPage() {
  const [currentTab, setCurrentTab] = useState('sales');

  const handleExport = (format: string) => {
    try {
      // Determine which data to export based on current tab
      let dataToExport: any[] = [];
      let reportTitle = '';

      switch (currentTab) {
        case 'sales':
          dataToExport = salesChartData.map(item => ({
            Date: item.date,
            'Revenue (PKR)': item.sales,
          }));
          reportTitle = 'Sales Report';
          break;
        case 'usage':
          dataToExport = ingredientUsageData.map(item => ({
            Ingredient: item.name,
            'Usage (kg)': item.usage,
          }));
          reportTitle = 'Ingredient Usage Report';
          break;
        case 'wastage':
          dataToExport = wastageData.map(item => ({
            Item: item.name,
            'Quantity (kg)': item.value,
          }));
          reportTitle = 'Wastage Report';
          break;
      }

      const filename = `${reportTitle.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`;

      if (format === 'PDF') {
        exportToPDF(dataToExport, filename, reportTitle);
      } else if (format === 'Excel') {
        exportToExcel(dataToExport, filename, reportTitle);
      }

      toast.success(`${reportTitle} exported successfully as ${format}!`);
    } catch (error) {
      toast.error('Failed to export report');
      console.error('Export error:', error);
    }
  };

  const wastageData = mockWastage.map(w => ({
    name: w.item,
    value: w.quantity
  }));

  const ingredientUsageData = [
    { name: 'Rice', usage: 85 },
    { name: 'Chicken', usage: 72 },
    { name: 'Vegetables', usage: 65 },
    { name: 'Spices', usage: 45 },
    { name: 'Oil', usage: 38 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>Comprehensive insights into your restaurant operations</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleExport('PDF')} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={() => handleExport('Excel')} className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Reports Tabs */}
      <Tabs defaultValue="sales" className="space-y-4" onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="usage">Ingredient Usage</TabsTrigger>
          <TabsTrigger value="wastage">Wastage Report</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Last 30 days revenue in PKR</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#2ECC71" strokeWidth={2} name="Sales (PKR)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>Most popular meals this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topMeals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#2ECC71" name="Units Sold" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-gray-600">Total Revenue</div>
                  <div className="text-gray-900 mt-1">PKR 215,000</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-gray-600">Total Orders</div>
                  <div className="text-gray-900 mt-1">1,245</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-gray-600">Avg Order Value</div>
                  <div className="text-gray-900 mt-1">PKR 173</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-gray-600">Growth</div>
                  <div className="text-gray-900 mt-1">+12.5%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ingredient Usage Comparison</CardTitle>
                <CardDescription>Consumption by category (kg)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ingredientUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" fill="#3498DB" name="Usage (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Distribution</CardTitle>
                <CardDescription>Percentage breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ingredientUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="usage"
                    >
                      {ingredientUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wastage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wastage by Item</CardTitle>
                <CardDescription>Food waste breakdown (kg)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={wastageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value} kg`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {wastageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wastage Summary</CardTitle>
                <CardDescription>Key metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-gray-600">Total Wastage (This Month)</div>
                    <div className="text-gray-900 mt-1">3.5 kg</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-gray-600">Estimated Cost Impact</div>
                    <div className="text-gray-900 mt-1">PKR 875</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-gray-600">Most Wasted Item</div>
                    <div className="text-gray-900 mt-1">Tomatoes (2 kg)</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-gray-600">Improvement vs Last Month</div>
                    <div className="text-gray-900 mt-1">-15% (Better)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
