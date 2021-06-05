
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker registered!')
  })
}

let deferredPrompt

self.addEventListener('beforeinstallpromt', (event) => {
  console.log('Before install promt fired!')
  event.preventDefault()
  deferredPrompt = event
})