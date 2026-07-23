"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionStatus = "idle" | "listening" | "success" | "error";

type SpeechRecognitionErrorCode =
  | "aborted"
  | "audio-capture"
  | "bad-grammar"
  | "language-not-supported"
  | "network"
  | "no-speech"
  | "not-allowed"
  | "phrases-not-supported"
  | "service-not-allowed";

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: SpeechRecognitionErrorCode;
  readonly message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onend: ((event: Event) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onsoundstart: ((event: Event) => void) | null;
  onspeechstart: ((event: Event) => void) | null;
  onspeechend: ((event: Event) => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const ERROR_MESSAGES: Partial<Record<SpeechRecognitionErrorCode, string>> = {
  "audio-capture": "No microphone was found.",
  "network": "Speech recognition lost its network connection.",
  "no-speech": "No speech was detected.",
  "not-allowed": "Microphone permission was denied.",
  "service-not-allowed": "Speech recognition is blocked in this browser.",
};

function getRecognitionConstructor() {
  if (typeof window === "undefined") return undefined;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

export function useSpeechRecognition({ pauseMs = 2600 } = {}) {
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState<SpeechRecognitionStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const finalTranscriptRef = useRef("");
  const latestTranscriptRef = useRef("");
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listeningRef = useRef(false);
  const manuallyStoppedRef = useRef(false);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const stopListening = useCallback(() => {
    clearSilenceTimer();
    manuallyStoppedRef.current = true;
    listeningRef.current = false;
    recognitionRef.current?.stop();
  }, [clearSilenceTimer]);

  const scheduleAutoStop = useCallback(() => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      if (listeningRef.current) stopListening();
    }, pauseMs);
  }, [clearSilenceTimer, pauseMs, stopListening]);

  const resetTranscript = useCallback(() => {
    finalTranscriptRef.current = "";
    latestTranscriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setError("");
    setStatus("idle");
  }, []);

  useEffect(() => {
    setIsSupported(Boolean(getRecognitionConstructor()));
    return () => {
      clearSilenceTimer();
      recognitionRef.current?.abort();
    };
  }, [clearSilenceTimer]);

  const startListening = useCallback(async () => {
    const Recognition = getRecognitionConstructor();
    if (!Recognition) {
      setError("Voice input is not supported in this browser.");
      setStatus("error");
      return false;
    }

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch {
      setError("Microphone permission was denied.");
      setStatus("error");
      return false;
    }

    clearSilenceTimer();
    finalTranscriptRef.current = "";
    latestTranscriptRef.current = "";
    manuallyStoppedRef.current = false;
    setTranscript("");
    setInterimTranscript("");
    setError("");
    setStatus("listening");

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const spokenText = result[0]?.transcript ?? "";
        if (result.isFinal) finalText += spokenText;
        else interimText += spokenText;
      }

      if (finalText) {
        finalTranscriptRef.current = `${finalTranscriptRef.current} ${finalText}`.trim();
      }

      const trimmedInterim = interimText.trim();
      latestTranscriptRef.current = `${finalTranscriptRef.current} ${trimmedInterim}`.trim();
      setTranscript(finalTranscriptRef.current);
      setInterimTranscript(trimmedInterim);
      scheduleAutoStop();
    };

    recognition.onerror = (event) => {
      clearSilenceTimer();
      listeningRef.current = false;
      setError(ERROR_MESSAGES[event.error] ?? event.message ?? "Speech recognition failed.");
      setStatus("error");
    };

    recognition.onsoundstart = () => {
      clearSilenceTimer();
    };

    recognition.onspeechstart = () => {
      clearSilenceTimer();
    };

    recognition.onspeechend = scheduleAutoStop;

    recognition.onend = () => {
      clearSilenceTimer();
      listeningRef.current = false;
      const capturedTranscript = finalTranscriptRef.current.trim() || latestTranscriptRef.current.trim();
      if (capturedTranscript && !finalTranscriptRef.current.trim()) {
        finalTranscriptRef.current = capturedTranscript;
        setTranscript(capturedTranscript);
      }
      setInterimTranscript("");
      setStatus((current) => {
        if (current === "error") return current;
        if (capturedTranscript) return "success";
        return "idle";
      });
    };

    recognitionRef.current = recognition;
    listeningRef.current = true;

try {
  recognition.start();
  return true;
} catch (error) {
  listeningRef.current = false;
  setError("Speech recognition could not be started.");
  setStatus("error");
  return false;
}

  return {
    error,
    interimTranscript,
    isListening: status === "listening",
    isSupported,
    resetTranscript,
    startListening,
    status,
    stopListening,
    transcript,
  };
}
