'use strict';
/* ===== 数列 Sequences ===== */
registerTopic({
  id: 'sequence', cat: 'math', icon: '🪜',
  title: '数列：等差与等比', en: 'Arithmetic & Geometric',
  desc: '调整首项与公差/公比，看数列的"形状"：等差是直线，等比是指数爆炸或衰减。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '数列：等差与等比', en: 'Arithmetic & Geometric Sequences',
      tagline: '左边是数列的前 12 项（柱状），观察等差数列的"直线感"和等比数列的"爆炸感"。',
      formula: '等差：a<sub>n</sub> = a₁ + (n−1)d　·　等比：a<sub>n</sub> = a₁·q<sup>n−1</sup>',
      explainHTML: `
        <h2>等差数列 <span class="en">Arithmetic Sequence</span></h2>
        <p>从第二项起，每项与前一项的<b>差</b>为同一常数 d（<span class="term">公差 <span class="en">(common difference)</span></span>）：</p>
        <div class="formula">a<sub>n</sub> = a₁ + (n−1)d　　S<sub>n</sub> = <span class="frac"><span>n(a₁ + a<sub>n</sub>)</span><span class="den">2</span></span> = na₁ + <span class="frac"><span>n(n−1)</span><span class="den">2</span></span>d</div>
        <ul>
          <li>图象特征：各点落在一条<b>直线</b>上（aₙ 是 n 的一次函数，斜率 = d）；</li>
          <li>求和公式的由来：高斯求 1+2+…+100 —— 首尾配对，每对都是 101，共 50 对；</li>
          <li>等差中项：2a<sub>n</sub> = a<sub>n−1</sub> + a<sub>n+1</sub>。</li>
        </ul>
        <h2>等比数列 <span class="en">Geometric Sequence</span></h2>
        <p>从第二项起，每项与前一项的<b>比</b>为同一常数 q（<span class="term">公比 <span class="en">(common ratio)</span></span>，q ≠ 0）：</p>
        <div class="formula">a<sub>n</sub> = a₁·q<sup>n−1</sup>　　S<sub>n</sub> = <span class="frac"><span>a₁(1 − q<sup>n</sup>)</span><span class="den">1 − q</span></span>（q ≠ 1）</div>
        <ul>
          <li>图象特征：各点落在<b>指数曲线</b>上 —— 和指数函数一脉相承；</li>
          <li>|q| &gt; 1：指数增长（爆炸）；0 &lt; |q| &lt; 1：指数衰减，且 n → ∞ 时 S<sub>n</sub> → <span class="frac"><span>a₁</span><span class="den">1−q</span></span>（无穷等比数列求和）；</li>
          <li>q &lt; 0：正负交替振荡。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 等差模式下改变 d 的正负，柱顶连线的"斜率"如何变？② 切到等比，q = 0.5，看 Sₙ 读数逐渐逼近 a₁/(1−q) = 2a₁，却永远到不了 —— 这就是极限；③ q = −0.8 试试振荡衰减。</div>
        <div class="think"><b>思考一下：</b>“一尺之棰，日取其半，万世不竭”说的是哪种数列？棋盘放麦粒（每格翻倍）又是哪种？为什么后者会让国王破产？</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const mode = addSeg(panel, {
      options: [
        { label: '等差数列 d', value: 'arith' },
        { label: '等比数列 q', value: 'geo' }
      ],
      value: 'arith', onChange: () => { syncSliders(); draw(); }
    });
    const sa1 = addSlider(panel, { label: '首项 a₁', en: 'first term', min: -5, max: 8, step: 0.5, value: 2 });
    const sd = addSlider(panel, { label: '公差 d', en: 'common diff.', min: -3, max: 3, step: 0.1, value: 1.5 });
    const sq = addSlider(panel, { label: '公比 q', en: 'common ratio', min: -1.6, max: 1.6, step: 0.05, value: 0.5 });
    const readout = addReadout(panel);
    const N = 12;

    function syncSliders() {
      sd.input.parentElement.style.display = mode.value === 'arith' ? '' : 'none';
      sq.input.parentElement.style.display = mode.value === 'geo' ? '' : 'none';
    }

    function term(n) { // n 从 1 开始
      return mode.value === 'arith'
        ? sa1.value + (n - 1) * sd.value
        : sa1.value * Math.pow(sq.value, n - 1);
    }
    function sum(n) {
      if (mode.value === 'arith') return n * sa1.value + n * (n - 1) / 2 * sd.value;
      const q = sq.value;
      return Math.abs(q - 1) < 1e-9 ? n * sa1.value : sa1.value * (1 - Math.pow(q, n)) / (1 - q);
    }

    function draw() {
      let lo = 0, hi = 1;
      for (let n = 1; n <= N; n++) { const v = term(n); lo = Math.min(lo, v); hi = Math.max(hi, v); }
      const plot = new Plot(cv, { xmin: 0, xmax: N + 1, ymin: lo - (hi - lo) * 0.12 - 0.5, ymax: hi + (hi - lo) * 0.15 + 0.5, padL: 36, padB: 22 });
      plot.clear('#fff');
      plot.grid(1, niceStep((hi - lo) / 6));
      plot.axes({ xLabel: 'n', yLabel: 'aₙ', tickX: 1, tickY: niceStep((hi - lo) / 6) });
      const { ctx } = cv;
      // 柱 + 点
      for (let n = 1; n <= N; n++) {
        const v = term(n);
        ctx.fillStyle = v >= 0 ? 'rgba(91,91,240,.25)' : 'rgba(220,38,38,.22)';
        const x0 = plot.X(n - 0.28), x1 = plot.X(n + 0.28), y0 = plot.Y(0), y1 = plot.Y(v);
        ctx.fillRect(x0, Math.min(y0, y1), x1 - x0, Math.abs(y1 - y0));
        plot.dot(n, v, { color: v >= 0 ? C.blue : C.red, r: 4 });
      }
      // 趋势线/曲线
      if (mode.value === 'arith') {
        plot.fn(x => sa1.value + (x - 1) * sd.value, { color: C.orange, width: 1.8, dash: [6, 5], xmin: 0.6, xmax: N + 0.4 });
        plot.text(N - 2.6, term(N - 2.6 | 0), '点都在一条直线上', { color: C.orange, dy: -14 });
      } else if (sq.value > 0) {
        plot.fn(x => sa1.value * Math.pow(sq.value, x - 1), { color: C.orange, width: 1.8, dash: [6, 5], xmin: 0.6, xmax: N + 0.4 });
        plot.text(3, term(3), '点都在指数曲线上', { color: C.orange, dy: -14 });
      }
      function niceStepLocal(x) { return niceStep(x); }
      const q = sq.value, isGeo = mode.value === 'geo';
      const limit = isGeo && Math.abs(q) < 1 ? sa1.value / (1 - q) : null;
      readout.set(`
        ${isGeo ? `a₁ = <b>${fmtN(sa1.value,1)}</b>，q = <b>${fmtN(q,2)}</b>` : `a₁ = <b>${fmtN(sa1.value,1)}</b>，d = <b>${fmtN(sd.value,1)}</b>`}<br>
        a₅ = <b>${fmtN(term(5),3)}</b>　a₁₂ = <b>${fmtN(term(12),3)}</b><br>
        S₅ = <b>${fmtN(sum(5),3)}</b>　S₁₂ = <b>${fmtN(sum(12),3)}</b><br>
        ${isGeo
          ? (Math.abs(q) < 1
              ? `|q| &lt; 1：无穷项和收敛于 <span class="frac"></span><b>a₁/(1−q) = ${fmtN(limit,3)}</b> <span class="tag">极限！</span>`
              : Math.abs(q) > 1 ? '<span class="tag">|q| &gt; 1：指数爆炸增长</span>' : 'q = ±1：特殊情形')
          : `每项差恒为 d：a₂−a₁ = ${fmtN(term(2)-term(1),2)}，a₈−a₇ = ${fmtN(term(8)-term(7),2)} ✓`}`);
    }
    function niceStep(x) {
      if (!isFinite(x) || x <= 0) return 1;
      const p = Math.pow(10, Math.floor(Math.log10(x)));
      const r = x / p;
      return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * p;
    }
    [sa1, sd, sq].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    syncSliders();
    draw();
    return () => cv.destroy();
  }
});
