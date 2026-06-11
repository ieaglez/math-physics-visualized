'use strict';
/* ===== 指数函数与对数函数 Exponential & Logarithmic Functions ===== */
registerTopic({
  id: 'explog', cat: 'math', icon: '🚀',
  title: '指数与对数函数', en: 'Exponential & Logarithm',
  desc: '改变底数 a，观察 y = aˣ 与 y = log a x 这对互逆函数关于 y = x 的镜像关系。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '指数与对数函数', en: 'Exponential & Logarithmic Functions',
      tagline: '拖动底数 a，看指数曲线与对数曲线如何关于直线 y = x 对称。',
      formula: 'y = a<sup>x</sup> ⟺ x = log<sub>a</sub> y　（a &gt; 0 且 a ≠ 1，互为反函数）',
      explainHTML: `
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
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -6, xmax: 6, ymin: -6, ymax: 6, equal: true });
    const sa = addSlider(panel, { label: '底数 a', en: 'base', min: 0.2, max: 4, step: 0.05, value: 2 });
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
        readout.set('<span class="warn">a ≈ 1：指数函数退化为常数 y = 1，对数函数不存在。这就是定义要求 a ≠ 1 的原因。</span>');
        return;
      }
      plot.fn(x => Math.pow(a, x), { color: C.blue, width: 3 });
      plot.fn(x => x > 0 ? Math.log(x) / Math.log(a) : NaN, { color: C.red, width: 3 });
      plot.dot(0, 1, { color: C.blue, r: 5, label: '(0, 1)', labelDx: -42 });
      plot.dot(1, 0, { color: C.red, r: 5, label: '(1, 0)', labelDy: 18 });
      plot.text(2.1, Math.min(Math.pow(a, 2.1), 5.5) , ' y = aˣ', { color: C.blue, font: 'bold 14px sans-serif' });
      const lx = 5;
      plot.text(lx, Math.log(lx) / Math.log(a) + (a > 1 ? 0.5 : -0.6), 'y = logₐx', { color: C.red, font: 'bold 14px sans-serif' });
      readout.set(`
        底数 a = <b>${fmtN(a,2)}</b>
        <span class="tag">${a > 1 ? '增函数 increasing' : '减函数 decreasing'}</span><br>
        a² = <b>${fmtN(a*a,3)}</b>，a⁻¹ = <b>${fmtN(1/a,3)}</b><br>
        log<sub>a</sub>2 = <b>${fmtN(Math.log(2)/Math.log(a),3)}</b>，
        log<sub>a</sub>10 = <b>${fmtN(Math.log(10)/Math.log(a),3)}</b><br>
        蓝线 y = aˣ 与红线 y = logₐx 关于 y = x 对称`);
    }
    sa.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
