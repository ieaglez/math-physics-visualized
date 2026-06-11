'use strict';
/* ===== 椭圆 Ellipse ===== */
registerTopic({
  id: 'ellipse', cat: 'math', icon: '🥚',
  title: '椭圆与圆锥曲线', en: 'Ellipse & Conics',
  desc: '拖动半轴 a、b 和动点 P，验证“到两焦点距离之和恒为 2a”这一椭圆的定义。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '椭圆', en: 'Ellipse (Conic Sections 圆锥曲线)',
      tagline: '拖动动点 P 绕椭圆一周，盯住读数：|PF₁| + |PF₂| 永远不变！',
      formula: '<span class="frac"><span>x²</span><span class="den">a²</span></span> + <span class="frac"><span>y²</span><span class="den">b²</span></span> = 1　·　|PF₁|+|PF₂| = 2a　·　e = <span class="frac"><span>c</span><span class="den">a</span></span>',
      explainHTML: `
        <h2>椭圆的定义 <span class="en">Definition</span></h2>
        <p>平面内到两个定点 F₁、F₂ 的<b>距离之和等于常数</b>（大于 |F₁F₂|）的点的轨迹叫做
        <span class="term">椭圆 <span class="en">(ellipse)</span></span>。这两个定点叫
        <span class="term">焦点 <span class="en">(foci)</span></span>。</p>
        <div class="formula">|PF₁| + |PF₂| = 2a <span class="note">（动手拖动 P 点验证：这个和始终不变）</span></div>
        <h2>标准方程 <span class="en">Standard Equation</span></h2>
        <div class="formula"><span class="frac"><span>x<sup>2</sup></span><span class="den">a<sup>2</sup></span></span> +
          <span class="frac"><span>y<sup>2</sup></span><span class="den">b<sup>2</sup></span></span> = 1
          <span class="note">（焦点在 x 轴上时 a &gt; b &gt; 0）</span></div>
        <ul>
          <li>a：<span class="term">长半轴 <span class="en">(semi-major axis)</span></span>；b：<span class="term">短半轴 <span class="en">(semi-minor axis)</span></span>；</li>
          <li>焦距 |F₁F₂| = 2c，满足 <b>c² = a² − b²</b>（注意与双曲线区分）；</li>
          <li><span class="term">离心率 <span class="en">(eccentricity)</span></span> e = c/a ∈ (0, 1)：e 越接近 0 越“圆”，越接近 1 越“扁”；</li>
          <li>当 a = b 时，c = 0，椭圆变成<b>圆 (circle)</b> —— 圆是椭圆的特例。</li>
        </ul>
        <h2>为什么叫“圆锥曲线” <span class="en">Why "Conic Sections"</span></h2>
        <p>用平面去截一个圆锥：斜截得到椭圆，平行于母线截得到抛物线 (parabola)，截得更陡得到双曲线 (hyperbola)。
        开普勒第一定律：行星绕太阳的轨道就是椭圆，太阳位于其中一个焦点上。</p>
        <div class="tip"><b>实验建议：</b>① 拖动 P 点转一圈，观察 r₁ + r₂ 是否恒等于 2a；② 把 b 调到与 a 相等，焦点重合于圆心，椭圆变成圆；③ 固定 a，把 b 调小，离心率 e 如何变化？椭圆形状如何变化？</div>
        <div class="think"><b>思考一下：</b>如果把“距离之和”改成“距离之差为常数”，轨迹会是什么曲线？（提示：双曲线 hyperbola）</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -10, xmax: 10, ymin: -8, ymax: 8, equal: true });
    const sa = addSlider(panel, { label: '长半轴 a', en: 'semi-major', min: 2, max: 9, step: 0.1, value: 7 });
    const sb = addSlider(panel, { label: '短半轴 b', en: 'semi-minor', min: 1, max: 9, step: 0.1, value: 4.5 });
    const st = addSlider(panel, { label: '动点 P 的位置角 t', en: 'parameter', min: 0, max: 360, step: 1, value: 55, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value, t = st.value * DEG;
      const major = Math.max(a, b);
      const c = Math.sqrt(Math.abs(a * a - b * b));
      const onX = a >= b;            // 焦点在 x 轴 or y 轴
      const f1 = onX ? [-c, 0] : [0, -c], f2 = onX ? [c, 0] : [0, c];
      plot.clear('#fff');
      plot.grid(2);
      plot.axes({ tickX: 2 });
      // 椭圆
      const { ctx } = cv;
      ctx.save();
      ctx.strokeStyle = C.blue; ctx.lineWidth = 3;
      ctx.beginPath();
      for (let d = 0; d <= 362; d += 2) {
        const X = plot.X(a * Math.cos(d * DEG)), Y = plot.Y(b * Math.sin(d * DEG));
        d === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
      }
      ctx.stroke();
      ctx.restore();
      // 顶点
      plot.dot(a, 0, { color: C.gray, r: 3.5 }); plot.dot(-a, 0, { color: C.gray, r: 3.5 });
      plot.dot(0, b, { color: C.gray, r: 3.5 }); plot.dot(0, -b, { color: C.gray, r: 3.5 });
      // 动点与焦半径
      const P = [a * Math.cos(t), b * Math.sin(t)];
      const r1 = Math.hypot(P[0] - f1[0], P[1] - f1[1]);
      const r2 = Math.hypot(P[0] - f2[0], P[1] - f2[1]);
      plot.seg(P[0], P[1], f1[0], f1[1], { color: C.orange, width: 2.2 });
      plot.seg(P[0], P[1], f2[0], f2[1], { color: C.green, width: 2.2 });
      plot.dot(f1[0], f1[1], { color: C.red, r: 5.5, label: 'F₁', labelDy: 20 });
      plot.dot(f2[0], f2[1], { color: C.red, r: 5.5, label: 'F₂', labelDy: 20 });
      plot.dot(P[0], P[1], { color: C.purple, r: 6.5, label: 'P', labelDx: 10 });
      plot.text((P[0]+f1[0])/2, (P[1]+f1[1])/2, 'r₁', { color: C.orange, font: 'bold 14px sans-serif', dy: -6 });
      plot.text((P[0]+f2[0])/2, (P[1]+f2[1])/2, 'r₂', { color: C.green, font: 'bold 14px sans-serif', dy: -6 });
      const isCircle = Math.abs(a - b) < 0.05;
      readout.set(`
        方程：x²/${fmtN(a*a,1)} + y²/${fmtN(b*b,1)} = 1<br>
        c = √|a²−b²| = <b>${fmtN(c,3)}</b>　焦点在 <b>${isCircle ? '—（重合于圆心）' : onX ? 'x 轴' : 'y 轴'}</b><br>
        离心率 e = c/${onX?'a':'b'} = <b>${fmtN(c / major,3)}</b>
        ${isCircle ? '<span class="tag">a = b：这是一个圆！</span>' : ''}<br>
        r₁ = <b>${fmtN(r1,3)}</b>　r₂ = <b>${fmtN(r2,3)}</b><br>
        r₁ + r₂ = <b style="color:${C.purple}">${fmtN(r1 + r2,3)}</b> ＝ 2×${fmtN(major,2)} 恒定 ✓`);
    }
    [sa, sb, st].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
