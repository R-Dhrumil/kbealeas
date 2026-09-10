import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/mockData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, Send, Users, ShieldCheck, Heart } from 'lucide-react';

export const StaticPagesView = ({ pageType = 'about' }) => {
  const { navigateTo, addToast } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What products does KB Ecommerce sell?",
      a: "KB focuses strictly on BEVERAGE PREMIX PRODUCTS ONLY. We house 4 brands: Vrinda (Tea Premixes), Sangam (Iced Tea Premixes), Urban Roast (Coffee Premixes), and Coco Joy (Chocolate Premixes)."
    },
    {
      q: "How do I prepare KB premixes?",
      a: "Preparing KB premixes is instant! For tea, coffee, and hot chocolate premixes, simply add 14g-18g powder to 100ml hot boiling water or milk. For Sangam iced tea premixes, mix with ice-cold water."
    },
    {
      q: "Can I combine products from all 4 brands in a single cart?",
      a: "Yes! A single order can contain Vrinda tea, Sangam iced tea, Urban Roast coffee, and Coco Joy chocolate premixes."
    },
    {
      q: "Where is KB located and how do I contact customer support?",
      a: "Our headquarters are in Vadodara, Gujarat (202, Sai Pancham Flat, Gajanand Society, Manjalpur Naka, Vadodara - 390011). Call us directly at +91 96240 91000 or +91 85111 16618."
    },
    {
      q: "Do you offer wholesale bulk supply for businesses and distributors?",
      a: "Yes! We provide 1 Kg commercial pouch packaging with high profit margins for hotels, resorts, office admins, and distributors."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12 animate-fade-in">
      {/* ABOUT PAGE */}
      {pageType === 'about' && (
        <div className="space-y-12">
          {/* About Hero */}
          <div className="bg-gradient-to-r from-kb-green to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
            <Badge brand="gold">THE KB STORY</Badge>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
              Driven by Purpose. United by Passion.
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-3xl leading-relaxed font-light">
              {COMPANY_INFO.mission}
            </p>
          </div>

          {/* Founders Section */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <Badge brand="kb">FOUNDER TEAM</Badge>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-kb-charcoal">
                Meet the Leadership Behind KB
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMPANY_INFO.founders.map((f, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft text-center space-y-3">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-100 shadow-md"
                  />
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-xl text-kb-charcoal">{f.name}</h3>
                    <span className="text-xs font-bold text-kb-green bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                      {f.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{f.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT PAGE */}
      {pageType === 'contact' && (
        <div className="space-y-12">
          <div className="border-b border-slate-200 pb-4">
            <Badge brand="kb">GET IN TOUCH</Badge>
            <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
              Contact KB Head Office
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 space-y-6">
              <h3 className="font-heading font-bold text-xl text-white border-b border-slate-800 pb-3">
                Vadodara Headquarters
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-kb-gold shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-kb-gold shrink-0" />
                  <span>{COMPANY_INFO.phones.join(" / ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-kb-gold shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-kb-soft space-y-4">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                Send Us a Message
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToast('Message sent! Our team will contact you shortly.', 'success');
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <textarea
                  rows="4"
                  required
                  placeholder="Your message or inquiry..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                ></textarea>
                <Button variant="primary" size="lg" type="submit" icon={Send}>
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAQ PAGE */}
      {pageType === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge brand="kb">HELP CENTER</Badge>
            <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-heading font-bold text-sm text-kb-charcoal flex justify-between items-center hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-kb-green" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
