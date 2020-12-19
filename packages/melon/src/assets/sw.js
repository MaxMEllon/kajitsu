const CACHE_NAME = '@kajitsu/melon@1.0.0';

const urlsToCache = [
  '/',
  '/blog',
  '/main.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    cache.addAll(urlsToCache)
  }))
})

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const cachedResponse = await caches.match(e.request);
    if (cachedResponse) return cachedResponse;
    return fetch(e.request);
  })())
})
