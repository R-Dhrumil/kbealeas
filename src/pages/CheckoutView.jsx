import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  User,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  QrCode,
  Banknote
} from 'lucide-react';

export const CheckoutView = () => {
  const { cart, cartSubtotal, cartShipping, cartTax, cartTotal, placeOrder, user, navigateTo, openAuthModal, addToast } = useApp();

  const [step, setStep] = useState(1); // 1: Contact, 2: Address, 3: Shipping, 4: Payment

  // Address Form State
  const [formData, setFormData] = useState({
    name: user.name || "Kush Shah",
    email: user.email || "kush@kbealeas.store",
    phone: user.phone || "+91 96240 91000",
    addressLine: user.addresses[0]?.addressLine || "202, Sai Pancham Flat, Gajanand Society, Manjalpur Naka",
    city: user.addresses[0]?.city || "Vadodara",
    state: user.addresses[0]?.state || "Gujarat",
    pincode: user.addresses[0]?.pincode || "390011",
    paymentMethod: "UPI Instant Payment"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!user?.isLoggedIn) {
      openAuthModal('login', 'checkout', 'Please sign in to complete and place your order.');
      return;
    }
    placeOrder({
      address: {
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      paymentMethod: formData.paymentMethod
    });
  };

  if (cart.length === 0) {
    navigateTo('cart');
    return null;
  }

  if (!user?.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-kb-green mx-auto flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge brand="kb">SECURE CHECKOUT</Badge>
          <h2 className="font-heading font-extrabold text-2xl text-kb-charcoal">Sign In to Complete Order</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Please sign in or create an account with KB to access your saved address and proceed with payment.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => openAuthModal('login', 'checkout')}
          className="w-full justify-center py-3"
        >
          Sign In / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 pb-4">
        <Badge brand="kb">SECURE CHECKOUT</Badge>
        <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
          Complete Your Order
        </h1>
      </div>

      {/* Checkout Stepper Bar */}
      <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs text-xs font-bold text-center">
        <div className={`p-2 rounded-xl transition-all ${step >= 1 ? 'bg-kb-green text-white' : 'text-slate-400'}`}>
          1. Contact Info
        </div>
        <div className={`p-2 rounded-xl transition-all ${step >= 2 ? 'bg-kb-green text-white' : 'text-slate-400'}`}>
          2. Address
        </div>
        <div className={`p-2 rounded-xl transition-all ${step >= 3 ? 'bg-kb-green text-white' : 'text-slate-400'}`}>
          3. Shipping
        </div>
        <div className={`p-2 rounded-xl transition-all ${step >= 4 ? 'bg-kb-green text-white' : 'text-slate-400'}`}>
          4. Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Contact Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-heading font-bold text-lg text-kb-charcoal">
                <User className="w-5 h-5 text-kb-green" />
                <span>1. Contact Information</span>
              </div>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-xs text-kb-green font-bold hover:underline">
                  Edit
                </button>
              )}
            </div>

            {step === 1 ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                  />
                </div>

                <Button variant="primary" size="md" onClick={() => setStep(2)}>
                  Continue to Address
                </Button>
              </div>
            ) : (
              <div className="text-xs text-slate-600 space-y-1">
                <p><strong className="text-kb-charcoal">{formData.name}</strong> ({formData.phone})</p>
                <p>{formData.email}</p>
              </div>
            )}
          </div>

          {/* STEP 2: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-heading font-bold text-lg text-kb-charcoal">
                <MapPin className="w-5 h-5 text-kb-green" />
                <span>2. Shipping Address</span>
              </div>
              {step > 2 && (
                <button onClick={() => setStep(2)} className="text-xs text-kb-green font-bold hover:underline">
                  Edit
                </button>
              )}
            </div>

            {step === 2 ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Street / Apartment / Building Address</label>
                  <input
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                    />
                  </div>
                </div>

                <Button variant="primary" size="md" onClick={() => setStep(3)}>
                  Continue to Shipping Method
                </Button>
              </div>
            ) : (
              step > 2 && (
                <div className="text-xs text-slate-600">
                  <p>{formData.addressLine}, {formData.city}, {formData.state} - {formData.pincode}</p>
                </div>
              )
            )}
          </div>

          {/* STEP 3: Shipping Method */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-heading font-bold text-lg text-kb-charcoal">
                <Truck className="w-5 h-5 text-kb-green" />
                <span>3. Shipping Method</span>
              </div>
              {step > 3 && (
                <button onClick={() => setStep(3)} className="text-xs text-kb-green font-bold hover:underline">
                  Edit
                </button>
              )}
            </div>

            {step === 3 ? (
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl border-2 border-kb-green bg-kb-green/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-kb-charcoal block">Standard Express Courier</span>
                    <span className="text-xs text-slate-500">Delivered in 2-4 business days across India</span>
                  </div>
                  <span className="font-bold text-emerald-700 text-sm">
                    {cartShipping === 0 ? "FREE" : `₹${cartShipping}`}
                  </span>
                </div>

                <Button variant="primary" size="md" onClick={() => setStep(4)}>
                  Continue to Payment
                </Button>
              </div>
            ) : (
              step > 3 && (
                <div className="text-xs text-slate-600">
                  <p>Standard Express Courier (2-4 Business Days)</p>
                </div>
              )
            )}
          </div>

          {/* STEP 4: Payment Options */}
          {step === 4 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-heading font-bold text-lg text-kb-charcoal">
                  <CreditCard className="w-5 h-5 text-kb-green" />
                  <span>4. Select Payment Method</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="p-4 rounded-2xl border-2 border-slate-200 flex items-center justify-between cursor-pointer hover:border-kb-green transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI Instant Payment"
                      checked={formData.paymentMethod === "UPI Instant Payment"}
                      onChange={handleChange}
                      className="accent-kb-green w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-sm text-kb-charcoal block">UPI Instant Payment (GPay, PhonePe, Paytm)</span>
                      <span className="text-xs text-slate-500">Scan QR Code or enter VPA ID</span>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-kb-green" />
                </label>

                <label className="p-4 rounded-2xl border-2 border-slate-200 flex items-center justify-between cursor-pointer hover:border-kb-green transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit / Debit Card"
                      checked={formData.paymentMethod === "Credit / Debit Card"}
                      onChange={handleChange}
                      className="accent-kb-green w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-sm text-kb-charcoal block">Credit / Debit Card</span>
                      <span className="text-xs text-slate-500">Visa, Mastercard, RuPay Cards</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-slate-500" />
                </label>

                <label className="p-4 rounded-2xl border-2 border-slate-200 flex items-center justify-between cursor-pointer hover:border-kb-green transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === "Cash on Delivery"}
                      onChange={handleChange}
                      className="accent-kb-green w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-sm text-kb-charcoal block">Cash on Delivery (COD)</span>
                      <span className="text-xs text-slate-500">Pay cash upon delivery at your doorstep</span>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-amber-600" />
                </label>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handlePlaceOrder}
                icon={CheckCircle2}
                className="w-full shadow-lg shadow-kb-green/20"
              >
                PLACE ORDER (₹{cartTotal})
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-kb-soft space-y-6 sticky top-24">
          <h3 className="font-heading font-bold text-lg text-kb-charcoal border-b border-slate-100 pb-3">
            Order Items ({cart.length})
          </h3>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 text-xs">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="flex-1">
                  <span className="font-bold text-[10px] text-kb-green uppercase block">
                    {item.product.brandName}
                  </span>
                  <h4 className="font-bold text-kb-charcoal line-clamp-1">{item.product.name}</h4>
                  <span className="text-slate-500">{item.variant.packSize} × {item.quantity}</span>
                </div>
                <span className="font-bold text-kb-charcoal">₹{item.variant.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-kb-charcoal">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-kb-charcoal">{cartShipping === 0 ? "FREE" : `₹${cartShipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-bold text-kb-charcoal">₹{cartTax}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-kb-charcoal pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="text-kb-green text-lg font-heading">₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
