import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/mockData';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Sparkles,
  ArrowRight,
  Package,
  ShieldCheck
} from 'lucide-react';
import { Button } from './Button';

export const Header = () => {
  const {
    activeView,
    navigateTo,
    products,
    cartCount,
    wishlist,
    isMiniCartOpen,
    setIsMiniCartOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    user,
    logoutUser,
    openAuthModal
  } = useApp();

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* KB Brand Logo */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kb-green to-kb-green-light flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            KB
          </div>
          <div>
            <div className="font-heading font-extrabold text-xl text-kb-green tracking-tight leading-none">
              KB
            </div>
            <span className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase block mt-0.5">
              Beverage Premixes
            </span>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-700">
          <button
            onClick={() => navigateTo('home')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 hover:text-kb-green hover:bg-emerald-50/60 active:scale-95 active:bg-emerald-100/60 cursor-pointer ${
              activeView === 'home'
                ? 'text-kb-green font-bold bg-emerald-50 border border-emerald-100 shadow-xs'
                : 'text-slate-700 font-medium'
            }`}
          >
            Home
          </button>

          {/* SHOP BUTTON (WITHOUT DROPDOWN) */}
          <button
            onClick={() => navigateTo('catalog')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 hover:text-kb-green hover:bg-emerald-50/60 active:scale-95 active:bg-emerald-100/60 cursor-pointer ${
              activeView === 'catalog' || activeView === 'search' || activeView === 'product-detail'
                ? 'text-kb-green font-bold bg-emerald-50 border border-emerald-100 shadow-xs'
                : 'text-slate-700 font-medium'
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 hover:text-kb-green hover:bg-emerald-50/60 active:scale-95 active:bg-emerald-100/60 cursor-pointer ${
              activeView === 'about'
                ? 'text-kb-green font-bold bg-emerald-50 border border-emerald-100 shadow-xs'
                : 'text-slate-700 font-medium'
            }`}
          >
            About KB
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('contact-us');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigateTo('contact');
              }
            }}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 hover:text-kb-green hover:bg-emerald-50/60 active:scale-95 active:bg-emerald-100/60 cursor-pointer ${
              activeView === 'contact'
                ? 'text-kb-green font-bold bg-emerald-50 border border-emerald-100 shadow-xs'
                : 'text-slate-700 font-medium'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center relative max-w-[200px] md:max-w-[240px]"
          >
            <input
              type="text"
              placeholder="Search premixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100 border border-transparent rounded-xl text-xs focus:bg-white focus:border-kb-green focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          </form> */}

          {/* Account & User Section */}
          {!user?.isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Mini Cart Button */}
              <button
                onClick={() => setIsMiniCartOpen(true)}
                className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all cursor-pointer"
                title="My Cart"
              >
                <ShoppingBag className="w-4 h-4 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Sign In Button */}
              <button
                onClick={() => navigateTo('auth')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs bg-kb-green text-white hover:bg-emerald-700 shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-white" />
                <span>Sign In</span>
              </button>
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsAccountDropdownOpen(true)}
              onMouseLeave={() => setIsAccountDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('account')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all duration-200 active:scale-95 cursor-pointer ${
                  activeView === 'account' || activeView === 'wishlist' || activeView === 'cart'
                    ? 'bg-kb-green text-white border-kb-green shadow-md shadow-kb-green/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-kb-green/40 shadow-xs'
                }`}
                title="Account, Liked & Cart"
              >
                <div className="w-6 h-6 rounded-full bg-kb-green/10 text-kb-green flex items-center justify-center font-bold">
                  <User className="w-3.5 h-3.5 text-inherit" />
                </div>
                <span className="text-xs font-bold hidden sm:inline">
                  {user?.name ? user.name.split(' ')[0] : 'Account'}
                </span>

                {/* Combined indicator badges for Cart & Like */}
                {(cartCount > 0 || wishlist.length > 0) && (
                  <div className="flex items-center gap-1">
                    {wishlist.length > 0 && (
                      <span
                        className="bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                        title={`${wishlist.length} liked items`}
                      >
                        <Heart className="w-2.5 h-2.5 fill-white" />
                      </span>
                    )}
                    {cartCount > 0 && (
                      <span
                        className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs"
                        title={`${cartCount} items in cart`}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                )}

                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : 'text-slate-400'}`} />
              </button>

              {/* Account Dropdown Menu */}
              {isAccountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 animate-fade-in z-50 space-y-1.5">
                  {/* Account Profile Header */}
                  <div
                    onClick={() => {
                      setIsAccountDropdownOpen(false);
                      navigateTo('account');
                    }}
                    className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50/60 rounded-2xl cursor-pointer hover:shadow-xs transition-all border border-emerald-100/60"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Customer Account</span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-heading font-extrabold text-sm text-kb-charcoal truncate">{user?.name || 'Customer'}</span>
                      <span className="text-[10px] text-kb-green font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-xs">View</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    {/* Cart Item */}
                    <button
                      onClick={() => {
                        setIsAccountDropdownOpen(false);
                        setIsMiniCartOpen(true);
                      }}
                      className="w-full p-2.5 rounded-2xl hover:bg-emerald-50/70 text-left flex items-center justify-between transition-all group active:scale-98 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 group-hover:text-kb-green block">My Cart</span>
                          <span className="text-[10px] text-slate-400 block">View shopping basket</span>
                        </div>
                      </div>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                        {cartCount} {cartCount === 1 ? 'item' : 'items'}
                      </span>
                    </button>

                    {/* Like Button (Wishlist) Item */}
                    <button
                      onClick={() => {
                        setIsAccountDropdownOpen(false);
                        navigateTo('wishlist');
                      }}
                      className="w-full p-2.5 rounded-2xl hover:bg-rose-50/70 text-left flex items-center justify-between transition-all group active:scale-98 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Heart className="w-4 h-4 fill-rose-500/20" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 group-hover:text-rose-600 block">Liked Premixes</span>
                          <span className="text-[10px] text-slate-400 block">Saved items & favorites</span>
                        </div>
                      </div>
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {wishlist.length} liked
                      </span>
                    </button>

                    {/* Orders & Tracking */}
                    <button
                      onClick={() => {
                        setIsAccountDropdownOpen(false);
                        navigateTo('account');
                      }}
                      className="w-full p-2.5 rounded-2xl hover:bg-slate-50 text-left flex items-center justify-between transition-all group active:scale-98 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">Order History</span>
                          <span className="text-[10px] text-slate-400 block">Track shipments & receipts</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Admin Dashboard Entry (if Admin) */}
                    {user?.role === 'Admin' && (
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          navigateTo('admin');
                        }}
                        className="w-full p-2.5 rounded-2xl bg-purple-50/70 hover:bg-purple-100/70 text-left flex items-center justify-between transition-all group active:scale-98 cursor-pointer border border-purple-200/60"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-purple-900 block">Admin Center</span>
                            <span className="text-[10px] text-purple-700 block">Manage catalog & orders</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-700 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs px-2">
                    <button
                      onClick={() => {
                        setIsAccountDropdownOpen(false);
                        navigateTo('account');
                      }}
                      className="text-slate-500 hover:text-kb-green font-semibold text-[11px] cursor-pointer"
                    >
                      Manage Account
                    </button>
                    <button
                      onClick={() => {
                        setIsAccountDropdownOpen(false);
                        logoutUser();
                      }}
                      className="text-rose-600 hover:text-rose-700 font-semibold text-[11px] cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-kb-green rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-4 animate-fade-in space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search premixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          <div className="flex flex-col gap-2 font-medium text-slate-700">
            <button
              onClick={() => navigateTo('home')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('catalog');
              }}
              className={`text-left px-3 py-2 rounded-lg transition-all duration-200 active:scale-98 ${
                activeView === 'catalog' || activeView === 'search' || activeView === 'product-detail'
                  ? 'bg-emerald-50 text-kb-green font-bold border border-emerald-100'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-kb-green'
              }`}
            >
              Shop
            </button>

            {/* Mobile Account Section Housing Cart & Like */}
            <div className="p-3 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Account & Saved
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsMiniCartOpen(true);
                  }}
                  className="p-2.5 bg-white rounded-xl border border-slate-200 text-left flex items-center justify-between active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-kb-green" />
                    <span className="text-xs font-bold text-slate-700">My Cart</span>
                  </div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                    {cartCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('wishlist');
                  }}
                  className="p-2.5 bg-white rounded-xl border border-slate-200 text-left flex items-center justify-between active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-bold text-slate-700">Liked</span>
                  </div>
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {wishlist.length}
                  </span>
                </button>
              </div>

              {!user?.isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('auth');
                  }}
                  className="w-full text-left p-3 bg-kb-green text-white rounded-xl flex items-center justify-between text-xs font-bold active:scale-98 shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-white" />
                    <span>Sign In / Create Account</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('account');
                  }}
                  className="w-full text-left p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 active:scale-98 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Customer Profile ({user?.name || 'Account'})</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('catalog');
              }}
              className={`text-left px-3 py-2 rounded-lg transition-all duration-200 active:scale-98 ${
                activeView === 'catalog' || activeView === 'search' || activeView === 'product-detail'
                  ? 'bg-emerald-50 text-kb-green font-bold border border-emerald-100'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-kb-green'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('about');
              }}
              className={`text-left px-3 py-2 rounded-lg transition-all duration-200 active:scale-98 ${
                activeView === 'about'
                  ? 'bg-emerald-50 text-kb-green font-bold border border-emerald-100'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-kb-green'
              }`}
            >
              About KB
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById('contact-us');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo('contact');
                }
              }}
              className={`text-left px-3 py-2 rounded-lg transition-all duration-200 active:scale-98 ${
                activeView === 'contact'
                  ? 'bg-emerald-50 text-kb-green font-bold border border-emerald-100'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-kb-green'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900 text-kb-gold font-bold"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
