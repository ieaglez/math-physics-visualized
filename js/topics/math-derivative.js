'use strict';
/* ===== 导数与切线 Derivative & Tangent Line ===== */
registerTopic({
  id: 'derivative', cat: 'math', icon: '📐',
  title: '导数与切线', en: 'Derivative & Tangent Line',
  desc: '把割线的间距 h 慢慢缩小到 0，亲眼看到割线“变成”切线 —— 这就是导数的定义。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '导数与切线', en: 'Derivative & Tangent Line',
      tagline: '拖动 h 趋近 0，观察割线 (secant) 如何逼近切线 (tangent)。',
      formula: 'f′(x₀) = lim<sub>h→0</sub> <span class="frac"><span>f(x₀+h) − f(x₀)</span><span class="den">h</span></span> ＝ 切线斜率',
      explainHTML: `
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
      `
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
    const sx0 = addSlider(panel, { label: '切点 x₀', en: 'point', min: -3, max: 3, step: 0.05, value: 0.5 });
    const sh = addSlider(panel, { label: '增量 h（拖向 0！）', en: 'increment', min: 0.01, max: 2, step: 0.01, value: 1.5 });
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
      readout.set(`
        ${name}，x₀ = <b>${fmtN(x0,2)}</b><br>
        <span style="color:${C.orange}">●</span> 割线斜率 secant slope：<br>
        　[f(x₀+h)−f(x₀)]/h = <b>${fmtN(kSec,4)}</b><br>
        <span style="color:${C.green}">●</span> 切线斜率 = 导数 f′(x₀) = <b>${fmtN(kTan,4)}</b><br>
        差距：<b>${fmtN(Math.abs(kSec - kTan),4)}</b>
        ${hh <= 0.02 ? '<span class="tag">h→0，割线≈切线！</span>' : '（继续把 h 拖小试试）'}<br>
        ${Math.abs(kTan) < 0.05 ? '<span class="tag">f′(x₀) ≈ 0：可能是极值点</span>' : ''}`);
    }
    [sx0, sh].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
