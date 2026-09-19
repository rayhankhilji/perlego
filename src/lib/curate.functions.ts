import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";
import { BOOKS, BOOKS_BY_ID } from "./books";
import { fallbackShelf, type Shelf } from "./deck";
import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";

const CurateInput = z.object({
  interests: z.array(z.string()),
  verdicts: z.array(z.object({ id: z.string(), liked: z.boolean() })),
});

const ShelfSchema = z.object({
  shelfTitle: z.string(),
  tasteSummary: z.string(),
  picks: z.array(z.object({ id: z.string(), why: z.string() })),
});

function describe(id: string) {
  const book = BOOKS_BY_ID[id];
  if (!book) return id;
  return `${id} — "${book.title}" (${book.track}; ${book.tags.join(", ")})`;
}

export const curateShelf = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => CurateInput.parse(input))
  .handler(async ({ data }): Promise<Shelf> => {
    const fallback = fallbackShelf(data.verdicts, data.interests);

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return fallback;

    const liked = data.verdicts.filter((v) => v.liked).map((v) => describe(v.id));
    const skipped = data.verdicts.filter((v) => !v.liked).map((v) => describe(v.id));
    const catalogue = BOOKS.map(
      (book) => `${book.id} | ${book.title} | ${book.track} | ${book.tags.join(", ")}`,
    ).join("\n");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        output: Output.object({ schema: ShelfSchema }),
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            store: false,
          },
        },
        prompt: [
          "You are a sharp academic librarian building one reader's personal shelf.",
          "",
          `They said they were interested in: ${data.interests.join(", ") || "not specified"}`,
          `Pages they kept reading:\n${liked.join("\n") || "none"}`,
          `Pages they swiped away:\n${skipped.join("\n") || "none"}`,
          "",
          `Full catalogue (id | title | track | tags):\n${catalogue}`,
          "",
          "Return JSON with:",
          "- shelfTitle: an evocative shelf name, at most 5 words, no quotes.",
          "- tasteSummary: one sentence, under 30 words, naming the pattern in what they kept. Speak to them as 'you'. Do not list book titles.",
          "- picks: 8 entries chosen from the catalogue ids. Include the ones they kept, then close neighbours. Never include an id they swiped away. Each 'why' is one sentence under 20 words explaining the link to their taste.",
        ].join("\n"),
      });

      const output = await result.output;
      const picks = output.picks
        .filter((pick) => BOOKS_BY_ID[pick.id])
        .filter((pick, index, arr) => arr.findIndex((p) => p.id === pick.id) === index)
        .slice(0, 8);

      if (!picks.length) return fallback;
      return { shelfTitle: output.shelfTitle, tasteSummary: output.tasteSummary, picks };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        console.error("Curation returned unusable output", error.text);
        return fallback;
      }
      console.error("Curation failed", error);
      return fallback;
    }
  });
