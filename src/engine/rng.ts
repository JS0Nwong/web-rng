/**
 * sfc32 — Small Fast Counter PRNG
 * Same algorithm used in the Sol's Rolling Calculator reference.
 * Seeded from crypto.getRandomValues for proper entropy.
 */

const toUint = (value: number): number => (value >>> 0) & 0xffffffff;

function sfc32(a: number, b: number, c: number, d: number): () => number {
  return () => {
    a = toUint(a);
    b = toUint(b);
    c = toUint(c);
    d = toUint(d);

    const t = (toUint(a + b) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;

    return (t >>> 0) / 0x100000000;
  };
}

function captureSeedWord(): number {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    return buffer[0];
  }
  const time = Date.now();
  const wobble = Math.floor(Math.random() * 0xffffffff);
  return toUint(time ^ wobble ^ (performance.now() * 1000));
}

// Initialize the PRNG engine with 4 random seed words
const seeds = [captureSeedWord(), captureSeedWord(), captureSeedWord(), captureSeedWord()];
const engine = sfc32(seeds[0], seeds[1], seeds[2], seeds[3]);

// Warm up the engine (discard first 12 values)
for (let i = 0; i < 12; i++) {
  engine();
}

/** Returns a float in [0, 1) */
export function sample(): number {
  return engine();
}

/** Returns an integer in [min, max] inclusive */
export function rollInteger(min: number, max: number): number {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  if (high <= low) return low;
  const span = high - low + 1;
  return low + Math.floor(engine() * span);
}

/** Returns a float in [min, max) */
export function rollFloat(min: number, max: number): number {
  return engine() * (max - min) + min;
}
