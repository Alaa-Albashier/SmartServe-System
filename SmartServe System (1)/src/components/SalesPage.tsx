import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download } from 'lucide-react';
import { mockSalesData, salesChartData } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { exportSalesData } from '../utils/exportUtils';
import { toast } from 'sonner';

export function SalesPage() {
  const [dateRange, setDateRange] = useState('30');
  const [mealFilter, setMealFilter] = useState('all');

  const filteredSales = mealFilter === 'all'
    ? mockSalesData
    : mockSalesData.filter(sale => sale.itemSold === mealFilter);

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.revenue, 0);

  const handleExport = () => {
    try {
      exportSalesData(filteredSales, 'csv');
      toast.success('Sales data exported successfully!');
    } catch (error) {
      toast.error('Failed to export sales data');
      console.error('Export error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Export */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Track your restaurant's sales performance</CardDescription>
            </div>
            <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="text-gray-700 mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-gray-700 mb-2 block">Filter by Meal</label>
              <Select value={mealFilter} onValueChange={setMealFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Meals</SelectItem>
                  <SelectItem value="Chicken Biryani">Chicken Biryani</SelectItem>
                  <SelectItem value="Chicken Karahi">Chicken Karahi</SelectItem>
                  <SelectItem value="Roti">Roti</SelectItem>
                  <SelectItem value="Dal Makhani">Dal Makhani</SelectItem>
                  <SelectItem value="Mutton Korma">Mutton Korma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend (Last 30 Days)</CardTitle>
          <CardDescription>Daily revenue in PKR</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2ECC71" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="text-gray-700">Total Revenue ({dateRange} days)</div>
            <div className="text-gray-900 mt-1">PKR {totalRevenue.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Details</CardTitle>
          <CardDescription>Individual transaction records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item Sold</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.itemSold}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>PKR {sale.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
