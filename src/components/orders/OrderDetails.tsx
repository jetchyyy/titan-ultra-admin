import React from 'react';
import type { Order } from '../../types/order.types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Calendar,
  MessageSquare,

} from 'lucide-react';

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-t-2xl">
          <h2 className="text-2xl font-black text-white mb-2">Order Details</h2>
          <p className="text-white/90 font-mono text-sm">ID: {order.id}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-yellow-400" />
              Customer Information
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-400 font-bold text-lg">
                    {order.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Full Name</p>
                  <p className="text-white font-semibold">{order.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{order.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{order.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              Shipping Address
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-white">{order.address}</p>
              <p className="text-white">{order.city}, {order.province} {order.zipCode}</p>
            </div>
          </div>

          {/* Order Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-yellow-400" />
              Order Information
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Order Type</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.orderType === 'retail' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {order.orderType.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Quantity</span>
                <span className="text-white font-semibold">{order.quantity} packs</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price per Pack</span>
                <span className="text-white font-semibold">₱{order.pricePerPack}</span>
              </div>

              <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total Amount</span>
                <span className="text-2xl font-black text-yellow-400">₱{order.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {order.message && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                Additional Notes
              </h3>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-white">{order.message}</p>
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              Order Timeline
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Order Placed</p>
                  <p className="text-white text-sm">
                    {order.createdAt.toDate().toLocaleDateString()} at {order.createdAt.toDate().toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  order.status === 'pending' ? 'bg-gray-600' : 'bg-yellow-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Current Status</p>
                  <p className="text-white text-sm font-semibold uppercase">{order.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;