import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO, BRANDS } from '../../data/mockData';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Newsletter & Brand Promise Banner */}
        <div className="bg-gradient-to-r from-kb-green to-emerald-900 rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="bg-kb-gold/20 text-kb-gold border border-kb-gold/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {COMPANY_INFO.name} Ecosystem
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Stay Connected to Pure Beverage Excellence
            </h3>
            <p className="text-emerald-100 text-sm">
              Subscribe for wholesale announcements, new premix flavors, and exclusive corporate offers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your business or personal email..."
              className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm text-white placeholder-emerald-200 focus:outline-none focus:bg-white/20 flex-1"
            />
            <Button variant="secondary" size="md" icon={ArrowRight}>
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-kb-gold text-slate-900 font-heading font-extrabold text-xl flex items-center justify-center shadow-md">
                KB
              </div>
              <div>
                <h4 className="font-heading font-bold text-xl text-white">KB Ecommerce</h4>
                <span className="text-xs text-kb-gold font-medium">{COMPANY_INFO.tagline}</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {COMPANY_INFO.mission}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-kb-gold shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-kb-gold shrink-0" />
                <span>{COMPANY_INFO.phones.join(" / ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-kb-gold shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Our 4 Premix Brands */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-base">Our 4 Brands</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              {Object.values(BRANDS).map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => navigateTo(`brand-${b.id}`)}
                    className="hover:text-white flex items-center gap-2 transition-colors group"
                  >
                    <span
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: b.themeColor }}
                    ></span>
                    <span className="font-semibold text-slate-200">{b.name}</span>
                    <span className="text-[10px] text-slate-500">({b.categoryName})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Premix Categories */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-base">Shop by Category</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'tea' })} className="hover:text-white transition-colors">
                  Vrinda Tea Premixes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'coffee' })} className="hover:text-white transition-colors">
                  Urban Roast Coffee Premixes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'iced-tea' })} className="hover:text-white transition-colors">
                  Sangam Iced Tea Premixes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'chocolate' })} className="hover:text-white transition-colors">
                  Coco Joy Chocolate Premixes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-white transition-colors">
                  Commercial & B2B Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Support */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-base">Quick Links</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Founders & Team
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-white transition-colors">
                  Become a Distributor
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Vadodara Office
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Help & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-kb-gold text-amber-400 font-semibold transition-colors">
                  Admin Management
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {COMPANY_INFO.name} Beverages Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Shipping Policy</button>
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Refund Policy</button>
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
