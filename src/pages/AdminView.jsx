import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { AdminLayout } from '../components/layout/AdminLayout';
import { BRANDS, CATEGORIES } from '../data/mockData';
import {
  Building2,
  TrendingUp,
  Package,
  Users,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Store,
  FileText,
  X,
  Sparkles,
  Check,
  Coffee,
  Image as ImageIcon
} from 'lucide-react';

export const AdminView = () => {
  const { products, orders, b2bLeads, addOrUpdateProduct, deleteProduct, navigateTo, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('products'); // dashboard, products, orders, leads
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Premix Form State (Category automatically mapped to Brand)
  const [formData, setFormData] = useState({
    name: "",
    brandId: "vrinda",
    tagline: "Rich Aromatic Premium Premix",
    description: "Handcrafted beverage premix prepared with finest ingredients for instant delight.",
    price1kg: 480,
    price500g: 250,
    servings1kg: "70 Cups",
    servings500g: "35 Cups",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true
  });

  // Helper mapping Brand ID -> Category ID & Label
  const BRAND_CATEGORY_MAP = {
    vrinda: { catId: 'tea', catLabel: 'Tea Premix' },
    sangam: { catId: 'iced-tea', catLabel: 'Iced Tea Premix' },
    'urban-roast': { catId: 'coffee', catLabel: 'Coffee Premix' },
    'coco-joy': { catId: 'chocolate', catLabel: 'Chocolate Premix' }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreatePremix = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      addToast('Please enter a product name', 'error');
      return;
    }

    const selectedBrand = BRANDS[formData.brandId] || BRANDS.vrinda;
    const catInfo = BRAND_CATEGORY_MAP[formData.brandId] || BRAND_CATEGORY_MAP.vrinda;

    const newProduct = {
      id: `premix-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      brandId: formData.brandId,
      brandName: selectedBrand.name,
      category: catInfo.catId,
      categoryLabel: catInfo.catLabel,
      tagline: formData.tagline,
      description: formData.description,
      inStock: true,
      rating: 4.9,
      reviewsCount: 1,
      isBestSeller: formData.isBestSeller,
      isFeatured: formData.isFeatured,
      image: formData.image || "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
      prepInstructions: `Mix 14g of ${formData.name} into 100ml water/milk. Stir well and serve.`,
      ingredients: ["Pure Extract", "Dairy Milk Solids", "Natural Sugar"],
      nutrition: { calories: "60 kcal per serving", protein: "1.2g", carbs: "10g", fat: "1.1g" },
      variants: [
        {
          id: `v-${Date.now()}-1kg`,
          packSize: "1 Kg Pouch",
          price: Number(formData.price1kg),
          originalPrice: Number(formData.price1kg) + 50,
          servings: formData.servings1kg
        },
        {
          id: `v-${Date.now()}-500g`,
          packSize: "500g Pouch",
          price: Number(formData.price500g),
          originalPrice: Number(formData.price500g) + 30,
          servings: formData.servings500g
        }
      ]
    };

    addOrUpdateProduct(newProduct);
    setIsAddModalOpen(false);

    // Reset Form
    setFormData({
      name: "",
      brandId: "vrinda",
      tagline: "Rich Aromatic Premium Premix",
      description: "Handcrafted beverage premix prepared with finest ingredients for instant delight.",
      price1kg: 480,
      price500g: 250,
      servings1kg: "70 Cups",
      servings500g: "35 Cups",
      image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
      isBestSeller: true,
      isFeatured: true
    });
  };

  const activeCatInfo = BRAND_CATEGORY_MAP[formData.brandId] || BRAND_CATEGORY_MAP.vrinda;

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {/* PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Premix Product Catalog
                </h1>
                <span className="text-xs text-slate-400">Total {products.length} premix products listed</span>
              </div>

              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsAddModalOpen(true)}
                icon={Plus}
                className="shadow-lg shadow-amber-500/20 font-bold"
              >
                ADD NEW PREMIX
              </Button>
            </div>

            {/* Products Table */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300 min-w-[650px]">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Brand & Category</th>
                    <th className="p-4">1 Kg Price</th>
                    <th className="p-4">500g Price</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-700/40 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-700" />
                        <div>
                          <strong className="text-white block font-heading text-sm">{prod.name}</strong>
                          <span className="text-[10px] text-slate-400 line-clamp-1">"{prod.tagline}"</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <strong className="text-kb-gold uppercase block">{prod.brandName}</strong>
                        <span className="text-[10px] text-slate-400 capitalize">{prod.categoryLabel}</span>
                      </td>
                      <td className="p-4 font-bold text-white">₹{prod.variants[0]?.price}</td>
                      <td className="p-4 font-bold text-slate-300">₹{prod.variants[1]?.price || "N/A"}</td>
                      <td className="p-4">
                        <span className="bg-emerald-900/80 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          In Stock
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded-xl transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-xs text-kb-gold font-bold uppercase tracking-wider block">
                EXECUTIVE SUMMARY
              </span>
              <h1 className="font-heading font-extrabold text-3xl text-white">
                KB Business Analytics Dashboard
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Total Sales Revenue</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-heading block">
                  ₹1,48,900
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% growth
                </span>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Total Orders</span>
                <span className="text-3xl font-extrabold text-white font-heading block">
                  {orders.length + 42}
                </span>
                <span className="text-[11px] text-slate-400">Vadodara Central Hub</span>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Active Catalog</span>
                <span className="text-3xl font-extrabold text-amber-400 font-heading block">
                  {products.length} Premixes
                </span>
                <span className="text-[11px] text-slate-400">Vrinda, Sangam, Urban, Coco</span>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">B2B Wholesale Enquiries</span>
                <span className="text-3xl font-extrabold text-sky-400 font-heading block">
                  {b2bLeads.length}
                </span>
                <span className="text-[11px] text-sky-400 font-semibold">Hospitality & Resorts</span>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-heading font-extrabold text-2xl text-white border-b border-slate-800 pb-4">
              Customer Orders & Dispatch Status
            </h1>

            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 min-w-[650px]">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-700">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Items Count</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{ord.id}</td>
                      <td className="p-4">{ord.date}</td>
                      <td className="p-4">{ord.items.length} items</td>
                      <td className="p-4 font-bold text-emerald-400">₹{ord.total}</td>
                      <td className="p-4">{ord.paymentMethod}</td>
                      <td className="p-4">
                        <span className="bg-emerald-900/80 text-emerald-300 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* B2B LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-heading font-extrabold text-2xl text-white border-b border-slate-800 pb-4">
              Wholesale & Commercial Partner Inquiries
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {b2bLeads.map((lead) => (
                <div key={lead.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-kb-gold font-bold uppercase">{lead.id}</span>
                      <h3 className="font-bold text-base text-white">{lead.companyName}</h3>
                      <span className="text-xs text-slate-400">Contact: {lead.contactPerson}</span>
                    </div>
                    <span className="bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-0.5 rounded text-[10px] font-bold">
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl">
                    <strong className="text-white">Requirement:</strong> {lead.requirement}
                  </p>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-700">
                    <span>Phone: {lead.phone}</span>
                    <span>Date: {lead.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ========================================================================= */}
      {/* STREAMLINED "ADD NEW PREMIX PRODUCT" MODAL POP-UP */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
          ></div>

          {/* Modal Card */}
          <div className="relative bg-slate-900 text-white rounded-3xl border border-slate-700 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 z-10 my-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-kb-gold text-slate-950 flex items-center justify-center font-bold">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    Add New Premix Product
                  </h3>
                  <span className="text-xs text-slate-400">List a new premix flavor under KB Ecosystem</span>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreatePremix} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Premix Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Saffron Cardamom Tea Premix"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-kb-gold focus:outline-none"
                />
              </div>

              {/* STREAMLINED BRAND & AUTOMATIC CATEGORY FIELD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Brand Assignment *</label>
                  <select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-kb-gold focus:outline-none font-bold"
                  >
                    <option value="vrinda">VRINDA (Tea Premixes)</option>
                    <option value="sangam">SANGAM (Iced Tea Premixes)</option>
                    <option value="urban-roast">URBAN ROAST (Coffee Premixes)</option>
                    <option value="coco-joy">COCO JOY (Chocolate Premixes)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Category (Mapped to Brand)</label>
                  <div className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-kb-gold font-bold flex items-center justify-between">
                    <span>{activeCatInfo.catLabel}</span>
                    <span className="text-[10px] text-slate-500 font-normal">Auto-Assigned</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Product Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  placeholder="e.g. Royal Aromatic Blend"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-kb-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">1 Kg Pouch Price (₹) *</label>
                  <input
                    type="number"
                    name="price1kg"
                    required
                    value={formData.price1kg}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-kb-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">500g Pouch Price (₹) *</label>
                  <input
                    type="number"
                    name="price500g"
                    required
                    value={formData.price500g}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-kb-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Product Image URL</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-kb-gold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleChange}
                    className="w-4 h-4 text-kb-gold accent-kb-gold rounded"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 text-kb-gold accent-kb-gold rounded"
                  />
                  <span>Show on Homepage Featured</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  type="submit"
                  icon={Check}
                  className="font-bold shadow-lg shadow-amber-500/20"
                >
                  SAVE PREMIX PRODUCT
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
