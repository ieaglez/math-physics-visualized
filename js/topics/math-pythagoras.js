'use strict';
/* ===== 勾股定理 Pythagorean Theorem（初中） ===== */
registerTopic({
  id: 'pythagoras', cat: 'math', icon: '🔺', stage: 'junior',
  title: '勾股定理', en: 'Pythagorean Theorem',
  desc: L('拖动两条直角边，三个正方形的面积实时变化 —— 亲眼看到 a² + b² 恰好等于 c²。',
          'Drag the two legs and watch the three squares\' areas update live — seeing with your own eyes that a² + b² exactly equals c².'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '勾股定理', en: 'Pythagorean Theorem (勾股定理)',
      tagline: L('每条边上立着一个正方形：两个小的面积加起来，永远等于大的那个。',
                 'A square stands on each side: the two smaller areas always add up to exactly the largest one.'),
      formula: 'a² + b² = c²',
      explainHTML: L(`
        <h2>定理内容 <span class="en">The Theorem</span></h2>
        <p>直角三角形中，两条<span class="term">直角边 <span class="en">(legs)</span></span> a、b 与<span class="term">斜边 <span class="en">(hypotenuse)</span></span> c 满足：</p>
        <div class="formula">a² + b² = c²
          <span class="note">用面积说：两条直角边上正方形的面积之和 = 斜边上正方形的面积</span></div>
        <ul>
          <li>中国古称"勾三股四弦五"：勾、股是两直角边，弦是斜边 —— 《周髀算经》比毕达哥拉斯更早记载了 3² + 4² = 5²；</li>
          <li><b>逆定理</b>同样重要：若 a² + b² = c²，则这个三角形必是直角三角形 —— 木工用 3-4-5 拉绳放直角就靠它；</li>
          <li>满足等式的整数组叫<span class="term">勾股数 <span class="en">(Pythagorean triples)</span></span>：(3,4,5)、(5,12,13)、(6,8,10)、(8,15,17)……</li>
        </ul>
        <h2>它为什么重要 <span class="en">Why It Matters</span></h2>
        <ul>
          <li>平面上任意两点的距离公式 √((x₂−x₁)²+(y₂−y₁)²) 就是勾股定理；</li>
          <li>高中的单位圆恒等式 sin²θ + cos²θ = 1、向量的模、解析几何的一切距离计算，全部源于它；</li>
          <li>它是人类历史上被证明次数最多的定理 —— 已知 400 多种证法，包括一位美国总统（加菲尔德）的梯形证法。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 a、b 调成 3 和 4，看 c 是不是恰好 5（面积 9 + 16 = 25）；② 找出另外两组勾股数（试试 6,8 和 5,12）；③ a = b 时 c = a√2 —— 这就是等腰直角三角形与 √2 的来历。</div>
        <div class="think"><b>思考一下：</b>如果三角形不是直角三角形，a² + b² 和 c² 谁大谁小？（锐角时 a²+b² &gt; c²，钝角时反过来 —— 这正是高中余弦定理 c² = a²+b²−2ab·cosC 的雏形。）</div>
      `, `
        <h2>The Theorem <span class="en">定理内容</span></h2>
        <p>In a right triangle, the two <span class="term">legs <span class="en">(直角边)</span></span> a, b and the <span class="term">hypotenuse <span class="en">(斜边)</span></span> c satisfy:</p>
        <div class="formula">a² + b² = c²
          <span class="note">In terms of area: the squares on the two legs together exactly fill the square on the hypotenuse</span></div>
        <ul>
          <li>The ancient Chinese "gou 3, gu 4, xian 5": the Zhoubi Suanjing recorded 3² + 4² = 5² even before Pythagoras;</li>
          <li>The <b>converse</b> matters just as much: if a² + b² = c², the triangle must be right-angled — carpenters lay out right angles with a 3-4-5 rope;</li>
          <li>Integer solutions are called <span class="term">Pythagorean triples <span class="en">(勾股数)</span></span>: (3,4,5), (5,12,13), (6,8,10), (8,15,17)…</li>
        </ul>
        <h2>Why It Matters <span class="en">它为什么重要</span></h2>
        <ul>
          <li>The distance formula √((x₂−x₁)²+(y₂−y₁)²) between any two points is the Pythagorean theorem;</li>
          <li>The unit-circle identity sin²θ + cos²θ = 1, vector magnitudes, every distance in analytic geometry — all descend from it;</li>
          <li>It is the most-proved theorem in history — over 400 known proofs, including one by a U.S. president (Garfield's trapezoid proof).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Set a, b to 3 and 4 — is c exactly 5 (areas 9 + 16 = 25)? ② Find two more triples (try 6, 8 and 5, 12); ③ With a = b, c = a√2 — the origin of the isosceles right triangle and √2.</div>
        <div class="think"><b>Think about it:</b> If the triangle is not right-angled, how do a² + b² and c² compare? (Acute: a²+b² &gt; c²; obtuse: the reverse — exactly the seed of the high-school law of cosines c² = a²+b²−2ab·cosC.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 480);
    const sa = addSlider(panel, { label: L('直角边 a', 'Leg a'), en: L('leg', '直角边'), min: 1, max: 6, step: 0.1, value: 3 });
    const sb = addSlider(panel, { label: L('直角边 b', 'Leg b'), en: L('leg', '直角边'), min: 1, max: 6, step: 0.1, value: 4 });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value, c = Math.hypot(a, b);
      // 三角形：直角在原点，A=(0,0) B=(a,0) C=(0,b)
      const plot = new Plot(cv, { xmin: -b - 1.5, xmax: a + c * 0.75 + 1.5, ymin: -a - 1.5, ymax: b + c * 0.75 + 1.5, equal: true, padL: 6, padR: 6, padT: 6, padB: 6 });
      plot.clear('#fff');
      const { ctx } = cv;
      const poly = (pts, fill, stroke) => {
        ctx.save();
        ctx.beginPath();
        pts.forEach((p, i) => { const X = plot.X(p[0]), Y = plot.Y(p[1]); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); });
        ctx.closePath();
        ctx.fillStyle = fill; ctx.fill();
        ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();
      };
      // a² 正方形（在下方）
      poly([[0, 0], [a, 0], [a, -a], [0, -a]], 'rgba(234,88,12,.18)', '#ea580c');
      // b² 正方形（在左侧）
      poly([[0, 0], [0, b], [-b, b], [-b, 0]], 'rgba(8,145,178,.18)', '#0891b2');
      // c² 正方形（斜边外侧）：B=(a,0), C=(0,b)，向外法向 n = (b, a)/c
      const nx = b / c, ny = a / c;
      poly([[a, 0], [0, b], [0 + nx * c, b + ny * c], [a + nx * c, 0 + ny * c]], 'rgba(124,58,237,.18)', '#7c3aed');
      // 三角形本体
      poly([[0, 0], [a, 0], [0, b]], 'rgba(91,91,240,.25)', '#4547c9');
      // 直角小方块
      plot.seg(0.32, 0, 0.32, 0.32, { color: '#4547c9', width: 1.6 });
      plot.seg(0, 0.32, 0.32, 0.32, { color: '#4547c9', width: 1.6 });
      // 标注
      plot.text(a / 2, -a / 2, 'a² = ' + fmtN(a * a, 1), { color: '#c2410c', align: 'center', font: 'bold 14px sans-serif', dy: 5 });
      plot.text(-b / 2, b / 2, 'b² = ' + fmtN(b * b, 1), { color: '#0e7490', align: 'center', font: 'bold 14px sans-serif', dy: 5 });
      plot.text((a + 0) / 2 + nx * c / 2, (0 + b) / 2 + ny * c / 2, 'c² = ' + fmtN(c * c, 1), { color: '#6d28d9', align: 'center', font: 'bold 14px sans-serif', dy: 5 });
      plot.text(a / 2, 0, 'a', { color: '#c2410c', dy: -8, align: 'center', font: 'bold 13px sans-serif' });
      plot.text(0, b / 2, 'b', { color: '#0e7490', dx: 10, font: 'bold 13px sans-serif' });
      plot.text(a / 2, b / 2, 'c', { color: '#6d28d9', dx: 8, dy: -8, font: 'bold 13px sans-serif' });
      const isTriple = [a, b, c].every(v => Math.abs(v - Math.round(v)) < 0.02);
      readout.set(L(`
        a = <b>${fmtN(a,1)}</b>，b = <b>${fmtN(b,1)}</b><br>
        斜边 c = √(a²+b²) = <b>${fmtN(c,3)}</b><br>
        面积验证：<span style="color:#c2410c">${fmtN(a*a,1)}</span> + <span style="color:#0e7490">${fmtN(b*b,1)}</span>
        = <b style="color:#6d28d9">${fmtN(a*a+b*b,1)}</b> = c² ✓<br>
        ${isTriple ? `<span class="tag">勾股数！(${fmtN(a,0)}, ${fmtN(b,0)}, ${fmtN(c,0)})</span>` :
          Math.abs(a - b) < 0.05 ? '<span class="tag">a = b：等腰直角，c = a√2</span>' : L2_zh(a,b)}`, `
        a = <b>${fmtN(a,1)}</b>, b = <b>${fmtN(b,1)}</b><br>
        Hypotenuse c = √(a²+b²) = <b>${fmtN(c,3)}</b><br>
        Area check: <span style="color:#c2410c">${fmtN(a*a,1)}</span> + <span style="color:#0e7490">${fmtN(b*b,1)}</span>
        = <b style="color:#6d28d9">${fmtN(a*a+b*b,1)}</b> = c² ✓<br>
        ${isTriple ? `<span class="tag">A Pythagorean triple! (${fmtN(a,0)}, ${fmtN(b,0)}, ${fmtN(c,0)})</span>` :
          Math.abs(a - b) < 0.05 ? '<span class="tag">a = b: isosceles right triangle, c = a√2</span>' : L2_en(a,b)}`));
    }
    function L2_zh(a, b) { return `试试把 a、b 调成 3 和 4？`; }
    function L2_en(a, b) { return `Try setting a, b to 3 and 4!`; }
    [sa, sb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
