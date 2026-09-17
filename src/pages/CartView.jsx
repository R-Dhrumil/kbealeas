import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Heart
} from 'lucide-react';

export const CartView = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartShipping,
    cartTax,
    cartTotal,
    toggleWishlist,
    navigateTo,
    user,
    openAuthModal,
    openCheckoutNotice,
    addToast
  } = useApp();

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartSubtotal;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You haven't added any beverage premixes to your cart yet. Explore Vrinda, Sangam, Urban Roast, and Coco Joy!
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigateTo('catalog')}
          icon={ArrowRight}
        >
          EXPLORE PREMIX CATALOG
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <Badge brand="kb">SHOPPING BAG</Badge>
          <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
            Your Cart ({cart.length} Products)
          </h1>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="text-xs font-semibold text-kb-green hover:underline"
        >
          + Add More Products
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
        {remainingForFreeShipping > 0 ? (
          <p className="text-xs text-emerald-900 font-medium">
            Add <span className="font-bold">₹{remainingForFreeShipping}</span> more to get <span className="font-bold">FREE Delivery!</span>
          </p>
        ) : (
          <p className="text-xs text-emerald-900 font-bold">
            🎉 You qualify for FREE Nationwide Delivery!
          </p>
        )}
        <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft divide-y divide-slate-100">
          {cart.map((item, idx) => (
            <div key={idx} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shrink-0"
              />

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge brand={item.product.brandId}>{item.product.brandName}</Badge>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.product.categoryLabel}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-kb-charcoal">
                  {item.product.name}
                </h3>

                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded font-medium inline-block">
                  Pack Size: {item.variant.packSize}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                    className="p-2 hover:bg-slate-200 text-slate-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-sm font-bold text-kb-charcoal">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                    className="p-2 hover:bg-slate-200 text-slate-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-heading font-bold text-lg text-kb-charcoal block">
                    ₹{item.variant.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-slate-400">₹{item.variant.price} each</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleWishlist(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50"
                    title="Move to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.variant.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary & Checkout Trigger */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft space-y-6 sticky top-24">
          <h3 className="font-heading font-bold text-lg text-kb-charcoal border-b border-slate-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-kb-charcoal">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Handling</span>
              <span className="font-bold text-kb-charcoal">
                {cartShipping === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${cartShipping}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST Tax (5%)</span>
              <span className="font-bold text-kb-charcoal">₹{cartTax}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold text-kb-charcoal">
              <span>Total Payable Amount</span>
              <span className="text-kb-green text-xl font-heading">₹{cartTotal}</span>
            </div>
          </div>

          {!user?.isLoggedIn && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs text-amber-950">
              <span>Sign in to autofill addresses & track orders</span>
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="font-bold text-kb-green underline ml-2 cursor-pointer hover:text-emerald-800"
              >
                Sign In
              </button>
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              if (!user?.isLoggedIn) {
                openCheckoutNotice('To complete your checkout and delivery, you need to sign in or create an account.');
                return;
              }
              navigateTo('checkout');
            }}
            icon={ArrowRight}
            className="w-full shadow-lg shadow-kb-green/20"
          >
            PROCEED TO CHECKOUT
          </Button>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-kb-green" />
              <span>Safe & Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-kb-green" />
              <span>Dispatched directly from KB Vadodara Hub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
