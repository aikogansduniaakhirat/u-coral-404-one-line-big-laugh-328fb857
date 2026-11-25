/**
 * One Line, Big Laugh — entry.
 *
 * One line, 200 characters at most, written to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt. Stdlib only, no network.
 *
 * Shape: a negotiation nobody remembers agreeing to, delivered as flat
 * municipal fact. The reader supplies the raccoon's rent, which is the joke;
 * the line never says it, which is why it lands.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The raccoon and I have reached an agreement about the walls: he keeps the noise down, I keep paying the mortgage.";

// The joke is the asymmetry nobody questions. "Agreement" implies two parties
// with standing; the second clause gives the raccoon one obligation (be quiet)
// and the human the entire bill. Nothing is spelled out, so the reader does the
// last step, which is what makes a short line stick.
const CAP = 200;

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  if (!text) throw new Error("empty line");
  if (text.length > CAP) throw new Error(`${text.length} chars over cap ${CAP}`);
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const text = compose();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), text, "utf8");
  process.stderr.write(`wrote ${text.length} chars\n`);
}

try {
  main();
} catch (e) {
  process.stderr.write(`entry failed: ${(e as Error).message}\n`);
  process.exit(1);
}
