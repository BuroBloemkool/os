export type RequestItem = {
  id: number;
  titel: string;
  type: 'Social media' | 'Website' | 'Design' | 'Content' | 'Overig';
  omschrijving: string;
  deadline: string;
  status: 'Ontvangen' | 'In behandeling' | 'Gepland' | 'Afgerond' | 'Afgewezen';
  aangevraagdDoor: string;
  gekoppeldBerichtId?: number;
  volgendeStap?: string;
};

export const REQUESTS_STORAGE_KEY = 'bbos_requests';

export const initialRequests: RequestItem[] = [
  {
    id: 1,
    titel: 'Extra social post',
    type: 'Social media',
    omschrijving: 'Losse extra post voor de voorjaarsactie.',
    deadline: '25 apr',
    status: 'Ontvangen',
    aangevraagdDoor: 'Hoeve Sprey',
    gekoppeldBerichtId: 2,
    volgendeStap: 'Aanvraag beoordelen en inplannen.',
  },
  {
    id: 2,
    titel: 'Aanpassing landingspagina',
    type: 'Website',
    omschrijving: 'Tekst en call to action op de landingspagina aanpassen.',
    deadline: '29 apr',
    status: 'In behandeling',
    aangevraagdDoor: 'Hoeve Sprey',
    gekoppeldBerichtId: 1,
    volgendeStap: 'Nieuwe versie verwerken en terugkoppelen.',
  },
  {
    id: 3,
    titel: 'Social media beheer aanvraag',
    type: 'Social media',
    omschrijving: 'Verkennen of Buro Bloemkool structureel socials kan oppakken.',
    deadline: '30 apr',
    status: 'Gepland',
    aangevraagdDoor: 'Hoeve Sprey',
    gekoppeldBerichtId: 3,
    volgendeStap: 'Voorstel en aanpak bespreken.',
  },
];

export function loadRequests(): RequestItem[] {
  if (typeof window === 'undefined') return initialRequests;

  const raw = window.localStorage.getItem(REQUESTS_STORAGE_KEY);
  if (!raw) return initialRequests;

  try {
    return JSON.parse(raw) as RequestItem[];
  } catch {
    return initialRequests;
  }
}

export function saveRequests(requests: RequestItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
}

export function emitRequestsUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('requests-updated'));
}