export type DocumentItem = {
  id: number;
  naam: string;
  categorie: 'Voorstel' | 'Briefing' | 'Notulen' | 'Presentatie' | 'Download';
  datum: string;
  bron: 'nas' | 'drive' | 'upload';
  bestandPad: string;
  bekijkenUrl?: string;
  downloadUrl?: string;
};

export const documenten: DocumentItem[] = [
  {
    id: 1,
    naam: 'Projectvoorstel',
    categorie: 'Voorstel',
    datum: '18 apr',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/01 Documenten/Voorstellen/projectvoorstel.pdf',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 2,
    naam: 'Briefing campagne voorjaar',
    categorie: 'Briefing',
    datum: '19 apr',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/01 Documenten/Briefings/briefing-campagne-voorjaar.pdf',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 3,
    naam: 'Notulen kick-off',
    categorie: 'Notulen',
    datum: '20 apr',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/01 Documenten/Notulen/notulen-kickoff.pdf',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 4,
    naam: 'Presentatie merkvoorstel',
    categorie: 'Presentatie',
    datum: '21 apr',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/01 Documenten/Presentaties/presentatie-merkvoorstel.pdf',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
];