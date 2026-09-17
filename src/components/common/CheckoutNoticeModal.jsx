import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from './Button';
import {
  X,
  Lock,
  ArrowRight,
  ShieldAlert,
  ShoppingBag,
  UserCheck
} from 'lucide-react';

export const CheckoutNoticeModal = () => {
  const {
    isCheckoutNoticeOpen,
    closeCheckoutNotice,
    checkoutNoticeMessage,
    navigateTo
  } = useApp();

  if (!isCheckoutNoticeOpen) return null;

  const handleSignInClick = () => {
    closeCheckoutNotice();
    navigateTo('auth');
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={closeCheckoutNotice}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-notice-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 text-center space-y-6 overflow-hidden transition-all transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeCheckoutNotice}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-kb-green mx-auto flex items-center justify-center shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        {/* Modal Content */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-kb-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            CHECKOUT VERIFICATION
          </span>
          <h3 id="checkout-notice-title" className="font-heading font-extrabold text-2xl text-kb-charcoal">
            Sign In Required to Checkout
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            {checkoutNoticeMessage || 'For order security, address dispatch, and shipment tracking, please sign in or create an account.'}
          </p>
        </div>

        {/* Highlight Perks Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-kb-green shrink-0" />
            <span>Faster checkout with saved shipping addresses</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-kb-green shrink-0" />
            <span>Real-time dispatch notifications & GST invoices</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSignInClick}
            icon={ArrowRight}
            className="w-full justify-center shadow-lg shadow-kb-green/20 font-bold"
          >
            SIGN IN / CREATE ACCOUNT
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={closeCheckoutNotice}
            className="w-full text-slate-500 hover:text-slate-700 text-xs font-semibold"
          >
            Continue Browsing Store
          </Button>
        </div>
      </div>
    </div>
  );
};
