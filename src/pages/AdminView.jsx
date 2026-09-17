import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { AdminLayout } from '../components/layout/AdminLayout';
import { BRANDS } from '../data/mockData';
import {
  Building2,
  TrendingUp,
  Package,
  Plus,
  Trash2,
  Clock,
  ArrowUpRight,
  X,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminView = () => {
  const { products, orders, b2bLeads, addOrUpdateProduct, deleteProduct, navigateTo, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('products'); // products, dashboard, orders, leads
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    addToast(`Premix ${newProduct.name} listed in catalog!`, 'success');

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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCatInfo = BRAND_CATEGORY_MAP[formData.brandId] || BRAND_CATEGORY_MAP.vrinda;

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* ================= PRODUCTS MANAGEMENT TAB ================= */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge brand="kb">CATALOG MANAGEMENT</Badge>
                <span className="text-xs text-slate-400 font-medium">Total {products.length} Premixes</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
                Premix Product Catalog
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-kb-green w-48 sm:w-60"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddModalOpen(true)}
                icon={Plus}
                className="font-bold shadow-md shadow-kb-green/20"
              >
                Add New Premix
              </Button>
            </div>
          </div>

          {/* Products Table Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-kb-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 min-w-[700px]">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="p-4">Premix Product</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">1 Kg Price</th>
                    <th className="p-4">500g Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100 shadow-xs"
                        />
                        <div>
                          <strong className="text-kb-charcoal block font-heading font-bold text-sm">
                            {prod.name}
                          </strong>
                          <span className="text-[11px] text-slate-400 line-clamp-1">"{prod.tagline}"</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge brand={prod.brandId}>{prod.brandName}</Badge>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{prod.categoryLabel}</span>
                      </td>
                      <td className="p-4 font-bold text-kb-charcoal">
                        ₹{prod.variants[0]?.price}
                      </td>
                      <td className="p-4 font-bold text-slate-600">
                        ₹{prod.variants[1]?.price || "N/A"}
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          In Stock
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
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
        </div>
      )}

      {/* ================= DASHBOARD TAB ================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          <div>
            <Badge brand="kb">EXECUTIVE SUMMARY</Badge>
            <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
              Store Analytics & Key Metrics
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-kb-soft space-y-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Total Sales Revenue
              </span>
              <span className="text-3xl font-extrabold text-kb-green font-heading block">
                ₹1,48,900
              </span>
              <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-bold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% monthly growth
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-kb-soft space-y-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Customer Orders
              </span>
              <span className="text-3xl font-extrabold text-kb-charcoal font-heading block">
                {orders.length + 42}
              </span>
              <span className="text-[11px] text-slate-400">Processed from Vadodara Hub</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-kb-soft space-y-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Live Catalog
              </span>
              <span className="text-3xl font-extrabold text-amber-600 font-heading block">
                {products.length} Blends
              </span>
              <span className="text-[11px] text-slate-400">Vrinda, Sangam, Urban, Coco</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-kb-soft space-y-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Wholesale Inquiries
              </span>
              <span className="text-3xl font-extrabold text-sky-600 font-heading block">
                {b2bLeads.length}
              </span>
              <span className="text-[11px] text-sky-600 font-bold">Hospitality & Resorts</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= ORDERS TAB ================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <Badge brand="kb">DISPATCH & FULFILLMENT</Badge>
            <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
              Customer Orders & Tracking
            </h1>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-kb-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 min-w-[650px]">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Order Date</th>
                    <th className="p-4">Items Count</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60">
                      <td className="p-4 font-bold text-kb-charcoal">{ord.id}</td>
                      <td className="p-4">{ord.date}</td>
                      <td className="p-4">{ord.items.length} items</td>
                      <td className="p-4 font-bold text-kb-green text-sm">₹{ord.total}</td>
                      <td className="p-4">{ord.paymentMethod}</td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= B2B LEADS TAB ================= */}
      {activeTab === 'leads' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <Badge brand="kb">B2B INQUIRIES</Badge>
            <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
              Wholesale & Commercial Partner Requests
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {b2bLeads.map((lead) => (
              <div key={lead.id} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-kb-soft space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-kb-green font-bold uppercase tracking-wider">{lead.id}</span>
                    <h3 className="font-heading font-bold text-base text-kb-charcoal">{lead.companyName}</h3>
                    <span className="text-xs text-slate-500">Contact Person: {lead.contactPerson}</span>
                  </div>
                  <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {lead.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 leading-relaxed">
                  <strong className="text-kb-charcoal block mb-0.5">Requirement Details:</strong>
                  {lead.requirement}
                </p>

                <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Phone: <strong className="text-slate-700">{lead.phone}</strong></span>
                  <span>Date: {lead.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ADD NEW PREMIX MODAL ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0"
          ></div>

          <div className="relative bg-white text-kb-charcoal rounded-3xl border border-slate-100 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 z-10 my-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-kb-green flex items-center justify-center font-bold">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-kb-charcoal">
                    Add New Premix Product
                  </h3>
                  <span className="text-xs text-slate-400">List a new premix flavor under the KB catalog</span>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreatePremix} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Premix Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Saffron Cardamom Tea Premix"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-kb-green focus:bg-white"
                />
              </div>

              {/* Brand & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand Assignment *</label>
                  <select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-kb-charcoal focus:outline-none focus:border-kb-green"
                  >
                    <option value="vrinda">VRINDA (Tea Premixes)</option>
                    <option value="sangam">SANGAM (Iced Tea Premixes)</option>
                    <option value="urban-roast">URBAN ROAST (Coffee Premixes)</option>
                    <option value="coco-joy">COCO JOY (Chocolate Premixes)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category (Mapped to Brand)</label>
                  <div className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-sm text-kb-green font-bold flex items-center justify-between">
                    <span>{activeCatInfo.catLabel}</span>
                    <span className="text-[10px] text-slate-400 font-normal">Auto-Assigned</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  placeholder="e.g. Royal Aromatic Blend"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-kb-green focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">1 Kg Pouch Price (₹) *</label>
                  <input
                    type="number"
                    name="price1kg"
                    required
                    value={formData.price1kg}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-kb-green focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">500g Pouch Price (₹) *</label>
                  <input
                    type="number"
                    name="price500g"
                    required
                    value={formData.price500g}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-kb-green focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Image URL</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-kb-green focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleChange}
                    className="w-4 h-4 text-kb-green rounded"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 text-kb-green rounded"
                  />
                  <span>Show on Homepage Featured</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={Check}
                  className="font-bold shadow-md shadow-kb-green/20"
                >
                  Save Premix Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
