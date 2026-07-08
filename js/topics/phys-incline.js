'use strict';
/* ===== 牛顿第二定律与斜面 Newton's Second Law on an Incline ===== */
registerTopic({
  id: 'incline', cat: 'mech', icon: '⛰️',
  title: '斜面上的受力分析', en: "Newton's Laws on Incline",
  desc: L('调节倾角与摩擦系数，观察重力如何分解、物块何时下滑，理解牛顿第二定律。',
          'Adjust the incline angle and friction coefficient, watch gravity resolve into components, see when the block slides — and understand Newton\'s second law.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '斜面上的受力分析', en: "Force Analysis on an Inclined Plane",
      tagline: L('调大倾角 θ 或调小摩擦系数 μ，找到物块恰好开始下滑的临界点。',
                 'Increase the angle θ or decrease the friction coefficient μ to find the critical point where the block just begins to slide.'),
      formula: L('F<sub>合</sub> = ma　·　N = mg·cosθ　·　a = g(sinθ − μcosθ)',
                 'F<sub>net</sub> = ma　·　N = mg·cosθ　·　a = g(sinθ − μcosθ)'),
      explainHTML: L(`
        <h2>牛顿第二定律 <span class="en">Newton's Second Law</span></h2>
        <div class="formula">F<sub>合</sub> = ma <span class="note">（合外力 net force 决定加速度，方向相同）</span></div>
        <h2>受力分析四步法 <span class="en">Free-Body Diagram</span></h2>
        <p>对斜面上的物块画<span class="term">受力图 <span class="en">(free-body diagram)</span></span>：</p>
        <ol>
          <li><b>重力 <span class="en">(gravity)</span></b> G = mg，竖直向下；</li>
          <li><b>支持力 <span class="en">(normal force)</span></b> N，垂直于斜面；</li>
          <li><b>摩擦力 <span class="en">(friction)</span></b> f，沿斜面方向，阻碍相对滑动；</li>
          <li>沿斜面方向和垂直斜面方向<b>正交分解</b>重力：</li>
        </ol>
        <div class="formula">
          沿斜面分量：mg·sin θ（下滑力）　　垂直分量：mg·cos θ
          <span class="note">⟹ N = mg·cos θ，滑动摩擦力 f = μN = μmg·cos θ</span>
        </div>
        <h2>滑还是不滑？ <span class="en">To Slide or Not to Slide</span></h2>
        <ul>
          <li>若 mg·sin θ ≤ μmg·cos θ，即 <b>tan θ ≤ μ</b>：静摩擦力足以平衡下滑力，物块<b>静止</b>（a = 0）；</li>
          <li>若 tan θ &gt; μ：物块沿斜面加速下滑：</li>
        </ul>
        <div class="formula">a = g(sin θ − μcos θ)<span class="note">（注意：与质量 m 无关！）</span></div>
        <div class="tip"><b>实验建议：</b>① 固定 μ = 0.5，慢慢调大 θ，物块在 tan θ = 0.5（约 26.6°）处恰好开始下滑 —— 这个临界角叫<b>摩擦角</b>；② 改变质量 m，加速度 a 变了吗？为什么？③ 把 μ 调到 0（光滑斜面），a = g·sin θ —— 这就是伽利略当年研究落体用的“稀释重力”法。</div>
        <div class="think"><b>思考一下：</b>下滑时间与质量无关，那为什么生活经验里重的东西好像“滑得快”？（提示：空气阻力、滚动等因素）</div>
      `, `
        <h2>Newton's Second Law <span class="en">牛顿第二定律</span></h2>
        <div class="formula">F<sub>net</sub> = ma <span class="note">(the net force 合外力 determines the acceleration — same direction)</span></div>
        <h2>Free-Body Diagram <span class="en">受力分析四步法</span></h2>
        <p>Draw a <span class="term">free-body diagram <span class="en">(受力图)</span></span> for the block on the incline:</p>
        <ol>
          <li><b>Gravity <span class="en">(重力)</span></b> G = mg, pointing straight down;</li>
          <li><b>Normal force <span class="en">(支持力)</span></b> N, perpendicular to the incline surface;</li>
          <li><b>Friction <span class="en">(摩擦力)</span></b> f, along the incline, opposing relative sliding;</li>
          <li><b>Resolve</b> gravity into components along and perpendicular to the incline:</li>
        </ol>
        <div class="formula">
          Along the incline: mg·sin θ (the driving component)　　Perpendicular: mg·cos θ
          <span class="note">⟹ N = mg·cos θ, kinetic friction f = μN = μmg·cos θ</span>
        </div>
        <h2>To Slide or Not to Slide <span class="en">滑还是不滑？</span></h2>
        <ul>
          <li>If mg·sin θ ≤ μmg·cos θ, i.e. <b>tan θ ≤ μ</b>: static friction can balance the driving component, so the block <b>stays at rest</b> (a = 0);</li>
          <li>If tan θ &gt; μ: the block accelerates down the incline:</li>
        </ul>
        <div class="formula">a = g(sin θ − μcos θ)<span class="note">(note: independent of the mass m!)</span></div>
        <div class="tip"><b>Try this:</b> ① Fix μ = 0.5 and slowly increase θ — the block just starts to slide at tan θ = 0.5 (about 26.6°); this critical angle is called the <b>angle of friction</b>. ② Change the mass m — does the acceleration a change? Why? ③ Set μ to 0 (a frictionless incline): a = g·sin θ — exactly Galileo's trick of "diluting gravity" to study falling bodies.</div>
        <div class="think"><b>Think about it:</b> The sliding time is independent of mass — so why do heavy objects seem to "slide faster" in everyday life? (Hint: air resistance, rolling, and other factors.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sm = addSlider(panel, { label: L('质量 m', 'Mass m'), en: L('mass', '质量'), min: 0.5, max: 10, step: 0.5, value: 2, unit: 'kg' });
    const sth = addSlider(panel, { label: L('倾角 θ', 'Angle θ'), en: L('angle', '倾角'), min: 5, max: 60, step: 0.5, value: 30, unit: '°' });
    const smu = addSlider(panel, { label: L('摩擦系数 μ', 'Friction coefficient μ'), en: L('friction coeff.', '摩擦系数'), min: 0, max: 1, step: 0.02, value: 0.3 });
    const readout = addReadout(panel);
    const g = 9.8;

    function draw() {
      const m = sm.value, th = sth.value * DEG, mu = smu.value;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

      // —— 斜面几何（像素坐标）——
      const baseY = H - 56, ax0 = Math.max(60, W * 0.12);
      const len = Math.min(W - ax0 - 80, 520);
      const A = [ax0, baseY];                       // 左下角（倾角顶点）
      const Cpt = [ax0 + len, baseY - len * Math.tan(th)]; // 斜面最高点
      // 三角形
      ctx.fillStyle = '#f1f5f9';
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Cpt[0], A[1]); ctx.lineTo(Cpt[0], Cpt[1]); ctx.closePath();
      ctx.fill(); ctx.stroke();
      // 倾角弧
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(A[0], A[1], 44, 0, -th, true); ctx.stroke();
      ctx.fillStyle = C.purple; ctx.font = 'bold 14px sans-serif';
      ctx.fillText('θ = ' + fmtN(sth.value, 1) + '°', A[0] + 52, A[1] - 12);
      // 斜面方向单位向量（屏幕坐标：向上沿斜面）
      const u = [Math.cos(th), -Math.sin(th)];      // 沿斜面向上
      const n = [Math.sin(th), Math.cos(th)];       // 指离斜面（上方）→ 屏幕里是 (sinθ, -cosθ)? 推导：
      // 斜面表面从 A 到 Cpt 方向 u=(cosθ,−sinθ)（屏幕 y 向下，故 −sinθ 表示向上）
      // 法线（远离斜面体、指向左上）= 把 u 逆时针旋转 90°（屏幕坐标系）：(u_y, −u_x) = (−sinθ, −cosθ)
      const nv = [-Math.sin(th), -Math.cos(th)];
      // 物块（位于斜面中点，方块旋转 θ）
      const mid = [(A[0] + Cpt[0]) / 2, (A[1] + Cpt[1]) / 2];
      const bs = 26 + m * 2.2; // 方块大小随质量
      const bc = [mid[0] + nv[0] * bs / 2, mid[1] + nv[1] * bs / 2]; // 方块中心
      ctx.save();
      ctx.translate(bc[0], bc[1]);
      ctx.rotate(-th);
      ctx.fillStyle = '#fbbf24'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-bs / 2, -bs / 2, bs, bs, 5); else ctx.rect(-bs / 2, -bs / 2, bs, bs);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#92400e'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(fmtN(m, 1) + 'kg', 0, 5);
      ctx.restore();

      // —— 力的箭头 ——
      const mg = m * g, N = mg * Math.cos(th);
      const slide = Math.tan(th) > mu + 1e-9;
      const f = slide ? mu * N : mg * Math.sin(th);
      const a = slide ? g * (Math.sin(th) - mu * Math.cos(th)) : 0;
      const fs = 2.6;  // 像素/牛 比例（随 mg 自适应）
      const k = Math.min(fs, 110 / mg);
      // 重力（从方块中心垂直向下）
      pxArrow(ctx, bc[0], bc[1], bc[0], bc[1] + mg * k, { color: C.red, width: 3, label: 'G = mg', labelDx: 6 });
      // 分量（虚线）
      pxArrow(ctx, bc[0], bc[1], bc[0] - u[0] * mg * Math.sin(th) * k, bc[1] - u[1] * mg * Math.sin(th) * k,
        { color: '#f87171', width: 2, dash: [5, 4], label: 'mg·sinθ', labelDy: 16, labelDx: -64 });
      pxArrow(ctx, bc[0], bc[1], bc[0] - nv[0] * mg * Math.cos(th) * k, bc[1] - nv[1] * mg * Math.cos(th) * k,
        { color: '#f87171', width: 2, dash: [5, 4], label: 'mg·cosθ', labelDx: -8, labelDy: 16 });
      // 支持力
      pxArrow(ctx, bc[0], bc[1], bc[0] + nv[0] * N * k, bc[1] + nv[1] * N * k,
        { color: C.green, width: 3, label: 'N', labelDx: -2, labelDy: -4 });
      // 摩擦力（沿斜面向上）
      if (f > 0.2) pxArrow(ctx, bc[0], bc[1], bc[0] + u[0] * f * k, bc[1] + u[1] * f * k,
        { color: C.cyan, width: 3, label: 'f', labelDy: -6 });
      // 加速度指示
      if (slide) {
        pxArrow(ctx, bc[0] + nv[0] * bs, bc[1] + nv[1] * bs,
          bc[0] + nv[0] * bs - u[0] * 56, bc[1] + nv[1] * bs - u[1] * 56,
          { color: C.purple, width: 3, label: 'a', labelDy: -4 });
      }
      ctx.font = '12px sans-serif'; ctx.fillStyle = C.soft;
      ctx.fillText(L('（虚线为重力的正交分解 components of gravity）', '(dashed: components of gravity)'), 16, 24);

      const critical = Math.atan(mu) / DEG;
      readout.set(L(`
        重力 G = mg = <b>${fmtN(mg,1)} N</b><br>
        支持力 N = mg·cosθ = <b>${fmtN(N,1)} N</b><br>
        下滑力 mg·sinθ = <b>${fmtN(mg * Math.sin(th),1)} N</b><br>
        摩擦力 f = <b>${fmtN(f,1)} N</b>（${slide ? '滑动摩擦 μN' : '静摩擦，恰好平衡'}）<br>
        ${slide
          ? `<span class="warn">物块下滑！</span> a = g(sinθ−μcosθ) = <b>${fmtN(a,2)} m/s²</b>`
          : `<span class="tag">物块静止 (tanθ ≤ μ)</span> a = 0`}<br>
        临界角（摩擦角）= arctan μ = <b>${fmtN(critical,1)}°</b>`, `
        Gravity G = mg = <b>${fmtN(mg,1)} N</b><br>
        Normal force N = mg·cosθ = <b>${fmtN(N,1)} N</b><br>
        Driving component mg·sinθ = <b>${fmtN(mg * Math.sin(th),1)} N</b><br>
        Friction f = <b>${fmtN(f,1)} N</b> (${slide ? 'kinetic friction μN' : 'static friction, just balancing'})<br>
        ${slide
          ? `<span class="warn">The block slides!</span> a = g(sinθ−μcosθ) = <b>${fmtN(a,2)} m/s²</b>`
          : `<span class="tag">Block at rest (tanθ ≤ μ)</span> a = 0`}<br>
        Critical angle (angle of friction) = arctan μ = <b>${fmtN(critical,1)}°</b>`));
    }
    [sm, sth, smu].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
