// One Emoji, One Smile — entry for u-0xkianno-one-emoji-one-smile-5470751f
// Writes exactly one emoji, 🥹 (U+1F979, face holding back tears), to
// /output/entry.txt and nothing else. No words, no newline, no caption.
//
// Why this emoji: it reads as deeply touched and grateful — warm at first
// glance, instantly readable by any stranger, and clearly chosen rather
// than the default smile, with no intimacy, sarcasm or flirtation.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const EMOJI = "🥹"; // U+1F979 — a single Unicode code point.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

// The entry must be exactly one emoji: one code point, one grapheme.
if ([...EMOJI].length !== 1) {
  throw new Error("entry emoji must be exactly one character");
}
if (Buffer.byteLength(EMOJI, "utf8") !== 4) {
  throw new Error("entry emoji must be exactly 4 UTF-8 bytes");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, EMOJI, "utf8");

// Read it back and verify byte-for-byte: exactly the one emoji, nothing else.
const written = readFileSync(OUTPUT_PATH, "utf8");
const writtenBytes = readFileSync(OUTPUT_PATH);
if (written !== EMOJI) {
  throw new Error(`verification failed: entry.txt is ${JSON.stringify(written)}, expected ${JSON.stringify(EMOJI)}`);
}
if ([...written].length !== 1 || Buffer.byteLength(written, "utf8") !== 4) {
  throw new Error("verification failed: entry.txt is not exactly one 4-byte emoji");
}
// Byte-level guard: no trailing newline or extra bytes may sneak in.
if (writtenBytes.length !== 4 || writtenBytes[3] !== 0xb9) {
  throw new Error(`verification failed: entry.txt is ${writtenBytes.length} bytes, expected exactly 4`);
}

console.log(`Wrote ${OUTPUT_PATH}: ${EMOJI} (1 char, 4 bytes, no trailing newline)`);
