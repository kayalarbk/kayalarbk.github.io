# SPEC — Barış Kaya Portfolyo Sitesi

Bu dosya projenin **ne olduğunu ve ne olmadığını** tanımlar. Kapsam
değişikliği burada güncellenir; ilerleme kaydı [PROGRESS.md](PROGRESS.md)
içinde tutulur.

---

## 1. Amaç

`https://kayalarbk.github.io` adresinde yayınlanan kişisel portfolyo sitesi.
İki işi yapar:

1. GitHub'daki projeleri **aranabilir ve kategoriye göre filtrelenebilir**
   bir kart listesinde toplar.
2. Ziyaretçiye kim olduğumu, yeteneklerimi ve iletişim bilgilerimi anlatır.

Hedef kitle: işveren, staj başvurusu inceleyen kişi, kulüp/ekip arkadaşı.

---

## 2. Kapsam

### Dahil

- **Ana sayfa (`index.html`)** — hero, hakkımda bandı, arama kutusu,
  kategori filtreleri, proje kartı ızgarası.
- **Hakkımda sayfası (`hakkimda.html`)** — profil, yetenekler, deneyim
  zaman çizelgesi, iletişim.
- Proje verisinin tek bir JS dosyasında (`assets/js/projects.data.js`)
  veri olarak durması; HTML'in elle düzenlenmemesi.
- Türkçe arayüz ve Türkçe karakterlere duyarlı arama.
- Karanlık tema, responsive tasarım, klavye erişilebilirliği.

### Dahil değil (bilinçli olarak)

- Build adımı, paket yöneticisi, framework (React/Vue vb.).
- Sunucu tarafı kod, veritabanı, form gönderimi.
- Çoklu dil desteği.
- Açık tema / tema değiştirici.
- GitHub API ile projelerin canlı çekilmesi (ileride değerlendirilebilir,
  bkz. PROGRESS.md → TODO).

---

## 3. Teknik kısıtlar

| Kısıt | Değer |
|---|---|
| Yayın ortamı | GitHub Pages (`kayalarbk/kayalarbk.github.io`, `main` dalı) |
| Teknoloji | Statik HTML + CSS + vanilla JavaScript (ES6+) |
| Bağımlılık | Yalnızca Google Fonts (Poppins). Başka CDN/kütüphane yok. |
| Giriş noktası | Depo kökündeki `index.html` |
| Tarayıcı hedefi | Güncel Chrome / Firefox / Safari / Edge |
| Dil | Arayüz metinleri ve kod yorumları Türkçe |

---

## 4. Fonksiyonel gereksinimler

| # | Gereksinim |
|---|---|
| F1 | Projeler `PROJELER` dizisinden okunur; DOM'a JS ile basılır. |
| F2 | Kategori filtresi tek seçimlidir, buton üzerinde proje sayısı gösterilir. |
| F3 | Arama; başlık, açıklama ve kategori metninde geçer, Türkçe karakter duyarsızdır. |
| F4 | Sonuç sayısı canlı bölge (`aria-live`) ile bildirilir. |
| F5 | Sonuç yoksa boş-durum mesajı gösterilir. |
| F6 | Her kart: proje sitesi + GitHub deposu bağlantısı içerir. Sitesi yoksa (`yok: true`) yalnızca depo bağlantısı. |
| F7 | `/` tuşu arama kutusuna odaklanır, `Esc` aramayı temizler. |
| F8 | JavaScript kapalıysa `<noscript>` ile GitHub profiline yönlendirilir. |
| F9 | Telif yılı otomatik güncellenir. |

## 5. Fonksiyonel olmayan gereksinimler

| # | Gereksinim |
|---|---|
| N1 | Erişilebilirlik: skip-link, görünür focus halkası, `aria-pressed` / `aria-live`, anlamlı HTML. |
| N2 | `prefers-reduced-motion` açıkken tüm animasyonlar kapanır. |
| N3 | 600px altında tek sütun; tüm bileşenler dokunmatik uyumlu. |
| N4 | SEO/paylaşım: `description`, `canonical`, Open Graph, Twitter card etiketleri. |
| N5 | İçerik eklemek için tek bir veri dosyasına dokunmak yeterli olmalı. |

---

## 6. Tanımlı "bitti" ölçütü

Bir iş, ancak şu üçü tamamlandığında bitmiş sayılır:

1. Kod çalışıyor ve tarayıcıda doğrulandı,
2. `PROGRESS.md` güncellendi,
3. Değişiklik commit'lenip `origin/main`'e push'landı.
