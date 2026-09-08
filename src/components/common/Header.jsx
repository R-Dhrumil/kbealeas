import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO, BRANDS } from '../../data/mockData';
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
  Building2,
  Sparkles,
  ArrowRight
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
    setSearchQuery
  } = useApp();

  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [activeHoverBrand, setActiveHoverBrand] = useState('vrinda');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-kb-green text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-kb-gold" />
              {COMPANY_INFO.tagline}
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline font-medium">
              Free Shipping Across India on Orders Above ₹999
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phones[0]}`}
              className="flex items-center gap-1 text-emerald-100 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-kb-gold" />
              <span>{COMPANY_INFO.phones[0]}</span>
            </a>
            <span className="text-emerald-300">|</span>
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1 text-kb-gold hover:text-amber-200 font-semibold transition-colors"
            >
              <Building2 className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

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

          {/* OUR BRANDS & PREMIXES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setIsBrandsDropdownOpen(true)}
            onMouseLeave={() => setIsBrandsDropdownOpen(false)}
          >
            <button
              onClick={() => navigateTo('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 hover:text-kb-green hover:bg-emerald-50/60 active:scale-95 active:bg-emerald-100/60 cursor-pointer ${
                activeView === 'catalog' || activeView.startsWith('brand-')
                  ? 'text-kb-green font-bold bg-emerald-50 border border-emerald-100 shadow-xs'
                  : 'text-slate-700 font-medium'
              }`}
            >
              <span>Our Brands & Premixes</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isBrandsDropdownOpen ? 'rotate-180 text-kb-green' : 'text-slate-400'}`} />
            </button>

            {/* 2-Column Mega Dropdown Menu */}
            {isBrandsDropdownOpen && (
              <div className="absolute top-full -left-4 w-[540px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 animate-fade-in z-50 grid grid-cols-12 gap-3">
                {/* Column 1: Brands List */}
                <div className="col-span-5 border-r border-slate-100 pr-2 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                    Select Brand
                  </span>

                  {Object.values(BRANDS).map((brand) => {
                    const isHovered = activeHoverBrand === brand.id;
                    return (
                      <div
                        key={brand.id}
                        onMouseEnter={() => setActiveHoverBrand(brand.id)}
                        onClick={() => {
                          setIsBrandsDropdownOpen(false);
                          navigateTo(`brand-${brand.id}`);
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between group active:scale-95 ${
                          isHovered
                            ? 'bg-slate-900 text-white font-bold shadow-sm'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: brand.themeColor }}
                          ></span>
                          <span className="font-heading text-xs font-bold leading-tight">
                            {brand.name}
                          </span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isHovered ? 'text-kb-gold translate-x-1' : 'text-slate-400'}`} />
                      </div>
                    );
                  })}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsBrandsDropdownOpen(false);
                        navigateTo('catalog');
                      }}
                      className="w-full text-left px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-kb-green font-bold text-xs rounded-xl flex items-center justify-between transition-colors active:scale-95"
                    >
                      <span>View All Premixes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Column 2: Premix Product List */}
                <div className="col-span-7 p-2 space-y-3 bg-slate-50/60 rounded-2xl border border-slate-100">
                  {(() => {
                    const activeBrandData = BRANDS[activeHoverBrand] || BRANDS.vrinda;
                    const brandProducts = products.filter((p) => p.brandId === activeBrandData.id);

                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded text-white"
                            style={{ backgroundColor: activeBrandData.themeColor }}
                          >
                            {activeBrandData.name}
                          </span>
                          <button
                            onClick={() => {
                              setIsBrandsDropdownOpen(false);
                              navigateTo(`brand-${activeBrandData.id}`);
                            }}
                            className="text-[11px] font-bold text-kb-green hover:underline active:scale-95 flex items-center gap-1"
                          >
                            Explore Brand
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                          {brandProducts.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => {
                                setIsBrandsDropdownOpen(false);
                                navigateTo('product-detail', { product: p });
                              }}
                              className="p-2 rounded-xl bg-white border border-slate-200/60 hover:border-kb-green hover:shadow-xs active:scale-98 transition-all cursor-pointer flex items-center gap-3 group"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-9 h-9 rounded-lg object-cover shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-xs text-kb-charcoal group-hover:text-kb-green transition-colors truncate">
                                  {p.name}
                                </h5>
                                <span className="text-[10px] text-slate-400 block truncate">
                                  "{p.tagline}"
                                </span>
                              </div>
                              <span className="font-heading font-bold text-xs text-kb-green shrink-0">
                                ₹{p.variants[0]?.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('wholesale')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 hover:text-kb-green hover:bg-emerald-50/60 active:scale-95 active:bg-emerald-100/60 cursor-pointer ${
              activeView === 'wholesale'
                ? 'text-kb-green font-bold bg-emerald-50 border border-emerald-100 shadow-xs'
                : 'text-slate-700 font-medium'
            }`}
          >
            Wholesale B2B
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

          <button
            onClick={() => navigateTo('account')}
            className="p-2 rounded-xl text-slate-600 hover:text-kb-green hover:bg-slate-100 transition-colors relative"
            title="Customer Account"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigateTo('wishlist')}
            className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsMiniCartOpen(true)}
            icon={ShoppingBag}
            className="relative"
          >
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-white/20 text-white text-xs font-bold px-1.5 py-0.5 rounded-md ml-1">
              {cartCount}
            </span>
          </Button>

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
              onClick={() => navigateTo('catalog')}
              className="text-left px-3 py-2 rounded-lg font-bold text-kb-green bg-emerald-50"
            >
              Shop All Premixes
            </button>

            {/* Mobile Brands List */}
            <div className="p-3 bg-slate-50 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                KB Brands & Premixes
              </span>

              {Object.values(BRANDS).map((b) => {
                const brandProducts = products.filter((p) => p.brandId === b.id);
                return (
                  <div key={b.id} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                    <div
                      onClick={() => navigateTo(`brand-${b.id}`)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.themeColor }}></span>
                        <span className="font-bold text-xs text-kb-charcoal">{b.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    <div className="pl-4 border-l-2 border-slate-100 space-y-1">
                      {brandProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => navigateTo('product-detail', { product: p })}
                          className="text-[11px] text-slate-600 hover:text-kb-green cursor-pointer py-0.5 flex justify-between"
                        >
                          <span>{p.name}</span>
                          <span className="font-bold text-slate-800">₹{p.variants[0]?.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => navigateTo('wholesale')}
              className={`text-left px-3 py-2 rounded-lg transition-all duration-200 active:scale-98 ${
                activeView === 'wholesale'
                  ? 'bg-emerald-50 text-kb-green font-bold border border-emerald-100'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-kb-green'
              }`}
            >
              Wholesale / B2B Inquiry
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`text-left px-3 py-2 rounded-lg transition-all duration-200 active:scale-98 ${
                activeView === 'about'
                  ? 'bg-emerald-50 text-kb-green font-bold border border-emerald-100'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-kb-green'
              }`}
            >
              About KB
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
