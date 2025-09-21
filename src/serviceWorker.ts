/// <reference lib="webworker" />
// Custom service worker (TypeScript) for Loft App (Vite build)
// Minimal offline shell caching + runtime cache-first strategy.
// Adjust CACHE_NAME to bust old caches when assets change.
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'loft-static-v1';
const PRECACHE: string[] = [
    '/',
    '/index.html',
    '/manifest.json',
    '/images/dove-E009.svg'
];

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
            await cache.addAll(PRECACHE);
        } catch (e) {
            console.warn('SW precache failed', e);
        }
    })());
});

self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })());
});

self.addEventListener('fetch', (event: FetchEvent) => {
    const req = event.request;
    if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
            const resp = await fetch(req);
            if (resp.status === 200 && resp.type === 'basic') {
                cache.put(req, resp.clone());
            }
            return resp;
        } catch (e) {
            throw e; // Consider returning a fallback Response if desired
        }
    })());
});

export {}; // ensure this file is treated as a module