'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Demo authentication logic
      if (email === 'admin@madhusilks.com' && password === 'Admin@MadhuSilks2026') {
        setAuth(
          { id: 1, email, first_name: 'Madhu', last_name: 'Admin', phone: '7338015172', role: 'ADMIN' },
          'mock-token-admin'
        );
        router.push('/admin');
      } else if (password.length >= 6) {
        setAuth(
          { id: 2, email, first_name: email.split('@')[0], last_name: 'Customer', phone: '9876543210', role: 'CUSTOMER' },
          'mock-token-customer'
        );
        router.push('/account/orders');
      } else {
        setError('Password must be at least 6 characters.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-maroon-900">Sign In</h1>
        <p className="text-xs text-darkbrown/70">Access your saved sarees, track orders, and manage addresses.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-cream shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-darkbrown">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <Mail className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-darkbrown">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <Lock className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-ivory font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In to Madhu Silks'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="p-3 bg-cream/50 rounded-lg text-[11px] text-darkbrown/70 space-y-1 border border-cream">
          <p className="font-semibold text-maroon-900">Administrator Access Credentials:</p>
          <p>Email: <code className="bg-white px-1 py-0.5 rounded">admin@madhusilks.com</code></p>
          <p>Password: <code className="bg-white px-1 py-0.5 rounded">Admin@MadhuSilks2026</code></p>
        </div>

        <div className="text-center text-xs text-darkbrown/70 pt-2 border-t border-cream">
          Don&apos;t have an account yet?{' '}
          <Link href="/account/register" className="font-bold text-maroon-800 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
