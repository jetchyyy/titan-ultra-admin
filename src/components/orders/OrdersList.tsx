import React, { useState, useMemo } from 'react';
import { useOrders } from '../../hooks/useOrders';
import type { Order, OrderStatus } from '../../types/order.types';
import OrderFilters from './OrderFilters';
import OrderCard from './OrderCard';
import OrderDetails from './OrderDetails';
import LoadingSpinner from '../common/LoadingSpinner';
import StatusBadge from '../common/StatusBadge';
import { 
  Package, 
  TrendingUp,
  ShoppingCart,
  Clock,
  Grid3x3,
  List,
  Download
} from 'lucide-react';

const OrdersListImproved: React.FC = () => {
  const { orders, loading, error, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'retail' | 'distributor'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesType = typeFilter === 'all' || order.orderType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [orders, searchQuery, statusFilter, typeFilter]);

  // Statistics
  const stats = useMemo(() => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
    const totalOrders = orders.length;
    const retailOrders = orders.filter(o => o.orderType === 'retail').length;

    return { pending, totalRevenue, totalOrders, retailOrders };
  }, [orders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleExport = () => {
    // Simple CSV export
    const csv = [
      ['Order ID', 'Customer', 'Email', 'Phone', 'Type', 'Quantity', 'Total', 'Status', 'Date'],
      ...filteredOrders.map(o => [
        o.id,
        o.fullName,
        o.email,
        o.phone,
        o.orderType,
        o.quantity,
        o.totalPrice,
        o.status,
        o.createdAt.toDate().toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading orders..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Error loading orders</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Orders Dashboard</h1>
          <p className="text-gray-400">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'} transition-colors`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'} transition-colors`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.totalOrders}</span>
          </div>
          <p className="text-gray-400 text-sm">Total Orders</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.pending}</span>
          </div>
          <p className="text-gray-400 text-sm">Pending Orders</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">₱{stats.totalRevenue.toLocaleString()}</span>
          </div>
          <p className="text-gray-400 text-sm">Total Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.retailOrders}</span>
          </div>
          <p className="text-gray-400 text-sm">Retail Orders</p>
        </div>
      </div>

      {/* Filters */}
      <OrderFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Orders Display */}
      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </div>
      ) : (
        // Table View
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Qty</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-white">{order.fullName}</p>
                        <p className="text-xs text-gray-400">{order.city}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-400">{order.email}</p>
                        <p className="text-xs text-gray-400">{order.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                          order.orderType === 'retail' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {order.orderType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-white">{order.quantity}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-yellow-400">
                          ₱{order.totalPrice.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-300">
                          {order.createdAt.toDate().toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-white transition-colors"
                          >
                            View
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs text-white focus:outline-none focus:border-yellow-400"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-gray-400">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>

      {/* Order Details Modal */}
      <OrderDetails
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrdersListImproved;