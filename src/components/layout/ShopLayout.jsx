import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { MiniCartDrawer } from '../common/MiniCartDrawer';
import { ToastContainer } from '../common/ToastContainer';

export const ShopLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-kb-cream text-kb-charcoal font-sans">
      <Header />
      <MiniCartDrawer />
      <ToastContainer />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};
