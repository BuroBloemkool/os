export type Deliverable = {
  id: number;
  name: string;
  dueDate: string;
  owner: string;
  status: 'Op schema' | 'Wacht op feedback' | 'Loopt risico';
};

export type PlannedPost = {
  id: number;
  title: string;
  caption: string;
  date: string;
  status: 'Concept' | 'Ingepland' | 'Wacht op feedback';
};

 export const happeningNow = [
  'Deze week werken we aan de homepage update.',
  'Er staan 3 social posts klaar voor feedback.',
  'Vrijdag ontvang je de nieuwste campagneversie.'
];

export const activeDeliverables: Deliverable[] = [
  { id: 1, name: 'Brand story video', dueDate: '23 apr', owner: 'Design team', status: 'Op schema' },
  { id: 2, name: 'Wekelijkse analyse', dueDate: '24 apr', owner: 'Strategie team', status: 'Wacht op feedback' },
  { id: 3, name: 'Homepage update', dueDate: '26 apr', owner: 'Web team', status: 'Loopt risico' }
];

export const quickActions = [
  'Bericht sturen',
  'Feedback geven',
  'Nieuwe aanvraag',
  'Planning bekijken'
];

export const plannerDays = [
  { label: 'Ma', date: '21' },
  { label: 'Di', date: '22' },
  { label: 'Wo', date: '23' },
  { label: 'Do', date: '24' },
  { label: 'Vr', date: '25' },
  { label: 'Za', date: '26' },
  { label: 'Zo', date: '27' }
];

export const plannedPosts: PlannedPost[] = [
  {
    id: 1,
    title: 'Teaser video lancering',
    caption: 'Korte teaser voor de voorjaarsactie. Call-to-action in de eerste reactie.',
    date: 'Di 22',
    status: 'Concept'
  },
  {
    id: 2,
    title: 'Klantcase carousel',
    caption: 'Toon drie resultaten van klanten met voor en na cijfers.',
    date: 'Do 24',
    status: 'Wacht op feedback'
  },
  {
    id: 3,
    title: 'Feature highlight post',
    caption: 'Laat de belangrijkste feature zien met een korte demo en directe boekingslink.',
    date: 'Vr 25',
    status: 'Ingepland'
  }
];