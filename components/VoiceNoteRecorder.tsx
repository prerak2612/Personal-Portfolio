"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mic, MicOff, Sparkles, Square, X } from "lucide-react";
import { formatVoiceNoteText, parseVoiceNote, ParsedVoiceNote } from "./voiceNoteParser";
import { useSpeechRecognition } from "./useSpeechRecognition";

type NoteTag = "Work" | "Personal" | "Urgent";

interface VoiceNoteRecorderProps {
  accent: string;
  dark: boolean;
  defaultDate: string;
  selectedTag: NoteTag;
  onCreateNote: (note: { date: string; text: string; tag: NoteTag }) => void;
  onToast: (message: string) => void;
}

const EMPTY_NOTE: ParsedVoiceNote = { title: "", date: "", time: "" };

function Waveform({ active, accent }: { active: boolean; accent: string }) {
  return (
    <div className="flex h-10 items-center justify-center gap-1" aria-hidden>
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          className="w-1 rounded-full"
          style={{ backgroundColor: accent }}
          animate={{
            height: active ? [8, 28 + ((index * 7) % 14), 10] : 8,
            opacity: active ? [0.35, 0.95, 0.45] : 0.25,
          }}
          transition={{
            duration: 0.8 + (index % 4) * 0.12,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
            delay: index * 0.025,
          }}
        />
      ))}
    </div>
  );
}

