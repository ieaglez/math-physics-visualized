'use strict';
/* ===== 库仑定律与电场 Coulomb's Law & Electric Field ===== */
registerTopic({
  id: 'coulomb', cat: 'optics', icon: '⚡',
  title: '库仑定律与电场', en: "Coulomb's Law & E-Field",
  desc: L('改变两个点电荷的电量与距离，观察静电力和周围电场的分布。',
          'Change two point charges and their separation; watch the electrostatic force and the surrounding field pattern.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '库仑定律与电场', en: "Coulomb's Law & Electric Field",
      tagline: L('背景的小箭头是电场方向，把电荷改成同号/异号，场的形状完全不同。',
                 'The background arrows show the field direction — like vs. unlike charges give completely different patterns.'),
      formula: 'F = k<span class="frac"><span>q₁q₂</span><span class="den">r²</span></span>　·　E = <span class="frac"><span>F</span><span class="den">q</span></span>　·　k = 9.0×10⁹ N·m²/C²',
      explainHTML: L(`
        <h2>库仑定律 <span class="en">Coulomb's Law</span></h2>
        <p>真空中两个<span class="term">点电荷 <span class="en">(point charges)</span></span>之间的静电力：</p>
        <div class="formula">F = k<span class="frac"><span>q₁q₂</span><span class="den">r<sup>2</sup></span></span>
          <span class="note">k = 9.0 × 10⁹ N·m²/C²（静电力常量 Coulomb constant）</span></div>
        <ul>
          <li><b>同号相斥，异号相吸</b> (like charges repel, opposites attract)；</li>
          <li>与距离的<b>平方成反比</b> (inverse-square law) —— 和万有引力同样的数学形式！距离加倍，力变为 1/4；</li>
          <li>两个电荷受到的力大小相等、方向相反（牛顿第三定律 Newton's third law）。</li>
        </ul>
        <h2>电场 <span class="en">Electric Field</span></h2>
        <p>电荷周围存在<span class="term">电场 <span class="en">(electric field)</span></span>，它是传递电相互作用的媒介。
        <span class="term">电场强度 <span class="en">(field strength)</span></span>定义为单位正电荷受到的力：</p>
        <div class="formula"><b>E</b> = <span class="frac"><span><b>F</b></span><span class="den">q</span></span>　　点电荷的场：E = k<span class="frac"><span>Q</span><span class="den">r<sup>2</sup></span></span></div>
        <ul>
          <li>方向：正电荷向外发散，负电荷向内汇聚（看背景箭头）；</li>
          <li>多个电荷的场满足<b>叠加原理 (superposition)</b>：矢量相加；</li>
          <li>异号电荷对（<span class="term">电偶极子 <span class="en">(dipole)</span></span>）的场从正电荷“流向”负电荷。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把距离 r 从 2 m 调到 4 m，力变成原来的几分之一？（验证平方反比）② 把 q₂ 从 +3 改成 −3，箭头方向如何变化？背景电场呢？③ 把一个电荷调到 0，剩下的就是单个点电荷的辐射状电场。</div>
        <div class="think"><b>思考一下：</b>万有引力 F = Gm₁m₂/r² 和库仑力数学形式一样，但为什么我们感觉不到身边物体之间的电力，却能感觉到地球的引力？（提示：物质通常电中性，正负抵消。）</div>
      `, `
        <h2>Coulomb's Law <span class="en">库仑定律</span></h2>
        <p>The electrostatic force between two <span class="term">point charges <span class="en">(点电荷)</span></span> in vacuum:</p>
        <div class="formula">F = k<span class="frac"><span>q₁q₂</span><span class="den">r<sup>2</sup></span></span>
          <span class="note">k = 9.0 × 10⁹ N·m²/C² (the Coulomb constant 静电力常量)</span></div>
        <ul>
          <li><b>Like charges repel, opposites attract</b> (同号相斥，异号相吸);</li>
          <li>An <b>inverse-square law</b> (平方反比) — the same mathematical form as gravity! Double the distance, quarter the force;</li>
          <li>The two charges feel equal and opposite forces (Newton's third law 牛顿第三定律).</li>
        </ul>
        <h2>The Electric Field <span class="en">电场</span></h2>
        <p>Charges fill the space around them with an <span class="term">electric field <span class="en">(电场)</span></span> — the medium that transmits electric interaction.
        The <span class="term">field strength <span class="en">(电场强度)</span></span> is the force on a unit positive charge:</p>
        <div class="formula"><b>E</b> = <span class="frac"><span><b>F</b></span><span class="den">q</span></span>　　point-charge field: E = k<span class="frac"><span>Q</span><span class="den">r<sup>2</sup></span></span></div>
        <ul>
          <li>Direction: outward from positive charges, inward toward negative ones (see the background arrows);</li>
          <li>Multiple charges obey <b>superposition (叠加原理)</b>: add the fields as vectors;</li>
          <li>An unlike pair (a <span class="term">dipole <span class="en">(电偶极子)</span></span>) has field "flowing" from + to −.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Change r from 2 m to 4 m — the force drops to what fraction? (Inverse square!) ② Flip q₂ from +3 to −3: how do the force arrows and the background field change? ③ Set one charge to 0 — what remains is a single charge's radial field.</div>
        <div class="think"><b>Think about it:</b> Gravity F = Gm₁m₂/r² has the same form as Coulomb's law — so why do we feel Earth's gravity but not electric forces between everyday objects? (Hint: matter is usually neutral; plus and minus cancel.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sq1 = addSlider(panel, { label: L('电荷 q₁', 'Charge q₁'), en: L('charge 1', '电荷'), min: -5, max: 5, step: 0.5, value: 3, unit: 'μC' });
    const sq2 = addSlider(panel, { label: L('电荷 q₂', 'Charge q₂'), en: L('charge 2', '电荷'), min: -5, max: 5, step: 0.5, value: -3, unit: 'μC' });
    const sr = addSlider(panel, { label: L('距离 r', 'Distance r'), en: L('distance', '距离'), min: 1, max: 6, step: 0.1, value: 3, unit: 'm' });
    const readout = addReadout(panel);
    const K = 8.99e9;

    function draw() {
      const q1 = sq1.value, q2 = sq2.value, r = sr.value;
      const plot = new Plot(cv, { xmin: -5, xmax: 5, ymin: -4, ymax: 4, equal: true });
      plot.clear('#fff');
      const { ctx, W, H } = cv;
      const p1 = [-r / 2, 0], p2 = [r / 2, 0];

      // —— 背景电场箭头 ——
      const step = 0.62;
      for (let x = -4.8; x <= 4.8; x += step) {
        for (let y = -3.7; y <= 3.7; y += step) {
          const d1 = Math.hypot(x - p1[0], y - p1[1]), d2 = Math.hypot(x - p2[0], y - p2[1]);
          if (d1 < 0.45 || d2 < 0.45) continue;
          let ex = q1 * (x - p1[0]) / d1 ** 3 + q2 * (x - p2[0]) / d2 ** 3;
          let ey = q1 * (y - p1[1]) / d1 ** 3 + q2 * (y - p2[1]) / d2 ** 3;
          const mag = Math.hypot(ex, ey);
          if (mag < 1e-4) continue;
          const len = 0.24 * Math.min(1, 0.25 + Math.log10(1 + mag * 8) * 0.5);
          ex /= mag; ey /= mag;
          const alpha = Math.min(0.75, 0.18 + mag * 0.35);
          pxArrow(ctx, plot.X(x - ex * len), plot.Y(y - ey * len), plot.X(x + ex * len), plot.Y(y + ey * len),
            { color: `rgba(100,116,139,${alpha})`, width: 1.2 });
        }
      }

      // —— 电荷与受力 ——
      const F = K * Math.abs(q1 * q2) * 1e-12 / (r * r); // N
      const repel = q1 * q2 > 0;
      const both = q1 !== 0 && q2 !== 0;
      const drawCharge = (p, q, name) => {
        const R = 14 + Math.abs(q) * 2.5;
        ctx.save();
        ctx.fillStyle = q > 0 ? '#ef4444' : q < 0 ? '#3b82f6' : '#9ca3af';
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(plot.X(p[0]), plot.Y(p[1]), R, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(q > 0 ? '+' : q < 0 ? '−' : '0', plot.X(p[0]), plot.Y(p[1]) + 6);
        ctx.fillStyle = C.ink; ctx.font = 'bold 13px sans-serif';
        ctx.fillText(`${name} = ${fmtN(q,1)}μC`, plot.X(p[0]), plot.Y(p[1]) + R + 18);
        ctx.restore();
      };
      // 距离标注
      plot.seg(p1[0], -1.1, p2[0], -1.1, { color: C.gray, width: 1.3, dash: [5, 4] });
      plot.text(0, -1.1, `r = ${fmtN(r,1)} m`, { color: C.soft, dy: 18, align: 'center' });
      // 力箭头
      if (both) {
        const fLen = Math.min(2.2, 0.4 + F * 90);
        const d1 = repel ? -1 : 1, d2 = repel ? 1 : -1;
        pxArrow(ctx, plot.X(p1[0]), plot.Y(0.0), plot.X(p1[0] + d1 * fLen), plot.Y(0),
          { color: C.green, width: 3.4, label: 'F₁', labelDy: -10 });
        pxArrow(ctx, plot.X(p2[0]), plot.Y(0.0), plot.X(p2[0] + d2 * fLen), plot.Y(0),
          { color: C.green, width: 3.4, label: 'F₂', labelDy: -10 });
      }
      drawCharge(p1, q1, 'q₁');
      drawCharge(p2, q2, 'q₂');

      readout.set(L(`
        F = k·|q₁q₂|/r² = <b>${F < 0.001 ? fmtN(F * 1000, 3) + ' mN' : fmtN(F, 4) + ' N'}</b><br>
        ${both
          ? `两电荷${repel ? '<span class="tag" style="background:#fee2e2;color:#b91c1c">同号 → 相互排斥 repel</span>' : '<span class="tag" style="background:#dcfce7;color:#15803d">异号 → 相互吸引 attract</span>'}`
          : '<span class="warn">有电荷为 0，无相互作用力</span>'}<br>
        验证平方反比：r 加倍 → F 变为 <b>${fmtN(F / 4, 4)} N</b><br>
        |F₁| = |F₂|（牛顿第三定律）✓`, `
        F = k·|q₁q₂|/r² = <b>${F < 0.001 ? fmtN(F * 1000, 3) + ' mN' : fmtN(F, 4) + ' N'}</b><br>
        ${both
          ? `${repel ? '<span class="tag" style="background:#fee2e2;color:#b91c1c">like charges → repel 相斥</span>' : '<span class="tag" style="background:#dcfce7;color:#15803d">unlike charges → attract 相吸</span>'}`
          : '<span class="warn">One charge is 0 — no interaction</span>'}<br>
        Inverse-square check: doubling r → F becomes <b>${fmtN(F / 4, 4)} N</b><br>
        |F₁| = |F₂| (Newton's third law) ✓`));
    }
    [sq1, sq2, sr].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
