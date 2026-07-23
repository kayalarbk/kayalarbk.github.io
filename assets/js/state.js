/* ============================================================
   state.js — kullanıcı durumunun kalıcılığı.

   Site içerik üretmiyor; saklanan tek şey kullanıcının arayüz
   tercihleri (aktif kategori filtresi ve arama metni). Veri küçük
   ve düz olduğu için IndexedDB değil localStorage kullanılıyor.

   Yazma debounce'lu (250 ms) — her tuş vuruşunda diske gitmez.

   Dışa/içe aktarma: iOS Safari uzun süre açılmayan sitelerin
   depolamasını silebildiği için kullanıcı durumunu JSON olarak
   yedekleyip geri yükleyebilir.
   ============================================================ */

window.Depo = (function () {
    const ANAHTAR = 'portfolyo.durum.v1';
    const GECIKME = 250;
    let zamanlayici = null;

    function oku() {
        try {
            const ham = localStorage.getItem(ANAHTAR);
            const veri = ham ? JSON.parse(ham) : null;
            return (veri && typeof veri === 'object') ? veri : {};
        } catch (e) {
            return {};                       // bozuk/erişilemez depolama → boş durum
        }
    }

    function hemenYaz(durum) {
        try {
            localStorage.setItem(ANAHTAR, JSON.stringify(durum));
        } catch (e) {
            /* özel sekme veya kota dolu — kalıcılık olmadan devam et */
        }
    }

    // Mevcut durumun üzerine yazar (kısmi güncelleme), debounce'lu.
    function yaz(kismi) {
        const durum = Object.assign(oku(), kismi);
        clearTimeout(zamanlayici);
        zamanlayici = setTimeout(() => hemenYaz(durum), GECIKME);
    }

    function temizle() {
        clearTimeout(zamanlayici);
        try { localStorage.removeItem(ANAHTAR); } catch (e) { /* yoksay */ }
    }

    function disaAktar() {
        const paket = {
            uygulama: 'kayalarbk-portfolyo',
            surum: 1,
            tarih: new Date().toISOString(),
            durum: oku()
        };
        const blob = new Blob([JSON.stringify(paket, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolyo-yedek-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function iceAktar(metin) {
        const paket = JSON.parse(metin);
        const durum = paket && paket.durum;
        if (!durum || typeof durum !== 'object') {
            throw new Error('Yedek dosyası tanınmadı.');
        }
        hemenYaz(durum);
        return durum;
    }

    // --- Sayfadaki yedekleme düğmeleri -------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        const disa = document.querySelector('[data-veri="disa-aktar"]');
        const ice = document.querySelector('[data-veri="ice-aktar"]');
        const durum = document.querySelector('[data-veri="durum"]');
        const bildir = msg => { if (durum) durum.textContent = msg; };

        if (disa) disa.addEventListener('click', () => {
            disaAktar();
            bildir('Yedek indirildi.');
        });

        if (ice) ice.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json,.json';
            input.addEventListener('change', () => {
                const dosya = input.files && input.files[0];
                if (!dosya) return;
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        iceAktar(String(reader.result));
                        bildir('Yedek geri yüklendi, sayfa yenileniyor…');
                        setTimeout(() => location.reload(), 600);
                    } catch (e) {
                        bildir('Geri yüklenemedi: ' + e.message);
                    }
                };
                reader.readAsText(dosya);
            });
            input.click();
        });
    });

    return { ANAHTAR, oku, yaz, temizle, disaAktar, iceAktar };
})();
