import { Sidebar } from '@/components/sidebar';

const kleuren = [
  { naam: 'Diep blauw', hex: '#0E23CB', tekst: 'Primair voor hoofdaccenten, navigatie en knoppen.' },
  { naam: 'Vintage rood', hex: '#F05532', tekst: 'Voor opvallende accenten en speelse highlights.' },
  { naam: 'Smiley geel', hex: '#FFD219', tekst: 'Voor energie en aandachtstrekkende details.' },
  { naam: 'Pastel roze', hex: '#FFDCF5', tekst: 'Voor zachte achtergronden en luchtige merkvlakken.' },
  { naam: 'Crème', hex: '#FFFAEB', tekst: 'Voor rustige basisvlakken en een warme ondertoon.' },
];

export default function MerkportaalPage() {
  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-[#FFDCF5] p-8 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
              Merkportaal
            </p>
            <h1 className="mb-3 text-4xl font-bold text-[#0E23CB]">
              Alles voor een herkenbaar merk
            </h1>
            <p className="max-w-3xl text-base text-slate-700">
              Hier vind je de vaste richtlijnen, visuele bouwstenen en downloads voor het gebruik
              van jullie merk. Gebruik dit portaal als leidraad voor alles wat naar buiten gaat.
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-[#0E23CB]">Logo varianten</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[20px] border border-slate-200 bg-[#FFFAEB] p-5">
                  <p className="mb-3 text-sm font-semibold text-slate-900">Light logo</p>
                  <div className="flex min-h-[140px] items-center justify-center rounded-[16px] bg-white p-4">
                    <div className="text-center">
                      <div className="text-3xl font-black tracking-tight text-[#0E23CB]">BLOEM</div>
                      <div className="text-3xl font-black tracking-tight text-[#0E23CB]">KOOL</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-slate-600">
                    Gebruik deze variant op lichte achtergronden zoals wit, crème of pastel roze.
                  </p>
                </div>

                <div className="rounded-[20px] border border-slate-200 bg-black p-5">
                  <p className="mb-3 text-sm font-semibold text-white">Dark logo</p>
                  <div className="flex min-h-[140px] items-center justify-center rounded-[16px] bg-black p-4">
                    <div className="text-center">
                      <div className="text-3xl font-black tracking-tight text-[#FFFAEB]">BLOEM</div>
                      <div className="text-3xl font-black tracking-tight text-[#FFFAEB]">KOOL</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-white/80">
                    Gebruik deze variant op donkere of drukke achtergronden waar extra contrast nodig
                    is.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-[#0E23CB]">Logo gebruik</h2>
              <ul className="space-y-3 text-sm leading-6 text-slate-700">
                <li>Gebruik de light logo variant op lichte, rustige achtergronden.</li>
                <li>Gebruik de dark logo variant op donkere kleurvlakken of drukke visuals.</li>
                <li>Zorg altijd voor voldoende witruimte rondom het logo.</li>
                <li>Rek het logo nooit uit en verander de kleuren niet handmatig.</li>
                <li>Gebruik favicon en beeldmerk alleen voor kleine toepassingen.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-semibold text-[#0E23CB]">Kleurenpalet</h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {kleuren.map((kleur) => (
                <div
                  key={kleur.hex}
                  className="overflow-hidden rounded-[20px] border border-slate-200 bg-white"
                >
                  <div className="h-24 w-full" style={{ backgroundColor: kleur.hex }} />
                  <div className="space-y-2 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{kleur.naam}</h3>
                    <p className="text-sm text-slate-600">{kleur.hex}</p>
                    <p className="text-sm leading-5 text-slate-700">{kleur.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-[#0E23CB]">Typografie</h2>

              <div className="space-y-4">
                <div className="rounded-[18px] bg-[#FFDCF5] p-4">
                  <p className="mb-1 text-sm font-semibold text-slate-900">Gelica</p>
                  <p className="text-sm text-slate-600">
                    Gebruik voor sterke koppen en merkvolle titels.
                  </p>
                </div>

                <div className="rounded-[18px] bg-[#FFFAEB] p-4">
                  <p className="mb-1 text-sm font-semibold text-slate-900">Outfit</p>
                  <p className="text-sm text-slate-600">
                    Gebruik voor lopende tekst, subkoppen en digitale leesbaarheid.
                  </p>
                </div>

                <div className="rounded-[18px] bg-[#FFD219]/30 p-4">
                  <p className="mb-1 text-sm font-semibold text-slate-900">High Cruiser</p>
                  <p className="text-sm text-slate-600">
                    Gebruik spaarzaam voor speelse accenten of karaktervolle bijzinnen.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold text-[#0E23CB]">Fonts downloaden</h3>

                <div className="grid gap-3 md:grid-cols-3">
                  <button
                    type="button"
                    className="rounded-[18px] border border-[#0E23CB] px-4 py-4 text-left text-sm font-medium text-[#0E23CB] transition hover:bg-[#0E23CB] hover:text-white"
                  >
                    Gelica downloaden
                  </button>

                  <button
                    type="button"
                    className="rounded-[18px] border border-[#0E23CB] px-4 py-4 text-left text-sm font-medium text-[#0E23CB] transition hover:bg-[#0E23CB] hover:text-white"
                  >
                    Outfit downloaden
                  </button>

                  <button
                    type="button"
                    className="rounded-[18px] border border-[#0E23CB] px-4 py-4 text-left text-sm font-medium text-[#0E23CB] transition hover:bg-[#0E23CB] hover:text-white"
                  >
                    High Cruiser downloaden
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-[#0E23CB]">Tone of voice</h2>
              <ul className="space-y-3 text-sm leading-6 text-slate-700">
                <li>Persoonlijk en direct.</li>
                <li>Duidelijk en toegankelijk.</li>
                <li>Licht speels, nooit te druk.</li>
                <li>Warm, enthousiast en creatief.</li>
              </ul>

              <div className="mt-5 rounded-[20px] bg-[#0E23CB] p-5 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">Voorbeeld</p>
                <p className="mt-2 text-lg font-semibold">Kom op de koffie.</p>
                <p className="mt-2 text-sm text-white/90">
                  Want koffie vinden we lekker en creatief sparren leuk. Kom je langs?
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#0E23CB]">Downloads</h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <button className="rounded-[20px] border border-[#0E23CB] p-5 text-left transition hover:bg-[#0E23CB] hover:text-white">
                <p className="text-sm font-semibold">Light logo pakket</p>
                <p className="mt-1 text-xs opacity-70">
                  Voor websites, documenten en lichte achtergronden
                </p>
              </button>

              <button className="rounded-[20px] border border-[#0E23CB] p-5 text-left transition hover:bg-[#0E23CB] hover:text-white">
                <p className="text-sm font-semibold">Dark logo pakket</p>
                <p className="mt-1 text-xs opacity-70">
                  Voor donkere visuals en campagnes
                </p>
              </button>

              <button className="rounded-[20px] border border-[#0E23CB] p-5 text-left transition hover:bg-[#0E23CB] hover:text-white">
                <p className="text-sm font-semibold">Socials logo pakket</p>
                <p className="mt-1 text-xs opacity-70">
                  Instagram, LinkedIn, profielfoto’s en posts
                </p>
              </button>

              <button className="rounded-[20px] border border-[#0E23CB] p-5 text-left transition hover:bg-[#0E23CB] hover:text-white">
                <p className="text-sm font-semibold">Brand guide PDF</p>
              </button>

              <button className="rounded-[20px] border border-[#0E23CB] p-5 text-left transition hover:bg-[#0E23CB] hover:text-white">
                <p className="text-sm font-semibold">Illustraties pakket</p>
              </button>

              <button className="rounded-[20px] border border-[#0E23CB] p-5 text-left transition hover:bg-[#0E23CB] hover:text-white">
                <p className="text-sm font-semibold">Patronen pakket</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}