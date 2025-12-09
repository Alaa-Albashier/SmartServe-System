import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Plus, Edit, Trash2, Download } from 'lucide-react';
import { mockIngredients, mockWastage } from '../data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { exportToCSV, exportToExcel } from '../utils/exportUtils';

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredIngredients = mockIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIngredient = () => {
    toast.success('New ingredient added successfully!');
    setIsAddDialogOpen(false);
  };

  const handleEdit = (id: string) => {
    toast.info(`Editing ingredient ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.success('Ingredient deleted successfully!');
  };

  const handleExportInventory = (format: 'csv' | 'excel') => {
    try {
      const dataToExport = filteredIngredients.map(ingredient => ({
        'Ingredient Name': ingredient.name,
        'Current Stock': ingredient.currentStock,
        'Unit': ingredient.unit,
        'Minimum Level': ingredient.minimumLevel,
        'Last Updated': ingredient.lastUpdated,
        'Status': ingredient.currentStock < ingredient.minimumLevel ? 'Low Stock' : 'In Stock',
      }));

      const filename = `inventory_report_${new Date().toISOString().split('T')[0]}`;

      if (format === 'csv') {
        exportToCSV(dataToExport, filename);
      } else {
        exportToExcel(dataToExport, filename, 'Inventory');
      }

      toast.success(`Inventory exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error('Failed to export inventory');
      console.error('Export error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track and manage your ingredient stock levels</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleExportInventory('csv')} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => handleExportInventory('excel')} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Ingredient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Ingredient</DialogTitle>
                    <DialogDescription>Enter the details of the new ingredient</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ingredient Name</Label>
                      <Input id="name" placeholder="e.g., Basmati Rice" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Current Quantity</Label>
                        <Input id="quantity" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input id="unit" placeholder="kg, L, etc." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minimum">Minimum Level</Label>
                      <Input id="minimum" type="number" placeholder="0" />
                    </div>
                    <Button onClick={handleAddIngredient} className="w-full bg-green-600 hover:bg-green-700">
                      Add Ingredient
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>All ingredients and stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Current Qty</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Minimum Level</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>
                    <span className={ingredient.currentStock < ingredient.minimumLevel ? 'text-red-600' : ''}>
                      {ingredient.currentStock}
                    </span>
                  </TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                  <TableCell>{ingredient.minimumLevel}</TableCell>
                  <TableCell>{ingredient.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(ingredient.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Wastage Log */}
      <Card>
        <CardHeader>
          <CardTitle>Wastage Log</CardTitle>
          <CardDescription>Track and analyze food wastage</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWastage.map((waste) => (
                <TableRow key={waste.id}>
                  <TableCell>{waste.item}</TableCell>
                  <TableCell>{waste.quantity} kg</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                      {waste.reason}
                    </span>
                  </TableCell>
                  <TableCell>{waste.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
