import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, COMPANY_INFO } from '../data/mockData';
import { authService } from '../services/authService';
import { accountService } from '../services/accountService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State - inspect window.location.pathname for initial view (e.g. /admin)
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin' || path.startsWith('/admin/')) return 'admin';
    if (path === '/auth' || path === '/login') return 'auth';
    if (path === '/cart') return 'cart';
    if (path === '/checkout') return 'checkout';
    if (path === '/catalog' || path === '/shop') return 'catalog';
    if (path === '/account') return 'account';
    return 'home';
  };

  const [activeView, setActiveView] = useState(getInitialView);
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dedicated "Sign In Required for Checkout" Notice Modal Popup
  const [isCheckoutNoticeOpen, setIsCheckoutNoticeOpen] = useState(false);
  const [checkoutNoticeMessage, setCheckoutNoticeMessage] = useState('Please sign in to proceed to checkout.');

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [authRedirectTarget, setAuthRedirectTarget] = useState(null);
  const [authPromptMessage, setAuthPromptMessage] = useState(null);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Products Database (Stateful for Admin CRUD)
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Cart State (Persisted in localStorage for visitors and members alike)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kb_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer Auth State (Dynamic, default clean state)
  const [token, setToken] = useState(() => localStorage.getItem('kb_auth_token') || null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: null,
    name: '',
    email: '',
    phone: '',
    role: 'Customer',
    addresses: []
  });

  // Hydrate user session on mount if token exists in localStorage
  useEffect(() => {
    const verifyUserSession = async () => {
      const storedToken = localStorage.getItem('kb_auth_token');
      if (!storedToken) return;

      setIsLoadingAuth(true);
      try {
        const userDto = await authService.getCurrentUser(storedToken);
        let userProfile = null;
        let userAddresses = [];

        try {
          userProfile = await accountService.getProfile(storedToken);
          userAddresses = await accountService.getAddresses(storedToken);
        } catch (profileErr) {
          console.warn('Could not load profile or addresses:', profileErr.message);
        }

        setToken(storedToken);
        setUser({
          isLoggedIn: true,
          id: userDto.id,
          name: userProfile?.fullName || userDto.fullName || '',
          email: userDto.email || '',
          phone: userProfile?.phone || userDto.phone || '',
          role: userDto.role || 'Customer',
          profile: userProfile,
          addresses: userAddresses || []
        });
      } catch (err) {
        console.warn('Session expired or invalid token:', err.message);
        localStorage.removeItem('kb_auth_token');
        setToken(null);
        setUser({
          isLoggedIn: false,
          id: null,
          name: '',
          email: '',
          phone: '',
          role: 'Customer',
          profile: null,
          addresses: []
        });
      } finally {
        setIsLoadingAuth(false);
      }
    };

    verifyUserSession();
  }, []);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: "KB-89241",
      date: "2026-09-02",
      status: "Delivered",
      timelineStep: 5,
      items: [
        {
          productName: "Cardamom Tea Premix",
          brandName: "VRINDA",
          packSize: "1 Kg Pouch",
          price: 450,
          quantity: 2
        }
      ],
      total: 900,
      paymentMethod: "UPI Instant Payment",
      shippingAddress: "202, Sai Pancham Flat, Vadodara, Gujarat - 390011"
    }
  ]);

  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // B2B Inquiry Requests (for Wholesale and Admin Panel)
  const [b2bLeads, setB2bLeads] = useState([
    {
      id: "LEAD-101",
      companyName: "Prakruti Resort & Spa",
      contactPerson: "Mr. Rajesh Patel",
      phone: "+91 98250 11223",
      email: "purchase@prakrutiresort.com",
      requirement: "Tea & Coffee Premixes (50 Kg/month)",
      status: "Contacted",
      date: "2026-09-05"
    },
    {
      id: "LEAD-102",
      companyName: "Aura Laser & Cosmetic Clinic",
      contactPerson: "Dr. Aditya Shah",
      phone: "+91 99040 55443",
      email: "info@auraclinic.in",
      requirement: "Sangam Iced Tea & Vrinda Tea (20 Kg/month)",
      status: "New Enquiry",
      date: "2026-09-07"
    }
  ]);

  // Dynamic Toast Notifications Queue
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('kb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kb_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast Function
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Navigation Trigger Helper with history push
  const navigateTo = (viewName, params = {}) => {
    if (params.product) setSelectedProduct(params.product);
    if (params.category) setSelectedCategoryFilter(params.category);
    if (params.brand) setSelectedBrandFilter(params.brand);
    setActiveView(viewName);
    setIsMobileMenuOpen(false);

    // Sync window pathname for clean URL navigation
    const targetPath = viewName === 'home' ? '/' : `/${viewName}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: viewName }, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Checkout Login Notification Modal Controls
  const openCheckoutNotice = (message = 'To proceed with checkout and delivery, you need to sign in or create an account.') => {
    setCheckoutNoticeMessage(message);
    setIsCheckoutNoticeOpen(true);
  };

  const closeCheckoutNotice = () => {
    setIsCheckoutNoticeOpen(false);
  };

  // Cart Operations (Freely accessible for visitors and members)
  const addToCart = (product, variant, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, variant, quantity }];
    });
    addToast(`Added ${product.name} (${variant.packSize}) to Cart!`, 'success');
    return true;
  };

  const removeFromCart = (productId, variantId) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.variant.id === variantId)));
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, variantId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.variant.price * item.quantity, 0);
  const cartShipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 70;
  const cartTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartTotal = cartSubtotal + cartShipping + cartTax;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    if (!user?.isLoggedIn) {
      openAuthModal('login', null, 'Please sign in to save items to your wishlist.');
      return;
    }
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Added to Wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Place Order Helper (Checkout UI -> Order Confirmation UI)
  const placeOrder = (checkoutDetails) => {
    const newOrder = {
      id: `KB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: "Confirmed",
      timelineStep: 2, // 1: Pending, 2: Confirmed, 3: Processing, 4: Shipped, 5: Delivered
      items: cart.map((item) => ({
        productName: item.product.name,
        brandName: item.product.brandName,
        packSize: item.variant.packSize,
        price: item.variant.price,
        quantity: item.quantity
      })),
      total: cartTotal,
      subtotal: cartSubtotal,
      shipping: cartShipping,
      tax: cartTax,
      paymentMethod: checkoutDetails.paymentMethod || "UPI Instant Payment",
      shippingAddress: `${checkoutDetails.address.addressLine}, ${checkoutDetails.address.city}, ${checkoutDetails.address.state} - ${checkoutDetails.address.pincode}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    navigateTo('order-success');
    addToast('Order placed successfully!', 'success');
  };

  // Add B2B Lead
  const submitB2bInquiry = (leadData) => {
    const newLead = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      companyName: leadData.companyName,
      contactPerson: leadData.contactPerson,
      phone: leadData.phone,
      email: leadData.email,
      requirement: leadData.requirement,
      status: "New Enquiry",
      date: new Date().toISOString().split('T')[0]
    };
    setB2bLeads((prev) => [newLead, ...prev]);
    addToast('Wholesale inquiry submitted successfully! Our B2B team will call you.', 'success');
  };

  // Admin Product Management
  const addOrUpdateProduct = (prodData) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === prodData.id);
      if (exists) {
        return prev.map((p) => (p.id === prodData.id ? prodData : p));
      }
      return [prodData, ...prev];
    });
    addToast(`Product ${prodData.name} saved!`, 'success');
  };

  const deleteProduct = (prodId) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    addToast('Product deleted from catalog', 'info');
  };

  // Refresh Profile & Addresses Helper
  const refreshUserData = async (activeToken = token) => {
    if (!activeToken) return;
    try {
      const [profileData, addressesData] = await Promise.all([
        accountService.getProfile(activeToken).catch(() => null),
        accountService.getAddresses(activeToken).catch(() => [])
      ]);
      setUser((prev) => ({
        ...prev,
        name: profileData?.fullName || prev.name,
        phone: profileData?.phone || prev.phone,
        role: profileData?.role || prev.role,
        profile: profileData,
        addresses: addressesData || []
      }));
    } catch (err) {
      console.error('Failed to refresh user data:', err);
    }
  };

  // Real Auth Actions
  const loginUser = async (loginData) => {
    setIsLoadingAuth(true);
    try {
      const response = await authService.login(loginData);
      const { token: jwtToken, user: userDto, message } = response;
      localStorage.setItem('kb_auth_token', jwtToken);
      setToken(jwtToken);

      // Hydrate profile and addresses
      let userProfile = null;
      let userAddresses = [];
      try {
        userProfile = await accountService.getProfile(jwtToken);
        userAddresses = await accountService.getAddresses(jwtToken);
      } catch (err) {
        console.warn('Initial account details fetch fallback:', err);
      }

      setUser({
        isLoggedIn: true,
        id: userDto.id,
        name: userProfile?.fullName || userDto.fullName || '',
        email: userDto.email || '',
        phone: userProfile?.phone || userDto.phone || '',
        role: userDto.role || 'Customer',
        profile: userProfile,
        addresses: userAddresses || []
      });
      addToast(message || 'Logged in successfully!', 'success');

      if (authRedirectTarget) {
        navigateTo(authRedirectTarget);
        setAuthRedirectTarget(null);
      }

      return { success: true, user: userDto };
    } catch (error) {
      addToast(error.message, 'error');
      throw error;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const registerUser = async (regData) => {
    setIsLoadingAuth(true);
    try {
      const response = await authService.register(regData);
      const { token: jwtToken, user: userDto, message } = response;
      localStorage.setItem('kb_auth_token', jwtToken);
      setToken(jwtToken);

      let userProfile = null;
      let userAddresses = [];
      try {
        userProfile = await accountService.getProfile(jwtToken);
        userAddresses = await accountService.getAddresses(jwtToken);
      } catch (err) {
        console.warn('Initial account details fetch fallback:', err);
      }

      setUser({
        isLoggedIn: true,
        id: userDto.id,
        name: userProfile?.fullName || userDto.fullName || '',
        email: userDto.email || '',
        phone: userProfile?.phone || userDto.phone || '',
        role: userDto.role || 'Customer',
        profile: userProfile,
        addresses: userAddresses || []
      });
      addToast(message || 'Account created successfully!', 'success');

      if (authRedirectTarget) {
        navigateTo(authRedirectTarget);
        setAuthRedirectTarget(null);
      }

      return { success: true, user: userDto };
    } catch (error) {
      addToast(error.message, 'error');
      throw error;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('kb_auth_token');
    setToken(null);
    setUser({
      isLoggedIn: false,
      id: null,
      name: '',
      email: '',
      phone: '',
      role: 'Customer',
      profile: null,
      addresses: []
    });
    addToast('Logged out successfully.', 'info');
    navigateTo('home');
  };

  // Auth Modal Handlers
  const openAuthModal = (mode = 'login', redirectTarget = null, promptMessage = null) => {
    setAuthModalMode(mode);
    setAuthRedirectTarget(redirectTarget);
    setAuthPromptMessage(promptMessage);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthRedirectTarget(null);
    setAuthPromptMessage(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        navigateTo,
        selectedProduct,
        setSelectedProduct,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedBrandFilter,
        setSelectedBrandFilter,
        searchQuery,
        setSearchQuery,
        isMiniCartOpen,
        setIsMiniCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        products,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartShipping,
        cartTax,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        token,
        user,
        setUser,
        refreshUserData,
        isLoadingAuth,
        loginUser,
        registerUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        authRedirectTarget,
        authPromptMessage,
        openAuthModal,
        closeAuthModal,
        isCheckoutNoticeOpen,
        checkoutNoticeMessage,
        openCheckoutNotice,
        closeCheckoutNotice,
        orders,
        placeOrder,
        lastPlacedOrder,
        b2bLeads,
        submitB2bInquiry,
        addOrUpdateProduct,
        deleteProduct,
        toasts,
        addToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
