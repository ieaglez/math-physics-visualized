'use strict';
/* ===== 复数与复平面 Complex Numbers ===== */
registerTopic({
  id: 'complex', cat: 'math', icon: '🌌',
  title: '复数与复平面', en: 'Complex Numbers',
  desc: '在复平面上调整 z₁、z₂，看复数乘法的几何本质：模相乘、辐角相加（旋转+缩放）。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '复数与复平面', en: 'Complex Numbers & the Complex Plane',
      tagline: '紫色的 z₁·z₂ 是把 z₁ 旋转 θ₂ 再放大 r₂ 倍 —— 乘法就是“旋转 + 缩放”。',
      formula: 'z = a + bi　·　|z| = √(a²+b²)　·　z₁z₂：模相乘 r₁r₂，辐角相加 θ₁+θ₂',
      explainHTML: `
        <h2>什么是复数 <span class="en">What are Complex Numbers</span></h2>
        <p>为了让 x² = −1 有解，引入<span class="term">虚数单位 <span class="en">(imaginary unit)</span></span> i，规定 i² = −1。
        形如 z = a + bi 的数叫<span class="term">复数 <span class="en">(complex number)</span></span>，a 是实部 (real part)，b 是虚部 (imaginary part)。</p>
        <div class="formula">z = a + bi ⟷ 复平面上的点 (a, b)　　|z| = √(a² + b²)</div>
        <p>复数与<span class="term">复平面 <span class="en">(complex plane)</span></span>上的点一一对应：横轴是实轴，纵轴是虚轴 —— 复数本质上是“二维的数”。</p>
        <h2>三角形式与乘法 <span class="en">Polar Form & Multiplication</span></h2>
        <div class="formula">z = r(cos θ + i·sin θ)
          <span class="note">r = |z| 是模 (modulus)，θ 是辐角 (argument)</span></div>
        <div class="formula">z₁·z₂ = r₁r₂[cos(θ₁+θ₂) + i·sin(θ₁+θ₂)]
          <span class="note">模相乘、辐角相加 —— 乘一个复数 = 旋转 θ₂ 并缩放 r₂ 倍</span></div>
        <ul>
          <li>乘 i 就是逆时针旋转 90°（i 的模为 1、辐角为 90°）—— 所以 i² = 转 180° = −1，几何上一目了然！</li>
          <li>加法仍服从平行四边形法则（和向量一样）；</li>
          <li><span class="term">共轭复数 <span class="en">(conjugate)</span></span> z̄ = a − bi：关于实轴对称，z·z̄ = |z|²。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 z₂ 设为模 1、辐角 90°（即 z₂ = i），看 z₁·z₂ 正好是 z₁ 逆时针转 90°；② 把 z₂ 辐角调到 180°、模调到 1，乘积正好是 −z₁；③ 让两个辐角之和超过 180°，验证辐角“相加”依然成立。</div>
        <div class="think"><b>思考一下：</b>如果 z 的模是 1，那么 z, z², z³, … 在复平面上画出什么图形？（提示：单位圆上的旋转）</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const sr1 = addSlider(panel, { label: '|z₁| 模', en: 'modulus', min: 0.3, max: 3, step: 0.1, value: 2 });
    const st1 = addSlider(panel, { label: 'z₁ 辐角 θ₁', en: 'argument', min: 0, max: 360, step: 1, value: 30, unit: '°' });
    const sr2 = addSlider(panel, { label: '|z₂| 模', en: 'modulus', min: 0.3, max: 3, step: 0.1, value: 1.4 });
    const st2 = addSlider(panel, { label: 'z₂ 辐角 θ₂', en: 'argument', min: 0, max: 360, step: 1, value: 60, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const r1 = sr1.value, t1 = st1.value * DEG, r2 = sr2.value, t2 = st2.value * DEG;
      const z1 = [r1 * Math.cos(t1), r1 * Math.sin(t1)];
      const z2 = [r2 * Math.cos(t2), r2 * Math.sin(t2)];
      const zp = [z1[0] * z2[0] - z1[1] * z2[1], z1[0] * z2[1] + z1[1] * z2[0]];
      const zs = [z1[0] + z2[0], z1[1] + z2[1]];
      const M = Math.max(3.2, Math.abs(zp[0]) + 0.5, Math.abs(zp[1]) + 0.5, Math.abs(zs[0]) + 0.5, Math.abs(zs[1]) + 0.5);
      const plot = new Plot(cv, { xmin: -M, xmax: M, ymin: -M * 0.8, ymax: M * 0.8, equal: true });
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ xLabel: 'Re', yLabel: 'Im', tickX: 1 });
      const { ctx } = cv;
      // 单位圆
      ctx.save();
      ctx.strokeStyle = '#e3e5f2'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(1) - plot.X(0)), 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      // 和（虚线平行四边形）
      plot.seg(z1[0], z1[1], zs[0], zs[1], { color: '#cfd3ea', width: 1.4, dash: [5, 5] });
      plot.seg(z2[0], z2[1], zs[0], zs[1], { color: '#cfd3ea', width: 1.4, dash: [5, 5] });
      plot.arrow(0, 0, zs[0], zs[1], { color: C.gray, width: 1.8, label: 'z₁+z₂', labelDy: -6 });
      // z1, z2, 积
      plot.arrow(0, 0, z1[0], z1[1], { color: C.blue, width: 3, label: 'z₁' });
      plot.arrow(0, 0, z2[0], z2[1], { color: C.red, width: 3, label: 'z₂' });
      plot.arrow(0, 0, zp[0], zp[1], { color: C.purple, width: 3.5, label: 'z₁·z₂' });
      // 辐角弧
      ctx.save();
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), 30, 0, -(t1 + t2), true); ctx.stroke();
      ctx.restore();
      const fmtZ = z => `${fmtN(z[0],2)} ${z[1] >= 0 ? '+' : '−'} ${fmtN(Math.abs(z[1]),2)}i`;
      const argP = ((st1.value + st2.value) % 360);
      readout.set(`
        z₁ = <b>${fmtZ(z1)}</b><br>
        z₂ = <b>${fmtZ(z2)}</b><br>
        z₁ + z₂ = <b>${fmtZ(zs)}</b>（平行四边形法则）<br>
        z₁ · z₂ = <b style="color:${C.purple}">${fmtZ(zp)}</b><br>
        |z₁z₂| = r₁r₂ = <b>${fmtN(r1*r2,3)}</b> ✓<br>
        arg(z₁z₂) = θ₁+θ₂ = <b>${fmtN(argP,0)}°</b> ✓
        ${Math.abs(r2 - 1) < 0.05 && Math.abs(st2.value - 90) < 2 ? '<br><span class="tag">z₂ ≈ i：乘 i = 逆时针转 90°！</span>' : ''}`);
    }
    [sr1, st1, sr2, st2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
