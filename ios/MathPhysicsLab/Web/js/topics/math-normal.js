'use strict';
/* ===== 正态分布 Normal Distribution ===== */
registerTopic({
  id: 'normal', cat: 'math', icon: '🔔',
  title: '正态分布', en: 'Normal Distribution',
  desc: L('调整均值 μ 和标准差 σ，观察钟形曲线的移动与胖瘦，理解 68-95-99.7 法则。',
          'Adjust the mean μ and standard deviation σ, watch the bell curve shift and widen, and internalize the 68-95-99.7 rule.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '正态分布', en: 'Normal (Gaussian) Distribution',
      tagline: L('μ 决定钟形曲线的位置，σ 决定它的胖瘦 —— 彩色区域就是著名的 68-95-99.7 法则。',
                 'μ sets the bell curve\'s position, σ its width — the shaded bands are the famous 68-95-99.7 rule.'),
      formula: 'X ~ N(μ, σ²)　·　P(μ−σ &lt; X &lt; μ+σ) ≈ 68.3%　P(μ−2σ &lt; X &lt; μ+2σ) ≈ 95.4%',
      explainHTML: L(`
        <h2>钟形曲线 <span class="en">The Bell Curve</span></h2>
        <p>大量独立随机因素叠加的结果往往服从<span class="term">正态分布 <span class="en">(normal distribution)</span></span>，
        记作 X ~ N(μ, σ²)。其概率密度曲线 (probability density curve)：</p>
        <div class="formula">f(x) = <span class="frac"><span>1</span><span class="den">σ√(2π)</span></span> e<sup>−(x−μ)²/2σ²</sup></div>
        <ul>
          <li><b>μ（均值 <span class="en">mean</span>）</b>：曲线的对称轴位置，也是峰值所在 —— 拖动 μ 曲线整体平移；</li>
          <li><b>σ（标准差 <span class="en">standard deviation</span>）</b>：数据的离散程度 —— σ 越大曲线越"矮胖"，越小越"瘦高"；</li>
          <li>曲线下<b>总面积恒等于 1</b>（概率总和），所以变胖必然变矮。</li>
        </ul>
        <h2>68–95–99.7 法则 <span class="en">The Empirical Rule</span></h2>
        <div class="formula">P(μ−σ &lt; X &lt; μ+σ) ≈ 68.3%　　P(μ−2σ &lt; X &lt; μ+2σ) ≈ 95.4%　　P(μ−3σ &lt; X &lt; μ+3σ) ≈ 99.7%</div>
        <ul>
          <li>身高、考试成绩、测量误差……都近似正态分布；</li>
          <li>"3σ 原则"：落在 μ±3σ 之外的概率只有 0.3%，工业上常以此判断异常 (outlier)。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定 μ，把 σ 从 0.5 拉到 2.5：曲线变胖变矮，但读数里各区间的<b>概率比例不变</b> —— 68-95-99.7 是普适的；② 想象考试成绩 N(75, 10²)：μ+σ = 85 分以上的同学约占多少？（(100−68.3)/2 ≈ 15.9%）</div>
        <div class="think"><b>思考一下：</b>为什么把很多骰子的点数加起来，总和的分布会越来越像钟形？（这是中心极限定理 central limit theorem 的直观体现。）</div>
      `, `
        <h2>The Bell Curve <span class="en">钟形曲线</span></h2>
        <p>When many independent random effects add up, the result tends to follow the
        <span class="term">normal distribution <span class="en">(正态分布)</span></span>, written X ~ N(μ, σ²). Its probability density curve:</p>
        <div class="formula">f(x) = <span class="frac"><span>1</span><span class="den">σ√(2π)</span></span> e<sup>−(x−μ)²/2σ²</sup></div>
        <ul>
          <li><b>μ (the mean <span class="en">均值</span>)</b>: the axis of symmetry and the peak — drag μ and the whole curve slides;</li>
          <li><b>σ (the standard deviation <span class="en">标准差</span>)</b>: how spread out the data are — bigger σ means shorter and fatter, smaller means taller and thinner;</li>
          <li>The total area under the curve is <b>always 1</b> (total probability), so fatter must mean shorter.</li>
        </ul>
        <h2>The 68–95–99.7 Rule <span class="en">68–95–99.7 法则</span></h2>
        <div class="formula">P(μ−σ &lt; X &lt; μ+σ) ≈ 68.3%　　P(μ−2σ &lt; X &lt; μ+2σ) ≈ 95.4%　　P(μ−3σ &lt; X &lt; μ+3σ) ≈ 99.7%</div>
        <ul>
          <li>Heights, test scores, measurement errors… all are approximately normal;</li>
          <li>The "3σ rule": only 0.3% of values fall beyond μ±3σ — industry uses this to flag outliers.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Fix μ and pull σ from 0.5 to 2.5: the curve flattens, yet the band percentages in the readout <b>never change</b> — 68-95-99.7 is universal; ② Imagine exam scores N(75, 10²): roughly what fraction scores above μ+σ = 85? ((100−68.3)/2 ≈ 15.9%.)</div>
        <div class="think"><b>Think about it:</b> Why does the sum of many dice rolls look more and more bell-shaped? (That's the central limit theorem 中心极限定理 in action.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const smu = addSlider(panel, { label: L('均值 μ', 'Mean μ'), en: L('mean', '均值'), min: -3, max: 3, step: 0.1, value: 0 });
    const ssig = addSlider(panel, { label: L('标准差 σ', 'Std. deviation σ'), en: L('std. dev.', '标准差'), min: 0.4, max: 2.5, step: 0.05, value: 1 });
    const readout = addReadout(panel);

    function draw() {
      const mu = smu.value, sig = ssig.value;
      const pdf = x => Math.exp(-((x - mu) ** 2) / (2 * sig * sig)) / (sig * Math.sqrt(2 * Math.PI));
      const ymax = pdf(mu) * 1.18;
      const plot = new Plot(cv, { xmin: -8, xmax: 8, ymin: -ymax * 0.08, ymax, padL: 16, padB: 26 });
      plot.clear('#fff');
      const { ctx } = cv;
      // σ 区间着色（从外到内画）
      const bands = [
        { k: 3, color: 'rgba(8,145,178,.13)', label: '99.7%' },
        { k: 2, color: 'rgba(124,58,237,.15)', label: '95.4%' },
        { k: 1, color: 'rgba(91,91,240,.25)', label: '68.3%' }
      ];
      bands.forEach(b => {
        ctx.save();
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.moveTo(plot.X(mu - b.k * sig), plot.Y(0));
        for (let x = mu - b.k * sig; x <= mu + b.k * sig; x += 0.04) ctx.lineTo(plot.X(x), plot.Y(pdf(x)));
        ctx.lineTo(plot.X(mu + b.k * sig), plot.Y(0));
        ctx.closePath(); ctx.fill();
        ctx.restore();
      });
      plot.axes({ xLabel: 'x', yLabel: 'f(x)', tickX: 1, labels: true, tickY: 1e9 });
      // 曲线
      plot.fn(pdf, { color: C.blue, width: 3 });
      // μ 对称轴与 σ 刻度
      plot.seg(mu, 0, mu, pdf(mu), { color: C.red, width: 1.8, dash: [6, 5] });
      plot.text(mu, pdf(mu), 'μ = ' + fmtN(mu, 1), { color: C.red, dy: -8, align: 'center', font: 'bold 13px sans-serif' });
      [[1, 'μ±σ'], [2, 'μ±2σ'], [3, 'μ±3σ']].forEach(([k]) => {
        [-1, 1].forEach(s => {
          const x = mu + s * k * sig;
          plot.seg(x, 0, x, pdf(x), { color: '#b9bedf', width: 1.2, dash: [3, 4] });
        });
      });
      plot.text(mu, pdf(mu + 0.5 * sig) * 0.45, '68.3%', { color: '#3b3bbd', align: 'center', font: 'bold 14px sans-serif' });
      plot.text(mu + 1.45 * sig, pdf(mu + 1.45 * sig) * 0.4, '13.6%', { color: '#7c3aed', align: 'center', font: 'bold 11.5px sans-serif' });
      plot.text(mu - 1.45 * sig, pdf(mu - 1.45 * sig) * 0.4, '13.6%', { color: '#7c3aed', align: 'center', font: 'bold 11.5px sans-serif' });
      readout.set(L(`
        X ~ N(<b>${fmtN(mu,1)}</b>, <b>${fmtN(sig,2)}²</b>)<br>
        峰值高度 f(μ) = <b>${fmtN(pdf(mu),3)}</b>（σ 越小峰越高）<br>
        μ±σ 区间：[<b>${fmtN(mu-sig,2)}</b>, <b>${fmtN(mu+sig,2)}</b>] → 68.3%<br>
        μ±2σ 区间：[<b>${fmtN(mu-2*sig,2)}</b>, <b>${fmtN(mu+2*sig,2)}</b>] → 95.4%<br>
        μ±3σ 区间：[<b>${fmtN(mu-3*sig,2)}</b>, <b>${fmtN(mu+3*sig,2)}</b>] → 99.7%<br>
        曲线下总面积 = <b>1</b>（永远不变）`, `
        X ~ N(<b>${fmtN(mu,1)}</b>, <b>${fmtN(sig,2)}²</b>)<br>
        Peak height f(μ) = <b>${fmtN(pdf(mu),3)}</b> (smaller σ → taller peak)<br>
        μ±σ: [<b>${fmtN(mu-sig,2)}</b>, <b>${fmtN(mu+sig,2)}</b>] → 68.3%<br>
        μ±2σ: [<b>${fmtN(mu-2*sig,2)}</b>, <b>${fmtN(mu+2*sig,2)}</b>] → 95.4%<br>
        μ±3σ: [<b>${fmtN(mu-3*sig,2)}</b>, <b>${fmtN(mu+3*sig,2)}</b>] → 99.7%<br>
        Total area under the curve = <b>1</b> (always)`));
    }
    [smu, ssig].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