export default function VoiceNoteRecorder({
  accent,
  dark,
  defaultDate,
  selectedTag,
  onCreateNote,
  onToast,
}: VoiceNoteRecorderProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ParsedVoiceNote>(EMPTY_NOTE);
  const {
    error,
    interimTranscript,
    isListening,
    isSupported,
    resetTranscript,
    startListening,
    status,
    stopListening,
    transcript,
  } = useSpeechRecognition();

  const liveTranscript = `${transcript} ${interimTranscript}`.trim();
  const canCreate = draft.title.trim().length > 0 && draft.date.length > 0;
  const transcriptPrompt = isListening
    ? "Listening... speak now"
    : status === "success"
    ? "Review the detected details below."
    : "Try: Meeting tomorrow at 5 PM";

  const parsedDateLabel = useMemo(() => {
    if (!draft.date) return "No date detected";
    const parsed = parseISO(draft.date);
    return isValid(parsed) ? format(parsed, "MMMM d, yyyy") : "No date detected";
  }, [draft.date]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isListening) stopListening();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isListening, open, stopListening]);

  useEffect(() => {
    if (status !== "success" || !transcript.trim()) return;
    const parsed = parseVoiceNote(transcript);
    setDraft({
      title: parsed.title,
      date: parsed.date || defaultDate,
      time: parsed.time,
    });
    onToast(parsed.date ? "Voice note ready" : "Voice note captured. Add a date to save.");
  }, [defaultDate, onToast, status, transcript]);

  useEffect(() => {
    if (status === "error" && error) onToast(error);
  }, [error, onToast, status]);

  async function openRecorder() {
    setOpen(true);
    setDraft({ ...EMPTY_NOTE, date: defaultDate });
    resetTranscript();
    const started = await startListening();
    if (!started && !isSupported) onToast("Voice input is not supported in this browser.");
  }

  function createNote() {
    if (!canCreate) return;
    onCreateNote({
      date: draft.date,
      text: formatVoiceNoteText(draft.title, draft.time),
      tag: selectedTag,
    });
    onToast("Voice note added");
    setOpen(false);
    resetTranscript();
    setDraft(EMPTY_NOTE);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={openRecorder}
        whileTap={{ scale: 0.92 }}
        aria-label="Create note with voice"
        className={`absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          dark
            ? "border-white/10 bg-zinc-900/90 text-zinc-100 shadow-black/40 focus-visible:ring-offset-zinc-900"
            : "border-white/80 bg-white/90 text-zinc-800 shadow-zinc-300/60 focus-visible:ring-offset-white"
        }`}
        style={{ "--tw-ring-color": accent } as CSSProperties}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: `${accent}22` }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <Mic size={18} aria-hidden style={{ color: accent }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Voice note recorder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                if (isListening) stopListening();
                setOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ y: 18, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className={`w-full max-w-md overflow-hidden rounded-3xl border p-5 shadow-2xl backdrop-blur-2xl ${
                dark
                  ? "border-white/10 bg-zinc-950/78 text-zinc-100 shadow-black/60"
                  : "border-white/70 bg-white/78 text-zinc-950 shadow-zinc-900/20"
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[3px]" style={{ color: accent }}>
                    <Sparkles size={13} aria-hidden /> Voice Note
                  </p>
                  <h4 className="mt-1 text-lg font-bold tracking-tight">
                    {isListening ? "Listening..." : status === "success" ? "Ready to add" : "Speak your plan"}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) stopListening();
                    setOpen(false);
                  }}
                  aria-label="Close voice recorder"
                  className={`rounded-full p-2 transition-all focus:outline-none focus-visible:ring-2 ${
                    dark ? "hover:bg-white/10 focus-visible:ring-white/40" : "hover:bg-zinc-100 focus-visible:ring-zinc-400"
                  }`}
                >
                  <X size={18} aria-hidden />
                </button>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative grid h-28 w-28 place-items-center">
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${accent}` }}
                    animate={isListening ? { scale: [1, 1.35], opacity: [0.48, 0] } : { scale: 1, opacity: 0.22 }}
                    transition={{ duration: 1.4, repeat: isListening ? Infinity : 0, ease: "easeOut" }}
                    aria-hidden
                  />
                  <motion.span
                    className="absolute h-20 w-20 rounded-full blur-xl"
                    style={{ backgroundColor: `${accent}55` }}
                    animate={{ opacity: isListening ? [0.45, 0.9, 0.45] : 0.35, scale: isListening ? [0.92, 1.08, 0.92] : 1 }}
                    transition={{ duration: 1.2, repeat: isListening ? Infinity : 0 }}
                    aria-hidden
                  />
                  <motion.div
                    className="relative grid h-20 w-20 place-items-center rounded-full text-white shadow-xl"
                    style={{ backgroundColor: accent }}
                    animate={status === "success" ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  >
                    {status === "success" ? <Check size={30} aria-hidden /> : isSupported ? <Mic size={30} aria-hidden /> : <MicOff size={30} aria-hidden />}
                  </motion.div>
                </div>

                <Waveform active={isListening} accent={accent} />

                <p className={`min-h-[48px] w-full rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                  dark ? "border-white/10 bg-white/5 text-zinc-200" : "border-white/80 bg-white/60 text-zinc-700"
                }`} aria-live="polite">
                  {liveTranscript || error || transcriptPrompt}
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                <label className="grid gap-1.5 text-xs font-semibold">
                  Title
                  <input
                    value={draft.title}
                    onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                    className={`rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                      dark ? "border-white/10 bg-zinc-900/70 text-zinc-100" : "border-zinc-200 bg-white/80 text-zinc-900"
                    }`}
                    style={{ "--tw-ring-color": accent } as CSSProperties}
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="grid gap-1.5 text-xs font-semibold">
                    Date
                    <input
                      type="date"
                      value={draft.date}
                      onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))}
                      className={`rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                        dark ? "border-white/10 bg-zinc-900/70 text-zinc-100" : "border-zinc-200 bg-white/80 text-zinc-900"
                      }`}
                      style={{ "--tw-ring-color": accent } as CSSProperties}
                    />
                  </label>

                  <label className="grid gap-1.5 text-xs font-semibold">
                    Time
                    <input
                      type="time"
                      value={draft.time}
                      onChange={(event) => setDraft((current) => ({ ...current, time: event.target.value }))}
                      className={`rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                        dark ? "border-white/10 bg-zinc-900/70 text-zinc-100" : "border-zinc-200 bg-white/80 text-zinc-900"
                      }`}
                      style={{ "--tw-ring-color": accent } as CSSProperties}
                    />
                  </label>
                </div>

                <p className={`text-[11px] ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
                  {parsedDateLabel}{draft.time ? ` at ${draft.time}` : " · no time detected"}
                </p>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95 focus:outline-none focus-visible:ring-2 ${
                    dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-zinc-200 bg-white/80 hover:bg-white"
                  }`}
                  style={{ "--tw-ring-color": accent } as CSSProperties}
                >
                  {isListening ? <Square size={14} aria-hidden /> : <Mic size={14} aria-hidden />}
                  {isListening ? "Stop" : transcript ? "Listen again" : "Start listening"}
                </button>

                <button
                  type="button"
                  onClick={createNote}
                  disabled={!canCreate}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                  style={{ backgroundColor: accent }}
                >
                  <Check size={15} aria-hidden /> Add to Agenda
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
