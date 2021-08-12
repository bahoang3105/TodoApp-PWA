const staticCacheName = 'site-static-v5'
const dynamicCacheName = 'site-dynamic-v5'

const assets = [
    './',
    'index.html',
    'pages/completed_task.html',
    'pages/upcomingtask.html',
    'pages/fallback.html',
    'js/register-sw.js',
    'js/todaytask.js',
    'css/completed_task.css',
    'css/homepage.css',
    'css/login.css',
    'css/todaytask.css',
    'css/upcoming.css',
]

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

// install service worker
self.addEventListener('install', (evt) => {
    console.log('service worker has been installed')
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets')
            return cache.addAll(assets);
        })
    );
})

// activate service worker
self.addEventListener('activate', evt => {
    console.log('service worker has been activated')
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            )
        })
    )
})

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt)
    // khi asset da duoc cache thi khong req den server nua
    if (evt.request.method === 'GET' && evt.request.url.indexOf('api') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(
                    fetchRes => {
                        return caches.open(dynamicCacheName).then(cache => {
                            cache.put(evt.request.url, fetchRes.clone())
                            limitCacheSize(dynamicCacheName, 15)
                            return fetchRes
                        })
                    }
                )
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('./pages/fallback.html')
                }
            })
        )
    }
})
