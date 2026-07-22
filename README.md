# kayalarbk.github.io

Barış Kaya'nın kişisel portfolyo sitesi.
**Canlı:** <https://kayalarbk.github.io>

Build adımı, paket yöneticisi ve bağımlılık yok — saf HTML + CSS + vanilla JS.
`main` dalına push edilen her değişiklik GitHub Pages tarafından otomatik yayınlanır.

---

## Yerelde çalıştırma

`index.html`'i tarayıcıda açmak yeterli. Canlı yenileme istersen:

```bash
python -m http.server 5501
# → http://localhost:5501
```

VS Code kullanıyorsan **Live Server** eklentisi aynı portta ayarlı.

---

## Yeni proje eklemek

Tek dosya: **`assets/js/projects.data.js`**. Listeye bir satır ekle:

```js
{ repo: 'DepoAdi', ad: 'Görünen Ad', kat: 'Araçlar', acik: 'Kısa açıklama.' },
```

- `kat` şu dördünden biri olmalı: `Mühendislik` · `Eğitim` · `Araçlar` · `Kişisel`
- Site ve GitHub bağlantıları `repo` alanından otomatik üretilir.
- Depoda GitHub Pages kapalıysa `yok: true` ekle — yalnızca depo bağlantısı gösterilir.
- Adres GitHub Pages dışındaysa `site: 'https://...'` yaz.

---

## Dosya yapısı

```
index.html          Ana sayfa — proje listesi
hakkimda.html       Hakkımda sayfası
assets/css/         base.css (ortak) + home.css + about.css
assets/js/          projects.data.js (içerik) + home.js + common.js
assets/img/         favicon.svg
```

---

## Dokümantasyon

| Dosya | İçerik |
|---|---|
| [SPEC.md](SPEC.md) | Kapsam, gereksinimler, teknik kısıtlar |
| [PROGRESS.md](PROGRESS.md) | Proje hafızası: yapılanlar, kararlar, TODO, buglar |

> Her değişiklikten sonra `PROGRESS.md` güncellenir ve aynı commit ile push'lanır.
> Commit formatı: `feat:` / `fix:` / `docs:` / `refactor:` / `chore:`
