import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/mockData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Building2, ShieldCheck, CheckCircle2, Send, Phone, MapPin, Award } from 'lucide-react';

export const WholesaleView = () => {
  const { submitB2bInquiry, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "Vadodara",
    requirement: "Vrinda Tea & Urban Roast Coffee Premixes",
    monthlyVolume: "50 Kg - 100 Kg",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitB2bInquiry({
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      requirement: `${formData.requirement} (${formData.monthlyVolume})`
    });
    setFormData({
      companyName: "",
      contactPerson: "",
      phone: "",
      email: "",
      city: "Vadodara",
      requirement: "Vrinda Tea & Urban Roast Coffee Premixes",
      monthlyVolume: "50 Kg - 100 Kg",
      message: ""
    });
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white py-16 sm:py-20 rounded-b-[2.5rem] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4 text-center sm:text-left">
          <Badge brand="gold">DISTRIBUTOR & B2B OPPORTUNITIES</Badge>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white max-w-3xl leading-tight">
            Partner with KB for Bulk Premix Supply & Distribution
          </h1>
          <p className="text-amber-100 text-sm sm:text-base max-w-2xl font-light">
            High profit margins, consistent quality control, and direct factory supply for resorts, corporate offices, hospitals, and distributors.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-heading font-bold text-2xl text-kb-charcoal">
              Submit Commercial B2B Enquiry
            </h2>
            <p className="text-xs text-slate-500">Fill in your business details and our wholesale team will get in touch.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company / Firm Name *</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. Prakruti Resort"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  placeholder="e.g. Mr. Rajesh Shah"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="+91 98250 XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="purchase@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Premix Brands</label>
                <select
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                >
                  <option value="Vrinda Tea & Urban Roast Coffee Premixes">Vrinda Tea & Urban Roast Coffee</option>
                  <option value="Sangam Iced Tea Premixes">Sangam Iced Tea Premixes</option>
                  <option value="Coco Joy Chocolate Premixes">Coco Joy Chocolate Premixes</option>
                  <option value="All 4 KB Brands Bulk Supply">All 4 KB Brands (Combined Supply)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Monthly Volume</label>
                <select
                  name="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                >
                  <option value="20 Kg - 50 Kg">20 Kg - 50 Kg / month</option>
                  <option value="50 Kg - 100 Kg">50 Kg - 100 Kg / month</option>
                  <option value="100 Kg - 500 Kg">100 Kg - 500 Kg / month</option>
                  <option value="500+ Kg Distributor Batch">500+ Kg (Distributor Batch)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Additional Requirements / Notes</label>
              <textarea
                name="message"
                rows="3"
                placeholder="Mention specific flavor requirements or vending machine machine specs..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
              ></textarea>
            </div>

            <Button
              variant="secondary"
              size="lg"
              type="submit"
              icon={Send}
              className="w-full shadow-lg shadow-amber-500/20"
            >
              SUBMIT B2B ENQUIRY
            </Button>
          </form>
        </div>

        {/* Benefits Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white border-b border-slate-800 pb-3">
              Why Partner with KB?
            </h3>

            <div className="space-y-4 text-xs leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-kb-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Direct Factory Margins</strong>
                  <span className="text-slate-300">Enjoy attractive wholesale pricing on 1 Kg pouch packaging for maximum profitability.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-kb-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Pan-India Logistics</strong>
                  <span className="text-slate-300">Fast freight dispatch directly from our central Vadodara distribution warehouse.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-kb-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">4 Brands in 1 Order</strong>
                  <span className="text-slate-300">Combine Vrinda, Sangam, Urban Roast, and Coco Joy in a single shipment invoice.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">Call B2B Desk Direct:</strong> {COMPANY_INFO.phones.join(" / ")}</p>
              <p><strong className="text-white">Vadodara HQ:</strong> {COMPANY_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
