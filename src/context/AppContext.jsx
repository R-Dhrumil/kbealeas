import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, COMPANY_INFO } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Products Database (Stateful for Admin CRUD)
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kb_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: INITIAL_PRODUCTS[0], // Vrinda Cardamom
          variant: INITIAL_PRODUCTS[0].variants[0],
          quantity: 2
        },
        {
          product: INITIAL_PRODUCTS[3], // Sangam Guava Chilly
          variant: INITIAL_PRODUCTS[3].variants[0],
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kb_wishlist');
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[7].id];
    } catch {
      return [];
    }
  });

  // Customer Auth State
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "Kush Shah",
    email: "kush@kbealeas.store",
    phone: "+91 96240 91000",
    addresses: [
      {
        id: "addr-1",
        name: "Kush Shah",
        phone: "+91 96240 91000",
        addressLine: "202, Sai Pancham Flat, Gajanand Society, Manjalpur Naka",
        city: "Vadodara",
        state: "Gujarat",
        pincode: "390011",
        isDefault: true
      }
    ]
  });

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

  // Navigation Trigger Helper
  const navigateTo = (viewName, params = {}) => {
    if (params.product) setSelectedProduct(params.product);
    if (params.category) setSelectedCategoryFilter(params.category);
    if (params.brand) setSelectedBrandFilter(params.brand);
    setActiveView(viewName);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
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
        user,
        setUser,
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
