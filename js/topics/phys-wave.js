'use strict';
/* ===== 机械波 Mechanical Waves ===== */
registerTopic({
  id: 'wave', cat: 'mech', icon: '🌊',
  title: '机械波', en: 'Mechanical Waves',
  desc: L('调节振幅、频率、波长，观察横波的传播 —— 注意红色质点只上下振动，并不随波前进。',
          'Adjust amplitude, frequency and speed — and notice the red particle only bobs up and down; it never travels with the wave.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '机械波（横波）', en: 'Mechanical Waves (Transverse)',
      tagline: L('波形向右传播，但红色质点只在原地上下振动 —— 波传播的是振动形式和能量，不是物质。',
                 'The waveform travels right, but the red particle only oscillates in place — a wave carries motion and energy, not matter.'),
      formula: 'v = λf = <span class="frac"><span>λ</span><span class="den">T</span></span>　·　y = A·sin 2π(<span class="frac"><span>t</span><span class="den">T</span></span> − <span class="frac"><span>x</span><span class="den">λ</span></span>)',
      explainHTML: L(`
        <h2>什么是机械波 <span class="en">What is a Mechanical Wave</span></h2>
        <p>振动在介质中的传播叫<span class="term">机械波 <span class="en">(mechanical wave)</span></span>。关键认识：</p>
        <ul>
          <li><b>质点不随波迁移</b>：每个质点只在自己的平衡位置附近振动（盯住红点！），传走的是<b>振动形式和能量</b>；</li>
          <li><span class="term">横波 <span class="en">(transverse wave)</span></span>：振动方向 ⊥ 传播方向（如绳波、光波）—— 有波峰 (crest) 和波谷 (trough)；</li>
          <li><span class="term">纵波 <span class="en">(longitudinal wave)</span></span>：振动方向 ∥ 传播方向（如声波）—— 有密部和疏部。</li>
        </ul>
        <h2>描述波的物理量 <span class="en">Wave Quantities</span></h2>
        <div class="formula">v = λf
          <span class="note">波速 v 由介质决定；频率 f 由波源决定；波长 λ = v/f 是两者"协商"的结果</span></div>
        <ul>
          <li><span class="term">波长 <span class="en">(wavelength)</span></span> λ：相邻两个波峰的距离，也是一个周期内波传播的距离；</li>
          <li><span class="term">振幅 <span class="en">(amplitude)</span></span> A：质点离开平衡位置的最大距离，决定波的能量；</li>
          <li>周期 T 与频率 f：质点完成一次全振动的时间，f = 1/T。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 增大频率 f：波速不变（由介质决定），波长被"压短"—— 验证 λ = v/f；② 盯住红色质点数它振动的节奏，再看波形移动 —— 两者完全不同步调；③ 注意波峰正下方的质点速度为零，平衡位置处的质点速度最大。</div>
        <div class="think"><b>思考一下：</b>声音从空气传入水中，频率不变（由声源决定），波速变大约 4 倍 —— 波长怎么变？</div>
      `, `
        <h2>What Is a Mechanical Wave <span class="en">什么是机械波</span></h2>
        <p>A vibration propagating through a medium is a <span class="term">mechanical wave <span class="en">(机械波)</span></span>. The key insights:</p>
        <ul>
          <li><b>Particles don't travel with the wave</b>: each one oscillates about its own equilibrium (watch the red dot!) — what propagates is the <b>pattern of motion and its energy</b>;</li>
          <li><span class="term">Transverse wave <span class="en">(横波)</span></span>: oscillation ⊥ propagation (rope waves, light) — it has crests (波峰) and troughs (波谷);</li>
          <li><span class="term">Longitudinal wave <span class="en">(纵波)</span></span>: oscillation ∥ propagation (sound) — with compressions and rarefactions.</li>
        </ul>
        <h2>Wave Quantities <span class="en">描述波的物理量</span></h2>
        <div class="formula">v = λf
          <span class="note">Speed v is set by the medium; frequency f by the source; wavelength λ = v/f is their "negotiated" result</span></div>
        <ul>
          <li><span class="term">Wavelength <span class="en">(波长)</span></span> λ: crest-to-crest distance — also how far the wave travels in one period;</li>
          <li><span class="term">Amplitude <span class="en">(振幅)</span></span> A: a particle's maximum displacement, which sets the wave's energy;</li>
          <li>Period T and frequency f: one full oscillation of a particle, f = 1/T.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Raise the frequency f: the speed can't change (it belongs to the medium), so the wavelength gets squeezed — verifying λ = v/f; ② Watch the red particle's rhythm, then the waveform's march — completely different motions; ③ Note that particles under a crest are momentarily at rest while those at equilibrium move fastest.</div>
        <div class="think"><b>Think about it:</b> Sound passes from air into water: the frequency stays (set by the source) but the speed roughly quadruples — what happens to the wavelength?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 420);
    const sA = addSlider(panel, { label: L('振幅 A', 'Amplitude A'), en: L('amplitude', '振幅'), min: 0.3, max: 1.6, step: 0.05, value: 1 , unit: 'm'});
    const sf = addSlider(panel, { label: L('频率 f', 'Frequency f'), en: L('frequency', '频率'), min: 0.2, max: 1.5, step: 0.05, value: 0.5, unit: 'Hz' });
    const sv = addSlider(panel, { label: L('波速 v（介质决定）', 'Wave speed v (set by medium)'), en: L('wave speed', '波速'), min: 1, max: 6, step: 0.25, value: 3, unit: 'm/s' });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, { onReset: () => draw() });
    anim.start();

    function draw() {
      const A = sA.value, f = sf.value, v = sv.value;
      const lam = v / f, T = 1 / f, t = anim.t;
      const yOf = (x, tt) => A * Math.sin(2 * Math.PI * (tt / T - x / lam));
      const plot = new Plot(cv, { xmin: 0, xmax: 16, ymin: -2.6, ymax: 2.6, padL: 30, padB: 24 });
      plot.clear('#fff');
      plot.grid(2, 1);
      plot.axes({ xLabel: 'x/m', yLabel: 'y/m', tickX: 2, tickY: 1 });
      const { ctx } = cv;
      // 波形
      plot.fn(x => yOf(x, t), { color: C.blue, width: 3 });
      // 一个波长标注
      const x0 = lam * (Math.ceil(2 / lam) + 0.25 - ((t / T) % 1)); // 跟随波峰
      const xpk = x0 < 0 ? x0 + lam : x0;
      plot.seg(xpk, A + 0.55, xpk + lam, A + 0.55, { color: C.orange, width: 2 });
      plot.dot(xpk, A + 0.55, { color: C.orange, r: 2.5 });
      plot.dot(xpk + lam, A + 0.55, { color: C.orange, r: 2.5 });
      plot.text(xpk + lam / 2, A + 0.55, 'λ = ' + fmtN(lam, 2) + ' m', { color: C.orange, dy: -8, align: 'center', font: 'bold 12.5px sans-serif' });
      // 介质质点（黑点阵）+ 红色示踪质点
      for (let x = 0.5; x <= 15.6; x += 0.75) {
        plot.dot(x, yOf(x, t), { color: '#94a3b8', r: 3 });
      }
      const xr = 6;
      plot.seg(xr, -2.2, xr, 2.2, { color: '#fecaca', width: 1.4, dash: [4, 4] });
      const yr = yOf(xr, t);
      plot.dot(xr, yr, { color: C.red, r: 7, stroke: '#fff', label: L('盯住我!', 'watch me!'), labelDx: 10 });
      // 质点振动方向小箭头
      const vy = Math.cos(2 * Math.PI * (t / T - xr / lam)) ; // 正负
      if (Math.abs(vy) > 0.15) {
        pxArrow(ctx, plot.X(xr) - 18, plot.Y(yr), plot.X(xr) - 18, plot.Y(yr) - Math.sign(vy) * 26,
          { color: C.red, width: 2 });
      }
      // 传播方向
      pxArrow(ctx, plot.X(11.5), plot.Y(2.15), plot.X(14), plot.Y(2.15), { color: C.green, width: 2.6, label: L('波速 v', 'speed v'), labelDx: -54, labelDy: -8 });
      readout.set(L(`
        波长 λ = v/f = <b>${fmtN(lam,2)} m</b><br>
        周期 T = 1/f = <b>${fmtN(T,2)} s</b><br>
        验证：λf = ${fmtN(lam,2)} × ${fmtN(f,2)} = <b>${fmtN(lam*f,2)} m/s</b> = v ✓<br>
        红色质点位移 y = <b>${fmtN(yOf(xr, t),2)} m</b><br>
        <span class="tag">质点原地振动，波形向右跑</span>`, `
        Wavelength λ = v/f = <b>${fmtN(lam,2)} m</b><br>
        Period T = 1/f = <b>${fmtN(T,2)} s</b><br>
        Check: λf = ${fmtN(lam,2)} × ${fmtN(f,2)} = <b>${fmtN(lam*f,2)} m/s</b> = v ✓<br>
        Red particle's displacement y = <b>${fmtN(yOf(xr, t),2)} m</b><br>
        <span class="tag">particles oscillate in place; the waveform travels</span>`));
    }
    [sA, sf, sv].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
