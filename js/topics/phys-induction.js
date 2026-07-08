'use strict';
/* ===== 电磁感应 Electromagnetic Induction ===== */
registerTopic({
  id: 'induction', cat: 'optics', icon: '⚙️',
  title: '电磁感应', en: 'EM Induction',
  desc: L('拖动导体棒在磁场中切割磁感线，观察感应电动势和感应电流如何产生。',
          'Slide a conducting rod through a magnetic field and watch an EMF and induced current appear.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '电磁感应（导轨模型）', en: 'Electromagnetic Induction',
      tagline: L('导体棒向右滑动，回路面积增大、磁通量增加 —— 感应电流随之出现。这就是发电机的原理。',
                 'The rod slides right, the loop\'s area grows, flux increases — and an induced current appears. That is a generator.'),
      formula: L('ε = BLv　·　ε = <span class="frac"><span>ΔΦ</span><span class="den">Δt</span></span>（法拉第定律）　·　I = <span class="frac"><span>ε</span><span class="den">R</span></span>',
                 'ε = BLv　·　ε = <span class="frac"><span>ΔΦ</span><span class="den">Δt</span></span> (Faraday\'s law)　·　I = <span class="frac"><span>ε</span><span class="den">R</span></span>'),
      explainHTML: L(`
        <h2>法拉第电磁感应定律 <span class="en">Faraday's Law</span></h2>
        <p>穿过闭合回路的<span class="term">磁通量 <span class="en">(magnetic flux)</span></span> Φ = B·S 发生变化时，回路中产生<span class="term">感应电动势 <span class="en">(induced EMF)</span></span>：</p>
        <div class="formula">ε = <span class="frac"><span>ΔΦ</span><span class="den">Δt</span></span>
          <span class="note">磁通量变化得越快，电动势越大</span></div>
        <p>对“导体棒切割磁感线”这一经典模型（本实验）：</p>
        <div class="formula">ε = BLv　　I = <span class="frac"><span>ε</span><span class="den">R</span></span> = <span class="frac"><span>BLv</span><span class="den">R</span></span>
          <span class="note">L 是棒的有效长度，v 是切割速度</span></div>
        <h2>楞次定律 <span class="en">Lenz's Law</span></h2>
        <p>感应电流的方向，总是使它产生的磁场<b>阻碍</b>原磁通量的变化 —— “增反减同”。</p>
        <ul>
          <li>本实验中面积增大、向里的磁通增加 ⟹ 感应电流逆时针（产生向外的磁场来抵抗）；</li>
          <li>于是棒受到向左的<span class="term">安培力 <span class="en">(Ampère force)</span></span> F = BIL，<b>阻碍棒的运动</b>；</li>
          <li>能量视角：你必须克服安培力做功，机械能才转化为电能 —— 楞次定律本质上是<b>能量守恒</b>。</li>
        </ul>
        <h2>这就是发电机 <span class="en">This is a Generator</span></h2>
        <p>水电站、风机、火电厂……一切发电机的核心都是“让导体相对磁场运动”。反过来，给导线通电让它在磁场中受力运动，就是电动机 (motor)。</p>
        <div class="tip"><b>实验建议：</b>① 把速度 v 调到 0：磁通量不变化，电流立刻消失 —— "动"才有电；② 把 B 或 L 翻倍，ε 同步翻倍；③ 观察安培力方向始终与 v 相反（楞次定律的"阻碍"），想想如果方向相同会怎样？（永动机！）</div>
        <div class="think"><b>思考一下：</b>磁铁插入线圈和拔出线圈，感应电流方向相同吗？手机的无线充电用的是什么原理？</div>
      `, `
        <h2>Faraday's Law <span class="en">法拉第电磁感应定律</span></h2>
        <p>When the <span class="term">magnetic flux <span class="en">(磁通量)</span></span> Φ = B·S through a closed loop changes, an
        <span class="term">induced EMF <span class="en">(感应电动势)</span></span> appears:</p>
        <div class="formula">ε = <span class="frac"><span>ΔΦ</span><span class="den">Δt</span></span>
          <span class="note">The faster the flux changes, the larger the EMF</span></div>
        <p>For the classic "rod cutting field lines" setup (this experiment):</p>
        <div class="formula">ε = BLv　　I = <span class="frac"><span>ε</span><span class="den">R</span></span> = <span class="frac"><span>BLv</span><span class="den">R</span></span>
          <span class="note">L is the rod's effective length, v its speed</span></div>
        <h2>Lenz's Law <span class="en">楞次定律</span></h2>
        <p>The induced current always flows so that its own magnetic field <b>opposes</b> the change in flux — "resist the change".</p>
        <ul>
          <li>Here the area grows and the into-screen flux increases ⟹ the induced current runs counterclockwise (making an out-of-screen field to fight back);</li>
          <li>The rod therefore feels a leftward <span class="term">Ampère force <span class="en">(安培力)</span></span> F = BIL that <b>opposes its motion</b>;</li>
          <li>Energy view: you must do work against that force — mechanical energy becomes electrical energy. Lenz's law is really <b>conservation of energy</b>.</li>
        </ul>
        <h2>This Is a Generator <span class="en">这就是发电机</span></h2>
        <p>Hydro, wind, thermal plants… every generator's core is "move a conductor relative to a magnetic field". Run it backwards — current in a field feels a force — and you have a motor.</p>
        <div class="tip"><b>Try this:</b> ① Set v to 0: the flux stops changing and the current vanishes — no motion, no electricity; ② Double B or L and watch ε double; ③ Note that the Ampère force always opposes v (Lenz's "resistance") — what would happen if it helped instead? (A perpetual-motion machine!)</div>
        <div class="think"><b>Think about it:</b> Does the induced current flow the same way when a magnet is pushed into a coil vs. pulled out? What principle powers wireless phone charging?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sB = addSlider(panel, { label: L('磁感应强度 B', 'Field strength B'), en: L('field', '磁感应强度'), min: 0.2, max: 2, step: 0.05, value: 0.8, unit: 'T' });
    const sL = addSlider(panel, { label: L('导轨间距 L', 'Rail spacing L'), en: L('rail spacing', '导轨间距'), min: 0.5, max: 2, step: 0.1, value: 1, unit: 'm' });
    const sv = addSlider(panel, { label: L('棒的速度 v', 'Rod speed v'), en: L('rod speed', '棒的速度'), min: 0, max: 5, step: 0.1, value: 2.5, unit: 'm/s' });
    const sR = addSlider(panel, { label: L('回路电阻 R', 'Loop resistance R'), en: L('resistance', '电阻'), min: 0.5, max: 10, step: 0.5, value: 2, unit: 'Ω' });
    const readout = addReadout(panel);
    let rodX = 0.35; // 0~1 视觉位置
    const anim = makeAnimator(dt => {
      rodX += sv.value * dt * 0.06;
      if (rodX > 0.86) rodX = 0.18;
      draw();
    });
    addPlayControls(panel, anim, { onReset: () => { rodX = 0.35; draw(); } });
    anim.start();

    function draw() {
      const B = sB.value, L = sL.value, v = sv.value, R = sR.value;
      const eps = B * L * v, I = eps / R, F = B * I * L;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const left = 70, right = W - 50, gapPx = 90 + L * 70;
      const midY = H / 2 - 10, topY = midY - gapPx / 2, botY = midY + gapPx / 2;
      const rodPx = left + rodX * (right - left);
      // 磁场区域 ⊗
      ctx.save();
      ctx.strokeStyle = '#c9cee9'; ctx.lineWidth = 1.2;
      for (let x = left + 24; x < right; x += 52) {
        for (let y = topY + 22; y < botY; y += 46) {
          ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4);
          ctx.moveTo(x - 4, y + 4); ctx.lineTo(x + 4, y - 4);
          ctx.stroke();
        }
      }
      ctx.fillStyle = '#8b93bd'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText(window.L('B ⊗（向里）= ', 'B ⊗ (into screen) = ') + fmtN(B, 2) + ' T', left, topY - 28);
      ctx.restore();
      // 回路面积着色（磁通量）
      ctx.fillStyle = 'rgba(91,91,240,.08)';
      ctx.fillRect(left, topY, rodPx - left, botY - topY);
      // 导轨
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(left, topY); ctx.lineTo(right, topY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, botY); ctx.lineTo(right, botY); ctx.stroke();
      // 左端电阻（锯齿）
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(left, topY);
      const zn = 6, zh = 10;
      for (let i = 0; i <= zn; i++) {
        const y = topY + (botY - topY) * (0.18 + 0.64 * i / zn);
        if (i === 0) ctx.lineTo(left, topY + (botY - topY) * 0.18);
        ctx.lineTo(left + (i % 2 ? zh : -zh), y);
      }
      ctx.lineTo(left, botY - (botY - topY) * 0.0);
      ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '12px sans-serif';
      ctx.fillText('R = ' + fmtN(R, 1) + ' Ω', left - 56, midY + 4);
      // （注意：本函数内局部变量 L 遮蔽了全局 L()，故下方用 window.L）
      // 导体棒
      ctx.strokeStyle = '#d97706'; ctx.lineWidth = 8; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(rodPx, topY - 4); ctx.lineTo(rodPx, botY + 4); ctx.stroke();
      ctx.lineCap = 'butt';
      ctx.fillStyle = '#b45309'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText(window.L('导体棒 L = ', 'rod L = ') + fmtN(L, 1) + ' m', rodPx - 40, botY + 24);
      // 速度箭头 & 安培力箭头
      if (v > 0.05) {
        pxArrow(ctx, rodPx, topY - 18, rodPx + 30 + v * 9, topY - 18, { color: C.green, width: 3, label: 'v', labelDy: 4 });
        pxArrow(ctx, rodPx, midY, rodPx - 24 - F * 16, midY, { color: C.red, width: 3, label: window.L('F安(阻碍)', 'F_A (opposes)'), labelDx: -86, labelDy: -8 });
      }
      // 感应电流方向（逆时针）动画箭头
      if (I > 0.01) {
        const sp = (anim.t * 60) % 40;
        ctx.fillStyle = C.cyan;
        const drawDot = (x, y) => { ctx.beginPath(); ctx.arc(x, y, 3.2, 0, Math.PI * 2); ctx.fill(); };
        for (let x = rodPx - sp; x > left; x -= 40) drawDot(x, topY);          // 上边向左
        for (let y = topY + sp; y < botY; y += 40) drawDot(left, y);           // 左边向下
        for (let x = left + sp; x < rodPx; x += 40) drawDot(x, botY);          // 下边向右
        for (let y = botY - sp; y > topY; y -= 40) drawDot(rodPx, y);          // 棒内向上
        ctx.fillStyle = C.cyan; ctx.font = 'bold 12.5px sans-serif';
        ctx.fillText(window.L('感应电流 I（逆时针）', 'induced current I (CCW)'), (left + rodPx) / 2 - 50, botY + 24);
      }
      const Phi = B * L * (1 + rodX * 6);
      readout.set(window.L(`
        感应电动势 ε = BLv = <b>${fmtN(eps,3)} V</b><br>
        感应电流 I = ε/R = <b>${fmtN(I,3)} A</b><br>
        安培力 F = BIL = <b>${fmtN(F,3)} N</b>（方向与 v 相反）<br>
        克服安培力的功率 = 电功率 P = <b>${fmtN(F * v,3)} W</b> = I²R ✓<br>
        ${v < 0.05 ? '<span class="warn">v = 0：磁通量不变，没有感应电流！</span>' : '<span class="tag">机械能 → 电能（发电机原理）</span>'}`, `
        Induced EMF ε = BLv = <b>${fmtN(eps,3)} V</b><br>
        Induced current I = ε/R = <b>${fmtN(I,3)} A</b><br>
        Ampère force F = BIL = <b>${fmtN(F,3)} N</b> (opposing v)<br>
        Power against it = electrical power P = <b>${fmtN(F * v,3)} W</b> = I²R ✓<br>
        ${v < 0.05 ? '<span class="warn">v = 0: flux unchanged — no induced current!</span>' : '<span class="tag">mechanical → electrical energy (a generator)</span>'}`));
    }
    [sB, sL, sv, sR].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
