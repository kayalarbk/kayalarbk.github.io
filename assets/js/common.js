/* ============================================================
   common.js — her sayfada çalışan küçük ortak işler.
   ============================================================ */

(function () {
    // Footer'daki telif yılını otomatik güncel tut
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Service worker: çevrimdışı çalışma ve önbellek (sw.js).
    // file:// üzerinden açıldığında kayıt desteklenmez, sessizce atlanır.
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(() => {
                /* kayıt başarısız — site çevrimiçi olarak çalışmaya devam eder */
            });
        });
    }
})();
