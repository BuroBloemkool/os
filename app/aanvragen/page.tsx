'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { RequestItem, loadRequests } from '@/lib/requests-data';

const typeStyle: Record<string, string> = {
  'Social media': 'bg-[#FFD219]/30 text-slate-900',
  Website: 'bg-emerald-100 text-emerald-700',
  Design: 'bg-[#FFDCF5] text-[#0E23CB]',
  Content: 'bg-blue-100 text-blue-700',
  Overig: 'bg-slate-100 text-slate-700',
};

const statusStyle: Record<string, string> = {
  Ontvangen: 'bg-slate-100 text-slate-700',
  'In behandeling': 'bg-amber-100 text-amber-700',
  Gepland: 'bg-emerald-100 text-emerald-700',
  Afgerond: 'bg-green-100 text-green-700',
  Afgewezen: 'bg-rose-100 text-rose-700',
};

const filters = ['Alles', 'Social media', 'Website', 'Design', 'Content', 'Overig'] as const;
type FilterType = (typeof filters)[number];

export default function AanvragenPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Alles');
  const [aanvragen, setAanvragen] = useState<RequestItem[]>([]);

  useEffect(() => {
    function refreshRequests() {
      const loaded = loadRequests();
      setAanvragen(Array.isArray(loaded) ? loaded : []);
    }

    refreshRequests();

    window.addEventListener('storage', refreshRequests);
    window.addEventListener('requests-updated', refreshRequests);

    return () => {
      window.removeEventListener('storage', refreshRequests);
      window.removeEventListener('requests-updated', refreshRequests);
    };
  }, []);

  const filteredAanvragen = useMemo(() => {
    if (!Array.isArray(aanvragen)) return [];
    if (activeFilter === 'Alles') return aanvragen;
    return aanvragen.filter((item) => item.type === activeFilter);
  }, [activeFilter, aanvragen]);

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
              Aanvragen
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
              Lopende aanvragen
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              Hier vind je alle open en afgeronde aanvragen. Zo zie je direct wat er loopt,
              wat de status is en waar actie nodig is.
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Overzicht</h2>
              <p className="mt-2 text-sm text-slate-600">
                Alle aanvragen op één plek met type, deadline en status.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Transparantie</h2>
              <p className="mt-2 text-sm text-slate-600">
                Zie direct of iets ontvangen, ingepland of in behandeling is.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Koppeling</h2>
              <p className="mt-2 text-sm text-slate-600">
                Elke aanvraag kan gekoppeld worden aan een gesprek of taak.
              </p>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#0E23CB]">Aanvragenoverzicht</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Filter op type om sneller te vinden wat je zoekt.
                </p>
              </div>

              <Link
                href="/berichten"
                className="rounded-full border border-[#0E23CB] px-4 py-2 text-sm font-medium text-[#0E23CB] hover:bg-[#0E23CB] hover:text-white"
              >
                Nieuw bericht
              </Link>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'bg-[#0E23CB] text-white'
                      : 'border border-[#0E23CB] text-[#0E23CB] hover:bg-[#0E23CB] hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-500">
                    <th className="pb-3">Aanvraag</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Deadline</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Aangevraagd door</th>
                    <th className="pb-3">Acties</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAanvragen.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 align-top">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{item.titel}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.omschrijving}</p>
                      </td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${typeStyle[item.type]}`}>
                          {item.type}
                        </span>
                      </td>

                      <td className="py-4 text-slate-600">{item.deadline}</td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyle[item.status]}`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 text-slate-600">{item.aangevraagdDoor}</td>

                      <td className="py-4">
                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={`/aanvragen/${item.id}`}
                            className="text-sm font-medium text-[#0E23CB] hover:underline"
                          >
                            Bekijk aanvraag
                          </Link>

                          {item.gekoppeldBerichtId && (
                            <Link
                              href={`/berichten?thread=${item.gekoppeldBerichtId}`}
                              className="text-sm font-medium text-[#0E23CB] hover:underline"
                            >
                              Open gesprek
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredAanvragen.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-slate-500">
                        Geen aanvragen gevonden binnen dit type.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}