import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { getVoiceToken } from "@/lib/voice.functions";

type Line = { id: number; who: "guide" | "you"; text: string };

type Props =
  | {
      phase: "intro";
      onInterests: (interests: string) => void;
    }
  | {
      phase: "curated";
      tasteSummary: string;
      shelfTitle: string;
      onShowLibrary: () => void;
    };

const CURATED_PROMPT = (taste: string, shelf: string) => `
You are a warm, sharp librarian talking out loud to a student who has just finished
reacting to a stack of sample book pages. Speak in at most three short sentences per turn.
Never read out lists, ids or URLs. Never mention prices or subscriptions.

What you learned about their taste: ${taste}
The shelf you built for them is called: ${shelf}

Turn 1: name the pattern in their taste in one vivid sentence, then say you have pulled
a shelf together for them. Then immediately call the tool show_library.
Do not ask further questions.
`;

export function VoiceStage(props: Props) {
  return (
    <ConversationProvider>
      <VoiceStageInner {...props} />
    </ConversationProvider>
  );
}

function VoiceStageInner(props: Props) {
  const fetchToken = useServerFn(getVoiceToken);
  const [lines, setLines] = useState<Line[]>([]);
  const [status, setStatus] = useState<"idle" | "connecting" | "live" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const counter = useRef(0);
  const handled = useRef(false);

  const push = useCallback((who: Line["who"], text: string) => {
    if (!text?.trim()) return;
    counter.current += 1;
    setLines((prev) => [...prev.slice(-5), { id: counter.current, who, text: text.trim() }]);
  }, []);

  const conversation = useConversation({
    clientTools: {
      start_swiping: (params: { interests?: string }) => {
        if (props.phase !== "intro" || handled.current) return "ok";
        handled.current = true;
        const interests = params?.interests ?? "";
        window.setTimeout(() => {
          void conversation.endSession();
          props.onInterests(interests);
        }, 900);
        return "Opening the pages now.";
      },
      show_library: () => {
        if (props.phase !== "curated" || handled.current) return "ok";
        handled.current = true;
        window.setTimeout(() => {
          void conversation.endSession();
          props.onShowLibrary();
        }, 900);
        return "Showing the shelf.";
      },
    },
    onMessage: (message: unknown) => {
      const m = message as {
        source?: string;
        message?: string;
        type?: string;
        agent_response_event?: { agent_response?: string };
        user_transcription_event?: { user_transcript?: string };
      };
      if (m.agent_response_event?.agent_response) push("guide", m.agent_response_event.agent_response);
      else if (m.user_transcription_event?.user_transcript)
        push("you", m.user_transcription_event.user_transcript);
      else if (m.message) push(m.source === "user" ? "you" : "guide", m.message);
    },
    onError: (err: unknown) => {
      console.error("Voice error", err);
      setStatus("error");
      setError("The voice guide dropped out. You can type instead.");
    },
  });

  const start = useCallback(async () => {
    setError(null);
    setStatus("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { token } = await fetchToken();
      await conversation.startSession({
        conversationToken: token,
        connectionType: "webrtc",
        ...(props.phase === "curated"
          ? {
              overrides: {
                agent: {
                  prompt: { prompt: CURATED_PROMPT(props.tasteSummary, props.shelfTitle) },
                  firstMessage: "Right — I saw what you kept.",
                  language: "en",
                },
              },
            }
          : {}),
      });
      setStatus("live");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(
        err instanceof Error && err.name === "NotAllowedError"
          ? "Microphone access was blocked. You can type instead."
          : "Couldn't reach the voice guide. You can type instead.",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, fetchToken, props]);

  useEffect(() => {
    if (props.phase !== "curated") return;
    void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.phase]);

  useEffect(() => {
    if (props.phase !== "curated" || status !== "error") return;
    const timer = window.setTimeout(() => {
      if (handled.current) return;
      handled.current = true;
      props.onShowLibrary();
    }, 1400);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.phase, status]);

  const speaking = conversation.isSpeaking;
  const live = status === "live";

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full bg-primary/20 transition-transform duration-700 ${
            speaking ? "scale-110 animate-pulse" : live ? "scale-100" : "scale-90"
          }`}
        />
        <div
          className={`absolute inset-6 rounded-full bg-primary/30 blur-xl transition-opacity duration-500 ${
            speaking ? "opacity-100" : "opacity-40"
          }`}
        />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl">
          {status === "connecting" ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : live ? (
            <Mic className="h-8 w-8" />
          ) : (
            <MicOff className="h-8 w-8" />
          )}
        </div>
      </div>

      {props.phase === "intro" && status === "idle" && (
        <div className="space-y-4">
          <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Tell me what you're reading for.
          </h1>
          <p className="text-sm text-muted-foreground">
            A two-minute conversation, then a shelf built around your answers.
          </p>
        </div>
      )}

      {props.phase === "curated" && (
        <div className="space-y-3">
          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Reading your reactions…
          </h1>
          <p className="text-sm text-muted-foreground">{props.tasteSummary}</p>
        </div>
      )}

      {lines.length > 0 && (
        <div className="w-full space-y-3 text-left">
          {lines.map((line) => (
            <p
              key={line.id}
              className={
                line.who === "guide"
                  ? "font-display text-2xl leading-snug text-foreground"
                  : "text-sm text-muted-foreground"
              }
            >
              {line.who === "you" ? `You: ${line.text}` : line.text}
            </p>
          ))}
        </div>
      )}

      {props.phase === "intro" && (
        <div className="w-full space-y-4">
          {!live && (
            <button
              onClick={() => void start()}
              disabled={status === "connecting"}
              className="w-full rounded-full bg-primary px-6 py-4 text-sm font-medium tracking-wide text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "connecting" ? "Connecting…" : "Start talking"}
            </button>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!typed.trim() || handled.current) return;
              handled.current = true;
              void conversation.endSession();
              props.onInterests(typed);
            }}
            className="flex gap-2"
          >
            <input
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              placeholder="…or type what you're into"
              className="flex-1 rounded-full border border-border bg-secondary px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-full border border-border px-5 py-3 text-sm text-foreground transition hover:bg-secondary"
            >
              Go
            </button>
          </form>

          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}

      {props.phase === "curated" && (
        <button
          onClick={() => {
            if (handled.current) return;
            handled.current = true;
            void conversation.endSession();
            props.onShowLibrary();
          }}
          className="text-xs text-muted-foreground underline underline-offset-4"
        >
          Skip to my shelf
        </button>
      )}
    </div>
  );
}
