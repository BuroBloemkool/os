'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
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

export default function AanvraagDetailPage() {
  const params = useParams<{ id: string }>();
  const [aanvraag, setAanvraag] = useState<RequestItem | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const requests = loadRequests();
    const found = requests.find((item) => item.id === Number(params.id)) || null;
    setAanvraag(found);
    setLoaded(true);
  }, [params.id]);

  if (loaded && !aanvraag) {
    notFound();
  }

  if (!loaded || !aanvraag) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeStyle[aanvraag.type]}`}>
                {aanvraag.type}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[aanvraag.status]}`}>
                {aanvraag.status}
              </span>
            </div>

            <h1 className="text-3xl font-semibold text-[#0E23CB]">{aanvraag.titel}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              {aanvraag.omschrijving}
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Aangevraagd door</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{aanvraag.aangevraagdDoor}</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Deadline</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{aanvraag.deadline}</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Volgende stap</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {aanvraag.volgendeStap || 'Nog niet bepaald'}
              </p>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0E23CB]">Acties</h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {aanvraag.gekoppeldBerichtId && (
                <Link
                  href={`/berichten?thread=${aanvraag.gekoppeldBerichtId}`}
                  className="rounded-full bg-[#0E23CB] px-4 py-2 text-sm font-medium text-white"
                >
                  Open gekoppeld gesprek
                </Link>
              )}

              <Link
                href="/aanvragen"
                className="rounded-full border border-[#0E23CB] px-4 py-2 text-sm font-medium text-[#0E23CB]"
              >
                Terug naar aanvragen
              </Link>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0E23CB]">Samenvatting</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                Deze aanvraag staat momenteel op status <strong>{aanvraag.status}</strong>.
              </p>
              <p>
                Het type aanvraag is <strong>{aanvraag.type}</strong> en de gewenste deadline is{' '}
                <strong>{aanvraag.deadline}</strong>.
              </p>
              <p>
                Alle communicatie over deze aanvraag kan gekoppeld worden aan het bijbehorende gesprek,
                zodat feedback en opvolging op één plek blijven staan.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}