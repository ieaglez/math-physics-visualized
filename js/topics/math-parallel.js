'use strict';
/* ===== 平行线与相交线 Parallel Lines & Angles（初中） ===== */
registerTopic({
  id: 'parallel', cat: 'math', icon: '🛤️', stage: 'junior',
  title: '平行线与角', en: 'Parallel Lines & Angles',
  desc: L('转动截线，同位角、内错角、同旁内角各在哪里、谁和谁相等，一眼看清。',
          'Rotate the transversal and see at a glance where corresponding, alternate and co-interior angles live — and which are equal.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '平行线与相交线', en: 'Parallel Lines & a Transversal',
      tagline: L('一条截线穿过两条平行线，切出 8 个角 —— 其实只有两种度数：θ 和 180°−θ。',
                 'A transversal through two parallel lines makes 8 angles — but really only two values: θ and 180°−θ.'),
      formula: L('两线平行 ⟹ 同位角相等 · 内错角相等 · 同旁内角互补（和 180°）',
                 'Parallel lines ⟹ corresponding angles equal · alternate angles equal · co-interior angles supplementary (sum 180°)'),
      explainHTML: L(`
        <h2>三种角的位置关系 <span class="en">Three Kinds of Angle Pairs</span></h2>
        <p>截线与两条直线相交形成 8 个角，按位置分三类（图中已用颜色区分）：</p>
        <ul>
          <li><span class="term">同位角 <span class="en">(corresponding angles)</span></span>：同一侧、同一方位（"F 形"）—— 平行时<b>相等</b>；</li>
          <li><span class="term">内错角 <span class="en">(alternate interior angles)</span></span>：两线之间、交错两侧（"Z 形"）—— 平行时<b>相等</b>；</li>
          <li><span class="term">同旁内角 <span class="en">(co-interior angles)</span></span>：两线之间、同一侧（"U 形"）—— 平行时<b>互补</b>（和为 180°）。</li>
        </ul>
        <h2>判定与性质互为因果 <span class="en">Tests and Properties</span></h2>
        <ul>
          <li><b>性质</b>：已知平行 → 推角的关系（本实验演示的方向）；</li>
          <li><b>判定</b>：反过来，若同位角相等（或内错角相等、同旁内角互补）→ 两线平行；</li>
          <li>加上<span class="term">对顶角 <span class="en">(vertical angles)</span></span>相等，8 个角只剩两个独立值：θ 与 180°−θ。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 转动截线，看同色的角始终同步变化；② 验证任意一对同旁内角，两数相加恒为 180°；③ 记形状口诀找角：F 找同位、Z 找内错、U 找同旁。</div>
        <div class="think"><b>思考一下：</b>上一课"三角形内角和"的证明，用的正是内错角相等 —— 回头看看那条过顶点的平行虚线。</div>
      `, `
        <h2>Three Kinds of Angle Pairs <span class="en">三种角的位置关系</span></h2>
        <p>A transversal crossing two lines makes 8 angles, classified by position (color-coded in the figure):</p>
        <ul>
          <li><span class="term">Corresponding angles <span class="en">(同位角)</span></span>: same side, same position (the "F" shape) — <b>equal</b> when the lines are parallel;</li>
          <li><span class="term">Alternate interior angles <span class="en">(内错角)</span></span>: between the lines, on opposite sides (the "Z") — <b>equal</b> when parallel;</li>
          <li><span class="term">Co-interior angles <span class="en">(同旁内角)</span></span>: between the lines, same side (the "U") — <b>supplementary</b> (sum 180°) when parallel.</li>
        </ul>
        <h2>Tests and Properties <span class="en">判定与性质</span></h2>
        <ul>
          <li><b>Property</b>: given parallel lines → deduce the angle relations (what this experiment shows);</li>
          <li><b>Test</b>: conversely, equal corresponding angles (or equal alternates, or supplementary co-interiors) → the lines are parallel;</li>
          <li>Add <span class="term">vertical angles <span class="en">(对顶角)</span></span> being equal, and the 8 angles boil down to just two values: θ and 180°−θ.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Rotate the transversal — same-colored angles move in lockstep; ② Pick any co-interior pair and check the sum is always 180°; ③ Angle-hunting mnemonics: F for corresponding, Z for alternate, U for co-interior.</div>
        <div class="think"><b>Think about it:</b> The triangle-angle-sum proof from the previous lesson used equal alternate angles — go back and look at that dashed parallel line through the vertex.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 430);
    const sth = addSlider(panel, { label: L('截线倾角', 'Transversal angle'), en: L('angle', '倾角'), min: 25, max: 155, step: 1, value: 60, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const th = sth.value * DEG;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const y1 = H * 0.32, y2 = H * 0.68, cx = W / 2;
      // 两条平行线
      [y1, y2].forEach(y => {
        ctx.strokeStyle = '#4547c9'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke();
        // 平行箭头标记
        ctx.strokeStyle = '#4547c9'; ctx.lineWidth = 2;
        [[W - 110], [W - 96]].forEach(([x]) => {
          ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x + 10, y); ctx.lineTo(x, y + 6); ctx.stroke();
        });
      });
      ctx.fillStyle = '#4547c9'; ctx.font = 'bold 13px sans-serif';
      ctx.fillText('a', 46, y1 - 10);
      ctx.fillText('b', 46, y2 - 10);
      // 截线：过两交点 P1(上) P2(下)，向右上倾斜 th（与角弧的方向约定一致）
      // P1 在上线偏右、P2 在下线偏左，直线方向 = (cos th, −sin th)
      const P1 = [cx + (y2 - y1) / 2 / Math.tan(th), y1];
      const P2 = [cx - (y2 - y1) / 2 / Math.tan(th), y2];
      const ext = 150;
      ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(P1[0] + ext * Math.cos(th), P1[1] - ext * Math.sin(th));
      ctx.lineTo(P2[0] - ext * Math.cos(th), P2[1] + ext * Math.sin(th));
      ctx.stroke();
      // 角弧：在每个交点标 4 个扇区（红 = θ，绿 = 180°−θ）
      // 画布角（顺时针为正）：截线向右上 = −θ，向左下 = π−θ
      const t = th;
      const arcAt = (P, from, to, col) => {
        ctx.strokeStyle = col; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.arc(P[0], P[1], 20, from, to); ctx.stroke();
      };
      const sectors = [
        [-t, 0, C.red], [Math.PI - t, Math.PI, C.red],                   // θ（对顶一对）
        [0, Math.PI - t, C.green], [Math.PI, 2 * Math.PI - t, C.green]   // 180°−θ（对顶一对）
      ];
      [P1, P2].forEach(P => sectors.forEach(([a1, a2, col]) => arcAt(P, a1, a2, col)));
      // 标注度数（放在各扇区的角平分线方向）
      const deg = sth.value, sup = 180 - deg;
      ctx.font = 'bold 12.5px sans-serif';
      const lbl = (P, midCanvasAng, txt, col) => {
        ctx.fillStyle = col; ctx.textAlign = 'center';
        ctx.fillText(txt, P[0] + 40 * Math.cos(midCanvasAng), P[1] + 40 * Math.sin(midCanvasAng) + 4);
        ctx.textAlign = 'left';
      };
      [P1, P2].forEach(P => {
        lbl(P, -t / 2, fmtN(deg, 0) + '°', C.red);
        lbl(P, Math.PI - t / 2, fmtN(deg, 0) + '°', C.red);
        lbl(P, (Math.PI - t) / 2, fmtN(sup, 0) + '°', C.green);
        lbl(P, (3 * Math.PI - t) / 2, fmtN(sup, 0) + '°', C.green);
      });
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif';
      ctx.fillText(L('红 = θ，绿 = 180°−θ；上下两组一一对应', 'red = θ, green = 180°−θ; the two crossings match pair-for-pair'), 46, H - 16);
      readout.set(L(`
        θ = <b style="color:${C.red}">${fmtN(deg,0)}°</b>，补角 = <b style="color:${C.green}">${fmtN(sup,0)}°</b><br>
        同位角（F）：上${fmtN(deg,0)}° = 下${fmtN(deg,0)}° <b>相等 ✓</b><br>
        内错角（Z）：${fmtN(deg,0)}° = ${fmtN(deg,0)}° <b>相等 ✓</b><br>
        同旁内角（U）：${fmtN(deg,0)}° + ${fmtN(sup,0)}° = <b>180° 互补 ✓</b><br>
        对顶角：天然相等（与平行无关）`, `
        θ = <b style="color:${C.red}">${fmtN(deg,0)}°</b>, supplement = <b style="color:${C.green}">${fmtN(sup,0)}°</b><br>
        Corresponding (F): top ${fmtN(deg,0)}° = bottom ${fmtN(deg,0)}° <b>equal ✓</b><br>
        Alternate interior (Z): ${fmtN(deg,0)}° = ${fmtN(deg,0)}° <b>equal ✓</b><br>
        Co-interior (U): ${fmtN(deg,0)}° + ${fmtN(sup,0)}° = <b>180°, supplementary ✓</b><br>
        Vertical angles: equal regardless of parallelism`));
    }
    sth.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
