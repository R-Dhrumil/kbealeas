import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CheckCircle2, Package, Truck, Home, MapPin, ArrowRight } from 'lucide-react';

export const OrderSuccessView = () => {
  const { lastPlacedOrder, navigateTo } = useApp();

  const order = lastPlacedOrder || {
    id: "KB-89241",
    date: new Date().toISOString().split('T')[0],
    status: "Confirmed",
    items: [
      { productName: "Cardamom Tea Premix", brandName: "VRINDA", packSize: "1 Kg Pouch", price: 450, quantity: 2 },
      { productName: "Guava Chilly Iced Tea Premix", brandName: "SANGAM", packSize: "1 Kg Pouch", price: 490, quantity: 1 }
    ],
    total: 1460,
    paymentMethod: "UPI Instant Payment",
    shippingAddress: "202, Sai Pancham Flat, Manjalpur Naka, Vadodara - 390011"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fade-in text-center sm:text-left">
      {/* Top Banner Celebration */}
      <div className="bg-gradient-to-r from-emerald-900 to-kb-green text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-emerald-300 mx-auto sm:mx-0 flex items-center justify-center font-bold">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-1">
          <span className="bg-kb-gold/20 text-kb-gold border border-kb-gold/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ORDER CONFIRMED
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white pt-2">
            Thank You for Your Order!
          </h1>
          <p className="text-emerald-100 text-sm">
            Your order <strong className="text-white">#{order.id}</strong> has been received and is being processed at our Vadodara facility.
          </p>
        </div>
      </div>

      {/* Order Fulfillment Timeline Status Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft space-y-6">
        <h3 className="font-heading font-bold text-lg text-kb-charcoal border-b border-slate-100 pb-3">
          Live Order Status Tracking
        </h3>

        <div className="grid grid-cols-5 gap-2 text-center text-xs font-medium">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold shadow-md">
              ✓
            </div>
            <span className="font-bold text-emerald-700 block">Confirmed</span>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold shadow-md">
              ✓
            </div>
            <span className="font-bold text-emerald-700 block">Processing</span>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-slate-500 block">Packed</span>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center font-bold">
              4
            </div>
            <span className="text-slate-500 block">Shipped</span>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center font-bold">
              5
            </div>
            <span className="text-slate-500 block">Delivered</span>
          </div>
        </div>
      </div>

      {/* Order Details Receipt Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-kb-charcoal">
              Order Receipt Overview
            </h3>
            <span className="text-xs text-slate-500">Order ID: #{order.id} | Date: {order.date}</span>
          </div>
          <Badge brand="kb">{order.paymentMethod}</Badge>
        </div>

        {/* Item List */}
        <div className="divide-y divide-slate-100 space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="pt-3 first:pt-0 flex justify-between items-center text-sm">
              <div>
                <span className="text-[10px] font-bold text-kb-green uppercase block">
                  {item.brandName}
                </span>
                <h4 className="font-bold text-kb-charcoal">{item.productName}</h4>
                <span className="text-xs text-slate-500">{item.packSize} × {item.quantity}</span>
              </div>
              <span className="font-heading font-bold text-base text-kb-charcoal">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Address & Total Summary */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-start gap-2 max-w-md">
            <MapPin className="w-4 h-4 text-kb-green shrink-0 mt-0.5" />
            <div>
              <strong className="text-kb-charcoal block">Delivery Address:</strong>
              <span>{order.shippingAddress}</span>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto">
            <span className="text-slate-500 block">Total Amount Paid</span>
            <span className="text-2xl font-extrabold text-kb-green font-heading">
              ₹{order.total}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigateTo('account')}
          icon={Package}
        >
          VIEW ORDERS IN ACCOUNT
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => navigateTo('catalog')}
          icon={Home}
        >
          CONTINUE SHOPPING
        </Button>
      </div>
    </div>
  );
};
