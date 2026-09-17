import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/common/ProductCard';
import { accountService } from '../services/accountService';
import {
  User,
  Package,
  MapPin,
  LogOut,
  Phone,
  Mail,
  Edit3,
  Plus,
  ShoppingBag,
  Heart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Home,
  Briefcase,
  X,
  CreditCard,
  Save
} from 'lucide-react';

export const AccountView = () => {
  const {
    user,
    token,
    orders,
    navigateTo,
    cart,
    wishlist,
    products,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    logoutUser,
    addToast,
    refreshUserData
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // orders, cart, wishlist, profile, addresses

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    recipientName: '',
    phone: '',
    addressType: 'Home',
    streetAddress: '',
    apartmentSuite: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefaultShipping: false,
    isDefaultBilling: false
  });
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    alternatePhone: '',
    preferredLanguage: 'en',
    dietaryPreference: '',
    emailNotifications: true,
    smsNotifications: true,
    promotionalEmails: false
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync profile form when user state loads
  useEffect(() => {
    if (user?.isLoggedIn) {
      setProfileForm({
        fullName: user.name || '',
        phone: user.phone || '',
        alternatePhone: user.profile?.alternatePhone || '',
        preferredLanguage: user.profile?.preferredLanguage || 'en',
        dietaryPreference: user.profile?.dietaryPreference || '',
        emailNotifications: user.profile?.emailNotifications ?? true,
        smsNotifications: user.profile?.smsNotifications ?? true,
        promotionalEmails: user.profile?.promotionalEmails ?? false
      });
    }
  }, [user]);

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  // Open Address Modal for New Address
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      recipientName: user.name || '',
      phone: user.phone || '',
      addressType: 'Home',
      streetAddress: '',
      apartmentSuite: '',
      city: '',
      state: 'Gujarat',
      postalCode: '',
      country: 'India',
      isDefaultShipping: user.addresses.length === 0,
      isDefaultBilling: user.addresses.length === 0
    });
    setIsAddressModalOpen(true);
  };

  // Open Address Modal for Edit
  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      recipientName: addr.recipientName || '',
      phone: addr.phone || '',
      addressType: addr.addressType || 'Home',
      streetAddress: addr.streetAddress || '',
      apartmentSuite: addr.apartmentSuite || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.postalCode || '',
      country: addr.country || 'India',
      isDefaultShipping: addr.isDefaultShipping || false,
      isDefaultBilling: addr.isDefaultBilling || false
    });
    setIsAddressModalOpen(true);
  };

  // Save Address (Create or Update)
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (!addressForm.recipientName || !addressForm.phone || !addressForm.streetAddress || !addressForm.city || !addressForm.postalCode) {
      addToast('Please fill in all mandatory address fields.', 'error');
      return;
    }

    setIsSubmittingAddress(true);
    try {
      if (editingAddressId) {
        await accountService.updateAddress(token, editingAddressId, addressForm);
        addToast('Address updated successfully!', 'success');
      } else {
        await accountService.createAddress(token, addressForm);
        addToast('New address saved to address book!', 'success');
      }
      setIsAddressModalOpen(false);
      await refreshUserData();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setIsSubmittingAddress(false);
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id) => {
    if (!token || !window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await accountService.deleteAddress(token, id);
      addToast('Address removed from address book.', 'info');
      await refreshUserData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Set Default Shipping
  const handleSetDefaultShipping = async (id) => {
    if (!token) return;
    try {
      await accountService.setDefaultShipping(token, id);
      addToast('Default shipping address updated.', 'success');
      await refreshUserData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Set Default Billing
  const handleSetDefaultBilling = async (id) => {
    if (!token) return;
    try {
      await accountService.setDefaultBilling(token, id);
      addToast('Default billing address updated.', 'success');
      await refreshUserData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!token) return;

    setIsSavingProfile(true);
    try {
      await accountService.updateProfile(token, profileForm);
      addToast('Profile updated successfully!', 'success');
      setIsEditingProfile(false);
      await refreshUserData();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (!user?.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-100 shadow-kb-soft text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-kb-green mx-auto flex items-center justify-center font-bold">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-kb-charcoal">Sign In Required</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Please sign in to access your customer profile, order history, multi-address book, and saved premixes.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigateTo('auth')} icon={ArrowRight} className="w-full">
          SIGN IN TO YOUR ACCOUNT
        </Button>
      </div>
    );
  }

  const isAdmin = user.role === 'Admin';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge brand="kb">
              {isAdmin ? 'ADMINISTRATOR DASHBOARD' : 'CUSTOMER PORTAL'}
            </Badge>
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              isAdmin ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-emerald-100 text-emerald-800'
            }`}>
              Role: {user.role || 'Customer'}
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal mt-1">
            Welcome back, {user.name || 'Valued Customer'}!
          </h1>
        </div>

        {isAdmin && (
          <Button variant="outline" size="sm" onClick={() => navigateTo('admin')} icon={ShieldCheck}>
            Open Admin Control Center
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Account Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-100 shadow-kb-soft space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'orders'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Orders & Tracking</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'cart'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>My Shopping Cart</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'cart' ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
            }`}>
              {cart.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'wishlist'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4" />
              <span>Liked Premixes</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'wishlist' ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
            }`}>
              {wishlist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
              activeTab === 'addresses'
                ? 'bg-kb-green text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>Address Book</span>
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeTab === 'addresses' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {user.addresses ? user.addresses.length : 0}
            </span>
          </button>

          <button
            onClick={logoutUser}
            className="w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 text-rose-600 hover:bg-rose-50 transition-all pt-4 border-t border-slate-100 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-xl text-kb-charcoal border-b border-slate-100 pb-3">
                Order History & Status
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <Package className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-medium">No past orders found.</p>
                  <Button variant="primary" size="sm" onClick={() => navigateTo('catalog')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs">
                        <div>
                          <span className="font-heading font-bold text-base text-kb-charcoal block">
                            Order #{order.id}
                          </span>
                          <span className="text-slate-500">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-xs">
                            Status: {order.status}
                          </span>
                          <span className="font-heading font-bold text-base text-kb-green">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-slate-700">
                            <div>
                              <strong className="text-kb-green">{item.brandName}</strong> - {item.productName} ({item.packSize}) × {item.quantity}
                            </div>
                            <span className="font-semibold text-kb-charcoal">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                        <span>Payment: {order.paymentMethod}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateTo('order-success')}
                        >
                          View Live Tracking
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY CART */}
          {activeTab === 'cart' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                    My Shopping Cart ({cart.length} {cart.length === 1 ? 'Product' : 'Products'})
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Items added to your current session
                  </p>
                </div>
                {cart.length > 0 && (
                  <Button variant="primary" size="sm" onClick={() => navigateTo('checkout')} icon={ArrowRight}>
                    Proceed to Checkout
                  </Button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-kb-charcoal">Your Shopping Cart is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Explore our handcrafted tea, coffee, and iced beverage premixes and add them to your cart!
                  </p>
                  <Button variant="primary" size="sm" onClick={() => navigateTo('catalog')}>
                    Explore Premixes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="divide-y divide-slate-100">
                    {cart.map((item, idx) => (
                      <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-kb-green tracking-wider block">
                              {item.product.brandId?.toUpperCase()}
                            </span>
                            <h4 className="font-heading font-bold text-sm text-kb-charcoal">
                              {item.product.name}
                            </h4>
                            <span className="text-xs text-slate-400">
                              Pack: {item.variant.packSize} • ₹{item.variant.price} each
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-5">
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-slate-600 hover:text-kb-green transition-colors text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-slate-600 hover:text-kb-green transition-colors text-xs font-bold"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <span className="font-heading font-extrabold text-sm text-kb-green block">
                              ₹{item.variant.price * item.quantity}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.variant.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-xl hover:bg-rose-50"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div>
                      <span className="text-xs text-slate-500 block">Total Cart Value</span>
                      <span className="font-heading font-extrabold text-xl text-kb-charcoal">
                        ₹{cartTotal}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button variant="outline" size="sm" onClick={() => navigateTo('cart')} className="w-full sm:w-auto">
                        Open Full Cart
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => navigateTo('checkout')} icon={ArrowRight} className="w-full sm:w-auto">
                        Checkout Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIKED / WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                    Liked Premixes ({favoritedProducts.length} Saved)
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Your personal favorite blends and recipes
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateTo('catalog')}>
                  Browse More
                </Button>
              </div>

              {favoritedProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center font-bold">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-kb-charcoal">No Liked Premixes Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click the heart icon on any premix flavor to save it to your favorites list!
                  </p>
                  <Button variant="primary" size="sm" onClick={() => navigateTo('catalog')}>
                    Explore Flavors
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE & PREFERENCES */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                    Personal Profile & Preferences
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage your identity details, contact info, and store preferences.
                  </p>
                </div>
                <Button
                  variant={isEditingProfile ? 'outline' : 'primary'}
                  size="sm"
                  icon={isEditingProfile ? X : Edit3}
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}
                </Button>
              </div>

              {!isEditingProfile ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Full Name</span>
                      <span className="font-bold text-kb-charcoal text-base">{user.name || 'Not provided'}</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Email Address</span>
                      <span className="font-bold text-kb-charcoal text-base">{user.email || 'Not provided'}</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Primary Phone</span>
                      <span className="font-bold text-kb-charcoal text-base">{user.phone || 'Not provided'}</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Alternate Phone</span>
                      <span className="font-bold text-kb-charcoal text-base">{user.profile?.alternatePhone || 'None'}</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Account Role</span>
                      <span className="font-bold text-kb-green text-base flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> {user.role || 'Customer'}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Dietary Preference</span>
                      <span className="font-bold text-kb-charcoal text-base">{user.profile?.dietaryPreference || 'Standard / None'}</span>
                    </div>
                  </div>

                  {/* Notification Flags */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <h4 className="font-heading font-bold text-sm text-kb-charcoal">Communication Preferences</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${user.profile?.emailNotifications ? 'text-kb-green' : 'text-slate-300'}`} />
                        <span>Email Order Updates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${user.profile?.smsNotifications ? 'text-kb-green' : 'text-slate-300'}`} />
                        <span>SMS Tracking Alerts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${user.profile?.promotionalEmails ? 'text-kb-green' : 'text-slate-300'}`} />
                        <span>Promotional Deals</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Primary Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Alternate Phone</label>
                      <input
                        type="tel"
                        value={profileForm.alternatePhone}
                        onChange={(e) => setProfileForm({ ...profileForm, alternatePhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Dietary Preference</label>
                      <select
                        value={profileForm.dietaryPreference}
                        onChange={(e) => setProfileForm({ ...profileForm, dietaryPreference: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30 text-xs"
                      >
                        <option value="">None / Standard</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Sugar-Free">Sugar-Free</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <label className="font-bold text-slate-700 block">Notifications & Communications</label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileForm.emailNotifications}
                          onChange={(e) => setProfileForm({ ...profileForm, emailNotifications: e.target.checked })}
                          className="rounded text-kb-green focus:ring-kb-green"
                        />
                        <span>Receive Email order confirmations & invoice copies</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileForm.smsNotifications}
                          onChange={(e) => setProfileForm({ ...profileForm, smsNotifications: e.target.checked })}
                          className="rounded text-kb-green focus:ring-kb-green"
                        />
                        <span>Receive SMS delivery updates & dispatch notices</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileForm.promotionalEmails}
                          onChange={(e) => setProfileForm({ ...profileForm, promotionalEmails: e.target.checked })}
                          className="rounded text-kb-green focus:ring-kb-green"
                        />
                        <span>Receive promotional offers & new blend launch previews</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <Button variant="outline" size="sm" type="button" onClick={() => setIsEditingProfile(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit" icon={Save} disabled={isSavingProfile}>
                      {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 5: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-heading font-bold text-xl text-kb-charcoal">
                    Saved Multi-Address Book
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add and organize your shipping and billing destinations.
                  </p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAddAddress}>
                  Add New Address
                </Button>
              </div>

              {(!user.addresses || user.addresses.length === 0) ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-kb-green mx-auto flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-kb-charcoal">No Saved Addresses Yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Save your delivery addresses for ultra-fast single-click checkout!
                  </p>
                  <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAddAddress}>
                    Add Your First Address
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                        addr.isDefaultShipping
                          ? 'border-2 border-kb-green bg-emerald-50/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {addr.addressType === 'Work' ? (
                              <Briefcase className="w-4 h-4 text-slate-500" />
                            ) : (
                              <Home className="w-4 h-4 text-kb-green" />
                            )}
                            <span className="font-heading font-bold text-sm text-kb-charcoal">
                              {addr.recipientName}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                              {addr.addressType || 'Home'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditAddress(addr)}
                              className="p-1.5 text-slate-400 hover:text-kb-green rounded-lg hover:bg-slate-100 transition-colors"
                              title="Edit Address"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Delete Address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Default Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {addr.isDefaultShipping && (
                            <span className="bg-kb-green text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              DEFAULT SHIPPING
                            </span>
                          )}
                          {addr.isDefaultBilling && (
                            <span className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              DEFAULT BILLING
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                          {addr.streetAddress}
                          {addr.apartmentSuite ? `, ${addr.apartmentSuite}` : ''}
                          <br />
                          {addr.city}, {addr.state} - {addr.postalCode}
                          <br />
                          {addr.country}
                        </p>

                        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{addr.phone}</span>
                        </div>
                      </div>

                      {/* Default Toggle Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        {!addr.isDefaultShipping ? (
                          <button
                            onClick={() => handleSetDefaultShipping(addr.id)}
                            className="hover:text-kb-green font-bold underline cursor-pointer"
                          >
                            Set as Default Shipping
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Shipping Default
                          </span>
                        )}

                        {!addr.isDefaultBilling ? (
                          <button
                            onClick={() => handleSetDefaultBilling(addr.id)}
                            className="hover:text-slate-800 font-bold underline cursor-pointer"
                          >
                            Set Default Billing
                          </button>
                        ) : (
                          <span className="text-slate-700 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Billing Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADDRESS MODAL (ADD / EDIT) */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-extrabold text-xl text-kb-charcoal">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.recipientName}
                    onChange={(e) => setAddressForm({ ...addressForm, recipientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                    placeholder="e.g. Rajesh Patel"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                    placeholder="e.g. 9825011223"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Address Type</label>
                <div className="flex gap-4">
                  {['Home', 'Work', 'Other'].map((type) => (
                    <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        value={type}
                        checked={addressForm.addressType === type}
                        onChange={(e) => setAddressForm({ ...addressForm, addressType: e.target.value })}
                        className="text-kb-green focus:ring-kb-green"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={addressForm.streetAddress}
                  onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                  placeholder="e.g. 202, Sai Pancham Flat, Gotri Road"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  value={addressForm.apartmentSuite}
                  onChange={(e) => setAddressForm({ ...addressForm, apartmentSuite: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                  placeholder="e.g. Block B, 2nd Floor"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                    placeholder="Vadodara"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                    placeholder="Gujarat"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-bold text-slate-700 block mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kb-green/30"
                    placeholder="390011"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addressForm.isDefaultShipping}
                    onChange={(e) => setAddressForm({ ...addressForm, isDefaultShipping: e.target.checked })}
                    className="rounded text-kb-green focus:ring-kb-green"
                  />
                  <span>Make this my default shipping address</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addressForm.isDefaultBilling}
                    onChange={(e) => setAddressForm({ ...addressForm, isDefaultBilling: e.target.checked })}
                    className="rounded text-kb-green focus:ring-kb-green"
                  />
                  <span>Make this my default billing address</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsAddressModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={isSubmittingAddress}>
                  {isSubmittingAddress ? 'Saving...' : editingAddressId ? 'Update Address' : 'Save Address'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
