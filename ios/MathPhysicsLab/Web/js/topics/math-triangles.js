'use strict';
/* ===== 三角形内角和 Triangle Angle Sum（初中） ===== */
registerTopic({
  id: 'triangles', cat: 'math', icon: '📐', stage: 'junior',
  title: '三角形内角和', en: 'Triangle Angle Sum',
  desc: L('随意拖动三角形的顶点，三个内角怎么变，加起来永远是 180° —— 外角定理也一并看懂。',
          'Drag the vertex anywhere — however the three angles change, they always total 180°. The exterior-angle theorem comes free.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '三角形内角和', en: 'Triangle Angle Sum = 180°',
      tagline: L('把顶点 C 拖到任何位置，读数里的三个角永远凑成 180°。图中还画出了"过 C 的平行线"证明。',
                 'Drag vertex C anywhere: the three angles always make 180°. The classic proof — a line through C parallel to the base — is drawn in.'),
      formula: L('∠A + ∠B + ∠C = 180°　·　外角 = 不相邻两内角之和',
                 '∠A + ∠B + ∠C = 180°　·　exterior angle = sum of the two remote interior angles'),
      explainHTML: L(`
        <h2>内角和定理 <span class="en">The Angle-Sum Theorem</span></h2>
        <div class="formula">任意三角形：∠A + ∠B + ∠C = 180°</div>
        <p><b>经典证明</b>：过顶点 C 作底边 AB 的<span class="term">平行线 <span class="en">(parallel line)</span></span>（图中虚线）。
        由"两直线平行，<span class="term">内错角 <span class="en">(alternate angles)</span></span>相等"，∠A 和 ∠B 被"搬"到 C 点两侧，
        与 ∠C 拼成一条直线 —— 恰好 180°。</p>
        <h2>由此而来的推论 <span class="en">Consequences</span></h2>
        <ul>
          <li>直角三角形的两个锐角<b>互余</b>（和为 90°）；</li>
          <li>等边三角形每个角都是 60°；</li>
          <li><span class="term">外角定理 <span class="en">(exterior angle theorem)</span></span>：外角 = 与它不相邻的两个内角之和（图中 ∠C 外侧的角）；</li>
          <li>推广：n 边形内角和 = (n − 2) × 180° —— 因为可以剖成 n − 2 个三角形。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 C 拖得很高很尖：∠C 变小，∠A、∠B 变大，总和纹丝不动；② 把 C 拖到几乎贴着 AB：∠C 逼近 180°，另两个角逼近 0；③ 对照外角读数验证外角定理。</div>
        <div class="think"><b>思考一下：</b>在地球表面画一个"三角形"（比如两条经线加一段赤道），内角和还会是 180° 吗？（球面上会超过 —— 平面几何的 180° 其实是"平直空间"的特征。）</div>
      `, `
        <h2>The Angle-Sum Theorem <span class="en">内角和定理</span></h2>
        <div class="formula">Any triangle: ∠A + ∠B + ∠C = 180°</div>
        <p><b>The classic proof</b>: draw a line through C <span class="term">parallel <span class="en">(平行线)</span></span> to the base AB (dashed in the figure).
        By "parallel lines make equal <span class="term">alternate angles <span class="en">(内错角)</span></span>", copies of ∠A and ∠B appear beside ∠C —
        and the three fit together into a straight line: exactly 180°.</p>
        <h2>Consequences <span class="en">推论</span></h2>
        <ul>
          <li>The two acute angles of a right triangle are <b>complementary</b> (sum 90°);</li>
          <li>Every angle of an equilateral triangle is 60°;</li>
          <li><span class="term">Exterior angle theorem <span class="en">(外角定理)</span></span>: an exterior angle equals the sum of the two remote interior angles;</li>
          <li>Generalization: an n-gon's interior angles total (n − 2) × 180° — it splits into n − 2 triangles.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Drag C high and sharp: ∠C shrinks while ∠A, ∠B grow — the total never moves; ② Drag C almost onto AB: ∠C approaches 180° and the others approach 0; ③ Check the exterior angle readout against the theorem.</div>
        <div class="think"><b>Think about it:</b> Draw a "triangle" on the Earth's surface (two meridians plus a stretch of equator) — is the angle sum still 180°? (On a sphere it exceeds 180° — the flat-space 180° is a signature of Euclidean geometry.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sx = addSlider(panel, { label: L('顶点 C：左右', 'Vertex C: left–right'), en: 'x', min: -4, max: 8, step: 0.1, value: 1.5 });
    const sy = addSlider(panel, { label: L('顶点 C：高低', 'Vertex C: up–down'), en: 'y', min: 0.8, max: 6, step: 0.1, value: 3.5 });
    const readout = addReadout(panel);

    function draw() {
      const A = [0, 0], B = [6, 0], Cp = [sx.value, sy.value];
      const ang = (P, Q, R) => { // ∠QPR
        const v1 = [Q[0] - P[0], Q[1] - P[1]], v2 = [R[0] - P[0], R[1] - P[1]];
        const d = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
        return Math.acos(Math.max(-1, Math.min(1, d))) / DEG;
      };
      const aA = ang(A, B, Cp), aB = ang(B, A, Cp), aC = ang(Cp, A, B);
      const plot = new Plot(cv, { xmin: -5.5, xmax: 9.5, ymin: -1.6, ymax: 7, equal: true, padB: 8 });
      plot.clear('#fff');
      const { ctx } = cv;
      // 三角形
      ctx.save();
      ctx.fillStyle = 'rgba(91,91,240,.10)';
      ctx.beginPath();
      ctx.moveTo(plot.X(A[0]), plot.Y(A[1])); ctx.lineTo(plot.X(B[0]), plot.Y(B[1])); ctx.lineTo(plot.X(Cp[0]), plot.Y(Cp[1]));
      ctx.closePath(); ctx.fill();
      ctx.restore();
      plot.seg(A[0], A[1], B[0], B[1], { color: '#4547c9', width: 3 });
      plot.seg(A[0], A[1], Cp[0], Cp[1], { color: '#4547c9', width: 3 });
      plot.seg(B[0], B[1], Cp[0], Cp[1], { color: '#4547c9', width: 3 });
      // 过 C 的平行线（证明）+ 内错角标色
      plot.seg(Cp[0] - 3.6, Cp[1], Cp[0] + 3.6, Cp[1], { color: C.gray, width: 1.6, dash: [7, 5] });
      plot.text(Cp[0] + 3.7, Cp[1], L('∥ AB', '∥ AB'), { color: C.soft });
      // 角弧
      const arc = (P, a1, a2, col) => {
        ctx.strokeStyle = col; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.arc(plot.X(P[0]), plot.Y(P[1]), 22, -a2 * DEG, -a1 * DEG); ctx.stroke();
      };
      // ∠A：从 AB 方向到 AC 方向
      const dirDeg = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]) / DEG;
      const arcBetween = (P, Q, R, col) => {
        let d1 = dirDeg(P, Q), d2 = dirDeg(P, R);
        if (d2 < d1) [d1, d2] = [d2, d1];
        if (d2 - d1 > 180) [d1, d2] = [d2, d1 + 360];
        arc(P, d1, d2, col);
      };
      arcBetween(A, B, Cp, C.red);
      arcBetween(B, Cp, A, C.green);
      arcBetween(Cp, A, B, C.orange);
      // 顶点标签
      plot.dot(A[0], A[1], { color: C.ink, r: 4, label: 'A ' + fmtN(aA, 0) + '°', labelDy: 22, labelDx: -14 });
      plot.dot(B[0], B[1], { color: C.ink, r: 4, label: 'B ' + fmtN(aB, 0) + '°', labelDy: 22 });
      plot.dot(Cp[0], Cp[1], { color: C.ink, r: 5, label: 'C ' + fmtN(aC, 0) + '°', labelDy: -12 });
      // 外角（B 处向右延长）
      plot.seg(B[0], B[1], B[0] + 2.4, B[1], { color: '#f59e0b', width: 2, dash: [4, 4] });
      const ext = 180 - aB;
      plot.text(B[0] + 1.5, 0, L('外角 ', 'ext. ') + fmtN(ext, 0) + '°', { color: '#b45309', dy: -10, font: 'bold 12px sans-serif' });
      const type = Math.max(aA, aB, aC) > 90.5 ? L('钝角三角形', 'obtuse triangle') :
                   Math.max(aA, aB, aC) > 89.5 ? L('直角三角形！', 'right triangle!') : L('锐角三角形', 'acute triangle');
      readout.set(L(`
        ∠A = <b style="color:${C.red}">${fmtN(aA,1)}°</b>　∠B = <b style="color:${C.green}">${fmtN(aB,1)}°</b>　∠C = <b style="color:${C.orange}">${fmtN(aC,1)}°</b><br>
        内角和 = <b style="color:${C.purple}">${fmtN(aA + aB + aC,1)}°</b> ＝ 180° 恒定 ✓<br>
        B 处外角 = 180° − ∠B = <b>${fmtN(ext,1)}°</b><br>
        外角定理验证：∠A + ∠C = <b>${fmtN(aA + aC,1)}°</b> ✓<br>
        <span class="tag">${type}</span>`, `
        ∠A = <b style="color:${C.red}">${fmtN(aA,1)}°</b>　∠B = <b style="color:${C.green}">${fmtN(aB,1)}°</b>　∠C = <b style="color:${C.orange}">${fmtN(aC,1)}°</b><br>
        Angle sum = <b style="color:${C.purple}">${fmtN(aA + aB + aC,1)}°</b> = 180°, always ✓<br>
        Exterior angle at B = 180° − ∠B = <b>${fmtN(ext,1)}°</b><br>
        Theorem check: ∠A + ∠C = <b>${fmtN(aA + aC,1)}°</b> ✓<br>
        <span class="tag">${type}</span>`));
    }
    [sx, sy].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
