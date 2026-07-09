'use strict';
/* ===== 二元一次方程组 Systems of Linear Equations（初中） ===== */
registerTopic({
  id: 'linsys', cat: 'math', icon: '✂️', stage: 'junior',
  title: '二元一次方程组', en: 'Linear Systems',
  desc: L('每个方程是一条直线，解方程组就是找两条直线的交点 —— 拖动系数亲眼看到"无解"和"无穷多解"。',
          'Each equation is a line; solving the system means finding where they cross — drag the sliders to see "no solution" and "infinitely many" with your own eyes.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '二元一次方程组', en: 'Systems of Linear Equations',
      tagline: L('蓝线和红线的交点，就是同时满足两个方程的那组 (x, y)。把两条线调平行试试？',
                 'The crossing point of the blue and red lines is the (x, y) satisfying both equations. Try making the lines parallel!'),
      formula: L('方程组的解 ⟺ 两条直线的交点　·　平行 → 无解　·　重合 → 无穷多解',
                 'Solution of the system ⟺ intersection of the two lines　·　parallel → none　·　identical → infinitely many'),
      explainHTML: L(`
        <h2>方程就是直线 <span class="en">An Equation is a Line</span></h2>
        <p>一个二元一次方程（如 y = x + 1）有无数组解，把它们都画出来，恰好是一条<b>直线</b>。
        <span class="term">二元一次方程组 <span class="en">(system of linear equations)</span></span>要求两个方程<b>同时</b>成立 ——
        几何上就是找两条直线的<span class="term">公共点 <span class="en">(intersection)</span></span>。</p>
        <h2>三种可能 <span class="en">Three Possibilities</span></h2>
        <ul>
          <li><b>相交（k₁ ≠ k₂）</b>：恰好一个交点 → <b>唯一解</b>（最常见）；</li>
          <li><b>平行（k₁ = k₂，b₁ ≠ b₂）</b>：永不相交 → <b>无解</b>；</li>
          <li><b>重合（k₁ = k₂，b₁ = b₂）</b>：处处相交 → <b>无穷多解</b>。</li>
        </ul>
        <h2>代数解法与几何的对应 <span class="en">Algebra ↔ Geometry</span></h2>
        <p>课本里的<span class="term">代入消元法 <span class="en">(substitution)</span></span>和<span class="term">加减消元法 <span class="en">(elimination)</span></span>，
        算出来的 (x, y) 正是图上的交点坐标。令两式相等 k₁x + b₁ = k₂x + b₂，解得：</p>
        <div class="formula">x = <span class="frac"><span>b₂ − b₁</span><span class="den">k₁ − k₂</span></span>
          <span class="note">分母是 k₁ − k₂ —— 这就是为什么 k₁ = k₂（平行）时"除不了"，方程组无解</span></div>
        <div class="tip"><b>实验建议：</b>① 随意调动四个滑块，读数里的解永远等于图上交点；② 把 k₂ 慢慢调到与 k₁ 相等：交点飞向无穷远，最后"无解"—— 平行线的含义一目了然；③ 保持 k 相等再把 b₂ 调到与 b₁ 相等：两线重合，无穷多解。</div>
        <div class="think"><b>思考一下：</b>鸡兔同笼："头共 35，脚共 94"就是一个方程组。两个"条件"各画一条线，答案藏在交点里 —— 你能写出这两个方程吗？</div>
      `, `
        <h2>An Equation is a Line <span class="en">方程就是直线</span></h2>
        <p>A single linear equation in two variables (like y = x + 1) has infinitely many solutions — plot them all and you get a <b>straight line</b>.
        A <span class="term">system of linear equations <span class="en">(二元一次方程组)</span></span> demands both equations hold <b>at once</b> —
        geometrically, finding the lines' <span class="term">intersection <span class="en">(公共点)</span></span>.</p>
        <h2>Three Possibilities <span class="en">三种可能</span></h2>
        <ul>
          <li><b>Crossing (k₁ ≠ k₂)</b>: exactly one intersection → <b>a unique solution</b> (the common case);</li>
          <li><b>Parallel (k₁ = k₂, b₁ ≠ b₂)</b>: never meet → <b>no solution</b>;</li>
          <li><b>Identical (k₁ = k₂, b₁ = b₂)</b>: meet everywhere → <b>infinitely many solutions</b>.</li>
        </ul>
        <h2>Algebra ↔ Geometry <span class="en">代数与几何的对应</span></h2>
        <p>The textbook methods — <span class="term">substitution <span class="en">(代入消元)</span></span> and <span class="term">elimination <span class="en">(加减消元)</span></span> —
        produce exactly the intersection's coordinates. Setting k₁x + b₁ = k₂x + b₂ gives:</p>
        <div class="formula">x = <span class="frac"><span>b₂ − b₁</span><span class="den">k₁ − k₂</span></span>
          <span class="note">the denominator is k₁ − k₂ — which is why parallel lines (k₁ = k₂) make the division impossible: no solution</span></div>
        <div class="tip"><b>Try this:</b> ① Move all four sliders freely — the solution in the readout always matches the crossing point; ② Slowly tune k₂ to equal k₁: the intersection flies off to infinity and finally "no solution" — parallel lines, visualized; ③ Keep the k's equal and match b₂ to b₁: the lines coincide — infinitely many solutions.</div>
        <div class="think"><b>Think about it:</b> The classic "chickens and rabbits: 35 heads, 94 feet" is a system. Each condition draws one line, and the answer hides at the crossing — can you write the two equations?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -10, xmax: 10, ymin: -8, ymax: 8 });
    const sk1 = addSlider(panel, { label: L('直线① 斜率 k₁', 'Line ① slope k₁'), en: L('slope', '斜率'), min: -3, max: 3, step: 0.1, value: 1 });
    const sb1 = addSlider(panel, { label: L('直线① 截距 b₁', 'Line ① intercept b₁'), en: L('intercept', '截距'), min: -5, max: 5, step: 0.5, value: -1 });
    const sk2 = addSlider(panel, { label: L('直线② 斜率 k₂', 'Line ② slope k₂'), en: L('slope', '斜率'), min: -3, max: 3, step: 0.1, value: -0.5 });
    const sb2 = addSlider(panel, { label: L('直线② 截距 b₂', 'Line ② intercept b₂'), en: L('intercept', '截距'), min: -5, max: 5, step: 0.5, value: 3 });
    const readout = addReadout(panel);

    function draw() {
      const k1 = sk1.value, b1 = sb1.value, k2 = sk2.value, b2 = sb2.value;
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 2 });
      plot.fn(x => k1 * x + b1, { color: C.blue, width: 3 });
      plot.fn(x => k2 * x + b2, { color: C.red, width: 3 });
      plot.text(8.2, k1 * 8.2 + b1, '①', { color: C.blue, font: 'bold 15px sans-serif', dy: -6 });
      plot.text(-8.6, k2 * -8.6 + b2, '②', { color: C.red, font: 'bold 15px sans-serif', dy: -6 });
      const eqStr = L(
        `方程组：y = ${fmtN(k1,1)}x ${b1>=0?'+':'−'} ${fmtN(Math.abs(b1),1)}　与　y = ${fmtN(k2,1)}x ${b2>=0?'+':'−'} ${fmtN(Math.abs(b2),1)}`,
        `System: y = ${fmtN(k1,1)}x ${b1>=0?'+':'−'} ${fmtN(Math.abs(b1),1)}　and　y = ${fmtN(k2,1)}x ${b2>=0?'+':'−'} ${fmtN(Math.abs(b2),1)}`);
      if (Math.abs(k1 - k2) < 0.001) {
        if (Math.abs(b1 - b2) < 0.001) {
          readout.set(eqStr + L(`<br><span class="tag">两线重合 → 无穷多解</span><br>直线上每一个点都是解！`,
                                `<br><span class="tag">Lines coincide → infinitely many solutions</span><br>Every point on the line is a solution!`));
        } else {
          readout.set(eqStr + L(`<br><span class="warn">k₁ = k₂ 且 b₁ ≠ b₂：两线平行 → 无解</span><br>永远找不到同时在两条线上的点。`,
                                `<br><span class="warn">k₁ = k₂ with b₁ ≠ b₂: parallel lines → no solution</span><br>No point can lie on both lines.`));
        }
        return;
      }
      const x = (b2 - b1) / (k1 - k2);
      const y = k1 * x + b1;
      plot.seg(x, 0, x, y, { color: C.gray, width: 1.4, dash: [4, 4] });
      plot.seg(0, y, x, y, { color: C.gray, width: 1.4, dash: [4, 4] });
      plot.dot(x, y, { color: C.purple, r: 7, stroke: '#fff', label: `(${fmtN(x,2)}, ${fmtN(y,2)})`, labelDx: 10, labelDy: -10 });
      readout.set(eqStr + L(`<br>
        唯一解（交点）：x = <b>${fmtN(x,3)}</b>，y = <b>${fmtN(y,3)}</b><br>
        验证①：${fmtN(k1,1)}×${fmtN(x,2)} ${b1>=0?'+':'−'} ${fmtN(Math.abs(b1),1)} = <b>${fmtN(k1*x+b1,2)}</b> ✓<br>
        验证②：${fmtN(k2,1)}×${fmtN(x,2)} ${b2>=0?'+':'−'} ${fmtN(Math.abs(b2),1)} = <b>${fmtN(k2*x+b2,2)}</b> ✓`, `<br>
        Unique solution (the crossing): x = <b>${fmtN(x,3)}</b>, y = <b>${fmtN(y,3)}</b><br>
        Check ①: ${fmtN(k1,1)}×${fmtN(x,2)} ${b1>=0?'+':'−'} ${fmtN(Math.abs(b1),1)} = <b>${fmtN(k1*x+b1,2)}</b> ✓<br>
        Check ②: ${fmtN(k2,1)}×${fmtN(x,2)} ${b2>=0?'+':'−'} ${fmtN(Math.abs(b2),1)} = <b>${fmtN(k2*x+b2,2)}</b> ✓`));
    }
    [sk1, sb1, sk2, sb2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
