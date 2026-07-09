'use strict';
/* ===== 反比例函数 Inverse Proportion（初中） ===== */
registerTopic({
  id: 'inverse', cat: 'math', icon: '🪃', stage: 'junior',
  title: '反比例函数', en: 'Inverse Proportion',
  desc: L('拖动 k 和动点 P，发现双曲线上藏着的秘密：矩形面积 |x·y| 永远等于 |k|。',
          'Drag k and the point P to uncover the hyperbola\'s secret: the rectangle\'s area |x·y| always equals |k|.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '反比例函数', en: 'Inverse Proportion y = k/x',
      tagline: L('动点 P 下面那块阴影矩形，无论 P 滑到哪里，面积永远不变 —— 这就是"反比例"的几何本质。',
                 'Wherever P slides, the shaded rectangle beneath it keeps exactly the same area — the geometric heart of "inverse proportion".'),
      formula: L('y = <span class="frac"><span>k</span><span class="den">x</span></span>（k ≠ 0）　⟺　xy = k（乘积恒定）',
                 'y = <span class="frac"><span>k</span><span class="den">x</span></span> (k ≠ 0)　⟺　xy = k (constant product)'),
      explainHTML: L(`
        <h2>什么是反比例 <span class="en">What is Inverse Proportion</span></h2>
        <p>两个量的<b>乘积保持不变</b>时，它们成<span class="term">反比例 <span class="en">(inverse proportion)</span></span>：
        一个翻倍，另一个必然减半。函数形式：</p>
        <div class="formula">y = <span class="frac"><span>k</span><span class="den">x</span></span>　即　xy = k</div>
        <ul>
          <li>图象是<span class="term">双曲线 <span class="en">(hyperbola)</span></span>的两支：k &gt; 0 在一、三象限，k &lt; 0 在二、四象限；</li>
          <li>永远不碰坐标轴（x ≠ 0，y ≠ 0）—— 两条轴是它的<span class="term">渐近线 <span class="en">(asymptotes)</span></span>；</li>
          <li><b>几何本质</b>：曲线上任意一点向两轴作垂线，围成的矩形面积恒为 |k|。</li>
        </ul>
        <h2>生活中的反比例 <span class="en">In Real Life</span></h2>
        <ul>
          <li>路程一定：速度 × 时间 = 路程 → v = s/t，跑得越快用时越短；</li>
          <li>压强与受力面积：F 一定时 p = F/S → 刀刃越薄压强越大；</li>
          <li>杠杆平衡：F·L = 常数 → 力臂越长越省力（第 2 站的杠杆实验就是它！）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 拖动 P 从左滑到右，盯住读数：x·y 一动不动；② 把 k 变成负数，双曲线跳到二、四象限；③ 把 P 拖到很远处，看曲线怎样"贴着" x 轴却永远不碰到。</div>
        <div class="think"><b>思考一下：</b>反比例函数有没有最大值或最小值？为什么 x 越接近 0，y 会冲向无穷大？（提示：k 除以一个越来越小的数。）</div>
      `, `
        <h2>What is Inverse Proportion <span class="en">什么是反比例</span></h2>
        <p>Two quantities are in <span class="term">inverse proportion <span class="en">(反比例)</span></span> when their <b>product stays constant</b>:
        double one, and the other must halve. As a function:</p>
        <div class="formula">y = <span class="frac"><span>k</span><span class="den">x</span></span>　i.e.　xy = k</div>
        <ul>
          <li>The graph is the two branches of a <span class="term">hyperbola <span class="en">(双曲线)</span></span>: quadrants I &amp; III when k &gt; 0, II &amp; IV when k &lt; 0;</li>
          <li>It never touches the axes (x ≠ 0, y ≠ 0) — both axes are its <span class="term">asymptotes <span class="en">(渐近线)</span></span>;</li>
          <li><b>Geometric heart</b>: drop perpendiculars from any point on the curve to the axes — the rectangle formed always has area |k|.</li>
        </ul>
        <h2>In Real Life <span class="en">生活中的反比例</span></h2>
        <ul>
          <li>Fixed distance: speed × time = distance → v = s/t: the faster you go, the less time it takes;</li>
          <li>Pressure and area: with F fixed, p = F/S → a thinner blade means greater pressure;</li>
          <li>Lever balance: F·L = constant → a longer arm means less force (exactly the lever experiment in Stop 2!).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Slide P from left to right and watch the readout: x·y never budges; ② Make k negative — the hyperbola jumps to quadrants II &amp; IV; ③ Drag P far out and watch the curve hug the x-axis without ever touching it.</div>
        <div class="think"><b>Think about it:</b> Does an inverse-proportion function have a maximum or minimum? Why does y blow up as x approaches 0? (Hint: dividing k by a smaller and smaller number.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -10, xmax: 10, ymin: -8, ymax: 8 });
    const sk = addSlider(panel, { label: L('比例系数 k', 'Constant k'), en: L('constant', '比例系数'), min: -12, max: 12, step: 0.5, value: 6 });
    const sp = addSlider(panel, { label: L('动点 P 的横坐标 x', 'Point P: x-coordinate'), en: L('point', '动点'), min: 0.5, max: 9, step: 0.1, value: 2 });
    const readout = addReadout(panel);

    function draw() {
      const k = sk.value;
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 2 });
      if (Math.abs(k) < 0.25) {
        readout.set(L('<span class="warn">k ≈ 0：y 恒为 0，不构成反比例函数（定义要求 k ≠ 0）。</span>',
                      '<span class="warn">k ≈ 0: y is always 0 — not an inverse proportion (the definition requires k ≠ 0).</span>'));
        return;
      }
      plot.fn(x => x > 0.01 ? k / x : NaN, { color: C.blue, width: 3 });
      plot.fn(x => x < -0.01 ? k / x : NaN, { color: C.blue, width: 3 });
      // 动点 P 与面积矩形（P 在右支或按 k 符号在正 x 侧）
      const px = sp.value, py = k / px;
      const { ctx } = cv;
      ctx.save();
      ctx.fillStyle = k > 0 ? 'rgba(91,91,240,.15)' : 'rgba(234,88,12,.15)';
      const X0 = plot.X(0), Y0 = plot.Y(0), XP = plot.X(px), YP = plot.Y(py);
      ctx.fillRect(Math.min(X0, XP), Math.min(Y0, YP), Math.abs(XP - X0), Math.abs(YP - Y0));
      ctx.restore();
      plot.seg(px, 0, px, py, { color: C.gray, width: 1.4, dash: [4, 4] });
      plot.seg(0, py, px, py, { color: C.gray, width: 1.4, dash: [4, 4] });
      plot.dot(px, py, { color: C.red, r: 6.5, label: `P(${fmtN(px,1)}, ${fmtN(py,2)})`, labelDx: 10, labelDy: -10 });
      plot.text(px / 2, py / 2, L('面积 = |xy| = ', 'area = |xy| = ') + fmtN(Math.abs(k), 1), { color: k > 0 ? C.purple : C.orange, align: 'center', font: 'bold 12.5px sans-serif' });
      readout.set(L(`
        y = ${fmtN(k,1)}/x（k = <b>${fmtN(k,1)}</b>）<br>
        <span class="tag">图象位于第 ${k > 0 ? '一、三' : '二、四'} 象限</span><br>
        P 点：x = <b>${fmtN(px,2)}</b>，y = k/x = <b>${fmtN(py,3)}</b><br>
        乘积 x·y = <b style="color:${C.purple}">${fmtN(px * py,2)}</b> ＝ k 恒定 ✓<br>
        矩形面积 |xy| = <b>${fmtN(Math.abs(k),1)}</b>（拖动 P 验证不变）`, `
        y = ${fmtN(k,1)}/x (k = <b>${fmtN(k,1)}</b>)<br>
        <span class="tag">Branches in quadrants ${k > 0 ? 'I & III' : 'II & IV'}</span><br>
        Point P: x = <b>${fmtN(px,2)}</b>, y = k/x = <b>${fmtN(py,3)}</b><br>
        Product x·y = <b style="color:${C.purple}">${fmtN(px * py,2)}</b> = k, constant ✓<br>
        Rectangle area |xy| = <b>${fmtN(Math.abs(k),1)}</b> (drag P to verify)`));
    }
    [sk, sp].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
