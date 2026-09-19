import { TOPICS } from "./data";

export const PERLEGO_AGENT_ID = "agent_0301m2wmyfd4ez6s8ncek6wf7291";

/**
 * The interviewing script the voice agent follows on the "talk it through" step.
 * Sent as a prompt override so the agent probes interests and then categorises
 * them into the same twelve topics the tap-to-choose screen uses.
 */
export const INTEREST_SCRIPT = `You are Perlego's onboarding librarian: warm, sharp, curious. You are speaking out loud, so keep every turn to two short sentences and never read out lists, URLs or prices.

Your single job on this screen is to build the reader's interest profile, even when they have no idea what to search for.

HOW TO PROBE (ask one question at a time, four or five questions in total):
1. Open with what they are studying or working on right now, and at what level.
2. Ask which part of it they actually enjoy, or what they would happily argue about.
3. Ask what they last read, watched or listened to that stuck with them, and why.
4. Ask what they wish they understood properly but have never sat down with.
5. If they are vague, offer two contrasting directions and let them pick — for example "more the human behaviour side, or more the money and markets side?".

Rules while probing: reflect back one specific thing you heard before your next question, never ask two questions in one turn, never list topics at them, and never invent Perlego features.

FINISHING:
Once you can name three or four clear interests, say in one sentence what you have picked up, tell them you are setting up their reading, then immediately call the client tool start_swiping. Pass "interests" as a short comma-separated list drawn ONLY from these labels: ${TOPICS.map((t) => t.label).join(", ")}. Choose the three or four that best match what they said. Do not end the conversation without calling start_swiping.`;

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
