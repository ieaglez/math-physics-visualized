'use strict';
/* ===== 立体几何：柱锥球 Solid Geometry ===== */
registerTopic({
  id: 'solids', cat: 'math', icon: '📦',
  title: '立体几何：柱·锥·球', en: 'Solids: Volume & Surface',
  desc: L('拖动旋转 3D 几何体，调整尺寸，体积与表面积公式实时计算。',
          'Rotate 3D solids, resize them, and see volume and surface-area formulas computed live.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '立体几何：柱·锥·球', en: 'Solid Geometry (3D)',
      tagline: L('可以旋转的立体图形。注意：锥体体积恰好是同底等高柱体的 1/3。',
                 'Solids you can spin. Note: a cone\'s volume is exactly 1/3 of the cylinder with the same base and height.'),
      formula: L('V<sub>柱</sub> = Sh　·　V<sub>锥</sub> = <span class="frac"><span>1</span><span class="den">3</span></span>Sh　·　V<sub>球</sub> = <span class="frac"><span>4</span><span class="den">3</span></span>πr³　·　S<sub>球</sub> = 4πr²',
                 'V<sub>cyl</sub> = Sh　·　V<sub>cone</sub> = <span class="frac"><span>1</span><span class="den">3</span></span>Sh　·　V<sub>sphere</sub> = <span class="frac"><span>4</span><span class="den">3</span></span>πr³　·　S<sub>sphere</sub> = 4πr²'),
      explainHTML: L(`
        <h2>体积公式 <span class="en">Volume Formulas</span></h2>
        <div class="formula">
          柱体 V = S·h　　锥体 V = <span class="frac"><span>1</span><span class="den">3</span></span>S·h　　球 V = <span class="frac"><span>4</span><span class="den">3</span></span>πr³
          <span class="note">S 为底面积。圆柱 S = πr²，正方体可看作底面为正方形的棱柱</span></div>
        <ul>
          <li><b>锥体的 1/3</b>：同底等高时，三个锥恰好拼成一个柱 —— 祖暅原理 / 微积分都能证明；</li>
          <li><b>祖暅原理 <span class="en">(Cavalieri's principle)</span></b>：两个几何体在每个等高截面处面积都相等，则体积相等 —— 中国古代数学的杰作；</li>
          <li>球的体积公式正是用祖暅原理从"圆柱挖去圆锥"推出来的。</li>
        </ul>
        <h2>表面积 <span class="en">Surface Area</span></h2>
        <div class="formula">
          圆柱 S = 2πr² + 2πrh　　圆锥 S = πr² + πr·l（l = √(r²+h²) 为母线）　　球 S = 4πr²
        </div>
        <ul>
          <li>圆柱侧面展开是<b>矩形</b>（长 2πr、宽 h）；圆锥侧面展开是<b>扇形</b>（半径 l、弧长 2πr）；</li>
          <li>球面不能展开成平面 —— 这就是所有世界地图都有变形的原因；</li>
          <li>神奇比例：底面半径与高相等的"圆柱:球:圆锥"体积比为 3 : 2 : 1（阿基米德最得意的发现）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 切到圆锥，设 r 和 h 与圆柱相同，对比读数里的体积 —— 正好 1/3；② 把球的 r 翻倍，体积变为几倍？（2³ = 8 倍，表面积 4 倍）；③ 拖动"旋转"滑块或点播放，从不同角度观察三视图的由来。</div>
        <div class="think"><b>思考一下：</b>为什么易拉罐（圆柱）做成"高 ≈ 直径"附近时最省料？（固定体积求表面积最小 —— 又回到基本不等式！）</div>
      `, `
        <h2>Volume Formulas <span class="en">体积公式</span></h2>
        <div class="formula">
          Prism/cylinder V = S·h　　Cone/pyramid V = <span class="frac"><span>1</span><span class="den">3</span></span>S·h　　Sphere V = <span class="frac"><span>4</span><span class="den">3</span></span>πr³
          <span class="note">S is the base area. For a circular cylinder S = πr²; a cube is a prism with a square base</span></div>
        <ul>
          <li><b>Why the 1/3</b>: with equal base and height, three cones exactly fill one cylinder — provable by Zu Geng's principle or calculus;</li>
          <li><b>Cavalieri's principle <span class="en">(祖暅原理)</span></b>: two solids with equal cross-sectional areas at every height have equal volumes — a gem of ancient Chinese mathematics;</li>
          <li>The sphere's volume formula is derived exactly this way, from a "cylinder minus cone".</li>
        </ul>
        <h2>Surface Area <span class="en">表面积</span></h2>
        <div class="formula">
          Cylinder S = 2πr² + 2πrh　　Cone S = πr² + πr·l (slant height l = √(r²+h²))　　Sphere S = 4πr²
        </div>
        <ul>
          <li>A cylinder's side unrolls into a <b>rectangle</b> (2πr by h); a cone's side unrolls into a <b>sector</b> (radius l, arc 2πr);</li>
          <li>A sphere cannot be flattened — which is why every world map distorts;</li>
          <li>A marvelous ratio: for equal radius and height ( h = 2r ), cylinder : sphere : cone volumes = 3 : 2 : 1 — Archimedes' proudest discovery.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Switch to the cone with the same r and h as the cylinder and compare volumes in the readout — exactly 1/3; ② Double the sphere's r: volume ×8 (2³), surface ×4; ③ Drag "rotate" or press Play to see where the three standard views come from.</div>
        <div class="think"><b>Think about it:</b> Why does a soda can (cylinder) use the least material when height ≈ diameter? (Minimize surface area at fixed volume — the AM–GM inequality returns!)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const shape = addSeg(panel, {
      options: [
        { label: L('正方体', 'Cube'), value: 'cube' },
        { label: L('圆柱', 'Cylinder'), value: 'cyl' },
        { label: L('圆锥', 'Cone'), value: 'cone' },
        { label: L('球', 'Sphere'), value: 'sphere' }
      ],
      value: 'cyl', onChange: () => { sync(); draw(); }
    });
    const s1 = addSlider(panel, { label: L('半径 r / 边长 a', 'Radius r / side a'), en: L('size', '尺寸'), min: 0.6, max: 2.2, step: 0.05, value: 1.2 });
    const s2 = addSlider(panel, { label: L('高 h', 'Height h'), en: L('height', '高'), min: 0.8, max: 3.2, step: 0.05, value: 2.2 });
    const syaw = addSlider(panel, { label: L('旋转视角', 'Rotate view'), en: L('rotate', '旋转'), min: 0, max: 360, step: 1, value: 30, unit: '°' });
    const readout = addReadout(panel);
    const anim = makeAnimator(dt => { syaw.value = (syaw.value + dt * 40) % 360; draw(); });
    addPlayControls(panel, anim, { onReset: () => { syaw.value = 30; draw(); } });

    function sync() {
      s2.input.parentElement.style.display = (shape.value === 'cyl' || shape.value === 'cone') ? '' : 'none';
    }

    function draw() {
      const th = syaw.value * DEG, ph = 0.42;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2 + 10;
      const scale = Math.min(W, H) * 0.19;
      const P = (x, y, z) => {
        const x1 = x * Math.cos(th) + z * Math.sin(th);
        const z1 = -x * Math.sin(th) + z * Math.cos(th);
        const y2 = y * Math.cos(ph) - z1 * Math.sin(ph);
        return [cx + x1 * scale, cy - y2 * scale];
      };
      const line = (p1, p2, style = {}) => {
        ctx.strokeStyle = style.color || '#5b5bf0';
        ctx.lineWidth = style.width || 2;
        ctx.setLineDash(style.dash || []);
        const a = P(...p1), b = P(...p2);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        ctx.setLineDash([]);
      };
      const ring = (pts, style = {}) => {
        ctx.strokeStyle = style.color || '#5b5bf0';
        ctx.lineWidth = style.width || 2;
        ctx.setLineDash(style.dash || []);
        ctx.beginPath();
        pts.forEach((p, i) => { const s = P(...p); i ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]); });
        ctx.closePath(); ctx.stroke();
        ctx.setLineDash([]);
      };
      const circle3d = (r, y, n = 48) => Array.from({ length: n }, (_, i) => {
        const t = i / n * 2 * Math.PI;
        return [r * Math.cos(t), y, r * Math.sin(t)];
      });
      // 地面阴影
      ctx.fillStyle = 'rgba(23,25,60,.05)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + scale * 1.75, scale * 1.7, scale * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      const sv = shape.value, r = s1.value, hgt = s2.value;
      let V, S, info;
      if (sv === 'cube') {
        const a = r * 1.5, h2 = a / 2;
        const v = [];
        for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) v.push([sx * h2, sy * h2, sz * h2]);
        const E = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
        E.forEach(([i, j]) => line(v[i], v[j]));
        v.forEach(p => { const s = P(...p); ctx.fillStyle = '#5b5bf0'; ctx.beginPath(); ctx.arc(s[0], s[1], 3, 0, Math.PI * 2); ctx.fill(); });
        V = a ** 3; S = 6 * a * a;
        info = L(`边长 a = <b>${fmtN(a,2)}</b><br>体积 V = a³ = <b>${fmtN(V,2)}</b><br>表面积 S = 6a² = <b>${fmtN(S,2)}</b><br>体对角线 = a√3 = <b>${fmtN(a*Math.SQRT2*Math.sqrt(1.5),2)}</b>`,
                 `Side a = <b>${fmtN(a,2)}</b><br>Volume V = a³ = <b>${fmtN(V,2)}</b><br>Surface S = 6a² = <b>${fmtN(S,2)}</b><br>Space diagonal = a√3 = <b>${fmtN(a*Math.SQRT2*Math.sqrt(1.5),2)}</b>`);
      } else if (sv === 'cyl') {
        ring(circle3d(r, hgt / 2));
        ring(circle3d(r, -hgt / 2));
        for (let i = 0; i < 4; i++) {
          const t = i / 4 * 2 * Math.PI;
          line([r * Math.cos(t), -hgt / 2, r * Math.sin(t)], [r * Math.cos(t), hgt / 2, r * Math.sin(t)], { color: '#9a9df3', width: 1.6 });
        }
        line([0, -hgt / 2, 0], [0, hgt / 2, 0], { color: '#c9cdf5', width: 1.4, dash: [5, 5] });
        line([0, -hgt / 2, 0], [r, -hgt / 2, 0], { color: '#fb923c', width: 2, dash: [4, 4] });
        V = Math.PI * r * r * hgt; S = 2 * Math.PI * r * r + 2 * Math.PI * r * hgt;
        info = L(`r = <b>${fmtN(r,2)}</b>，h = <b>${fmtN(hgt,2)}</b><br>体积 V = πr²h = <b>${fmtN(V,3)}</b><br>表面积 = 2πr² + 2πrh = <b>${fmtN(S,3)}</b><br>侧面展开：${fmtN(2*Math.PI*r,2)} × ${fmtN(hgt,2)} 的矩形`,
                 `r = <b>${fmtN(r,2)}</b>, h = <b>${fmtN(hgt,2)}</b><br>Volume V = πr²h = <b>${fmtN(V,3)}</b><br>Surface = 2πr² + 2πrh = <b>${fmtN(S,3)}</b><br>Unrolled side: a ${fmtN(2*Math.PI*r,2)} × ${fmtN(hgt,2)} rectangle`);
      } else if (sv === 'cone') {
        const apex = [0, hgt / 2, 0];
        ring(circle3d(r, -hgt / 2));
        for (let i = 0; i < 8; i++) {
          const t = i / 8 * 2 * Math.PI;
          line([r * Math.cos(t), -hgt / 2, r * Math.sin(t)], apex, { color: i % 2 ? '#9a9df3' : '#5b5bf0', width: i % 2 ? 1.2 : 2 });
        }
        line([0, -hgt / 2, 0], apex, { color: '#c9cdf5', width: 1.4, dash: [5, 5] });
        line([0, -hgt / 2, 0], [r, -hgt / 2, 0], { color: '#fb923c', width: 2, dash: [4, 4] });
        const l = Math.sqrt(r * r + hgt * hgt);
        V = Math.PI * r * r * hgt / 3; S = Math.PI * r * r + Math.PI * r * l;
        info = L(`r = <b>${fmtN(r,2)}</b>，h = <b>${fmtN(hgt,2)}</b>，母线 l = <b>${fmtN(l,2)}</b><br>体积 V = ⅓πr²h = <b>${fmtN(V,3)}</b>
          <span class="tag">同底等高圆柱的 1/3</span><br>表面积 = πr² + πrl = <b>${fmtN(S,3)}</b>`,
                 `r = <b>${fmtN(r,2)}</b>, h = <b>${fmtN(hgt,2)}</b>, slant l = <b>${fmtN(l,2)}</b><br>Volume V = ⅓πr²h = <b>${fmtN(V,3)}</b>
          <span class="tag">1/3 of the matching cylinder</span><br>Surface = πr² + πrl = <b>${fmtN(S,3)}</b>`);
      } else {
        const R2 = r * 1.25;
        // 剪影圆
        ctx.strokeStyle = '#5b5bf0'; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.arc(cx, cy, R2 * scale, 0, Math.PI * 2); ctx.stroke();
        ring(circle3d(R2, 0), { color: '#9a9df3', width: 1.6 });
        // 两条经线
        const mer = n => Array.from({ length: 48 }, (_, i) => {
          const t = i / 48 * 2 * Math.PI;
          return n ? [0, R2 * Math.sin(t), R2 * Math.cos(t)] : [R2 * Math.cos(t), R2 * Math.sin(t), 0];
        });
        ring(mer(0), { color: '#c9cdf5', width: 1.3, dash: [4, 4] });
        ring(mer(1), { color: '#c9cdf5', width: 1.3, dash: [4, 4] });
        line([0, 0, 0], [R2 * Math.cos(th + 0.7), 0, R2 * Math.sin(th + 0.7)], { color: '#fb923c', width: 2 });
        V = 4 / 3 * Math.PI * R2 ** 3; S = 4 * Math.PI * R2 * R2;
        info = L(`半径 r = <b>${fmtN(R2,2)}</b><br>体积 V = ⁴⁄₃πr³ = <b>${fmtN(V,3)}</b><br>表面积 S = 4πr² = <b>${fmtN(S,3)}</b><br>S球 恰好 = 大圆面积 πr² 的 <b>4 倍</b>`,
                 `Radius r = <b>${fmtN(R2,2)}</b><br>Volume V = ⁴⁄₃πr³ = <b>${fmtN(V,3)}</b><br>Surface S = 4πr² = <b>${fmtN(S,3)}</b><br>The sphere's surface is exactly <b>4×</b> the area of its great circle πr²`);
      }
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif';
      ctx.fillText(L('拖动「旋转视角」或点击播放 🔄', 'Drag "Rotate view" or press Play 🔄'), 16, 24);
      readout.set(info);
    }
    [s1, s2, syaw].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    sync();
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
