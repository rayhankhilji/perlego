import { createFileRoute } from "@tanstack/react-router";

const AGENT_ID = "agent_0301m2wmyfd4ez6s8ncek6wf7291";

export const Route = createFileRoute("/api/elevenlabs-token")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const websocket = url.searchParams.get("transport") === "websocket";
        const apiKey = process.env["ELEVENLABS_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "ElevenLabs is not connected to this project" }, { status: 500 });
        }

        const endpoint = websocket
          ? `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${AGENT_ID}`
          : `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${AGENT_ID}`;
        const res = await fetch(endpoint, { headers: { "xi-api-key": apiKey } });

        if (!res.ok) {
          const body = await res.text();
          console.error(`ElevenLabs token request failed [${res.status}]: ${body}`);
          return Response.json({ error: body || "Could not start the voice session" }, { status: res.status });
        }

        const data = (await res.json()) as { token?: string; signed_url?: string };
        const value = websocket ? data.signed_url : data.token;
        if (!value) {
          return Response.json({ error: "No conversation credentials returned" }, { status: 502 });
        }
        return Response.json(websocket ? { signedUrl: value } : { token: value });
      },
    },
  },
});
