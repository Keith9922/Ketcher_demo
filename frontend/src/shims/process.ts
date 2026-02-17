// Provide Node-like globals expected by legacy dependencies (fbjs/draft-js).
const globalLike = globalThis as typeof globalThis & {
  global?: typeof globalThis;
  process?: { env?: Record<string, string> };
};

globalLike.global = globalLike;
globalLike.process = globalLike.process ?? { env: {} };
