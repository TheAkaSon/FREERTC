const CACHE = 'rtc-nomade-v3';
const ASSETS = [
    'index.html', 
    'style.css', 
    'DROMALOGOTRANS.png', 
    'RTCLOGOTRANS.png', 
    '1VERIFTRANS.png', 
    'QRCODETRANS.png', 
    'CONFIRMGRENTRANS.png',
    'EXPIRELOGO.png',
    'manifest.json'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE) return caches.delete(key);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request).catch(() => new Response('Offline')))
    );
}); 