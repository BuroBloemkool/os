'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import {
  CURRENT_USER,
  Thread,
  loadThreads,
  saveThreads,
  emitMessagesUpdated,
  markThreadAsReadForUser,
  getUserName,
} from '@/lib/messages-store';
import {
  loadRequests,
  saveRequests,
  emitRequestsUpdated,
} from '@/lib/requests-data';
import { clientData, getUsersForMentions } from '@/lib/client-data';

const typeStyle: Record<Thread['type'], string> = {
  Algemeen: 'bg-slate-100 text-slate-700',
  Aanvraag: 'bg-amber-100 text-amber-700',
  Oplevering: 'bg-emerald-100 text-emerald-700',
  Planning: 'bg-blue-100 text-blue-700',
  Taak: 'bg-rose-100 text-rose-700',
};

export default function BerichtenPage() {
  const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAdmin = true;

  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<number>(1);

  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editedMessageText, setEditedMessageText] = useState('');

  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionStartIndex, setMentionStartIndex] = useState<number | null>(null);

  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadType, setNewThreadType] = useState<Thread['type']>('Algemeen');
  const [newThreadLinkedTo, setNewThreadLinkedTo] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loaded = loadThreads();
    setThreads(loaded);

    const threadFromUrl = Number(searchParams.get('thread'));
    if (threadFromUrl && loaded.some((thread) => thread.id === threadFromUrl)) {
      const updated = markThreadAsReadForUser(loaded, threadFromUrl, CURRENT_USER);
      setThreads(updated);
      setActiveThreadId(threadFromUrl);
      saveThreads(updated);
      emitMessagesUpdated();
      return;
    }

    if (loaded.length > 0) {
      setActiveThreadId((current) => current || loaded[0].id);
    }
  }, [searchParams]);

  const activeThread = threads.find((thread) => thread.id === activeThreadId);

  const allowedMentions = useMemo(() => {
    return getUsersForMentions(isInternal ? 'intern' : 'klant');
  }, [isInternal]);

  const filteredMentionSuggestions = useMemo(() => {
    const query = mentionQuery.trim().toLowerCase();

    return allowedMentions.filter((user) => {
      const notSelected = !selectedMentions.includes(user.id);
      if (!query) return notSelected;
      return notSelected && user.naam.toLowerCase().includes(query);
    });
  }, [allowedMentions, mentionQuery, selectedMentions]);

  function getUserRole(userId: string) {
    return clientData.users.find((u) => u.id === userId)?.rol;
  }

  function syncMentionsFromText(text: string, internalState: boolean) {
    const availableUsers = getUsersForMentions(internalState ? 'intern' : 'klant');

    const foundMentionIds = availableUsers
      .filter((user) => {
        const escaped = user.naam.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(^|\\s)@${escaped}(?=\\s|$)`, 'i');
        return regex.test(text);
      })
      .map((user) => user.id);

    setSelectedMentions(foundMentionIds);
  }

  function handleMessageChange(value: string) {
    setNewMessage(value);
    syncMentionsFromText(value, isInternal);

    setIsTyping(value.trim().length > 0);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1200);

    const textarea = textareaRef.current;
    const cursorPosition = textarea?.selectionStart ?? value.length;
    const textBeforeCursor = value.slice(0, cursorPosition);
    const mentionMatch = textBeforeCursor.match(/@([^\s@]*)$/);

    if (mentionMatch) {
      setShowMentionSuggestions(true);
      setMentionQuery(mentionMatch[1] || '');
      setMentionStartIndex(cursorPosition - mentionMatch[0].length);
    } else {
      setShowMentionSuggestions(false);
      setMentionQuery('');
      setMentionStartIndex(null);
    }
  }

  function insertMention(userId: string, userName: string) {
    const textarea = textareaRef.current;
    const cursorPosition = textarea?.selectionStart ?? newMessage.length;

    if (mentionStartIndex === null) return;

    const before = newMessage.slice(0, mentionStartIndex);
    const after = newMessage.slice(cursorPosition);
    const inserted = `${before}@${userName} ${after}`;

    setNewMessage(inserted);
    setShowMentionSuggestions(false);
    setMentionQuery('');
    setMentionStartIndex(null);

    setSelectedMentions((current) =>
      current.includes(userId) ? current : [...current, userId]
    );

    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      const nextPosition = before.length + userName.length + 2;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(nextPosition, nextPosition);
    });
  }

  function removeMention(userId: string) {
    const userName = getUserName(userId);
    const escaped = userName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\s)@${escaped}(?=\\s|$)`, 'g');
    const cleanedText = newMessage
      .replace(regex, ' ')
      .replace(/\s{2,}/g, ' ')
      .trimStart();

    setNewMessage(cleanedText);
    setSelectedMentions((current) => current.filter((id) => id !== userId));
  }

  function handleInternalToggle() {
    const nextInternal = !isInternal;
    setIsInternal(nextInternal);
    setShowMentionSuggestions(false);
    setMentionQuery('');
    setMentionStartIndex(null);

    const nextAllowedIds = getUsersForMentions(nextInternal ? 'intern' : 'klant').map(
      (user) => user.id
    );

    const nextSelectedMentions = selectedMentions.filter((id) => nextAllowedIds.includes(id));

    let nextMessage = newMessage;

    selectedMentions.forEach((id) => {
      if (!nextAllowedIds.includes(id)) {
        const name = getUserName(id);
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(^|\\s)@${escaped}(?=\\s|$)`, 'g');
        nextMessage = nextMessage.replace(regex, ' ');
      }
    });

    nextMessage = nextMessage.replace(/\s{2,}/g, ' ').trimStart();

    setSelectedMentions(nextSelectedMentions);
    setNewMessage(nextMessage);
  }

  function handleSend() {
    if (!newMessage.trim() || !activeThread) return;

    const unreadReceivers = selectedMentions.filter((id) => id !== CURRENT_USER);

    const updatedThreads = threads.map((thread) => {
      if (thread.id === activeThreadId) {
        return {
          ...thread,
          messages: [
            {
              id: Date.now(),
              authorId: CURRENT_USER,
              content: newMessage,
              date: 'Vandaag',
              internal: isInternal,
              mentions: selectedMentions,
              unreadBy: unreadReceivers,
            },
            ...thread.messages,
          ],
        };
      }
      return thread;
    });

    setThreads(updatedThreads);
    saveThreads(updatedThreads);
    emitMessagesUpdated();

    setNewMessage('');
    setIsInternal(false);
    setSelectedMentions([]);
    setMentionQuery('');
    setShowMentionSuggestions(false);
    setMentionStartIndex(null);
    setIsTyping(false);
  }

  function mapThreadTypeToRequestType(): 'Social media' | 'Website' | 'Design' | 'Content' | 'Overig' {
    if (newThreadType === 'Planning') return 'Content';
    if (newThreadType === 'Oplevering') return 'Design';
    return 'Overig';
  }

  function handleCreateThread() {
    if (!newThreadTitle.trim()) return;

    const newThreadId = Date.now();

    const newThread: Thread = {
      id: newThreadId,
      title: newThreadTitle,
      type: newThreadType,
      linkedTo: newThreadLinkedTo || newThreadTitle,
      messages: [],
    };

    const updatedThreads = [newThread, ...threads];

    setThreads(updatedThreads);
    saveThreads(updatedThreads);
    emitMessagesUpdated();

    if (newThreadType === 'Aanvraag') {
      const existingRequests = loadRequests();

      const newRequest = {
        id: Date.now() + 1,
        titel: newThreadTitle,
        type: mapThreadTypeToRequestType(),
        omschrijving:
          newThreadLinkedTo || `Nieuwe aanvraag gestart vanuit berichten: ${newThreadTitle}`,
        deadline: 'Nog niet bepaald',
        status: 'Ontvangen' as const,
        aangevraagdDoor: clientData.naam,
        gekoppeldBerichtId: newThreadId,
        volgendeStap: 'Aanvraag beoordelen en opvolgen.',
      };

      const updatedRequests = [newRequest, ...existingRequests];
      saveRequests(updatedRequests);
      emitRequestsUpdated();
    }

    setActiveThreadId(newThread.id);
    setShowNewThreadModal(false);

    setNewThreadTitle('');
    setNewThreadLinkedTo('');
    setNewThreadType('Algemeen');
  }

  function startEditing(messageId: number, currentContent: string) {
    setEditingMessageId(messageId);
    setEditedMessageText(currentContent);
  }

  function cancelEditing() {
    setEditingMessageId(null);
    setEditedMessageText('');
  }

  function saveEditedMessage() {
    if (!editedMessageText.trim() || editingMessageId === null) return;

    const updatedThreads = threads.map((thread) => ({
      ...thread,
      messages: thread.messages.map((msg) =>
        msg.id === editingMessageId
          ? {
              ...msg,
              content: editedMessageText,
              edited: true,
            }
          : msg
      ),
    }));

    setThreads(updatedThreads);
    saveThreads(updatedThreads);
    emitMessagesUpdated();

    setEditingMessageId(null);
    setEditedMessageText('');
  }

  function isEditableMessage(authorId: string) {
    if (!isAdmin) return false;
    return authorId === 'tijmen' || authorId === 'merie';
  }

  function getUnreadCount(thread: Thread) {
    return thread.messages.filter((msg) => msg.unreadBy?.includes(CURRENT_USER)).length;
  }

  function openThread(threadId: number) {
    const updated = markThreadAsReadForUser(threads, threadId, CURRENT_USER);
    setThreads(updated);
    setActiveThreadId(threadId);
    saveThreads(updated);
    emitMessagesUpdated();
  }

  function getSeenStatus(msg: Thread['messages'][number]) {
    if (msg.authorId !== CURRENT_USER) return null;
    if (msg.internal) return 'Intern';

    const targetUsers = getUsersForMentions('klant')
      .filter((user) => user.rol === 'klant')
      .map((user) => user.id);

    if (targetUsers.length === 0) return 'Verstuurd';

    const seenByAll = targetUsers.every((id) => !(msg.unreadBy || []).includes(id));
    return seenByAll ? 'Gezien' : 'Verstuurd';
  }

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E23CB]">
                  Berichten
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-[#0E23CB]">
                  Gesprekken en communicatie
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                  Hier vind je alle communicatie rondom de samenwerking, gekoppeld aan aanvragen,
                  opleveringen en planning.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNewThreadModal(true)}
                className="rounded-full bg-[#0E23CB] px-4 py-2 text-sm font-medium text-white"
              >
                Nieuw gesprek
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#0E23CB]">Gesprekken</h2>
                </div>

                <div className="space-y-2">
                  {threads.map((thread) => (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => openThread(thread.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        activeThreadId === thread.id
                          ? 'border-[#0E23CB] bg-white'
                          : 'border-transparent bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900">{thread.title}</span>

                        {getUnreadCount(thread) > 0 && (
                          <span className="rounded-full bg-[#F05532] px-2 py-0.5 text-xs font-medium text-white">
                            {getUnreadCount(thread)}
                          </span>
                        )}
                      </div>

                      <div className="mt-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${typeStyle[thread.type]}`}
                        >
                          {thread.type}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Gekoppeld aan: {thread.linkedTo}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  {activeThread ? (
                    <>
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold text-slate-900">
                          {activeThread.title}
                        </h2>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${typeStyle[activeThread.type]}`}
                        >
                          {activeThread.type}
                        </span>
                      </div>

                      <p className="mb-5 text-sm text-slate-500">
                        Gekoppeld aan:{' '}
                        <span className="font-medium text-slate-700">
                          {activeThread.linkedTo}
                        </span>
                      </p>

                      <div className="space-y-3">
                        {activeThread.messages.map((msg) => {
                          const isBloemkool =
                            getUserRole(msg.authorId) === 'admin' ||
                            getUserRole(msg.authorId) === 'team';

                          const seenStatus = getSeenStatus(msg);

                          return (
                            <div
                              key={msg.id}
                              className={`flex ${isBloemkool ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                                  isBloemkool
                                    ? 'bg-[#0E23CB] text-white'
                                    : 'bg-slate-100 text-slate-800'
                                }`}
                              >
                                <div className="mb-1 flex items-center justify-between gap-3">
                                  <span
                                    className={`text-xs font-semibold ${
                                      isBloemkool ? 'text-white/85' : 'text-slate-500'
                                    }`}
                                  >
                                    {getUserName(msg.authorId)}
                                  </span>

                                  <span
                                    className={`text-[10px] ${
                                      isBloemkool ? 'text-white/70' : 'text-slate-400'
                                    }`}
                                  >
                                    {msg.date}
                                  </span>
                                </div>

                                {msg.mentions && msg.mentions.length > 0 && (
                                  <div className="mb-2 flex flex-wrap gap-2">
                                    {msg.mentions.map((mentionId) => (
                                      <span
                                        key={mentionId}
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                          mentionId === CURRENT_USER
                                            ? isBloemkool
                                              ? 'bg-white/20 text-white'
                                              : 'bg-[#F05532]/10 text-[#F05532]'
                                            : isBloemkool
                                            ? 'bg-white/20 text-white'
                                            : 'bg-[#0E23CB]/10 text-[#0E23CB]'
                                        }`}
                                      >
                                        @{getUserName(mentionId)}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {editingMessageId === msg.id ? (
                                  <div className="space-y-3">
                                    <textarea
                                      value={editedMessageText}
                                      onChange={(e) => setEditedMessageText(e.target.value)}
                                      className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-800"
                                      rows={4}
                                    />
                                    <div className="flex justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={cancelEditing}
                                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600"
                                      >
                                        Annuleren
                                      </button>
                                      <button
                                        type="button"
                                        onClick={saveEditedMessage}
                                        className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-[#0E23CB]"
                                      >
                                        Opslaan
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>

                                    <div className="mt-3 flex items-center justify-between gap-3">
                                      <div className="flex items-center gap-2">
                                        {msg.internal && (
                                          <span
                                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                              isBloemkool
                                                ? 'bg-white/20 text-white'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                          >
                                            Intern
                                          </span>
                                        )}

                                        {seenStatus && (
                                          <span
                                            className={`text-[11px] ${
                                              isBloemkool ? 'text-white/75' : 'text-slate-400'
                                            }`}
                                          >
                                            {seenStatus}
                                          </span>
                                        )}

                                        {msg.edited && (
                                          <span
                                            className={`text-[11px] ${
                                              isBloemkool ? 'text-white/75' : 'text-slate-400'
                                            }`}
                                          >
                                            Bewerkt
                                          </span>
                                        )}
                                      </div>

                                      {isEditableMessage(msg.authorId) && (
                                        <button
                                          type="button"
                                          onClick={() => startEditing(msg.id, msg.content)}
                                          className={`text-xs font-medium ${
                                            isBloemkool
                                              ? 'text-white/85 hover:text-white'
                                              : 'text-[#0E23CB] hover:underline'
                                          }`}
                                        >
                                          Bewerken
                                        </button>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {isTyping && (
                          <div className="flex justify-end">
                            <div className="rounded-2xl bg-[#0E23CB]/10 px-4 py-3 text-sm text-[#0E23CB]">
                              Jij typt…
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                      Nog geen actief gesprek geselecteerd.
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-[#0E23CB]">
                    Nieuw bericht
                  </h3>

                  <textarea
                    ref={textareaRef}
                    value={newMessage}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    placeholder="Typ hier je bericht. Gebruik @ om iemand te taggen."
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                    rows={5}
                  />

                  {selectedMentions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedMentions.map((mentionId) => (
                        <button
                          key={mentionId}
                          type="button"
                          onClick={() => removeMention(mentionId)}
                          className="rounded-full bg-[#0E23CB]/10 px-3 py-1 text-sm font-medium text-[#0E23CB]"
                        >
                          @{getUserName(mentionId)} ×
                        </button>
                      ))}
                    </div>
                  )}

                  {showMentionSuggestions && filteredMentionSuggestions.length > 0 && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                        Suggesties
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {filteredMentionSuggestions.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => insertMention(user.id, user.naam)}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-[#0E23CB] hover:text-[#0E23CB]"
                          >
                            @{user.naam}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={isInternal}
                        onChange={handleInternalToggle}
                      />
                      Intern bericht
                    </label>

                    <button
                      type="button"
                      onClick={handleSend}
                      className="rounded-xl bg-[#0E23CB] px-4 py-2 text-sm font-medium text-white"
                    >
                      Versturen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Nieuw gesprek starten</h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Titel van gesprek"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                className="w-full rounded-lg border p-2"
              />

              <select
                value={newThreadType}
                onChange={(e) => setNewThreadType(e.target.value as Thread['type'])}
                className="w-full rounded-lg border p-2"
              >
                <option>Algemeen</option>
                <option>Aanvraag</option>
                <option>Oplevering</option>
                <option>Planning</option>
                <option>Taak</option>
              </select>

              <input
                type="text"
                placeholder="Gekoppeld aan"
                value={newThreadLinkedTo}
                onChange={(e) => setNewThreadLinkedTo(e.target.value)}
                className="w-full rounded-lg border p-2"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewThreadModal(false)}
                className="text-sm text-slate-500"
              >
                Annuleren
              </button>

              <button
                type="button"
                onClick={handleCreateThread}
                className="rounded-lg bg-[#0E23CB] px-4 py-2 text-white"
              >
                Aanmaken
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}