'use client';

import { useState } from 'react';

type Thread = {
  id: number;
  title: string;
  messages: {
    id: number;
    author: string;
    content: string;
    date: string;
    internal: boolean;
  }[];
};

export function Messages() {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 1,
      title: 'Homepage update',
      messages: [
        {
          id: 1,
          author: 'Buro Bloemkool',
          content: 'We zijn gestart met de homepage update.',
          date: '22 apr',
          internal: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Social media',
      messages: [
        {
          id: 2,
          author: 'Intern',
          content: 'Eerst visuals checken voordat we posten.',
          date: '22 apr',
          internal: true,
        },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  function handleSend() {
    if (!newMessage.trim() || !activeThread) return;

    const updatedThreads = threads.map((thread) => {
      if (thread.id === activeThreadId) {
        return {
          ...thread,
          messages: [
            {
              id: Date.now(),
              author: isInternal ? 'Intern' : 'Klant',
              content: newMessage,
              date: 'Vandaag',
              internal: isInternal,
            },
            ...thread.messages,
          ],
        };
      }
      return thread;
    });

    setThreads(updatedThreads);
    setNewMessage('');
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Threads lijst */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-500">
          Gesprekken
        </h3>

        <div className="space-y-2">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                thread.id === activeThreadId
                  ? 'bg-[#0E23CB]/10 text-[#0E23CB]'
                  : 'hover:bg-slate-100'
              }`}
            >
              {thread.title}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-lg font-semibold">
            {activeThread?.title}
          </h3>

          <div className="space-y-3">
            {activeThread?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg p-3 text-sm ${
                  msg.internal
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{msg.author}</span>
                  <span>{msg.date}</span>
                </div>

                <p>{msg.content}</p>

                {msg.internal && (
                  <span className="mt-2 inline-block text-xs text-yellow-700">
                    Intern
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Typ je bericht..."
            className="w-full rounded-lg border border-slate-300 p-2 text-sm"
            rows={3}
          />

          <div className="mt-3 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={() => setIsInternal(!isInternal)}
              />
              Intern bericht
            </label>

            <button
              onClick={handleSend}
              className="rounded-lg bg-[#0E23CB] px-4 py-2 text-sm text-white"
            >
              Versturen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}