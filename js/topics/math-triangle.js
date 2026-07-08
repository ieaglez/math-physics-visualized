'use strict';
/* ===== 解三角形 Law of Sines & Cosines ===== */
registerTopic({
  id: 'triangle', cat: 'math', icon: '📏',
  title: '解三角形', en: 'Law of Sines & Cosines',
  desc: L('调整两边及其夹角，实时解出第三边和其余两角，并验证正弦定理的外接圆意义。',
          'Adjust two sides and their included angle to solve the triangle live, and verify the circumcircle meaning of the law of sines.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '解三角形', en: 'Solving Triangles',
      tagline: L('已知两边及夹角 (SAS)，正弦定理和余弦定理帮你解出整个三角形 —— 虚线圆是外接圆。',
                 'Given two sides and the included angle (SAS), the laws of sines and cosines solve the whole triangle — the dashed circle is the circumcircle.'),
      formula: '<span class="frac"><span>a</span><span class="den">sin A</span></span> = <span class="frac"><span>b</span><span class="den">sin B</span></span> = <span class="frac"><span>c</span><span class="den">sin C</span></span> = 2R　·　a² = b² + c² − 2bc·cos A',
      explainHTML: L(`
        <h2>余弦定理 <span class="en">Law of Cosines</span></h2>
        <div class="formula">a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> − 2bc·cos A
          <span class="note">勾股定理的推广：当 A = 90° 时 cos A = 0，退化为 a² = b² + c²</span></div>
        <ul>
          <li>适用场景：已知<b>两边及夹角 (SAS)</b> 求第三边；已知<b>三边 (SSS)</b> 求任意角；</li>
          <li>判断三角形形状：cos A &gt; 0 ⟹ A 为锐角；cos A &lt; 0 ⟹ A 为钝角。</li>
        </ul>
        <h2>正弦定理 <span class="en">Law of Sines</span></h2>
        <div class="formula"><span class="frac"><span>a</span><span class="den">sin A</span></span> =
          <span class="frac"><span>b</span><span class="den">sin B</span></span> =
          <span class="frac"><span>c</span><span class="den">sin C</span></span> = 2R
          <span class="note">R 是外接圆 (circumscribed circle) 半径 —— 实验中的虚线圆</span></div>
        <ul>
          <li>适用场景：已知<b>两角及一边 (AAS/ASA)</b>，或<b>两边及其中一边的对角 (SSA)</b>；</li>
          <li>几何本质：每条边对它的对角“张”得一样开 —— 比值恰好是外接圆直径。</li>
        </ul>
        <h2>面积公式 <span class="en">Area Formula</span></h2>
        <div class="formula">S = ½·bc·sin A = ½·ab·sin C = ½·ac·sin B</div>
        <div class="tip"><b>实验建议：</b>① 把夹角 A 调到 90°，验证 a² = b² + c²（勾股定理）；② 调成钝角，第三边明显变长，cos A 变负；③ 观察读数中三个比值 a/sinA、b/sinB、c/sinC 是否始终相等且等于 2R。</div>
        <div class="think"><b>思考一下：</b>测河对岸两点距离时无法直接量，测量员只量了基线和两个角 —— 用正弦定理还是余弦定理？</div>
      `, `
        <h2>Law of Cosines <span class="en">余弦定理</span></h2>
        <div class="formula">a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> − 2bc·cos A
          <span class="note">A generalization of the Pythagorean theorem: when A = 90°, cos A = 0 and it reduces to a² = b² + c²</span></div>
        <ul>
          <li>When to use: given <b>two sides and the included angle (SAS)</b> to find the third side; or <b>three sides (SSS)</b> to find any angle;</li>
          <li>Classifying triangles: cos A &gt; 0 ⟹ A is acute; cos A &lt; 0 ⟹ A is obtuse.</li>
        </ul>
        <h2>Law of Sines <span class="en">正弦定理</span></h2>
        <div class="formula"><span class="frac"><span>a</span><span class="den">sin A</span></span> =
          <span class="frac"><span>b</span><span class="den">sin B</span></span> =
          <span class="frac"><span>c</span><span class="den">sin C</span></span> = 2R
          <span class="note">R is the radius of the circumscribed circle (外接圆) — the dashed circle in the experiment</span></div>
        <ul>
          <li>When to use: given <b>two angles and a side (AAS/ASA)</b>, or <b>two sides and a non-included angle (SSA)</b>;</li>
          <li>Geometric essence: every side subtends its opposite angle equally "wide" — the common ratio is exactly the circumcircle's diameter.</li>
        </ul>
        <h2>Area Formula <span class="en">面积公式</span></h2>
        <div class="formula">S = ½·bc·sin A = ½·ab·sin C = ½·ac·sin B</div>
        <div class="tip"><b>Try this:</b> ① Set the included angle A to 90° and verify a² = b² + c² (Pythagoras); ② Make it obtuse — the third side grows and cos A turns negative; ③ Watch the readout: a/sinA, b/sinB, c/sinC stay equal to each other and to 2R at all times.</div>
        <div class="think"><b>Think about it:</b> To measure the distance between two points across a river, a surveyor measures only a baseline and two angles — law of sines or law of cosines?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sb = addSlider(panel, { label: L('边 b（AC）', 'Side b (AC)'), en: L('side', '边'), min: 2, max: 9, step: 0.1, value: 6 });
    const sc = addSlider(panel, { label: L('边 c（AB）', 'Side c (AB)'), en: L('side', '边'), min: 2, max: 9, step: 0.1, value: 8 });
    const sA = addSlider(panel, { label: L('夹角 A', 'Included angle A'), en: L('included angle', '夹角'), min: 15, max: 165, step: 1, value: 60, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const b = sb.value, c = sc.value, A = sA.value * DEG;
      const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A));
      const sinB = b * Math.sin(A) / a, sinC = c * Math.sin(A) / a;
      const B = Math.asin(Math.min(1, sinB)), Cc = Math.PI - A - B;
      const R = a / (2 * Math.sin(A));
      // 顶点：A 在原点，B 在 x 轴正方向
      const P_A = [0, 0], P_B = [c, 0], P_C = [b * Math.cos(A), b * Math.sin(A)];
      // 外接圆圆心
      const ox = c / 2;
      const oy = (b * b - b * c * Math.cos(A)) / (2 * b * Math.sin(A));
      const xs = [0, c, P_C[0], ox - R, ox + R], ys = [0, P_C[1], oy - R, oy + R];
      const plot = new Plot(cv, {
        xmin: Math.min(...xs) - 1, xmax: Math.max(...xs) + 1,
        ymin: Math.min(...ys) - 1, ymax: Math.max(...ys) + 1, equal: true
      });
      plot.clear('#fff');
      const { ctx } = cv;
      // 外接圆
      ctx.save();
      ctx.strokeStyle = '#d3d7f0'; ctx.setLineDash([7, 6]); ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(plot.X(ox), plot.Y(oy), Math.abs(plot.X(ox + R) - plot.X(ox)), 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      plot.dot(ox, oy, { color: '#b6bbe3', r: 3, label: L('O（外心）', 'O (circumcenter)'), labelDx: 8 });
      // 三角形
      ctx.save();
      ctx.fillStyle = 'rgba(91,91,240,.07)';
      ctx.beginPath();
      ctx.moveTo(plot.X(0), plot.Y(0)); ctx.lineTo(plot.X(c), plot.Y(0)); ctx.lineTo(plot.X(P_C[0]), plot.Y(P_C[1]));
      ctx.closePath(); ctx.fill();
      ctx.restore();
      plot.seg(P_A[0], P_A[1], P_B[0], P_B[1], { color: C.blue, width: 3 });
      plot.seg(P_A[0], P_A[1], P_C[0], P_C[1], { color: C.green, width: 3 });
      plot.seg(P_B[0], P_B[1], P_C[0], P_C[1], { color: C.red, width: 3 });
      // 顶点与标签
      plot.dot(0, 0, { color: C.ink, r: 4.5, label: 'A = ' + fmtN(sA.value, 0) + '°', labelDx: -34, labelDy: 18 });
      plot.dot(c, 0, { color: C.ink, r: 4.5, label: 'B = ' + fmtN(B / DEG, 1) + '°', labelDy: 18 });
      plot.dot(P_C[0], P_C[1], { color: C.ink, r: 4.5, label: 'C = ' + fmtN(Cc / DEG, 1) + '°', labelDy: -10 });
      // 边标签
      plot.text(c / 2, 0, 'c = ' + fmtN(c, 1), { color: C.blue, dy: 22, align: 'center', font: 'bold 13px sans-serif' });
      plot.text(P_C[0] / 2, P_C[1] / 2, 'b = ' + fmtN(b, 1), { color: C.green, dx: -14, dy: -8, align: 'right', font: 'bold 13px sans-serif' });
      plot.text((c + P_C[0]) / 2, P_C[1] / 2, 'a = ' + fmtN(a, 2), { color: C.red, dx: 12, font: 'bold 13px sans-serif' });
      const S = 0.5 * b * c * Math.sin(A);
      const angleType = A > Math.PI / 2 + 0.001 ? L('钝角三角形 (obtuse)', 'obtuse triangle 钝角') : Math.abs(A - Math.PI / 2) < 0.01 ? L('直角三角形 (right)！a² = b² + c²', 'right triangle! a² = b² + c²') : (B > Math.PI/2 || Cc > Math.PI/2) ? L('钝角三角形 (obtuse)', 'obtuse triangle 钝角') : L('锐角三角形 (acute)', 'acute triangle 锐角');
      readout.set(L(`
        第三边 a = √(b²+c²−2bc·cosA) = <b>${fmtN(a,3)}</b><br>
        B = <b>${fmtN(B / DEG,1)}°</b>　C = <b>${fmtN(Cc / DEG,1)}°</b>（和 = 180° ✓）<br>
        正弦定理验证：a/sinA = <b>${fmtN(a / Math.sin(A),3)}</b><br>
        　b/sinB = <b>${fmtN(b / Math.sin(B),3)}</b>，c/sinC = <b>${fmtN(c / Math.sin(Cc),3)}</b><br>
        外接圆 2R = <b>${fmtN(2 * R,3)}</b> ✓<br>
        面积 S = ½bc·sinA = <b>${fmtN(S,2)}</b><br>
        <span class="tag">${angleType}</span>`, `
        Third side a = √(b²+c²−2bc·cosA) = <b>${fmtN(a,3)}</b><br>
        B = <b>${fmtN(B / DEG,1)}°</b>　C = <b>${fmtN(Cc / DEG,1)}°</b> (sum = 180° ✓)<br>
        Law of sines check: a/sinA = <b>${fmtN(a / Math.sin(A),3)}</b><br>
        　b/sinB = <b>${fmtN(b / Math.sin(B),3)}</b>, c/sinC = <b>${fmtN(c / Math.sin(Cc),3)}</b><br>
        Circumcircle 2R = <b>${fmtN(2 * R,3)}</b> ✓<br>
        Area S = ½bc·sinA = <b>${fmtN(S,2)}</b><br>
        <span class="tag">${angleType}</span>`));
    }
    [sb, sc, sA].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
