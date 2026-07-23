/* ============================================================
   home.js — ana sayfa mekanizması: kart üretimi, kategori
   filtreleri, arama ve kaydırmayla beliren kartlar.

   İçerik burada DEĞİL — projeler assets/js/projects.data.js
   içinde tanımlı ve bu dosyadan önce yüklenir.
   ============================================================ */

(function () {
    const grid = document.getElementById('grid');
    const search = document.getElementById('search');
    const filters = document.getElementById('filters');
    const count = document.getElementById('count');
    const empty = document.getElementById('empty');
    const TUMU = 'Tümü';

    const siteUrl = p => p.site || 'https://' + KULLANICI + '.github.io/' + p.repo + '/';
    const repoUrl = p => 'https://github.com/' + KULLANICI + '/' + p.repo;

    const ICON_SITE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>';
    const ICON_REPO = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.5v-1.8c-2.92.63-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.42-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.09-2.82-.11-.27-.47-1.35.1-2.8 0 0 .88-.28 2.89 1.07a10 10 0 0 1 5.26 0c2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.53.11 2.8.68.74 1.09 1.67 1.09 2.82 0 4.03-2.46 4.92-4.8 5.18.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z"/></svg>';

    // Kartları oluştur
    const cards = PROJELER.map(p => {
        const card = document.createElement('article');
        card.className = 'card reveal';
        card.dataset.kat = p.kat;

        const baslikLink = p.yok ? repoUrl(p) : siteUrl(p);
        const aksiyonlar = p.yok ? '' :
            '<a href="' + siteUrl(p) + '" target="_blank" rel="noopener noreferrer">' +
            ICON_SITE + 'Siteyi aç</a>';

        card.innerHTML =
            '<h3><a href="' + baslikLink + '" target="_blank" rel="noopener noreferrer">' + p.ad + '</a></h3>' +
            '<p>' + p.acik + '</p>' +
            '<span class="tag">' + p.kat + '</span>' +
            '<div class="card-actions">' + aksiyonlar +
                '<a href="' + repoUrl(p) + '" target="_blank" rel="noopener noreferrer">' +
                ICON_REPO + 'GitHub</a>' +
            '</div>';

        grid.appendChild(card);
        return card;
    });

    // Önceki oturumdan kalan arayüz durumunu geri yükle (state.js)
    const kayitli = (window.Depo && Depo.oku()) || {};
    // Kayıtlı kategori silinmiş olabilir; butonu olmayan bir filtreye düşme.
    const gecerliKat = kat => kat === TUMU ||
        (KATEGORILER.includes(kat) && PROJELER.some(p => p.kat === kat));

    // Filtre butonları (parantez içinde proje sayısıyla)
    let aktif = gecerliKat(kayitli.kategori) ? kayitli.kategori : TUMU;
    const sayi = kat => kat === TUMU
        ? PROJELER.length
        : PROJELER.filter(p => p.kat === kat).length;

    if (typeof kayitli.arama === 'string') search.value = kayitli.arama;

    [TUMU, ...KATEGORILER].forEach(kat => {
        if (sayi(kat) === 0) return;           // boş kalan kategoriyi gösterme
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-btn';
        btn.innerHTML = kat + '<span class="n">' + sayi(kat) + '</span>';
        btn.setAttribute('aria-pressed', String(kat === aktif));
        btn.addEventListener('click', () => {
            aktif = kat;
            filters.querySelectorAll('.filter-btn').forEach(b =>
                b.setAttribute('aria-pressed', String(b === btn))
            );
            uygula();
        });
        filters.appendChild(btn);
    });

    // Türkçe karakterleri normalize ederek arama yap
    const norm = s => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '');

    function uygula() {
        const q = norm(search.value.trim());
        let gorunen = 0;

        cards.forEach(card => {
            const katUyar = aktif === TUMU || card.dataset.kat === aktif;
            const metinUyar = !q || norm(card.textContent).includes(q);
            const goster = katUyar && metinUyar;
            card.hidden = !goster;
            if (goster) gorunen++;
        });

        // Durumu kalıcı yap (state.js içinde debounce'lu)
        if (window.Depo) Depo.yaz({ kategori: aktif, arama: search.value });

        count.textContent = gorunen + ' / ' + cards.length + ' proje gösteriliyor';
        empty.hidden = gorunen !== 0;
        grid.hidden = gorunen === 0;

        // Filtre sonrası yukarı kayan kartlar gözlemciyi tetiklemeyebilir;
        // ekranda olup henüz belirmemiş olanları elle göster.
        requestAnimationFrame(() => {
            cards.forEach(card => {
                if (card.hidden || card.classList.contains('visible')) return;
                if (card.getBoundingClientRect().top < window.innerHeight) {
                    card.classList.add('visible');
                }
            });
        });
    }

    search.addEventListener('input', uygula);
    search.addEventListener('keydown', e => {
        if (e.key === 'Escape') { search.value = ''; uygula(); }
    });

    // "/" tuşu ile aramaya odaklan
    document.addEventListener('keydown', e => {
        if (e.key === '/' && document.activeElement !== search) {
            e.preventDefault();
            search.focus();
        }
    });

    uygula();

    // Kartların görünüme girerken belirmesi
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.style.transitionDelay =
                    Math.min(cards.indexOf(entry.target), 6) * 60 + 'ms';
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -40px 0px' });
        cards.forEach(c => io.observe(c));
    } else {
        cards.forEach(c => c.classList.add('visible'));
    }
})();
