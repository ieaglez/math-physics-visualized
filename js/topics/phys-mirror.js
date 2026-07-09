'use strict';
/* ===== 光的反射与平面镜成像 Reflection & Plane Mirrors（初中） ===== */
registerTopic({
  id: 'mirror', cat: 'optics', icon: '🪞', stage: 'junior',
  title: '光的反射与平面镜', en: 'Reflection & Plane Mirror',
  desc: L('拖动蜡烛和观察点，光路图告诉你：镜子里的"像"其实是反射光反向延长的交点。',
          'Drag the candle and the eye — the ray diagram reveals that the "image" in a mirror is where reflected rays appear to come from.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '光的反射与平面镜成像', en: 'Reflection & Plane-Mirror Images',
      tagline: L('实线是真实光线，虚线是它们的"反向延长线"—— 你的眼睛顺着反射光往回看，就"看见"了镜子后并不存在的像。',
                 'Solid lines are real rays; dashed ones are their backward extensions — your eye traces the reflected light back and "sees" an image that isn\'t really behind the mirror.'),
      formula: L('反射定律：反射角 = 入射角　·　平面镜成像：等大、正立、虚像，像距 = 物距',
                 'Law of reflection: angle out = angle in　·　Plane mirror: same-size, upright, virtual image; image distance = object distance'),
      explainHTML: L(`
        <h2>光的反射定律 <span class="en">Law of Reflection</span></h2>
        <ul>
          <li>入射光线、反射光线、<span class="term">法线 <span class="en">(normal)</span></span>在同一平面内；</li>
          <li>入射光线和反射光线分居法线两侧；</li>
          <li><b>反射角 = 入射角</b>（都从法线量起）。</li>
        </ul>
        <p>光滑表面发生<span class="term">镜面反射 <span class="en">(specular reflection)</span></span>；粗糙表面发生<span class="term">漫反射 <span class="en">(diffuse reflection)</span></span> —— 我们能从各个方向看到课本，正是因为漫反射。</p>
        <h2>平面镜成像的规律 <span class="en">Plane-Mirror Images</span></h2>
        <div class="formula">像与物：等大 · 正立 · 左右互换 · 像距 = 物距 · <b>虚像</b>
          <span class="note">连接物与像的线段被镜面垂直平分 —— 像与物关于镜面对称</span></div>
        <ul>
          <li><b>为什么是虚像</b>：反射光并没有真的从镜子后面出来 —— 只是它们的反向延长线交于一点，眼睛被"骗"了。光屏放在那里接不到任何东西；</li>
          <li>物体靠近镜子，像也同步靠近；你走近穿衣镜一步，"镜中人"也走近一步；</li>
          <li>照全身只需<b>半身高</b>的镜子（与距离无关！）—— 用光路图可以证明。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 拖动蜡烛远近，观察像始终与物关于镜面对称、距离相等；② 移动"眼睛"的位置：不管从哪里看，两条反射光的反向延长线都交在同一个像点上；③ 看角度读数：每条光线都严格满足反射角 = 入射角。</div>
        <div class="think"><b>思考一下：</b>汽车后视镜、潜望镜、水面倒影都是平面镜成像。为什么救护车车头的 "AMBULANCE" 常写成镜像字？</div>
      `, `
        <h2>Law of Reflection <span class="en">光的反射定律</span></h2>
        <ul>
          <li>The incident ray, reflected ray and the <span class="term">normal <span class="en">(法线)</span></span> lie in one plane;</li>
          <li>The incident and reflected rays sit on opposite sides of the normal;</li>
          <li><b>Angle of reflection = angle of incidence</b> (both measured from the normal).</li>
        </ul>
        <p>Smooth surfaces give <span class="term">specular reflection <span class="en">(镜面反射)</span></span>; rough ones give <span class="term">diffuse reflection <span class="en">(漫反射)</span></span> — you can read a book from any direction precisely because of diffuse reflection.</p>
        <h2>Plane-Mirror Images <span class="en">平面镜成像的规律</span></h2>
        <div class="formula">Image vs. object: same size · upright · left-right swapped · image distance = object distance · <b>virtual</b>
          <span class="note">The segment joining object and image is perpendicularly bisected by the mirror — they are mirror-symmetric</span></div>
        <ul>
          <li><b>Why virtual</b>: no light actually comes from behind the mirror — the reflected rays merely <em>extend backward</em> through one point, and the eye is fooled. A screen placed there catches nothing;</li>
          <li>Move toward the mirror and the image approaches in step — step up to a wardrobe mirror and your "mirror twin" steps up too;</li>
          <li>A mirror only <b>half your height</b> shows your full body (independent of distance!) — provable with a ray diagram.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Drag the candle closer and farther: the image stays mirror-symmetric, always at the same distance behind; ② Move the "eye": from anywhere, the two reflected rays' backward extensions cross at the same image point; ③ Watch the angle readout: every ray obeys reflection = incidence exactly.</div>
        <div class="think"><b>Think about it:</b> Rear-view mirrors, periscopes and reflections on a lake are all plane-mirror images. Why is "AMBULANCE" often printed mirror-reversed on the front of the vehicle?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sd = addSlider(panel, { label: L('物到镜的距离 d', 'Object distance d'), en: L('object distance', '物距'), min: 1, max: 6, step: 0.1, value: 3, unit: 'm' });
    const sh = addSlider(panel, { label: L('蜡烛高度', 'Candle height'), en: L('height', '高度'), min: 1, max: 3.5, step: 0.1, value: 2, unit: 'm' });
    const se = addSlider(panel, { label: L('眼睛的位置（上下）', 'Eye position (up/down)'), en: L('eye', '眼睛'), min: 0.5, max: 4.5, step: 0.1, value: 3.4, unit: 'm' });
    const readout = addReadout(panel);

    function draw() {
      const d = sd.value, hgt = sh.value, eyeY = se.value;
      // 世界坐标：镜面在 x=0（竖直），物在左侧 x=−d，眼睛在左侧 x=−d*0.9 上方
      const plot = new Plot(cv, { xmin: -7.5, xmax: 7.5, ymin: -0.6, ymax: 5.4, equal: true, padB: 10 });
      plot.clear('#fff');
      const { ctx } = cv;
      // 地面
      plot.seg(-7.5, 0, 7.5, 0, { color: '#e2e5f0', width: 2 });
      // 镜子（x=0 竖线 + 背面斜纹）
      plot.seg(0, 0, 0, 5, { color: '#475569', width: 4 });
      ctx.save();
      ctx.strokeStyle = '#b7bdd3'; ctx.lineWidth = 1.4;
      for (let y = 0.2; y < 5; y += 0.4) {
        ctx.beginPath();
        ctx.moveTo(plot.X(0) + 2, plot.Y(y));
        ctx.lineTo(plot.X(0) + 12, plot.Y(y + 0.25));
        ctx.stroke();
      }
      ctx.restore();
      plot.text(0, 5.1, L('平面镜', 'plane mirror'), { color: '#475569', align: 'center', font: 'bold 12.5px sans-serif' });
      // 蜡烛（物）与像
      const drawCandle = (x, alpha) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#d97706'; ctx.lineWidth = 7; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(plot.X(x), plot.Y(0)); ctx.lineTo(plot.X(x), plot.Y(hgt - 0.25)); ctx.stroke();
        ctx.lineCap = 'butt';
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(plot.X(x), plot.Y(hgt), 5, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCandle(-d, 1);
      drawCandle(d, 0.35);
      plot.text(-d, 0, L('物', 'object'), { color: '#b45309', dy: 22, align: 'center', font: 'bold 12.5px sans-serif' });
      plot.text(d, 0, L('像（虚）', 'image (virtual)'), { color: '#b45309', dy: 22, align: 'center', font: 'bold 12.5px sans-serif' });
      // 眼睛
      const eye = [-d * 0.55 - 1.2, eyeY];
      ctx.font = '22px sans-serif';
      ctx.fillText('👁', plot.X(eye[0]) - 11, plot.Y(eye[1]) + 8);
      // 两条反射光线：从烛焰 S=(−d, hgt) 射向镜面，反射进入眼睛
      // 利用像点 S'=(d, hgt)：反射光线的延长线过 S'，与眼睛连线交镜面于 P
      const S = [-d, hgt], Simg = [d, hgt];
      const rays = [eye, [eye[0], eye[1] - 0.9]]; // 眼睛及稍低一点的第二条，形成光束
      let angInfo = 0;
      rays.forEach((E, i) => {
        // P = 镜面上与 S' 和 E 连线的交点
        const t = (0 - Simg[0]) / (E[0] - Simg[0]);
        const Py = Simg[1] + t * (E[1] - Simg[1]);
        // 入射：S→P；反射：P→E
        plot.seg(S[0], S[1], 0, Py, { color: C.orange, width: 2.4 });
        pxArrow(ctx, plot.X(0), plot.Y(Py), plot.X(E[0]), plot.Y(E[1]), { color: C.orange, width: 2.4 });
        // 反向延长（虚线，到像点）
        plot.seg(0, Py, Simg[0], Simg[1], { color: '#f59e0b', width: 1.5, dash: [6, 5] });
        if (i === 0) {
          // 法线（镜面竖直 → 法线水平）与入射角标注
          plot.seg(-1.3, Py, 1.3, Py, { color: C.gray, width: 1.3, dash: [5, 4] });
          // 入射角 = 光线与法线的夹角 = atan(|Δy| / Δx)
          angInfo = Math.abs(Math.atan((S[1] - Py) / d)) / DEG;
          plot.text(-1.15, Py, 'θ', { color: C.soft, dy: -6, font: 'bold 12px sans-serif' });
        }
      });
      // 对称虚线：物-像连线
      plot.seg(S[0], S[1], Simg[0], Simg[1], { color: '#c9cdf5', width: 1.3, dash: [3, 5] });
      readout.set(L(`
        物距 = <b>${fmtN(d,1)} m</b> → 像距 = <b>${fmtN(d,1)} m</b>（相等 ✓）<br>
        物高 = 像高 = <b>${fmtN(hgt,1)} m</b>（等大 ✓）<br>
        第一条光线：入射角 = 反射角 = <b>${fmtN(angInfo,1)}°</b> ✓<br>
        <span class="tag">正立 · 等大 · 虚像</span><br>
        移动眼睛试试 —— 反向延长线始终交于同一像点`, `
        Object distance = <b>${fmtN(d,1)} m</b> → image distance = <b>${fmtN(d,1)} m</b> (equal ✓)<br>
        Object height = image height = <b>${fmtN(hgt,1)} m</b> (same size ✓)<br>
        First ray: incidence = reflection = <b>${fmtN(angInfo,1)}°</b> ✓<br>
        <span class="tag">upright · same size · virtual</span><br>
        Move the eye — the backward extensions always meet at the same image point`));
    }
    [sd, sh, se].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
