import { createServerFn } from "@tanstack/react-start";

const AGENT_ID = "agent_0301m2wmyfd4ez6s8ncek6wf7291";

/** Mints a short-lived WebRTC token so the browser never sees the API key. */
export const getVoiceToken = createServerFn({ method: "POST" }).handler(async () => {
  const apiKey = process.env["ELEVENLABS_API_KEY"];
  if (!apiKey) throw new Error("Voice is not connected yet.");

  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${AGENT_ID}`,
    { headers: { "xi-api-key": apiKey } },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`ElevenLabs token request failed [${response.status}]: ${body}`);
    throw new Error("Could not start the voice guide. Please try again.");
  }

  const data = (await response.json()) as { token?: string };
  if (!data.token) throw new Error("Could not start the voice guide. Please try again.");
  return { token: data.token };
});
