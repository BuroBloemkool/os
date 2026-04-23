import { clientData } from './client-data';

export type Message = {
  id: number;
  authorId: string;
  content: string;
  date: string;
  internal: boolean;
  mentions?: string[];
  edited?: boolean;
  unreadBy?: string[];
};

export type Thread = {
  id: number;
  title: string;
  type: 'Algemeen' | 'Aanvraag' | 'Oplevering' | 'Planning' | 'Taak';
  linkedTo: string;
  messages: Message[];
};

export const CURRENT_USER = 'tijmen';
export const STORAGE_KEY = 'bbos_threads';

export const initialThreads: Thread[] = [
  {
    id: 1,
    title: 'Homepage design v1',
    type: 'Oplevering',
    linkedTo: 'Homepage design v1',
    messages: [
      {
        id: 1,
        authorId: 'merie',
        content: 'Hier staat de eerste versie van de homepage klaar voor feedback.',
        date: 'Vandaag',
        internal: false,
        mentions: ['bram'],
        unreadBy: ['bram'],
      },
      {
        id: 2,
        authorId: 'bram',
        content: 'We kijken hier vanmiddag naar en koppelen terug.',
        date: 'Vandaag',
        internal: false,
        mentions: ['tijmen'],
        unreadBy: ['tijmen'],
      },
    ],
  },
  {
    id: 2,
    title: 'Social media aanvraag',
    type: 'Aanvraag',
    linkedTo: 'Aanvraag social media beheer',
    messages: [
      {
        id: 3,
        authorId: 'twan',
        content: 'We willen graag weten wat jullie kunnen betekenen voor onze socials.',
        date: 'Gisteren',
        internal: false,
        mentions: ['merie'],
        unreadBy: ['merie'],
      },
    ],
  },
  {
    id: 3,
    title: 'Planning week 18',
    type: 'Planning',
    linkedTo: 'Planning week 18',
    messages: [
      {
        id: 4,
        authorId: 'tijmen',
        content: 'Vrijdag leveren we de nieuwe campagneversie op.',
        date: 'Gisteren',
        internal: false,
        unreadBy: ['bram', 'twan'],
      },
      {
        id: 5,
        authorId: 'merie',
        content: 'Nog even visuals afstemmen voor verzending.',
        date: 'Gisteren',
        internal: true,
        mentions: ['tijmen', 'merie'],
        unreadBy: ['tijmen'],
      },
    ],
  },
];

export function loadThreads(): Thread[] {
  if (typeof window === 'undefined') return initialThreads;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialThreads;

  try {
    return JSON.parse(raw) as Thread[];
  } catch {
    return initialThreads;
  }
}

export function saveThreads(threads: Thread[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

export function emitMessagesUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('messages-updated'));
}

export function getUserName(userId: string) {
  return clientData.users.find((u) => u.id === userId)?.naam || userId;
}

export function getUnreadCountForUser(threads: Thread[], userId: string) {
  return threads.reduce((total, thread) => {
    return total + thread.messages.filter((msg) => msg.unreadBy?.includes(userId)).length;
  }, 0);
}

export function getNotificationsForUser(threads: Thread[], userId: string) {
  return threads.flatMap((thread) =>
    thread.messages
      .filter((msg) => msg.mentions?.includes(userId) && msg.unreadBy?.includes(userId))
      .map((msg) => ({
        threadId: thread.id,
        threadTitle: thread.title,
        messageId: msg.id,
        author: getUserName(msg.authorId),
        content: msg.content,
        date: msg.date,
      }))
  );
}

export function markThreadAsReadForUser(
  threads: Thread[],
  threadId: number,
  userId: string
) {
  return threads.map((thread) => {
    if (thread.id !== threadId) return thread;

    return {
      ...thread,
      messages: thread.messages.map((msg) => ({
        ...msg,
        unreadBy: (msg.unreadBy || []).filter((id) => id !== userId),
      })),
    };
  });
}