/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Merkez açı ve gördüğü yay', en: 'A central angle and its arc',
      note: 'Köşesi çemberin merkezinde olan açıya merkez açı denir. Açının kolları arasında kalan çember parçası, bu açının gördüğü yaydır.' },
    { scene: 2, start: 10.8, end: 19.4, tr: 'Çember 36 cm: 360° tümü, 180° yarısı', en: 'Circle 36 cm: 360° all, 180° half',
      note: 'Çapı 12 santimetre olan bir çember alalım. Pi yerine 3 kullanırsak çember uzunluğu 36 santimetre. 360 derecelik açı çemberin tamamını görür: 36 santimetre. 180 derece yarısını: 18 santimetre.' },
    { scene: 2, start: 19.8, end: 27.8, tr: '90°: çeyrek çember, 9 cm', en: '90°: a quarter circle, 9 cm',
      note: '90 derece çemberin dörtte birini görür: 9 santimetre.' },
    { scene: 3, start: 28.6, end: 39.8, tr: '60° → 6 cm, 30° → 3 cm, 10° → 1 cm', en: '60° → 6 cm, 30° → 3 cm, 10° → 1 cm',
      note: 'Bir tablo yapalım ve açıyı küçültelim: 60 derece 6 santimetre, 30 derece 3 santimetre, 10 derece 1 santimetre.' },
    { scene: 3, start: 40.2, end: 45.8, tr: 'Açı yarıya inince yay da yarıya iner', en: 'Halve the angle, halve the arc',
      note: 'Örüntüyü görüyor musun? Açı yarıya inince yay da yarıya iniyor. Bu çemberde her 10 derece için yay 1 santimetre.' },
    { scene: 4, start: 46.6, end: 55.0, tr: 'Yay = çember uzunluğu × açı ÷ 360', en: 'Arc = circumference × angle ÷ 360',
      note: 'Genelleyelim: yay uzunluğu, çember uzunluğunun açı bölü 360 kadarıdır. 120 derece için 36 çarpı 120 bölü 360, 12 santimetre.' },
    { scene: 4, start: 55.4, end: 63.8, tr: 'Açı kaç kat, yay o kadar kat', en: 'The arc grows with the angle',
      note: 'Merkez açı kaç katına çıkarsa, gördüğü yay da o kadar katına çıkar.' },
    { scene: 5, start: 64.6, end: 71.0, tr: 'Çap 20 cm: 90° → 15 cm', en: '20 cm across: 90° → 15 cm',
      note: 'Başka bir çemberde deneyelim: çapı 20 santimetre, uzunluğu 60 santimetre. 90 derece için 60 çarpı 90 bölü 360, 15 santimetre.' },
    { scene: 5, start: 71.4, end: 79.8, tr: '45° → 7,5 cm: kural geçerli', en: '45° → 7.5 cm: the rule holds',
      note: 'Açıyı yarıya indirelim, 45 derece: yay da yarıya iner, 7,5 santimetre. Genelleme bu çemberde de geçerli.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Merkez açı büyüdükçe yay büyür', en: 'A bigger angle sees a longer arc',
      note: 'Aklında kalsın: merkez açı kaç katına çıkarsa gördüğü yay da o kadar katına çıkar.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Yay = çember × açı ÷ 360!', en: 'Arc = circle × angle ÷ 360!',
      note: 'Yay uzunluğu, çember uzunluğu çarpı açı bölü 360!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
