import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ShopLayout } from './components/layout/ShopLayout';

import { HomeView } from './pages/HomeView';
import { CatalogView } from './pages/CatalogView';
import { BrandView } from './pages/BrandView';
import { ProductDetailView } from './pages/ProductDetailView';
import { CartView } from './pages/CartView';
import { CheckoutView } from './pages/CheckoutView';
import { OrderSuccessView } from './pages/OrderSuccessView';
import { AccountView } from './pages/AccountView';
import { WishlistView } from './pages/WishlistView';
import { AdminView } from './pages/AdminView';
import { AuthView } from './pages/AuthView';
import { StaticPagesView } from './pages/StaticPagesView';

const MainLayout = () => {
  const { activeView } = useApp();

  // Admin view renders its own full layout
  if (activeView === 'admin') {
    return <AdminView />;
  }

  return (
    <ShopLayout>
      {activeView === 'home' && <HomeView />}
      {(activeView === 'catalog' || activeView === 'search') && <CatalogView />}
      {activeView.startsWith('brand-') && (
        <BrandView brandId={activeView.replace('brand-', '')} />
      )}
      {activeView === 'product-detail' && <ProductDetailView />}
      {activeView === 'cart' && <CartView />}
      {activeView === 'checkout' && <CheckoutView />}
      {activeView === 'order-success' && <OrderSuccessView />}
      {activeView === 'account' && <AccountView />}
      {activeView === 'wishlist' && <WishlistView />}
      {activeView === 'auth' && <AuthView />}
      {activeView === 'about' && <StaticPagesView pageType="about" />}
      {activeView === 'contact' && <StaticPagesView pageType="contact" />}
      {activeView === 'faq' && <StaticPagesView pageType="faq" />}
    </ShopLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
