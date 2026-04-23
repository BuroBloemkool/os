'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { documenten } from '@/lib/documents-data';

const categorieStyle: Record<string, string> = {
  Voorstel: 'bg-[#FFDCF5] text-[#0E23CB]',
  Briefing: 'bg-[#FFD219]/30 text-slate-900',
  Notulen: 'bg-slate-100 text-slate-700',
  Presentatie: 'bg-[#F05532]/10 text-[#F05532]',
  Download: 'bg-emerald-100 text-emerald-700',
};

const bronStyle: Record<string, string> = {
  nas: 'bg-[#0E23CB]/10 text-[#0E23CB]',
  drive: 'bg-emerald-100 text-emerald-700',
  upload: 'bg-amber-100 text-amber-700',
};

const filters = ['Alles', 'Voorstel', 'Briefing', 'Notulen', 'Presentatie', 'Download'] as const;
type FilterType = (typeof filters)[number];

export default function DocumentenPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Alles');

  const filteredDocuments = useMemo(() => {
    if (activeFilter === 'Alles') return documenten;
    return documenten.filter((doc) => doc.categorie === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
              Documenten
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
              Documenten en gedeelde bestanden
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              Hier vind je alle documenten rondom onze samenwerking. Deze pagina is ingericht op een
              vaste NAS-structuur, zodat bestanden later eenvoudig aan jullie eigen opslag gekoppeld
              kunnen worden zonder de hele interface om te gooien.
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Documentcategorieën</h2>
              <p className="mt-2 text-sm text-slate-600">
                Voorstellen, briefings, notulen, presentaties en downloads blijven netjes gescheiden.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Bronnen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Bestanden kunnen uit NAS, Drive of klantuploads komen, zonder dat de klant dat systeem hoeft te begrijpen.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Vaste structuur</h2>
              <p className="mt-2 text-sm text-slate-600">
                Elk bestand houdt een pad, bron en acties zoals bekijken of downloaden.
              </p>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#0E23CB]">Bestandsoverzicht</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Filter documenten op categorie om sneller te vinden wat je zoekt.
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
                    <th className="pb-3">Document</th>
                    <th className="pb-3">Categorie</th>
                    <th className="pb-3">Bron</th>
                    <th className="pb-3">Datum</th>
                    <th className="pb-3">Bestandspad</th>
                    <th className="pb-3">Acties</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-t border-slate-100 align-top">
                      <td className="py-4 font-medium text-slate-900">{doc.naam}</td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${categorieStyle[doc.categorie]}`}>
                          {doc.categorie}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${bronStyle[doc.bron]}`}>
                          {doc.bron.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-4 text-slate-600">{doc.datum}</td>

                      <td className="py-4">
                        <code className="rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600">
                          {doc.bestandPad}
                        </code>
                      </td>

                      <td className="py-4">
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={doc.bekijkenUrl || '#'}
                            className="text-sm font-medium text-[#0E23CB] hover:underline"
                          >
                            Bekijken
                          </a>
                          <a
                            href={doc.downloadUrl || '#'}
                            className="text-sm font-medium text-[#0E23CB] hover:underline"
                          >
                            Downloaden
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredDocuments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-slate-500">
                        Geen documenten gevonden binnen deze categorie.
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
                <p>/Klantnaam/01 Documenten/Voorstellen</p>
                <p>/Klantnaam/01 Documenten/Briefings</p>
                <p>/Klantnaam/01 Documenten/Notulen</p>
                <p>/Klantnaam/01 Documenten/Presentaties</p>
                <p>/Klantnaam/01 Documenten/Downloads</p>
                <p>/Klantnaam/02 Opleveringen</p>
                <p>/Klantnaam/03 Branding</p>
                <p>/Klantnaam/04 Content</p>
                <p>/Klantnaam/05 Aangeleverd door klant</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0E23CB]">Bestand aanleveren</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Wil je zelf een document delen? Dan kun je later aanleveren via een klantupload-map of een beveiligde uploadlink.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-[#0E23CB] px-4 py-2 text-sm font-medium text-white"
                >
                  Uploadlink aanvragen
                </button>

                <button
                  type="button"
                  className="rounded-full border border-[#0E23CB] px-4 py-2 text-sm font-medium text-[#0E23CB]"
                >
                  Aangeleverde bestanden bekijken
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}