/* ============================================================
   projects.data.js — PROJE LİSTESİ
   Site içeriğini düzenlemek için tek dokunulması gereken dosya.

   Yeni proje eklemek:  listeye bir satır ekle.
   Proje kaldırmak:     o satırı sil (veya başına // koy).

   Alanlar:
     repo  → GitHub depo adı. Site ve repo linkleri bundan üretilir:
               site: https://kayalarbk.github.io/<repo>/
               repo: https://github.com/kayalarbk/<repo>
     ad    → kartta görünecek başlık
     acik  → kısa açıklama
     kat   → kategori. Sadece KATEGORILER içindeki değerlerden biri olmalı.
     site  → (isteğe bağlı) GitHub Pages dışında bir adres varsa yaz
     yok   → (isteğe bağlı) yayında site yoksa  yok: true  yaz,
             kartta yalnızca GitHub bağlantısı gösterilir
   ============================================================ */

const KULLANICI = 'kayalarbk';

// Filtre çubuğundaki sıra
const KATEGORILER = ['Mühendislik', 'Eğitim', 'Araçlar', 'Kişisel'];

const PROJELER = [
    { repo: 'MarmaraMPDS',     ad: 'MarmaraMPDS',     kat: 'Mühendislik', acik: 'Marmara Project Developer Society kulübü için resmi web sitesi ve üye koordinasyon yapısı.' },
    { repo: 'teknofest',       ad: 'teknofest',       kat: 'Mühendislik', acik: 'Teknofest yarışmaları için geliştirilen proje tanıtım ve detay sayfası.' },
    // Böyle bir depo GitHub'da bulunamadı; oluşturunca başındaki // işaretini kaldır:
    // { repo: 'Drone_project_c', ad: 'Drone_project_c', kat: 'Mühendislik', acik: 'Otonom drone ve robotik uçuş platformları için Ar-Ge dokümantasyonu.' },

    { repo: 'Ders-defteri',    ad: 'Ders-defteri',    kat: 'Eğitim',      acik: 'Mühendislik bölümü, devre analizi ve fizik gibi çekirdek dersler için not derlemeleri.' },
    { repo: 'DailyEnglish',    ad: 'DailyEnglish',    kat: 'Eğitim',      acik: 'Günlük İngilizce pratikleri ve kelime çalışmaları için web arayüzü.' },
    // GitHub Pages kapalı olduğu için yalnızca depo bağlantısı gösteriliyor:
    { repo: 'Myenglishday',    ad: 'Myenglishday',    kat: 'Eğitim',      acik: 'İngilizce öğrenim sürecini destekleyen interaktif platform.', yok: true },
    { repo: 'Ganohesaplama',   ad: 'Ganohesaplama',   kat: 'Eğitim',      acik: 'Öğrenciler için pratik ve hızlı akademik ortalama hesaplama aracı.' },

    { repo: 'cevirim',         ad: 'cevirim',         kat: 'Araçlar',     acik: 'Hızlı metin işlemleri ve dil çevirileri için geliştirilmiş uygulama sayfası.' },
    { repo: 'kolaj-yapici',    ad: 'kolaj-yapici',    kat: 'Araçlar',     acik: 'Görselleri birleştirip web üzerinden kolaj oluşturmaya yarayan araç.' },
    { repo: 'SigarayiBirak',   ad: 'SigarayiBirak',   kat: 'Araçlar',     acik: 'Sigarayı bırakma sürecini takip eden uygulama.' },
    { repo: 'Creditfollow',    ad: 'Creditfollow',    kat: 'Araçlar',     acik: 'Kredi, bütçe ve finansal verileri takip etmek için oluşturulan gösterge paneli.' },

    { repo: 'AniKutumuz',      ad: 'AniKutumuz',      kat: 'Kişisel',     acik: 'Anıları saklamak ve sergilemek için geliştirilmiş dijital galeri projesi.' },
    { repo: 'Balkanturu',      ad: 'Balkanturu',      kat: 'Kişisel',     acik: 'Balkan seyahati rotaları, anıları ve gezi rehberi.' },
    { repo: 'duruilederin',    ad: 'duruilederin',    kat: 'Kişisel',     acik: 'Derin için hazırlanan özel arayüz tasarımı.' },
    { repo: 'Gift',            ad: 'Gift',            kat: 'Kişisel',     acik: 'Özel günler için tasarlanmış, sürpriz odaklı interaktif hediye sayfası.' },
];
