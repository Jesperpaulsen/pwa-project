var CACHE_STATIC_NAME = 'static-v4'
var CACHE_DYNAMIC_NAME = 'dynamic-v2'

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Serwice Worker ... ', event)
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then((cache) => {
        console.log('[Sercice Worker] Precaching app shell')
        cache.addAll([
          '/',
          'index.html',
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/fetch.js',
          '/src/js/promise.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ])
      })
  )
})

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Serwice Worker ... ', event)
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
  )
  
  return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching something ... ', event)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response
        return fetch(event.request)
          .then((res) => caches.open(CACHE_DYNAMIC_NAME)
          .then((cache) => {
            cache.put(event.request.url, res.clone())
            return res
          })).catch()
      })
  )
})