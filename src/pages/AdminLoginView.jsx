import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  Store,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const AdminLoginView = () => {
  const { loginUser, isLoadingAuth, navigateTo } = useApp();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const res = await loginUser({
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      });

      if (res?.user?.role !== 'Admin') {
        setErrorMessage('Access Denied: This portal is strictly reserved for Administrators.');
        return;
      }

      navigateTo('admin');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-kb-cream text-kb-charcoal flex flex-col justify-center items-center p-4 sm:p-6 font-sans animate-fade-in relative overflow-hidden">
      {/* Aesthetic Background Accents matching storefront */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-kb-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Top Header Card */}
        <div className="text-center space-y-3">
          <div
            onClick={() => navigateTo('home')}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kb-green to-kb-green-light text-white flex items-center justify-center font-heading font-extrabold text-2xl mx-auto shadow-lg shadow-kb-green/20 cursor-pointer hover:scale-105 transition-transform"
          >
            KB
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <Badge brand="kb">ADMINISTRATOR CONSOLE</Badge>
            </div>
            <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal tracking-tight mt-1">
              Management Portal
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Sign in with your verified credentials to manage the premix catalog, inventory, customer orders, and wholesale inquiries.
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-kb-soft space-y-5">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl p-4 flex items-start gap-3 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
                Administrator Email or Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin@kbealeas.com"
                  value={formData.emailOrPhone}
                  onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-kb-charcoal placeholder-slate-400 focus:outline-none focus:border-kb-green focus:bg-white focus:ring-2 focus:ring-kb-green/20 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-kb-charcoal placeholder-slate-400 focus:outline-none focus:border-kb-green focus:bg-white focus:ring-2 focus:ring-kb-green/20 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoadingAuth}
                icon={isLoadingAuth ? Loader2 : ArrowRight}
                className="w-full justify-center font-bold py-3.5 shadow-lg shadow-kb-green/20"
              >
                {isLoadingAuth ? 'VERIFYING CREDENTIALS...' : 'SIGN IN TO ADMIN CONSOLE'}
              </Button>
            </div>
          </form>

          {/* Quick Credential Hint */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 text-center bg-slate-50 p-3 rounded-2xl">
            <span className="font-bold text-kb-charcoal block">Default Admin Credentials</span>
            <span>Email: <strong className="text-kb-green">admin@kbealeas.com</strong></span>
            <span className="block">Password: <strong className="text-kb-green">Admin@123</strong></span>
          </div>
        </div>

        {/* Back to Public Storefront */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-kb-green transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>
      </div>
    </div>
  );
};
