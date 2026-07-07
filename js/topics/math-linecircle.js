'use strict';
/* ===== 直线与圆 Line & Circle ===== */
registerTopic({
  id: 'linecircle', cat: 'math', icon: '🎯',
  title: '直线与圆', en: 'Line & Circle',
  desc: '拖动直线，看它与圆相离、相切、相交的临界过程，弦长公式一目了然。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '直线与圆的位置关系', en: 'Line & Circle',
      tagline: '一切都由"圆心到直线的距离 d 与半径 r 的比较"决定 —— 慢慢平移直线找到相切的瞬间。',
      formula: 'd = <span class="frac"><span>|Ax₀ + By₀ + C|</span><span class="den">√(A² + B²)</span></span>　·　d &lt; r 相交，d = r 相切，d &gt; r 相离　·　弦长 = 2√(r² − d²)',
      explainHTML: `
        <h2>点到直线的距离 <span class="en">Distance from Point to Line</span></h2>
        <div class="formula">直线 Ax + By + C = 0，点 (x₀, y₀)：　d = <span class="frac"><span>|Ax₀ + By₀ + C|</span><span class="den">√(A² + B²)</span></span>
          <span class="note">本实验中直线为 y = kx + b（即 kx − y + b = 0），圆心为原点，故 d = |b|/√(k² + 1)</span></div>
        <h2>三种位置关系 <span class="en">Three Positional Relationships</span></h2>
        <ul>
          <li><b>d &gt; r：相离 <span class="en">(separate)</span></b> —— 无公共点，方程组无解（Δ &lt; 0）；</li>
          <li><b>d = r：相切 <span class="en">(tangent)</span></b> —— 恰有一个公共点，切线垂直于过切点的半径；</li>
          <li><b>d &lt; r：相交 <span class="en">(intersect)</span></b> —— 两个公共点，截出一条<span class="term">弦 <span class="en">(chord)</span></span>。</li>
        </ul>
        <h2>弦长公式 <span class="en">Chord Length</span></h2>
        <div class="formula">弦长 = 2√(r² − d²)
          <span class="note">半弦、d、半径 r 构成直角三角形（图中虚线三角形）—— 勾股定理又立功了</span></div>
        <p>这个"垂径定理"三角形是解直线与圆问题的万能钥匙：已知任意两个量就能求第三个。</p>
        <div class="tip"><b>实验建议：</b>① 固定 k，慢慢调 b 直到读数显示"相切"—— 此时 d 与 r 恰好相等；② 相交时观察虚线直角三角形：d² + (弦/2)² = r² 是否始终成立；③ 把 k 调成 0（水平线），d 就是 |b|，最容易看清。</div>
        <div class="think"><b>思考一下：</b>过圆外一点能作几条圆的切线？切线长怎么算？（提示：切线长 = √(点到圆心距离² − r²)，还是那个直角三角形。）</div>
      `
    });

    const cv = createCanvas(canvasBox, 450);
    const sr = addSlider(panel, { label: '圆半径 r', en: 'radius', min: 1, max: 5, step: 0.1, value: 3 });
    const sk = addSlider(panel, { label: '直线斜率 k', en: 'slope', min: -3, max: 3, step: 0.1, value: 0.5 });
    const sb = addSlider(panel, { label: '截距 b（平移直线）', en: 'intercept', min: -8, max: 8, step: 0.1, value: 4.5 });
    const readout = addReadout(panel);

    function draw() {
      const r = sr.value, k = sk.value, b = sb.value;
      const d = Math.abs(b) / Math.sqrt(k * k + 1);
      const plot = new Plot(cv, { xmin: -9, xmax: 9, ymin: -6.8, ymax: 6.8, equal: true });
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 2 });
      const { ctx } = cv;
      // 圆
      ctx.save();
      ctx.strokeStyle = C.blue; ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(91,91,240,.06)';
      ctx.beginPath();
      ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(r) - plot.X(0)), 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.restore();
      plot.dot(0, 0, { color: C.blue, r: 4, label: 'O', labelDy: 18 });
      // 直线
      plot.fn(x => k * x + b, { color: C.red, width: 2.6 });
      plot.text(7.2, k * 7.2 + b + 0.5, 'y = kx + b', { color: C.red, align: 'right', font: 'bold 13px sans-serif' });
      // 垂足与距离
      const fx = -k * b / (k * k + 1), fy = b / (k * k + 1);
      plot.seg(0, 0, fx, fy, { color: C.purple, width: 2.2, dash: [6, 5] });
      plot.text(fx / 2, fy / 2, 'd', { color: C.purple, dx: 8, font: 'bold 15px sans-serif' });
      plot.dot(fx, fy, { color: C.purple, r: 4 });
      const eps = 0.06;
      let rel, relTag;
      if (d > r + eps) { rel = '相离 separate'; relTag = `d = ${fmtN(d,2)} &gt; r：<b>相离</b>，无公共点`; }
      else if (d < r - eps) {
        rel = '相交 intersect';
        // 交点
        const A = 1 + k * k, B = 2 * k * b, Cc = b * b - r * r;
        const disc = Math.sqrt(B * B - 4 * A * Cc);
        const x1 = (-B - disc) / (2 * A), x2 = (-B + disc) / (2 * A);
        const half = Math.sqrt(r * r - d * d);
        plot.seg(x1, k * x1 + b, x2, k * x2 + b, { color: C.green, width: 4.5 });
        plot.dot(x1, k * x1 + b, { color: C.green, r: 5 });
        plot.dot(x2, k * x2 + b, { color: C.green, r: 5 });
        // 直角三角形：O-垂足-交点
        plot.seg(0, 0, x2, k * x2 + b, { color: '#b9bedf', width: 1.6, dash: [4, 4] });
        relTag = `d = ${fmtN(d,2)} &lt; r：<b>相交</b><br>弦长 = 2√(r²−d²) = <b style="color:${C.green}">${fmtN(2 * half,3)}</b><br>验证勾股：d² + 半弦² = ${fmtN(d*d + half*half,2)} = r² ✓`;
      } else { rel = '相切 tangent'; relTag = `d ≈ r = ${fmtN(r,2)}：<b>相切！</b>切点即垂足，切线 ⊥ 半径`; }
      readout.set(`
        圆：x² + y² = ${fmtN(r * r,1)}（r = ${fmtN(r,1)}）<br>
        直线：y = ${fmtN(k,1)}x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}<br>
        圆心距 d = |b|/√(k²+1) = <b style="color:${C.purple}">${fmtN(d,3)}</b><br>
        <span class="tag">${rel}</span><br>${relTag}`);
    }
    [sr, sk, sb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
