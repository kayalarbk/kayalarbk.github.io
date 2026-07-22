# PROGRESS — Proje Hafızası

> ## ⚠️ KALICI KURAL
>
> **Bu dosya projenin hafızasıdır. Her güncelleme, yeni özellik,
> bug fix veya teknik karar sonrasında bu dosya GÜNCELLENMELİDİR.
> Güncelleme yapılmadan iş "bitti" sayılmaz.**
>
> Ayrıca: her PROGRESS.md güncellemesi, ilgili kod değişiklikleriyle
> **aynı commit** içinde `origin/main`'e push'lanır.
> Commit mesajı formatı: `feat: …` / `fix: …` / `docs: …` / `refactor: …` / `chore: …`
>
> **Her yeni oturuma bu dosyayı okuyarak başla ve kaldığın yerden devam et.**

---

## 1. Proje özeti

`https://kayalarbk.github.io` adresinde yayınlanan kişisel portfolyo sitesi.
GitHub projelerini aranabilir/filtrelenebilir kartlar halinde listeler ve bir
"Hakkımda" sayfası sunar.

Build adımı, framework ve bağımlılık yoktur — saf HTML + CSS + vanilla JS.

📄 **Kapsam, gereksinimler ve teknik kısıtlar için → [SPEC.md](SPEC.md)**

- **Depo:** `kayalarbk/kayalarbk.github.io` (dal: `main`)
- **Yayın:** GitHub Pages, `main` dalının kökünden otomatik
- **Yerel çalıştırma:** VS Code → Live Server (port 5501) veya
  `python -m http.server 5501`

---

## 2. Tamamlanan işler

### 2026-07-22 — Profesyonel dosya yapısına geçiş (`refactor`)

- Tüm CSS satır içi `<style>` bloklarından çıkarıldı → `assets/css/`
  (`base.css` ortak katman, `home.css` ve `about.css` sayfaya özel).
- Tüm JS satır içi `<script>` bloklarından çıkarıldı → `assets/js/`
  (`projects.data.js` veri, `home.js` mekanizma, `common.js` ortak).
- Favicon `data:` URI'sinden gerçek dosyaya taşındı → `assets/img/favicon.svg`.
- `hakkimda.html`'e `canonical` etiketi eklendi (ana sayfada zaten vardı).
- Proje dokümantasyonu oluşturuldu: `SPEC.md`, `PROGRESS.md`, `README.md`.
- Depo hijyeni: `.gitignore`, `.gitattributes`, `.editorconfig`, `.nojekyll`.

### 2026-07-22 — `SigarayiBirak` projesi eklendi (`feat`)

- Proje listesine "Araçlar" kategorisinde yeni kart eklendi.
  (Yerelde duruyordu, bu düzenlemeyle birlikte ilk kez yayına alındı.)

### Daha önce (tarih kaydı tutulmadan yapılanlar)

Bu dosya oluşturulmadan önce tamamlanmış olan işler:

- Ana sayfa: hero, sosyal bağlantılar, proje kartı ızgarası.
- Projelerin HTML'e elle yazılması yerine `PROJELER` veri dizisinden
  üretilmesi; site/repo bağlantılarının depo adından otomatik türetilmesi.
- Kategori filtreleri (Mühendislik · Eğitim · Araçlar · Kişisel) ve buton
  üzerinde proje sayacı.
- Türkçe karakterlere duyarsız arama, `/` kısayolu, `Esc` ile temizleme,
  boş-durum mesajı ve `aria-live` sonuç sayacı.
- `IntersectionObserver` ile kaydırınca beliren kart animasyonu.
- "Hakkımda" sayfası: profil, yetenek grupları, deneyim zaman çizelgesi,
  iletişim bağlantıları; ana sayfada ona giden vurgulu bant.
- Erişilebilirlik geçişi: skip-link, focus halkaları, `prefers-reduced-motion`.
- SEO/paylaşım meta etiketleri ve `<noscript>` yedeği.

---

## 3. Dosya yapısı ve rolleri

```
.
├── index.html                    # Ana sayfa — proje listesi (giriş noktası)
├── hakkimda.html                 # Hakkımda sayfası
├── assets/
│   ├── css/
│   │   ├── base.css              # Tasarım token'ları, reset, ortak bileşenler
│   │   ├── home.css              # Ana sayfaya özel: hero, filtreler, kartlar
│   │   └── about.css             # Hakkımda sayfasına özel: zaman çizelgesi vb.
│   ├── js/
│   │   ├── projects.data.js      # ⭐ PROJE LİSTESİ — içerik burada düzenlenir
│   │   ├── home.js               # Kart üretimi, filtre, arama, animasyon
│   │   └── common.js             # Her sayfada çalışan ortak işler (telif yılı)
│   └── img/
│       └── favicon.svg           # Site ikonu
├── SPEC.md                       # Ne yapılacak — kapsam ve gereksinimler
├── PROGRESS.md                   # Ne yapıldı — proje hafızası (bu dosya)
├── README.md                     # Depo tanıtımı ve hızlı başlangıç
├── .nojekyll                     # GitHub Pages'in Jekyll işlemesini kapatır
├── .gitattributes                # Satır sonu normalizasyonu (LF)
├── .editorconfig                 # Editör ayarları (4 boşluk, UTF-8, LF)
├── .gitignore
└── .vscode/settings.json         # Live Server portu: 5501
```

