'use strict';
/* ===== 二次函数 Quadratic Function ===== */
registerTopic({
  id: 'quadratic', cat: 'math', icon: '📈',
  title: '二次函数', en: 'Quadratic Function',
  desc: L('拖动 a、b、c 三个系数，观察抛物线的开口、顶点、对称轴和零点如何变化。',
          'Drag the coefficients a, b, c and watch the parabola\'s opening, vertex, axis of symmetry and roots respond.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '二次函数', en: 'Quadratic Function',
      tagline: L('拖动系数 a、b、c，观察抛物线 (parabola) 的形状与位置如何随之改变。',
                 'Drag the coefficients a, b, c and see how the parabola (抛物线) changes shape and position.'),
      formula: L('y = ax<sup>2</sup> + bx + c　·　顶点 x = −<span class="frac"><span>b</span><span class="den">2a</span></span>　·　Δ = b<sup>2</sup> − 4ac',
                 'y = ax<sup>2</sup> + bx + c　·　vertex x = −<span class="frac"><span>b</span><span class="den">2a</span></span>　·　Δ = b<sup>2</sup> − 4ac'),
      explainHTML: L(`
        <h2>核心概念 <span class="en">Key Ideas</span></h2>
        <p>形如下式的函数叫做<span class="term">二次函数 <span class="en">(quadratic function)</span></span>，其中 a ≠ 0：</p>
        <div class="formula">y = ax<sup>2</sup> + bx + c</div>
        <p>它的图象是一条<span class="term">抛物线 <span class="en">(parabola)</span></span>：</p>
        <ul>
          <li><b>a 决定开口方向和宽窄</b>：a &gt; 0 开口向上，a &lt; 0 开口向下；|a| 越大，开口越窄。</li>
          <li><b>对称轴 <span class="en">(axis of symmetry)</span></b>：直线 x = −b / 2a。</li>
          <li><b>顶点 <span class="en">(vertex)</span></b>：抛物线的最高（或最低）点，是函数的最值点。</li>
        </ul>
        <div class="formula">
          顶点坐标：( −<span class="frac"><span>b</span><span class="den">2a</span></span> ,
          <span class="frac"><span>4ac − b<sup>2</sup></span><span class="den">4a</span></span> )
        </div>
        <h2>判别式与零点 <span class="en">Discriminant &amp; Roots</span></h2>
        <p>令 y = 0 得到一元二次方程 ax² + bx + c = 0，<span class="term">判别式 <span class="en">(discriminant)</span></span> Δ 决定抛物线与 x 轴的交点个数：</p>
        <div class="formula">Δ = b<sup>2</sup> − 4ac，
          x = <span class="frac"><span>−b ± √Δ</span><span class="den">2a</span></span>
        </div>
        <ul>
          <li>Δ &gt; 0：与 x 轴有 <b>2 个交点</b>（两个不相等实根 two distinct real roots）；</li>
          <li>Δ = 0：与 x 轴<b>相切于 1 点</b>（重根 repeated root），顶点恰好在 x 轴上；</li>
          <li>Δ &lt; 0：与 x 轴<b>没有交点</b>（无实根 no real roots）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定 b、c，只动 a，体会"开口方向与宽窄"；② 把 Δ 调到恰好等于 0（读数会变色提示），看看顶点是不是正好落在 x 轴上；③ 只动 c，整条曲线如何平移？</div>
        <div class="think"><b>思考一下：</b>为什么对称轴是 x = −b/2a？提示：把两根 x₁、x₂ 的中点用韦达定理 (Vieta's formulas) x₁ + x₂ = −b/a 表示出来。</div>
      `, `
        <h2>Key Ideas <span class="en">核心概念</span></h2>
        <p>A function of the form below, with a ≠ 0, is called a <span class="term">quadratic function <span class="en">(二次函数)</span></span>:</p>
        <div class="formula">y = ax<sup>2</sup> + bx + c</div>
        <p>Its graph is a <span class="term">parabola <span class="en">(抛物线)</span></span>:</p>
        <ul>
          <li><b>a controls the opening</b>: a &gt; 0 opens upward, a &lt; 0 opens downward; the larger |a|, the narrower the parabola.</li>
          <li><b>Axis of symmetry <span class="en">(对称轴)</span></b>: the line x = −b / 2a.</li>
          <li><b>Vertex <span class="en">(顶点)</span></b>: the highest (or lowest) point — where the function reaches its extreme value.</li>
        </ul>
        <div class="formula">
          Vertex: ( −<span class="frac"><span>b</span><span class="den">2a</span></span> ,
          <span class="frac"><span>4ac − b<sup>2</sup></span><span class="den">4a</span></span> )
        </div>
        <h2>Discriminant &amp; Roots <span class="en">判别式与零点</span></h2>
        <p>Setting y = 0 gives the quadratic equation ax² + bx + c = 0. The <span class="term">discriminant <span class="en">(判别式)</span></span> Δ decides how many times the parabola meets the x-axis:</p>
        <div class="formula">Δ = b<sup>2</sup> − 4ac,
          x = <span class="frac"><span>−b ± √Δ</span><span class="den">2a</span></span>
        </div>
        <ul>
          <li>Δ &gt; 0: <b>2 intersection points</b> (two distinct real roots 两个不等实根);</li>
          <li>Δ = 0: <b>tangent to the x-axis</b> (a repeated root 重根) — the vertex sits exactly on the axis;</li>
          <li>Δ &lt; 0: <b>no intersection</b> (no real roots 无实根).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Fix b and c, move only a to feel how the opening direction and width change; ② Tune Δ to exactly 0 (the readout highlights it) and check that the vertex lands on the x-axis; ③ Move only c — how does the whole curve shift?</div>
        <div class="think"><b>Think about it:</b> Why is the axis of symmetry x = −b/2a? Hint: express the midpoint of the roots x₁, x₂ using Vieta's formulas (韦达定理): x₁ + x₂ = −b/a.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -10, xmax: 10, ymin: -10, ymax: 10 });
    const sa = addSlider(panel, { label: L('二次项系数 a', 'Coefficient a'), en: L('coefficient', '二次项系数'), min: -3, max: 3, step: 0.1, value: 1 });
    const sb = addSlider(panel, { label: L('一次项系数 b', 'Coefficient b'), en: L('coefficient', '一次项系数'), min: -10, max: 10, step: 0.2, value: -2 });
    const sc = addSlider(panel, { label: L('常数项 c', 'Constant c'), en: L('constant', '常数项'), min: -10, max: 10, step: 0.2, value: -3 });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value, c = sc.value;
      plot.clear('#fff');
      plot.grid(2);
      plot.axes({ tickX: 2 });
      if (Math.abs(a) < 0.05) {
        plot.fn(x => b * x + c, { color: C.gray, dash: [6, 5] });
        readout.set(L(
          `<span class="warn">a ≈ 0：退化为一次函数（直线）y = ${fmtN(b,1)}x + ${fmtN(c,1)}，不再是二次函数。</span>`,
          `<span class="warn">a ≈ 0: degenerates to a linear function y = ${fmtN(b,1)}x + ${fmtN(c,1)} — no longer quadratic.</span>`));
        return;
      }
      const xv = -b / (2 * a), yv = c - b * b / (4 * a);
      const delta = b * b - 4 * a * c;
      plot.seg(xv, -10, xv, 10, { color: C.purple, width: 1.5, dash: [6, 5] });
      plot.text(xv, 9.3, L('对称轴 x = ', 'axis x = ') + fmtN(xv, 2), { color: C.purple, dx: 6 });
      plot.fn(x => a * x * x + b * x + c, { color: C.blue, width: 3 });
      plot.dot(xv, yv, { color: C.red, label: L(`顶点 (${fmtN(xv,2)}, ${fmtN(yv,2)})`, `vertex (${fmtN(xv,2)}, ${fmtN(yv,2)})`), labelDy: a > 0 ? 22 : -12, labelDx: -30 });
      let rootsHTML;
      if (delta > 0.0001) {
        const r = Math.sqrt(delta), x1 = (-b - r) / (2 * a), x2 = (-b + r) / (2 * a);
        plot.dot(x1, 0, { color: C.green, r: 4.5, label: 'x₁=' + fmtN(x1, 2), labelDy: -10 });
        plot.dot(x2, 0, { color: C.green, r: 4.5, label: 'x₂=' + fmtN(x2, 2), labelDy: -10 });
        rootsHTML = L(`两个零点：x₁ = <b>${fmtN(x1,2)}</b>，x₂ = <b>${fmtN(x2,2)}</b>`,
                      `Two roots: x₁ = <b>${fmtN(x1,2)}</b>, x₂ = <b>${fmtN(x2,2)}</b>`);
      } else if (delta > -0.0001) {
        plot.dot(xv, 0, { color: C.green, r: 4.5 });
        rootsHTML = L(`<span class="tag">Δ = 0</span> 抛物线与 x 轴相切，重根 x = <b>${fmtN(xv,2)}</b>`,
                      `<span class="tag">Δ = 0</span> Tangent to the x-axis — repeated root x = <b>${fmtN(xv,2)}</b>`);
      } else {
        rootsHTML = L('与 x 轴无交点（无实根 no real roots）', 'No intersection with the x-axis (no real roots 无实根)');
      }
      readout.set(L(`
        函数：y = ${fmtN(a,1)}x² ${b>=0?'+':'−'} ${fmtN(Math.abs(b),1)}x ${c>=0?'+':'−'} ${fmtN(Math.abs(c),1)}<br>
        开口：<b>${a > 0 ? '向上 (opens upward)' : '向下 (opens downward)'}</b><br>
        顶点 vertex：(<b>${fmtN(xv,2)}</b>, <b>${fmtN(yv,2)}</b>)<br>
        判别式 Δ = b²−4ac = <b>${fmtN(delta,2)}</b><br>${rootsHTML}`, `
        Function: y = ${fmtN(a,1)}x² ${b>=0?'+':'−'} ${fmtN(Math.abs(b),1)}x ${c>=0?'+':'−'} ${fmtN(Math.abs(c),1)}<br>
        Opens: <b>${a > 0 ? 'upward 向上' : 'downward 向下'}</b><br>
        Vertex 顶点: (<b>${fmtN(xv,2)}</b>, <b>${fmtN(yv,2)}</b>)<br>
        Discriminant Δ = b²−4ac = <b>${fmtN(delta,2)}</b><br>${rootsHTML}`));
    }
    [sa, sb, sc].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
