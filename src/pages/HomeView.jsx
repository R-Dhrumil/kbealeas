import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, BRANDS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Coffee,
  Users,
  Building2,
  CheckCircle2,
  Zap,
  Leaf,
  FlaskConical,
  PackageCheck,
  Medal,
  Star,
  Quote,
  Flame,
  ChevronRight,
  Clock,
  ThumbsUp,
  SlidersHorizontal,
  Check,
  CheckCircle,
  TrendingUp,
  MapPin,
  Heart
} from 'lucide-react';

export const HomeView = () => {
  const { navigateTo, products } = useApp();
  const [activeBrandTab, setActiveBrandTab] = useState('all');

  const featuredProducts = products.filter((p) => p.isFeatured);

  const displayProducts = activeBrandTab === 'all'
    ? featuredProducts
    : products.filter((p) => p.brandId === activeBrandTab);

  // Corporate Testimonials Data
  const clientTestimonials = [
    {
      name: "Prakruti Resort",
      category: "Hospitality & Luxury Resorts",
      quote: "KB Vrinda Tea and Sangam Iced Tea premixes have transformed our morning breakfast buffet. Instant preparation with authentic home-cooked taste!",
      person: "Food & Beverage Director",
      location: "Gujarat"
    },
    {
      name: "Anju Corporation",
      category: "Corporate Headquarters",
      quote: "Our office employees love the Urban Roast Cappuccino. It saves time and tastes exactly like barista-made coffee.",
      person: "Operations Head",
      location: "Vadodara"
    },
    {
      name: "Trinity Smiles Clinic",
      category: "Healthcare & Wellness Clinics",
      quote: "Serving KB hot beverages in our patient waiting lounge has received overwhelming positive feedback. Hygienic and rich taste.",
      person: "Clinic Director",
      location: "Gujarat"
    }
  ];

  return (
    <div className="space-y-24 pb-24 animate-fade-in bg-kb-cream">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-950 via-kb-green-dark to-kb-green text-white overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.12] text-white">
              Pure Taste, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kb-gold via-amber-200 to-amber-400">
                Every Single Sip.
              </span>
            </h1>

            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              India's premier multi-brand beverage premix platform. Enjoy authentic cardamom chai, rich frothy cappuccino, zesty iced teas, and decadent dark cocoa in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigateTo('catalog')}
                icon={ArrowRight}
                className="w-full sm:w-auto shadow-xl shadow-amber-500/25 hover:scale-105 transition-transform"
              >
                SHOP ALL PREMIXES
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('brands-ecosystem');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10"
              >
                EXPLORE OUR BRANDS
              </Button>
            </div>

            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-kb-gold font-extrabold text-2xl font-heading block">1,000,000+</span>
                <span className="text-xs text-emerald-100/80 font-medium">Cups Served Across India</span>
              </div>
              <div>
                <span className="text-kb-gold font-extrabold text-2xl font-heading block">4 Brands</span>
                <span className="text-xs text-emerald-100/80 font-medium">One Unified Platform</span>
              </div>
              <div>
                <span className="text-kb-gold font-extrabold text-2xl font-heading block">100% Pure</span>
                <span className="text-xs text-emerald-100/80 font-medium">Natural Botanical Blends</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative group">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80"
                  alt="KB Beverage Premixes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REFINED 4 BRANDS SHOWCASE (CLEAN FULL-WIDTH LIST) */}
      <section id="brands-ecosystem" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge brand="gold">THE KB BRAND ECOSYSTEM</Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-kb-charcoal tracking-tight">
            Four Master Brands. One Superior Standard.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
            Crafted for beverage lovers and business establishments seeking rich authentic flavor, zero artificial additives, and instant preparation.
          </p>
        </div>

        {/* Clean 1-Column Full-Width List of Brands */}
        <div className="flex flex-col gap-6">
          {Object.values(BRANDS).map((brand) => {
            const brandProds = products.filter((p) => p.brandId === brand.id);
            return (
              <div
                key={brand.id}
                onClick={() => navigateTo(`brand-${brand.id}`)}
                className="group w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-kb-soft hover:shadow-xl hover:border-kb-green/40 transition-all duration-300 cursor-pointer flex flex-col lg:flex-row items-stretch gap-6 overflow-hidden"
              >
                {/* Brand Thumbnail */}
                <div className="lg:w-64 relative rounded-2xl overflow-hidden min-h-[160px] lg:min-h-full shrink-0">
                  <img
                    src={brand.heroImage}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wider text-white shadow-md"
                      style={{ backgroundColor: brand.themeColor }}
                    >
                      {brand.name}
                    </span>
                  </div>
                </div>

                {/* Middle Content: Tagline & Description */}
                <div className="flex-1 space-y-3 flex flex-col justify-center">
                  <div className="space-y-1.5">
                    <h3 className="font-heading font-extrabold text-2xl text-kb-charcoal group-hover:text-kb-green transition-colors">
                      "{brand.tagline}"
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                      {brand.description}
                    </p>
                  </div>

                  {/* Clean Flavor Names Row */}
                  <div className="pt-1 flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <span className="font-bold text-slate-400">Offerings:</span>
                    <span>{brandProds.map((p) => p.name).join(" • ")}</span>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="lg:w-44 flex lg:flex-col justify-between items-center lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 shrink-0 my-auto">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo(`brand-${brand.id}`);
                    }}
                    icon={ArrowRight}
                    className="w-full sm:w-auto text-xs font-bold"
                  >
                    EXPLORE {brand.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <Badge brand="kb">HANDPICKED FAVORITES</Badge>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-kb-charcoal">
              Best Selling Premixes
            </h2>
          </div>

          {/* Clean Brand Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveBrandTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeBrandTab === 'all'
                  ? 'bg-kb-green text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Premixes
            </button>
            {Object.values(BRANDS).map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBrandTab(b.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeBrandTab === b.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigateTo('catalog')}
            icon={ArrowRight}
          >
            VIEW COMPLETE CATALOG ({products.length} PRODUCTS)
          </Button>
        </div>
      </section>

      {/* 4. REDESIGNED CLEAN QUALITY STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge brand="gold">THE KB BEVERAGE COMMITMENT</Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-kb-charcoal">
            Uncompromised Quality & Taste Standards
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
            From raw ingredient sourcing to triple-foil moisture barrier packaging, every KB premix undergoes rigorous quality testing at our Vadodara manufacturing facility.
          </p>
        </div>

        {/* 4 Clean Quality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-kb-soft hover:shadow-xl transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:bg-kb-green group-hover:text-white transition-colors">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                100% Pure Extracts
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hand-selected green cardamom, sun-dried ginger, estate tea leaves, and Dutch cocoa with zero artificial flavor enhancers.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-kb-soft hover:shadow-xl transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:bg-kb-green group-hover:text-white transition-colors">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                Instant Solubility
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Micro-milled premix formulation designed to dissolve instantly in hot or cold water without residue or clumping.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-kb-soft hover:shadow-xl transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:bg-kb-green group-hover:text-white transition-colors">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                Triple-Layer Protection
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Heavy-duty aluminum foil barrier pouches that lock in essential botanical oils and fresh aroma for up to 12 months.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-kb-soft hover:shadow-xl transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:bg-kb-green group-hover:text-white transition-colors">
              <Medal className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                Perfect Taste Every Cup
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Standardized flavor profiles trusted by commercial tea vending operators, resorts, and thousands of households.
              </p>
            </div>
          </div>
        </div>

        
      </section>

      {/* 5. CLEAN CORPORATE TRUST & METRICS SECTION */}
      <section className="bg-slate-950 text-white py-20 rounded-[3rem] max-w-7xl mx-auto px-4 sm:px-8 space-y-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-kb-gold/20 border border-kb-gold/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-kb-gold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-kb-gold" />
            <span>COMMERCIAL & CORPORATE TRUST</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Trusted by 100+ Corporate Partners & Luxury Resorts
          </h2>

          <p className="text-xs sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            From premier Gujarat resorts to corporate headquarters and Multispeciality clinics, KB is the preferred beverage supply partner.
          </p>
        </div>

        {/* Clean Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-kb-gold font-heading block">100+</span>
            <span className="text-xs text-slate-300 font-semibold block">Commercial Clients</span>
            <span className="text-[10px] text-slate-500 block">Resorts, Offices, Clinics</span>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading block">50,000+ Kg</span>
            <span className="text-xs text-slate-300 font-semibold block">Premix Supplied</span>
            <span className="text-[10px] text-slate-500 block">Pan-India Freight Logistics</span>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-heading block">99.8%</span>
            <span className="text-xs text-slate-300 font-semibold block">Retention Rate</span>
            <span className="text-[10px] text-slate-500 block">Repeat Wholesale Orders</span>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-heading block">100%</span>
            <span className="text-xs text-slate-300 font-semibold block">Quality Assured</span>
            <span className="text-[10px] text-slate-500 block">Hygienic Sealed Pouches</span>
          </div>
        </div>

        {/* Corporate Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {clientTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-kb-gold/60 transition-all duration-300 space-y-4 relative shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-kb-gold flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white">{item.name}</h4>
                  <span className="text-xs text-slate-400 block">{item.category}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Corporate Callout */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <ShieldCheck className="w-5 h-5 text-kb-gold shrink-0" />
            <span>Looking for 1 Kg bulk commercial pouch supply for your hotel, office, or clinic?</span>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() => navigateTo('wholesale')}
            icon={ArrowRight}
            className="shrink-0 text-xs font-bold shadow-lg"
          >
            SUBMIT WHOLESALE B2B INQUIRY
          </Button>
        </div>
      </section>


    </div>
  );
};
