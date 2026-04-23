import { Sidebar } from '@/components/sidebar';
import { ContentPlanner } from '@/components/content-planner';
import { clientData } from '@/lib/client-data';

const hasSocialMediaPlanning = clientData.actieveModules.socialMedia;
const merieEmail = 'merie@burobloemkool.nl';

export default function PlanningPage() {
  const socialMediaMailto = `mailto:${merieEmail}?subject=Aanvraag%20social%20media%20beheer&body=Hi%20M%C3%A9rie%2C%0A%0AIk%20wil%20graag%20meer%20weten%20over%20social%20media%20beheer%20via%20Buro%20Bloemkool.%0A%0AGroet`;

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
              Planning
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
              Planning en belangrijke momenten
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              Hier vind je de aankomende planning, belangrijke deadlines en alles wat er de komende
              periode op de agenda staat voor {clientData.naam}.
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Huidige fase</h2>
              <p className="mt-2 text-sm text-slate-600">
                We zitten nu in de fase: {clientData.projectFase}.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Volgende mijlpaal</h2>
              <p className="mt-2 text-sm text-slate-600">
                {clientData.volgendeMijlpaal}
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0E23CB]">Contact</h2>
              <p className="mt-2 text-sm text-slate-600">
                Heb je vragen over deadlines, planning of publicatiemomenten? Dan kun je ons direct
                een bericht sturen vanuit het portaal.
              </p>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-[#0E23CB]">Deze week</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="rounded-xl bg-slate-50 p-3">Maandag: Start homepage update</li>
                <li className="rounded-xl bg-slate-50 p-3">Woensdag: Eerste campagne concept</li>
                <li className="rounded-xl bg-slate-50 p-3">Vrijdag: Nieuwe versie oplevering</li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-[#0E23CB]">Belangrijke momenten</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="rounded-xl bg-slate-50 p-3">Lancering campagne · 1 mei</li>
                <li className="rounded-xl bg-slate-50 p-3">Evaluatie meeting · 5 mei</li>
                <li className="rounded-xl bg-slate-50 p-3">Nieuwe homepageversie · 26 april</li>
              </ul>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#0E23CB]">Social media planning</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Beheer en overzicht van content, feedback en geplande publicaties.
                </p>
              </div>

              {hasSocialMediaPlanning && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Actief
                </span>
              )}
            </div>

            {hasSocialMediaPlanning ? (
              <ContentPlanner />
            ) : (
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-4 text-sm text-slate-700">
                  Wil jij dat wij jouw social media beheren? Klik hieronder en stuur direct een
                  aanvraag naar Mérie.
                </p>

                <a
                  href={socialMediaMailto}
                  className="inline-flex rounded-full bg-[#0E23CB] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Social media aanvragen
                </a>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}