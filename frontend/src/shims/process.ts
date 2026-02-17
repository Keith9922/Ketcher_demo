// Provide Node-like globals expected by legacy dependencies (fbjs/draft-js).
const globalLike = globalThis as typeof globalThis & {
  global?: typeof globalThis;
  process?: { env?: Record<string, string> };
  require?: (module: string) => any;
};

globalLike.global = globalLike;
globalLike.process = globalLike.process ?? { env: {} };

// Polyfill for require if not already defined
if (typeof globalLike.require === 'undefined') {
  globalLike.require = function(module: string) {
    console.warn('require() is not supported in browser, module:', module);
    return {};
  };
}
