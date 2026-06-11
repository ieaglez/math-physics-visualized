'use strict';
/* ===== 匀变速直线运动 Uniformly Accelerated Motion ===== */
registerTopic({
  id: 'kinematics', cat: 'mech', icon: '🚗',
  title: '匀变速直线运动', en: 'Uniform Acceleration',
  desc: '设置初速度和加速度，播放小车运动动画，同步观察 x–t 图象与 v–t 图象。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '匀变速直线运动', en: 'Uniformly Accelerated Linear Motion',
      tagline: '上方是小车的真实运动，下方是同步绘制的 x–t 与 v–t 图象。',
      formula: 'v = v₀ + at　·　x = v₀t + ½at<sup>2</sup>　·　v<sup>2</sup> − v₀<sup>2</sup> = 2ax',
      explainHTML: `
        <h2>三个基本公式 <span class="en">Kinematic Equations</span></h2>
        <p>当物体沿直线运动且<span class="term">加速度 <span class="en">(acceleration)</span></span> a 恒定时：</p>
        <div class="formula">
          v = v₀ + at　　x = v₀t + <span class="frac"><span>1</span><span class="den">2</span></span>at<sup>2</sup>　　v<sup>2</sup> − v₀<sup>2</sup> = 2ax
        </div>
        <ul>
          <li>v₀：<span class="term">初速度 <span class="en">(initial velocity)</span></span>；v：t 时刻的瞬时速度 (instantaneous velocity)；x：位移 (displacement)。</li>
          <li>第三个公式不含 t，适合“不问时间”的题目。</li>
        </ul>
        <h2>读懂运动图象 <span class="en">Motion Graphs</span></h2>
        <ul>
          <li><b>v–t 图象</b>：是一条<b>直线</b>，斜率 = 加速度 a，与 t 轴围成的“面积” = 位移 x。这是理解第二个公式的钥匙：梯形面积 = (v₀+v)t/2；</li>
          <li><b>x–t 图象</b>：是一条<b>抛物线</b>（a ≠ 0 时），某点切线的斜率 = 该时刻的速度 —— 这正是导数的物理意义！</li>
          <li>a 与 v₀ 同号 ⟹ 加速；异号 ⟹ 先减速，v = 0 后反向加速（注意 x–t 图象的“折返”）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 设 v₀ = 10, a = −2（类似刹车+倒车），播放后观察小车先冲后退，x–t 图象出现最高点 —— 那一刻 v = 0；② 设 a = 0，两个图象分别变成什么形状？③ 对照 v–t 直线下方的面积和 x 的读数，验证“面积=位移”。</div>
        <div class="think"><b>思考一下：</b>自由落体 (free fall) 是匀变速运动的特例：v₀ = 0，a = g ≈ 9.8 m/s²。把参数调成这样，1 秒、2 秒、3 秒内下落的距离之比是多少？（提示：1 : 4 : 9）</div>
      `
    });

    const cv = createCanvas(canvasBox, 470);
    const sv0 = addSlider(panel, { label: '初速度 v₀', en: 'initial velocity', min: -10, max: 15, step: 0.5, value: 10, unit: 'm/s' });
    const sa = addSlider(panel, { label: '加速度 a', en: 'acceleration', min: -5, max: 5, step: 0.1, value: -2, unit: 'm/s²' });
    const st = addSlider(panel, { label: '时间 t', en: 'time', min: 0, max: 10, step: 0.05, value: 0, unit: 's' });
    const readout = addReadout(panel);
    const anim = makeAnimator(dt => {
      let t = st.value + dt;
      if (t >= 10) { t = 10; anim.stop(); play.sync(); }
      st.value = t;
      draw();
    });
    const play = addPlayControls(panel, anim, { onReset: () => { st.value = 0; draw(); } });

    const T = 10;
    function xOf(t) { return sv0.value * t + 0.5 * sa.value * t * t; }
    function vOf(t) { return sv0.value + sa.value * t; }

    function draw() {
      const { ctx, W, H } = cv;
      const t = st.value;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

      // —— 上：跑道 + 小车 ——
      const laneY = 64;
      // 自适应位移范围
      let xmin = 0, xmax = 1;
      for (let tt = 0; tt <= T; tt += 0.2) { const x = xOf(tt); xmin = Math.min(xmin, x); xmax = Math.max(xmax, x); }
      const pad = 50, scale = (W - 2 * pad) / Math.max(xmax - xmin, 1);
      const SX = x => pad + (x - xmin) * scale;
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(pad - 20, laneY + 16); ctx.lineTo(W - pad + 20, laneY + 16); ctx.stroke();
      // 标尺刻度
      ctx.fillStyle = C.soft; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
      const stepM = Math.max(5, Math.round((xmax - xmin) / 8 / 5) * 5);
      for (let m = Math.ceil(xmin / stepM) * stepM; m <= xmax; m += stepM) {
        ctx.beginPath(); ctx.moveTo(SX(m), laneY + 12); ctx.lineTo(SX(m), laneY + 20); ctx.stroke();
        ctx.fillText(m + 'm', SX(m), laneY + 32);
      }
      ctx.textAlign = 'left';
      // 起点旗
      ctx.fillStyle = C.green; ctx.fillRect(SX(0) - 1, laneY - 26, 2, 40);
      ctx.beginPath(); ctx.moveTo(SX(0), laneY - 26); ctx.lineTo(SX(0) + 14, laneY - 20); ctx.lineTo(SX(0), laneY - 14); ctx.fill();
      // 小车
      const carX = SX(xOf(t));
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(carX - 18, laneY - 8, 36, 18, 5); else ctx.rect(carX - 18, laneY - 8, 36, 18);
      ctx.fill();
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath(); ctx.arc(carX - 10, laneY + 12, 4.5, 0, Math.PI * 2); ctx.arc(carX + 10, laneY + 12, 4.5, 0, Math.PI * 2); ctx.fill();
      // 速度箭头
      const v = vOf(t);
      if (Math.abs(v) > 0.1) pxArrow(ctx, carX, laneY - 18, carX + v * 6, laneY - 18, { color: C.red, width: 2.5, label: 'v', labelDy: 4 });

      // —— 下：x–t 与 v–t 图象 ——
      const gTop = 120, gH = H - gTop - 14, gW = (W - 70) / 2;
      const graphs = [
        { x0: 40, f: xOf, color: C.blue, name: 'x–t 图象（抛物线）', unit: 'm' },
        { x0: 70 + gW, f: vOf, color: C.red, name: 'v–t 图象（直线，斜率=a）', unit: 'm/s' }
      ];
      graphs.forEach(g => {
        let lo = 0, hi = 1;
        for (let tt = 0; tt <= T; tt += 0.2) { const y = g.f(tt); lo = Math.min(lo, y); hi = Math.max(hi, y); }
        const range = Math.max(hi - lo, 1);
        const GX = tt => g.x0 + (tt / T) * (gW - 10);
        const GY = y => gTop + gH - 18 - ((y - lo) / range) * (gH - 40);
        ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(g.x0, GY(0)); ctx.lineTo(g.x0 + gW - 6, GY(0)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(GX(0), gTop + 4); ctx.lineTo(GX(0), gTop + gH - 12); ctx.stroke();
        ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
        ctx.fillText('t/s', g.x0 + gW - 24, GY(0) - 6);
        ctx.fillText(g.name, g.x0 + 8, gTop + 2);
        [2, 4, 6, 8, 10].forEach(tt => { ctx.fillText(tt, GX(tt) - 3, GY(0) + 13); });
        // v–t 面积着色（0~t）
        if (g.f === vOf && t > 0.05) {
          ctx.fillStyle = 'rgba(220,38,38,.12)';
          ctx.beginPath(); ctx.moveTo(GX(0), GY(0));
          for (let tt = 0; tt <= t; tt += 0.1) ctx.lineTo(GX(tt), GY(vOf(tt)));
          ctx.lineTo(GX(t), GY(0)); ctx.closePath(); ctx.fill();
        }
        ctx.strokeStyle = g.color; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let tt = 0; tt <= T; tt += 0.08) {
          const X = GX(tt), Y = GY(g.f(tt));
          tt === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
        }
        ctx.stroke();
        ctx.fillStyle = g.color;
        ctx.beginPath(); ctx.arc(GX(t), GY(g.f(t)), 5.5, 0, Math.PI * 2); ctx.fill();
      });

      readout.set(`
        t = <b>${fmtN(t,2)} s</b><br>
        位移 x = v₀t + ½at² = <b>${fmtN(xOf(t),2)} m</b><br>
        速度 v = v₀ + at = <b>${fmtN(v,2)} m/s</b><br>
        ${(sv0.value !== 0 && sa.value !== 0 && sv0.value * sa.value < 0) ?
          `v = 0 的时刻：t = <b>${fmtN(-sv0.value / sa.value,2)} s</b>（运动折返点）<br>` : ''}
        v–t 图中红色阴影面积 = 位移 x ✓`);
    }
    [sv0, sa, st].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
