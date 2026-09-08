import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useApp();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = Math.round(
    ((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100
  );

  return (
    <div
      onClick={() => navigateTo('product-detail', { product })}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Brand Tag */}
        <div className="absolute top-3 left-3">
          <Badge brand={product.brandId}>{product.brandName}</Badge>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorited
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Discount Overlay */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              {discountPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 font-medium text-xs mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-bold text-base text-kb-charcoal group-hover:text-kb-green transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 italic">
            "{product.tagline}"
          </p>

          {/* Pack Size Variant Selector */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(v);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedVariant.id === v.id
                    ? 'bg-kb-green text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v.packSize}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-kb-charcoal font-heading">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.originalPrice > selectedVariant.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{selectedVariant.originalPrice}
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant={isAdded ? 'secondary' : 'primary'}
            onClick={handleAddToCart}
            icon={isAdded ? Check : ShoppingBag}
          >
            {isAdded ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};
