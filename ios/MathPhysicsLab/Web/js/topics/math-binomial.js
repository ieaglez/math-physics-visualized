'use strict';
/* ===== 二项分布 Binomial Distribution ===== */
registerTopic({
  id: 'binomial', cat: 'math', icon: '🎲',
  title: '二项分布', en: 'Binomial Distribution',
  desc: L('调整试验次数 n 和单次成功率 p，看概率分布的形状，并预览它如何逼近正态分布。',
          'Tune the number of trials n and success probability p; watch the distribution\'s shape and preview how it approaches the normal curve.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '二项分布', en: 'Binomial Distribution B(n, p)',
      tagline: L('投 n 次篮、命中 k 次的概率分布。把 n 调大 —— 柱子的轮廓越来越像一条钟形曲线。',
                 'The distribution of making k shots out of n. Raise n — the bars\' outline looks more and more like a bell curve.'),
      formula: 'P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup>(1−p)<sup>n−k</sup>　·　E(X) = np　·　D(X) = np(1−p)',
      explainHTML: L(`
        <h2>什么时候用二项分布 <span class="en">When to Use It</span></h2>
        <p>满足以下条件的 n 次<span class="term">独立重复试验 <span class="en">(independent trials)</span></span>（也叫伯努利试验 Bernoulli trials）：</p>
        <ul>
          <li>每次试验只有两个结果：成功 / 失败；</li>
          <li>每次成功的概率都是同一个 p；</li>
          <li>各次试验互不影响。</li>
        </ul>
        <p>则成功次数 X 服从<span class="term">二项分布 <span class="en">(binomial distribution)</span></span>，记 X ~ B(n, p)。例：投篮 10 次每次命中率 0.7、抛硬币 20 次正面次数、抽检 50 件产品的次品数。</p>
        <div class="formula">P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup>(1−p)<sup>n−k</sup>
          <span class="note">C<sub>n</sub><sup>k</sup> 是组合数：n 次中挑出哪 k 次成功，有 C<sub>n</sub><sup>k</sup> 种选法</span></div>
        <h2>期望与方差 <span class="en">Mean & Variance</span></h2>
        <div class="formula">E(X) = np　　D(X) = np(1−p)　　σ = √(np(1−p))</div>
        <p>期望 np 很直观：命中率 0.7 投 10 次，平均命中 7 次。分布的峰也在 np 附近。</p>
        <h2>通往正态分布 <span class="en">Toward the Normal</span></h2>
        <p>n 越大，二项分布的轮廓越接近正态分布 N(np, np(1−p))（图中虚线）—— 这是<span class="term">中心极限定理 <span class="en">(central limit theorem)</span></span>的雏形，也是"正态分布无处不在"的原因。</p>
        <div class="tip"><b>实验建议：</b>① p = 0.5 时分布左右对称；p 偏离 0.5 则偏斜 —— 往哪边斜？② 固定 p，把 n 从 5 拉到 30，看柱形轮廓如何贴合虚线钟形曲线；③ 读数里 P(X = np 附近) 是最大的吗？</div>
        <div class="think"><b>思考一下：</b>"连续 5 次抛硬币都是正面，第 6 次更可能反面吗？"—— 用独立性的定义回答这个经典误区（赌徒谬误 gambler's fallacy）。</div>
      `, `
        <h2>When to Use It <span class="en">什么时候用二项分布</span></h2>
        <p>For n <span class="term">independent repeated trials <span class="en">(独立重复试验)</span></span> (Bernoulli trials) satisfying:</p>
        <ul>
          <li>each trial has exactly two outcomes: success / failure;</li>
          <li>every trial has the same success probability p;</li>
          <li>trials do not influence each other.</li>
        </ul>
        <p>Then the number of successes X follows the <span class="term">binomial distribution <span class="en">(二项分布)</span></span>, written X ~ B(n, p). Examples: 10 free throws at 70% each, heads in 20 coin flips, defective items among 50 inspected.</p>
        <div class="formula">P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup>(1−p)<sup>n−k</sup>
          <span class="note">C<sub>n</sub><sup>k</sup> counts which k of the n trials succeed</span></div>
        <h2>Mean &amp; Variance <span class="en">期望与方差</span></h2>
        <div class="formula">E(X) = np　　D(X) = np(1−p)　　σ = √(np(1−p))</div>
        <p>The mean np is intuitive: at 70% over 10 shots, you expect 7 hits. The distribution peaks near np too.</p>
        <h2>Toward the Normal <span class="en">通往正态分布</span></h2>
        <p>As n grows, the binomial silhouette approaches the normal distribution N(np, np(1−p)) (the dashed curve) — a first glimpse of the
        <span class="term">central limit theorem <span class="en">(中心极限定理)</span></span>, and the reason normal distributions are everywhere.</p>
        <div class="tip"><b>Try this:</b> ① At p = 0.5 the distribution is symmetric; move p away — which way does it skew? ② Fix p and slide n from 5 to 30, watching the bars hug the dashed bell; ③ Is P(X = k) largest near np in the readout?</div>
        <div class="think"><b>Think about it:</b> "Five heads in a row — is tails more likely on the sixth flip?" Answer this classic trap (the gambler's fallacy 赌徒谬误) using the definition of independence.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 450);
    const sn = addSlider(panel, { label: L('试验次数 n', 'Number of trials n'), en: L('trials', '试验次数'), min: 2, max: 30, step: 1, value: 10 });
    const sp = addSlider(panel, { label: L('单次成功概率 p', 'Success probability p'), en: L('probability', '概率'), min: 0.05, max: 0.95, step: 0.05, value: 0.5 });
    const readout = addReadout(panel);

    function draw() {
      const n = sn.value, p = sp.value, q = 1 - p;
      // 概率表
      const P = [];
      for (let k = 0; k <= n; k++) {
        let c = 1;
        for (let i = 0; i < k; i++) c = c * (n - i) / (i + 1);
        P.push(c * Math.pow(p, k) * Math.pow(q, n - k));
      }
      const pmax = Math.max(...P);
      const plot = new Plot(cv, { xmin: -1, xmax: n + 1, ymin: -pmax * 0.1, ymax: pmax * 1.22, padL: 40, padB: 26 });
      plot.clear('#fff');
      const { ctx } = cv;
      plot.axes({ xLabel: L('k（成功次数）', 'k (successes)'), yLabel: 'P', tickX: n > 15 ? 5 : 1, tickY: 1e9 });
      const mu = n * p, sig = Math.sqrt(n * p * q);
      // 柱
      for (let k = 0; k <= n; k++) {
        const isMode = P[k] === pmax;
        ctx.fillStyle = isMode ? 'rgba(124,58,237,.55)' : 'rgba(91,91,240,.38)';
        const x0 = plot.X(k - 0.38), x1 = plot.X(k + 0.38);
        ctx.fillRect(x0, plot.Y(P[k]), x1 - x0, plot.Y(0) - plot.Y(P[k]));
      }
      // 正态近似曲线
      if (n >= 8) {
        plot.fn(x => Math.exp(-((x - mu) ** 2) / (2 * sig * sig)) / (sig * Math.sqrt(2 * Math.PI)),
          { color: C.orange, width: 2.2, dash: [7, 5] });
        plot.text(mu + 1.6 * sig, pmax * 0.75, L('正态近似 N(np, npq)', 'normal approx. N(np, npq)'), { color: C.orange, font: 'bold 12px sans-serif' });
      }
      // 期望线
      plot.seg(mu, 0, mu, pmax * 1.12, { color: C.red, width: 1.8, dash: [6, 5] });
      plot.text(mu, pmax * 1.12, 'E(X) = np = ' + fmtN(mu, 1), { color: C.red, dy: -6, align: 'center', font: 'bold 12.5px sans-serif' });
      const mode = P.indexOf(pmax);
      readout.set(L(`
        X ~ B(<b>${n}</b>, <b>${fmtN(p,2)}</b>)<br>
        期望 E(X) = np = <b>${fmtN(mu,2)}</b><br>
        方差 D(X) = np(1−p) = <b>${fmtN(n*p*q,2)}</b>，σ = <b>${fmtN(sig,2)}</b><br>
        最可能出现：k = <b>${mode}</b> 次，P = <b>${fmtN(pmax,3)}</b><br>
        P(X=0) = <b>${fmtN(P[0],4)}</b>，P(X=n) = <b>${fmtN(P[n],4)}</b><br>
        ${Math.abs(p - 0.5) < 0.01 ? '<span class="tag">p = 0.5：完美对称</span>' : `<span class="tag">向${p > 0.5 ? '左' : '右'}偏（p ${p > 0.5 ? '>' : '<'} 0.5）</span>`}`, `
        X ~ B(<b>${n}</b>, <b>${fmtN(p,2)}</b>)<br>
        Mean E(X) = np = <b>${fmtN(mu,2)}</b><br>
        Variance D(X) = np(1−p) = <b>${fmtN(n*p*q,2)}</b>, σ = <b>${fmtN(sig,2)}</b><br>
        Most likely: k = <b>${mode}</b>, P = <b>${fmtN(pmax,3)}</b><br>
        P(X=0) = <b>${fmtN(P[0],4)}</b>, P(X=n) = <b>${fmtN(P[n],4)}</b><br>
        ${Math.abs(p - 0.5) < 0.01 ? '<span class="tag">p = 0.5: perfectly symmetric</span>' : `<span class="tag">skewed ${p > 0.5 ? 'left' : 'right'} (p ${p > 0.5 ? '>' : '<'} 0.5)</span>`}`));
    }
    [sn, sp].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
