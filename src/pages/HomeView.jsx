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
  Heart,
  Mail,
  Phone,
  Send,
  MessageSquare
} from 'lucide-react';

export const HomeView = () => {
  const { navigateTo, products, addToast } = useApp();
  const [activeBrandTab, setActiveBrandTab] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (addToast) {
      addToast('Thank you! Your message has been received. Our team will contact you shortly.', 'success');
    }
    setContactForm({
      name: '',
      phone: '',
      email: '',
      inquiryType: 'General Inquiry',
      message: ''
    });
  };

  const featuredProducts = products.filter((p) => p.isFeatured);

  const displayProducts = activeBrandTab === 'all'
    ? featuredProducts
    : products.filter((p) => p.brandId === activeBrandTab);

  // Corporate Testimonials Data
  const clientTestimonials = [
    {
      name: "Chef Rajesh Varma",
      role: "Director of Food & Beverage",
      company: "Prakruti Luxury Resort",
      category: "Hospitality & Luxury Resorts",
      clientLogo: "/clients/prakruti.jpg",
      personImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "KB Vrinda Tea and Sangam Iced Tea premixes have transformed our morning breakfast buffet. Instant preparation with authentic home-cooked taste!",
      serves: "Vrinda Tea & Sangam Iced Tea",
      location: "Gujarat"
    },
    {
      name: "Sneha Parikh",
      role: "Head of Operations & Workplace",
      company: "Anju Corporation",
      category: "Corporate Headquarters",
      clientLogo: "/clients/anju.jpg",
      personImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
      quote: "Our office employees love the Urban Roast Cappuccino. It saves time and tastes exactly like barista-made coffee.",
      serves: "Urban Roast Cappuccino",
      location: "Vadodara"
    },
    {
      name: "Dr. Devendra Joshi",
      role: "Chief Medical Director & Founder",
      company: "Trinity Smiles Clinic",
      category: "Healthcare & Wellness Clinics",
      clientLogo: "/clients/trinity.jpg",
      personImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      quote: "Serving KB hot beverages in our patient waiting lounge has received overwhelming positive feedback. Hygienic and rich taste.",
      serves: "Hot Beverage Hospitality Bar",
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
              Vadodara's premier multi-brand beverage premix platform. Enjoy authentic cardamom chai, rich frothy cappuccino, zesty iced teas, and decadent dark cocoa in seconds.
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
                <span className="text-kb-gold font-extrabold text-2xl font-heading block">1,000+</span>
                <span className="text-xs text-emerald-100/80 font-medium">Cups Served Across Vadodara</span>
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

                {/* Content: Tagline, Description, Offerings, and Explore Button */}
                <div className="flex-1 flex flex-col justify-between gap-5 py-1">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-heading font-extrabold text-2xl text-kb-charcoal group-hover:text-kb-green transition-colors">
                        "{brand.tagline}"
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                        {brand.description}
                      </p>
                    </div>

                    {/* Clean Flavor Names Row */}
                    <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                      <span className="font-bold text-slate-400">Offerings:</span>
                      <span>{brandProds.map((p) => p.name).join(" • ")}</span>
                    </div>
                  </div>

                  {/* Decent Animated Explore Button */}
                  <div className="pt-2 flex items-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(`brand-${brand.id}`);
                      }}
                      style={{
                        backgroundColor: brand.themeColor,
                        boxShadow: `0 4px 14px -2px ${brand.themeColor}55`,
                      }}
                      className="group/btn relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      {/* Animated Shimmer Sweep */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                      <span className="relative z-10 font-bold">EXPLORE {brand.name}</span>

                      {/* Animated Trailing Arrow Capsule */}
                      <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 ease-out group-hover/btn:bg-white/30 group-hover/btn:translate-x-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover/btn:scale-110" />
                      </span>
                    </button>
                  </div>
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

        {/* Corporate Client Cards with Official Company Images from Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {clientTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-b from-slate-900/95 to-slate-900/70 rounded-3xl border border-slate-800 hover:border-kb-gold/60 shadow-xl hover:shadow-2xl hover:shadow-kb-gold/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-kb-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Official Client Company Image from Brochure PDF */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-white/5 border-b border-slate-800 flex items-center justify-center">
                <img
                  src={item.clientLogo}
                  alt={item.company}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-950/85 backdrop-blur-md border border-kb-gold/30 text-kb-gold text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Representative Person Profile */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.personImage}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-kb-gold/40 border border-slate-800 shadow"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 bg-kb-gold text-slate-950 rounded-full p-0.5 shadow">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-kb-gold transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.role}
                      </p>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 text-kb-gold shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-kb-gold text-kb-gold" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Box */}
                  <div className="relative bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 group-hover:border-slate-700/80 transition-colors">
                    <Quote className="w-4 h-4 text-kb-gold/40 mb-1 rotate-180" />
                    <p className="text-xs text-slate-300 italic leading-relaxed font-light">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                {/* Bottom Tag / Product Served */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">
                    <strong className="text-slate-300 font-medium">Serving:</strong> {item.serves}
                  </span>
                  <span className="shrink-0 text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-kb-gold" /> {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Client Roster from Brochure PDF */}
        <div className="space-y-4 pt-6 border-t border-slate-800 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-kb-gold uppercase tracking-wider block">
                OUR CLIENTELE • BREWING TRUST, SERVING EXCELLENCE
              </span>
              <p className="text-xs text-slate-400 font-light">
                Trusted by leading Gujarat resorts, corporate headquarters, clinics, and studios
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">11+ Premier Commercial Clients</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 pt-2">
            {COMPANY_INFO.clientel.map((client, i) => (
              <div
                key={i}
                className="group/client bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-kb-gold/50 rounded-2xl p-2.5 transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="w-full h-20 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center p-1 border border-slate-800/50 group-hover/client:border-kb-gold/30 transition-colors">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover group-hover/client:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2 pb-0.5 w-full">
                  <span className="text-xs font-semibold text-slate-200 block truncate group-hover/client:text-kb-gold transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {client.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
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

      {/* 6. CONTACT US SECTION */}
      <section id="contact-us" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge brand="kb">CONNECT WITH US</Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-kb-charcoal tracking-tight">
            Get In Touch With KB Beverages
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
            Have questions about our blends, commercial supply, or looking to partner with us? Our Vadodara team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Headquarters & Direct Contact Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-kb-green-dark to-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kb-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold tracking-widest text-kb-gold uppercase">
                  VADODARA HEADQUARTERS
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  We'd Love to Hear From You
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
                  Visit our office or reach out directly for retail distributions, corporate cafeteria setups, or instant order assistance.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-kb-gold flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Registered Office</span>
                    <p className="text-xs text-slate-300/90 leading-relaxed mt-0.5">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-kb-gold flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Call / WhatsApp Support</span>
                    <div className="flex flex-col gap-0.5 mt-0.5 text-xs text-emerald-100 font-semibold">
                      {COMPANY_INFO.phones.map((phone, i) => (
                        <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-kb-gold transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">Mon – Sat: 9:30 AM to 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-kb-gold flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Email Inquiries</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-emerald-100 font-semibold hover:text-kb-gold transition-colors mt-0.5 block">
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Dedicated commercial & customer support desk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-300 font-medium">Interested in B2B Wholesale?</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateTo('wholesale')}
                icon={ArrowRight}
                className="w-full sm:w-auto text-xs font-bold shadow"
              >
                Wholesale Portal
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-kb-soft space-y-6 relative">
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-2xl text-kb-charcoal">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Fill out the quick inquiry form below and our customer experience team will connect with you.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-kb-green focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-kb-green focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-kb-green focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Inquiry Type</label>
                  <select
                    value={contactForm.inquiryType}
                    onChange={(e) => setContactForm({ ...contactForm, inquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-kb-green focus:outline-none transition-colors"
                  >
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Commercial Supply">Commercial & Resort Supply</option>
                    <option value="Distributorship">Distributorship / Franchise</option>
                    <option value="Custom Order">Bulk Order or Custom Packaging</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell us about your requirement, flavor preferences, or questions..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-kb-green focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-400">
                  🔒 We protect your data and respond within 24 hours.
                </span>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={Send}
                  className="w-full sm:w-auto text-xs font-bold px-6 shadow-md"
                >
                  SEND MESSAGE
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>


    </div>
  );
};
