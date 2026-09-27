/* SAHNE 5 — BAŞKA ÇEMBER (64–80 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 64, end: 80, name: 'Another circle', nameTr: 'Başka çember', concept: '60 cm around', conceptTr: '60 cm çember', render });
})(window.LI = window.LI || {});