**Yeni proje eklemek için:** yalnızca `assets/js/projects.data.js` dosyasına
bir satır ekle. Başka hiçbir dosyaya dokunmaya gerek yok.

---

## 4. Teknik kararlar ve gerekçeleri

| Karar | Gerekçe |
|---|---|
| **Framework yok, build yok** | Site tamamen statik. GitHub Pages dosyaları olduğu gibi sunuyor; bir build adımı eklemek dağıtımı kırılgan hale getirir ve hiçbir şey kazandırmaz. |
| **CSS/JS ayrı dosyalarda** | Satır içi bloklar tarayıcı tarafından önbelleğe alınamıyordu ve iki sayfada ~200 satır CSS kopyalanmıştı. Ayırma tekrarı bitirdi, düzenlemeyi kolaylaştırdı. |
| **Veri (`projects.data.js`) mekanizmadan (`home.js`) ayrı** | İçerik güncellemesi sık, mantık güncellemesi seyrek. Ayrı dosyada olunca proje eklemek kodu okumayı gerektirmiyor. |
| **`base.css` + sayfa CSS'i** | Token ve reset tek yerde; sayfaya özel kurallar birbirine bulaşmıyor. Üçüncü bir sayfa eklendiğinde sadece yeni bir dosya yazılacak. |
| **JS modülü (`type="module"`) yerine klasik `<script>`** | Modüller `file://` üzerinden CORS nedeniyle açılmıyor; sayfayı çift tıklayarak açabilmek pratikte işe yarıyor. Sıralı `<script>` etiketleri bu senaryoda sorunsuz. |
| **Site/repo URL'lerinin `repo` alanından türetilmesi** | Her proje için iki URL elle yazmak hataya açıktı. Tek alan → iki bağlantı. |
| **`yok: true` bayrağı** | Bazı depolarda GitHub Pages kapalı; ölü bağlantı göstermek yerine yalnızca depo bağlantısı çıkıyor. |
| **Favicon ayrı SVG dosyası** | `data:` URI iki HTML dosyasında kopyalanmıştı ve önbelleğe alınamıyordu. |
| **Türkçe arama normalizasyonu** | `toLocaleLowerCase('tr')` + NFD; "İ/ı" sorunu ve şapkalı harfler yüzünden aramanın boş dönmesini engelliyor. |
| **`.nojekyll`** | GitHub Pages varsayılan olarak Jekyll çalıştırıyor ve alt çizgiyle başlayan dosyaları yok sayıyor; bu dosya işlemeyi tamamen kapatıp yayını öngörülebilir kılıyor. |
| **Kod yorumları Türkçe** | Depo tek kişilik ve Türkçe; okunabilirlik dil tutarlılığından daha önemli. |

---

## 5. TODO — bilinen eksikler

Öncelik sırasıyla:

- [ ] **`hakkimda.html` içindeki yer tutucular doldurulacak.** Halen
      `[Bölüm]` ve `[Yıl]` yazıyor; LinkedIn bağlantısı boş profile
      (`linkedin.com/in/`) gidiyor — doldurulmalı ya da satır silinmeli.
- [ ] **`Drone_project_c` deposu** GitHub'da yok. Açılınca
      `projects.data.js` içindeki yorum satırı aktifleştirilecek.
- [ ] Proje kartlarına **önizleme görseli** (ekran görüntüsü) eklemek.
- [ ] Ana sayfaya **öne çıkan projeler** bölümü.
- [ ] `og:image` için gerçek bir paylaşım görseli üretmek
      (şu an görsel yok, paylaşımlar düz kart olarak çıkıyor).
- [ ] Basit bir **404.html** sayfası.
- [ ] Değerlendirilecek: projelerin GitHub API'den canlı çekilmesi
      (yıldız sayısı, son güncelleme). SPEC'te şu an kapsam dışı —
      API oran sınırı ve JS kapalıyken boş sayfa riski nedeniyle.

## 6. Bilinen buglar

- **Açık bug yok.**

### Çözülmüş

- *(2026-07-22)* Filtrelemeden sonra yukarı kayan kartlar
  `IntersectionObserver`'ı yeniden tetiklemediği için görünmez kalıyordu.
  Çözüm: `uygula()` içinde `requestAnimationFrame` ile ekranda olup henüz
  belirmemiş kartlar elle `visible` işaretleniyor (`home.js`).
