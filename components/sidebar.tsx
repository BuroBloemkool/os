'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CURRENT_USER, getUnreadCountForUser, loadThreads } from '@/lib/messages-store';
import { clientData } from '@/lib/client-data';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', key: 'dashboard' },
  { label: 'Berichten', href: '/berichten', key: 'berichten' },
  { label: 'Aanvragen', href: '/aanvragen', key: 'aanvragen' },
  { label: 'Samenwerking', href: '/samenwerking', key: 'samenwerking' },
  { label: 'Planning', href: '/planning', key: 'planning' },
  { label: 'Documenten', href: '/documenten', key: 'documenten' },
  { label: 'Opleveringen', href: '/opleveringen', key: 'opleveringen' },
  { label: 'Merkportaal', href: '/merkportaal', key: 'merkportaal' },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    function refreshUnread() {
      const threads = loadThreads();
      setUnreadCount(getUnreadCountForUser(threads, CURRENT_USER));
    }

    refreshUnread();

    window.addEventListener('storage', refreshUnread);
    window.addEventListener('messages-updated', refreshUnread);

    return () => {
      window.removeEventListener('storage', refreshUnread);
      window.removeEventListener('messages-updated', refreshUnread);
    };
  }, []);

  const visibleItems = navItems.filter((item) => {
    if (item.key === 'dashboard') return true;
    return clientData.actieveModules[item.key as keyof typeof clientData.actieveModules] ?? true;
  });

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:self-start lg:border-b-0 lg:border-r">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wide text-slate-500">Klantportaal</p>
        <h1 className="text-2xl font-semibold text-[#0E23CB]">Studio HQ</h1>
        <p className="mt-2 text-sm text-slate-600">{clientData.naam}</p>
      </div>

      <nav className="space-y-2">
        {visibleItems.map((item) => {
          const isBerichten = item.label === 'Berichten';

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                pathname === item.href
                  ? 'bg-[#0E23CB]/10 text-[#0E23CB]'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>

              {isBerichten && unreadCount > 0 && (
                <span className="rounded-full bg-[#F05532] px-2 py-0.5 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl bg-[#FFFAEB] p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Contact</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">Mérie</p>
        <p className="text-sm text-slate-600">
          Vragen over planning, feedback of documenten?
        </p>
        <a
          href="mailto:merie@burobloemkool.nl"
          className="mt-3 inline-block text-sm font-medium text-[#0E23CB] hover:underline"
        >
          Stuur een bericht
        </a>
      </div>
    </aside>
  );
}