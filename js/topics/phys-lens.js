'use strict';
/* ===== 凸透镜成像 Convex Lens Imaging ===== */
registerTopic({
  id: 'lens', cat: 'optics', icon: '🔍',
  title: '凸透镜成像', en: 'Convex Lens Imaging',
  desc: '移动物体、改变焦距，用三条特殊光线作图，观察实像与虚像如何形成。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '凸透镜成像', en: 'Image Formation by a Convex Lens',
      tagline: '把物距 u 从远处一路拖到焦点以内，观察像的大小、正倒、虚实如何变化。',
      formula: '<span class="frac"><span>1</span><span class="den">u</span></span> + <span class="frac"><span>1</span><span class="den">v</span></span> = <span class="frac"><span>1</span><span class="den">f</span></span>　·　m = <span class="frac"><span>v</span><span class="den">u</span></span>',
      explainHTML: `
        <h2>成像公式 <span class="en">Lens Equation</span></h2>
        <div class="formula">
          <span class="frac"><span>1</span><span class="den">u</span></span> +
          <span class="frac"><span>1</span><span class="den">v</span></span> =
          <span class="frac"><span>1</span><span class="den">f</span></span>
          <span class="note">u：物距 object distance；v：像距 image distance；f：焦距 focal length（实像 v &gt; 0，虚像 v &lt; 0）</span>
        </div>
        <div class="formula">放大率 magnification：m = <span class="frac"><span>v</span><span class="den">u</span></span></div>
        <h2>三条特殊光线 <span class="en">Three Principal Rays</span></h2>
        <ol>
          <li>平行于主光轴 (principal axis) 的光线，折射后过<span class="term">焦点 <span class="en">(focal point)</span></span> F′；</li>
          <li>过<span class="term">光心 <span class="en">(optical center)</span></span> O 的光线，方向不变；</li>
          <li>过焦点 F 的光线，折射后平行于主光轴。</li>
        </ol>
        <p>任意两条的交点就是像的位置 —— 实验里三条线都画给你看。</p>
        <h2>成像规律表 <span class="en">Imaging Rules</span></h2>
        <ul>
          <li><b>u &gt; 2f</b>：倒立、缩小的<b>实像</b> (real image)，f &lt; v &lt; 2f —— 照相机 camera；</li>
          <li><b>u = 2f</b>：倒立、等大的实像，v = 2f —— 测焦距的方法；</li>
          <li><b>f &lt; u &lt; 2f</b>：倒立、放大的实像，v &gt; 2f —— 投影仪 projector；</li>
          <li><b>u = f</b>：不成像（折射光平行射出）—— 探照灯；</li>
          <li><b>u &lt; f</b>：正立、放大的<b>虚像</b> (virtual image)，与物同侧 —— 放大镜 magnifier！</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把 u 调到正好 2f，验证“等大实像”；② 慢慢把物体推过焦点（u &lt; f），像突然跳到同侧变成正立放大的虚像（虚线）—— 这就是放大镜模式；③ u 越接近 f，像越大越远，体会“焦点附近的剧变”。</div>
        <div class="think"><b>思考一下：</b>实像和虚像的本质区别是什么？（提示：实像是光线真正会聚而成，能用光屏接到；虚像只是反向延长线的交点。）</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const sf = addSlider(panel, { label: '焦距 f', en: 'focal length', min: 3, max: 10, step: 0.5, value: 5, unit: 'cm' });
    const su = addSlider(panel, { label: '物距 u', en: 'object distance', min: 1, max: 35, step: 0.25, value: 15, unit: 'cm' });
    const readout = addReadout(panel);
    const hO = 3; // 物高

    function draw() {
      const f = sf.value, u = su.value;
      const atFocus = Math.abs(u - f) < 0.15;
      const v = atFocus ? Infinity : (u * f) / (u - f);
      const hI = atFocus ? Infinity : -(v / u) * hO;
      // 视野范围
      const xR = (!atFocus && v > 0) ? Math.min(v + 4, 60) : Math.max(2.5 * f, 14);
      const xL = -(Math.max(u + 4, (!atFocus && v < 0) ? -v + 4 : 0, 2.2 * f));
      const yM = Math.max(5, Math.min(isFinite(hI) ? Math.abs(hI) + 1.5 : 5, 14));
      const plot = new Plot(cv, { xmin: xL, xmax: xR, ymin: -yM, ymax: yM, padL: 8, padR: 8, padT: 8, padB: 8 });
      plot.clear('#fff');
      const { ctx, W, H } = cv;
      // 主光轴
      plot.seg(xL, 0, xR, 0, { color: C.axis, width: 1.4 });
      // 透镜（双凸示意）
      const lensH = yM * 0.82;
      ctx.save();
      ctx.strokeStyle = C.cyan; ctx.fillStyle = 'rgba(8,145,178,.10)'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(plot.X(0), plot.Y(lensH));
      ctx.quadraticCurveTo(plot.X(0) + 16, plot.Y(0), plot.X(0), plot.Y(-lensH));
      ctx.quadraticCurveTo(plot.X(0) - 16, plot.Y(0), plot.X(0), plot.Y(lensH));
      ctx.fill(); ctx.stroke();
      ctx.restore();
      plot.text(0, lensH, '凸透镜', { color: C.cyan, dy: -8, align: 'center' });
      // 焦点 & 2f 点
      [[-f, 'F'], [f, "F′"], [-2 * f, '2F'], [2 * f, "2F′"]].forEach(([x, lb]) => {
        plot.dot(x, 0, { color: lb.length < 3 ? C.purple : C.gray, r: 3.5, label: lb, labelDy: 18, labelDx: -5 });
      });
      // 物体（绿色箭头）
      plot.arrow(-u, 0, -u, hO, { color: C.green, width: 3.5, label: '物', labelDx: -22, labelDy: 0 });

      // 三条特殊光线
      const top = [-u, hO];
      if (atFocus) {
        // 不成像：两条折射光平行
        plot.seg(top[0], top[1], 0, hO, { color: C.orange, width: 2 });
        const k = hO / f;
        plot.seg(0, hO, xR, hO - k * xR, { color: C.orange, width: 2 });
        plot.seg(top[0], top[1], xR, hO * (1 - xR / (-u)) , { color: C.red, width: 2 });
      } else {
        const yI = -hI === 0 ? 0 : -((v / u) * hO) * 1; // 像顶端 y = −(v/u)hO
        const yTop = -(v / u) * hO;
        const img = [v, yTop];
        // ① 平行光 → 过 F′
        plot.seg(top[0], top[1], 0, hO, { color: C.orange, width: 2 });
        rayThrough(plot, [0, hO], [f, 0], v > 0 ? img : null, xR, C.orange);
        // ② 过光心
        rayLine(plot, top, [0, 0], xR, C.red);
        // ③ 过 F → 平行射出
        const yLens = hO * f / (f - u); // 光线 (−u,hO)-(−f,0) 在 x=0 处的 y
        plot.seg(top[0], top[1], 0, yLens, { color: C.purple, width: 2 });
        plot.seg(0, yLens, xR, yLens, { color: C.purple, width: 2 });
        // 虚像：反向延长线（虚线）
        if (v < 0) {
          plot.seg(0, hO, img[0], img[1], { color: C.orange, width: 1.6, dash: [6, 5] });
          plot.seg(0, 0, img[0], img[1], { color: C.red, width: 1.6, dash: [6, 5] });
          plot.seg(0, yLens, img[0], img[1], { color: C.purple, width: 1.6, dash: [6, 5] });
        }
        // 像（蓝色箭头；虚像用半透明）
        ctx.save();
        if (v < 0) ctx.globalAlpha = 0.55;
        plot.arrow(v, 0, v, yTop, { color: C.blue, width: 3.5, label: v < 0 ? '虚像' : '实像', labelDx: 6 });
        ctx.restore();
      }

      function rayLine(plot, p1, p2, xEnd, color) {
        // 过 p1、p2 的直线，画到 x = xEnd
        const k = (p2[1] - p1[1]) / (p2[0] - p1[0]);
        const yEnd = p1[1] + k * (xEnd - p1[0]);
        plot.seg(p1[0], p1[1], xEnd, yEnd, { color, width: 2 });
      }
      function rayThrough(plot, from, through, stopAt, xEnd, color) {
        const k = (through[1] - from[1]) / (through[0] - from[0]);
        const yEnd = from[1] + k * (xEnd - from[0]);
        plot.seg(from[0], from[1], xEnd, yEnd, { color, width: 2 });
      }

      let nature, device;
      if (atFocus) { nature = '<span class="warn">u = f：不成像</span>（折射光平行射出）'; device = '探照灯 searchlight'; }
      else if (u < f) { nature = '正立、放大、<b>虚像</b> (virtual, upright, magnified)'; device = '放大镜 magnifier 🔍'; }
      else if (u < 2 * f) { nature = '倒立、放大、<b>实像</b> (real, inverted, magnified)'; device = '投影仪 projector'; }
      else if (Math.abs(u - 2 * f) < 0.15) { nature = '倒立、<b>等大</b>实像 (same size)'; device = 'u = 2f 特征点'; }
      else { nature = '倒立、缩小、<b>实像</b> (real, inverted, diminished)'; device = '照相机 camera 📷'; }
      readout.set(`
        f = <b>${fmtN(f,1)}</b> cm，u = <b>${fmtN(u,1)}</b> cm（u/f = ${fmtN(u/f,2)}）<br>
        像距 v = uf/(u−f) = <b>${atFocus ? '∞' : fmtN(v,2) + ' cm'}</b><br>
        放大率 m = |v|/u = <b>${atFocus ? '—' : fmtN(Math.abs(v) / u,2)}</b><br>
        成像：${nature}<br>
        对应仪器：<span class="tag">${device}</span>`);
    }
    [sf, su].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
