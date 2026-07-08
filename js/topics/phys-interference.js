'use strict';
/* ===== 光的双缝干涉 Double-Slit Interference ===== */
registerTopic({
  id: 'interference', cat: 'optics', icon: '🪟',
  title: '光的双缝干涉', en: 'Double-Slit Interference',
  desc: L('改变波长（颜色）、缝距和屏距，观察明暗条纹如何变宽变窄 —— 光是波的铁证。',
          'Change the wavelength (color), slit spacing and screen distance; watch the fringes widen and narrow — iron-clad proof that light is a wave.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '光的双缝干涉', en: "Young's Double-Slit Interference",
      tagline: L('右侧竖条是屏上的干涉条纹。换个颜色（波长），条纹间距立刻改变。',
                 'The strip on the right is the fringe pattern on the screen. Change the color (wavelength) and the spacing shifts instantly.'),
      formula: L('相邻亮纹间距 Δy = <span class="frac"><span>λL</span><span class="den">d</span></span>　·　亮纹条件：路程差 δ = kλ',
                 'Fringe spacing Δy = <span class="frac"><span>λL</span><span class="den">d</span></span>　·　bright fringes: path difference δ = kλ'),
      explainHTML: L(`
        <h2>杨氏双缝实验 <span class="en">Young's Experiment (1801)</span></h2>
        <p>光通过两条相距很近的狭缝后，在屏上形成明暗相间的<span class="term">干涉条纹 <span class="en">(interference fringes)</span></span>
        —— 这是"光是一种波"的决定性证据。两列波相遇时：</p>
        <ul>
          <li><b>路程差 δ = kλ</b>（整数倍波长）：波峰遇波峰，<span class="term">相长干涉 <span class="en">(constructive)</span></span> → 亮纹；</li>
          <li><b>δ = (k + ½)λ</b>（半整数倍）：波峰遇波谷，<span class="term">相消干涉 <span class="en">(destructive)</span></span> → 暗纹。</li>
        </ul>
        <h2>条纹间距公式 <span class="en">Fringe Spacing</span></h2>
        <div class="formula">Δy = <span class="frac"><span>λL</span><span class="den">d</span></span>
          <span class="note">λ 波长、L 缝到屏距离、d 双缝间距。条纹间距正比于波长 —— 红光条纹比紫光宽</span></div>
        <ul>
          <li>波长越长（越红）、屏越远、缝越密，条纹越<b>宽</b>；</li>
          <li>测出 Δy、L、d，就能反算光的波长 —— 19 世纪的物理学家就是这样第一次"量"出了光波的尺寸（几百纳米）；</li>
          <li>白光干涉时中央是白色亮纹，两侧出现彩色条纹（各色光 Δy 不同）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 λ 从 700 nm（红）拖到 400 nm（紫），条纹间距如何变化？读数验证 Δy = λL/d；② 缝距 d 加倍，条纹变密一半；③ 试试找到 Δy 恰好等于 2 mm 的参数组合 —— 这是实验室里真实的数量级。</div>
        <div class="think"><b>思考一下：</b>如果把其中一条缝挡住，屏上还会有条纹吗？（不会 —— 单缝只有衍射展宽。）肥皂泡和油膜上的彩色又是哪种干涉？（薄膜干涉 thin-film interference。）</div>
      `, `
        <h2>Young's Experiment (1801) <span class="en">杨氏双缝实验</span></h2>
        <p>Light passing through two closely spaced slits paints alternating bright and dark
        <span class="term">interference fringes <span class="en">(干涉条纹)</span></span> on a screen — the decisive evidence that light is a wave. When two waves meet:</p>
        <ul>
          <li><b>Path difference δ = kλ</b> (whole wavelengths): crest meets crest — <span class="term">constructive interference <span class="en">(相长干涉)</span></span> → bright fringe;</li>
          <li><b>δ = (k + ½)λ</b>: crest meets trough — <span class="term">destructive interference <span class="en">(相消干涉)</span></span> → dark fringe.</li>
        </ul>
        <h2>Fringe Spacing <span class="en">条纹间距公式</span></h2>
        <div class="formula">Δy = <span class="frac"><span>λL</span><span class="den">d</span></span>
          <span class="note">λ wavelength, L slit-to-screen distance, d slit separation. Spacing ∝ wavelength — red fringes are wider than violet</span></div>
        <ul>
          <li>Longer wavelength (redder), farther screen, or closer slits → <b>wider</b> fringes;</li>
          <li>Measure Δy, L and d, and you can compute λ — exactly how 19th-century physicists first "weighed" light at a few hundred nanometers;</li>
          <li>With white light the central fringe is white and the sides turn rainbow-colored (each λ has its own Δy).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Slide λ from 700 nm (red) to 400 nm (violet) — how does the spacing change? Verify Δy = λL/d in the readout; ② Double the slit spacing d and the fringes squeeze to half; ③ Find a parameter combo giving Δy = 2 mm — a realistic lab value.</div>
        <div class="think"><b>Think about it:</b> Cover one slit — do fringes remain? (No — a single slit only gives diffraction spreading.) And what causes the colors on soap bubbles and oil films? (Thin-film interference 薄膜干涉.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sl = addSlider(panel, { label: L('波长 λ（决定颜色）', 'Wavelength λ (sets color)'), en: L('wavelength', '波长'), min: 400, max: 700, step: 5, value: 550, unit: 'nm' });
    const sd = addSlider(panel, { label: L('双缝间距 d', 'Slit separation d'), en: L('slit separation', '缝距'), min: 0.1, max: 0.8, step: 0.02, value: 0.3, unit: 'mm' });
    const sL = addSlider(panel, { label: L('屏距 L', 'Screen distance L'), en: L('screen distance', '屏距'), min: 0.5, max: 3, step: 0.1, value: 1.5, unit: 'm' });
    const readout = addReadout(panel);

    function draw() {
      const lam = sl.value, d = sd.value, L = sL.value;
      const dy = lam * 1e-9 * L / (d * 1e-3) * 1000; // mm
      const col = waveColor(lam);
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#101425'; ctx.fillRect(0, 0, W, H);
      const midY = H / 2;
      const slitX = W * 0.22, screenX = W - 90;
      const slitGap = 34;
      const s1 = midY - slitGap / 2, s2 = midY + slitGap / 2;
      // 入射光
      for (let y = midY - 46; y <= midY + 46; y += 12) {
        pxArrow(ctx, 24, y, slitX - 26, y, { color: 'rgba(255,255,255,.28)', width: 1.5 });
      }
      ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = '11.5px sans-serif';
      ctx.fillText(window.L('平行单色光', 'monochromatic light'), 24, midY - 56);
      // 双缝挡板
      ctx.fillStyle = '#3c4257';
      ctx.fillRect(slitX - 4, 30, 8, s1 - 6 - 30);
      ctx.fillRect(slitX - 4, s1 + 6, 8, s2 - s1 - 12);
      ctx.fillRect(slitX - 4, s2 + 6, 8, H - 30 - s2 - 6);
      ctx.fillStyle = '#9aa1b5'; ctx.font = '12px sans-serif';
      ctx.fillText('S₁', slitX - 26, s1 + 4);
      ctx.fillText('S₂', slitX - 26, s2 + 4);
      ctx.fillText('d', slitX + 10, midY + 4);
      // 从双缝发出的圆弧波（示意）
      ctx.save();
      ctx.globalAlpha = 0.35;
      [s1, s2].forEach(sy => {
        for (let r = 18; r < screenX - slitX - 8; r += 26) {
          ctx.strokeStyle = col; ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(slitX + 4, sy, r, -1.15, 1.15);
          ctx.stroke();
        }
      });
      ctx.restore();
      // 屏与条纹：yRange ±14mm
      const yRange = 14;
      const SY = mm => midY - mm / yRange * (H / 2 - 40);
      ctx.fillStyle = '#1b2036';
      ctx.fillRect(screenX, 28, 26, H - 56);
      for (let py = 28; py < H - 28; py++) {
        const mm = (midY - py) / (H / 2 - 40) * yRange;
        const delta = (d * 1e-3) * (mm * 1e-3) / L;        // 路程差
        const I = Math.cos(Math.PI * delta / (lam * 1e-9)) ** 2;
        ctx.fillStyle = col;
        ctx.globalAlpha = I * 0.95;
        ctx.fillRect(screenX, py, 26, 1);
        ctx.globalAlpha = 1;
      }
      // 强度曲线
      ctx.strokeStyle = col; ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let py = 28; py < H - 28; py += 2) {
        const mm = (midY - py) / (H / 2 - 40) * yRange;
        const delta = (d * 1e-3) * (mm * 1e-3) / L;
        const I = Math.cos(Math.PI * delta / (lam * 1e-9)) ** 2;
        const X = screenX - 8 - I * 46;
        py === 28 ? ctx.moveTo(X, py) : ctx.lineTo(X, py);
      }
      ctx.stroke();
      // Δy 标注（中央亮纹到第 1 级）
      if (dy < yRange) {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(screenX + 32, SY(0)); ctx.lineTo(screenX + 44, SY(0)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(screenX + 32, SY(dy)); ctx.lineTo(screenX + 44, SY(dy)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(screenX + 38, SY(0)); ctx.lineTo(screenX + 38, SY(dy)); ctx.stroke();
        ctx.save();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif';
        ctx.translate(screenX + 52, (SY(0) + SY(dy)) / 2 + 4);
        ctx.fillText('Δy', 0, 0);
        ctx.restore();
      }
      ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = '11.5px sans-serif';
      ctx.fillText(window.L('屏上的干涉条纹 →', 'fringes on the screen →'), screenX - 130, 44);
      ctx.fillText(window.L('← 光强分布 I', '← intensity profile I'), screenX - 130, 62);
      const cIdx = Math.min(6, Math.floor((lam - 400) / 43));
      const visible = window.L(['紫', '蓝', '青', '绿', '黄', '橙', '红'][cIdx] + '光', ['violet', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red'][cIdx]);
      readout.set(window.L(`
        波长 λ = <b>${fmtN(lam,0)} nm</b>（${visible}）<br>
        条纹间距 Δy = λL/d = <b>${fmtN(dy,2)} mm</b><br>
        屏上可见亮纹（±14mm 内）约 <b>${Math.max(1, Math.floor(yRange / dy) * 2 + 1)}</b> 条<br>
        第 1 级亮纹：路程差 δ = λ = ${fmtN(lam / 1000,2)} μm<br>
        <span class="tag">λ 越长（越红）条纹越宽</span>`, `
        Wavelength λ = <b>${fmtN(lam,0)} nm</b> (${visible})<br>
        Fringe spacing Δy = λL/d = <b>${fmtN(dy,2)} mm</b><br>
        Bright fringes visible (within ±14 mm): about <b>${Math.max(1, Math.floor(yRange / dy) * 2 + 1)}</b><br>
        1st-order fringe: path difference δ = λ = ${fmtN(lam / 1000,2)} μm<br>
        <span class="tag">longer λ (redder) → wider fringes</span>`));
    }
    [sl, sd, sL].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
