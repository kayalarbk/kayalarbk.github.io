/* ============================================================
   sw.js — service worker.

   Strateji:
   - Kendi statik dosyalarımız: cache-first (kurulumda hepsi önbelleğe alınır,
     böylece uygulama uçak modunda da tamamen açılır).
   - Google Fonts: runtime cache (ilk çevrimiçi ziyarette yakalanır).
   - Sayfa gezinmeleri: ağ yoksa önbellekten, o da yoksa index.html.

   SÜRÜM: statik dosyalardan biri değiştiğinde CACHE_SURUM artırılmalıdır.
   Sürüm değişince eski önbellekler activate sırasında silinir.
   ============================================================ */

const CACHE_SURUM = 'v1';
const STATIK_CACHE = 'portfolyo-statik-' + CACHE_SURUM;
const FONT_CACHE = 'portfolyo-font-' + CACHE_SURUM;

const STATIK_DOSYALAR = [
    './',
    './index.html',
    './hakkimda.html',
    './manifest.json',
    './assets/css/base.css',
    './assets/css/home.css',
    './assets/css/about.css',
    './assets/js/common.js',
    './assets/js/state.js',
    './assets/js/projects.data.js',
    './assets/js/home.js',
    './assets/img/favicon.svg',
    './assets/img/icon-192.png',
    './assets/img/icon-512.png'
];

const fontMu = url =>
    url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

// Kurulum: tüm statik dosyaları önbelleğe al, hemen devreye girmeye hazırlan.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIK_CACHE)
            .then(cache => cache.addAll(STATIK_DOSYALAR))
            .then(() => self.skipWaiting())
    );
});

// Etkinleşme: bu sürüme ait olmayan tüm önbellekleri temizle.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(adlar => Promise.all(
                adlar
                    .filter(ad => ad !== STATIK_CACHE && ad !== FONT_CACHE)
                    .map(ad => caches.delete(ad))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Sayfa gezinmeleri: önce ağ (güncel içerik), ağ yoksa önbellek.
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then(res => {
                    const kopya = res.clone();
                    caches.open(STATIK_CACHE).then(c => c.put(req, kopya));
                    return res;
                })
                .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
        );
        return;
    }

    // Google Fonts: önbellekte varsa oradan, yoksa ağdan alıp sakla.
    if (fontMu(url)) {
        event.respondWith(
            caches.match(req).then(bulunan => bulunan || fetch(req).then(res => {
                if (res.ok || res.type === 'opaque') {
                    const kopya = res.clone();
                    caches.open(FONT_CACHE).then(c => c.put(req, kopya));
                }
                return res;
            }).catch(() => bulunan))
        );
        return;
    }

    // Kendi kaynaklarımız: cache-first.
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(req).then(bulunan => bulunan || fetch(req).then(res => {
                if (res.ok) {
                    const kopya = res.clone();
                    caches.open(STATIK_CACHE).then(c => c.put(req, kopya));
                }
                return res;
            }))
        );
    }
});
