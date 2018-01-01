const cacheName = '8-queens-cache-v4'
const obsoleteCacheName = ['8-quuens-cache-v1', '8-quuens-cache-v2', '8-queens-cache-v2']
const urlsToCache = [
  '/',
  'assets/style.css',
  'assets/script.js'
]

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
    .then(function(res) {
      if (res) return res;
      return fetch(e.request);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (obsoleteCacheName.indexOf(cacheName) !== -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
