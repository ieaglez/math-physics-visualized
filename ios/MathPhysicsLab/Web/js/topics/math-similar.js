'use strict';
/* ===== 相似三角形 Similar Triangles（初中） ===== */
registerTopic({
  id: 'similar', cat: 'math', icon: '🔍', stage: 'junior',
  title: '相似三角形', en: 'Similar Triangles',
  desc: L('调整缩放比例 k，看对应边成比例、对应角相等 —— 再用"影子测高"感受相似的威力。',
          'Tune the scale factor k: matching sides stay proportional, matching angles stay equal — then measure a tree by its shadow.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '相似三角形', en: 'Similar Triangles',
      tagline: L('大三角形是小三角形放大 k 倍的"照片"：形状相同、大小不同。面积可不止放大 k 倍！',
                 'The big triangle is a k× "photo" of the small one: same shape, different size. But the area grows by more than k!'),
      formula: L('相似 ⟹ 对应角相等、对应边成比例（比值 k）　·　面积比 = k²',
                 'Similar ⟹ equal matching angles, proportional matching sides (ratio k)　·　area ratio = k²'),
      explainHTML: L(`
        <h2>什么是相似 <span class="en">What "Similar" Means</span></h2>
        <p>形状相同、大小可以不同的图形叫<span class="term">相似 <span class="en">(similar)</span></span>。对相似三角形（记作 △ABC ∽ △A′B′C′）：</p>
        <ul>
          <li><b>对应角相等</b>：∠A = ∠A′，∠B = ∠B′，∠C = ∠C′；</li>
          <li><b>对应边成比例</b>：a′/a = b′/b = c′/c = k（<span class="term">相似比 <span class="en">(scale factor)</span></span>）；</li>
          <li><b>面积比 = k²</b>：边长放大 2 倍，面积放大 4 倍 —— 长和宽各贡献一个 k。</li>
        </ul>
        <h2>判定方法 <span class="en">How to Prove Similarity</span></h2>
        <ul>
          <li><b>AA</b>：两角对应相等（最常用 —— 角相等形状就定了）；</li>
          <li><b>SAS</b>：两边成比例且夹角相等；</li>
          <li><b>SSS</b>：三边对应成比例。</li>
        </ul>
        <h2>影子测高 <span class="en">Measuring by Shadow</span></h2>
        <div class="formula"><span class="frac"><span>树高</span><span class="den">树影</span></span> = <span class="frac"><span>杆高</span><span class="den">杆影</span></span>
          <span class="note">阳光平行 → 两个直角三角形有相等的角 → AA 相似 → 对应边成比例。泰勒斯两千多年前就这样量了金字塔</span></div>
        <div class="tip"><b>实验建议：</b>① 把 k 调到 2：边长读数全部翻倍，但面积变成 4 倍；② 看角度读数：无论 k 多大，三个角一动不动 —— "形状"没变；③ 试试 k = 1（全等是相似的特例）。</div>
        <div class="think"><b>思考一下：</b>地图比例尺 1:10000 是相似比。地图上 1 cm² 对应实际多少面积？（k² 的威力：10⁴ 的平方 = 10⁸ cm² = 1 万平方米。）</div>
      `, `
        <h2>What "Similar" Means <span class="en">什么是相似</span></h2>
        <p>Figures with the same shape but possibly different sizes are <span class="term">similar <span class="en">(相似)</span></span>. For similar triangles (△ABC ∽ △A′B′C′):</p>
        <ul>
          <li><b>Matching angles are equal</b>: ∠A = ∠A′, ∠B = ∠B′, ∠C = ∠C′;</li>
          <li><b>Matching sides are proportional</b>: a′/a = b′/b = c′/c = k (the <span class="term">scale factor <span class="en">(相似比)</span></span>);</li>
          <li><b>Area ratio = k²</b>: double the sides and the area quadruples — length and width each contribute one k.</li>
        </ul>
        <h2>How to Prove Similarity <span class="en">判定方法</span></h2>
        <ul>
          <li><b>AA</b>: two pairs of equal angles (most used — angles fix the shape);</li>
          <li><b>SAS</b>: two proportional sides with an equal included angle;</li>
          <li><b>SSS</b>: all three sides proportional.</li>
        </ul>
        <h2>Measuring by Shadow <span class="en">影子测高</span></h2>
        <div class="formula"><span class="frac"><span>tree height</span><span class="den">tree shadow</span></span> = <span class="frac"><span>pole height</span><span class="den">pole shadow</span></span>
          <span class="note">Parallel sunlight → equal angles in two right triangles → AA similar → proportional sides. Thales measured the pyramids this way</span></div>
        <div class="tip"><b>Try this:</b> ① Set k to 2: every side doubles but the area becomes 4×; ② Watch the angle readout: whatever k is, the three angles never move — the "shape" is unchanged; ③ Try k = 1 (congruence is the special case of similarity).</div>
        <div class="think"><b>Think about it:</b> A 1:10,000 map scale is a similarity ratio. How much real area does 1 cm² on the map represent? (The power of k²: (10⁴)² = 10⁸ cm² = one hectare.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sk = addSlider(panel, { label: L('相似比 k', 'Scale factor k'), en: L('scale factor', '相似比'), min: 0.5, max: 2.6, step: 0.05, value: 1.8 });
    const sshape = addSlider(panel, { label: L('改变形状（顶点位置）', 'Change the shape'), en: L('shape', '形状'), min: 0.6, max: 2.4, step: 0.05, value: 1.3 });
    const readout = addReadout(panel);

    function draw() {
      const k = sk.value, s = sshape.value;
      // 小三角形（左）：A(0,0) B(2.4,0) C(0.7s, 1.5s)
      const A = [0, 0], B = [2.4, 0], Cp = [0.7 * s, 1.5 * s];
      const a = Math.hypot(B[0] - Cp[0], B[1] - Cp[1]);
      const bSide = Math.hypot(Cp[0], Cp[1]);
      const cSide = 2.4;
      const area = 0.5 * Math.abs(B[0] * Cp[1]);
      const ang = (P, Q, R) => {
        const v1 = [Q[0] - P[0], Q[1] - P[1]], v2 = [R[0] - P[0], R[1] - P[1]];
        const d = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
        return Math.acos(Math.max(-1, Math.min(1, d))) / DEG;
      };
      const aA = ang(A, B, Cp), aB = ang(B, A, Cp);
      // 大三角形（右移放置）
      const ox = 3.6;
      const A2 = [ox, 0], B2 = [ox + 2.4 * k, 0], C2 = [ox + 0.7 * s * k, 1.5 * s * k];
      const xmax = Math.max(B2[0], C2[0]) + 0.8;
      const ymax = Math.max(Cp[1], C2[1]) + 1;
      const plot = new Plot(cv, { xmin: -0.8, xmax, ymin: -1.2, ymax, equal: true, padB: 8 });
      plot.clear('#fff');
      const { ctx } = cv;
      const tri = (P, Q, R, fill, stroke) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(plot.X(P[0]), plot.Y(P[1])); ctx.lineTo(plot.X(Q[0]), plot.Y(Q[1])); ctx.lineTo(plot.X(R[0]), plot.Y(R[1]));
        ctx.closePath();
        ctx.fillStyle = fill; ctx.fill();
        ctx.strokeStyle = stroke; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.restore();
      };
      tri(A, B, Cp, 'rgba(91,91,240,.15)', '#4547c9');
      tri(A2, B2, C2, 'rgba(234,88,12,.13)', '#ea580c');
      // 对应边标注
      plot.text(1.2, 0, 'c = ' + fmtN(cSide, 1), { color: '#4547c9', dy: 20, align: 'center', font: 'bold 12px sans-serif' });
      plot.text(ox + 1.2 * k, 0, "c′ = " + fmtN(cSide * k, 2), { color: '#ea580c', dy: 20, align: 'center', font: 'bold 12px sans-serif' });
      plot.text(Cp[0], Cp[1], 'C', { color: '#4547c9', dy: -8, align: 'center', font: 'bold 12px sans-serif' });
      plot.text(C2[0], C2[1], "C′", { color: '#ea580c', dy: -8, align: 'center', font: 'bold 12px sans-serif' });
      // 对应角小弧（A 与 A2）
      ctx.strokeStyle = C.red; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.arc(plot.X(A[0]), plot.Y(A[1]), 16, -Math.atan2(Cp[1], Cp[0]), 0); ctx.stroke();
      ctx.beginPath(); ctx.arc(plot.X(A2[0]), plot.Y(A2[1]), 16, -Math.atan2(C2[1] - 0, C2[0] - ox), 0); ctx.stroke();
      readout.set(L(`
        相似比 k = <b>${fmtN(k,2)}</b>（△A′B′C′ ∽ △ABC）<br>
        对应边：c′/c = <b>${fmtN(k,2)}</b>，b′/b = <b>${fmtN(bSide * k / bSide,2)}</b>，a′/a = <b>${fmtN(a * k / a,2)}</b>（全相等 ✓）<br>
        对应角：∠A = ∠A′ = <b>${fmtN(aA,1)}°</b>，∠B = ∠B′ = <b>${fmtN(aB,1)}°</b>（k 变它不变）<br>
        面积：小 = <b>${fmtN(area,2)}</b>，大 = <b>${fmtN(area * k * k,2)}</b><br>
        面积比 = <b style="color:${C.purple}">${fmtN(k * k,2)}</b> ＝ k² ✓`, `
        Scale factor k = <b>${fmtN(k,2)}</b> (△A′B′C′ ∽ △ABC)<br>
        Sides: c′/c = <b>${fmtN(k,2)}</b>, b′/b = <b>${fmtN(bSide * k / bSide,2)}</b>, a′/a = <b>${fmtN(a * k / a,2)}</b> (all equal ✓)<br>
        Angles: ∠A = ∠A′ = <b>${fmtN(aA,1)}°</b>, ∠B = ∠B′ = <b>${fmtN(aB,1)}°</b> (untouched by k)<br>
        Areas: small = <b>${fmtN(area,2)}</b>, large = <b>${fmtN(area * k * k,2)}</b><br>
        Area ratio = <b style="color:${C.purple}">${fmtN(k * k,2)}</b> = k² ✓`));
    }
    [sk, sshape].forEach(s2 => s2.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
