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

### 2026-07-23 — PWA'ya dönüştürme (`feat`)

Site artık iPhone'da "Ana Ekrana Ekle" ile gerçek bir uygulama gibi çalışıyor.

- `manifest.json`: `standalone` görüntü, `start_url: ./`, koyu tema renkleri
  (`#0a0a0a`), 192/512 PNG ikonlar (+ `maskable` varyant).
- İkonlar marka renginden üretildi → `assets/img/icon-192.png`, `icon-512.png`.
- Her iki HTML'in `<head>`'ine PWA/Apple meta etiketleri ve
  `viewport-fit=cover` eklendi.
- `sw.js` service worker: kurulumda 14 statik dosya önbelleğe alınıyor
  (cache-first), Google Fonts runtime cache'e giriyor, gezinmelerde
  ağ yoksa önbellekten servis ediliyor. Sürüm değişince eski cache siliniyor.
  Kayıt `common.js` içinde yapılıyor.
- `assets/js/state.js`: arayüz durumu (aktif kategori + arama metni)
  localStorage'a debounce'lu (250 ms) yazılıyor, açılışta geri yükleniyor.
  Footer'a "Verileri dışa aktar / İçe aktar" (JSON) düğmeleri eklendi.
- `base.css`: `env(safe-area-inset-*)` ile çentik/home bar güvenli alanı,
  `100dvh` desteği ve footer veri araçlarının stilleri.

Yerel doğrulama (`python -m http.server 5501`, Chrome): service worker
`activated`, 14 dosya + 8 font kaydı önbellekte; **sunucu kapatıldıktan sonra
sayfa tam olarak açıldı** (fontlar dahil); filtre + arama sayfa yenilendikten
sonra korundu; içe aktarma bozuk dosyada anlamlı hata verdi.

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
│   │   ├── state.js              # localStorage kalıcılığı + JSON yedekleme
│   │   └── common.js             # Ortak işler: telif yılı + SW kaydı
│   └── img/
│       ├── favicon.svg           # Site ikonu (tarayıcı sekmesi)
│       ├── icon-192.png          # PWA / apple-touch-icon
│       └── icon-512.png          # PWA (any + maskable)
├── manifest.json                 # PWA manifesti
├── sw.js                         # Service worker — çevrimdışı önbellek
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
| **Statik dosyalar cache-first, sayfalar network-first** | Statik dosyalar sürümle birlikte değişiyor; onları önbellekten vermek en hızlısı. Sayfalarda ise içerik tazeliği önemli — ağ varken güncel HTML, yokken önbellek. |
| **Google Fonts ayrı runtime cache'te** | Kurulum listesine konsaydı, kurulum anında ağ sorunu olduğunda `addAll` komple başarısız olur ve service worker hiç kurulmazdı. Runtime cache ilk çevrimiçi ziyarette dolduğu için çevrimdışı deneyim yine tam. |
| **`localStorage`, IndexedDB değil** | Saklanan veri tek bir küçük nesne (kategori + arama metni). IndexedDB'nin asenkron API'si bu boyutta sadece karmaşıklık ekler. |
| **Kaydetme debounce'lu (250 ms)** | Arama kutusunda her tuş vuruşu `uygula()` çağırıyor; debounce olmadan her harfte diske senkron yazma yapılırdı. |
| **Yedekleme düğmeleri footer'da, sade** | iOS Safari uzun süre açılmayan sitelerin depolamasını silebiliyor, bu yüzden dışa/içe aktarma şart. Ama saklanan veri yalnızca arayüz tercihi olduğu için portfolyonun görsel odağını dağıtmayacak şekilde küçük tutuldu. |
| **`skipWaiting` + `clients.claim()`** | Tek kişilik statik bir sitede iki sekme arasında sürüm uyuşmazlığı riski önemsiz; yeni sürümün ikinci ziyareti beklemeden devreye girmesi daha değerli. |
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

- [ ] **`sw.js` içindeki `CACHE_SURUM`**, statik dosya listesi her
      değiştiğinde elle artırılmalı (`v1` → `v2`). Unutulursa kullanıcılar
      eski sürümü görmeye devam eder. Sürüm atlamayı hatırlatan bir not
      `sw.js` başında duruyor.

## 6. PWA test kontrol listesi

Gerçek iPhone'da her yayından sonra tekrarlanmalı:

- [ ] Ana ekrana eklenince tam ekran (Safari çubuğu yok) açılıyor
- [ ] Uçak modunda açılıp çalışıyor
- [ ] Veri girildikten sonra uygulama kapatılıp açılınca veri duruyor
- [ ] Çentik/home bar içerikle çakışmıyor
- [ ] İkon ana ekranda doğru görünüyor

Masaüstü Chrome'da (localhost, 2026-07-23) doğrulananlar: service worker
kuruluyor ve etkinleşiyor, sunucu kapalıyken sayfa fontlarıyla birlikte
açılıyor, filtre/arama yenilemeden sonra korunuyor, dışa/içe aktarma
çalışıyor. **iOS üzerindeki 5 madde henüz gerçek cihazda test edilmedi.**

## 7. Bilinen buglar

- **Açık bug yok.**

### Çözülmüş

- *(2026-07-22)* Filtrelemeden sonra yukarı kayan kartlar
  `IntersectionObserver`'ı yeniden tetiklemediği için görünmez kalıyordu.
  Çözüm: `uygula()` içinde `requestAnimationFrame` ile ekranda olup henüz
  belirmemiş kartlar elle `visible` işaretleniyor (`home.js`).
