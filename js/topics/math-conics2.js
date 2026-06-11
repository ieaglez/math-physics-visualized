'use strict';
/* ===== 双曲线与抛物线 Hyperbola & Parabola ===== */
registerTopic({
  id: 'conics2', cat: 'math', icon: '🦋',
  title: '双曲线与抛物线', en: 'Hyperbola & Parabola',
  desc: '双曲线：到两焦点距离之差恒定；抛物线：到焦点与到准线距离相等。拖动验证！',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '双曲线与抛物线', en: 'Hyperbola & Parabola (Conics)',
      tagline: '切换两种圆锥曲线，拖动动点 P，盯住读数里那个"永远不变"的量。',
      formula: '双曲线：<span class="frac"><span>x²</span><span class="den">a²</span></span> − <span class="frac"><span>y²</span><span class="den">b²</span></span> = 1，||PF₁|−|PF₂|| = 2a　·　抛物线：y² = 2px，|PF| = d(P, 准线)',
      explainHTML: `
        <h2>双曲线 <span class="en">Hyperbola</span></h2>
        <p>到两定点 F₁、F₂ 的<b>距离之差的绝对值</b>为常数 2a（小于 |F₁F₂|）的点的轨迹：</p>
        <div class="formula"><span class="frac"><span>x²</span><span class="den">a²</span></span> − <span class="frac"><span>y²</span><span class="den">b²</span></span> = 1
          <span class="note">c² = a² + b²（注意：椭圆是 c² = a² − b²），离心率 e = c/a &gt; 1</span></div>
        <ul>
          <li>有两支 (two branches)，永远不与<span class="term">渐近线 <span class="en">(asymptotes)</span></span> y = ±(b/a)x 相交，但无限接近；</li>
          <li>应用：双曲线导航（LORAN）、冷却塔外形、引力弹弓轨道。</li>
        </ul>
        <h2>抛物线 <span class="en">Parabola</span></h2>
        <p>到<span class="term">焦点 <span class="en">(focus)</span></span> F 的距离等于到<span class="term">准线 <span class="en">(directrix)</span></span>距离的点的轨迹：</p>
        <div class="formula">y<sup>2</sup> = 2px　　焦点 F(<span class="frac"><span>p</span><span class="den">2</span></span>, 0)，准线 x = −<span class="frac"><span>p</span><span class="den">2</span></span>
          <span class="note">离心率 e = 1 —— 恰好处于椭圆 (e&lt;1) 和双曲线 (e&gt;1) 之间</span></div>
        <ul>
          <li>二次函数 y = ax² 的图象就是开口向上的抛物线（坐标轴方向不同而已）；</li>
          <li>光学性质：平行光经抛物面反射后<b>全部汇聚于焦点</b> —— 卫星锅、车灯、太阳灶都靠它。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 双曲线模式拖动 P 在右支上移动，|r₁−r₂| 始终等于 2a；② 调大 b，渐近线张得更开；③ 抛物线模式下 |PF| 和 P 到准线的距离始终相等 —— 这就是"e = 1"的含义。</div>
        <div class="think"><b>思考一下：</b>三种圆锥曲线可以统一定义：到定点距离与到定直线距离之比为常数 e。e &lt; 1、= 1、&gt; 1 分别是什么曲线？</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const mode = addSeg(panel, {
      options: [
        { label: '双曲线', value: 'hyp' },
        { label: '抛物线', value: 'par' }
      ],
      value: 'hyp', onChange: () => { sync(); draw(); }
    });
    const sa = addSlider(panel, { label: '实半轴 a', en: 'semi-axis', min: 1, max: 5, step: 0.1, value: 2.5 });
    const sb = addSlider(panel, { label: '虚半轴 b', en: 'semi-axis', min: 0.5, max: 5, step: 0.1, value: 2 });
    const sp = addSlider(panel, { label: '焦准距 p', en: 'parameter', min: 0.5, max: 6, step: 0.1, value: 2.5 });
    const st = addSlider(panel, { label: '动点 P 位置', en: 'point', min: -100, max: 100, step: 1, value: 40 });
    const readout = addReadout(panel);

    function sync() {
      const hyp = mode.value === 'hyp';
      sa.input.parentElement.style.display = hyp ? '' : 'none';
      sb.input.parentElement.style.display = hyp ? '' : 'none';
      sp.input.parentElement.style.display = hyp ? 'none' : '';
    }

    function draw() {
      const { ctx } = cv;
      if (mode.value === 'hyp') {
        const a = sa.value, b = sb.value;
        const c = Math.sqrt(a * a + b * b);
        const plot = new Plot(cv, { xmin: -10, xmax: 10, ymin: -7.5, ymax: 7.5, equal: true });
        plot.clear('#fff');
        plot.grid(2);
        plot.axes({ tickX: 2 });
        // 渐近线
        plot.fn(x => b / a * x, { color: C.gray, width: 1.5, dash: [7, 6] });
        plot.fn(x => -b / a * x, { color: C.gray, width: 1.5, dash: [7, 6] });
        plot.text(7.5, b / a * 7.5, 'y = (b/a)x', { color: C.gray, dy: -6 });
        // 双曲线两支
        [1, -1].forEach(s => {
          ctx.save();
          ctx.strokeStyle = C.blue; ctx.lineWidth = 3;
          ctx.beginPath();
          let pen = false;
          for (let u = -3; u <= 3; u += 0.04) {
            const x = s * a * Math.cosh(u), y = b * Math.sinh(u);
            const X = plot.X(x), Y = plot.Y(y);
            if (!pen) { ctx.moveTo(X, Y); pen = true; } else ctx.lineTo(X, Y);
          }
          ctx.stroke();
          ctx.restore();
        });
        // 动点（右支参数 u）
        const u = st.value / 100 * 2.2;
        const P = [a * Math.cosh(u), b * Math.sinh(u)];
        const r1 = Math.hypot(P[0] + c, P[1]), r2 = Math.hypot(P[0] - c, P[1]);
        plot.seg(P[0], P[1], -c, 0, { color: C.orange, width: 2.2 });
        plot.seg(P[0], P[1], c, 0, { color: C.green, width: 2.2 });
        plot.dot(-c, 0, { color: C.red, r: 5.5, label: 'F₁', labelDy: 20 });
        plot.dot(c, 0, { color: C.red, r: 5.5, label: 'F₂', labelDy: 20 });
        plot.dot(a, 0, { color: C.gray, r: 3.5 }); plot.dot(-a, 0, { color: C.gray, r: 3.5 });
        plot.dot(P[0], P[1], { color: C.purple, r: 6.5, label: 'P', labelDx: 10 });
        readout.set(`
          方程：x²/${fmtN(a*a,1)} − y²/${fmtN(b*b,1)} = 1<br>
          c = √(a²+b²) = <b>${fmtN(c,3)}</b>　离心率 e = <b>${fmtN(c/a,3)}</b> &gt; 1<br>
          r₁ = |PF₁| = <b>${fmtN(r1,3)}</b>　r₂ = |PF₂| = <b>${fmtN(r2,3)}</b><br>
          |r₁ − r₂| = <b style="color:${C.purple}">${fmtN(Math.abs(r1-r2),3)}</b> ＝ 2a = ${fmtN(2*a,1)} 恒定 ✓<br>
          渐近线：y = ±${fmtN(b/a,2)}x`);
      } else {
        const p = sp.value;
        const plot = new Plot(cv, { xmin: -p - 2, xmax: Math.max(10, 3 * p), ymin: -7.5, ymax: 7.5, equal: true });
        plot.clear('#fff');
        plot.grid(2);
        plot.axes({ tickX: 2 });
        // 准线
        plot.seg(-p / 2, -7, -p / 2, 7, { color: C.orange, width: 2, dash: [7, 5] });
        plot.text(-p / 2, 6.4, '准线 x = −p/2', { color: C.orange, dx: 8 });
        // 抛物线 y² = 2px
        ctx.save();
        ctx.strokeStyle = C.blue; ctx.lineWidth = 3;
        ctx.beginPath();
        let pen = false;
        for (let y = -7.5; y <= 7.5; y += 0.05) {
          const x = y * y / (2 * p);
          const X = plot.X(x), Y = plot.Y(y);
          if (!pen) { ctx.moveTo(X, Y); pen = true; } else ctx.lineTo(X, Y);
        }
        ctx.stroke();
        ctx.restore();
        // 动点
        const y0 = st.value / 100 * 6;
        const P = [y0 * y0 / (2 * p), y0];
        const F = [p / 2, 0];
        const rF = Math.hypot(P[0] - F[0], P[1]);
        const rD = P[0] + p / 2;
        plot.seg(P[0], P[1], F[0], F[1], { color: C.green, width: 2.2 });
        plot.seg(P[0], P[1], -p / 2, P[1], { color: C.orange, width: 2.2 });
        plot.dot(F[0], 0, { color: C.red, r: 5.5, label: 'F(p/2, 0)', labelDy: 20 });
        plot.dot(-p / 2, P[1], { color: C.orange, r: 4 });
        plot.dot(P[0], P[1], { color: C.purple, r: 6.5, label: 'P', labelDx: 10 });
        readout.set(`
          方程：y² = ${fmtN(2*p,1)}x（p = ${fmtN(p,1)}）<br>
          焦点 F(<b>${fmtN(p/2,2)}</b>, 0)，准线 x = <b>${fmtN(-p/2,2)}</b><br>
          |PF| = <b style="color:${C.green}">${fmtN(rF,3)}</b><br>
          P 到准线距离 = <b style="color:${C.orange}">${fmtN(rD,3)}</b><br>
          两者相等 ✓ —— 离心率 e = <b>1</b>`);
      }
    }
    [sa, sb, sp, st].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    sync();
    draw();
    return () => cv.destroy();
  }
});
