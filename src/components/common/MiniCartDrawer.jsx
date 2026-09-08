import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const MiniCartDrawer = () => {
  const {
    isMiniCartOpen,
    setIsMiniCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartShipping,
    cartTax,
    cartTotal,
    navigateTo
  } = useApp();

  if (!isMiniCartOpen) return null;

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartSubtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dark Overlay Backdrop */}
      <div
        onClick={() => setIsMiniCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Top Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-kb-gold" />
              <h2 className="font-heading font-bold text-lg">Shopping Cart</h2>
              <span className="bg-kb-green text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {cart.length} Items
              </span>
            </div>
            <button
              onClick={() => setIsMiniCartOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-emerald-50 border-b border-emerald-100 p-3 px-6">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-emerald-800 font-medium text-center">
                Add <span className="font-bold">₹{remainingForFreeShipping}</span> more to unlock <span className="font-bold">FREE Shipping!</span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-bold text-center">
                🎉 Congratulations! You unlocked FREE Shipping!
              </p>
            )}
            <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Drawer Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Discover our premium tea, coffee, iced tea, and chocolate premixes.
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  className="mt-5"
                  onClick={() => {
                    setIsMiniCartOpen(false);
                    navigateTo('catalog');
                  }}
                >
                  Explore Premixes
                </Button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-kb-green uppercase tracking-wider">
                          {item.product.brandName}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-kb-charcoal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium inline-block mt-0.5">
                          {item.variant.packSize}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-slate-200 text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-kb-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-slate-200 text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-heading font-bold text-sm text-kb-charcoal">
                        ₹{item.variant.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Bottom Actions & Order Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-kb-charcoal">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-kb-charcoal">
                    {cartShipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${cartShipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5% GST)</span>
                  <span className="font-semibold text-kb-charcoal">₹{cartTax}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-kb-charcoal pt-2 border-t border-slate-200">
                  <span>Final Total</span>
                  <span className="text-kb-green text-lg font-heading">₹{cartTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setIsMiniCartOpen(false);
                    navigateTo('cart');
                  }}
                >
                  View Cart
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  onClick={() => {
                    setIsMiniCartOpen(false);
                    navigateTo('checkout');
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
