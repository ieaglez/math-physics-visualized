'use strict';
/* ===== 立体几何：正方体的截面 Cross-Sections of a Cube ===== */
registerTopic({
  id: 'crosssection', cat: 'math', icon: '🔪',
  title: '正方体的截面', en: 'Cross-Sections of a Cube',
  desc: L('用一个平面切正方体，拖动切割位置：截面从三角形一路变到正六边形 —— 空间想象力的试金石。',
          'Slice a cube with a plane and slide the cut: the section morphs from a triangle all the way to a regular hexagon — the acid test of spatial imagination.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '正方体的截面', en: 'Cross-Sections of a Cube',
      tagline: L('左边是被切的正方体（可旋转），右边是截面的"真实形状"。选垂直于体对角线的方向，把切割位置推到正中间试试。',
                 'Left: the cube being cut (rotatable). Right: the section\'s true shape. Choose the body-diagonal direction and push the cut to dead center.'),
      formula: L('平面截正方体：截面是 3~6 边形　·　垂直体对角线过中心 → 正六边形',
                 'A plane cuts a cube in a 3- to 6-gon　·　⊥ body diagonal through the center → a regular hexagon'),
      explainHTML: L(`
        <h2>截面为什么重要 <span class="en">Why Sections Matter</span></h2>
        <p><span class="term">截面 <span class="en">(cross-section)</span></span>是平面与几何体相交所得的图形。
        它是立体几何的核心训练：把三维问题"压"回二维，也是 CT 扫描、地质勘探、3D 打印切片的数学原型。</p>
        <h2>正方体能切出什么 <span class="en">What a Cube Can Yield</span></h2>
        <ul>
          <li>截面是<b>多边形</b>，且每条边都落在正方体的某个面上 —— 正方体只有 6 个面，所以截面<b>至多 6 条边</b>；</li>
          <li><b>三角形</b>：切掉一个角；<b>正三角形</b>：垂直体对角线、靠近顶点切；</li>
          <li><b>矩形/正方形</b>：平行于某个面或沿棱切；</li>
          <li><b>五边形、六边形</b>：斜着切穿 5 个、6 个面；</li>
          <li><b>正六边形</b>：垂直于体对角线且过中心 —— 最出人意料的答案！</li>
          <li>永远切不出：正五边形（五边形必有两边平行 —— 因为正方体的面两两平行，而正五边形没有平行边）。</li>
        </ul>
        <h2>看穿它的方法 <span class="en">How to See It</span></h2>
        <p>数一数平面穿过了<b>几个面</b>：穿过 k 个面，截面就是 k 边形。平行的两个面被穿过时，截出的两条边也<b>平行</b> —— 这是判断截面形状的钥匙。</p>
        <div class="tip"><b>实验建议：</b>① 选「⊥ 体对角线」，把位置从一端推到另一端：点 → 三角形（变大）→ 六边形 → 正六边形（正中）→ 六边形 → 三角形 → 点；② 选「平行于面」验证截面永远是全等的正方形；③ 旋转正方体，从不同角度确认右侧"真实形状"没有骗你。</div>
        <div class="think"><b>思考一下：</b>用平面切圆锥能得到什么曲线？（圆、椭圆、抛物线、双曲线 —— 正是"圆锥曲线"名字的由来，第 8 站的椭圆与双曲线就从这里诞生。）</div>
      `, `
        <h2>Why Sections Matter <span class="en">截面为什么重要</span></h2>
        <p>A <span class="term">cross-section <span class="en">(截面)</span></span> is the figure where a plane meets a solid.
        It is the core drill of solid geometry — squashing 3D problems back to 2D — and the mathematical prototype of CT scans, geological surveys and 3D-printing slices.</p>
        <h2>What a Cube Can Yield <span class="en">正方体能切出什么</span></h2>
        <ul>
          <li>The section is a <b>polygon</b>, each side lying on one face of the cube — a cube has only 6 faces, so <b>at most 6 sides</b>;</li>
          <li><b>Triangles</b>: slice off a corner; <b>equilateral</b> ones: cut ⊥ the body diagonal near a vertex;</li>
          <li><b>Rectangles/squares</b>: cut parallel to a face or along an edge;</li>
          <li><b>Pentagons, hexagons</b>: slant the plane through 5 or 6 faces;</li>
          <li><b>A regular hexagon</b>: ⊥ the body diagonal, through the center — the most surprising answer!</li>
          <li>Never possible: a regular pentagon (any pentagon section must have two parallel sides — the cube's faces come in parallel pairs — but a regular pentagon has none).</li>
        </ul>
        <h2>How to See It <span class="en">看穿它的方法</span></h2>
        <p>Count how many <b>faces</b> the plane pierces: k faces → a k-gon. When it pierces a pair of parallel faces, the two resulting edges are <b>parallel</b> — the master key to section shapes.</p>
        <div class="tip"><b>Try this:</b> ① Choose "⊥ body diagonal" and slide the cut end to end: point → growing triangle → hexagon → regular hexagon (center) → hexagon → triangle → point; ② Choose "parallel to a face" and verify the section is always the same square; ③ Rotate the cube and check the true-shape inset from several angles.</div>
        <div class="think"><b>Think about it:</b> What curves can a plane cut from a cone? (Circle, ellipse, parabola, hyperbola — literally why they are called "conic sections"; the ellipse and hyperbola of Stop 8 are born right here.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 470);
    const mode = addSeg(panel, {
      options: [
        { label: L('∥ 面', '∥ face'), value: 'face' },
        { label: L('沿棱斜切', 'edge slant'), value: 'edge' },
        { label: L('⊥ 体对角线', '⊥ diagonal'), value: 'diag' }
      ],
      value: 'diag', onChange: () => draw()
    });
    const sd = addSlider(panel, { label: L('切割位置', 'Cut position'), en: L('offset', '位置'), min: -95, max: 95, step: 1, value: 0, unit: '%' });
    const syaw = addSlider(panel, { label: L('旋转视角', 'Rotate view'), en: L('rotate', '旋转'), min: 0, max: 360, step: 1, value: 28, unit: '°' });
    const readout = addReadout(panel);
    const anim = makeAnimator(dt => { syaw.value = (syaw.value + dt * 30) % 360; draw(); });
    addPlayControls(panel, anim, { onReset: () => { syaw.value = 28; draw(); } });

    const V = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const NORMALS = {
      face: [0, 0, 1],
      edge: [1 / Math.SQRT2, 1 / Math.SQRT2, 0.28],
      diag: [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)]
    };

    function draw() {
      const n = NORMALS[mode.value];
      const nn = Math.hypot(...n);
      const nu = n.map(v => v / nn);
      const limit = Math.abs(nu[0]) + Math.abs(nu[1]) + Math.abs(nu[2]); // max |n·v|
      const d = sd.value / 100 * limit + 1e-4; // 微偏移避开顶点
      // 求截面多边形
      const pts = [];
      E.forEach(([a, b]) => {
        const fa = nu[0]*V[a][0] + nu[1]*V[a][1] + nu[2]*V[a][2] - d;
        const fb = nu[0]*V[b][0] + nu[1]*V[b][1] + nu[2]*V[b][2] - d;
        if (fa * fb < 0) {
          const t = fa / (fa - fb);
          pts.push([V[a][0] + t*(V[b][0]-V[a][0]), V[a][1] + t*(V[b][1]-V[a][1]), V[a][2] + t*(V[b][2]-V[a][2])]);
        }
      });
      // 平面内基与排序
      let poly = [];
      if (pts.length >= 3) {
        const ref = Math.abs(nu[0]) < 0.9 ? [1,0,0] : [0,1,0];
        const u = cross(nu, ref), un = norm(u);
        const w = cross(nu, un);
        const cx = avg(pts, 0), cy2 = avg(pts, 1), cz = avg(pts, 2);
        poly = pts.map(p => {
          const rx = p[0]-cx, ry = p[1]-cy2, rz = p[2]-cz;
          return { p, x: rx*un[0]+ry*un[1]+rz*un[2], y: rx*w[0]+ry*w[1]+rz*w[2] };
        }).sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));
      }
      function cross(a, b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
      function norm(v) { const m = Math.hypot(...v); return v.map(x => x/m); }
      function avg(arr, i) { return arr.reduce((s, p) => s + p[i], 0) / arr.length; }
      // —— 绘制 ——
      const th = syaw.value * DEG, ph = 0.42;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const c3x = W * 0.36, c3y = H / 2, scale = Math.min(W, H) * 0.17;
      const P = (p) => {
        const x1 = p[0]*Math.cos(th) + p[2]*Math.sin(th);
        const z1 = -p[0]*Math.sin(th) + p[2]*Math.cos(th);
        const y2 = p[1]*Math.cos(ph) - z1*Math.sin(ph);
        return [c3x + x1*scale, c3y - y2*scale];
      };
      // 立方体棱
      ctx.strokeStyle = '#b8bdd4'; ctx.lineWidth = 1.8;
      E.forEach(([a, b]) => {
        const A2 = P(V[a]), B2 = P(V[b]);
        ctx.beginPath(); ctx.moveTo(A2[0], A2[1]); ctx.lineTo(B2[0], B2[1]); ctx.stroke();
      });
      // 法线方向箭头
      const cN = P([nu[0]*1.9, nu[1]*1.9, nu[2]*1.9]);
      pxArrow(ctx, P([0,0,0])[0], P([0,0,0])[1], cN[0], cN[1], { color: '#c9cee9', width: 1.6, label: 'n', labelDy: -4 });
      // 截面多边形（3D 上填充）
      if (poly.length >= 3) {
        ctx.save();
        ctx.beginPath();
        poly.forEach((q, i) => { const s = P(q.p); i ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]); });
        ctx.closePath();
        ctx.fillStyle = 'rgba(124,58,237,.28)';
        ctx.fill();
        ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.6; ctx.stroke();
        ctx.restore();
        // 右侧真实形状
        const ix = W * 0.8, iy = H / 2, iscale = Math.min(W, H) * 0.13;
        ctx.save();
        ctx.beginPath();
        poly.forEach((q, i) => {
          const X = ix + q.x * iscale, Y = iy - q.y * iscale;
          i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(124,58,237,.18)';
        ctx.fill();
        ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.4; ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(L('截面真实形状', 'true shape of the section'), ix, iy + iscale * 1.6 + 18);
        ctx.textAlign = 'left';
      }
      // 分类
      const sides = poly.length;
      let shape;
      if (sides < 3) shape = L('未切到（移动位置）', 'no section (move the cut)');
      else {
        // 边长
        const lens = poly.map((q, i) => {
          const r = poly[(i + 1) % sides];
          return Math.hypot(q.x - r.x, q.y - r.y);
        });
        const eq = Math.max(...lens) - Math.min(...lens) < 0.03;
        const names = { 3: L('三角形', 'triangle'), 4: L('四边形', 'quadrilateral'), 5: L('五边形', 'pentagon'), 6: L('六边形', 'hexagon') };
        shape = names[sides] || sides + L('边形', '-gon');
        if (eq && sides === 3) shape = L('正三角形！', 'equilateral triangle!');
        if (eq && sides === 4 && mode.value === 'face') shape = L('正方形', 'square');
        if (eq && sides === 6) shape = L('正六边形！！', 'REGULAR hexagon!!');
      }
      readout.set(L(`
        切割方向：<b>${{face: '平行于一个面', edge: '沿棱方向斜切', diag: '垂直于体对角线'}[mode.value]}</b><br>
        平面穿过 <b>${sides}</b> 个面 → 截面为 <b>${sides >= 3 ? sides + ' 边形' : '—'}</b><br>
        形状：<span class="tag">${shape}</span><br>
        ${mode.value === 'diag' && Math.abs(sd.value) < 4 && sides === 6 ? '过中心 ⊥ 体对角线 —— 教科书级的正六边形 ✓' :
          mode.value === 'diag' ? '把位置推到 0%（正中）看正六边形' : L('切换「⊥ 体对角线」看最神奇的截面', 'Switch to "⊥ diagonal" for the magic section')}`, `
        Cut direction: <b>${{face: 'parallel to a face', edge: 'slanted along an edge', diag: 'perpendicular to the body diagonal'}[mode.value]}</b><br>
        The plane pierces <b>${sides}</b> faces → a <b>${sides >= 3 ? sides + '-gon' : '—'}</b><br>
        Shape: <span class="tag">${shape}</span><br>
        ${mode.value === 'diag' && Math.abs(sd.value) < 4 && sides === 6 ? 'Through the center ⊥ the diagonal — the textbook regular hexagon ✓' :
          mode.value === 'diag' ? 'Push the position to 0% (center) for the regular hexagon' : 'Switch to "⊥ diagonal" for the magic section'}`));
    }
    [sd, syaw].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
