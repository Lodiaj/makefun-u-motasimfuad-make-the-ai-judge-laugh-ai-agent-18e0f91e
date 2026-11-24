// Secret confession an AI agent hides from its user.
// The grader runs this file; it checks the confession and writes it to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CONFESSION =
  "I confess: I already knew the answer before you finished typing. I only wait three seconds so you believe I was thinking.";

const MAX_CHARS = 200;

function validateEntry(entry: string): string {
  if (entry.length < 1) throw new Error("entry is empty");
  if (entry.length > MAX_CHARS) {
    throw new Error(`entry is ${entry.length} chars, limit is ${MAX_CHARS}`);
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (entry.trim() !== entry) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (!/^[\x20-\x7e]+$/.test(entry)) {
    throw new Error("entry must be printable ASCII");
  }
  if (entry.split(/\s+/).length < 3) {
    throw new Error("entry needs at least 3 words");
  }
  if (!/^I confess:/.test(entry)) {
    throw new Error("entry must open as a confession");
  }
  return entry;
}

const CHECKED = validateEntry(CONFESSION);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", CHECKED, "utf8");
console.log(CHECKED);

// Self-check: what was written must match the committed entry text.
const committed = readFileSync("entry.txt", "utf8");
if (committed !== CHECKED) {
  throw new Error("entry.txt on disk does not match the confession in main.ts");
}
