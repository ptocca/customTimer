const CACHE_NAME = 'custom-timer-v2';
const BASE = self.registration.scope;
const ASSETS = [
    BASE + 'index.html',
    BASE + 'styles.css',
    BASE + 'app.js',
    BASE + 'manifest.json',
    BASE + 'icon.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // For navigation requests, serve index.html from cache (or network)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match(BASE + 'index.html')
                .then(cached => cached || fetch(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request))
    );
});
