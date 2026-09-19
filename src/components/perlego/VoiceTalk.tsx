import { useCallback, useEffect, useRef, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { mask, sx } from "@/lib/perlego/sx";
import { PgButton } from "@/components/perlego/PgButton";
import {
  AGENT_FIRST_MESSAGE,
  INTEREST_SCRIPT,
  interestLabels,
  topicKeysFromInterests,
} from "@/lib/perlego/agentScript";

type Row = { who: "agent" | "you"; text: string };

export function VoiceTalk({
  onInterests,
  onContinue,
}: {
  onInterests: (keys: string[], raw: string) => void;
  onContinue: () => void;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "connecting" | "live" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const finishing = useRef(false);

  const finish = useCallback(
    (keys: string[], raw: string) => {
      if (finishing.current) return;
      finishing.current = true;
      if (keys.length) onInterests(keys, raw);
      setTopics(interestLabels(keys));
      setStatus("done");
      window.setTimeout(() => {
        void conversationRef.current?.endSession();
        onContinue();
      }, 3200);
    },
    [onContinue, onInterests],
  );

  const conversation = useConversation({
    clientTools: {
      start_swiping: (params: { interests?: string }) => {
        const raw = params?.interests ?? "";
        finish(topicKeysFromInterests(raw), raw);
        return "Interests saved, moving the reader on.";
      },
      show_library: (params: { taste_summary?: string }) => {
        const raw = params?.taste_summary ?? "";
        finish(topicKeysFromInterests(raw), raw);
        return "Library opening.";
      },
    },
    overrides: {
      agent: { prompt: { prompt: INTEREST_SCRIPT }, firstMessage: AGENT_FIRST_MESSAGE, language: "en" },
    },
    onConnect: () => setStatus("live"),
    onDisconnect: () => setStatus((p) => (p === "done" ? p : "idle")),
    onError: (e: unknown) => setError(typeof e === "string" ? e : "The voice connection dropped. Try again."),
    onMessage: (message: { source?: string; message?: string }) => {
      const text = message?.message;
      if (!text) return;
      setRows((p) => p.concat({ who: message.source === "user" ? "you" : "agent", text }));
    },
  });

  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rows.length]);

  useEffect(() => () => void conversationRef.current?.endSession(), []);

  const start = useCallback(async () => {
    setError(null);
    setStatus("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const res = await fetch("/api/elevenlabs-token", { method: "POST" });
      const data = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !data.token) throw new Error(data.error ?? "Could not start the conversation");
      await conversationRef.current.startSession({ conversationToken: data.token, connectionType: "webrtc" });
    } catch (e) {
      setStatus("idle");
      setError(
        e instanceof Error && e.name === "NotAllowedError"
          ? "Perlego needs your microphone to talk this through. Allow it in your browser, then try again."
          : e instanceof Error
            ? e.message
            : "Could not start the conversation",
      );
    }
  }, []);

  const live = status === "live";
  const speaking = live && conversation.isSpeaking;

  return (
    <section
      style={sx(
        "flex:1;display:grid;grid-template-columns:minmax(0,1fr) 320px;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
      )}
    >
      <div style={sx("display:flex;flex-direction:column;padding:40px 48px 32px;gap:20px;max-width:780px")}>
        <div style={sx("display:flex;align-items:center;gap:12px")}>
          <span
            className={speaking ? "pgv-orb pgv-orb--on" : "pgv-orb"}
            style={sx(
              "width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#3327ec 0%,#714cf9 55%,#ed6fff 100%);display:flex;align-items:center;justify-content:center;flex:none",
            )}
          >
            <span style={{ ...mask("audio-lines"), width: 17, height: 17, background: "#fff" }} />
          </span>
          <div style={sx("display:flex;flex-direction:column")}>
            <span style={sx("font:600 14.5px Manrope,sans-serif;color:#000")}>Perlego</span>
            <span style={sx("font:400 12.5px Inter,sans-serif;color:#777674")}>
              {status === "connecting"
                ? "Connecting…"
                : status === "done"
                  ? "That's everything we need"
                  : live
                    ? speaking
                      ? "Speaking"
                      : "Listening — answer out loud"
                    : "Tap to start talking"}
            </span>
          </div>
        </div>

        <div ref={scroller} style={sx("flex:1;display:flex;flex-direction:column;gap:14px;overflow:auto;padding-right:6px")}>
          {rows.length === 0 && (
            <p style={sx("margin:0;font:400 15px/1.7 Inter,sans-serif;color:#666565;max-width:52ch")}>
              Start the conversation and answer out loud. A few questions about what you're studying and what you
              enjoy is enough for Perlego to work out where to start you.
            </p>
          )}
          {rows.map((r, i) => (
            <div key={i} style={sx(`display:flex;${r.who === "you" ? "justify-content:flex-end" : ""}`)}>
              <div
                style={sx(
                  r.who === "you"
                    ? "max-width:74%;padding:12px 16px;border-radius:16px 16px 4px 16px;background:#3327ec;color:#fff;font:400 14.5px/1.6 Inter,sans-serif"
                    : "max-width:74%;padding:12px 16px;border-radius:16px 16px 16px 4px;background:#f2f1ee;color:#2c2c2c;font:400 14.5px/1.6 Inter,sans-serif",
                )}
              >
                {r.text}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p style={sx("margin:0;font:400 13px Inter,sans-serif;color:#a2310a")} role="alert">
            {error}
          </p>
        )}

        <div style={sx("display:flex;align-items:center;gap:12px;padding-top:6px;flex-wrap:wrap")}>
          {status === "idle" && (
            <PgButton autoWidth onClick={() => void start()}>
              Start talking
            </PgButton>
          )}
          {status === "connecting" && (
            <span style={sx("font:400 13.5px Inter,sans-serif;color:#777674")}>Connecting to your librarian…</span>
          )}
          {live && (
            <button
              type="button"
              onClick={() => void conversation.endSession()}
              style={sx(
                "padding:11px 18px;border-radius:999px;border:1px solid #cdccc8;background:#fff;color:#383838;font:500 13.5px Inter,sans-serif;cursor:pointer",
              )}
            >
              End conversation
            </button>
          )}
          {status === "done" && (
            <PgButton autoWidth onClick={onContinue}>
              Continue
            </PgButton>
          )}
          <span style={sx("flex:1")} />
          <span style={sx("display:flex;align-items:center;gap:7px;font:400 12.5px Inter,sans-serif;color:#777674")}>
            <span style={{ ...mask("mic"), width: 15, height: 15, background: "#777674" }} />
            Microphone only — nothing is kept
          </span>
        </div>
      </div>

      <aside
        style={sx(
          "background:#f9f8f6;border-left:1px solid #e9e7e3;padding:40px 28px;display:flex;flex-direction:column;gap:14px",
        )}
      >
        <div style={sx("font:600 13px Manrope,sans-serif;color:#383838")}>Picking up on</div>
        {topics.length === 0 && (
          <p style={sx("margin:0;font:400 13px/1.6 Inter,sans-serif;color:#777674")}>
            Your interests appear here as soon as they're clear.
          </p>
        )}
        {topics.map((label) => (
          <div
            key={label}
            style={sx(
              "display:flex;align-items:center;gap:8px;padding:9px 13px;border-radius:999px;border:1px solid #c6cdff;background:#e4e8fe;color:#151da2;font:500 13px Inter,sans-serif;animation:pgIn .3s cubic-bezier(.4,0,.2,1) both",
            )}
          >
            <span style={{ ...mask("check"), width: 14, height: 14, background: "#3327ec" }} />
            {label}
          </div>
        ))}
        <p style={sx("margin:0;font:400 13px/1.6 Inter,sans-serif;color:#666565")}>
          These shape the pages you'll read next — one page per book, so you can judge the writing itself.
        </p>
      </aside>
    </section>
  );
}
