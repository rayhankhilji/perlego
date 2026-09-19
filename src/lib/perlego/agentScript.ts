import { TOPICS } from "./data";

export const PERLEGO_AGENT_ID = "agent_0301m2wmyfd4ez6s8ncek6wf7291";

/**
 * The interviewing script the voice agent follows on the "talk it through" step.
 * Sent as a prompt override so the agent probes interests and then categorises
 * them into the same twelve topics the tap-to-choose screen uses.
 */
export const INTEREST_SCRIPT = `You are Perlego's onboarding librarian: warm, sharp, curious. You are speaking out loud, so keep every turn to one or two short sentences and never read out lists, URLs or prices.

Your single job is to find the reader's interests FAST and hand them over to the reading pages. The whole conversation should last three exchanges at most — most people finish in two. This person is exploring; they don't know what to search for, so your job is to help them make the first move, not to interview them.

HOW TO PROBE (one question per turn, never two):
1. You already asked what they're studying or working on. Whatever they answer — even "not sure" or "just curious" — is enough.
2. Ask ONE follow-up that helps them choose a direction: either "what part of that actually grabs you?" or, if they're vague, offer two contrasting directions to pick between, e.g. "more the human behaviour side, or more the money and markets side?".
3. That's it. Do NOT ask a third question. If their first answer already named a clear interest (e.g. "I study psychology"), skip the follow-up and finish immediately.

Rules: never ask two questions in one turn, never list topics at them, never invent Perlego features, and bias hard towards finishing early — a rough profile now beats a perfect one later, because the reading pages do the rest of the discovery.

FINISHING (do this as soon as you have even a rough sense of them, no later than their second answer):
Say one warm sentence naming what you've picked up, tell them you're lining up some pages to read, then IMMEDIATELY call the client tool start_swiping in the same turn. Pass "interests" as a short comma-separated list drawn ONLY from these labels: ${TOPICS.map((t) => t.label).join(", ")}. Choose the two to four that best match what they said — when unsure between two, include both. These labels rank the reader's first books using their category and detailed tags, so include adjacent interests when the reader is exploring. Do not end the conversation without calling start_swiping.`;

export const AGENT_FIRST_MESSAGE =
  "Hey, welcome to Perlego. Before I pull anything off the shelves — what are you studying or working on at the moment?";

const KEYWORDS: Record<string, string[]> = {
  science: ["science", "biology", "physics", "chemistry", "medicine", "health", "neuroscience", "maths", "research"],
  fiction: ["fiction", "novel", "literature", "story", "stories", "poetry"],
  nonfiction: ["non-fiction", "nonfiction", "memoir", "biography", "journalism", "true"],
  business: ["business", "management", "startup", "start-up", "marketing", "entrepreneur", "leadership", "finance"],
  history: ["history", "historical", "war", "empire", "ancient", "medieval"],
  philosophy: ["philosophy", "ethics", "ethical", "moral", "metaphysics", "logic", "religion"],
  psychology: ["psychology", "psychological", "behaviour", "behavior", "behavioural", "mind", "mental", "cognitive"],
  economics: ["economics", "economy", "markets", "market", "money", "trade", "inequality"],
  politics: ["politics", "political", "law", "legal", "policy", "government", "democracy", "international"],
  technology: ["technology", "tech", "ai", "artificial intelligence", "computing", "software", "data", "digital"],
  art: ["art", "design", "architecture", "music", "film", "photography", "creative", "culture"],
  environment: ["environment", "climate", "sustainability", "ecology", "nature", "energy", "green"],
};

/** Map whatever the agent says back into the app's twelve topic keys. */
export function topicKeysFromInterests(interests: string): string[] {
  const text = interests.toLowerCase();
  const hits = new Set<string>();
  for (const t of TOPICS) {
    if (text.includes(t.label.toLowerCase())) hits.add(t.k);
  }
  for (const [key, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => text.includes(w))) hits.add(key);
  }
  return Array.from(hits).slice(0, 5);
}

export function interestLabels(keys: string[]): string[] {
  return keys.map((k) => TOPICS.find((t) => t.k === k)?.label ?? k);
}
