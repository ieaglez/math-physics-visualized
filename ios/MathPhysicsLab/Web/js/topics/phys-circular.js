'use strict';
/* ===== 匀速圆周运动 Uniform Circular Motion ===== */
registerTopic({
  id: 'circular', cat: 'mech', icon: '🎡',
  title: '匀速圆周运动', en: 'Uniform Circular Motion',
  desc: L('调节半径和角速度，观察线速度（切向）与向心加速度（指向圆心）的方向关系。',
          'Adjust radius and angular velocity; see how velocity (tangent) and centripetal acceleration (toward the center) point.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '匀速圆周运动', en: 'Uniform Circular Motion',
      tagline: L('速度沿切线、加速度指向圆心 —— "匀速"圆周运动其实一直在加速！',
                 'Velocity along the tangent, acceleration toward the center — "uniform" circular motion is actually always accelerating!'),
      formula: L('v = ωr　·　a = <span class="frac"><span>v²</span><span class="den">r</span></span> = ω²r　·　F<sub>向</sub> = <span class="frac"><span>mv²</span><span class="den">r</span></span>　·　T = <span class="frac"><span>2π</span><span class="den">ω</span></span>',
                 'v = ωr　·　a = <span class="frac"><span>v²</span><span class="den">r</span></span> = ω²r　·　F<sub>c</sub> = <span class="frac"><span>mv²</span><span class="den">r</span></span>　·　T = <span class="frac"><span>2π</span><span class="den">ω</span></span>'),
      explainHTML: L(`
        <h2>描述圆周运动的量 <span class="en">Describing Circular Motion</span></h2>
        <ul>
          <li><span class="term">线速度 <span class="en">(linear velocity)</span></span> v：沿<b>切线方向</b>，大小 = 弧长/时间；</li>
          <li><span class="term">角速度 <span class="en">(angular velocity)</span></span> ω：转过的角度/时间，单位 rad/s；</li>
          <li><span class="term">周期 <span class="en">(period)</span></span> T 与频率 f：T = 2π/ω = 1/f；</li>
          <li>三者关系：<b>v = ωr</b> —— 同样的 ω，半径越大线速度越大（旋转木马外圈更快）。</li>
        </ul>
        <h2>向心加速度与向心力 <span class="en">Centripetal Acceleration & Force</span></h2>
        <div class="formula">a = <span class="frac"><span>v²</span><span class="den">r</span></span> = ω²r　　F<sub>向</sub> = ma = <span class="frac"><span>mv²</span><span class="den">r</span></span></div>
        <ul>
          <li>速度<b>大小不变、方向时刻在变</b> —— 改变方向也需要加速度！这就是<span class="term">向心加速度 <span class="en">(centripetal acceleration)</span></span>；</li>
          <li>方向永远<b>指向圆心</b>，与速度垂直，所以只改变方向、不改变大小；</li>
          <li>向心力不是一种新的力，而是指向圆心的<b>合力</b>：可以由绳的拉力、重力、摩擦力、万有引力等提供；</li>
          <li>如果向心力突然消失（绳断了），物体沿<b>切线方向</b>飞出去 —— 不是沿半径！</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定 ω，把 r 调大一倍，看 v 和 a 各变成几倍（v 翻倍，a 翻倍）；② 固定 v 比较不容易，试试固定 r 把 ω 翻倍，a 变成 4 倍（ω²r）；③ 暂停动画，确认 v 箭头始终与半径垂直。</div>
        <div class="think"><b>思考一下：</b>汽车过拱桥最高点时，向心力由什么提供？为什么车速太快会"飞起来"？（提示：mg − N = mv²/r，当 N = 0 时…）</div>
      `, `
        <h2>Describing Circular Motion <span class="en">描述圆周运动的量</span></h2>
        <ul>
          <li><span class="term">Linear velocity <span class="en">(线速度)</span></span> v: along the <b>tangent</b>; magnitude = arc length / time;</li>
          <li><span class="term">Angular velocity <span class="en">(角速度)</span></span> ω: angle swept / time, in rad/s;</li>
          <li><span class="term">Period <span class="en">(周期)</span></span> T and frequency f: T = 2π/ω = 1/f;</li>
          <li>They connect via <b>v = ωr</b> — same ω, bigger radius means faster: the outer horses on a carousel move fastest.</li>
        </ul>
        <h2>Centripetal Acceleration &amp; Force <span class="en">向心加速度与向心力</span></h2>
        <div class="formula">a = <span class="frac"><span>v²</span><span class="den">r</span></span> = ω²r　　F<sub>c</sub> = ma = <span class="frac"><span>mv²</span><span class="den">r</span></span></div>
        <ul>
          <li>The speed is constant but the <b>direction keeps changing</b> — changing direction also requires acceleration! That's the <span class="term">centripetal acceleration <span class="en">(向心加速度)</span></span>;</li>
          <li>It always points <b>toward the center</b>, perpendicular to v — so it turns the velocity without changing its magnitude;</li>
          <li>Centripetal force is not a new kind of force — it's the <b>net force toward the center</b>, supplied by tension, gravity, friction, or gravitation;</li>
          <li>If it suddenly vanishes (the string snaps), the object flies off <b>along the tangent</b> — not outward along the radius!</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Fix ω and double r: how do v and a scale? (v doubles, a doubles); ② Fix r and double ω: a quadruples (ω²r); ③ Pause the animation and confirm v is always perpendicular to the radius.</div>
        <div class="think"><b>Think about it:</b> At the top of an arched bridge, what supplies the centripetal force on a car? Why does a car "take off" if it's too fast? (Hint: mg − N = mv²/r — what happens when N = 0?)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sr = addSlider(panel, { label: L('半径 r', 'Radius r'), en: L('radius', '半径'), min: 0.5, max: 3, step: 0.1, value: 2, unit: 'm' });
    const sw = addSlider(panel, { label: L('角速度 ω', 'Angular velocity ω'), en: L('angular velocity', '角速度'), min: 0.3, max: 4, step: 0.1, value: 1.5, unit: 'rad/s' });
    const sm = addSlider(panel, { label: L('质量 m', 'Mass m'), en: L('mass', '质量'), min: 0.5, max: 5, step: 0.5, value: 1, unit: 'kg' });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, { onReset: () => draw() });
    anim.start();

    function draw() {
      const r = sr.value, w = sw.value, m = sm.value;
      const th = anim.t * w;
      const v = w * r, a = w * w * r, F = m * a, T = 2 * Math.PI / w;
      const plot = new Plot(cv, { xmin: -4.4, xmax: 4.4, ymin: -3.6, ymax: 3.6, equal: true });
      plot.clear('#fff');
      plot.grid(1);
      const { ctx } = cv;
      // 轨道
      ctx.save();
      ctx.strokeStyle = '#dfe2f2'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(r) - plot.X(0)), 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      plot.dot(0, 0, { color: '#94a3b8', r: 4, label: 'O', labelDy: 18 });
      const P = [r * Math.cos(th), r * Math.sin(th)];
      // 半径（绳）
      plot.seg(0, 0, P[0], P[1], { color: '#b9bedf', width: 2 });
      // 速度（切向）与向心加速度（指向圆心）
      const vScale = 0.9 / Math.max(1, w);
      const tx = -Math.sin(th), ty = Math.cos(th);
      plot.arrow(P[0], P[1], P[0] + tx * v * vScale, P[1] + ty * v * vScale, { color: C.green, width: 3, label: L('v（切线）', 'v (tangent)'), labelDy: -8 });
      const aScale = 0.65 / Math.max(1, w * w);
      plot.arrow(P[0], P[1], P[0] - Math.cos(th) * a * aScale, P[1] - Math.sin(th) * a * aScale, { color: C.red, width: 3, label: L('a（指向圆心）', 'a (to center)'), labelDy: 16 });
      // 小球
      plot.dot(P[0], P[1], { color: C.blue, r: 9, stroke: '#fff' });
      // 走过的弧
      ctx.save();
      ctx.strokeStyle = C.blue; ctx.lineWidth = 3; ctx.globalAlpha = 0.35;
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(r) - plot.X(0)), -th, -th + Math.min(th, 1.2), false); ctx.stroke();
      ctx.restore();
      readout.set(L(`
        线速度 v = ωr = <b>${fmtN(v,2)} m/s</b><br>
        向心加速度 a = ω²r = <b>${fmtN(a,2)} m/s²</b><br>
        向心力 F = ma = <b>${fmtN(F,2)} N</b><br>
        周期 T = 2π/ω = <b>${fmtN(T,2)} s</b>　频率 f = <b>${fmtN(1/T,2)} Hz</b><br>
        转过角度 θ = ωt = <b>${fmtN((th / DEG) % 360,0)}°</b><br>
        <span class="tag">v ⊥ a 始终成立</span>`, `
        Linear velocity v = ωr = <b>${fmtN(v,2)} m/s</b><br>
        Centripetal acceleration a = ω²r = <b>${fmtN(a,2)} m/s²</b><br>
        Centripetal force F = ma = <b>${fmtN(F,2)} N</b><br>
        Period T = 2π/ω = <b>${fmtN(T,2)} s</b>　frequency f = <b>${fmtN(1/T,2)} Hz</b><br>
        Angle swept θ = ωt = <b>${fmtN((th / DEG) % 360,0)}°</b><br>
        <span class="tag">v ⊥ a at all times</span>`));
    }
    [sr, sw, sm].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
