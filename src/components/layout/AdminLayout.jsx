import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  TrendingUp,
  Package,
  Clock,
  Store
} from 'lucide-react';

export const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const { products, orders, b2bLeads, navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-8 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-kb-gold text-slate-900 font-heading font-extrabold flex items-center justify-center text-lg">
              KB
            </div>
            <div>
              <span className="font-heading font-bold text-base text-white block">KB Admin</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Management Portal
              </span>
            </div>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
              activeTab === 'products'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
              activeTab === 'dashboard'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
              activeTab === 'orders'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
              activeTab === 'leads'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>B2B Leads ({b2bLeads.length})</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={() => navigateTo('home')}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 text-kb-gold hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <Store className="w-4 h-4" />
            <span>Back to Storefront</span>
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
