'use strict';
/* ===== 动量与碰撞 Momentum & Collisions ===== */
registerTopic({
  id: 'momentum', cat: 'mech', icon: '🎱',
  title: '动量守恒与碰撞', en: 'Momentum & Collisions',
  desc: L('设置两个滑块的质量和速度，播放碰撞，验证动量守恒；对比弹性与完全非弹性碰撞。',
          'Set two carts\' masses and velocities, play the collision, verify momentum conservation, and compare elastic vs. perfectly inelastic.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '动量守恒与碰撞', en: 'Conservation of Momentum & Collisions',
      tagline: L('碰撞前后总动量永远相等；但动能只有弹性碰撞才守恒 —— 切换模式对比一下。',
                 'Total momentum is always the same before and after; kinetic energy survives only in elastic collisions — switch modes to compare.'),
      formula: L('p = mv　·　m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′（系统不受外力时恒成立）',
                 'p = mv　·　m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′ (holds whenever no external force acts)'),
      explainHTML: L(`
        <h2>动量与冲量 <span class="en">Momentum & Impulse</span></h2>
        <div class="formula">动量 p = mv（矢量）　　冲量 I = Ft = Δp（动量定理）</div>
        <p>动量描述"运动的量"：卡车慢速行驶可能比子弹的动量还大。安全气囊的原理就是动量定理：Δp 一定时，延长作用时间 t，冲击力 F 就小。</p>
        <h2>动量守恒定律 <span class="en">Conservation of Momentum</span></h2>
        <div class="formula">m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′
          <span class="note">条件：系统不受外力或合外力为零 —— 碰撞瞬间内力再大也不影响总动量</span></div>
        <h2>两类典型碰撞 <span class="en">Types of Collisions</span></h2>
        <ul>
          <li><span class="term">弹性碰撞 <span class="en">(elastic collision)</span></span>：动量守恒 <b>且</b> 动能守恒。等质量弹性碰撞会"交换速度"（台球！）；</li>
          <li><span class="term">完全非弹性碰撞 <span class="en">(perfectly inelastic)</span></span>：碰后粘在一起，动量守恒但动能损失最大（损失的动能变成形变和热）；</li>
          <li>所有真实碰撞介于两者之间。</li>
        </ul>
        <div class="formula">弹性碰撞结果：v₁′ = <span class="frac"><span>(m₁−m₂)v₁ + 2m₂v₂</span><span class="den">m₁+m₂</span></span>　　v₂′ = <span class="frac"><span>(m₂−m₁)v₂ + 2m₁v₁</span><span class="den">m₁+m₂</span></span></div>
        <div class="tip"><b>实验建议：</b>① 设 m₁ = m₂、v₂ = 0，弹性碰撞 → 完美交换速度（打台球的"定杆"）；② 让重球撞静止轻球，轻球以近 2 倍速度飞出；③ 切到完全非弹性，看读数：动量依旧守恒，动能却损失了 —— 损失了多少？</div>
        <div class="think"><b>思考一下：</b>火箭没有任何东西可"蹬"，靠什么前进？（提示：向后喷气，系统总动量守恒。）</div>
      `, `
        <h2>Momentum &amp; Impulse <span class="en">动量与冲量</span></h2>
        <div class="formula">Momentum p = mv (a vector)　　Impulse I = Ft = Δp (impulse–momentum theorem)</div>
        <p>Momentum measures "quantity of motion": a slow truck can out-momentum a bullet. Airbags exploit the impulse theorem: for a fixed Δp, stretching the time t shrinks the force F.</p>
        <h2>Conservation of Momentum <span class="en">动量守恒定律</span></h2>
        <div class="formula">m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′
          <span class="note">Condition: no external force (or zero net force) on the system — however violent the internal collision forces are</span></div>
        <h2>Two Standard Collisions <span class="en">两类典型碰撞</span></h2>
        <ul>
          <li><span class="term">Elastic collision <span class="en">(弹性碰撞)</span></span>: momentum <b>and</b> kinetic energy conserved. Equal masses swap velocities (billiards!);</li>
          <li><span class="term">Perfectly inelastic <span class="en">(完全非弹性)</span></span>: the objects stick together — momentum conserved, maximum kinetic-energy loss (turned into deformation and heat);</li>
          <li>Every real collision lies between these extremes.</li>
        </ul>
        <div class="formula">Elastic result: v₁′ = <span class="frac"><span>(m₁−m₂)v₁ + 2m₂v₂</span><span class="den">m₁+m₂</span></span>　　v₂′ = <span class="frac"><span>(m₂−m₁)v₂ + 2m₁v₁</span><span class="den">m₁+m₂</span></span></div>
        <div class="tip"><b>Try this:</b> ① Set m₁ = m₂, v₂ = 0, elastic → a perfect velocity swap (the billiard "stop shot"); ② Let a heavy cart hit a light one at rest — the light one flies off at nearly double speed; ③ Switch to perfectly inelastic: momentum still balances, but how much kinetic energy vanished?</div>
        <div class="think"><b>Think about it:</b> A rocket has nothing to push against — how does it accelerate? (Hint: eject gas backwards; the system's total momentum is conserved.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 380);
    const mode = addSeg(panel, {
      options: [
        { label: L('弹性碰撞', 'Elastic'), value: 'elastic' },
        { label: L('完全非弹性', 'Perfectly inelastic'), value: 'inelastic' }
      ],
      value: 'elastic', onChange: () => { reset(); draw(); }
    });
    const sm1 = addSlider(panel, { label: L('质量 m₁（蓝）', 'Mass m₁ (blue)'), en: L('mass', '质量'), min: 0.5, max: 6, step: 0.5, value: 2, unit: 'kg' });
    const sv1 = addSlider(panel, { label: L('初速度 v₁', 'Initial v₁'), en: L('velocity', '初速度'), min: -4, max: 6, step: 0.5, value: 4, unit: 'm/s' });
    const sm2 = addSlider(panel, { label: L('质量 m₂（红）', 'Mass m₂ (red)'), en: L('mass', '质量'), min: 0.5, max: 6, step: 0.5, value: 3, unit: 'kg' });
    const sv2 = addSlider(panel, { label: L('初速度 v₂', 'Initial v₂'), en: L('velocity', '初速度'), min: -4, max: 6, step: 0.5, value: 0, unit: 'm/s' });
    const readout = addReadout(panel);

    // 状态：位置（米），跑道 0~20m，碰撞检测
    let x1, x2, u1, u2, collided;
    function reset() {
      x1 = 4; x2 = 13; collided = false;
      u1 = sv1.value; u2 = sv2.value;
    }
    function postVelocities() {
      const m1 = sm1.value, m2 = sm2.value, v1 = sv1.value, v2 = sv2.value;
      if (mode.value === 'elastic') {
        return [((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2),
                ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)];
      }
      const v = (m1 * v1 + m2 * v2) / (m1 + m2);
      return [v, v];
    }
    const anim = makeAnimator(dt => {
      const w1 = 0.5 + sm1.value * 0.13, w2 = 0.5 + sm2.value * 0.13; // 半宽（米）
      x1 += u1 * dt; x2 += u2 * dt;
      if (!collided && x2 - x1 <= w1 + w2 && u1 > u2) {
        collided = true;
        [u1, u2] = postVelocities();
        x1 = x2 - (w1 + w2);
      }
      if (x1 < -2 && u1 < 0 && x2 > 22 && u2 > 0) anim.stop();
      if ((x1 < -3 || x1 > 24) && (x2 < -3 || x2 > 24)) anim.stop();
      draw();
    });
    addPlayControls(panel, anim, { onReset: () => { reset(); draw(); } });

    function draw() {
      const m1 = sm1.value, m2 = sm2.value;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const pad = 30, SX = m => pad + m / 20 * (W - 2 * pad);
      const laneY = H * 0.42;
      // 轨道
      ctx.strokeStyle = '#dfe3f0'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(pad - 14, laneY + 24); ctx.lineTo(W - pad + 14, laneY + 24); ctx.stroke();
      // 两个滑块
      const blocks = [
        [x1, m1, '#3b82f6', '#1e40af', u1, 'm₁'],
        [x2, m2, '#ef4444', '#991b1b', u2, 'm₂']
      ];
      blocks.forEach(([x, m, col, col2, u, lb]) => {
        const bw = (0.5 + m * 0.13) * 2 / 20 * (W - 2 * pad);
        const bh = 26 + m * 5;
        const X = SX(x);
        ctx.fillStyle = col;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(X - bw / 2, laneY + 24 - bh, bw, bh, 6); else ctx.rect(X - bw / 2, laneY + 24 - bh, bw, bh);
        ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lb + '=' + fmtN(m, 1), X, laneY + 24 - bh / 2 + 4);
        if (Math.abs(u) > 0.05) {
          pxArrow(ctx, X, laneY + 24 - bh - 14, X + u * 16, laneY + 24 - bh - 14,
            { color: col2, width: 2.6, label: fmtN(u, 2) + ' m/s', labelDx: u > 0 ? 4 : -64, labelDy: -6 });
        }
        ctx.textAlign = 'left';
      });
      // —— 动量条（碰前 vs 当前）——
      const p0 = m1 * sv1.value + m2 * sv2.value;
      const pNow = m1 * u1 + m2 * u2;
      const Ek0 = 0.5 * m1 * sv1.value ** 2 + 0.5 * m2 * sv2.value ** 2;
      const EkNow = 0.5 * m1 * u1 ** 2 + 0.5 * m2 * u2 ** 2;
      const by = H - 64, bh = 16, cx0 = W / 2, pScale = (W * 0.4) / Math.max(Math.abs(p0), 8);
      ctx.font = '11.5px sans-serif';
      [[by, p0, L('碰撞前总动量 p₀', 'Total momentum before, p₀'), '#94a3b8'], [by + 26, pNow, L('当前总动量 p', 'Total momentum now, p'), C.purple]].forEach(([y, p, lb, col]) => {
        ctx.fillStyle = '#f1f2fa'; ctx.fillRect(cx0 - W * 0.42, y, W * 0.84, bh);
        ctx.fillStyle = col;
        const w = p * pScale;
        ctx.fillRect(w >= 0 ? cx0 : cx0 + w, y, Math.abs(w), bh);
        ctx.fillStyle = '#454c63';
        ctx.fillText(`${lb} = ${fmtN(p, 2)} kg·m/s`, cx0 - W * 0.42, y - 4);
      });
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath(); ctx.moveTo(cx0, by - 4); ctx.lineTo(cx0, by + 46); ctx.stroke();
      readout.set(L(`
        碰撞前：p₀ = <b>${fmtN(p0,2)}</b> kg·m/s，Eₖ = <b>${fmtN(Ek0,2)} J</b><br>
        当前：p = <b>${fmtN(pNow,2)}</b> kg·m/s，Eₖ = <b>${fmtN(EkNow,2)} J</b><br>
        动量守恒：<b>${Math.abs(p0 - pNow) < 0.01 ? '✓ 成立' : '—'}</b><br>
        ${collided
          ? (mode.value === 'elastic'
            ? '<span class="tag">弹性碰撞：动能也守恒 ✓</span>'
            : `<span class="tag">完全非弹性：动能损失 ${fmtN(Ek0 - EkNow,2)} J</span>`)
          : '点击播放，等待碰撞…'}<br>
        碰后理论速度：v₁′ = <b>${fmtN(postVelocities()[0],2)}</b>，v₂′ = <b>${fmtN(postVelocities()[1],2)}</b> m/s`, `
        Before: p₀ = <b>${fmtN(p0,2)}</b> kg·m/s, Eₖ = <b>${fmtN(Ek0,2)} J</b><br>
        Now: p = <b>${fmtN(pNow,2)}</b> kg·m/s, Eₖ = <b>${fmtN(EkNow,2)} J</b><br>
        Momentum conserved: <b>${Math.abs(p0 - pNow) < 0.01 ? '✓ yes' : '—'}</b><br>
        ${collided
          ? (mode.value === 'elastic'
            ? '<span class="tag">Elastic: kinetic energy conserved too ✓</span>'
            : `<span class="tag">Perfectly inelastic: Eₖ lost = ${fmtN(Ek0 - EkNow,2)} J</span>`)
          : 'Press Play and wait for the collision…'}<br>
        Predicted final velocities: v₁′ = <b>${fmtN(postVelocities()[0],2)}</b>, v₂′ = <b>${fmtN(postVelocities()[1],2)}</b> m/s`));
    }
    [sm1, sv1, sm2, sv2].forEach(s => s.onChange(() => { anim.stop(); reset(); draw(); }));
    cv.onResize(draw);
    reset();
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
