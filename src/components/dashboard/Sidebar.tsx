import React from 'react';
import { 
  ShoppingCart, 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  TrendingUp,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: ShoppingCart, label: 'Orders', active: true },
    { icon: Package, label: 'Products', active: false },
    { icon: Users, label: 'Customers', active: false },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-gray-900 to-black border-r border-yellow-400/30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo/Brand */}
        <div className="flex items-center justify-between p-6 border-b border-yellow-400/30">
          <div>
            <h1 className="text-2xl font-black text-white">Bloody Mary</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-yellow-400/30">
          <div className="bg-gradient-to-br from-yellow-400/10 to-red-600/10 border border-yellow-400/30 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Need help?</p>
            <p className="text-sm font-semibold text-white">Contact Support</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;