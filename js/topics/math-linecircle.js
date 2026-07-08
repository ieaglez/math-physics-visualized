'use strict';
/* ===== 直线与圆 Line & Circle ===== */
registerTopic({
  id: 'linecircle', cat: 'math', icon: '🎯',
  title: '直线与圆', en: 'Line & Circle',
  desc: L('拖动直线，看它与圆相离、相切、相交的临界过程，弦长公式一目了然。',
          'Drag the line through separate, tangent and intersecting positions — the chord-length formula becomes obvious.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '直线与圆的位置关系', en: 'Line & Circle',
      tagline: L('一切都由"圆心到直线的距离 d 与半径 r 的比较"决定 —— 慢慢平移直线找到相切的瞬间。',
                 'Everything hinges on comparing the center-to-line distance d with the radius r — slide the line slowly to catch the tangent moment.'),
      formula: L('d = <span class="frac"><span>|Ax₀ + By₀ + C|</span><span class="den">√(A² + B²)</span></span>　·　d &lt; r 相交，d = r 相切，d &gt; r 相离　·　弦长 = 2√(r² − d²)',
                 'd = <span class="frac"><span>|Ax₀ + By₀ + C|</span><span class="den">√(A² + B²)</span></span>　·　d &lt; r intersect, d = r tangent, d &gt; r separate　·　chord = 2√(r² − d²)'),
      explainHTML: L(`
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
      `, `
        <h2>Distance from a Point to a Line <span class="en">点到直线的距离</span></h2>
        <div class="formula">Line Ax + By + C = 0, point (x₀, y₀):　d = <span class="frac"><span>|Ax₀ + By₀ + C|</span><span class="den">√(A² + B²)</span></span>
          <span class="note">Here the line is y = kx + b (i.e. kx − y + b = 0) and the center is the origin, so d = |b|/√(k² + 1)</span></div>
        <h2>Three Positional Relationships <span class="en">三种位置关系</span></h2>
        <ul>
          <li><b>d &gt; r: separate <span class="en">(相离)</span></b> — no common point; the system has no solution (Δ &lt; 0);</li>
          <li><b>d = r: tangent <span class="en">(相切)</span></b> — exactly one common point; the tangent is perpendicular to the radius at the point of tangency;</li>
          <li><b>d &lt; r: intersecting <span class="en">(相交)</span></b> — two common points, cutting a <span class="term">chord <span class="en">(弦)</span></span>.</li>
        </ul>
        <h2>Chord Length <span class="en">弦长公式</span></h2>
        <div class="formula">chord = 2√(r² − d²)
          <span class="note">Half-chord, d, and radius r form a right triangle (the dashed triangle) — Pythagoras strikes again</span></div>
        <p>This "perpendicular-bisector triangle" is the master key to line–circle problems: any two of the three quantities give you the third.</p>
        <div class="tip"><b>Try this:</b> ① Fix k and slide b until the readout says "tangent" — d equals r at that instant; ② While intersecting, check the dashed right triangle: does d² + (chord/2)² = r² always hold? ③ Set k = 0 (horizontal line) — then d is simply |b|, easiest to see.</div>
        <div class="think"><b>Think about it:</b> From a point outside a circle, how many tangent lines can you draw? How long are they? (Hint: tangent length = √(distance² − r²) — the same right triangle again.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 450);
    const sr = addSlider(panel, { label: L('圆半径 r', 'Radius r'), en: L('radius', '半径'), min: 1, max: 5, step: 0.1, value: 3 });
    const sk = addSlider(panel, { label: L('直线斜率 k', 'Slope k'), en: L('slope', '斜率'), min: -3, max: 3, step: 0.1, value: 0.5 });
    const sb = addSlider(panel, { label: L('截距 b（平移直线）', 'Intercept b (slides the line)'), en: L('intercept', '截距'), min: -8, max: 8, step: 0.1, value: 4.5 });
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
      if (d > r + eps) { rel = L('相离 separate', 'separate 相离'); relTag = L(`d = ${fmtN(d,2)} &gt; r：<b>相离</b>，无公共点`, `d = ${fmtN(d,2)} &gt; r: <b>separate</b>, no common point`); }
      else if (d < r - eps) {
        rel = L('相交 intersect', 'intersecting 相交');
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
        relTag = L(`d = ${fmtN(d,2)} &lt; r：<b>相交</b><br>弦长 = 2√(r²−d²) = <b style="color:${C.green}">${fmtN(2 * half,3)}</b><br>验证勾股：d² + 半弦² = ${fmtN(d*d + half*half,2)} = r² ✓`,
                   `d = ${fmtN(d,2)} &lt; r: <b>intersecting</b><br>Chord = 2√(r²−d²) = <b style="color:${C.green}">${fmtN(2 * half,3)}</b><br>Pythagoras check: d² + (half-chord)² = ${fmtN(d*d + half*half,2)} = r² ✓`);
      } else { rel = L('相切 tangent', 'tangent 相切'); relTag = L(`d ≈ r = ${fmtN(r,2)}：<b>相切！</b>切点即垂足，切线 ⊥ 半径`, `d ≈ r = ${fmtN(r,2)}: <b>tangent!</b> The foot of the perpendicular is the tangency point; tangent ⊥ radius`); }
      readout.set(L(`
        圆：x² + y² = ${fmtN(r * r,1)}（r = ${fmtN(r,1)}）<br>
        直线：y = ${fmtN(k,1)}x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}<br>
        圆心距 d = |b|/√(k²+1) = <b style="color:${C.purple}">${fmtN(d,3)}</b><br>
        <span class="tag">${rel}</span><br>${relTag}`, `
        Circle: x² + y² = ${fmtN(r * r,1)} (r = ${fmtN(r,1)})<br>
        Line: y = ${fmtN(k,1)}x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}<br>
        Distance d = |b|/√(k²+1) = <b style="color:${C.purple}">${fmtN(d,3)}</b><br>
        <span class="tag">${rel}</span><br>${relTag}`));
    }
    [sr, sk, sb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
