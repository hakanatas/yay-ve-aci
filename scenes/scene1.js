/* SAHNE 1 — MERKEZ AÇI (0–10 s)  A central angle opens and sees an arc.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, inOut, lerp } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const fmt = (x) => (Math.round(x * 10) / 10).toString().replace('.', ',');

  /** the central angle over time */
  const KEYS = [[4.8, 60, 2.2], [10.8, 360, 1.8], [15.2, 180, 1.2], [19.6, 90, 1.0], [32.0, 60, 0.8], [34.4, 30, 0.8], [36.8, 10, 0.8], [46.8, 120, 1.2]];
  function ang(t) { let v = 0; KEYS.forEach(([t0, x, d]) => { const k = inOut(seg(t, t0, t0 + d)); if (k > 0) v = lerp(v, x, k); }); return v; }

  /** a circle with a central angle of deg (from 0°, counter-clockwise), its arc and labels; cm = circumference */
  function sector(ctx, G, O, r, deg, cm, a, seed, o = {}) {
    const f = F(); if (a <= 0) return;
    f.circle(ctx, O, r, o.k ?? 1, a, seed, { w: 5 });
    Ink.dot(ctx, O[0], O[1], 6, { seed: seed + 1, alpha: a });
    if (deg <= 0.5) return;
    A.wedge(ctx, O, r, 0, deg, 0.16 * a);
    A.arc(ctx, O, r, 0, deg, { alpha: a, w: 11, seed: seed + 2 });
    [0, deg].forEach((d, i) => { if (deg >= 359.5 && i) return; Ink.path(ctx, [O, A.at(O, d, r)], { w: 4, alpha: a, seed: seed + 3 + i, taper: [0, 0] }); });
    const mid = deg / 2, sz = o.s ?? G.s;
    if (deg < 359.5) { A.arc(ctx, O, r * 0.22, 0, deg, { alpha: a * 0.9, w: 4, seed: seed + 6 }); const p = A.at(O, mid, r * 0.22 + 30 + (deg < 40 ? 20 : 0)); f.T(ctx, `${Math.round(deg)}°`, p[0], p[1], Object.assign({ size: sz * 0.7, alpha: a, halo: true }, f.AMB)); }
    const q = A.at(O, deg >= 359.5 ? 45 : mid, r + 52);
    f.T(ctx, `${fmt(cm * deg / 360)} cm`, q[0], q[1], Object.assign({ size: sz * 0.8, alpha: a, halo: true }, f.AMB));
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Merkez açı ve gördüğü yay'],
      [10.6, 27.8, 'Farklı merkez açıların yaylarını gözlemleyelim'],
      [28.4, 45.8, 'Bir tablo yapalım: örüntü var mı?'],
      [46.4, 63.8, 'Genelleyelim'],
      [64.4, 79.8, 'Başka bir çemberde deneyelim'],
    ]);
  }

  function main(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = END(t) * (1 - seg(t, 63.8, 64.4)); if (a <= 0 || t > 64.4) return;
    sector(ctx, G, G.O, G.r, ang(t), 36, a * seg(t, 4.2, 4.8), 3000, { k: seg(t, 4.2, 4.8) });
    const oa = seg(t, 4.8, 5.2) * a; f.T(ctx, 'O', G.O[0] - 22, G.O[1] + 26, { size: G.s * 0.7, alpha: oa });
    // the table
    const ta = win(t, 28.6, 63.8) * a, TB = L.TB;
    if (ta > 0) {
      f.T(ctx, 'Merkez açı', TB.x[0], TB.y[0], { size: TB.s * 0.8, alpha: ta }); f.T(ctx, 'Yay', TB.x[1], TB.y[0], { size: TB.s * 0.8, alpha: ta });
      Ink.path(ctx, [[TB.x[0] - 110, TB.y[0] + TB.s * 0.7], [TB.x[1] + 90, TB.y[0] + TB.s * 0.7]], { w: 3, alpha: ta * 0.6, seed: 3050, taper: [0, 0] });
      [[360, 29.4], [180, 30.2], [90, 31.0], [60, 32.8], [30, 35.2], [10, 37.6]].forEach(([d, t0], i) => {
        const k = seg(t, t0, t0 + 0.4) * ta; if (k <= 0) return;
        f.T(ctx, `${d}°`, TB.x[0], TB.y[i + 1], { size: TB.s, alpha: k });
        f.T(ctx, `${fmt(d / 10)} cm`, TB.x[1], TB.y[i + 1], Object.assign({ size: TB.s, alpha: k }, f.AMB));
      });
      const hk = win(t, 40.4, 45.8) * ta;
      if (hk > 0) [[1, 2], [2, 3]].forEach(([i, j], n) => { const x = TB.x[1] + 90, y0 = TB.y[i], y1 = TB.y[j]; Ink.path(ctx, [[x, y0], [x + 22, (y0 + y1) / 2], [x, y1]], { w: 3, alpha: hk, color: LI.AMBER_RGB, seed: 3060 + n, taper: [0, 0] }); f.T(ctx, '÷ 2', x + 30, (y0 + y1) / 2, Object.assign({ size: TB.s * 0.62, alpha: hk, align: 'left' }, f.AMB)); });
    }
  }

  function two(ctx, env, t) {
    const L = KD.L(env), G = L.G, W2 = L.TW, a = win(t, 64.4, 79.8) * END(t); if (a <= 0) return;
    const f = F();
    const d2 = t < 72.0 ? 90 : lerp(90, 45, inOut(seg(t, 72.0, 73.0)));
    sector(ctx, G, W2.O[0], W2.r[0], 90 * seg(t, 64.8, 65.8), 36, a * seg(t, 64.4, 64.8), 3100, { s: G.s * 0.85 });
    sector(ctx, G, W2.O[1], W2.r[1], d2 * seg(t, 66.2, 67.2), 60, a * seg(t, 65.8, 66.2), 3120, { s: G.s * 0.85 });
    f.T(ctx, 'çap 12 cm · 36 cm', W2.O[0][0], W2.O[0][1] + W2.r[0] + 40, { size: G.s * 0.62, alpha: a });
    f.T(ctx, 'çap 20 cm · 60 cm', W2.O[1][0], W2.O[1][1] + W2.r[1] + 40, { size: G.s * 0.62, alpha: a * seg(t, 65.8, 66.2) });
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Köşesi merkezde olan açı: merkez açı'], [11.2, 27.8, 'Çap 12 cm, π yerine 3: çember 3 × 12 = 36 cm'],
      [29.4, 45.8, 'Açı yarıya inince yay da yarıya iniyor'], [47.4, 63.8, 'Yay = çember uzunluğu × açı ÷ 360'],
      [65.0, 79.8, 'Çap 20 cm: çember 3 × 20 = 60 cm']]);
    exprs(ctx, t, at(W, 1), [[15.6, 27.8, '360° tam çember: 36 cm · 180° yarım: 18 cm'], [40.4, 45.8, 'Her 10° için 1 cm: yay, açıyla orantılı', true],
      [51.4, 63.8, '120° için: 36 × 120 ÷ 360 = 12 cm'], [67.4, 79.8, '90°: 60 × 90 ÷ 360 = 15 cm · 45°: 7,5 cm']]);
    exprs(ctx, t, at(W, 2), [[20.0, 27.8, '90° çeyrek çember: 9 cm', true], [55.4, 63.8, 'Açı kaç katına çıkarsa yay da o kadar katına çıkar', true],
      [71.4, 79.8, 'Kural bu çemberde de geçerli', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Merkez açı büyüdükçe yay da büyür', 80.6], ['Açı 2 katı olursa yay da 2 katı', 81.6], ['360° tüm çember, 180° yarısı, 90° çeyreği', 82.6], ['Yay = çember uzunluğu × açı ÷ 360', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); main(ctx, env, t); two(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A central angle', nameTr: 'Merkez açı', concept: 'An angle at the centre', conceptTr: 'Köşesi merkezde', render });
})(window.LI = window.LI || {});
