import React from 'react';
import type { OrderStatus } from '../../types/order.types';
import { Search, Filter,  X } from 'lucide-react';

interface OrderFiltersProps {
  searchQuery: string;
  statusFilter: OrderStatus | 'all';
  typeFilter: 'all' | 'retail' | 'distributor';
  onSearchChange: (query: string) => void;
  onStatusChange: (status: OrderStatus | 'all') => void;
  onTypeChange: (type: 'all' | 'retail' | 'distributor') => void;
  onClearFilters: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchQuery,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery || statusFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-800 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as OrderStatus | 'all')}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">⏳ Pending</option>
            <option value="confirmed">✓ Confirmed</option>
            <option value="processing">📦 Processing</option>
            <option value="shipped">🚚 Shipped</option>
            <option value="delivered">✅ Delivered</option>
            <option value="cancelled">❌ Cancelled</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value as 'all' | 'retail' | 'distributor')}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="retail">🛒 Retail Orders</option>
            <option value="distributor">🏢 Distributor Orders</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <p className="text-sm text-gray-400 w-full mb-2">Quick Filters:</p>
        <button
          onClick={() => onStatusChange('pending')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            statusFilter === 'pending'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => onStatusChange('confirmed')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            statusFilter === 'confirmed'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
          }`}
        >
          Confirmed
        </button>
        <button
          onClick={() => onTypeChange('distributor')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            typeFilter === 'distributor'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
          }`}
        >
          Distributors
        </button>
        <button
          onClick={() => onStatusChange('shipped')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            statusFilter === 'shipped'
              ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
          }`}
        >
          Shipped
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;