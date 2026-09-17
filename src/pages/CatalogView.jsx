import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BRANDS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { Filter, X, SlidersHorizontal, Sparkles, Check } from 'lucide-react';

export const CatalogView = () => {
  const {
    products,
    selectedBrandFilter,
    setSelectedBrandFilter,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(700);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  // Filtered & Sorted Products by Brand, Price, Best Seller, and Search
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Brand Filter
        if (selectedBrandFilter !== 'all' && p.brandId !== selectedBrandFilter) {
          return false;
        }
        // Price Filter
        const price = p.variants[0]?.price || 0;
        if (price > maxPrice) {
          return false;
        }
        // Best Seller Filter
        if (onlyBestSeller && !p.isBestSeller) {
          return false;
        }
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brandName.toLowerCase().includes(q);
          const matchTag = p.tagline.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchTag) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.variants[0].price - b.variants[0].price;
        if (sortBy === 'price-high') return b.variants[0].price - a.variants[0].price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured
      });
  }, [products, selectedBrandFilter, maxPrice, onlyBestSeller, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedBrandFilter('all');
    setMaxPrice(700);
    setOnlyBestSeller(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedBrandFilter !== 'all' ||
    maxPrice < 700 ||
    onlyBestSeller ||
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* BRAND-ONLY FILTER SIDEBAR */}
        <aside
          className={`lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-kb-soft space-y-6 ${
            isFilterMobileOpen
              ? 'fixed inset-0 z-50 overflow-y-auto m-4 shadow-2xl'
              : 'hidden lg:block sticky top-24'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-heading font-bold text-base text-kb-charcoal">
              <SlidersHorizontal className="w-4 h-4 text-kb-green" />
              <span>Brand Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear All
              </button>
            )}
            {isFilterMobileOpen && (
              <button onClick={() => setIsFilterMobileOpen(false)} className="lg:hidden p-1">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            )}
          </div>

          {/* Filter Group: Brand Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Select Brand
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedBrandFilter('all')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBrandFilter === 'all'
                    ? 'bg-kb-green text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                All Brands (KB)
              </button>
              {Object.values(BRANDS).map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrandFilter(b.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                    selectedBrandFilter === b.id
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: b.themeColor }}
                    ></span>
                    <span>{b.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-500 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-kb-green text-sm">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="700"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-kb-green cursor-pointer"
            />
          </div>

          {/* Best Seller Checkbox */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={onlyBestSeller}
                onChange={(e) => setOnlyBestSeller(e.target.checked)}
                className="w-4 h-4 rounded text-kb-green focus:ring-kb-green accent-kb-green"
              />
              <span>Best Sellers Only</span>
            </label>
          </div>
        </aside>

        {/* MAIN PRODUCT CATALOG GRID AREA */}
        <main className="lg:col-span-9 space-y-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterMobileOpen(true)}
              icon={SlidersHorizontal}
              className="w-full justify-center"
            >
              Filter Brands
            </Button>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-kb-soft space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                No matching premixes found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any products matching your filter criteria. Try expanding your price range or resetting filters.
              </p>
              <Button variant="primary" size="sm" onClick={clearFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
