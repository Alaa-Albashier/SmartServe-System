import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Eye, Plus } from 'lucide-react';
import { mockOrders, mockIngredients } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export function OrdersPage() {
  const [isAutoOrderOpen, setIsAutoOrderOpen] = useState(false);

  const pendingOrders = mockOrders.filter(o => o.status === 'pending');
  const completedOrders = mockOrders.filter(o => o.status === 'delivered');

  const lowStockItems = mockIngredients.filter(i => i.status === 'shortage' && i.suggestedOrder > 0);

  const handleCreateAutoOrder = () => {
    toast.success('Auto-order created and sent to suppliers!');
    setIsAutoOrderOpen(false);
  };

  const handleConfirmDelivery = (orderId: string) => {
    toast.success(`Order ${orderId} marked as delivered!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Supplier Order Management</CardTitle>
              <CardDescription>Manage and track orders to suppliers</CardDescription>
            </div>
            <Dialog open={isAutoOrderOpen} onOpenChange={setIsAutoOrderOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Auto-Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Automatic Order</DialogTitle>
                  <DialogDescription>
                    Based on forecast, the following items need restocking
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Order Qty</TableHead>
                        <TableHead>Est. Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.currentStock} {item.unit}</TableCell>
                          <TableCell>{item.suggestedOrder} {item.unit}</TableCell>
                          <TableCell>PKR {(item.suggestedOrder * 40).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Estimated Cost:</span>
                      <span className="text-gray-900">
                        PKR {lowStockItems.reduce((sum, item) => sum + (item.suggestedOrder * 40), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button onClick={handleCreateAutoOrder} className="w-full bg-green-600 hover:bg-green-700">
                    Send Order to Suppliers
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Orders ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed Orders ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders awaiting delivery confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.supplierName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.totalItems}</TableCell>
                      <TableCell>PKR {order.totalCost.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.id}</DialogTitle>
                                <DialogDescription>
                                  Supplier: {order.supplierName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Item</TableHead>
                                      <TableHead>Quantity</TableHead>
                                      <TableHead>Price</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {order.items.map((item, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{item.ingredient}</TableCell>
                                        <TableCell>{item.quantity} {item.unit}</TableCell>
                                        <TableCell>PKR {item.price}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleConfirmDelivery(order.id)}
                          >
                            Confirm Delivery
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>Delivered and confirmed orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.supplierName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.totalItems}</TableCell>
                      <TableCell>PKR {order.totalCost.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                              <DialogDescription>
                                Supplier: {order.supplierName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.items.map((item, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>{item.ingredient}</TableCell>
                                      <TableCell>{item.quantity} {item.unit}</TableCell>
                                      <TableCell>PKR {item.price}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
