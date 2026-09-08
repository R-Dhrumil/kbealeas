import React from 'react';
import { useApp } from '../context/AppContext';
import { BRANDS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ArrowLeft, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const BrandView = ({ brandId }) => {
  const { products, navigateTo } = useApp();

  const brand = BRANDS[brandId] || BRANDS.vrinda;
  const brandProducts = products.filter((p) => p.brandId === brand.id);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {/* Dynamic Brand Hero Header */}
      <section
        className={`relative text-white py-16 sm:py-24 rounded-b-[2.5rem] shadow-2xl overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, ${brand.themeColor} 0%, #111827 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6 text-center sm:text-left">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to KB Ecommerce
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                A KB BRAND
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white">
                {brand.name}
              </h1>
              <p className="text-amber-200 font-serif italic text-xl sm:text-2xl">
                "{brand.tagline}"
              </p>
              <p className="text-white/90 text-sm leading-relaxed font-light">
                {brand.description}
              </p>
            </div>

            {/* Quick Brand Stats Pill */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center space-y-2 shrink-0">
              <span className="text-3xl font-extrabold text-white font-heading block">
                {brandProducts.length}
              </span>
              <span className="text-xs text-white/80 font-medium uppercase tracking-wider block">
                Signature Premixes
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateTo('wholesale')}
                className="mt-2 text-xs"
              >
                Bulk B2B Inquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <Badge brand={brand.id}>{brand.name} CATALOG</Badge>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-kb-charcoal mt-1">
              All {brand.name} Products
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {brandProducts.length} premixes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Other 3 Brands Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 bg-slate-100 p-8 rounded-3xl space-y-6">
        <h3 className="font-heading font-bold text-xl text-kb-charcoal text-center">
          Explore Other KB Brands
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.values(BRANDS)
            .filter((b) => b.id !== brand.id)
            .map((otherBrand) => (
              <div
                key={otherBrand.id}
                onClick={() => navigateTo(`brand-${otherBrand.id}`)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: otherBrand.themeColor }}
                    ></span>
                    <span className="font-heading font-bold text-base text-kb-charcoal group-hover:text-kb-green">
                      {otherBrand.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">
                    {otherBrand.categoryName}
                  </span>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
