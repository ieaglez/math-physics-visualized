'use strict';
/* ===== 基本不等式 AM-GM Inequality ===== */
registerTopic({
  id: 'amgm', cat: 'math', icon: '⚖️',
  title: '基本不等式', en: 'AM–GM Inequality',
  desc: L('一张半圆图看懂 (a+b)/2 ≥ √(ab)：半径永远不小于半弦，取等仅当 a = b。',
          'One semicircle explains (a+b)/2 ≥ √(ab): a radius is never shorter than a half-chord, with equality only when a = b.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '基本不等式', en: 'AM–GM Inequality (均值不等式)',
      tagline: L('蓝色半径 = 算术平均，绿色竖线 = 几何平均。把 a、b 调成相等，看看会发生什么。',
                 'Blue radius = arithmetic mean; green vertical segment = geometric mean. Make a and b equal and see what happens.'),
      formula: L('<span class="frac"><span>a + b</span><span class="den">2</span></span> ≥ √(ab)（a, b &gt; 0，当且仅当 a = b 取等号）',
                 '<span class="frac"><span>a + b</span><span class="den">2</span></span> ≥ √(ab)　(a, b &gt; 0; equality iff a = b)'),
      explainHTML: L(`
        <h2>两种平均数 <span class="en">Two Kinds of Means</span></h2>
        <ul>
          <li><span class="term">算术平均 <span class="en">(arithmetic mean)</span></span>：(a + b)/2 —— 普通意义的"平均"；</li>
          <li><span class="term">几何平均 <span class="en">(geometric mean)</span></span>：√(ab) —— 增长率、比例问题里的"平均"。</li>
        </ul>
        <div class="formula"><span class="frac"><span>a + b</span><span class="den">2</span></span> ≥ √(ab)
          <span class="note">代数证明：(√a − √b)² ≥ 0 展开即得。几何证明就在上面的实验里！</span></div>
        <h2>半圆里的证明 <span class="en">Proof in a Semicircle</span></h2>
        <p>以 a + b 为直径作半圆，则半径 = (a+b)/2。在 a、b 的分界点 C 作垂线交圆于 D，
        由<span class="term">射影定理 <span class="en">(geometric mean relation)</span></span>可证 CD = √(ab)。
        而"弦上的竖线永远不超过半径"，所以 √(ab) ≤ (a+b)/2，当 C 移到圆心（a = b）时取等 —— 无字证明 (proof without words)！</p>
        <h2>怎么用它求最值 <span class="en">Optimization</span></h2>
        <ul>
          <li><b>积定和最小</b>：ab 固定时，a + b ≥ 2√(ab)，当 a = b 时和最小；</li>
          <li><b>和定积最大</b>：a + b 固定时，ab ≤ ((a+b)/2)²，当 a = b 时积最大 —— 周长一定的矩形中正方形面积最大；</li>
          <li>口诀："一正、二定、三相等"（各量为正、有定值、验证能取等）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 保持 a + b 大致不变（一个调大一个调小），观察 √(ab) 的变化 —— 越接近相等，√(ab) 越大；② 把 a、b 调成完全相等，两条线段重合，等号成立；③ 读数里还给出了完整的均值链：调和 ≤ 几何 ≤ 算术 ≤ 平方。</div>
        <div class="think"><b>思考一下：</b>用长 20 m 的篱笆围一块靠墙的矩形菜地（墙那边不用篱笆），怎样围面积最大？还是"取相等"吗？（提示：设垂直墙的边为 x，则 2x + y = 20。）</div>
      `, `
        <h2>Two Kinds of Means <span class="en">两种平均数</span></h2>
        <ul>
          <li><span class="term">Arithmetic mean <span class="en">(算术平均)</span></span>: (a + b)/2 — the everyday "average";</li>
          <li><span class="term">Geometric mean <span class="en">(几何平均)</span></span>: √(ab) — the right "average" for growth rates and ratios.</li>
        </ul>
        <div class="formula"><span class="frac"><span>a + b</span><span class="den">2</span></span> ≥ √(ab)
          <span class="note">Algebraic proof: expand (√a − √b)² ≥ 0. The geometric proof is the experiment above!</span></div>
        <h2>A Proof in a Semicircle <span class="en">半圆里的证明</span></h2>
        <p>Draw a semicircle with diameter a + b, so the radius is (a+b)/2. At the point C where the two segments meet, raise a perpendicular to the circle at D.
        By the <span class="term">geometric mean relation <span class="en">(射影定理)</span></span>, CD = √(ab).
        Since a chord's vertical segment can never exceed a radius, √(ab) ≤ (a+b)/2 — with equality when C slides to the center (a = b). A proof without words!</p>
        <h2>Using It for Extremes <span class="en">怎么用它求最值</span></h2>
        <ul>
          <li><b>Fixed product → minimum sum</b>: if ab is fixed, a + b ≥ 2√(ab), minimized when a = b;</li>
          <li><b>Fixed sum → maximum product</b>: if a + b is fixed, ab ≤ ((a+b)/2)² — among rectangles of given perimeter, the square has the largest area;</li>
          <li>Checklist: positive values, a fixed quantity, and equality must be attainable.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Keep a + b roughly constant (raise one, lower the other) and watch √(ab) — the closer a and b are, the larger it gets; ② Make a = b exactly: the two segments coincide and equality holds; ③ The readout also shows the full chain: harmonic ≤ geometric ≤ arithmetic ≤ quadratic.</div>
        <div class="think"><b>Think about it:</b> With 20 m of fence, enclose a rectangular garden against a wall (no fence needed on the wall side). What shape maximizes the area — is it still "make them equal"? (Hint: if the side perpendicular to the wall is x, then 2x + y = 20.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sa = addSlider(panel, { label: L('线段 a', 'Segment a'), en: L('segment', '线段'), min: 0.5, max: 8, step: 0.1, value: 6 });
    const sb = addSlider(panel, { label: L('线段 b', 'Segment b'), en: L('segment', '线段'), min: 0.5, max: 8, step: 0.1, value: 2 });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value;
      const R = (a + b) / 2, gm = Math.sqrt(a * b);
      const plot = new Plot(cv, { xmin: -R - 1.6, xmax: R + 3.6, ymin: -1.6, ymax: R + 1.4, equal: true, padB: 16 });
      plot.clear('#fff');
      const { ctx } = cv;
      const cx = 0, C_x = -R + a; // 分界点
      // 半圆
      ctx.save();
      ctx.strokeStyle = '#b9bedf'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(R) - plot.X(0)), Math.PI, 0);
      ctx.stroke();
      ctx.restore();
      // 直径 a + b
      plot.seg(-R, 0, C_x, 0, { color: C.red, width: 5 });
      plot.seg(C_x, 0, R, 0, { color: C.orange, width: 5 });
      plot.text((-R + C_x) / 2, 0, 'a = ' + fmtN(a, 1), { color: C.red, dy: 22, align: 'center', font: 'bold 13px sans-serif' });
      plot.text((C_x + R) / 2, 0, 'b = ' + fmtN(b, 1), { color: C.orange, dy: 22, align: 'center', font: 'bold 13px sans-serif' });
      // 半径 OD'（斜着画到最高点方向？画竖直半径供对比）
      plot.seg(0, 0, 0, R, { color: C.blue, width: 3.5 });
      plot.text(0, R / 2, L('半径 (a+b)/2', 'radius (a+b)/2'), { color: C.blue, dx: -10, align: 'right', font: 'bold 13px sans-serif' });
      // CD = √(ab)
      const D_y = Math.sqrt(Math.max(R * R - C_x * C_x, 0));
      plot.seg(C_x, 0, C_x, D_y, { color: C.green, width: 3.5 });
      plot.text(C_x, D_y / 2, '√(ab)', { color: C.green, dx: 8, font: 'bold 13px sans-serif' });
      // 斜边 OD 与点
      plot.seg(0, 0, C_x, D_y, { color: '#cfd3ea', width: 1.6, dash: [5, 5] });
      plot.dot(0, 0, { color: '#697086', r: 3.5, label: 'O', labelDy: -8 });
      plot.dot(C_x, 0, { color: C.ink, r: 4, label: 'C', labelDy: -8, labelDx: -14 });
      plot.dot(C_x, D_y, { color: C.green, r: 5, label: 'D', labelDy: -8 });
      plot.dot(-R, 0, { color: '#697086', r: 3.5, label: 'A', labelDy: -8, labelDx: -14 });
      plot.dot(R, 0, { color: '#697086', r: 3.5, label: 'B', labelDy: -8 });
      // 右侧对比条
      const barX = R + 1.1, barW = 0.55;
      [[0, R, C.blue, '(a+b)/2'], [1, gm, C.green, '√(ab)']].forEach(([i, v, col, lb]) => {
        const bx = barX + i * (barW + 0.5);
        ctx.fillStyle = col + '33';
        ctx.fillRect(plot.X(bx), plot.Y(v), plot.X(bx + barW) - plot.X(bx), plot.Y(0) - plot.Y(v));
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        ctx.strokeRect(plot.X(bx), plot.Y(v), plot.X(bx + barW) - plot.X(bx), plot.Y(0) - plot.Y(v));
        plot.text(bx + barW / 2, v, fmtN(v, 3), { color: col, dy: -6, align: 'center', font: 'bold 12px sans-serif' });
      });
      const eq = Math.abs(a - b) < 0.05;
      const hm = 2 / (1 / a + 1 / b), qm = Math.sqrt((a * a + b * b) / 2);
      readout.set(L(`
        算术平均 (a+b)/2 = <b style="color:${C.blue}">${fmtN(R,3)}</b><br>
        几何平均 √(ab) = <b style="color:${C.green}">${fmtN(gm,3)}</b><br>
        差值 = <b>${fmtN(R - gm,3)}</b>
        ${eq ? '<span class="tag">a = b：等号成立！</span>' : '（调成 a = b 试试）'}<br>
        完整均值链（调和≤几何≤算术≤平方）：<br>
        <b>${fmtN(hm,2)}</b> ≤ <b>${fmtN(gm,2)}</b> ≤ <b>${fmtN(R,2)}</b> ≤ <b>${fmtN(qm,2)}</b> ✓`, `
        Arithmetic mean (a+b)/2 = <b style="color:${C.blue}">${fmtN(R,3)}</b><br>
        Geometric mean √(ab) = <b style="color:${C.green}">${fmtN(gm,3)}</b><br>
        Gap = <b>${fmtN(R - gm,3)}</b>
        ${eq ? '<span class="tag">a = b: equality holds!</span>' : '(try making a = b)'}<br>
        Full chain (harmonic ≤ geometric ≤ arithmetic ≤ quadratic):<br>
        <b>${fmtN(hm,2)}</b> ≤ <b>${fmtN(gm,2)}</b> ≤ <b>${fmtN(R,2)}</b> ≤ <b>${fmtN(qm,2)}</b> ✓`));
    }
    [sa, sb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
