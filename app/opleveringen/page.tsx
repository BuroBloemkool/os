'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { opleveringen } from '@/lib/deliverables-data';

const typeStyle: Record<string, string> = {
  Design: 'bg-[#FFDCF5] text-[#0E23CB]',
  Video: 'bg-[#F05532]/10 text-[#F05532]',
  Copy: 'bg-[#FFD219]/30 text-slate-900',
  Website: 'bg-emerald-100 text-emerald-700',
  Download: 'bg-slate-100 text-slate-700',
};

const statusStyle: Record<string, string> = {
  'Wacht op feedback': 'bg-amber-100 text-amber-700',
  Goedgekeurd: 'bg-emerald-100 text-emerald-700',
  'Aanpassing nodig': 'bg-rose-100 text-rose-700',
};

const bronStyle: Record<string, string> = {
  nas: 'bg-[#0E23CB]/10 text-[#0E23CB]',
  drive: 'bg-emerald-100 text-emerald-700',
  upload: 'bg-amber-100 text-amber-700',
};

const filters = ['Alles', 'Design', 'Video', 'Copy', 'Website', 'Download'] as const;
type FilterType = (typeof filters)[number];

export default function OpleveringenPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Alles');

  const filteredOpleveringen = useMemo(() => {
    if (activeFilter === 'Alles') return opleveringen;
    return opleveringen.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
              Opleveringen
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
              Opleveringen en feedback
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              Hier vind je alle opgeleverde bestanden, links en materialen. Deze pagina is ingericht
              op een vaste NAS-structuur, zodat designs, video’s, copy en previews centraal beheerd
              en later eenvoudig gekoppeld kunnen worden aan jullie eigen opslag.
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Reviewflow</h2>
              <p className="mt-2 text-sm text-slate-600">
                Bekijk opleveringen, geef feedback en houd per item de status duidelijk bij.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Bronnen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Opleveringen kunnen uit NAS, Drive of uploads komen, zonder dat de interface hoeft te veranderen.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Vaste structuur</h2>
              <p className="mt-2 text-sm text-slate-600">
                Elk item houdt een type, status, bron, pad en acties zoals bekijken of downloaden.
              </p>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#0E23CB]">Bestandsoverzicht</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Filter opleveringen op type om sneller te vinden wat je zoekt.
                </p>
              </div>

              <span className="rounded-full bg-[#0E23CB]/10 px-3 py-1 text-xs font-medium text-[#0E23CB]">
                NAS-ready
              </span>
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
                    <th className="pb-3">Oplevering</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Bron</th>
                    <th className="pb-3">Datum</th>
                    <th className="pb-3">Bestandspad</th>
                    <th className="pb-3">Acties</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOpleveringen.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 align-top">
                      <td className="py-4 font-medium text-slate-900">{item.naam}</td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${typeStyle[item.type]}`}>
                          {item.type}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyle[item.status]}`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${bronStyle[item.bron]}`}>
                          {item.bron.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-4 text-slate-600">{item.datum}</td>

                      <td className="py-4">
                        <code className="rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600">
                          {item.bestandPad}
                        </code>
                      </td>

                      <td className="py-4">
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={item.bekijkenUrl || '#'}
                            className="text-sm font-medium text-[#0E23CB] hover:underline"
                          >
                            Bekijken
                          </a>
                          <a
                            href={item.downloadUrl || '#'}
                            className="text-sm font-medium text-[#0E23CB] hover:underline"
                          >
                            Downloaden
                          </a>
                          <button
                            type="button"
                            className="text-sm font-medium text-[#0E23CB] hover:underline"
                          >
                            Feedback geven
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredOpleveringen.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-sm text-slate-500">
                        Geen opleveringen gevonden binnen dit type.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0E23CB]">Voorgestelde NAS-structuur</h2>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>/Klantnaam/02 Opleveringen/Design</p>
                <p>/Klantnaam/02 Opleveringen/Video</p>
                <p>/Klantnaam/02 Opleveringen/Copy</p>
                <p>/Klantnaam/02 Opleveringen/Website</p>
                <p>/Klantnaam/02 Opleveringen/Downloads</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0E23CB]">Feedbackflow</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Vanuit deze pagina kun je straks per oplevering direct feedback geven, waarna het
                item automatisch gekoppeld kan worden aan een bericht of taak in het systeem.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-[#0E23CB] px-4 py-2 text-sm font-medium text-white"
                >
                  Feedbackflow openen
                </button>

                <button
                  type="button"
                  className="rounded-full border border-[#0E23CB] px-4 py-2 text-sm font-medium text-[#0E23CB]"
                >
                  Reviewstatus bekijken
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}