import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { RefreshCw } from 'lucide-react';
import { mockIngredients } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export function ForecastPage() {
  const [forecastRange, setForecastRange] = useState('7');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateForecast = () => {
    setIsGenerating(true);
    toast.success('Generating forecast based on sales data...');
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Forecast generated successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ingredient Forecast</CardTitle>
              <CardDescription>AI-powered predictions based on sales data and trends</CardDescription>
            </div>
            <div className="flex gap-3 items-center">
              <Select value={forecastRange} onValueChange={setForecastRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days Forecast</SelectItem>
                  <SelectItem value="30">30 Days Forecast</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleGenerateForecast}
                disabled={isGenerating}
                className="bg-green-600 hover:bg-green-700"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                Generate Forecast
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{mockIngredients.length} items</div>
            <p className="text-gray-600 mt-1">Being tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Shortage Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">
              {mockIngredients.filter(i => i.status === 'shortage').length} items
            </div>
            <p className="text-red-600 mt-1">Need immediate ordering</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Well Stocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">
              {mockIngredients.filter(i => i.status === 'ok').length} items
            </div>
            <p className="text-green-600 mt-1">Sufficient stock levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Table */}
      <Card>
        <CardHeader>
          <CardTitle>Forecast Results</CardTitle>
          <CardDescription>Predicted ingredient needs for the next {forecastRange} days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Predicted Need</TableHead>
                <TableHead>Suggested Order Qty</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIngredients.map((ingredient) => (
                <TableRow 
                  key={ingredient.id}
                  className={ingredient.status === 'shortage' ? 'bg-red-50' : 'bg-green-50'}
                >
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>
                    {ingredient.currentStock} {ingredient.unit}
                  </TableCell>
                  <TableCell>
                    {ingredient.predictedNeed} {ingredient.unit}
                  </TableCell>
                  <TableCell>
                    {ingredient.suggestedOrder > 0 ? (
                      <span>{ingredient.suggestedOrder} {ingredient.unit}</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ingredient.status === 'shortage' ? (
                      <Badge className="bg-red-100 text-red-800 border-red-200">Shortage</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 border-green-200">OK</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
