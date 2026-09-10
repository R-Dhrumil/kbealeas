import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistView = () => {
  const { wishlist, products, navigateTo } = useApp();

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 pb-4">
        <Badge brand="kb">SAVED FAVORITES</Badge>
        <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
          Your Wishlist ({favoritedProducts.length} Items)
        </h1>
      </div>

      {favoritedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-kb-soft space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center font-bold">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-xl text-kb-charcoal">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-slate-500">
            Save your favorite premix flavors here while browsing to buy them later!
          </p>
          <Button variant="primary" size="md" onClick={() => navigateTo('catalog')} icon={ArrowRight}>
            Explore Premixes
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
