import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MiniCartDrawer } from './components/common/MiniCartDrawer';
import { ToastContainer } from './components/common/ToastContainer';

import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { BrandView } from './views/BrandView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AccountView } from './views/AccountView';
import { WishlistView } from './views/WishlistView';
import { AdminView } from './views/AdminView';
import { WholesaleView } from './views/WholesaleView';
import { AuthView } from './views/AuthView';
import { StaticPagesView } from './views/StaticPagesView';

const MainLayout = () => {
  const { activeView } = useApp();

  // Admin view renders its own full layout
  if (activeView === 'admin') {
    return <AdminView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-kb-cream text-kb-charcoal font-sans">
      <Header />
      <MiniCartDrawer />
      <ToastContainer />

      <main className="flex-1">
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
        {activeView === 'wholesale' && <WholesaleView />}
        {activeView === 'auth' && <AuthView />}
        {activeView === 'about' && <StaticPagesView pageType="about" />}
        {activeView === 'contact' && <StaticPagesView pageType="contact" />}
        {activeView === 'faq' && <StaticPagesView pageType="faq" />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
