'use strict';
/* ===== 锐角三角函数 Right-Triangle Trigonometry（初中） ===== */
registerTopic({
  id: 'righttrig', cat: 'math', icon: '🗼', stage: 'junior',
  title: '锐角三角函数', en: 'Right-Triangle Trig',
  desc: L('sin、cos、tan 的第一次亮相：直角三角形里的三个比值，抬头一量就能算出塔有多高。',
          'The debut of sin, cos and tan: three ratios in a right triangle that let you measure a tower by looking up at it.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '锐角三角函数', en: 'Trigonometry in a Right Triangle',
      tagline: L('只要角度 θ 不变，无论三角形放大多少倍，三个比值纹丝不动 —— 拖"放大"滑块验证。',
                 'Fix the angle θ and the three ratios stay identical no matter how big the triangle grows — drag the "scale" slider to check.'),
      formula: L('sin θ = <span class="frac"><span>对边</span><span class="den">斜边</span></span>　cos θ = <span class="frac"><span>邻边</span><span class="den">斜边</span></span>　tan θ = <span class="frac"><span>对边</span><span class="den">邻边</span></span>',
                 'sin θ = <span class="frac"><span>opposite</span><span class="den">hypotenuse</span></span>　cos θ = <span class="frac"><span>adjacent</span><span class="den">hypotenuse</span></span>　tan θ = <span class="frac"><span>opposite</span><span class="den">adjacent</span></span>'),
      explainHTML: L(`
        <h2>三个比值 <span class="en">Three Ratios</span></h2>
        <p>直角三角形中，锐角 θ 的<span class="term">对边 <span class="en">(opposite)</span></span>、<span class="term">邻边 <span class="en">(adjacent)</span></span>和<span class="term">斜边 <span class="en">(hypotenuse)</span></span>组成三个比值：</p>
        <div class="formula">sin θ = 对/斜　　cos θ = 邻/斜　　tan θ = 对/邻</div>
        <ul>
          <li><b>关键洞察</b>：比值只由 θ 决定，与三角形大小无关 —— 因为所有"θ 相同的直角三角形"都相似（上一课！）；</li>
          <li>正因如此，才能造出"sin 表"给所有人查 —— 这就是"三角函数"名字的由来；</li>
          <li>特殊角要记牢：sin30° = ½，sin45° = √2/2，sin60° = √3/2（cos 正好倒序）。</li>
        </ul>
        <h2>测高测距 <span class="en">Heights &amp; Distances</span></h2>
        <div class="formula">塔高 = 距离 × tan(仰角)
          <span class="note">仰角 (angle of elevation)：视线与水平线的夹角。走到塔前 50 m 处，仰角 40°，塔高 ≈ 50 × 0.839 ≈ 42 m</span></div>
        <p>这是三角函数最古老的应用：测山高、测河宽、航海定位 —— 不用爬上去，就能"量"出来。</p>
        <div class="tip"><b>实验建议：</b>① 固定 θ，把"放大"从 1 拖到 2.5：三条边都变，三个比值一个都不变；② 把 θ 调到 30°、45°、60°，对照特殊值表；③ 注意 θ 增大时 sin 升、cos 降、tan 飙升 —— 45° 时 sin = cos、tan = 1。</div>
        <div class="think"><b>思考一下：</b>这里的 sin 只能算 0°~90°。要是角度超过 90°（比如钝角三角形）怎么办？—— 高中的"单位圆"就是为此而生的升级版。</div>
      `, `
        <h2>Three Ratios <span class="en">三个比值</span></h2>
        <p>For an acute angle θ in a right triangle, the <span class="term">opposite <span class="en">(对边)</span></span>, <span class="term">adjacent <span class="en">(邻边)</span></span> and <span class="term">hypotenuse <span class="en">(斜边)</span></span> form three ratios:</p>
        <div class="formula">sin θ = opp/hyp　　cos θ = adj/hyp　　tan θ = opp/adj</div>
        <ul>
          <li><b>The key insight</b>: the ratios depend only on θ, not on the triangle's size — because all right triangles with the same θ are similar (last lesson!);</li>
          <li>That is what makes universal "sine tables" possible — and where the very idea of a trigonometric <em>function</em> comes from;</li>
          <li>Memorize the specials: sin30° = ½, sin45° = √2/2, sin60° = √3/2 (cos runs the same list backwards).</li>
        </ul>
        <h2>Heights &amp; Distances <span class="en">测高测距</span></h2>
        <div class="formula">tower height = distance × tan(elevation)
          <span class="note">elevation (仰角): the angle between your line of sight and the horizontal. From 50 m away at 40° elevation: height ≈ 50 × 0.839 ≈ 42 m</span></div>
        <p>The oldest use of trigonometry: mountain heights, river widths, navigation — measuring without climbing.</p>
        <div class="tip"><b>Try this:</b> ① Fix θ and drag "scale" from 1 to 2.5: all three sides change, none of the three ratios do; ② Set θ to 30°, 45°, 60° and check against the special-value table; ③ As θ grows, sin rises, cos falls, tan takes off — at 45°, sin = cos and tan = 1.</div>
        <div class="think"><b>Think about it:</b> This sin only handles 0°–90°. What about obtuse angles? — The high-school "unit circle" is exactly the upgrade built for that.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sth = addSlider(panel, { label: L('锐角 θ', 'Acute angle θ'), en: L('angle', '锐角'), min: 10, max: 80, step: 1, value: 40, unit: '°' });
    const ss = addSlider(panel, { label: L('放大倍数（考验比值！）', 'Scale (test the ratios!)'), en: L('scale', '放大'), min: 1, max: 2.5, step: 0.05, value: 1 });
    const readout = addReadout(panel);

    function draw() {
      const th = sth.value * DEG, k = ss.value;
      const adj = 3.2 * k, opp = adj * Math.tan(th), hyp = adj / Math.cos(th);
      const plot = new Plot(cv, { xmin: -1, xmax: 10, ymin: -1.4, ymax: 8, equal: true, padB: 8 });
      plot.clear('#fff');
      const { ctx } = cv;
      // 三角形：直角在 (adj, 0)，θ 在原点
      ctx.save();
      ctx.fillStyle = 'rgba(91,91,240,.10)';
      ctx.beginPath();
      ctx.moveTo(plot.X(0), plot.Y(0)); ctx.lineTo(plot.X(adj), plot.Y(0)); ctx.lineTo(plot.X(adj), plot.Y(opp));
      ctx.closePath(); ctx.fill();
      ctx.restore();
      plot.seg(0, 0, adj, 0, { color: C.green, width: 3.5 });
      plot.seg(adj, 0, adj, opp, { color: C.red, width: 3.5 });
      plot.seg(0, 0, adj, opp, { color: C.blue, width: 3.5 });
      // 直角标记与 θ 弧
      plot.seg(adj - 0.3, 0, adj - 0.3, 0.3, { color: '#697086', width: 1.6 });
      plot.seg(adj - 0.3, 0.3, adj, 0.3, { color: '#697086', width: 1.6 });
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), 30, -th, 0); ctx.stroke();
      ctx.fillStyle = C.purple; ctx.font = 'bold 13px sans-serif';
      ctx.fillText('θ = ' + fmtN(sth.value, 0) + '°', plot.X(0) + 36, plot.Y(0) - 10);
      // 边标注
      plot.text(adj / 2, 0, L('邻边 ', 'adjacent ') + fmtN(adj, 2), { color: C.green, dy: 22, align: 'center', font: 'bold 12.5px sans-serif' });
      plot.text(adj, opp / 2, L(' 对边 ', ' opposite ') + fmtN(opp, 2), { color: C.red, dx: 8, font: 'bold 12.5px sans-serif' });
      plot.text(adj / 2, opp / 2, L('斜边 ', 'hypotenuse ') + fmtN(hyp, 2), { color: C.blue, dx: -14, dy: -10, align: 'right', font: 'bold 12.5px sans-serif' });
      // 塔的装饰（把对边画成小塔）
      ctx.font = '20px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('🗼', plot.X(adj), plot.Y(opp) - 12);
      ctx.fillText('🧍', plot.X(0), plot.Y(0) - 12);
      ctx.textAlign = 'left';
      readout.set(L(`
        对边 = <b>${fmtN(opp,2)}</b>，邻边 = <b>${fmtN(adj,2)}</b>，斜边 = <b>${fmtN(hyp,2)}</b><br>
        sin θ = 对/斜 = <b style="color:${C.red}">${fmtN(Math.sin(th),3)}</b><br>
        cos θ = 邻/斜 = <b style="color:${C.green}">${fmtN(Math.cos(th),3)}</b><br>
        tan θ = 对/邻 = <b style="color:${C.purple}">${fmtN(Math.tan(th),3)}</b><br>
        ${k > 1.02 ? `<span class="tag">放大 ${fmtN(k,2)} 倍，比值一个没变 ✓</span>` : '<span class="tag">拖"放大"滑块试试比值会不会变</span>'}<br>
        测高应用：距塔 ${fmtN(adj,1)} m、仰角 ${fmtN(sth.value,0)}° → 塔高 = ${fmtN(adj,1)}×tan${fmtN(sth.value,0)}° = <b>${fmtN(opp,1)} m</b>`, `
        opposite = <b>${fmtN(opp,2)}</b>, adjacent = <b>${fmtN(adj,2)}</b>, hypotenuse = <b>${fmtN(hyp,2)}</b><br>
        sin θ = opp/hyp = <b style="color:${C.red}">${fmtN(Math.sin(th),3)}</b><br>
        cos θ = adj/hyp = <b style="color:${C.green}">${fmtN(Math.cos(th),3)}</b><br>
        tan θ = opp/adj = <b style="color:${C.purple}">${fmtN(Math.tan(th),3)}</b><br>
        ${k > 1.02 ? `<span class="tag">scaled ×${fmtN(k,2)} — not one ratio changed ✓</span>` : '<span class="tag">drag "scale" and watch the ratios hold</span>'}<br>
        Surveying: ${fmtN(adj,1)} m from the tower at ${fmtN(sth.value,0)}° elevation → height = ${fmtN(adj,1)}×tan${fmtN(sth.value,0)}° = <b>${fmtN(opp,1)} m</b>`));
    }
    [sth, ss].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
