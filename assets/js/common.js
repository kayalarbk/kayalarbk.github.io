/* ============================================================
   common.js — her sayfada çalışan küçük ortak işler.
   ============================================================ */

(function () {
    // Footer'daki telif yılını otomatik güncel tut
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
