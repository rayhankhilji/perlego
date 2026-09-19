import { createFileRoute } from "@tanstack/react-router";

const AGENT_ID = "agent_0301m2wmyfd4ez6s8ncek6wf7291";

export const Route = createFileRoute("/api/elevenlabs-token")({
  server: {
    handlers: {
      POST: async () => {
        const apiKey = process.env["ELEVENLABS_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "ElevenLabs is not connected to this project" }, { status: 500 });
        }

        const res = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${AGENT_ID}`,
          { headers: { "xi-api-key": apiKey } },
        );

        if (!res.ok) {
          const body = await res.text();
          console.error(`ElevenLabs token request failed [${res.status}]: ${body}`);
          return Response.json({ error: body || "Could not start the voice session" }, { status: res.status });
        }

        const data = (await res.json()) as { token?: string };
        if (!data.token) {
          return Response.json({ error: "No conversation token returned" }, { status: 502 });
        }
        return Response.json({ token: data.token });
      },
    },
  },
});
