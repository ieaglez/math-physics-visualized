'use strict';
/* ===== 圆周角定理 Inscribed Angle Theorem（初中） ===== */
registerTopic({
  id: 'circleangle', cat: 'math', icon: '⭕', stage: 'junior',
  title: '圆周角定理', en: 'Inscribed Angle Theorem',
  desc: L('拖动圆上的点 P，圆周角始终是圆心角的一半 —— 直径对的圆周角永远是 90°。',
          'Drag P around the circle: the inscribed angle is always half the central angle — and any angle on a diameter is exactly 90°.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '圆周角定理', en: 'Inscribed Angle Theorem',
      tagline: L('同一条弧 AB，站在圆心看是 2θ，站在圆周上任何位置看都是 θ —— 拖动 P 验证"同弧所对圆周角相等"。',
                 'The same arc AB looks like 2θ from the center but θ from anywhere on the circle — drag P to verify that all inscribed angles on one arc are equal.'),
      formula: L('圆周角 = <span class="frac"><span>1</span><span class="den">2</span></span> × 同弧圆心角　·　直径所对的圆周角 = 90°',
                 'Inscribed angle = <span class="frac"><span>1</span><span class="den">2</span></span> × central angle (same arc)　·　angle in a semicircle = 90°'),
      explainHTML: L(`
        <h2>定理内容 <span class="en">The Theorem</span></h2>
        <div class="formula">同弧所对：圆周角 = ½ 圆心角
          <span class="note">圆心角 (central angle)：顶点在圆心；圆周角 (inscribed angle)：顶点在圆上</span></div>
        <ul>
          <li><b>推论 1</b>：同弧（或等弧）所对的圆周角<b>相等</b> —— P 在优弧上随便滑，角度不变；</li>
          <li><b>推论 2</b>：<b>直径</b>所对的圆周角是 <b>90°</b>（半圆的圆心角是 180°，一半正好 90°）—— 泰勒斯定理；</li>
          <li><b>推论 3</b>：90° 的圆周角所对的弦是直径 —— 反过来也成立。</li>
        </ul>
        <h2>它有什么用 <span class="en">Why It's Useful</span></h2>
        <ul>
          <li>找直角：木匠用"直角尺贴圆"找圆心，正是泰勒斯定理的逆用；</li>
          <li>高中的<b>正弦定理 a/sinA = 2R</b> 的证明核心就是"同弧圆周角相等 + 直径对直角"；</li>
          <li>四点共圆、托勒密定理等竞赛内容，全部从这条定理出发。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 拖动 P 沿圆滑动：θ 纹丝不动（同弧圆周角相等）；② 调整 A、B 使弦 AB 恰好过圆心（圆心角 = 180°）：θ 变成 90° —— 直角凭空出现；③ 对比读数：圆心角永远是圆周角的 2 倍。</div>
        <div class="think"><b>思考一下：</b>足球射门的"最佳射门角"问题：球员沿直线带球，什么位置看球门的张角最大？（提示：过球门两柱作圆与跑动路线相切，切点就是答案 —— 圆周角定理的经典应用。）</div>
      `, `
        <h2>The Theorem <span class="en">定理内容</span></h2>
        <div class="formula">On the same arc: inscribed angle = ½ × central angle
          <span class="note">central angle (圆心角): vertex at the center; inscribed angle (圆周角): vertex on the circle</span></div>
        <ul>
          <li><b>Corollary 1</b>: inscribed angles on the same arc are <b>equal</b> — slide P anywhere along the major arc and θ doesn't budge;</li>
          <li><b>Corollary 2</b>: the angle subtended by a <b>diameter</b> is <b>90°</b> (a semicircle's central angle is 180°, and half of that is 90°) — Thales' theorem;</li>
          <li><b>Corollary 3</b>: conversely, a 90° inscribed angle stands on a diameter.</li>
        </ul>
        <h2>Why It's Useful <span class="en">它有什么用</span></h2>
        <ul>
          <li>Finding right angles: carpenters locate a circle's center with a set square — Thales in reverse;</li>
          <li>The high-school <b>law of sines a/sinA = 2R</b> is proved with "equal inscribed angles + right angle on a diameter";</li>
          <li>Concyclic points, Ptolemy's theorem and much competition geometry all start here.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Slide P along the circle: θ stays fixed (equal angles on the same arc); ② Adjust A and B until the chord passes through the center (central angle = 180°): θ snaps to 90° — a right angle out of thin air; ③ Watch the readout: the central angle is always exactly twice θ.</div>
        <div class="think"><b>Think about it:</b> The striker's "best shooting angle": running along a line, where does the goal subtend the widest angle? (Hint: draw the circle through both goalposts tangent to the running line — the tangency point is the answer, a classic use of this theorem.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sA = addSlider(panel, { label: L('点 A 的位置', 'Point A'), en: L('position', '位置'), min: 150, max: 260, step: 1, value: 200, unit: '°' });
    const sB = addSlider(panel, { label: L('点 B 的位置', 'Point B'), en: L('position', '位置'), min: 280, max: 390, step: 1, value: 340, unit: '°' });
    const sP = addSlider(panel, { label: L('圆周角顶点 P（拖我！）', 'Vertex P (drag me!)'), en: L('vertex', '顶点'), min: 10, max: 130, step: 1, value: 70, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const R = 3;
      const pt = deg => [R * Math.cos(deg * DEG), R * Math.sin(deg * DEG)];
      const A = pt(sA.value), B = pt(sB.value), P = pt(sP.value);
      const plot = new Plot(cv, { xmin: -4.6, xmax: 4.6, ymin: -4.2, ymax: 4.2, equal: true });
      plot.clear('#fff');
      const { ctx } = cv;
      // 圆
      ctx.strokeStyle = '#b8bdd4'; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(R) - plot.X(0)), 0, Math.PI * 2); ctx.stroke();
      // 弧 AB（劣弧，红色加粗）
      ctx.strokeStyle = C.red; ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(R) - plot.X(0)), -sB.value * DEG, -sA.value * DEG);
      ctx.stroke();
      // 圆心角（O 到 A、B）
      plot.seg(0, 0, A[0], A[1], { color: C.orange, width: 2.2 });
      plot.seg(0, 0, B[0], B[1], { color: C.orange, width: 2.2 });
      // 圆周角（P 到 A、B）
      plot.seg(P[0], P[1], A[0], A[1], { color: C.blue, width: 2.4 });
      plot.seg(P[0], P[1], B[0], B[1], { color: C.blue, width: 2.4 });
      // 角度计算
      const angAt = (V, Q, S2) => {
        const v1 = [Q[0] - V[0], Q[1] - V[1]], v2 = [S2[0] - V[0], S2[1] - V[1]];
        const d = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
        return Math.acos(Math.max(-1, Math.min(1, d))) / DEG;
      };
      const central = angAt([0, 0], A, B);
      const inscribed = angAt(P, A, B);
      // 点
      plot.dot(0, 0, { color: C.orange, r: 4.5, label: 'O', labelDy: 18 });
      plot.dot(A[0], A[1], { color: C.red, r: 5.5, label: 'A', labelDx: A[0] < 0 ? -18 : 10, labelDy: 16 });
      plot.dot(B[0], B[1], { color: C.red, r: 5.5, label: 'B', labelDx: 10, labelDy: 16 });
      plot.dot(P[0], P[1], { color: C.blue, r: 7, stroke: '#fff', label: 'P', labelDy: -12 });
      plot.text(0, -0.75, fmtN(central, 0) + '°', { color: C.orange, align: 'center', font: 'bold 14px sans-serif' });
      plot.text(P[0] * 0.72, P[1] * 0.72, fmtN(inscribed, 0) + '°', { color: C.blue, align: 'center', font: 'bold 14px sans-serif' });
      const isDiameter = Math.abs(central - 180) < 1.5;
      readout.set(L(`
        圆心角 ∠AOB = <b style="color:${C.orange}">${fmtN(central,1)}°</b><br>
        圆周角 ∠APB = <b style="color:${C.blue}">${fmtN(inscribed,1)}°</b><br>
        比值：${fmtN(central,1)}° ÷ ${fmtN(inscribed,1)}° = <b style="color:${C.purple}">${fmtN(central / inscribed,2)}</b> ＝ 2 ✓<br>
        ${isDiameter ? '<span class="tag">AB 是直径 → 圆周角 = 90°（泰勒斯定理）！</span>' : L2()}`, `
        Central angle ∠AOB = <b style="color:${C.orange}">${fmtN(central,1)}°</b><br>
        Inscribed angle ∠APB = <b style="color:${C.blue}">${fmtN(inscribed,1)}°</b><br>
        Ratio: ${fmtN(central,1)}° ÷ ${fmtN(inscribed,1)}° = <b style="color:${C.purple}">${fmtN(central / inscribed,2)}</b> = 2 ✓<br>
        ${isDiameter ? '<span class="tag">AB is a diameter → inscribed angle = 90° (Thales)!</span>' : 'Slide P — the inscribed angle refuses to change'}`));
      function L2() { return '拖动 P —— 圆周角就是不变'; }
    }
    [sA, sB, sP].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
