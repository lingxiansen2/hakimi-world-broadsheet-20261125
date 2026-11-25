import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const SOURCE_IMAGE = join(ROOT_DIR, 'entry.png');
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const TARGET_IMAGE = join(OUTPUT_DIR, 'entry.png');

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const JPEG_EOI = Buffer.from([0xff, 0xd9]);
const MAX_ENTRY_BYTES = 1048576;

function validateWholeImage(payload: Buffer): void {
  if (payload.byteLength === 0 || payload.byteLength > MAX_ENTRY_BYTES) {
    throw new Error(`entry.png invalid size: ${payload.byteLength} bytes`);
  }
  const isPng = payload.subarray(0, 8).compare(PNG_MAGIC) === 0;
  const isJpeg =
    payload.subarray(0, 3).compare(JPEG_MAGIC) === 0 &&
    payload.subarray(payload.byteLength - 2).compare(JPEG_EOI) === 0;
  if (!isPng && !isJpeg) {
    throw new Error('entry.png is neither a valid PNG nor a whole JPEG');
  }
}

function emitEntryImage(): void {
  const payload = readFileSync(SOURCE_IMAGE);
  validateWholeImage(payload);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(TARGET_IMAGE, payload);
}

emitEntryImage();
