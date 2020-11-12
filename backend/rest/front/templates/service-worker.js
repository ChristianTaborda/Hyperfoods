const cacheName = "v1";
let cacheUrls = [];

self.addEventListener("install", function (e) {
  const installPromise = new Promise(function (resolve, reject) {
    // console.log('Service Worker: Installed')
    e.waitUntil(
      caches
        .open(cacheName)
        .then((cache) => {
          console.log("Service Worker: Caching Files");
          /* slice(1) skip the fetch request to http://tenant1.localhost:8000/admin/list-workers
               try again when Django can serve all routes */
          cache.addAll(cacheUrls.slice(1));
        })
        .then(() => self.skipWaiting())
    );

    // eslint-disable-next-line
    self.addEventListener("message", function (e) {
      cacheUrls.push(...e.data.payload);
      resolve();
    });
  });

  e.waitUntil(installPromise);
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  // console.log('Service Worker: Activated');

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  // console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cahce
        caches.open(cacheName).then((cache) => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
