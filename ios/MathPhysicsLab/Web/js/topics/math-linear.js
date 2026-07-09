'use strict';
/* ===== 一次函数 Linear Function（初中） ===== */
registerTopic({
  id: 'linear', cat: 'math', icon: '📏', stage: 'junior',
  title: '一次函数', en: 'Linear Function',
  desc: L('拖动 k 和 b，看直线如何变陡、变平、上下平移 —— 所有函数学习的第一课。',
          'Drag k and b to tilt and shift the line — lesson one of all function learning.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '一次函数', en: 'Linear Function',
      tagline: L('k 管倾斜，b 管高低。图中的"斜率三角形"告诉你 k 的真正含义：x 走 1 步，y 走 k 步。',
                 'k controls the tilt, b the height. The "slope triangle" shows what k really means: one step in x, k steps in y.'),
      formula: L('y = kx + b（k ≠ 0）　·　k：斜率 slope　·　b：截距 intercept',
                 'y = kx + b (k ≠ 0)　·　k: slope 斜率　·　b: intercept 截距'),
      explainHTML: L(`
        <h2>什么是一次函数 <span class="en">What is a Linear Function</span></h2>
        <p>形如 <b>y = kx + b</b>（k ≠ 0）的函数叫<span class="term">一次函数 <span class="en">(linear function)</span></span>，
        图象是一条<b>直线</b>。b = 0 时的 y = kx 叫<span class="term">正比例函数 <span class="en">(direct proportion)</span></span>。</p>
        <ul>
          <li><b>k —— 斜率 <span class="en">(slope)</span></b>：x 每增加 1，y 增加 k。k &gt; 0 直线上坡（y 随 x 增大），k &lt; 0 下坡；|k| 越大越陡；</li>
          <li><b>b —— 截距 <span class="en">(y-intercept)</span></b>：直线与 y 轴交点的纵坐标，即 x = 0 时的 y 值；</li>
          <li>与 x 轴交点：令 y = 0，得 x = −b/k。</li>
        </ul>
        <h2>生活中的一次函数 <span class="en">Linear Functions in Real Life</span></h2>
        <ul>
          <li>出租车计费：起步价 b 元 + 每公里 k 元 → 车费 y = kx + b；</li>
          <li>弹簧长度：原长 b + 每挂 1 N 伸长 k → 总长 y = kx + b（胡克定律！）；</li>
          <li>匀速运动：出发点 b + 每秒走 k 米 → 位置 y = kx + b —— 这正是高中物理 x–t 图象的雏形。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定 b 只动 k：直线绕着 y 轴上的点 (0, b) "旋转"；② 固定 k 只动 b：直线平行地上下滑动；③ 观察斜率三角形：无论移到直线哪一段，Δy/Δx 永远等于 k —— 这就是"直线上升的速度处处一样"。</div>
        <div class="think"><b>思考一下：</b>两条一次函数直线什么时候永不相交？（k 相同、b 不同 —— 平行线。）这正是下一课"二元一次方程组无解"的几何原因。</div>
      `, `
        <h2>What is a Linear Function <span class="en">什么是一次函数</span></h2>
        <p>A function of the form <b>y = kx + b</b> (k ≠ 0) is a <span class="term">linear function <span class="en">(一次函数)</span></span>;
        its graph is a <b>straight line</b>. When b = 0, y = kx is called <span class="term">direct proportion <span class="en">(正比例函数)</span></span>.</p>
        <ul>
          <li><b>k — the slope <span class="en">(斜率)</span></b>: each time x grows by 1, y grows by k. k &gt; 0 climbs, k &lt; 0 descends; larger |k| means steeper;</li>
          <li><b>b — the y-intercept <span class="en">(截距)</span></b>: where the line crosses the y-axis (the value of y at x = 0);</li>
          <li>x-intercept: set y = 0 to get x = −b/k.</li>
        </ul>
        <h2>Linear Functions in Real Life <span class="en">生活中的一次函数</span></h2>
        <ul>
          <li>Taxi fare: base fare b + k yuan per km → cost y = kx + b;</li>
          <li>A spring: natural length b + k cm per newton → length y = kx + b (Hooke's law!);</li>
          <li>Steady motion: starting point b + k meters per second → position y = kx + b — the seed of the x–t graphs in high-school physics.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Fix b and move only k: the line "rotates" about the point (0, b) on the y-axis; ② Fix k and move only b: the line slides up and down, staying parallel; ③ Watch the slope triangle: wherever it sits on the line, Δy/Δx always equals k — a line rises at the same rate everywhere.</div>
        <div class="think"><b>Think about it:</b> When do two lines never meet? (Same k, different b — parallel lines.) That is exactly the geometric reason a system of equations can have no solution — the next lesson.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -10, xmax: 10, ymin: -8, ymax: 8 });
    const sk = addSlider(panel, { label: L('斜率 k', 'Slope k'), en: L('slope', '斜率'), min: -3, max: 3, step: 0.1, value: 1.5 });
    const sb = addSlider(panel, { label: L('截距 b', 'Intercept b'), en: L('intercept', '截距'), min: -5, max: 5, step: 0.5, value: 2 });
    const readout = addReadout(panel);

    function draw() {
      const k = sk.value, b = sb.value;
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 2 });
      if (Math.abs(k) < 0.05) {
        plot.fn(() => b, { color: C.gray, width: 2.5, dash: [7, 6] });
        plot.dot(0, b, { color: C.orange, r: 5, label: '(0, ' + fmtN(b, 1) + ')', labelDx: 10 });
        readout.set(L(`<span class="warn">k = 0：退化为常函数 y = ${fmtN(b,1)}（水平线），不再是一次函数。</span>`,
                      `<span class="warn">k = 0: degenerates to the constant y = ${fmtN(b,1)} (a horizontal line) — no longer linear.</span>`));
        return;
      }
      plot.fn(x => k * x + b, { color: C.blue, width: 3 });
      // 斜率三角形：在 x=2 处
      const x0 = 2, y0 = k * x0 + b;
      plot.seg(x0, y0, x0 + 1, y0, { color: C.orange, width: 2.2 });
      plot.seg(x0 + 1, y0, x0 + 1, y0 + k, { color: C.red, width: 2.2 });
      plot.text(x0 + 0.5, y0, 'Δx = 1', { color: C.orange, dy: k > 0 ? 18 : -8, align: 'center', font: 'bold 12px sans-serif' });
      plot.text(x0 + 1, y0 + k / 2, ' Δy = k', { color: C.red, font: 'bold 12px sans-serif' });
      // 截距点与 x 轴交点
      plot.dot(0, b, { color: C.orange, r: 5.5, label: L(`截距 (0, ${fmtN(b,1)})`, `intercept (0, ${fmtN(b,1)})`), labelDx: 10 });
      const xr = -b / k;
      plot.dot(xr, 0, { color: C.green, r: 5, label: `(${fmtN(xr,2)}, 0)`, labelDy: 20 });
      readout.set(L(`
        y = ${fmtN(k,1)}x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}<br>
        斜率 k = <b>${fmtN(k,2)}</b>：x 每 +1，y ${k > 0 ? '+' : '−'}<b>${fmtN(Math.abs(k),2)}</b><br>
        <span class="tag">${k > 0 ? 'y 随 x 增大而增大（上坡）' : 'y 随 x 增大而减小（下坡）'}</span><br>
        与 y 轴交于 (0, <b>${fmtN(b,1)}</b>)，与 x 轴交于 (<b>${fmtN(xr,2)}</b>, 0)<br>
        ${Math.abs(b) < 0.01 ? '<span class="tag">b = 0：正比例函数，过原点！</span>' : `x = 5 时 y = <b>${fmtN(5*k+b,1)}</b>`}`, `
        y = ${fmtN(k,1)}x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}<br>
        Slope k = <b>${fmtN(k,2)}</b>: each +1 in x gives ${k > 0 ? '+' : '−'}<b>${fmtN(Math.abs(k),2)}</b> in y<br>
        <span class="tag">${k > 0 ? 'y increases with x (uphill)' : 'y decreases as x grows (downhill)'}</span><br>
        Crosses the y-axis at (0, <b>${fmtN(b,1)}</b>) and the x-axis at (<b>${fmtN(xr,2)}</b>, 0)<br>
        ${Math.abs(b) < 0.01 ? '<span class="tag">b = 0: direct proportion — through the origin!</span>' : `At x = 5, y = <b>${fmtN(5*k+b,1)}</b>`}`));
    }
    [sk, sb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
