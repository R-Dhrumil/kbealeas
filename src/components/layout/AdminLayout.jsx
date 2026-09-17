import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  TrendingUp,
  Package,
  Clock,
  Store,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const { products, orders, b2bLeads, navigateTo, logoutUser } = useApp();

  return (
    <div className="min-h-screen bg-kb-cream text-kb-charcoal flex flex-col lg:flex-row font-sans">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-white p-6 border-b lg:border-b-0 lg:border-r border-slate-100 shadow-sm space-y-8 shrink-0 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Logo Branding */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-kb-green to-kb-green-light text-white font-heading font-extrabold flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              KB
            </div>
            <div>
              <span className="font-heading font-extrabold text-base text-kb-charcoal block tracking-tight">
                KB Admin Portal
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Store Operations
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-kb-green text-white shadow-md shadow-kb-green/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-kb-charcoal'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Product Catalog</span>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  activeTab === 'products'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-kb-green text-white shadow-md shadow-kb-green/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-kb-charcoal'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Executive Metrics</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-kb-green text-white shadow-md shadow-kb-green/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-kb-charcoal'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>Customer Orders</span>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  activeTab === 'orders'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-kb-green text-white shadow-md shadow-kb-green/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-kb-charcoal'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Wholesale Leads</span>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  activeTab === 'leads'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {b2bLeads.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-kb-green text-xs font-bold flex items-center justify-center gap-2 border border-slate-200/80 transition-all cursor-pointer"
          >
            <Store className="w-4 h-4 text-kb-green" />
            <span>Back to Storefront</span>
          </button>

          <button
            onClick={logoutUser}
            className="w-full px-4 py-2.5 rounded-2xl text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Admin Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
