import React from 'react';
import type { OrderStatus } from '../../types/order.types';
import { 
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package
} from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusIcon = (status: OrderStatus) => {
    const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    
    switch (status) {
      case 'pending': return <Clock className={iconSize} />;
      case 'confirmed': return <CheckCircle className={iconSize} />;
      case 'processing': return <Package className={iconSize} />;
      case 'shipped': return <Truck className={iconSize} />;
      case 'delivered': return <CheckCircle className={iconSize} />;
      case 'cancelled': return <XCircle className={iconSize} />;
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

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-2 text-sm'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-semibold ${getStatusColor(status)} ${sizeClasses[size]}`}>
      {getStatusIcon(status)}
      {status}
    </span>
  );
};

export default StatusBadge;