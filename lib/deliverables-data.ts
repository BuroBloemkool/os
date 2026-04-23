export type DeliverableItem = {
  id: number;
  naam: string;
  type: 'Design' | 'Video' | 'Copy' | 'Website' | 'Download';
  datum: string;
  status: 'Wacht op feedback' | 'Goedgekeurd' | 'Aanpassing nodig';
  bron: 'nas' | 'drive' | 'upload';
  bestandPad: string;
  bekijkenUrl?: string;
  downloadUrl?: string;
};

export const opleveringen: DeliverableItem[] = [
  {
    id: 1,
    naam: 'Homepage design v1',
    type: 'Design',
    datum: '20 apr',
    status: 'Wacht op feedback',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/02 Opleveringen/Design/homepage-design-v1.pdf',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 2,
    naam: 'Campagne video v2',
    type: 'Video',
    datum: '19 apr',
    status: 'Goedgekeurd',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/02 Opleveringen/Video/campagne-video-v2.mp4',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 3,
    naam: 'Landingspagina copy',
    type: 'Copy',
    datum: '18 apr',
    status: 'Aanpassing nodig',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/02 Opleveringen/Copy/landingspagina-copy.docx',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 4,
    naam: 'Homepage live preview',
    type: 'Website',
    datum: '22 apr',
    status: 'Wacht op feedback',
    bron: 'nas',
    bestandPad: '/Hoeve Sprey/02 Opleveringen/Website/homepage-preview-link.txt',
    bekijkenUrl: '#',
    downloadUrl: '#',
  },
];