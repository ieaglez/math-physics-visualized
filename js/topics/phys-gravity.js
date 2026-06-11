'use strict';
/* ===== 万有引力与卫星 Gravitation & Satellites ===== */
registerTopic({
  id: 'gravity', cat: 'mech', icon: '🛰️',
  title: '万有引力与卫星', en: 'Gravitation & Orbits',
  desc: '改变卫星轨道高度，看速度和周期如何变化 —— 轨道越高，飞得越慢，周期越长。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '万有引力与卫星', en: 'Universal Gravitation & Satellite Orbits',
      tagline: '引力提供向心力。拖动轨道半径，找一找周期恰好 24 小时的"地球同步轨道"。',
      formula: 'F = G<span class="frac"><span>Mm</span><span class="den">r²</span></span>　·　v = √(GM/r)　·　T² = <span class="frac"><span>4π²</span><span class="den">GM</span></span>r³（开普勒第三定律）',
      explainHTML: `
        <h2>万有引力定律 <span class="en">Law of Universal Gravitation</span></h2>
        <div class="formula">F = G<span class="frac"><span>Mm</span><span class="den">r²</span></span>
          <span class="note">G = 6.67 × 10⁻¹¹ N·m²/kg²（引力常量，卡文迪许扭秤实验测得）</span></div>
        <p>任意两个质点互相吸引，与质量乘积成正比、与距离平方成反比 —— 苹果落地和月亮绕地，是同一个力！</p>
        <h2>卫星为什么不掉下来 <span class="en">Why Satellites Stay Up</span></h2>
        <p>卫星<b>一直在"掉"</b>，只是横向速度足够大，掉落的弧线恰好绕着地球转 —— 引力全部用来提供向心力：</p>
        <div class="formula">G<span class="frac"><span>Mm</span><span class="den">r²</span></span> = <span class="frac"><span>mv²</span><span class="den">r</span></span> ⟹ v = <span style="white-space:nowrap">√<span style="border-top:1.5px solid currentColor">GM/r</span></span>
          <span class="note">轨道越高（r 越大）→ 速度越小、周期越长。第一宇宙速度 v₁ = 7.9 km/s（贴地飞行）</span></div>
        <h2>开普勒第三定律 <span class="en">Kepler's Third Law</span></h2>
        <div class="formula"><span class="frac"><span>T²</span><span class="den">r³</span></span> = <span class="frac"><span>4π²</span><span class="den">GM</span></span> = 常数
          <span class="note">所有绕同一中心天体运行的卫星/行星都满足 —— 与卫星自身质量无关</span></div>
        <ul>
          <li><b>同步卫星 <span class="en">(geostationary)</span></b>：T = 24 h，必须位于赤道上空约 35800 km（r ≈ 6.6 R⊕）；</li>
          <li>近地卫星：T ≈ 90 分钟（空间站）；月球：r ≈ 60 R⊕，T ≈ 27.3 天 —— 都符合 T² ∝ r³。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 r 从 1.1 R⊕ 拉到 8 R⊕，看 v 从 7.6 km/s 一路下降；② 找到 T ≈ 24 h 的位置（约 6.6 R⊕）—— 这就是同步轨道；③ 读数里 T²/r³ 始终是同一个数，亲手验证开普勒第三定律。</div>
        <div class="think"><b>思考一下：</b>要把卫星送到更高轨道，火箭需要加速；但到了高轨道后卫星速度反而更小 —— 多出来的能量去哪了？（提示：引力势能）</div>
      `
    });

    const GM = 3.986e14, RE = 6.371e6; // 地球
    const cv = createCanvas(canvasBox, 460);
    const sr = addSlider(panel, { label: '轨道半径 r', en: 'orbit radius', min: 1.1, max: 8, step: 0.05, value: 2.5, unit: 'R⊕' });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, { onReset: () => draw() });
    anim.start();

    function draw() {
      const rR = sr.value, r = rR * RE;
      const v = Math.sqrt(GM / r);
      const T = 2 * Math.PI * r / v;
      const w = 2 * Math.PI / T;
      // 动画角速度按比例缩放（视觉上：周期短转得快）
      const wVis = 0.9 * Math.sqrt(Math.pow(2.5 / rR, 3));
      const th = anim.t * wVis;
      const M = 8.6;
      const plot = new Plot(cv, { xmin: -M, xmax: M, ymin: -M * 0.78, ymax: M * 0.78, equal: true });
      plot.clear('#0b1026');
      const { ctx } = cv;
      // 星空
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      for (let i = 0; i < 70; i++) {
        const sx = (i * 137.5) % cv.W, sy = (i * 73.3) % cv.H;
        ctx.fillRect(sx, sy, i % 3 ? 1 : 1.6, i % 3 ? 1 : 1.6);
      }
      ctx.restore();
      // 地球
      const eR = Math.abs(plot.X(1) - plot.X(0));
      const g = ctx.createRadialGradient(plot.X(-0.3), plot.Y(0.3), eR * 0.15, plot.X(0), plot.Y(0), eR);
      g.addColorStop(0, '#7dd3fc'); g.addColorStop(0.6, '#2563eb'); g.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), eR, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('地球', plot.X(0), plot.Y(0) + 4);
      ctx.textAlign = 'left';
      // 同步轨道参考圈
      ctx.save();
      ctx.strokeStyle = 'rgba(250,204,21,.35)'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 6]);
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), eR * 6.6, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(250,204,21,.7)'; ctx.font = '11px sans-serif';
      ctx.fillText('同步轨道 6.6R⊕', plot.X(0) + eR * 6.6 * 0.71, plot.Y(0) - eR * 6.6 * 0.71);
      ctx.restore();
      // 卫星轨道
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1.6; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), eR * rR, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      const P = [rR * Math.cos(th), rR * Math.sin(th)];
      // 引力箭头 + 速度箭头
      const fLen = Math.min(2.2, 3.4 / (rR * rR) + 0.5);
      pxArrow(ctx, plot.X(P[0]), plot.Y(P[1]), plot.X(P[0] * (1 - fLen / rR)), plot.Y(P[1] * (1 - fLen / rR)),
        { color: '#f87171', width: 2.6, label: 'F引', labelDx: 8, labelDy: 16 });
      const vLen = v / 7900 * 1.6;
      pxArrow(ctx, plot.X(P[0]), plot.Y(P[1]), plot.X(P[0] - Math.sin(th) * vLen), plot.Y(P[1] + Math.cos(th) * vLen),
        { color: '#4ade80', width: 2.6, label: 'v', labelDy: -8 });
      // 卫星
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(plot.X(P[0]), plot.Y(P[1]), 6.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      const Th = T / 3600;
      const kepler = (T * T) / Math.pow(r, 3);
      readout.set(`
        轨道半径 r = <b>${fmtN(rR,2)} R⊕</b> = ${fmtN(r/1e6,0)}×10⁶ m<br>
        轨道速度 v = √(GM/r) = <b>${fmtN(v/1000,2)} km/s</b><br>
        周期 T = <b>${Th < 48 ? fmtN(Th,2) + ' 小时' : fmtN(Th/24,2) + ' 天'}</b>
        ${Math.abs(Th - 24) < 1 ? '<span class="tag">≈24h 同步轨道！</span>' : ''}<br>
        向心加速度 a = GM/r² = <b>${fmtN(GM/(r*r),2)} m/s²</b><br>
        开普勒验证 T²/r³ = <b>${fmtN(kepler * 1e14,3)}</b>×10⁻¹⁴（恒定 ✓）`);
    }
    sr.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
