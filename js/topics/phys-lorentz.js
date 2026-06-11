'use strict';
/* ===== 洛伦兹力 Lorentz Force ===== */
registerTopic({
  id: 'lorentz', cat: 'optics', icon: '🧲',
  title: '带电粒子在磁场中', en: 'Lorentz Force',
  desc: '调节电荷、速度和磁感应强度，观察带电粒子在匀强磁场中的圆周运动。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '带电粒子在磁场中的运动', en: 'Charged Particle in a Magnetic Field',
      tagline: '背景的 ⊗ 表示磁场垂直屏幕向里。洛伦兹力始终垂直于速度，所以粒子转圈。',
      formula: 'F = qvB　·　半径 r = <span class="frac"><span>mv</span><span class="den">qB</span></span>　·　周期 T = <span class="frac"><span>2πm</span><span class="den">qB</span></span>（与 v 无关！）',
      explainHTML: `
        <h2>洛伦兹力 <span class="en">Lorentz Force</span></h2>
        <div class="formula">F = qvB（v ⊥ B 时）
          <span class="note">方向用左手定则 (left-hand rule)：磁感线穿入手心，四指指向<b>正电荷</b>运动方向，拇指即为受力方向（负电荷反向）</span></div>
        <ul>
          <li>洛伦兹力<b>始终垂直于速度</b> ⟹ 永远不做功，只改变方向不改变速率；</li>
          <li>于是粒子做<b>匀速圆周运动</b> —— 洛伦兹力恰好充当向心力。</li>
        </ul>
        <h2>半径与周期 <span class="en">Radius & Period</span></h2>
        <div class="formula">qvB = <span class="frac"><span>mv²</span><span class="den">r</span></span> ⟹ r = <span class="frac"><span>mv</span><span class="den">qB</span></span>　　T = <span class="frac"><span>2πr</span><span class="den">v</span></span> = <span class="frac"><span>2πm</span><span class="den">qB</span></span></div>
        <ul>
          <li>速度越大圈越大，磁场越强圈越小；</li>
          <li><b>周期与速度无关！</b>快粒子转大圈、慢粒子转小圈，但转一圈时间相同 —— 回旋加速器 (cyclotron) 的核心原理；</li>
          <li>电荷正负决定旋转方向 —— 云室里正负粒子的径迹弯向相反。</li>
        </ul>
        <h2>应用 <span class="en">Applications</span></h2>
        <ul>
          <li><b>质谱仪 (mass spectrometer)</b>：同速度的离子，质量不同 → 半径不同 → 分离同位素；</li>
          <li><b>回旋加速器</b>、电视显像管（电子束偏转）、地球磁场屏蔽宇宙射线（极光！）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 v 翻倍：半径翻倍，但读数里周期 T 不变 —— 这是本专题最反直觉的结论；② 把电荷从 + 切到 −，旋转方向立刻反向；③ 增大 B，圈被"勒"得更小。</div>
        <div class="think"><b>思考一下：</b>如果粒子速度方向与磁场平行（而不是垂直），洛伦兹力是多少？粒子将做什么运动？（提示：F = qvB·sinθ）</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const sq = addSlider(panel, { label: '电荷 q（含正负）', en: 'charge', min: -3, max: 3, step: 0.5, value: 1.5, unit: 'μC' });
    const sm = addSlider(panel, { label: '质量 m', en: 'mass', min: 0.5, max: 5, step: 0.25, value: 2, unit: 'mg' });
    const sv = addSlider(panel, { label: '速率 v', en: 'speed', min: 0.5, max: 4, step: 0.1, value: 2 });
    const sB = addSlider(panel, { label: '磁感应强度 B', en: 'field strength', min: 0.5, max: 4, step: 0.1, value: 2, unit: 'T' });
    const readout = addReadout(panel);
    let phase = 0, trail = [];
    const anim = makeAnimator(dt => {
      const w = angVel();
      phase += w * dt * 1.4;
      draw();
    });
    addPlayControls(panel, anim, { onReset: () => { phase = 0; trail = []; draw(); } });
    anim.start();

    function angVel() { // 视觉角速度（含方向）：ω = qB/m
      return (sq.value * sB.value) / sm.value * 0.55;
    }

    function draw() {
      const q = sq.value, m = sm.value, v = sv.value, B = sB.value;
      const plot = new Plot(cv, { xmin: -6, xmax: 6, ymin: -4.6, ymax: 4.6, equal: true });
      plot.clear('#fbfcff');
      const { ctx } = cv;
      // 磁场符号 ⊗（向里）
      ctx.save();
      ctx.strokeStyle = '#c4c9e8'; ctx.fillStyle = '#c4c9e8'; ctx.lineWidth = 1.3;
      ctx.font = '11px sans-serif';
      for (let x = -5.5; x <= 5.5; x += 1.4) {
        for (let y = -4.2; y <= 4.2; y += 1.4) {
          const X = plot.X(x), Y = plot.Y(y);
          ctx.beginPath(); ctx.arc(X, Y, 7, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(X - 4.5, Y - 4.5); ctx.lineTo(X + 4.5, Y + 4.5);
          ctx.moveTo(X - 4.5, Y + 4.5); ctx.lineTo(X + 4.5, Y - 4.5);
          ctx.stroke();
        }
      }
      ctx.fillStyle = '#8b93bd'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText('B ⊗ 磁场垂直屏幕向里', plot.X(-5.7), plot.Y(4.35));
      ctx.restore();
      if (Math.abs(q) < 0.01) {
        readout.set('<span class="warn">q = 0：不受洛伦兹力，粒子做匀速直线运动。</span>');
        return;
      }
      // 物理量（演示单位）
      const r = m * v / (Math.abs(q) * B) * 1.1;       // 视觉半径
      const T = 2 * Math.PI * m / (Math.abs(q) * B);
      const F = Math.abs(q) * v * B;
      // 圆心固定在原点，粒子绕圈；方向由 q 正负决定
      const dir = Math.sign(q);
      const P = [r * Math.cos(phase), r * Math.sin(phase)];
      // 轨迹圈
      ctx.save();
      ctx.strokeStyle = 'rgba(91,91,240,.35)'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(r) - plot.X(0)), 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      // 速度（切向，方向随旋转方向）与洛伦兹力（指向圆心）
      const tx = -Math.sin(phase) * dir, ty = Math.cos(phase) * dir;
      plot.arrow(P[0], P[1], P[0] + tx * v * 0.8, P[1] + ty * v * 0.8, { color: C.green, width: 3, label: 'v', labelDy: -8 });
      plot.arrow(P[0], P[1], P[0] - Math.cos(phase) * 1.3, P[1] - Math.sin(phase) * 1.3, { color: C.red, width: 3, label: 'F洛', labelDy: 18 });
      // 粒子
      ctx.fillStyle = q > 0 ? '#ef4444' : '#3b82f6';
      ctx.beginPath(); ctx.arc(plot.X(P[0]), plot.Y(P[1]), 11, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(q > 0 ? '+' : '−', plot.X(P[0]), plot.Y(P[1]) + 5);
      ctx.textAlign = 'left';
      readout.set(`
        洛伦兹力 F = qvB = <b>${fmtN(F,2)}</b>（演示单位）<br>
        半径 r = mv/(qB) = <b>${fmtN(m*v/(Math.abs(q)*B),3)}</b><br>
        周期 T = 2πm/(qB) = <b>${fmtN(T,3)}</b>
        <span class="tag">与 v 无关！</span><br>
        旋转方向：<b>${q > 0 ? '逆时针' : '顺时针'}</b>（左手定则，${q > 0 ? '正' : '负'}电荷）<br>
        F ⊥ v ⟹ 不做功，速率恒定 ✓`);
    }
    [sq, sm, sv, sB].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
