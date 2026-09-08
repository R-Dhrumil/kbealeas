import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { User, Package, MapPin, LogOut, Phone, Mail, Edit3, Plus } from 'lucide-react';

export const AccountView = () => {
  const { user, orders, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('orders'); // orders, profile, addresses

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 pb-4">
        <Badge brand="kb">CUSTOMER PORTAL</Badge>
        <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
          Welcome back, {user.name}!
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Account Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-100 shadow-kb-soft space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all ${
              activeTab === 'orders'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders & Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all ${
              activeTab === 'addresses'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Address Book ({user.addresses.length})</span>
          </button>

          <button
            onClick={() => navigateTo('auth')}
            className="w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 text-rose-600 hover:bg-rose-50 transition-all pt-4 border-t border-slate-100"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal border-b border-slate-100 pb-3">
                Order History & Status
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <Package className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-medium">No past orders found.</p>
                  <Button variant="primary" size="sm" onClick={() => navigateTo('catalog')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs">
                        <div>
                          <span className="font-heading font-bold text-base text-kb-charcoal block">
                            Order #{order.id}
                          </span>
                          <span className="text-slate-500">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-xs">
                            Status: {order.status}
                          </span>
                          <span className="font-heading font-bold text-base text-kb-green">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-slate-700">
                            <div>
                              <strong className="text-kb-green">{item.brandName}</strong> - {item.productName} ({item.packSize}) × {item.quantity}
                            </div>
                            <span className="font-semibold text-kb-charcoal">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                        <span>Payment: {order.paymentMethod}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateTo('order-success')}
                        >
                          View Live Tracking
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                  Personal Profile Information
                </h3>
                <Button variant="outline" size="sm" icon={Edit3}>
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                  <span className="text-xs text-slate-400 font-bold block">Full Name</span>
                  <span className="font-bold text-kb-charcoal text-base">{user.name}</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                  <span className="text-xs text-slate-400 font-bold block">Email Address</span>
                  <span className="font-bold text-kb-charcoal text-base">{user.email}</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                  <span className="text-xs text-slate-400 font-bold block">Phone Number</span>
                  <span className="font-bold text-kb-charcoal text-base">{user.phone}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                  Saved Address Book
                </h3>
                <Button variant="primary" size="sm" icon={Plus}>
                  Add New Address
                </Button>
              </div>

              <div className="space-y-4">
                {user.addresses.map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl border-2 border-kb-green/30 bg-kb-green/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-kb-charcoal">{addr.name}</span>
                      <span className="bg-kb-green text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        DEFAULT ADDRESS
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <span className="text-xs text-slate-500 block">Phone: {addr.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
