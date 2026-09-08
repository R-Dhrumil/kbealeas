import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/common/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Minus,
  Plus,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const ProductDetailView = () => {
  const { selectedProduct, products, addToCart, toggleWishlist, isInWishlist, navigateTo, addToast } = useApp();

  const product = selectedProduct || products[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('prep'); // prep, ingredients, nutrition

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigateTo('checkout');
  };

  const relatedProducts = products
    .filter((p) => p.brandId === product.brandId && p.id !== product.id)
    .concat(products.filter((p) => p.id !== product.id))
    .slice(0, 4);

  const discountPercent = Math.round(
    ((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12 animate-fade-in">
      {/* Back Button Breadcrumb */}
      <button
        onClick={() => navigateTo('catalog')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-kb-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Premix Catalog
      </button>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Image & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge brand={product.brandId}>{product.brandName}</Badge>
            </div>
            {product.isBestSeller && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Best Seller
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Buying Actions & Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-kb-charcoal">
              {product.name}
            </h1>

            <p className="text-sm text-slate-500 italic">
              "{product.tagline}"
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-heading font-extrabold text-3xl text-kb-green">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Includes all taxes. Makes approximately <strong className="text-kb-charcoal">{selectedVariant.servings}</strong>.
              </span>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Pack Size Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Select Pack Size:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedVariant.id === v.id
                      ? 'border-kb-green bg-kb-green/5 ring-2 ring-kb-green/20 font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-kb-charcoal block">{v.packSize}</span>
                  <span className="text-xs text-kb-green font-heading">₹{v.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-bold text-kb-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorited
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-slate-600 border-slate-300 hover:text-rose-500'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                icon={ShoppingBag}
              >
                ADD TO CART
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
              >
                BUY NOW (INSTANT)
              </Button>
            </div>
          </div>

          {/* Key Assurance Icons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-kb-green shrink-0" />
              <span>Free shipping above ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-kb-green shrink-0" />
              <span>100% Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Preparation, Ingredients, Nutrition */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('prep')}
            className={`text-sm font-bold pb-2 transition-colors border-b-2 ${
              activeTab === 'prep'
                ? 'border-kb-green text-kb-green'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Preparation Instructions
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`text-sm font-bold pb-2 transition-colors border-b-2 ${
              activeTab === 'ingredients'
                ? 'border-kb-green text-kb-green'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Ingredients & Quality
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`text-sm font-bold pb-2 transition-colors border-b-2 ${
              activeTab === 'nutrition'
                ? 'border-kb-green text-kb-green'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Nutritional Information
          </button>
        </div>

        {activeTab === 'prep' && (
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-kb-charcoal">
              How to Prepare Perfect Cup
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              {product.prepInstructions}
            </p>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-kb-charcoal">
              Finest Ingredients & Quality Blends
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-kb-green shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-3 max-w-md">
            <h4 className="font-heading font-bold text-lg text-kb-charcoal">
              Nutritional Facts
            </h4>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 divide-y divide-slate-200 text-sm">
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Energy Calories</span>
                <span className="font-bold text-kb-charcoal">{product.nutrition.calories}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Protein</span>
                <span className="font-bold text-kb-charcoal">{product.nutrition.protein}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Carbohydrates</span>
                <span className="font-bold text-kb-charcoal">{product.nutrition.carbs}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Fat</span>
                <span className="font-bold text-kb-charcoal">{product.nutrition.fat}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Grid */}
      <div className="space-y-6">
        <h3 className="font-heading font-extrabold text-2xl text-kb-charcoal">
          More from {product.brandName} & Related Premixes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};
