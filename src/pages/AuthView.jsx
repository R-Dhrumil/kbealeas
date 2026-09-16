import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Lock, Mail, User, Phone, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const AuthView = () => {
  const { loginUser, registerUser, isLoadingAuth, navigateTo } = useApp();
  const [mode, setMode] = useState('login'); // login, register, forgot
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await loginUser({
        emailOrPhone: loginData.emailOrPhone,
        password: loginData.password
      });
      navigateTo('account');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in. Please check your credentials.');
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
      navigateTo('account');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to register account.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-0 py-12 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <Badge brand="kb">KB ECOMMERCE AUTH</Badge>
        <h1 className="font-heading font-extrabold text-3xl text-kb-charcoal">
          {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Your Account' : 'Reset Password'}
        </h1>
        <p className="text-xs text-slate-500">
          Access your KB order history, address book, and saved premixes.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-kb-soft space-y-6">
        {/* Auth Modes Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${mode === 'login' ? 'bg-white text-kb-green shadow-xs' : ''}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${mode === 'register' ? 'bg-white text-kb-green shadow-xs' : ''}`}
          >
            Create Account
          </button>
        </div>

        {/* ERROR ALERT DISPLAY */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl p-3.5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email or Phone</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter email or phone number"
                  value={loginData.emailOrPhone}
                  onChange={(e) => setLoginData({ ...loginData, emailOrPhone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setErrorMessage(''); }}
                  className="text-xs font-semibold text-kb-green hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoadingAuth}
              icon={isLoadingAuth ? Loader2 : ArrowRight}
              className="w-full"
            >
              {isLoadingAuth ? 'AUTHENTICATING...' : 'SIGN IN TO KB'}
            </Button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Kush Shah"
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="kush@example.com"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="+91 96240 91000"
                  value={regData.phone}
                  onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Re-enter your password"
                  value={regData.confirmPassword}
                  onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoadingAuth}
              icon={isLoadingAuth ? Loader2 : CheckCircle2}
              className="w-full"
            >
              {isLoadingAuth ? 'CREATING ACCOUNT...' : 'CREATE MY ACCOUNT'}
            </Button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addToast('Password reset link sent to your email!', 'info');
              setMode('login');
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Registered Email</label>
              <input
                type="email"
                required
                placeholder="Enter your registered email..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-kb-green focus:outline-none"
              />
            </div>

            <Button variant="primary" size="lg" type="submit" className="w-full">
              SEND RESET LINK
            </Button>

            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 block text-center w-full mt-2"
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
