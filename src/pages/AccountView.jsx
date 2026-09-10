import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/common/ProductCard';
import {
  User,
  Package,
  MapPin,
  LogOut,
  Phone,
  Mail,
  Edit3,
  Plus,
  ShoppingBag,
  Heart,
  Trash2,
  ArrowRight,
  Minus
} from 'lucide-react';

export const AccountView = () => {
  const {
    user,
    orders,
    navigateTo,
    cart,
    wishlist,
    products,
    removeFromCart,
    updateCartQuantity,
    cartTotal
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // orders, cart, wishlist, profile, addresses

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

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
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'orders'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Orders & Tracking</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'cart'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>My Shopping Cart</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'cart' ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
            }`}>
              {cart.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'wishlist'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4" />
              <span>Liked Premixes</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'wishlist' ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
            }`}>
              {wishlist.length}
            </span>
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

          {/* TAB 2: MY CART */}
          {activeTab === 'cart' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                    My Shopping Cart ({cart.length} {cart.length === 1 ? 'Product' : 'Products'})
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Items added to your current session
                  </p>
                </div>
                {cart.length > 0 && (
                  <Button variant="primary" size="sm" onClick={() => navigateTo('checkout')} icon={ArrowRight}>
                    Proceed to Checkout
                  </Button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-kb-charcoal">Your Shopping Cart is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Explore our handcrafted tea, coffee, and iced beverage premixes and add them to your cart!
                  </p>
                  <Button variant="primary" size="sm" onClick={() => navigateTo('catalog')}>
                    Explore Premixes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="divide-y divide-slate-100">
                    {cart.map((item, idx) => (
                      <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-kb-green tracking-wider block">
                              {item.product.brandId?.toUpperCase()}
                            </span>
                            <h4 className="font-heading font-bold text-sm text-kb-charcoal">
                              {item.product.name}
                            </h4>
                            <span className="text-xs text-slate-400">
                              Pack: {item.variant.packSize} • ₹{item.variant.price} each
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-5">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-slate-600 hover:text-kb-green transition-colors text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-slate-600 hover:text-kb-green transition-colors text-xs font-bold"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <span className="font-heading font-extrabold text-sm text-kb-green block">
                              ₹{item.variant.price * item.quantity}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.variant.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-xl hover:bg-rose-50"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div>
                      <span className="text-xs text-slate-500 block">Total Cart Value</span>
                      <span className="font-heading font-extrabold text-xl text-kb-charcoal">
                        ₹{cartTotal}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button variant="outline" size="sm" onClick={() => navigateTo('cart')} className="w-full sm:w-auto">
                        Open Full Cart
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => navigateTo('checkout')} icon={ArrowRight} className="w-full sm:w-auto">
                        Checkout Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIKED / WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                    Liked Premixes ({favoritedProducts.length} Saved)
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Your personal favorite blends and recipes
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateTo('catalog')}>
                  Browse More
                </Button>
              </div>

              {favoritedProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center font-bold">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-kb-charcoal">No Liked Premixes Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click the heart icon on any premix flavor to save it to your favorites list!
                  </p>
                  <Button variant="primary" size="sm" onClick={() => navigateTo('catalog')}>
                    Explore Flavors
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE */}
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
