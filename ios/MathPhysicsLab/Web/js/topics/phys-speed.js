'use strict';
/* ===== 速度与匀速直线运动 Speed（初中） ===== */
registerTopic({
  id: 'speed', cat: 'mech', icon: '🚴', stage: 'junior',
  title: '速度 v = s/t', en: 'Speed v = s/t',
  desc: L('两辆车比赛：调速度、按播放，看谁先到 —— 顺便读懂 s–t 图象里"谁陡谁快"。',
          'Two racers: set the speeds, press play, see who arrives first — and learn to read "steeper = faster" in the s–t graph.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '速度与匀速直线运动', en: 'Speed & Uniform Motion',
      tagline: L('上面是赛道，下面是同步画出的 s–t 图象：匀速运动的图象是直线，斜率就是速度。',
                 'Track above, s–t graph below, drawn in sync: uniform motion graphs as a straight line whose slope is the speed.'),
      formula: L('v = <span class="frac"><span>s</span><span class="den">t</span></span>　·　s = vt　·　t = <span class="frac"><span>s</span><span class="den">v</span></span>（知二求一）',
                 'v = <span class="frac"><span>s</span><span class="den">t</span></span>　·　s = vt　·　t = <span class="frac"><span>s</span><span class="den">v</span></span> (know two, find the third)'),
      explainHTML: L(`
        <h2>速度的含义 <span class="en">What Speed Means</span></h2>
        <div class="formula">v = <span class="frac"><span>s</span><span class="den">t</span></span>
          <span class="note">路程 ÷ 时间 = "单位时间走多远"。1 m/s = 3.6 km/h</span></div>
        <ul>
          <li><span class="term">匀速直线运动 <span class="en">(uniform motion)</span></span>：快慢不变、沿直线 —— 最简单的运动；</li>
          <li>变速运动用<span class="term">平均速度 <span class="en">(average speed)</span></span>：总路程 ÷ 总时间；</li>
          <li>常见速度感：步行 ≈ 1.2 m/s，自行车 ≈ 5 m/s，高铁 ≈ 97 m/s（350 km/h），声音 340 m/s，光 3×10⁸ m/s。</li>
        </ul>
        <h2>读懂 s–t 图象 <span class="en">Reading s–t Graphs</span></h2>
        <ul>
          <li>匀速运动的 s–t 图象是<b>过原点的直线</b>；</li>
          <li><b>越陡越快</b>：斜率 = 速度 —— 这正是高中"斜率"与"导数"的第一次物理亮相；</li>
          <li>两线相交 = <b>相遇</b>：同一时刻到达同一位置。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 设蓝车 5 m/s、红车 3 m/s 但红车抢跑 20 m（调"红车起点"）—— 什么时候追上？看两条图象线的交点；② 图象上比较两线陡峭程度，谁陡谁快一目了然；③ 用读数验证追及时间 = 领先距离 ÷ 速度差。</div>
        <div class="think"><b>思考一下：</b>龟兔赛跑的 s–t 图象长什么样？兔子的线会有一段"水平"（睡觉，s 不变）—— 试着在纸上画出来。</div>
      `, `
        <h2>What Speed Means <span class="en">速度的含义</span></h2>
        <div class="formula">v = <span class="frac"><span>s</span><span class="den">t</span></span>
          <span class="note">distance ÷ time = "how far per unit time". 1 m/s = 3.6 km/h</span></div>
        <ul>
          <li><span class="term">Uniform motion <span class="en">(匀速直线运动)</span></span>: constant speed along a straight line — the simplest motion;</li>
          <li>For changing speeds use the <span class="term">average speed <span class="en">(平均速度)</span></span>: total distance ÷ total time;</li>
          <li>Speed intuition: walking ≈ 1.2 m/s, cycling ≈ 5 m/s, high-speed rail ≈ 97 m/s (350 km/h), sound 340 m/s, light 3×10⁸ m/s.</li>
        </ul>
        <h2>Reading s–t Graphs <span class="en">读懂 s–t 图象</span></h2>
        <ul>
          <li>Uniform motion graphs as a <b>straight line through the origin</b>;</li>
          <li><b>Steeper = faster</b>: the slope is the speed — the first physical appearance of "slope", long before derivatives;</li>
          <li>Lines crossing = <b>meeting</b>: same place at the same moment.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Blue at 5 m/s, red at 3 m/s with a 20 m head start (adjust "red's start") — when is red caught? Look at the crossing of the two graph lines; ② Compare steepness on the graph: the steeper line is the faster racer; ③ Verify: catch-up time = lead distance ÷ speed difference.</div>
        <div class="think"><b>Think about it:</b> What does the tortoise-and-hare race look like as an s–t graph? The hare's line has a <em>horizontal</em> stretch (napping: s unchanged) — sketch it on paper.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sv1 = addSlider(panel, { label: L('蓝车速度 v₁', 'Blue speed v₁'), en: L('speed', '速度'), min: 1, max: 10, step: 0.5, value: 5, unit: 'm/s' });
    const sv2 = addSlider(panel, { label: L('红车速度 v₂', 'Red speed v₂'), en: L('speed', '速度'), min: 1, max: 10, step: 0.5, value: 3, unit: 'm/s' });
    const ss0 = addSlider(panel, { label: L('红车起点（抢跑）', "Red's start (head start)"), en: L('head start', '起点'), min: 0, max: 60, step: 5, value: 20, unit: 'm' });
    const readout = addReadout(panel);
    const T = 20, COURSE = 100;
    const anim = makeAnimator(dt => {
      if (anim.t >= T) { anim.stop(); play.sync(); }
      draw();
    });
    const play = addPlayControls(panel, anim, { onReset: () => draw() });

    function draw() {
      const v1 = sv1.value, v2 = sv2.value, s0 = ss0.value;
      const t = Math.min(anim.t, T);
      const s1 = Math.min(v1 * t, COURSE), s2 = Math.min(s0 + v2 * t, COURSE);
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 赛道 ——
      const pad = 50, SX = m => pad + m / COURSE * (W - 2 * pad);
      const y1 = 52, y2 = 96;
      [[y1, '#dbe3ff'], [y2, '#ffe3e3']].forEach(([y, col]) => {
        ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(SX(0), y); ctx.lineTo(SX(COURSE), y); ctx.stroke();
        ctx.lineCap = 'butt';
      });
      // 终点旗
      ctx.font = '18px sans-serif';
      ctx.fillText('🏁', SX(COURSE) + 6, y2 + 6);
      ctx.font = '20px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('🚙', SX(s1), y1 + 7);
      ctx.fillText('🚗', SX(s2), y2 + 7);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      [0, 25, 50, 75, 100].forEach(m => { ctx.fillText(m + 'm', SX(m) - 8, y2 + 26); });
      // —— s–t 图象 ——
      const gL = 58, gR = W - 26, gT = 150, gB = H - 30;
      const GX = tt => gL + tt / T * (gR - gL);
      const GY = s => gB - s / COURSE * (gB - gT);
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gL, gT); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('s/m', gL + 4, gT + 10);
      ctx.fillText('t/s', gR - 16, gB - 6);
      [5, 10, 15, 20].forEach(tt => ctx.fillText(tt, GX(tt) - 4, gB + 14));
      [50, 100].forEach(s => ctx.fillText(s, gL - 26, GY(s) + 4));
      // 全程图线（浅）+ 已走部分（深）
      const lineTo = (v, s0v, col, colFull) => {
        ctx.strokeStyle = colFull; ctx.lineWidth = 1.6; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(GX(0), GY(Math.min(s0v, COURSE)));
        const tEnd = Math.min(T, (COURSE - s0v) / v);
        ctx.lineTo(GX(tEnd), GY(COURSE)); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = col; ctx.lineWidth = 2.8;
        ctx.beginPath(); ctx.moveTo(GX(0), GY(Math.min(s0v, COURSE)));
        const tNow = Math.min(t, tEnd);
        ctx.lineTo(GX(tNow), GY(Math.min(s0v + v * tNow, COURSE))); ctx.stroke();
      };
      lineTo(v1, 0, '#3b82f6', 'rgba(59,130,246,.35)');
      lineTo(v2, s0, '#ef4444', 'rgba(239,68,68,.35)');
      // 追及点
      let meetHTML_zh = '两车不相遇（蓝车没有更快）', meetHTML_en = 'No catch-up (blue isn\'t faster)';
      if (v1 > v2 && s0 > 0) {
        const tm = s0 / (v1 - v2), sm2 = v1 * tm;
        if (sm2 <= COURSE && tm <= T) {
          ctx.fillStyle = C.purple;
          ctx.beginPath(); ctx.arc(GX(tm), GY(sm2), 6, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = C.purple; ctx.font = 'bold 11.5px sans-serif';
          ctx.fillText(L('相遇!', 'meet!'), GX(tm) + 8, GY(sm2) - 6);
        }
        meetHTML_zh = `追上时刻 t = s₀/(v₁−v₂) = ${fmtN(s0,0)}/${fmtN(v1 - v2,1)} = <b>${fmtN(tm,1)} s</b>（在 ${fmtN(sm2,0)} m 处）`;
        meetHTML_en = `Catch-up at t = s₀/(v₁−v₂) = ${fmtN(s0,0)}/${fmtN(v1 - v2,1)} = <b>${fmtN(tm,1)} s</b> (at the ${fmtN(sm2,0)} m mark)`;
      } else if (s0 === 0) {
        meetHTML_zh = '同起点出发 —— 谁快谁一路领先';
        meetHTML_en = 'Same start — the faster one leads throughout';
      }
      readout.set(L(`
        t = <b>${fmtN(t,1)} s</b><br>
        蓝车 s₁ = v₁t = <b>${fmtN(s1,1)} m</b>${s1 >= COURSE ? ' 🏁' : ''}　红车 s₂ = <b>${fmtN(s2,1)} m</b>${s2 >= COURSE ? ' 🏁' : ''}<br>
        图象斜率：蓝 <b>${fmtN(v1,1)}</b> vs 红 <b>${fmtN(v2,1)}</b> —— <span class="tag">越陡越快</span><br>
        ${meetHTML_zh}`, `
        t = <b>${fmtN(t,1)} s</b><br>
        Blue s₁ = v₁t = <b>${fmtN(s1,1)} m</b>${s1 >= COURSE ? ' 🏁' : ''}　red s₂ = <b>${fmtN(s2,1)} m</b>${s2 >= COURSE ? ' 🏁' : ''}<br>
        Graph slopes: blue <b>${fmtN(v1,1)}</b> vs red <b>${fmtN(v2,1)}</b> — <span class="tag">steeper = faster</span><br>
        ${meetHTML_en}`));
    }
    [sv1, sv2, ss0].forEach(s => s.onChange(() => { anim.stop(); anim.t = 0; play.sync(); draw(); }));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
