'use strict';
/* ===== 杠杆原理 The Lever（初中） ===== */
registerTopic({
  id: 'lever', cat: 'mech', icon: '⚖️', stage: 'junior',
  title: '杠杆原理', en: 'The Lever',
  desc: L('调节两边的力和力臂，找到让杠杆平衡的条件 —— "给我一个支点，我能撬动地球"。',
          'Adjust the forces and arms on both sides to find the balance condition — "Give me a place to stand and I will move the Earth."'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '杠杆原理', en: 'The Lever & the Law of Moments',
      tagline: L('左边挂重物，右边施力。力 × 力臂两边相等时，杠杆纹丝不动 —— 失衡则向大的一边倾斜。',
                 'A load on the left, your effort on the right. When force × arm matches on both sides the lever holds still — otherwise it tips toward the bigger side.'),
      formula: L('杠杆平衡：F₁·L₁ = F₂·L₂（动力×动力臂 = 阻力×阻力臂）',
                 'Lever balance: F₁·L₁ = F₂·L₂ (effort × effort arm = load × load arm)'),
      explainHTML: L(`
        <h2>杠杆五要素 <span class="en">Anatomy of a Lever</span></h2>
        <ul>
          <li><span class="term">支点 <span class="en">(fulcrum)</span></span>：杠杆绕着转动的固定点 O；</li>
          <li><span class="term">动力/阻力 <span class="en">(effort / load)</span></span>：使杠杆转动的力和阻碍它的力；</li>
          <li><span class="term">力臂 <span class="en">(moment arm)</span></span>：支点到<b>力的作用线</b>的垂直距离 —— 不是到作用点的距离！</li>
        </ul>
        <h2>杠杆平衡条件 <span class="en">The Law of the Lever</span></h2>
        <div class="formula">F₁ · L₁ = F₂ · L₂
          <span class="note">阿基米德总结于两千多年前 —— 力可以小，只要力臂足够长</span></div>
        <ul>
          <li><b>省力杠杆</b>（L动 &gt; L阻）：撬棍、开瓶器、老虎钳 —— 省力但费距离；</li>
          <li><b>费力杠杆</b>（L动 &lt; L阻）：镊子、鱼竿、筷子 —— 费力但省距离、动作灵巧；</li>
          <li><b>等臂杠杆</b>（L动 = L阻）：天平 —— 不省力不费力，用来比较。</li>
        </ul>
        <p>高中的<span class="term">力矩 <span class="en">(torque)</span></span> M = F·L 就是这个思想的正式版本；圆周运动、转动平衡都会再次遇到它。</p>
        <div class="tip"><b>实验建议：</b>① 左边挂 20 N 在 0.4 m 处，右边只用 10 N —— 把力臂调到多长才能平衡？（0.8 m：力减半，臂加倍）；② 试着做一个"等臂天平"（两边力和力臂都相等）；③ 观察失衡时的倾斜方向：永远倒向"力×力臂"更大的一边。</div>
        <div class="think"><b>思考一下：</b>用瓶起子开汽水瓶盖，支点在哪里？动力臂大约是阻力臂的几倍？所以手上只需多大的力？</div>
      `, `
        <h2>Anatomy of a Lever <span class="en">杠杆五要素</span></h2>
        <ul>
          <li><span class="term">Fulcrum <span class="en">(支点)</span></span>: the fixed point O the lever pivots about;</li>
          <li><span class="term">Effort / load <span class="en">(动力/阻力)</span></span>: the force that turns the lever and the force resisting it;</li>
          <li><span class="term">Moment arm <span class="en">(力臂)</span></span>: the perpendicular distance from the fulcrum to the force's <b>line of action</b> — not to its point of application!</li>
        </ul>
        <h2>The Law of the Lever <span class="en">杠杆平衡条件</span></h2>
        <div class="formula">F₁ · L₁ = F₂ · L₂
          <span class="note">Archimedes wrote it down two millennia ago — a small force wins if its arm is long enough</span></div>
        <ul>
          <li><b>Force-saving levers</b> (effort arm longer): crowbars, bottle openers, pliers — less force, more distance;</li>
          <li><b>Distance-saving levers</b> (effort arm shorter): tweezers, fishing rods, chopsticks — more force, but nimble;</li>
          <li><b>Equal-arm levers</b>: the balance scale — neither saves force nor distance; it compares.</li>
        </ul>
        <p>High-school <span class="term">torque <span class="en">(力矩)</span></span> M = F·L is the formal version of this very idea — it returns in rotation and equilibrium.</p>
        <div class="tip"><b>Try this:</b> ① Hang 20 N at 0.4 m on the left and use only 10 N on the right — how long must the arm be to balance? (0.8 m: half the force, double the arm.) ② Build an "equal-arm balance" (same force and arm both sides); ③ When unbalanced, note the tilt: always toward the side with the larger force × arm.</div>
        <div class="think"><b>Think about it:</b> Opening a soda bottle with an opener — where is the fulcrum? Roughly how many times longer is the effort arm than the load arm, and so how little force does your hand need?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sF1 = addSlider(panel, { label: L('左侧重物 F₁', 'Left load F₁'), en: L('load', '阻力'), min: 2, max: 30, step: 1, value: 20, unit: 'N' });
    const sL1 = addSlider(panel, { label: L('左力臂 L₁', 'Left arm L₁'), en: L('arm', '力臂'), min: 0.1, max: 1, step: 0.05, value: 0.4, unit: 'm' });
    const sF2 = addSlider(panel, { label: L('右侧施力 F₂', 'Right effort F₂'), en: L('effort', '动力'), min: 2, max: 30, step: 1, value: 10, unit: 'N' });
    const sL2 = addSlider(panel, { label: L('右力臂 L₂', 'Right arm L₂'), en: L('arm', '力臂'), min: 0.1, max: 1, step: 0.05, value: 0.8, unit: 'm' });
    const readout = addReadout(panel);

    function draw() {
      const F1 = sF1.value, arm1 = sL1.value, F2 = sF2.value, arm2 = sL2.value;
      const M1 = F1 * arm1, M2 = F2 * arm2;
      const balanced = Math.abs(M1 - M2) < 0.15;
      // 倾角：与力矩差成比例，限制 ±10°
      const tilt = balanced ? 0 : Math.max(-10, Math.min(10, (M1 - M2) * 2.2)) * DEG;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.52;
      const scale = (W * 0.38) / 1.0;  // 米 → 像素
      // 支点（三角形）
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(cx, cy); ctx.lineTo(cx - 26, cy + 52); ctx.lineTo(cx + 26, cy + 52);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#475569'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('O', cx, cy + 46);
      ctx.textAlign = 'left';
      // 杠杆（旋转 tilt，左端向下为正 tilt）
      const dirX = Math.cos(tilt), dirY = Math.sin(tilt);
      const beamHalf = scale * 1.06;
      ctx.strokeStyle = '#b45309'; ctx.lineWidth = 9; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx - beamHalf * dirX, cy + beamHalf * dirY);
      ctx.lineTo(cx + beamHalf * dirX, cy - beamHalf * dirY);
      ctx.stroke();
      ctx.lineCap = 'butt';
      // 刻度点（每 0.2 m）
      ctx.fillStyle = '#fde68a';
      for (let m = -1; m <= 1.001; m += 0.2) {
        if (Math.abs(m) < 0.01) continue;
        ctx.beginPath();
        ctx.arc(cx + m * scale * dirX, cy - m * scale * dirY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // 左侧重物（挂在 −arm1 处）
      const lx = cx - arm1 * scale * dirX, ly = cy + arm1 * scale * dirY;
      const bs = 16 + F1 * 1.1;
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx, ly + 26); ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(lx - bs / 2, ly + 26, bs, bs, 4); else ctx.rect(lx - bs / 2, ly + 26, bs, bs);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#7c2d12'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(fmtN(F1, 0) + 'N', lx, ly + 26 + bs / 2 + 4);
      ctx.textAlign = 'left';
      // 右侧施力（在 +arm2 处，向下的手指力箭头）
      const rx = cx + arm2 * scale * dirX, ry = cy - arm2 * scale * dirY;
      pxArrow(ctx, rx, ry - 14 - F2 * 2.2, rx, ry - 8, { color: C.green, width: 3.2, label: 'F₂ = ' + fmtN(F2, 0) + ' N', labelDx: 8, labelDy: -6 });
      // 力臂标注
      ctx.strokeStyle = C.purple; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(cx, cy + 68); ctx.lineTo(lx, cy + 68); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy + 84); ctx.lineTo(rx, cy + 84); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.purple; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('L₁ = ' + fmtN(arm1, 2) + ' m', (cx + lx) / 2, cy + 64);
      ctx.fillText('L₂ = ' + fmtN(arm2, 2) + ' m', (cx + rx) / 2, cy + 98);
      ctx.textAlign = 'left';
      const kind = arm2 > arm1 + 0.001 ? L('省力杠杆（L₂ > L₁）', 'force-saving lever (L₂ > L₁)') :
                   arm2 < arm1 - 0.001 ? L('费力杠杆（L₂ < L₁）', 'distance-saving lever (L₂ < L₁)') :
                   L('等臂杠杆（像天平）', 'equal-arm lever (like a balance)');
      readout.set(L(`
        左力矩 F₁L₁ = ${fmtN(F1,0)} × ${fmtN(arm1,2)} = <b>${fmtN(M1,2)} N·m</b><br>
        右力矩 F₂L₂ = ${fmtN(F2,0)} × ${fmtN(arm2,2)} = <b>${fmtN(M2,2)} N·m</b><br>
        ${balanced
          ? '<span class="tag">✓ 平衡！F₁L₁ = F₂L₂</span>'
          : `<span class="warn">失衡：向${M1 > M2 ? '左' : '右'}倾斜</span>（差 ${fmtN(Math.abs(M1-M2),2)} N·m）`}<br>
        平衡所需 F₂ = F₁L₁/L₂ = <b>${fmtN(M1 / arm2,1)} N</b><br>
        <span class="tag">${kind}</span>`, `
        Left moment F₁L₁ = ${fmtN(F1,0)} × ${fmtN(arm1,2)} = <b>${fmtN(M1,2)} N·m</b><br>
        Right moment F₂L₂ = ${fmtN(F2,0)} × ${fmtN(arm2,2)} = <b>${fmtN(M2,2)} N·m</b><br>
        ${balanced
          ? '<span class="tag">✓ Balanced! F₁L₁ = F₂L₂</span>'
          : `<span class="warn">Unbalanced: tips ${M1 > M2 ? 'left' : 'right'}</span> (off by ${fmtN(Math.abs(M1-M2),2)} N·m)`}<br>
        Effort needed to balance: F₂ = F₁L₁/L₂ = <b>${fmtN(M1 / arm2,1)} N</b><br>
        <span class="tag">${kind}</span>`));
    }
    [sF1, sL1, sF2, sL2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
