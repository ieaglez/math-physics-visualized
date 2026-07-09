'use strict';
/* ===== 电动机与发电机 Motor & Generator（初中） ===== */
registerTopic({
  id: 'motor', cat: 'optics', icon: '⚙️', stage: 'junior',
  title: '电动机与发电机', en: 'Motor & Generator',
  desc: L('同一个线圈装置：通电它就转（电动机），转它就发电（发电机）—— 一对互逆的兄弟。',
          'One coil, two identities: feed it current and it spins (motor); spin it and it makes current (generator) — perfect inverses.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '电动机与发电机', en: 'Motors & Generators',
      tagline: L('切换模式：电动机模式调电流看转速；发电机模式调转速看电流表 —— 能量转化方向恰好相反。',
                 'Switch modes: in motor mode set the current and watch it spin; in generator mode crank the speed and watch the ammeter — the energy flows opposite ways.'),
      formula: L('电动机：电能 → 机械能（磁场对电流的力）　·　发电机：机械能 → 电能（电磁感应）',
                 'Motor: electrical → mechanical (force on a current in a field)　·　Generator: mechanical → electrical (induction)'),
      explainHTML: L(`
        <h2>电动机：磁场推电流 <span class="en">Motor: the Field Pushes the Current</span></h2>
        <ul>
          <li>通电导线在磁场中<b>受力</b>（安培力）—— 奥斯特发现"电生磁"之后，人们反过来用磁推电；</li>
          <li>线圈两边电流方向相反 → 受力方向相反 → 形成<b>转动</b>；</li>
          <li><span class="term">换向器 <span class="en">(commutator)</span></span>：每转半圈把电流方向掉个头，让线圈一直朝同一方向转 —— 直流电动机的灵魂零件；</li>
          <li>能量转化：<b>电能 → 机械能</b>。电扇、洗衣机、电动车……电动机无处不在。</li>
        </ul>
        <h2>发电机：动生电 <span class="en">Generator: Motion Makes Current</span></h2>
        <ul>
          <li>反过来，转动磁场中的线圈，磁通量变化产生<span class="term">感应电流 <span class="en">(induced current)</span></span>（法拉第，1831）；</li>
          <li>能量转化：<b>机械能 → 电能</b>。水电站的水轮、风机的桨叶、火电厂的汽轮机，转的都是"大号线圈"；</li>
          <li>手摇发电手电筒、自行车轮"摩电灯"，就是最小号的发电机。</li>
        </ul>
        <div class="formula">同一装置，两种用法：电动机 ⇄ 发电机
          <span class="note">电动车下坡"动能回收"，正是电动机瞬间切换成发电机在充电</span></div>
        <div class="tip"><b>实验建议：</b>① 电动机模式：加大电流，转速上升；电流反向，转向反转；② 切到发电机模式：电流表读数随转速升高，停转则归零 —— "不转不发电"；③ 想一想两种模式里能量各自从哪里来、到哪里去。</div>
        <div class="think"><b>思考一下：</b>电动汽车刹车时电机变发电机给电池充电（再生制动）。为什么这样"刹车"比纯摩擦刹车省能量？</div>
      `, `
        <h2>Motor: the Field Pushes the Current <span class="en">电动机</span></h2>
        <ul>
          <li>A current-carrying wire in a magnetic field <b>feels a force</b> (the Ampère force) — after Oersted's "currents make magnetism", people ran it backwards: magnetism pushes currents;</li>
          <li>The coil's two sides carry opposite currents → opposite forces → a <b>torque</b>;</li>
          <li>The <span class="term">commutator <span class="en">(换向器)</span></span> flips the current every half turn so the coil keeps rotating one way — the soul of the DC motor;</li>
          <li>Energy: <b>electrical → mechanical</b>. Fans, washers, EVs… motors everywhere.</li>
        </ul>
        <h2>Generator: Motion Makes Current <span class="en">发电机</span></h2>
        <ul>
          <li>Run it in reverse: spinning a coil in a field changes the flux and produces an <span class="term">induced current <span class="en">(感应电流)</span></span> (Faraday, 1831);</li>
          <li>Energy: <b>mechanical → electrical</b>. Hydro turbines, wind blades and steam turbines all spin "giant coils";</li>
          <li>Hand-crank flashlights and bicycle dynamos are the tiniest generators.</li>
        </ul>
        <div class="formula">One device, two jobs: motor ⇄ generator
          <span class="note">An EV coasting downhill "recovers energy" — its motor flips into a generator and charges the battery</span></div>
        <div class="tip"><b>Try this:</b> ① Motor mode: more current, faster spin; reverse the current, reverse the spin; ② Generator mode: the ammeter climbs with crank speed and drops to zero when you stop — no spin, no power; ③ Trace the energy in each mode: where does it come from, where does it go?</div>
        <div class="think"><b>Think about it:</b> An electric car braking turns its motor into a generator that charges the battery (regenerative braking). Why does that waste less energy than friction brakes?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const mode = addSeg(panel, {
      options: [
        { label: L('⚙️ 电动机', '⚙️ Motor'), value: 'motor' },
        { label: L('💡 发电机', '💡 Generator'), value: 'gen' }
      ],
      value: 'motor', onChange: () => draw()
    });
    const sI = addSlider(panel, { label: L('电流 I（电动机模式）', 'Current I (motor mode)'), en: L('current', '电流'), min: -4, max: 4, step: 0.5, value: 2, unit: 'A' });
    const sw = addSlider(panel, { label: L('摇转速度（发电机模式）', 'Crank speed (generator mode)'), en: L('speed', '转速'), min: 0, max: 10, step: 0.5, value: 5 });
    const readout = addReadout(panel);
    let angle = 0;
    const anim = makeAnimator(dt => {
      const spd = mode.value === 'motor' ? sI.value * 1.4 : sw.value * 1.1;
      angle += spd * dt;
      draw();
    });
    addPlayControls(panel, anim, { onReset: () => { angle = 0; draw(); } });
    anim.start();

    function draw() {
      const isMotor = mode.value === 'motor';
      const I = sI.value, spd = sw.value;
      const genI = isMotor ? null : spd * 0.5;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.46;
      // 磁极
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(cx - 170, cy - 60, 44, 120);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(cx + 126, cy - 60, 44, 120);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 17px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('N', cx - 148, cy + 6);
      ctx.fillText('S', cx + 148, cy + 6);
      // 磁感线
      ctx.strokeStyle = '#c9cee9'; ctx.lineWidth = 1.4;
      [-36, 0, 36].forEach(dy2 => {
        pxArrow(ctx, cx - 122, cy + dy2, cx + 122, cy + dy2, { color: '#c9cee9', width: 1.4 });
      });
      // 旋转线圈（矩形投影：宽度随 cos 变化模拟旋转）
      const cw = 96 * Math.abs(Math.cos(angle)) + 8, ch = 76;
      ctx.strokeStyle = '#d97706'; ctx.lineWidth = 5;
      ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch);
      // 转轴
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx, cy - ch / 2 - 20); ctx.lineTo(cx, cy - ch / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy + ch / 2); ctx.lineTo(cx, cy + ch / 2 + 20); ctx.stroke();
      // 旋转方向箭头
      const spinning = isMotor ? Math.abs(I) > 0.01 : spd > 0.01;
      if (spinning) {
        const dir = (isMotor ? Math.sign(I) : 1);
        ctx.strokeStyle = C.green; ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.arc(cx, cy - ch / 2 - 20, 16, dir > 0 ? Math.PI * 0.2 : Math.PI * 0.8, dir > 0 ? Math.PI * 1.3 : Math.PI * -0.3, dir < 0);
        ctx.stroke();
      }
      // 底部：电源（电动机）或 电流表+灯泡（发电机）
      const by = H - 62;
      ctx.textAlign = 'center';
      if (isMotor) {
        ctx.font = '24px sans-serif';
        ctx.fillText('🔋', cx - 30, by + 8);
        pxArrow(ctx, cx - 8, by, cx + 40, by, { color: Math.abs(I) > 0.01 ? '#d97706' : '#c9cee9', width: 2.6, label: 'I', labelDy: -6 });
        ctx.fillStyle = '#697086'; ctx.font = '12.5px sans-serif';
        ctx.fillText(L('电能 → 机械能', 'electrical → mechanical'), cx, by + 32);
      } else {
        ctx.font = '24px sans-serif';
        ctx.fillText('🤚', cx - 60, by + 8);
        ctx.fillText(genI > 1 ? '💡' : '🔅', cx + 60, by + 8);
        // 电流表
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, by, 20, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.6;
        const na = -Math.PI / 2 + Math.min(1.2, genI / 4) * 1.2;
        ctx.beginPath(); ctx.moveTo(cx, by); ctx.lineTo(cx + 16 * Math.sin(na), by - 16 * Math.cos(na)); ctx.stroke();
        ctx.fillStyle = '#475569'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText('A', cx, by + 14);
        ctx.fillStyle = '#697086'; ctx.font = '12.5px sans-serif';
        ctx.fillText(L('机械能 → 电能', 'mechanical → electrical'), cx, by + 36);
      }
      ctx.textAlign = 'left';
      readout.set(isMotor ? L(`
        <span class="tag">电动机模式</span> 电流 I = <b>${fmtN(I,1)} A</b><br>
        ${Math.abs(I) < 0.01 ? '<span class="warn">I = 0：不转（没有安培力）</span>'
          : `线圈受安培力转动，转向：<b>${I > 0 ? '顺时针' : '逆时针'}</b>（电流反向则转向反向）`}<br>
        换向器每半圈换一次电流方向，保证持续旋转<br>
        能量：电能 → 机械能`, `
        <span class="tag">Motor mode</span> current I = <b>${fmtN(I,1)} A</b><br>
        ${Math.abs(I) < 0.01 ? '<span class="warn">I = 0: no spin (no Ampère force)</span>'
          : `The coil turns under the Ampère force, direction: <b>${I > 0 ? 'clockwise' : 'counterclockwise'}</b> (reverse the current, reverse the spin)`}<br>
        The commutator flips the current each half-turn to keep it spinning<br>
        Energy: electrical → mechanical`) : L(`
        <span class="tag">发电机模式</span> 摇转速度 = <b>${fmtN(spd,1)}</b><br>
        感应电流 ≈ <b>${fmtN(genI,1)} A</b>${spd < 0.01 ? ' <span class="warn">不转不发电！</span>' : ''}<br>
        转速越快 → 磁通量变化越快 → 电流越大（灯越亮）<br>
        能量：机械能 → 电能（法拉第电磁感应）`, `
        <span class="tag">Generator mode</span> crank speed = <b>${fmtN(spd,1)}</b><br>
        Induced current ≈ <b>${fmtN(genI,1)} A</b>${spd < 0.01 ? ' <span class="warn">no spin, no power!</span>' : ''}<br>
        Faster spin → faster flux change → bigger current (brighter bulb)<br>
        Energy: mechanical → electrical (Faraday induction)`));
    }
    [sI, sw].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
