self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Serwice Worker ... ', event)
})

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Serwice Worker ... ', event)
})

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching something ... ', event)
  event.respondWith(fetch(event.request))
})