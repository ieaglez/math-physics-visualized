'use strict';
/* ===== 简谐运动 Simple Harmonic Motion ===== */
registerTopic({
  id: 'shm', cat: 'mech', icon: '🪀',
  title: '简谐运动（弹簧振子）', en: 'Simple Harmonic Motion',
  desc: '调节劲度系数 k、质量 m 和振幅 A，观察弹簧振子的往复运动与正弦图象。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '简谐运动（弹簧振子）', en: 'Simple Harmonic Motion (SHM)',
      tagline: '点击播放，上方是弹簧振子的真实运动，下方是位移-时间正弦曲线。',
      formula: 'F = −kx　·　x = A·cos(ωt)　·　ω = √(k/m)　T = 2π√(m/k)',
      explainHTML: `
        <h2>什么是简谐运动 <span class="en">What is SHM</span></h2>
        <p>物体受到的<span class="term">回复力 <span class="en">(restoring force)</span></span>与位移成正比、方向相反时，
        做<span class="term">简谐运动 <span class="en">(simple harmonic motion, SHM)</span></span>：</p>
        <div class="formula">F = −kx <span class="note">（k 为劲度系数 spring constant，负号表示力总指向平衡位置 equilibrium position）</span></div>
        <p>位移随时间按正弦（余弦）规律变化 —— 又一次与三角函数相遇：</p>
        <div class="formula">x(t) = A·cos(ωt + φ)　　ω = <span style="white-space:nowrap">√<span style="border-top:1.5px solid currentColor">k/m</span></span>　　T = <span class="frac"><span>2π</span><span class="den">ω</span></span> = 2π<span style="white-space:nowrap">√<span style="border-top:1.5px solid currentColor">m/k</span></span></div>
        <ul>
          <li><b>振幅 <span class="en">(amplitude)</span></b> A：离开平衡位置的最大距离，由初始条件决定；</li>
          <li><b>周期 <span class="en">(period)</span></b> T：完成一次全振动的时间 —— <b>只由 m 和 k 决定，与振幅无关</b>（等时性 isochronism）；</li>
          <li><b>频率 <span class="en">(frequency)</span></b> f = 1/T，<b>角频率 <span class="en">(angular frequency)</span></b> ω = 2πf。</li>
        </ul>
        <h2>能量视角 <span class="en">Energy View</span></h2>
        <ul>
          <li>平衡位置：速度最大，动能 (kinetic energy) 最大，弹性势能 (elastic PE) 为零；</li>
          <li>最大位移处：速度为零，势能最大；</li>
          <li>总机械能 E = ½kA² 守恒，在动能与势能间来回转化。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 只调大振幅 A，周期 T 变了吗？（等时性！）② 把 m 调大 4 倍，T 变成几倍？（√4 = 2 倍）③ 观察振子经过中间平衡位置时最快、两端瞬间静止 —— 对应正弦曲线最陡和水平的地方。</div>
        <div class="think"><b>思考一下：</b>单摆 (simple pendulum) 在小角度下也是简谐运动，T = 2π√(L/g)。为什么摆钟可以用来计时？荡秋千越荡越高改变的是振幅还是周期？</div>
      `
    });

    const cv = createCanvas(canvasBox, 470);
    const sk = addSlider(panel, { label: '劲度系数 k', en: 'spring constant', min: 2, max: 50, step: 1, value: 12, unit: 'N/m' });
    const sm = addSlider(panel, { label: '质量 m', en: 'mass', min: 0.2, max: 5, step: 0.1, value: 1, unit: 'kg' });
    const sA = addSlider(panel, { label: '振幅 A', en: 'amplitude', min: 0.3, max: 2, step: 0.05, value: 1.4, unit: 'm' });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, { onReset: () => draw() });

    const TSHOW = 12; // 图象窗口（秒）
    function draw() {
      const k = sk.value, m = sm.value, A = sA.value;
      const w = Math.sqrt(k / m), T = 2 * Math.PI / w;
      const t = anim.t % TSHOW;
      const x = A * Math.cos(w * t);            // 位移（m）
      const v = -A * w * Math.sin(w * t);
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

      // —— 上：弹簧振子 ——
      const wallX = 46, eqX = W / 2 + 20, py = 92;
      const scale = (W / 2 - 110) / 2;          // 米 → 像素
      const massX = eqX + x * scale, bs = 30 + m * 5;
      // 墙
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(wallX - 10, py - 58, 10, 110);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath(); ctx.moveTo(wallX - 10, py - 50 + i * 18); ctx.lineTo(wallX - 20, py - 40 + i * 18); ctx.stroke();
      }
      // 地面导轨
      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(wallX, py + bs / 2 + 6); ctx.lineTo(W - 30, py + bs / 2 + 6); ctx.stroke();
      // 平衡位置 & 振幅边界
      ctx.strokeStyle = C.gray; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.4;
      [[eqX, '平衡位置 O'], [eqX - A * scale, '−A'], [eqX + A * scale, '+A']].forEach(([X, lb], i) => {
        ctx.beginPath(); ctx.moveTo(X, py - 56); ctx.lineTo(X, py + bs / 2 + 6); ctx.stroke();
        ctx.fillStyle = i ? C.orange : C.soft; ctx.font = '11.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lb, X, py - 62);
      });
      ctx.setLineDash([]); ctx.textAlign = 'left';
      // 弹簧 + 振子
      drawSpring(ctx, wallX, py, massX - bs / 2, py, { coils: 10, amp: 10 });
      ctx.fillStyle = '#60a5fa'; ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(massX - bs / 2, py - bs / 2, bs, bs, 6); else ctx.rect(massX - bs / 2, py - bs / 2, bs, bs);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#1e3a8a'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('m', massX, py + 4);
      ctx.textAlign = 'left';
      // 回复力箭头（指向平衡位置）
      const F = -k * x;
      if (Math.abs(F) > 0.4) {
        pxArrow(ctx, massX, py - bs / 2 - 12, massX + Math.sign(F) * Math.min(Math.abs(F) * 3, 90), py - bs / 2 - 12,
          { color: C.red, width: 2.6, label: 'F = −kx', labelDy: -6, labelDx: Math.sign(F) > 0 ? 4 : -70 });
      }

      // —— 下:x–t 正弦曲线 ——
      const gT = 190, gB = H - 24, gL = 56, gR = W - 24;
      const GX = tt => gL + (tt / TSHOW) * (gR - gL);
      const GY = xx => (gT + gB) / 2 - (xx / 2.2) * (gB - gT) / 2;
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gL, GY(0)); ctx.lineTo(gR, GY(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gT); ctx.lineTo(gL, gB); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('x/m', gL + 4, gT + 10);
      ctx.fillText('t/s', gR - 18, GY(0) - 6);
      for (let tt = 2; tt <= TSHOW; tt += 2) { ctx.fillText(tt, GX(tt) - 3, GY(0) + 14); }
      // ±A 虚线
      ctx.strokeStyle = '#fde68a'; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(gL, GY(A)); ctx.lineTo(gR, GY(A)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, GY(-A)); ctx.lineTo(gR, GY(-A)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.orange;
      ctx.fillText('+A', gL - 22, GY(A) + 4); ctx.fillText('−A', gL - 22, GY(-A) + 4);
      // 曲线
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let tt = 0; tt <= TSHOW; tt += 0.03) {
        const X = GX(tt), Y = GY(A * Math.cos(w * tt));
        tt === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
      }
      ctx.stroke();
      // 当前点 + 与振子的连线
      ctx.strokeStyle = '#d1d5db'; ctx.setLineDash([4, 5]);
      ctx.beginPath(); ctx.moveTo(massX, py + bs / 2 + 6); ctx.lineTo(GX(t), GY(x)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(GX(t), GY(x), 5.5, 0, Math.PI * 2); ctx.fill();
      // 周期标注
      ctx.strokeStyle = C.green; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(GX(0), gT + 8); ctx.lineTo(GX(Math.min(T, TSHOW)), gT + 8); ctx.stroke();
      ctx.fillStyle = C.green; ctx.font = 'bold 11.5px sans-serif';
      ctx.fillText('一个周期 T = ' + fmtN(T, 2) + ' s', GX(Math.min(T, TSHOW) / 2) - 40, gT + 2);

      const E = 0.5 * k * A * A;
      readout.set(`
        ω = √(k/m) = <b>${fmtN(w,3)} rad/s</b><br>
        周期 T = 2π√(m/k) = <b>${fmtN(T,2)} s</b>　频率 f = <b>${fmtN(1/T,2)} Hz</b><br>
        当前位移 x = <b>${fmtN(x,2)} m</b><br>
        当前速度 v = <b>${fmtN(v,2)} m/s</b>
        ${Math.abs(x) < 0.06 ? '<span class="tag">经过平衡位置：速度最大</span>' : Math.abs(Math.abs(x) - A) < 0.04 ? '<span class="tag">最大位移处：瞬时静止</span>' : ''}<br>
        总机械能 E = ½kA² = <b>${fmtN(E,2)} J</b>（守恒）`);
    }
    [sk, sm, sA].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
