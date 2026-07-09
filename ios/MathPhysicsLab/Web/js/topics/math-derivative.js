'use strict';
/* ===== 导数与切线 Derivative & Tangent Line ===== */
registerTopic({
  id: 'derivative', cat: 'math', icon: '📐',
  title: '导数与切线', en: 'Derivative & Tangent Line',
  desc: L('把割线的间距 h 慢慢缩小到 0，亲眼看到割线”变成”切线 —— 这就是导数的定义。',
          'Shrink the secant gap h toward 0 and watch the secant line become the tangent — that is the definition of the derivative.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '导数与切线', en: 'Derivative & Tangent Line',
      tagline: L('拖动 h 趋近 0，观察割线 (secant) 如何逼近切线 (tangent)。',
                 'Drag h toward 0 and watch the secant (割线) approach the tangent (切线).'),
      formula: L('f′(x₀) = lim<sub>h→0</sub> <span class="frac"><span>f(x₀+h) − f(x₀)</span><span class="den">h</span></span> ＝ 切线斜率',
                 'f′(x₀) = lim<sub>h→0</sub> <span class="frac"><span>f(x₀+h) − f(x₀)</span><span class="den">h</span></span> = slope of the tangent'),
      explainHTML: L(`
        <h2>导数的定义 <span class="en">Definition of Derivative</span></h2>
        <p>函数在某点的<span class="term">导数 <span class="en">(derivative)</span></span>，是<span class="term">平均变化率</span>当自变量增量趋于 0 时的极限 <span class="en">(limit)</span>：</p>
        <div class="formula">f′(x₀) = <span style="font-size:15px">lim<sub>h→0</sub></span>
          <span class="frac"><span>f(x₀ + h) − f(x₀)</span><span class="den">h</span></span></div>
        <ul>
          <li>橙色<span class="term">割线 <span class="en">(secant line)</span></span>经过曲线上两点 (x₀, f(x₀)) 和 (x₀+h, f(x₀+h))，斜率是平均变化率；</li>
          <li>当 h → 0，两点无限靠近，割线的极限位置就是绿色<span class="term">切线 <span class="en">(tangent line)</span></span>，其斜率就是 f′(x₀)；</li>
          <li><b>几何意义</b>：导数 = 切线斜率 (slope)；<b>物理意义</b>：位移对时间的导数 = 瞬时速度 (instantaneous velocity)。</li>
        </ul>
        <h2>常用求导公式 <span class="en">Common Derivatives</span></h2>
        <div class="formula">(x<sup>n</sup>)′ = n·x<sup>n−1</sup>　　(sin x)′ = cos x　　(cos x)′ = −sin x　　(e<sup>x</sup>)′ = e<sup>x</sup>　　(ln x)′ = <span class="frac"><span>1</span><span class="den">x</span></span></div>
        <h2>导数与单调性 <span class="en">Derivative &amp; Monotonicity</span></h2>
        <ul>
          <li>f′(x) &gt; 0 的区间上函数递增；f′(x) &lt; 0 的区间上函数递减；</li>
          <li>f′(x₀) = 0 且两侧异号 ⟹ x₀ 是<span class="term">极值点 <span class="en">(local extremum)</span></span>。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 选择 f(x) = x³ − 3x，把 x₀ 移到 1 或 −1，切线变水平了（f′=0，极值点）；② 把 h 从 2 慢慢拉到 0.01，看读数里割线斜率如何逼近导数值；③ 切换到 sin x，验证它在 x₀=0 处的切线斜率正好是 cos 0 = 1。</div>
        <div class="think"><b>思考一下：</b>x³ 在 x = 0 处导数为 0，但它是极值点吗？拖过去看看曲线的形状。</div>
      `, `
        <h2>Definition of the Derivative <span class="en">导数的定义</span></h2>
        <p>The <span class="term">derivative <span class="en">(导数)</span></span> of a function at a point is the limit of the
        <span class="term">average rate of change</span> as the increment goes to 0 <span class="en">(极限)</span>:</p>
        <div class="formula">f′(x₀) = <span style="font-size:15px">lim<sub>h→0</sub></span>
          <span class="frac"><span>f(x₀ + h) − f(x₀)</span><span class="den">h</span></span></div>
        <ul>
          <li>The orange <span class="term">secant line <span class="en">(割线)</span></span> passes through (x₀, f(x₀)) and (x₀+h, f(x₀+h)); its slope is the average rate of change;</li>
          <li>As h → 0 the two points merge, and the secant's limiting position is the green <span class="term">tangent line <span class="en">(切线)</span></span>, whose slope is f′(x₀);</li>
          <li><b>Geometric meaning</b>: derivative = slope of the tangent; <b>physical meaning</b>: the derivative of displacement with respect to time = instantaneous velocity (瞬时速度).</li>
        </ul>
        <h2>Common Derivatives <span class="en">常用求导公式</span></h2>
        <div class="formula">(x<sup>n</sup>)′ = n·x<sup>n−1</sup>　　(sin x)′ = cos x　　(cos x)′ = −sin x　　(e<sup>x</sup>)′ = e<sup>x</sup>　　(ln x)′ = <span class="frac"><span>1</span><span class="den">x</span></span></div>
        <h2>Derivative &amp; Monotonicity <span class="en">导数与单调性</span></h2>
        <ul>
          <li>Where f′(x) &gt; 0 the function increases; where f′(x) &lt; 0 it decreases;</li>
          <li>f′(x₀) = 0 with a sign change ⟹ x₀ is a <span class="term">local extremum <span class="en">(极值点)</span></span>.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Choose f(x) = x³ − 3x and move x₀ to 1 or −1 — the tangent turns horizontal (f′ = 0, an extremum); ② Slide h from 2 down to 0.01 and watch the secant slope in the readout converge to the derivative; ③ Switch to sin x and check that its tangent slope at x₀ = 0 is exactly cos 0 = 1.</div>
        <div class="think"><b>Think about it:</b> x³ has derivative 0 at x = 0 — but is that an extremum? Drag over and look at the curve's shape.</div>
      `)
    });

    const FNS = {
      cube: { f: x => x * x * x - 3 * x, df: x => 3 * x * x - 3, name: 'f(x) = x³ − 3x' },
      square: { f: x => 0.5 * x * x, df: x => x, name: 'f(x) = x²/2' },
      sin: { f: Math.sin, df: Math.cos, name: 'f(x) = sin x' }
    };
    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -4.5, xmax: 4.5, ymin: -4.5, ymax: 4.5 });
    const seg = addSeg(panel, {
      options: [
        { label: 'x³−3x', value: 'cube' },
        { label: 'x²/2', value: 'square' },
        { label: 'sin x', value: 'sin' }
      ],
      value: 'cube', onChange: () => draw()
    });
    const sx0 = addSlider(panel, { label: L('切点 x₀', 'Point x₀'), en: L('point', '切点'), min: -3, max: 3, step: 0.05, value: 0.5 });
    const sh = addSlider(panel, { label: L('增量 h（拖向 0！）', 'Increment h (drag to 0!)'), en: L('increment', '增量'), min: 0.01, max: 2, step: 0.01, value: 1.5 });
    const readout = addReadout(panel);

    function draw() {
      const { f, df, name } = FNS[seg.value];
      const x0 = sx0.value, hh = sh.value;
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 1 });
      plot.fn(f, { color: C.blue, width: 3 });
      const y0 = f(x0), y1 = f(x0 + hh);
      const kSec = (y1 - y0) / hh, kTan = df(x0);
      // 切线（绿）
      plot.fn(x => y0 + kTan * (x - x0), { color: C.green, width: 2.2 });
      // 割线（橙）
      plot.fn(x => y0 + kSec * (x - x0), { color: C.orange, width: 2.2, dash: [8, 5] });
      // Δx、Δy 示意
      plot.seg(x0, y0, x0 + hh, y0, { color: C.gray, width: 1.5, dash: [4, 4] });
      plot.seg(x0 + hh, y0, x0 + hh, y1, { color: C.gray, width: 1.5, dash: [4, 4] });
      plot.text(x0 + hh / 2, y0, 'h', { color: C.soft, dy: 16, align: 'center' });
      plot.dot(x0, y0, { color: C.green, r: 6, label: `(x₀, f(x₀))`, labelDy: 20, labelDx: -20 });
      plot.dot(x0 + hh, y1, { color: C.orange, r: 5.5, label: '(x₀+h, f(x₀+h))', labelDy: -12 });
      readout.set(L(`
        ${name}，x₀ = <b>${fmtN(x0,2)}</b><br>
        <span style="color:${C.orange}">●</span> 割线斜率 secant slope：<br>
        　[f(x₀+h)−f(x₀)]/h = <b>${fmtN(kSec,4)}</b><br>
        <span style="color:${C.green}">●</span> 切线斜率 = 导数 f′(x₀) = <b>${fmtN(kTan,4)}</b><br>
        差距：<b>${fmtN(Math.abs(kSec - kTan),4)}</b>
        ${hh <= 0.02 ? '<span class="tag">h→0，割线≈切线！</span>' : '（继续把 h 拖小试试）'}<br>
        ${Math.abs(kTan) < 0.05 ? '<span class="tag">f′(x₀) ≈ 0：可能是极值点</span>' : ''}`, `
        ${name}, x₀ = <b>${fmtN(x0,2)}</b><br>
        <span style="color:${C.orange}">●</span> Secant slope 割线斜率:<br>
        　[f(x₀+h)−f(x₀)]/h = <b>${fmtN(kSec,4)}</b><br>
        <span style="color:${C.green}">●</span> Tangent slope = derivative f′(x₀) = <b>${fmtN(kTan,4)}</b><br>
        Gap: <b>${fmtN(Math.abs(kSec - kTan),4)}</b>
        ${hh <= 0.02 ? '<span class="tag">h→0: secant ≈ tangent!</span>' : '(keep shrinking h)'}<br>
        ${Math.abs(kTan) < 0.05 ? '<span class="tag">f′(x₀) ≈ 0: possible extremum</span>' : ''}`));
    }
    [sx0, sh].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
