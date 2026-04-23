import { Sidebar } from '@/components/sidebar';

export default function SamenwerkingPage() {
  return (
    <main className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#0E23CB]">Samenwerking</h1>
            <p className="text-sm text-slate-600">
              Hier zie je de voortgang, updates en eerstvolgende stappen binnen onze samenwerking.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">Laatste update</h2>
              <p className="text-sm text-slate-700">
                We werken deze week aan de homepage update en bereiden de nieuwe campagneversie voor.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">Eerstvolgende stap</h2>
              <p className="text-sm text-slate-700">
                Jullie feedback op de laatste oplevering helpt ons om de volgende versie af te ronden.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Openstaande punten</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="rounded-xl bg-slate-50 p-3">Feedback op homepage design v1</li>
              <li className="rounded-xl bg-slate-50 p-3">Controle van campagnebeeld voor publicatie</li>
              <li className="rounded-xl bg-slate-50 p-3">Definitieve keuze voor de volgende contentreeks</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}