import type { Plugin } from 'vite';

export function requirePolyfillPlugin(): Plugin {
  return {
    name: 'require-polyfill',
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        `<script>
          // Polyfill for require and other Node.js globals
          (function() {
            if (typeof window !== 'undefined') {
              // Define require if not present
              if (typeof window.require === 'undefined') {
                window.require = function(module) {
                  console.warn('require() called in browser for module:', module);
                  return {};
                };
              }
              
              // Ensure global is defined
              if (typeof window.global === 'undefined') {
                window.global = window;
              }
              
              // Ensure process is defined
              if (typeof window.process === 'undefined') {
                window.process = { env: {} };
              }
            }
          })();
        </script>
        </head>`
      );
    },
  };
}
