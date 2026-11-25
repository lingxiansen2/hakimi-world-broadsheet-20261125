import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const SOURCE_IMAGE = join(ROOT_DIR, 'entry.png');
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const TARGET_IMAGE = join(OUTPUT_DIR, 'entry.png');

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_ENTRY_BYTES = 1048576;

function emitEntryImage(): void {
  const payload = readFileSync(SOURCE_IMAGE);
  if (payload.subarray(0, 8).compare(PNG_MAGIC) !== 0) {
    throw new Error('Invalid PNG header in entry.png');
  }
  if (payload.byteLength > MAX_ENTRY_BYTES) {
    throw new Error(`entry.png exceeds 1 MiB limit: ${payload.byteLength}`);
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(TARGET_IMAGE, payload);
}

emitEntryImage();
