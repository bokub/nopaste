const VERSION = '20221018';
const PRECACHE = 'precache-' + VERSION;
const MODES = 'modes-' + VERSION;

// A regexp to detect mode files
const MODE_REGEXP = /^https:\/\/cdn\.jsdelivr.net\/npm\/codemirror@.+?\/mode\//;

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    '/',
    'script.js',
    'style.css',
    'favicon.ico',
    'https://cdn.jsdelivr.net/npm/lzma@2.3.2/src/lzma_worker.min.js',
    'https://cdn.jsdelivr.net/combine/' +
        'npm/lzma@2.3.2/src/lzma.min.js,' +
        'npm/slim-select@1.27.1/dist/slimselect.min.js,' +
        'npm/clipboard@2.0.11/dist/clipboard.min.js,' +
        'npm/micromodal@0.4.10/dist/micromodal.min.js,' +
        'npm/codemirror@5.65.5,' +
        'npm/codemirror@5.65.5/addon/mode/loadmode.min.js,' +
        'npm/codemirror@5.65.5/addon/mode/overlay.min.js,' +
        'npm/codemirror@5.65.5/addon/mode/multiplex.min.js,' +
        'npm/codemirror@5.65.5/addon/mode/simple.min.js,' +
        'npm/codemirror@5.65.5/addon/scroll/simplescrollbars.js,' +
        'npm/codemirror@5.65.5/mode/meta.min.js',
    'https://cdn.jsdelivr.net/combine/' +
        'npm/bootstrap@4.6.1/dist/css/bootstrap-grid.min.css,' +
        'npm/slim-select@1.27.1/dist/slimselect.min.css,' +
        'npm/codemirror@5.65.5/lib/codemirror.min.css,' +
        'npm/codemirror@5.65.5/addon/scroll/simplescrollbars.css,' +
        'npm/codemirror@5.65.5/theme/dracula.min.css,' +
        'npm/microtip@0.2.2/microtip.min.css',
    'https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@2.242/fonts/webfonts/JetBrainsMono-Regular.woff2',
    'https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@2.242/fonts/ttf/JetBrainsMonoNL-Regular.ttf',
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, MODES];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// The fetch handler serves responses from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith(self.location.origin) && !event.request.url.startsWith('https://cdn.jsdelivr.net')) {
        return;
    }
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            if (!event.request.url.match(MODE_REGEXP)) {
                return fetch(event.request);
            }

            return caches.open(MODES).then((cache) => {
                return fetch(event.request).then((response) => {
                    // Put a copy of the response in the runtime cache.
                    return cache.put(event.request, response.clone()).then(() => {
                        return response;
                    });
                });
            });
        })
    );
});
