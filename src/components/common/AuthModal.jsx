import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from './Badge';
import { Button } from './Button';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser,
    isLoadingAuth
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [forgotEmail, setForgotEmail] = useState('');

  // Reset internal states whenever modal opens or mode changes
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMessage('');
      setForgotSuccess(false);
      setShowPassword(false);
    }
  }, [isAuthModalOpen, authModalMode]);

  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await loginUser({
        emailOrPhone: loginData.emailOrPhone,
        password: loginData.password
      });
      closeAuthModal();
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (regData.password !== regData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (regData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      await registerUser({
        fullName: regData.fullName,
        email: regData.email,
        phone: regData.phone,
        password: regData.password,
        confirmPassword: regData.confirmPassword
      });
      closeAuthModal();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to register account.');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    setErrorMessage('');
    setForgotSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden transition-all transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 mb-6">
          <Badge brand="kb">KB AUTHENTICATION</Badge>
          <h2 id="auth-modal-title" className="font-heading font-extrabold text-2xl text-kb-charcoal">
            {authModalMode === 'login'
              ? 'Welcome Back'
              : authModalMode === 'register'
              ? 'Create Your Account'
              : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {authModalMode === 'login'
              ? 'Sign in to access your orders, saved addresses & wishlist.'
              : authModalMode === 'register'
              ? 'Join KB for faster checkout & personalized beverage blends.'
              : 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Switcher Tabs (Only shown on login or register) */}
        {authModalMode !== 'forgot' && (
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authModalMode === 'login'
                  ? 'bg-white text-kb-green shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('register');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authModalMode === 'register'
                  ? 'bg-white text-kb-green shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl p-3 flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* ----------------- LOGIN FORM ----------------- */}
        {authModalMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address or Phone
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 10-digit phone"
                  value={loginData.emailOrPhone}
                  onChange={(e) =>
                    setLoginData({ ...loginData, emailOrPhone: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('forgot');
                    setErrorMessage('');
                  }}
                  className="text-xs text-kb-green font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 mt-2"
              disabled={isLoadingAuth}
            >
              {isLoadingAuth ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Account
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        )}

        {/* ----------------- REGISTER FORM ----------------- */}
        {authModalMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kush Shah"
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="kush@example.com"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={regData.phone}
                  onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={regData.confirmPassword}
                  onChange={(e) =>
                    setRegData({ ...regData, confirmPassword: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 mt-2"
              disabled={isLoadingAuth}
            >
              {isLoadingAuth ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        )}

        {/* ----------------- FORGOT PASSWORD ----------------- */}
        {authModalMode === 'forgot' && (
          <div className="space-y-4">
            {forgotSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-kb-charcoal">
                  Recovery Email Sent
                </h3>
                <p className="text-xs text-slate-500">
                  If an account exists with <strong className="text-slate-700">{forgotEmail}</strong>, password reset instructions have been dispatched.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setAuthModalMode('login');
                    setForgotSuccess(false);
                  }}
                  className="w-full justify-center py-2.5 mt-2"
                >
                  Return to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kb-green/20 focus:border-kb-green transition"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center py-3"
                >
                  Send Reset Link
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('login');
                      setErrorMessage('');
                    }}
                    className="text-xs text-slate-500 hover:text-kb-green font-medium"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Modal Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            By continuing, you agree to KB's{' '}
            <span className="text-slate-600 underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-slate-600 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
