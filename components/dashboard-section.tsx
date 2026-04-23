'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CURRENT_USER,
  getNotificationsForUser,
  loadThreads,
} from '@/lib/messages-store';
import { loadRequests, RequestItem } from '@/lib/requests-data';
import { Button } from '@/components/ui/button';

type DashboardSectionProps = {
  profile: {
    id: string;
    full_name: string | null;
    role: string | null;
  };
  client: {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    project_phase: string | null;
    next_milestone: string | null;
  };
};

const activeDeliverables = [
  {
    id: 1,
    name: 'Brand story video',
    owner: 'Design team',
    dueDate: '23 apr',
    status: 'Op schema',
  },
  {
    id: 2,
    name: 'Wekelijkse analyse',
    owner: 'Strategie team',
    dueDate: '24 apr',
    status: 'Wacht op feedback',
  },
  {
    id: 3,
    name: 'Homepage update',
    owner: 'Web team',
    dueDate: '26 apr',
    status: 'Loopt risico',
  },
];

const happeningNow = [
  'Deze week werken we aan de homepage update.',
  'Er staan 3 social posts klaar voor feedback.',
  'Vrijdag ontvang je de nieuwste campagneversie.',
];

const quickActions = [
  'Bericht sturen',
  'Feedback geven',
  'Nieuwe aanvraag',
  'Planning bekijken',
];

const statusStyle: Record<string, string> = {
  'Op schema': 'bg-emerald-100 text-emerald-700',
  'Wacht op feedback': 'bg-amber-100 text-amber-700',
  'Loopt risico': 'bg-rose-100 text-rose-700',
};

const aanvraagStatusStyle: Record<string, string> = {
  Ontvangen: 'bg-slate-100 text-slate-700',
  'In behandeling': 'bg-amber-100 text-amber-700',
  Gepland: 'bg-emerald-100 text-emerald-700',
  Afgerond: 'bg-green-100 text-green-700',
  Afgewezen: 'bg-rose-100 text-rose-700',
};

export function DashboardSection({ profile, client }: DashboardSectionProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [notifications, setNotifications] = useState<
    {
      threadId: number;
      threadTitle: string;
      messageId: number;
      author: string;
      content: string;
      date: string;
    }[]
  >([]);
  const [aanvragen, setAanvragen] = useState<RequestItem[]>([]);

  useEffect(() => {
    function refreshNotifications() {
      const threads = loadThreads();
      setNotifications(getNotificationsForUser(threads, CURRENT_USER));
    }

    function refreshRequests() {
      const loaded = loadRequests();
      setAanvragen(Array.isArray(loaded) ? loaded : []);
    }

    refreshNotifications();
    refreshRequests();

    window.addEventListener('storage', refreshNotifications);
    window.addEventListener('messages-updated', refreshNotifications);
    window.addEventListener('storage', refreshRequests);
    window.addEventListener('requests-updated', refreshRequests);

    return () => {
      window.removeEventListener('storage', refreshNotifications);
      window.removeEventListener('messages-updated', refreshNotifications);
      window.removeEventListener('storage', refreshRequests);
      window.removeEventListener('requests-updated', refreshRequests);
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] bg-[#FFDCF5] p-6 shadow-sm md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
            Welkom terug, {profile.full_name || 'gebruiker'} 👋
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            Hier vind je alles rondom jullie marketing, planning en voortgang voor {client.name}.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickActions.map((action) => {
              if (action === 'Planning bekijken') {
                return (
                  <Button key={action} href="/planning">
                    {action}
                  </Button>
                );
              }

              if (action === 'Feedback geven') {
                return (
                  <Button key={action} href="/opleveringen">
                    {action}
                  </Button>
                );
              }

              if (action === 'Nieuwe aanvraag') {
                return (
                  <Button key={action} href="/aanvragen">
                    {action}
                  </Button>
                );
              }

              return (
                <Button
                  key={action}
                  onClick={() => {
                    if (action === 'Bericht sturen') {
                      setShowMessageModal(true);
                    }
                  }}
                >
                  {action}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-[180px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <img
            src={client.logo_url || '/klant-logo.png'}
            alt={`${client.name} logo`}
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="rounded-2xl border border-[#F05532]/20 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0E23CB]">Nieuwe meldingen</h2>
            <span className="rounded-full bg-[#F05532]/10 px-3 py-1 text-xs font-medium text-[#F05532]">
              {notifications.length} nieuw
            </span>
          </div>

          <div className="space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <Link
                key={notification.messageId}
                href={`/berichten?thread=${notification.threadId}`}
                className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#0E23CB] hover:bg-[#0E23CB]/5"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {notification.threadTitle}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {notification.author} tagde jou in een bericht
                </p>
                <p className="mt-2 text-sm text-slate-700">{notification.content}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Huidige fase</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            We zitten nu in de fase: {client.project_phase || 'Nog niet ingevuld'}.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Wat we van jullie nodig hebben
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Geef feedback op de laatste homepageversie zodat we de volgende stap kunnen zetten.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#FFD219] p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-700">
            Volgende mijlpaal
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-900">
            {client.next_milestone || 'Nog niet ingevuld'}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Dit is het eerstvolgende belangrijke moment binnen dit traject.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-[#0E23CB]">
            Wat gebeurt er nu
          </h2>

          <div className="space-y-2 text-sm text-slate-700">
            {happeningNow.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-[#0E23CB]" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0E23CB]">
              Meest recente aanvragen
            </h2>
            <Link
              href="/aanvragen"
              className="text-sm font-medium text-[#0E23CB] hover:underline"
            >
              Alles bekijken
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-2 pr-4">Van</th>
                  <th className="pb-2 pr-4">Wat</th>
                  <th className="pb-2 pr-4">Deadline</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {aanvragen.slice(0, 3).map((item) => (
                  <tr key={item.id} className="border-t border-slate-200 text-slate-700">
                    <td className="py-2 pr-4">{item.aangevraagdDoor}</td>
                    <td className="py-2 pr-4">{item.titel}</td>
                    <td className="py-2 pr-4">{item.deadline}</td>
                    <td className="py-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${aanvraagStatusStyle[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {aanvragen.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">
                      Nog geen aanvragen.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0E23CB]">
            Actieve opleveringen
          </h2>
          <Link
            href="/opleveringen"
            className="text-sm font-medium text-[#0E23CB] hover:underline"
          >
            Alles bekijken
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="pb-2">Oplevering</th>
                <th className="pb-2">Verantwoordelijke</th>
                <th className="pb-2">Deadline</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeDeliverables.map((deliverable) => (
                <tr className="border-t border-slate-100" key={deliverable.id}>
                  <td className="py-3 font-medium">
                    <Link
                      href="/opleveringen"
                      className="text-[#0E23CB] hover:underline"
                    >
                      {deliverable.name}
                    </Link>
                  </td>
                  <td className="py-3">{deliverable.owner}</td>
                  <td className="py-3">{deliverable.dueDate}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[deliverable.status]}`}
                    >
                      {deliverable.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-3 text-lg font-semibold">Stuur een bericht</h3>

            <textarea
              className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              placeholder="Typ hier je bericht..."
              rows={5}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="text-sm text-slate-500"
              >
                Sluiten
              </button>

              <button
                type="button"
                className="rounded-xl bg-[#0E23CB] px-4 py-2 text-sm text-white"
              >
                Versturen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}