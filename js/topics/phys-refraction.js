'use strict';
/* ===== 光的折射与全反射 Refraction & Total Internal Reflection ===== */
registerTopic({
  id: 'refraction', cat: 'optics', icon: '🌈', stage: 'both',
  title: '光的折射与全反射', en: 'Refraction & TIR',
  desc: L('调节入射角和折射率，验证斯涅尔定律；让光从水中射向空气，找到全反射的临界角。',
          'Tune the incidence angle and refractive index to verify Snell\'s law — then send light from water to air and find the critical angle.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '光的折射与全反射', en: 'Refraction & Total Internal Reflection',
      tagline: L('切换光的传播方向，调大入射角，看看什么时候折射光会突然消失。',
                 'Switch the direction of travel, widen the incidence angle, and find where the refracted ray suddenly vanishes.'),
      formula: L('n₁·sin θ₁ = n₂·sin θ₂　·　临界角 sin θ<sub>c</sub> = <span class="frac"><span>n₂</span><span class="den">n₁</span></span>',
                 'n₁·sin θ₁ = n₂·sin θ₂　·　critical angle sin θ<sub>c</sub> = <span class="frac"><span>n₂</span><span class="den">n₁</span></span>'),
      explainHTML: L(`
        <h2>折射定律 <span class="en">Snell's Law</span></h2>
        <p>光从一种介质斜射入另一种介质时，传播方向发生偏折，叫<span class="term">折射 <span class="en">(refraction)</span></span>。
        入射角 θ₁ 与折射角 θ₂ 满足<span class="term">斯涅尔定律 <span class="en">(Snell's law)</span></span>：</p>
        <div class="formula">n₁·sin θ₁ = n₂·sin θ₂</div>
        <ul>
          <li>n 是<span class="term">折射率 <span class="en">(refractive index)</span></span>：n = c/v，光在该介质中越慢，n 越大。空气 n ≈ 1，水 n ≈ 1.33，玻璃 n ≈ 1.5，钻石 n ≈ 2.42；</li>
          <li>光<b>从光疏入光密</b>介质（n 变大）：折射角变小，光线向法线 (normal) 偏折；</li>
          <li>光<b>从光密入光疏</b>介质（n 变小）：折射角变大，光线远离法线；</li>
          <li>同时总有一部分光被<b>反射 (reflection)</b>，反射角 = 入射角。</li>
        </ul>
        <h2>全反射 <span class="en">Total Internal Reflection</span></h2>
        <p>光从光密介质射向光疏介质，当入射角超过<span class="term">临界角 <span class="en">(critical angle)</span></span>时，
        折射光完全消失，所有光都被反射回来：</p>
        <div class="formula">sin θ<sub>c</sub> = <span class="frac"><span>n₂</span><span class="den">n₁</span></span>
          <span class="note">（仅当 n₁ &gt; n₂ 时存在，例如水→空气：θc = arcsin(1/1.33) ≈ 48.8°）</span></div>
        <p>应用：<b>光纤通信 (optical fiber)</b> 靠全反射把光“锁”在玻璃丝里传输；钻石的璀璨也源于其极小的临界角（约 24°）。</p>
        <div class="tip"><b>实验建议：</b>① 方向选“介质→空气”，n = 1.33（水），慢慢调大入射角，在约 48.8° 处折射光贴着水面消失 —— 全反射发生了；② 把 n 调到 2.42（钻石），临界角变得多小？③ 方向换成“空气→介质”，无论入射角多大都不会全反射，为什么？</div>
        <div class=”think”><b>思考一下：</b>从水底看天空，为什么整个天空被压缩在一个约 97.6°（2×48.8°）的光锥里？潜水员叫它”斯涅尔窗口 (Snell's window)”。</div>
      `, `
        <h2>Snell's Law <span class=”en”>折射定律</span></h2>
        <p>Light crossing into another medium at an angle bends — that's <span class=”term”>refraction <span class=”en”>(折射)</span></span>.
        The incidence angle θ₁ and refraction angle θ₂ obey <span class=”term”>Snell's law <span class=”en”>(斯涅尔定律)</span></span>:</p>
        <div class=”formula”>n₁·sin θ₁ = n₂·sin θ₂</div>
        <ul>
          <li>n is the <span class=”term”>refractive index <span class=”en”>(折射率)</span></span>: n = c/v — the slower light travels in the medium, the larger n. Air ≈ 1, water ≈ 1.33, glass ≈ 1.5, diamond ≈ 2.42;</li>
          <li>From <b>less dense into denser</b> (n increases): the ray bends toward the normal (法线);</li>
          <li>From <b>denser into less dense</b>: it bends away from the normal;</li>
          <li>Some light is always <b>reflected</b> too, with the reflection angle equal to the incidence angle.</li>
        </ul>
        <h2>Total Internal Reflection <span class=”en”>全反射</span></h2>
        <p>Going from a denser to a less dense medium, once the incidence angle exceeds the
        <span class=”term”>critical angle <span class=”en”>(临界角)</span></span>, the refracted ray disappears entirely and all light reflects back:</p>
        <div class=”formula”>sin θ<sub>c</sub> = <span class=”frac”><span>n₂</span><span class=”den”>n₁</span></span>
          <span class=”note”>(exists only when n₁ &gt; n₂ — e.g. water→air: θc = arcsin(1/1.33) ≈ 48.8°)</span></div>
        <p>Applications: <b>optical fibers (光纤)</b> trap light by total internal reflection; a diamond's sparkle comes from its tiny critical angle (≈24°).</p>
        <div class=”tip”><b>Try this:</b> ① Choose “Medium → Air” with n = 1.33 (water) and slowly widen the incidence angle — near 48.8° the refracted ray skims the surface and vanishes: total internal reflection; ② Set n = 2.42 (diamond) — how small does the critical angle get? ③ Switch to “Air → Medium”: why can total internal reflection never happen this way?</div>
        <div class=”think”><b>Think about it:</b> Looking up from underwater, the entire sky is squeezed into a cone of about 97.6° (2×48.8°) — divers call it “Snell's window”. Why?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const dir = addSeg(panel, {
      options: [
        { label: L('空气 → 介质', 'Air → Medium'), value: 'in' },
        { label: L('介质 → 空气', 'Medium → Air'), value: 'out' }
      ],
      value: 'out', onChange: () => draw()
    });
    const sn = addSlider(panel, { label: L('介质折射率 n', 'Refractive index n'), en: L('refractive index', '折射率'), min: 1.0, max: 2.5, step: 0.01, value: 1.33 });
    const sth = addSlider(panel, { label: L('入射角 θ₁', 'Incidence angle θ₁'), en: L('angle of incidence', '入射角'), min: 0, max: 89, step: 0.5, value: 40, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const n = sn.value, th1 = sth.value * DEG;
      const fromMedium = dir.value === 'out';
      const n1 = fromMedium ? n : 1, n2 = fromMedium ? 1 : n;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.4;
      // 介质区域（下半部分）
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, cy);
      ctx.fillStyle = `rgba(8,145,178,${0.08 + (n - 1) * 0.14})`; ctx.fillRect(0, cy, W, H - cy);
      // 界面
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
      // 法线
      ctx.strokeStyle = C.gray; ctx.setLineDash([7, 6]); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx, cy - R - 14); ctx.lineTo(cx, cy + R + 14); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.soft; ctx.font = '12px sans-serif';
      ctx.fillText(L('法线 normal', 'normal 法线'), cx + 8, cy - R - 2);
      ctx.fillText(L(`空气 air（n = 1）`, `air (n = 1)`), 18, cy - 12);
      ctx.fillText(L(`介质 medium（n = ${fmtN(n, 2)}）`, `medium (n = ${fmtN(n, 2)})`), 18, cy + 22);

      // 入射光：从介质或空气一侧射向界面上的点 O(cx, cy)
      const sgn = fromMedium ? 1 : -1; // 入射光起点在下方(介质)还是上方
      const inStart = [cx - Math.sin(th1) * R, cy + sgn * Math.cos(th1) * R];
      pxArrow(ctx, inStart[0], inStart[1], cx, cy, { color: C.orange, width: 3, label: L('入射光', 'incident'), labelDx: -86, labelDy: sgn * -10 });
      // 反射光（同侧）
      const refl = [cx + Math.sin(th1) * R, cy + sgn * Math.cos(th1) * R];
      const sinT2 = n1 * Math.sin(th1) / n2;
      const tir = sinT2 > 1;
      pxArrow(ctx, cx, cy, refl[0], refl[1], { color: tir ? C.red : '#fb923c', width: tir ? 3 : 1.8, label: L('反射光', 'reflected'), labelDx: 6 });
      // 折射光（另一侧）
      let th2 = null;
      if (!tir) {
        th2 = Math.asin(sinT2);
        const refr = [cx + Math.sin(th2) * R, cy - sgn * Math.cos(th2) * R];
        pxArrow(ctx, cx, cy, refr[0], refr[1], { color: C.blue, width: 3, label: L('折射光', 'refracted'), labelDx: 6 });
      }
      // 角度弧与标注
      function arc(angle, side, color, label) {
        // side: -1 上方, +1 下方；angle 从法线量起
        const a0 = side > 0 ? Math.PI / 2 : -Math.PI / 2;
        ctx.strokeStyle = color; ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx, cy, 52, a0, a0 - side * angle * Math.sign(1), side < 0);
        ctx.stroke();
        const mid = a0 - side * angle / 2;
        ctx.fillStyle = color; ctx.font = 'bold 13px sans-serif';
        ctx.fillText(label, cx + 66 * Math.cos(mid) - 10, cy + 66 * Math.sin(mid) + 5);
      }
      // 入射角弧（入射光一侧：x<cx）
      ctx.strokeStyle = C.orange; ctx.lineWidth = 1.8;
      ctx.beginPath();
      if (fromMedium) ctx.arc(cx, cy, 52, Math.PI / 2, Math.PI / 2 + th1);
      else ctx.arc(cx, cy, 52, -Math.PI / 2 - th1, -Math.PI / 2);
      ctx.stroke();
      ctx.fillStyle = C.orange; ctx.font = 'bold 13px sans-serif';
      ctx.fillText('θ₁', cx - 70 * Math.sin(th1 * 0.6) - 8, cy + sgn * 70 * Math.cos(th1 * 0.55));
      if (!tir) {
        ctx.strokeStyle = C.blue;
        ctx.beginPath();
        if (fromMedium) ctx.arc(cx, cy, 52, -Math.PI / 2, -Math.PI / 2 + th2);
        else ctx.arc(cx, cy, 52, Math.PI / 2 - th2, Math.PI / 2);
        ctx.stroke();
        ctx.fillStyle = C.blue;
        ctx.fillText('θ₂', cx + 70 * Math.sin(th2 * 0.6) - 4, cy - sgn * 70 * Math.cos(th2 * 0.55) + 4);
      }

      const thc = (fromMedium && n > 1.001) ? Math.asin(1 / n) / DEG : null;
      readout.set(L(`
        ${fromMedium ? `n₁ = ${fmtN(n,2)}（介质）→ n₂ = 1（空气）` : `n₁ = 1（空气）→ n₂ = ${fmtN(n,2)}（介质）`}<br>
        入射角 θ₁ = <b>${fmtN(sth.value,1)}°</b><br>
        ${tir
          ? `<span class="warn">发生全反射 Total Internal Reflection！</span><br>sin θ₂ = n₁sinθ₁/n₂ = ${fmtN(sinT2,2)} &gt; 1，无解`
          : `折射角 θ₂ = <b>${fmtN(th2 / DEG,1)}°</b><br>验证：n₁sinθ₁ = ${fmtN(n1 * Math.sin(th1),3)} = n₂sinθ₂ = ${fmtN(n2 * Math.sin(th2),3)} ✓`}<br>
        ${thc != null ? `临界角 θc = arcsin(1/n) = <b>${fmtN(thc,1)}°</b>${!tir && sth.value < thc ? `（再调大 ${fmtN(thc - sth.value,1)}° 试试）` : ''}` : '空气→介质方向不存在全反射'}`, `
        ${fromMedium ? `n₁ = ${fmtN(n,2)} (medium) → n₂ = 1 (air)` : `n₁ = 1 (air) → n₂ = ${fmtN(n,2)} (medium)`}<br>
        Incidence θ₁ = <b>${fmtN(sth.value,1)}°</b><br>
        ${tir
          ? `<span class="warn">Total internal reflection 全反射!</span><br>sin θ₂ = n₁sinθ₁/n₂ = ${fmtN(sinT2,2)} &gt; 1 — no solution`
          : `Refraction θ₂ = <b>${fmtN(th2 / DEG,1)}°</b><br>Check: n₁sinθ₁ = ${fmtN(n1 * Math.sin(th1),3)} = n₂sinθ₂ = ${fmtN(n2 * Math.sin(th2),3)} ✓`}<br>
        ${thc != null ? `Critical angle θc = arcsin(1/n) = <b>${fmtN(thc,1)}°</b>${!tir && sth.value < thc ? ` (add another ${fmtN(thc - sth.value,1)}°)` : ''}` : 'No total internal reflection going air → medium'}`));
    }
    [sn, sth].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
