import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

const mockSuppliers = [
  { id: '1', name: 'Fresh Farms Supply', contact: '+92-300-1234567', email: 'contact@freshfarms.pk' },
  { id: '2', name: 'Green Valley Organics', contact: '+92-321-9876543', email: 'info@greenvalley.pk' },
  { id: '3', name: 'Spice Masters', contact: '+92-333-5551234', email: 'orders@spicemasters.pk' },
];

export function SettingsPage() {
  const [posConnected, setPosConnected] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully!');
  };

  const handleTogglePOS = (checked: boolean) => {
    setPosConnected(checked);
    if (checked) {
      toast.success('POS system connected successfully!');
    } else {
      toast.info('POS system disconnected.');
    }
  };

  const handleAddSupplier = () => {
    toast.success('Supplier added successfully!');
    setIsAddSupplierOpen(false);
  };

  const handleEditSupplier = (id: string) => {
    toast.info(`Editing supplier ${id}`);
  };

  const handleDeleteSupplier = (id: string) => {
    toast.success('Supplier removed successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Restaurant Owner" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="owner@restaurant.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+92-300-1234567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurant">Restaurant Name</Label>
              <Input id="restaurant" defaultValue="Spice Garden Restaurant" />
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" />
            </div>
          </div>
          <Button onClick={handleChangePassword} className="bg-green-600 hover:bg-green-700">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* POS Integration */}
      <Card>
        <CardHeader>
          <CardTitle>POS System Integration</CardTitle>
          <CardDescription>Connect to your existing point-of-sale system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-gray-800">Connect to Existing Sales Data</div>
              <div className="text-gray-600">Automatically sync sales data from your POS system</div>
            </div>
            <Switch checked={posConnected} onCheckedChange={handleTogglePOS} />
          </div>
          {posConnected && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-800">POS System Connected</div>
              <div className="text-green-700 mt-1">Last sync: 2 minutes ago</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supplier Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Suppliers</CardTitle>
              <CardDescription>Add, edit, or remove your suppliers</CardDescription>
            </div>
            <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>Enter supplier details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier-name">Supplier Name</Label>
                    <Input id="supplier-name" placeholder="e.g., Fresh Foods Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier-contact">Contact Number</Label>
                    <Input id="supplier-contact" placeholder="+92-300-1234567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier-email">Email Address</Label>
                    <Input id="supplier-email" type="email" placeholder="contact@supplier.com" />
                  </div>
                  <Button onClick={handleAddSupplier} className="w-full bg-green-600 hover:bg-green-700">
                    Add Supplier
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleEditSupplier(supplier.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleDeleteSupplier(supplier.id)}
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
    </div>
  );
}
