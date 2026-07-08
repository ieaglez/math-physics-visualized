'use strict';
/* ===== 机械能守恒（单摆） Energy Conservation ===== */
registerTopic({
  id: 'energy', cat: 'mech', icon: '⚖️',
  title: '机械能守恒（单摆）', en: 'Energy Conservation',
  desc: L('释放单摆，右侧能量条实时显示动能与势能此消彼长，总和恒定不变。',
          'Release the pendulum and watch the energy bars trade kinetic for potential — while the total never changes.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '机械能守恒（单摆）', en: 'Conservation of Mechanical Energy',
      tagline: L('盯住右侧能量条：动能（绿）+ 势能（橙）= 总机械能（紫线），永远不变。',
                 'Watch the bars: kinetic (green) + potential (orange) = total mechanical energy (purple line), forever constant.'),
      formula: L('E = E<sub>k</sub> + E<sub>p</sub> = ½mv² + mgh = 常量　·　动能定理：W<sub>合</sub> = ΔE<sub>k</sub>',
                 'E = E<sub>k</sub> + E<sub>p</sub> = ½mv² + mgh = constant　·　Work–energy theorem: W<sub>net</sub> = ΔE<sub>k</sub>'),
      explainHTML: L(`
        <h2>两种机械能 <span class="en">Two Forms of Mechanical Energy</span></h2>
        <ul>
          <li><span class="term">动能 <span class="en">(kinetic energy)</span></span>：E<sub>k</sub> = ½mv² —— 运动着就有；</li>
          <li><span class="term">重力势能 <span class="en">(gravitational potential energy)</span></span>：E<sub>p</sub> = mgh —— 位置高就有（h 以最低点为零点）。</li>
        </ul>
        <h2>机械能守恒定律 <span class="en">Conservation Law</span></h2>
        <div class="formula">只有重力（或弹力）做功时：½mv₁² + mgh₁ = ½mv₂² + mgh₂</div>
        <ul>
          <li>摆到<b>最高点</b>：速度为零，动能全部转化为势能；</li>
          <li>经过<b>最低点</b>：势能最少，速度最大 —— v = √(2gΔh)，和从同样高度自由下落一样快！</li>
          <li>守恒的条件：忽略空气阻力和摩擦。若有阻力，机械能逐渐转化为内能（热）。</li>
        </ul>
        <h2>动能定理 <span class="en">Work-Energy Theorem</span></h2>
        <div class="formula">W<sub>合</sub> = ΔE<sub>k</sub> = ½mv₂² − ½mv₁²
          <span class="note">合外力做的功 = 动能的变化 —— 比牛顿定律更省事的"能量视角"</span></div>
        <div class="tip"><b>实验建议：</b>① 把初始角度调大，最低点速度变大了吗？读数里 v = √(2gΔh) 是否吻合；② 观察能量条：两端全是橙色（势能），最低点绿色（动能）最多，但总长度从不变化；③ 改变质量 m，摆动快慢变了吗？（不变 —— 能量都和 m 成正比，约掉了。）</div>
        <div class="think"><b>思考一下：</b>过山车第一个坡为什么必须最高？如果中途有个坡比起点还高，会发生什么？</div>
      `, `
        <h2>Two Forms of Mechanical Energy <span class="en">两种机械能</span></h2>
        <ul>
          <li><span class="term">Kinetic energy <span class="en">(动能)</span></span>: E<sub>k</sub> = ½mv² — anything moving has it;</li>
          <li><span class="term">Gravitational potential energy <span class="en">(重力势能)</span></span>: E<sub>p</sub> = mgh — anything raised has it (h measured from the lowest point).</li>
        </ul>
        <h2>Conservation of Mechanical Energy <span class="en">机械能守恒定律</span></h2>
        <div class="formula">When only gravity (or a spring) does work:　½mv₁² + mgh₁ = ½mv₂² + mgh₂</div>
        <ul>
          <li>At the <b>highest point</b>: v = 0 — all kinetic energy has become potential;</li>
          <li>Through the <b>lowest point</b>: least potential, greatest speed — v = √(2gΔh), exactly as fast as free fall from that height!</li>
          <li>Conditions: neglect air resistance and friction. With resistance, mechanical energy gradually turns into heat.</li>
        </ul>
        <h2>Work–Energy Theorem <span class="en">动能定理</span></h2>
        <div class="formula">W<sub>net</sub> = ΔE<sub>k</sub> = ½mv₂² − ½mv₁²
          <span class="note">The net work equals the change in kinetic energy — often a shortcut past Newton's laws</span></div>
        <div class="tip"><b>Try this:</b> ① Increase the release angle — does the speed at the bottom grow? Check v = √(2gΔh) in the readout; ② Watch the bars: all orange at the ends, most green at the bottom, total length never changes; ③ Change the mass m — does the swing speed change? (No — every energy term is proportional to m, so it cancels.)</div>
        <div class="think"><b>Think about it:</b> Why must a roller coaster's first hill be the tallest? What happens if a later hill is taller than the start?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 470);
    const sL = addSlider(panel, { label: L('摆长 L', 'Length L'), en: L('length', '摆长'), min: 1, max: 3, step: 0.1, value: 2, unit: 'm' });
    const sth0 = addSlider(panel, { label: L('初始角度 θ₀', 'Release angle θ₀'), en: L('initial angle', '初始角度'), min: 10, max: 75, step: 1, value: 50, unit: '°' });
    const sm = addSlider(panel, { label: L('质量 m', 'Mass m'), en: L('mass', '质量'), min: 0.5, max: 3, step: 0.1, value: 1, unit: 'kg' });
    const readout = addReadout(panel);
    const g = 9.8;
    let th = sth0.value * DEG, om = 0; // 摆角与角速度（物理积分）
    const anim = makeAnimator(dt => {
      // 半隐式欧拉，子步提高精度
      const n = 8, h = dt / n;
      for (let i = 0; i < n; i++) {
        om += -(g / sL.value) * Math.sin(th) * h;
        th += om * h;
      }
      draw();
    });
    addPlayControls(panel, anim, { onReset: () => { th = sth0.value * DEG; om = 0; draw(); } });
    function resetState() { th = sth0.value * DEG; om = 0; }

    function draw() {
      const L = sL.value, m = sm.value, th0 = sth0.value * DEG;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 左：单摆 ——
      const px = W * 0.36, py = 64;
      const scale = (H - 140) / 3.2; // m→px
      const bx = px + Math.sin(th) * L * scale, by = py + Math.cos(th) * L * scale;
      // 天花板
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(px - 70, py); ctx.lineTo(px + 70, py); ctx.stroke();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
      for (let i = -60; i <= 60; i += 15) {
        ctx.beginPath(); ctx.moveTo(px + i, py); ctx.lineTo(px + i - 8, py - 9); ctx.stroke();
      }
      // 初始角与轨迹弧
      ctx.save();
      ctx.strokeStyle = '#e2e5f5'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(px, py, L * scale, Math.PI / 2 - th0, Math.PI / 2 + th0); ctx.stroke();
      ctx.restore();
      // 最低点参考线（势能零点）
      ctx.strokeStyle = '#fde68a'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(px - 110, py + L * scale); ctx.lineTo(px + 130, py + L * scale); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#b45309'; ctx.font = '11px sans-serif';
      ctx.fillText(L('h = 0（势能零点）', 'h = 0 (PE reference)'), px + 70, py + L * scale + 16);
      // 摆线 + 球
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke();
      const v = Math.abs(om) * L;
      ctx.fillStyle = C.blue;
      ctx.beginPath(); ctx.arc(bx, by, 13 + m * 2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      // 速度箭头
      if (v > 0.15) {
        const dir = Math.sign(om);
        pxArrow(ctx, bx, by, bx + Math.cos(th) * dir * v * 14, by - Math.sin(th) * dir * v * 14,
          { color: C.green, width: 2.6, label: 'v', labelDy: -6 });
      }
      // —— 右：能量条 ——
      const h0 = L * (1 - Math.cos(th));        // 当前高度
      const Ep = m * g * h0;
      const Ek = 0.5 * m * v * v;
      const E0 = m * g * L * (1 - Math.cos(th0)); // 总机械能
      const barX = W - 170, barW = 46, barB = H - 50, barH = H - 130;
      const sE = barH / Math.max(E0, 0.001);
      ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      [[0, Ek, '#22c55e', L('动能 Eₖ', 'Kinetic Eₖ')], [1, Ep, '#fb923c', L('势能 Eₚ', 'Potential Eₚ')]].forEach(([i, E, col, lb]) => {
        const x = barX + i * (barW + 30);
        ctx.fillStyle = '#f1f2fa';
        ctx.fillRect(x, barB - barH, barW, barH);
        ctx.fillStyle = col;
        ctx.fillRect(x, barB - E * sE, barW, E * sE);
        ctx.fillStyle = '#454c63';
        ctx.fillText(lb, x + barW / 2, barB + 18);
        ctx.fillText(fmtN(E, 1) + ' J', x + barW / 2, barB - E * sE - 7);
      });
      // 总能量线
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(barX - 16, barB - E0 * sE); ctx.lineTo(barX + barW * 2 + 46, barB - E0 * sE); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.purple;
      ctx.fillText(L('总机械能 E = ', 'Total E = ') + fmtN(E0, 1) + ' J', barX + barW + 15, barB - E0 * sE - 8);
      ctx.textAlign = 'left';
      const vMax = Math.sqrt(2 * g * L * (1 - Math.cos(th0)));
      readout.set(L(`
        当前摆角 θ = <b>${fmtN(th / DEG,1)}°</b>，高度 h = <b>${fmtN(h0,3)} m</b><br>
        动能 Eₖ = ½mv² = <b>${fmtN(Ek,2)} J</b><br>
        势能 Eₚ = mgh = <b>${fmtN(Ep,2)} J</b><br>
        Eₖ + Eₚ = <b style="color:${C.purple}">${fmtN(Ek + Ep,2)} J</b> ≈ E = ${fmtN(E0,2)} J ✓<br>
        最低点速度 v<sub>max</sub> = √(2gΔh) = <b>${fmtN(vMax,2)} m/s</b><br>
        当前速度 v = <b>${fmtN(v,2)} m/s</b>`, `
        Current angle θ = <b>${fmtN(th / DEG,1)}°</b>, height h = <b>${fmtN(h0,3)} m</b><br>
        Kinetic Eₖ = ½mv² = <b>${fmtN(Ek,2)} J</b><br>
        Potential Eₚ = mgh = <b>${fmtN(Ep,2)} J</b><br>
        Eₖ + Eₚ = <b style="color:${C.purple}">${fmtN(Ek + Ep,2)} J</b> ≈ E = ${fmtN(E0,2)} J ✓<br>
        Speed at the bottom v<sub>max</sub> = √(2gΔh) = <b>${fmtN(vMax,2)} m/s</b><br>
        Current speed v = <b>${fmtN(v,2)} m/s</b>`));
    }
    sL.onChange(() => { resetState(); draw(); });
    sth0.onChange(() => { resetState(); draw(); });
    sm.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
