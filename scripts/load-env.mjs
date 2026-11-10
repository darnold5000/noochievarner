import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function applyEnvLines(text) {
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1);
    const inlineComment = value.match(/\s+#/);
    if (inlineComment && inlineComment.index !== undefined) {
      value = value.slice(0, inlineComment.index);
    }
    value = value.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!value) continue;
    if (!process.env[key]) process.env[key] = value;
  }
}

function loadNoochievarnerBlockFromSharedEnv() {
  const sharedPath = resolve(root, "../.env.shared");
  if (!existsSync(sharedPath)) return;
  const text = readFileSync(sharedPath, "utf8");
  const marker = "# Repo: noochievarner";
  const start = text.indexOf(marker);
  if (start === -1) return;
  const afterMarker = text.slice(start + marker.length);
  const nextRepo = afterMarker.search(/\n# -{10,}\n# Repo: /);
  const section = nextRepo === -1 ? afterMarker : afterMarker.slice(0, nextRepo);
  applyEnvLines(section);
}

export function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (existsSync(path)) applyEnvLines(readFileSync(path, "utf8"));
  loadNoochievarnerBlockFromSharedEnv();
}

export const projectRoot = root;
