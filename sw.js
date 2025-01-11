const staticCacheName = 's-v-1'
const dynamicCacheName = 'd-v-1'
const assetUrl = [
    './index.html',
]

self.addEventListener('install', async () => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrl)
})

self.addEventListener('activate', async () => {
    const cachesNames = await caches.keys()

    await Promise.all(
        cachesNames
        .filter(cn => cn !== staticCacheName)
        .filter(cn => cn !== dynamicCacheName)
        .map(cn => caches.delete(cn)) 
    )
})


self.addEventListener('fetch', event => {
    const { request } = event
    const url = new URL(request.url)

    if(url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})


async function cacheFirst(rq) {
    const cached = await caches.match(rq)
    return cached ?? await fetch(rq)
}


async function networkFirst(rq) {
    const cache = await caches.open(dynamicCacheName)
    try {
      const response = await fetch(rq)
      await cache.put(rq, response.clone())
      return response
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      const cached = await cache.match(rq)
      return cached ?? await caches.match('./src/pages/offline/offline.html')
    }
}