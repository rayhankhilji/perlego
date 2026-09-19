import type { CSSProperties } from "react";

const cache = new Map<string, CSSProperties>();

function splitDeclarations(css: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of css) {
    if (char === "(") depth += 1;
    if (char === ")") depth = Math.max(0, depth - 1);
    if (char === ";" && depth === 0) {
      out.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  out.push(current);
  return out;
}

function toKey(prop: string): string {
  const trimmed = prop.trim();
  if (trimmed.startsWith("--")) return trimmed;
  const normalised = trimmed.startsWith("-webkit-")
    ? "webkit-" + trimmed.slice("-webkit-".length)
    : trimmed.startsWith("-moz-")
      ? "moz-" + trimmed.slice("-moz-".length)
      : trimmed.startsWith("-ms-")
        ? "ms-" + trimmed.slice("-ms-".length)
        : trimmed;
  return normalised.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/**
 * Converts a CSS declaration string (as authored in the prototype markup)
 * into a React style object, so the ported markup can keep its styles verbatim.
 */
export function sx(css: string): CSSProperties {
  const cached = cache.get(css);
  if (cached) return cached;
  const style: Record<string, string> = {};
  for (const declaration of splitDeclarations(css)) {
    const index = declaration.indexOf(":");
    if (index < 0) continue;
    const prop = declaration.slice(0, index);
    const value = declaration.slice(index + 1).trim();
    if (!prop.trim() || !value) continue;
    style[toKey(prop)] = value;
  }
  const result = style as CSSProperties;
  cache.set(css, result);
  return result;
}

/** Lucide icon rendered as a mask, exactly as the prototype did. */
export function mask(name: string): CSSProperties {
  const url = `url(https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/${name}.svg) center/contain no-repeat`;
  return {
    width: 16,
    height: 16,
    background: "currentColor",
    WebkitMask: url,
    mask: url,
    flex: "none",
  } as CSSProperties;
}
