'use strict';
/* ===== 力的合成与分解 Force Composition ===== */
registerTopic({
  id: 'forces', cat: 'mech', icon: '🪢',
  title: '力的合成与分解', en: 'Force Composition',
  desc: '两个人拉一个物体，夹角越大越费劲？用平行四边形法则亲手验证。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '力的合成与分解', en: 'Composition & Resolution of Forces',
      tagline: '合力是平行四边形的对角线。保持 F₁、F₂ 不变，把夹角 θ 从 0° 拉到 180°，看合力如何缩水。',
      formula: 'F<sub>合</sub> = √(F₁² + F₂² + 2F₁F₂cos θ)　·　|F₁−F₂| ≤ F<sub>合</sub> ≤ F₁+F₂',
      explainHTML: `
        <h2>力是矢量 <span class="en">Force is a Vector</span></h2>
        <p>力既有大小又有方向，求"总效果"不能简单相加，要用<span class="term">平行四边形定则 <span class="en">(parallelogram rule)</span></span>：
        以 F₁、F₂ 为邻边作平行四边形，<span class="term">合力 <span class="en">(resultant force)</span></span>就是对角线。</p>
        <div class="formula">F<sub>合</sub>² = F₁² + F₂² + 2F₁F₂cos θ
          <span class="note">θ 是两力夹角。θ = 90° 时退化为勾股定理：F合 = √(F₁²+F₂²)</span></div>
        <h2>合力的范围 <span class="en">Range of the Resultant</span></h2>
        <ul>
          <li>θ = 0°（同向）：F<sub>合</sub> = F₁ + F₂，最大；</li>
          <li>θ = 180°（反向）：F<sub>合</sub> = |F₁ − F₂|，最小；</li>
          <li>夹角越大，合力越小 —— 两人抬水，胳膊张得越开越费劲！</li>
        </ul>
        <h2>力的分解 <span class="en">Resolution</span></h2>
        <p>分解是合成的逆运算：把一个力拆成两个分力。最常用的是<span class="term">正交分解 <span class="en">(orthogonal resolution)</span></span>：
        Fx = F·cos α，Fy = F·sin α（斜面问题里的 mg·sinθ、mg·cosθ 就是这么来的）。</p>
        <div class="tip"><b>实验建议：</b>① 设 F₁ = F₂，θ = 120°，读数显示合力恰好等于 F₁ —— 三个等大的力两两成 120° 可以平衡！② θ = 90° 验证勾股定理；③ 慢慢把 θ 拉到 180°，合力变成两力之差。</div>
        <div class="think"><b>思考一下：</b>晾衣绳中间挂了件衣服，为什么绳子绷得越直（越接近水平），绳中张力越大？大风天电线为什么不能绷得太紧？</div>
      `
    });

    const cv = createCanvas(canvasBox, 450);
    const sf1 = addSlider(panel, { label: '力 F₁', en: 'force', min: 10, max: 60, step: 1, value: 40, unit: 'N' });
    const sf2 = addSlider(panel, { label: '力 F₂', en: 'force', min: 10, max: 60, step: 1, value: 30, unit: 'N' });
    const sth = addSlider(panel, { label: '夹角 θ', en: 'angle between', min: 0, max: 180, step: 1, value: 60, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const F1 = sf1.value, F2 = sf2.value, th = sth.value * DEG;
      const R = Math.sqrt(F1 * F1 + F2 * F2 + 2 * F1 * F2 * Math.cos(th));
      // 夹角平分线竖直向上，两力对称分布
      const a1 = Math.PI / 2 + th / 2, a2 = Math.PI / 2 - th / 2;
      const v1 = [F1 * Math.cos(a1), F1 * Math.sin(a1)];
      const v2 = [F2 * Math.cos(a2), F2 * Math.sin(a2)];
      const vr = [v1[0] + v2[0], v1[1] + v2[1]];
      const M = Math.max(F1 + F2, 70) * 1.15;
      const plot = new Plot(cv, { xmin: -M, xmax: M, ymin: -M * 0.18, ymax: M, equal: true, padB: 14 });
      plot.clear('#fff');
      const { ctx } = cv;
      // 物体（圆环）
      ctx.fillStyle = '#e2e5f5'; ctx.strokeStyle = '#697086'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // 平行四边形
      plot.seg(v1[0], v1[1], vr[0], vr[1], { color: '#c9cdf5', width: 1.6, dash: [6, 5] });
      plot.seg(v2[0], v2[1], vr[0], vr[1], { color: '#c9cdf5', width: 1.6, dash: [6, 5] });
      // 夹角弧
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(plot.X(0), plot.Y(0), 34, -a2, -a1, true);
      ctx.stroke();
      ctx.fillStyle = C.purple; ctx.font = 'bold 13px sans-serif';
      ctx.fillText('θ=' + fmtN(sth.value, 0) + '°', plot.X(0) - 18, plot.Y(0) - 42);
      // 三个力
      plot.arrow(0, 0, v1[0], v1[1], { color: C.blue, width: 3.2, label: 'F₁', labelDx: -26 });
      plot.arrow(0, 0, v2[0], v2[1], { color: C.red, width: 3.2, label: 'F₂' });
      plot.arrow(0, 0, vr[0], vr[1], { color: C.green, width: 3.8, label: 'F合', labelDy: -8 });
      const special =
        Math.abs(sth.value - 90) < 1 ? `<span class="tag">θ=90°：F合 = √(F₁²+F₂²)（勾股）</span>` :
        Math.abs(sth.value - 120) < 1 && Math.abs(F1 - F2) < 1 ? '<span class="tag">等大成 120°：F合 = F₁！</span>' :
        sth.value === 0 ? '<span class="tag">同向：F合 = F₁+F₂ 最大</span>' :
        sth.value === 180 ? '<span class="tag">反向：F合 = |F₁−F₂| 最小</span>' : '';
      readout.set(`
        F合 = √(F₁²+F₂²+2F₁F₂cosθ)<br>
        　　= <b style="color:${C.green}">${fmtN(R,2)} N</b><br>
        理论范围：|F₁−F₂| = ${fmtN(Math.abs(F1-F2),0)} N ≤ F合 ≤ F₁+F₂ = ${fmtN(F1+F2,0)} N ✓<br>
        正交分解：F合x = <b>${fmtN(vr[0],1)}</b> N，F合y = <b>${fmtN(vr[1],1)}</b> N<br>
        ${special}`);
    }
    [sf1, sf2, sth].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
