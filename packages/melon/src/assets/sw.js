const CACHE_NAME = "@kajitsu/melon@1.0.0";

const urlsToCache = ["/", "/blog", "/blog/20201221", "/main.css", "/markdown.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf("http") === 0)) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(
    fetch(event.request)
      .then((res) =>
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request.url, res.clone());
          return res;
        }),
      )
      .catch(() => caches.match(event.request)),
  );
});
