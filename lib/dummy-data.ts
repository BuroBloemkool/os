export type Deliverable = {
  id: number;
  name: string;
  dueDate: string;
  owner: string;
  status: 'On Track' | 'Needs Review' | 'At Risk';
};

export type PlannedPost = {
  id: number;
  title: string;
  caption: string;
  date: string;
  status: 'Draft' | 'Scheduled' | 'Needs Feedback';
};

export const happeningNow = [
  'Q2 campaign kickoff is live across Instagram and LinkedIn.',
  'Paid ad creative set B is under internal review.',
  'Community engagement target is 78% toward weekly goal.'
];

export const activeDeliverables: Deliverable[] = [
  { id: 1, name: 'Brand Story Reel', dueDate: 'Apr 23', owner: 'Design Team', status: 'On Track' },
  { id: 2, name: 'Weekly Analytics Snapshot', dueDate: 'Apr 24', owner: 'Strategy Team', status: 'Needs Review' },
  { id: 3, name: 'Landing Page Hero Refresh', dueDate: 'Apr 26', owner: 'Web Team', status: 'At Risk' }
];

export const quickActions = ['Create post', 'Request revision', 'Export plan'];

export const plannerDays = [
  { label: 'Mon', date: '21' },
  { label: 'Tue', date: '22' },
  { label: 'Wed', date: '23' },
  { label: 'Thu', date: '24' },
  { label: 'Fri', date: '25' },
  { label: 'Sat', date: '26' },
  { label: 'Sun', date: '27' }
];

export const plannedPosts: PlannedPost[] = [
  {
    id: 1,
    title: 'Launch teaser clip',
    caption: 'A short teaser introducing the spring offer. CTA in first comment.',
    date: 'Tue 22',
    status: 'Draft'
  },
  {
    id: 2,
    title: 'Client testimonial carousel',
    caption: 'Showcase three customer outcomes with before and after metrics.',
    date: 'Thu 24',
    status: 'Needs Feedback'
  },
  {
    id: 3,
    title: 'Feature spotlight post',
    caption: 'Highlight top feature with a short demo and direct booking link.',
    date: 'Fri 25',
    status: 'Scheduled'
  }
];
