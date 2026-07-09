'use strict';
/* ===== 抛体运动 Projectile Motion ===== */
registerTopic({
  id: 'projectile', cat: 'mech', icon: '🏀',
  title: '抛体运动', en: 'Projectile Motion',
  desc: L('调整初速度、抛射角和重力加速度，发射！观察抛物线轨迹与速度的分解。',
          'Set the launch speed, angle and gravity, then fire! Watch the parabolic path and the velocity components.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '抛体运动', en: 'Projectile Motion',
      tagline: L('调好角度和初速度后点击播放发射，注意小球上的速度分量箭头。',
                 'Dial in the angle and speed, press Play to launch — and watch the velocity-component arrows on the ball.'),
      formula: L('x = v₀cosθ·t　y = v₀sinθ·t − ½gt<sup>2</sup>　·　射程 R = <span class="frac"><span>v₀²sin2θ</span><span class="den">g</span></span>',
                 'x = v₀cosθ·t　y = v₀sinθ·t − ½gt<sup>2</sup>　·　range R = <span class="frac"><span>v₀²sin2θ</span><span class="den">g</span></span>'),
      explainHTML: L(`
        <h2>运动的分解 <span class="en">Decomposition of Motion</span></h2>
        <p>斜抛运动可以分解为两个互不干扰的分运动（<span class="term">运动的独立性 <span class="en">(independence of motion)</span></span>）：</p>
        <ul>
          <li><b>水平方向</b>：不受力（忽略空气阻力），做<b>匀速直线运动</b>：vₓ = v₀cos θ 恒定；</li>
          <li><b>竖直方向</b>：只受重力，做<b>竖直上抛运动</b>：v_y = v₀sin θ − gt。</li>
        </ul>
        <div class="formula">
          x = v₀cos θ · t　　y = v₀sin θ · t − <span class="frac"><span>1</span><span class="den">2</span></span>gt<sup>2</sup>
        </div>
        <h2>三个关键结论 <span class="en">Key Results</span></h2>
        <div class="formula">
          飞行时间 T = <span class="frac"><span>2v₀sin θ</span><span class="den">g</span></span>
          最大高度 H = <span class="frac"><span>v₀<sup>2</sup>sin<sup>2</sup>θ</span><span class="den">2g</span></span>
          射程 R = <span class="frac"><span>v₀<sup>2</sup>sin 2θ</span><span class="den">g</span></span>
        </div>
        <ul>
          <li>射程 R 含 sin 2θ ⟹ <b>θ = 45° 时射程最大</b>（sin 90° = 1）；</li>
          <li>θ 与 90° − θ 的射程相同（如 30° 和 60°），叫<span class="term">互补角 <span class="en">(complementary angles)</span></span>；</li>
          <li>轨迹是<span class="term">抛物线 <span class="en">(parabola)</span></span> —— 消去 t 后 y 是 x 的二次函数，和数学里的二次函数完美呼应！</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定 v₀，分别用 30°、45°、60° 发射，对比射程读数，验证“45° 最远、互补角等远”；② 把 g 调到 1.6 m/s²（月球重力），同样的投篮能飞多远？③ 观察最高点：竖直速度 v_y 是不是恰好为 0，而水平速度从未改变？</div>
        <div class="think"><b>思考一下：</b>平抛运动 (horizontal projectile) 是 θ = 0° 的特例。为什么从桌边滚落的小球，无论水平速度多大，落地时间都一样？</div>
      `, `
        <h2>Decomposing the Motion <span class="en">运动的分解</span></h2>
        <p>Projectile motion splits into two motions that don't interfere (the <span class="term">independence of motion <span class="en">(运动的独立性)</span></span>):</p>
        <ul>
          <li><b>Horizontal</b>: no force (ignoring air resistance) → <b>constant velocity</b>: vₓ = v₀cos θ stays fixed;</li>
          <li><b>Vertical</b>: gravity only → straight-line motion with constant acceleration: v_y = v₀sin θ − gt.</li>
        </ul>
        <div class="formula">
          x = v₀cos θ · t　　y = v₀sin θ · t − <span class="frac"><span>1</span><span class="den">2</span></span>gt<sup>2</sup>
        </div>
        <h2>Three Key Results <span class="en">三个关键结论</span></h2>
        <div class="formula">
          Flight time T = <span class="frac"><span>2v₀sin θ</span><span class="den">g</span></span>
          Max height H = <span class="frac"><span>v₀<sup>2</sup>sin<sup>2</sup>θ</span><span class="den">2g</span></span>
          Range R = <span class="frac"><span>v₀<sup>2</sup>sin 2θ</span><span class="den">g</span></span>
        </div>
        <ul>
          <li>The range contains sin 2θ ⟹ <b>maximum range at θ = 45°</b> (sin 90° = 1);</li>
          <li>θ and 90° − θ give the same range (e.g. 30° and 60°) — <span class="term">complementary angles <span class="en">(互补角)</span></span>;</li>
          <li>The trajectory is a <span class="term">parabola <span class="en">(抛物线)</span></span> — eliminate t and y is a quadratic in x, echoing the math topic perfectly!</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Fix v₀ and launch at 30°, 45°, 60°; compare ranges to confirm "45° farthest, complementary angles tie"; ② Set g to 1.6 m/s² (lunar gravity) — how far does the same shot fly? ③ At the peak, check that v_y is exactly 0 while vₓ never changed.</div>
        <div class="think"><b>Think about it:</b> Horizontal projectile motion (平抛) is the θ = 0° special case. Why does a ball rolling off a table hit the floor after the same time no matter how fast it was rolling?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sv0 = addSlider(panel, { label: L('初速度 v₀', 'Launch speed v₀'), en: L('initial speed', '初速度'), min: 5, max: 30, step: 0.5, value: 20, unit: 'm/s' });
    const sth = addSlider(panel, { label: L('抛射角 θ', 'Launch angle θ'), en: L('launch angle', '抛射角'), min: 5, max: 85, step: 1, value: 45, unit: '°' });
    const sg = addSlider(panel, { label: L('重力加速度 g', 'Gravity g'), en: L('gravity', '重力加速度'), min: 1.6, max: 20, step: 0.1, value: 9.8, unit: 'm/s²' });
    const readout = addReadout(panel);
    let t = 0;
    const anim = makeAnimator(dt => {
      t += dt * 1.2;
      const Tf = 2 * sv0.value * Math.sin(sth.value * DEG) / sg.value;
      if (t >= Tf) { t = Tf; anim.stop(); play.sync(); }
      draw();
    });
    const play = addPlayControls(panel, anim, { onReset: () => { t = 0; draw(); } });

    function draw() {
      const v0 = sv0.value, th = sth.value * DEG, g = sg.value;
      const Tf = 2 * v0 * Math.sin(th) / g;
      const R = v0 * v0 * Math.sin(2 * th) / g;
      const Hm = v0 * v0 * Math.sin(th) ** 2 / (2 * g);
      t = Math.min(t, Tf);
      const plot = new Plot(cv, {
        xmin: -3, xmax: Math.max(R * 1.12, 10),
        ymin: -2, ymax: Math.max(Hm * 1.35, 6),
        padL: 14, padR: 10, padT: 10, padB: 16
      });
      plot.clear('#fff');
      // 地面
      const { ctx, W } = cv;
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, plot.Y(0), W, cv.H - plot.Y(0));
      plot.grid(Math.max(5, Math.round(R / 40) * 5));
      plot.axes({ xLabel: 'x/m', yLabel: 'y/m', tickX: Math.max(5, Math.round(R / 40) * 5) });
      // 完整轨迹（虚线）
      plot.fn(x => Math.tan(th) * x - g * x * x / (2 * v0 * v0 * Math.cos(th) ** 2),
        { color: '#cbd5e1', width: 2, dash: [7, 6], xmin: 0, xmax: R });
      // 已飞过的轨迹（实线）
      ctx.save();
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2.6; ctx.beginPath();
      for (let tt = 0; tt <= t; tt += Tf / 200) {
        const X = plot.X(v0 * Math.cos(th) * tt);
        const Y = plot.Y(v0 * Math.sin(th) * tt - 0.5 * g * tt * tt);
        tt === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
      }
      ctx.stroke();
      ctx.restore();
      // 关键点标注
      plot.dot(R / 2, Hm, { color: C.gray, r: 3.5, label: L(`最高点 H=${fmtN(Hm,1)}m`, `peak H=${fmtN(Hm,1)}m`), labelDy: -8, labelDx: -30 });
      plot.dot(R, 0, { color: C.gray, r: 3.5, label: L(`射程 R=${fmtN(R,1)}m`, `range R=${fmtN(R,1)}m`), labelDy: -10, labelDx: -40 });
      // 当前小球与速度分量
      const x = v0 * Math.cos(th) * t, y = v0 * Math.sin(th) * t - 0.5 * g * t * t;
      const vx = v0 * Math.cos(th), vy = v0 * Math.sin(th) - g * t;
      const vs = 0.18; // 箭头比例
      plot.arrow(x, y, x + vx * vs, y, { color: C.green, width: 2.2, label: 'vₓ', labelDy: 14 });
      plot.arrow(x, y, x, y + vy * vs, { color: C.orange, width: 2.2, label: 'v_y' });
      plot.arrow(x, y, x + vx * vs, y + vy * vs, { color: C.red, width: 2.6, label: 'v' });
      plot.dot(x, y, { color: C.red, r: 7, stroke: '#fff' });

      readout.set(L(`
        t = <b>${fmtN(t,2)} s</b> / 全程 T = <b>${fmtN(Tf,2)} s</b><br>
        位置：x = <b>${fmtN(x,1)} m</b>，y = <b>${fmtN(y,1)} m</b><br>
        vₓ = <b>${fmtN(vx,2)}</b> m/s（恒定！）<br>
        v_y = <b>${fmtN(vy,2)}</b> m/s ${Math.abs(vy) < 0.6 ? '<span class="tag">最高点 v_y≈0</span>' : ''}<br>
        射程 R = <b>${fmtN(R,1)} m</b>　最大高度 H = <b>${fmtN(Hm,1)} m</b><br>
        ${Math.abs(sth.value - 45) < 0.5 ? '<span class="tag">θ=45°：射程最大！</span>' : `试试 ${fmtN(90 - sth.value,0)}°，射程会一样吗？`}`, `
        t = <b>${fmtN(t,2)} s</b> / total T = <b>${fmtN(Tf,2)} s</b><br>
        Position: x = <b>${fmtN(x,1)} m</b>, y = <b>${fmtN(y,1)} m</b><br>
        vₓ = <b>${fmtN(vx,2)}</b> m/s (constant!)<br>
        v_y = <b>${fmtN(vy,2)}</b> m/s ${Math.abs(vy) < 0.6 ? '<span class="tag">at the peak v_y≈0</span>' : ''}<br>
        Range R = <b>${fmtN(R,1)} m</b>　max height H = <b>${fmtN(Hm,1)} m</b><br>
        ${Math.abs(sth.value - 45) < 0.5 ? '<span class="tag">θ=45°: maximum range!</span>' : `Try ${fmtN(90 - sth.value,0)}° — same range?`}`));
    }
    [sv0, sth, sg].forEach(s => s.onChange(() => { t = Math.min(t, 2 * sv0.value * Math.sin(sth.value * DEG) / sg.value); draw(); }));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
