'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[#FFFAEB] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
          Buro Bloemkool
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
          Inloggen
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Log in om naar het klantportaal te gaan.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              E-mailadres
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E23CB]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E23CB]"
              required
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0E23CB] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Bezig met inloggen...' : 'Inloggen'}
          </button>
        </form>
      </div>
    </main>
  );
}