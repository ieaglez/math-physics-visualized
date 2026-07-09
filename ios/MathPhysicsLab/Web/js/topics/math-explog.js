'use strict';
/* ===== 指数函数与对数函数 Exponential & Logarithmic Functions ===== */
registerTopic({
  id: 'explog', cat: 'math', icon: '🚀',
  title: '指数与对数函数', en: 'Exponential & Logarithm',
  desc: L('改变底数 a，观察 y = aˣ 与 y = log a x 这对互逆函数关于 y = x 的镜像关系。',
          'Change the base a and watch y = aˣ and y = logₐx mirror each other across the line y = x.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '指数与对数函数', en: 'Exponential & Logarithmic Functions',
      tagline: L('拖动底数 a，看指数曲线与对数曲线如何关于直线 y = x 对称。',
                 'Drag the base a and watch the exponential and logarithmic curves stay symmetric about y = x.'),
      formula: L('y = a<sup>x</sup> ⟺ x = log<sub>a</sub> y　（a &gt; 0 且 a ≠ 1，互为反函数）',
                 'y = a<sup>x</sup> ⟺ x = log<sub>a</sub> y　(a &gt; 0, a ≠ 1 — inverse functions)'),
      explainHTML: L(`
        <h2>定义 <span class="en">Definitions</span></h2>
        <p><span class="term">指数函数 <span class="en">(exponential function)</span></span> 与
        <span class="term">对数函数 <span class="en">(logarithmic function)</span></span>（a &gt; 0 且 a ≠ 1）：</p>
        <div class="formula">y = a<sup>x</sup>（x ∈ R）　　y = log<sub>a</sub> x（x &gt; 0）</div>
        <p>两者互为<span class="term">反函数 <span class="en">(inverse functions)</span></span>：
        a<sup>x</sup> = N ⟺ x = log<sub>a</sub> N。它们的图象关于直线 y = x 对称（实验中的灰色虚线）。</p>
        <h2>关键性质 <span class="en">Key Properties</span></h2>
        <ul>
          <li><b>定点</b>：指数函数恒过 (0, 1)（任何数的 0 次方为 1）；对数函数恒过 (1, 0)（log<sub>a</sub>1 = 0）。</li>
          <li><b>单调性 <span class="en">(monotonicity)</span></b>：a &gt; 1 时两者都是增函数；0 &lt; a &lt; 1 时都是减函数。</li>
          <li><b>值域</b>：指数函数 y &gt; 0（图象永远在 x 轴上方）；对数函数值域为 R。</li>
          <li><b>渐近线 <span class="en">(asymptote)</span></b>：指数函数以 x 轴为渐近线，对数函数以 y 轴为渐近线。</li>
        </ul>
        <h2>运算法则 <span class="en">Laws</span></h2>
        <div class="formula">a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup>　　(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup>
          log<sub>a</sub>(MN) = log<sub>a</sub>M + log<sub>a</sub>N　　log<sub>a</sub>M<sup>n</sup> = n·log<sub>a</sub>M</div>
        <div class="tip"><b>实验建议：</b>① 把 a 从 2 慢慢拉到 4，指数曲线“爆炸”得更快了吗？② 把 a 拉到 0.5（小于 1），两条曲线同时变成减函数；③ 注意 a 越过 1 的瞬间，函数会退化成常数 y = 1 —— 这就是为什么定义中要求 a ≠ 1。</div>
        <div class="think"><b>思考一下：</b>指数增长 (exponential growth) 为什么比任何幂函数增长都快？想想细胞分裂：每一步都翻倍，增长速度本身也在翻倍。</div>
      `, `
        <h2>Definitions <span class="en">定义</span></h2>
        <p>The <span class="term">exponential function <span class="en">(指数函数)</span></span> and the
        <span class="term">logarithmic function <span class="en">(对数函数)</span></span> (a &gt; 0 and a ≠ 1):</p>
        <div class="formula">y = a<sup>x</sup>（x ∈ R）　　y = log<sub>a</sub> x（x &gt; 0）</div>
        <p>They are <span class="term">inverse functions <span class="en">(反函数)</span></span> of each other:
        a<sup>x</sup> = N ⟺ x = log<sub>a</sub> N. Their graphs are mirror images across the line y = x (the gray dashed line in the experiment).</p>
        <h2>Key Properties <span class="en">关键性质</span></h2>
        <ul>
          <li><b>Fixed points</b>: every exponential passes through (0, 1) (anything to the 0th power is 1); every logarithm passes through (1, 0) (log<sub>a</sub>1 = 0).</li>
          <li><b>Monotonicity <span class="en">(单调性)</span></b>: both increase when a &gt; 1; both decrease when 0 &lt; a &lt; 1.</li>
          <li><b>Range</b>: the exponential satisfies y &gt; 0 (its graph never touches the x-axis); the logarithm's range is all of R.</li>
          <li><b>Asymptotes <span class="en">(渐近线)</span></b>: the x-axis for the exponential, the y-axis for the logarithm.</li>
        </ul>
        <h2>Laws <span class="en">运算法则</span></h2>
        <div class="formula">a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup>　　(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup>
          log<sub>a</sub>(MN) = log<sub>a</sub>M + log<sub>a</sub>N　　log<sub>a</sub>M<sup>n</sup> = n·log<sub>a</sub>M</div>
        <div class="tip"><b>Try this:</b> ① Slide a from 2 up to 4 — does the exponential "explode" even faster? ② Pull a down to 0.5 (below 1): both curves become decreasing at once; ③ Watch the moment a crosses 1 — the function degenerates into the constant y = 1, which is exactly why the definition requires a ≠ 1.</div>
        <div class="think"><b>Think about it:</b> Why does exponential growth (指数增长) eventually beat every power function? Think of cell division: each step doubles the amount — so the growth rate itself keeps doubling.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -6, xmax: 6, ymin: -6, ymax: 6, equal: true });
    const sa = addSlider(panel, { label: L('底数 a', 'Base a'), en: L('base', '底数'), min: 0.2, max: 4, step: 0.05, value: 2 });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value;
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 2 });
      plot.fn(x => x, { color: '#9ca3af', width: 1.5, dash: [7, 6] });
      plot.text(4.6, 5.1, 'y = x', { color: C.gray });
      if (Math.abs(a - 1) < 0.04) {
        plot.fn(() => 1, { color: C.gray, width: 2 });
        readout.set(L('<span class="warn">a ≈ 1：指数函数退化为常数 y = 1，对数函数不存在。这就是定义要求 a ≠ 1 的原因。</span>',
                      '<span class="warn">a ≈ 1: the exponential degenerates to the constant y = 1 and the logarithm does not exist — exactly why the definition requires a ≠ 1.</span>'));
        return;
      }
      plot.fn(x => Math.pow(a, x), { color: C.blue, width: 3 });
      plot.fn(x => x > 0 ? Math.log(x) / Math.log(a) : NaN, { color: C.red, width: 3 });
      plot.dot(0, 1, { color: C.blue, r: 5, label: '(0, 1)', labelDx: -42 });
      plot.dot(1, 0, { color: C.red, r: 5, label: '(1, 0)', labelDy: 18 });
      plot.text(2.1, Math.min(Math.pow(a, 2.1), 5.5) , ' y = aˣ', { color: C.blue, font: 'bold 14px sans-serif' });
      const lx = 5;
      plot.text(lx, Math.log(lx) / Math.log(a) + (a > 1 ? 0.5 : -0.6), 'y = logₐx', { color: C.red, font: 'bold 14px sans-serif' });
      readout.set(L(`
        底数 a = <b>${fmtN(a,2)}</b>
        <span class="tag">${a > 1 ? '增函数 increasing' : '减函数 decreasing'}</span><br>
        a² = <b>${fmtN(a*a,3)}</b>，a⁻¹ = <b>${fmtN(1/a,3)}</b><br>
        log<sub>a</sub>2 = <b>${fmtN(Math.log(2)/Math.log(a),3)}</b>，
        log<sub>a</sub>10 = <b>${fmtN(Math.log(10)/Math.log(a),3)}</b><br>
        蓝线 y = aˣ 与红线 y = logₐx 关于 y = x 对称`, `
        Base a = <b>${fmtN(a,2)}</b>
        <span class="tag">${a > 1 ? 'increasing 增函数' : 'decreasing 减函数'}</span><br>
        a² = <b>${fmtN(a*a,3)}</b>, a⁻¹ = <b>${fmtN(1/a,3)}</b><br>
        log<sub>a</sub>2 = <b>${fmtN(Math.log(2)/Math.log(a),3)}</b>,
        log<sub>a</sub>10 = <b>${fmtN(Math.log(10)/Math.log(a),3)}</b><br>
        Blue y = aˣ and red y = logₐx are mirror images across y = x`));
    }
    sa.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
