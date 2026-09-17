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
                <button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">
                  Shop All Premixes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-us');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigateTo('contact');
                    }
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Vadodara Office
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Help & FAQ
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
