import React from 'react';
import type { Order, OrderStatus } from '../../types/order.types';
import { 
  Package, 
  MapPin, 
  Phone, 
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye
} from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onViewDetails: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange, onViewDetails }) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'shipped': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Order ID</p>
          <p className="text-sm font-mono text-white">{order.id.substring(0, 8)}...</p>
        </div>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          {order.status}
        </span>
      </div>

      {/* Customer Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
            <span className="text-yellow-400 font-bold text-sm">
              {order.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{order.fullName}</p>
            <p className="text-xs text-gray-400">{order.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <Phone className="w-4 h-4" />
          <p className="text-xs">{order.phone}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <p className="text-xs">{order.city}, {order.province}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">Type</p>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
              order.orderType === 'retail' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-purple-500/20 text-purple-400'
            }`}>
              {order.orderType}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Quantity</p>
            <p className="text-sm font-semibold text-white">{order.quantity} packs</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-400 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-yellow-400">₱{order.totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-400 mb-4">
        <Clock className="w-4 h-4" />
        <p className="text-xs">
          {order.createdAt.toDate().toLocaleDateString()} at {order.createdAt.toDate().toLocaleTimeString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(order)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-semibold transition-colors"
        >
          <Eye className="w-4 h-4" />
          Details
        </button>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
          className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default OrderCard;