'use strict';
/* ===== 三角函数图象变换 y = A·sin(ωx + φ) + k ===== */
registerTopic({
  id: 'transform', cat: 'math', icon: '🎚️',
  title: '函数图象变换', en: 'Graph Transformations',
  desc: '调 A、ω、φ、k 四个旋钮，把 y = sin x 拉伸、压缩、平移成任何正弦型函数。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '函数图象变换', en: 'Transformations: y = A·sin(ωx + φ) + k',
      tagline: '灰色虚线是 y = sin x 原型。四个参数各管一件事：振幅、周期、左右平移、上下平移。',
      formula: 'y = A·sin(ωx + φ) + k　·　周期 T = <span class="frac"><span>2π</span><span class="den">ω</span></span>　·　左右平移 = −<span class="frac"><span>φ</span><span class="den">ω</span></span>',
      explainHTML: `
        <h2>四个参数，四种变换 <span class="en">Four Parameters, Four Transformations</span></h2>
        <ul>
          <li><b>A —— 振幅 <span class="en">(amplitude)</span></b>：纵向伸缩。图象在 k−A 和 k+A 之间摆动；</li>
          <li><b>ω —— 角频率</b>：横向伸缩。<span class="term">周期 <span class="en">(period)</span></span> T = 2π/ω，ω 越大挤得越密；</li>
          <li><b>φ —— 初相 <span class="en">(initial phase)</span></b>：左右平移。图象向<b>左</b>移 φ/ω（φ &gt; 0 时）—— 注意是 φ/ω 不是 φ！</li>
          <li><b>k —— 上下平移</b>：整体抬高或压低，中轴线变为 y = k。</li>
        </ul>
        <h2>变换的顺序 <span class="en">Order Matters</span></h2>
        <p>由 y = sin x 得到 y = A·sin(ωx + φ) + k 的标准路径：</p>
        <ol>
          <li>左移 φ：y = sin(x + φ)；</li>
          <li>横坐标缩为原来的 1/ω：y = sin(ωx + φ)；</li>
          <li>纵坐标伸长 A 倍：y = A·sin(ωx + φ)；</li>
          <li>上移 k。</li>
        </ol>
        <p>若先伸缩后平移，平移量就要按 φ/ω 计算 —— 这是最常见的易错点，用滑块动手体会最直观。</p>
        <div class="tip"><b>实验建议：</b>① 只动 ω，观察一个周期的"宽度"如何被压缩；② 设 ω = 2、φ = π/3，图象实际向左移了 π/6（不是 π/3！）—— 看读数里的"平移量"；③ 把 A 调成 1、ω 调成 1、φ 调到 π/2，得到的正是 y = cos x —— 余弦就是提前 90° 的正弦。</div>
        <div class="think"><b>思考一下：</b>物理里的简谐运动 x = A·cos(ωt + φ)、交流电 u = U₀sin(ωt)，跟这里是同一个数学模型 —— 参数各自对应什么物理量？</div>
      `
    });

    const cv = createCanvas(canvasBox, 450);
    const sA = addSlider(panel, { label: '振幅 A', en: 'amplitude', min: 0.3, max: 2.5, step: 0.1, value: 1.5 });
    const sW = addSlider(panel, { label: '角频率 ω', en: 'angular freq.', min: 0.5, max: 4, step: 0.25, value: 2 });
    const sPhi = addSlider(panel, {
      label: '初相 φ', en: 'phase', min: -12, max: 12, step: 1, value: 4,
      fmt: v => v === 0 ? '0' : (() => { const g = (a, b) => b ? g(b, a % b) : a; const d = g(Math.abs(v), 12); const n = v / d, m = 12 / d; return `${n === 1 ? '' : n === -1 ? '−' : n}π${m === 1 ? '' : '/' + m}`; })()
    });
    const sK = addSlider(panel, { label: '上下平移 k', en: 'vertical shift', min: -2, max: 2, step: 0.1, value: 0.5 });
    const readout = addReadout(panel);

    function draw() {
      const A = sA.value, w = sW.value, phi = sPhi.value * Math.PI / 12, k = sK.value;
      const plot = new Plot(cv, { xmin: -7.2, xmax: 7.2, ymin: -4.2, ymax: 4.2, padB: 20 });
      plot.clear('#fff');
      plot.grid(Math.PI / 2, 1);
      const { ctx } = cv;
      // 自定义 x 轴 π 刻度
      plot.axes({ tickX: 1e9, tickY: 1, labels: true });
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      [[-2, '−2π'], [-1, '−π'], [1, 'π'], [2, '2π']].forEach(([m, lb]) => {
        ctx.fillText(lb, plot.X(m * Math.PI), plot.Y(0) + 16);
      });
      ctx.textAlign = 'left';
      // 中轴线 y = k
      plot.seg(-7.2, k, 7.2, k, { color: '#fbbf24', width: 1.4, dash: [6, 5] });
      plot.text(6.9, k, 'y = k', { color: '#b45309', dy: -6, align: 'right' });
      // 原型与变换后
      plot.fn(Math.sin, { color: '#b9bedf', width: 2, dash: [7, 6] });
      plot.fn(x => A * Math.sin(w * x + phi) + k, { color: C.blue, width: 3 });
      plot.text(-6.9, 1.25, 'y = sin x（原型）', { color: '#8a91b4' });
      // 峰值标记 + 周期标注
      const xPeak = (Math.PI / 2 - phi) / w;
      const T = 2 * Math.PI / w;
      plot.dot(xPeak, A + k, { color: C.red, r: 5, label: '最高点', labelDy: -10 });
      plot.seg(xPeak, A + k + 0.45, xPeak + T, A + k + 0.45, { color: C.green, width: 2 });
      plot.dot(xPeak, A + k + 0.45, { color: C.green, r: 2.5 });
      plot.dot(xPeak + T, A + k + 0.45, { color: C.green, r: 2.5 });
      plot.text(xPeak + T / 2, A + k + 0.45, 'T = ' + fmtN(T, 2), { color: C.green, dy: -7, align: 'center', font: 'bold 12px sans-serif' });
      const shift = -phi / w;
      readout.set(`
        y = <b>${fmtN(A,1)}</b>·sin(<b>${fmtN(w,2)}</b>x ${phi >= 0 ? '+' : '−'} <b>${fmtN(Math.abs(phi),2)}</b>) ${k >= 0 ? '+' : '−'} <b>${fmtN(Math.abs(k),1)}</b><br>
        周期 T = 2π/ω = <b>${fmtN(T,3)}</b>　频率 = <b>${fmtN(1/T,3)}</b><br>
        值域：[<b>${fmtN(k - A,2)}</b>, <b>${fmtN(k + A,2)}</b>]<br>
        左右平移量 = −φ/ω = <b>${fmtN(shift,3)}</b>
        （向${shift < 0 ? '左' : shift > 0 ? '右' : '—'}移 ${fmtN(Math.abs(shift),3)}）<br>
        ${Math.abs(A - 1) < 0.05 && Math.abs(w - 1) < 0.05 && Math.abs(k) < 0.05 && Math.abs(phi - Math.PI / 2) < 0.05 ? '<span class="tag">这就是 y = cos x！</span>' : '中轴线：y = ' + fmtN(k, 1)}`);
    }
    [sA, sW, sPhi, sK].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
