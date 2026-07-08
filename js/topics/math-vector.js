'use strict';
/* ===== 平面向量 Vectors in the Plane ===== */
registerTopic({
  id: 'vector', cat: 'math', icon: '➡️',
  title: '平面向量', en: 'Vectors',
  desc: L('调整两个向量的模和方向角，观察向量加法的平行四边形法则与数量积的变化。',
          'Adjust the magnitudes and direction angles of two vectors to explore the parallelogram rule of addition and how the dot product responds.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '平面向量', en: 'Vectors in the Plane',
      tagline: L('调整 a、b 的大小和方向，观察 a + b（平行四边形法则）与数量积 a·b。',
                 'Adjust the size and direction of a and b; watch a + b (parallelogram rule) and the dot product a·b.'),
      formula: '<b>a</b>·<b>b</b> = |a||b|cos θ = x₁x₂ + y₁y₂　·　a·b = 0 ⟺ a ⊥ b',
      explainHTML: L(`
        <h2>向量是什么 <span class="en">What is a Vector</span></h2>
        <p><span class="term">向量 <span class="en">(vector)</span></span>是既有<b>大小（模 magnitude）</b>又有<b>方向 (direction)</b> 的量，
        用有向线段表示。坐标表示：<b>a</b> = (x, y)，模 |<b>a</b>| = √(x² + y²)。</p>
        <h2>向量加法 <span class="en">Vector Addition</span></h2>
        <ul>
          <li><b>平行四边形法则 <span class="en">(parallelogram rule)</span></b>：以 a、b 为邻边作平行四边形，对角线就是 a + b（图中绿色）；</li>
          <li><b>三角形法则 <span class="en">(triangle rule)</span></b>：把 b 平移到 a 的终点（图中虚线），首尾相接；</li>
          <li>坐标运算：(x₁, y₁) + (x₂, y₂) = (x₁ + x₂, y₁ + y₂)。</li>
        </ul>
        <h2>数量积 <span class="en">Dot Product</span></h2>
        <div class="formula"><b>a</b>·<b>b</b> = |<b>a</b>||<b>b</b>|cos θ = x₁x₂ + y₁y₂</div>
        <ul>
          <li>θ 是两向量的<span class="term">夹角 <span class="en">(angle between vectors)</span></span>（0° ≤ θ ≤ 180°）；</li>
          <li>a·b &gt; 0 ⟹ 夹角为锐角；a·b = 0 ⟹ <b>垂直 (perpendicular)</b>；a·b &lt; 0 ⟹ 夹角为钝角；</li>
          <li>几何意义：|a| 乘以 b 在 a 方向上的<span class="term">投影 <span class="en">(projection)</span></span>。</li>
          <li>物理应用：功 W = <b>F</b>·<b>s</b> = |F||s|cos θ，正是数量积！</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把两个向量的夹角调成 90°，看读数中 a·b 是不是变成 0；② 把夹角拉到 180°（反向），|a+b| 是不是变成 ||a|−|b||？③ 同向时 |a+b| = |a|+|b|，这就是不等式 ||a|−|b|| ≤ |a±b| ≤ |a|+|b| 的两个端点。</div>
        <div class=”think”><b>思考一下：</b>为什么数量积的结果是一个”数”而不是向量？它在物理里描述的是哪类问题？</div>
      `, `
        <h2>What is a Vector <span class=”en”>向量是什么</span></h2>
        <p>A <span class=”term”>vector <span class=”en”>(向量)</span></span> has both <b>magnitude (模)</b> and <b>direction (方向)</b>,
        drawn as a directed segment. In coordinates: <b>a</b> = (x, y), with magnitude |<b>a</b>| = √(x² + y²).</p>
        <h2>Vector Addition <span class=”en”>向量加法</span></h2>
        <ul>
          <li><b>Parallelogram rule <span class=”en”>(平行四边形法则)</span></b>: build a parallelogram on a and b — the diagonal is a + b (green in the figure);</li>
          <li><b>Triangle rule <span class=”en”>(三角形法则)</span></b>: translate b to the tip of a (dashed) and chain them head-to-tail;</li>
          <li>Coordinates: (x₁, y₁) + (x₂, y₂) = (x₁ + x₂, y₁ + y₂).</li>
        </ul>
        <h2>Dot Product <span class=”en”>数量积</span></h2>
        <div class=”formula”><b>a</b>·<b>b</b> = |<b>a</b>||<b>b</b>|cos θ = x₁x₂ + y₁y₂</div>
        <ul>
          <li>θ is the <span class=”term”>angle between the vectors <span class=”en”>(夹角)</span></span> (0° ≤ θ ≤ 180°);</li>
          <li>a·b &gt; 0 ⟹ acute angle; a·b = 0 ⟹ <b>perpendicular (垂直)</b>; a·b &lt; 0 ⟹ obtuse angle;</li>
          <li>Geometric meaning: |a| times the <span class=”term”>projection <span class=”en”>(投影)</span></span> of b onto a;</li>
          <li>Physics: work W = <b>F</b>·<b>s</b> = |F||s|cos θ — that's a dot product!</li>
        </ul>
        <div class=”tip”><b>Try this:</b> ① Set the angle between the vectors to 90° and watch a·b hit 0 in the readout; ② Pull the angle to 180° (opposite directions) — does |a+b| become ||a|−|b||? ③ Same direction gives |a+b| = |a|+|b| — the two endpoints of the inequality ||a|−|b|| ≤ |a±b| ≤ |a|+|b|.</div>
        <div class=”think”><b>Think about it:</b> Why is the dot product a <em>number</em> rather than a vector? What kind of physical questions does it answer?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const plot = new Plot(cv, { xmin: -8, xmax: 8, ymin: -8, ymax: 8, equal: true });
    const sma = addSlider(panel, { label: L('|a| 模长', 'Magnitude |a|'), en: L('magnitude', '模长'), min: 0.5, max: 5, step: 0.1, value: 4 });
    const sta = addSlider(panel, { label: L('a 的方向角', 'Direction of a'), en: L('direction', '方向角'), min: 0, max: 360, step: 1, value: 20, unit: '°' });
    const smb = addSlider(panel, { label: L('|b| 模长', 'Magnitude |b|'), en: L('magnitude', '模长'), min: 0.5, max: 5, step: 0.1, value: 3 });
    const stb = addSlider(panel, { label: L('b 的方向角', 'Direction of b'), en: L('direction', '方向角'), min: 0, max: 360, step: 1, value: 95, unit: '°' });
    const readout = addReadout(panel);

    function draw() {
      const ax = sma.value * Math.cos(sta.value * DEG), ay = sma.value * Math.sin(sta.value * DEG);
      const bx = smb.value * Math.cos(stb.value * DEG), by = smb.value * Math.sin(stb.value * DEG);
      const sx = ax + bx, sy = ay + by;
      plot.clear('#fff');
      plot.grid(1);
      plot.axes({ tickX: 2 });
      // 平行四边形虚线
      plot.seg(ax, ay, sx, sy, { color: C.gray, width: 1.5, dash: [6, 5] });
      plot.seg(bx, by, sx, sy, { color: C.gray, width: 1.5, dash: [6, 5] });
      plot.arrow(0, 0, ax, ay, { color: C.blue, width: 3, label: 'a' });
      plot.arrow(0, 0, bx, by, { color: C.red, width: 3, label: 'b' });
      plot.arrow(0, 0, sx, sy, { color: C.green, width: 3.5, label: 'a + b' });
      const dot = ax * bx + ay * by;
      const cosT = dot / (sma.value * smb.value);
      const angle = Math.acos(Math.min(1, Math.max(-1, cosT))) / DEG;
      let rel = L('夹角为锐角 (acute)', 'acute angle 锐角');
      if (Math.abs(dot) < 0.08) rel = L('<b>垂直 perpendicular ⟂</b>', '<b>perpendicular ⟂ 垂直</b>');
      else if (dot < 0) rel = L('夹角为钝角 (obtuse)', 'obtuse angle 钝角');
      readout.set(L(`
        a = (<b>${fmtN(ax,2)}</b>, <b>${fmtN(ay,2)}</b>)　b = (<b>${fmtN(bx,2)}</b>, <b>${fmtN(by,2)}</b>)<br>
        a + b = (<b>${fmtN(sx,2)}</b>, <b>${fmtN(sy,2)}</b>)，|a+b| = <b>${fmtN(Math.hypot(sx,sy),3)}</b><br>
        夹角 θ = <b>${fmtN(angle,1)}°</b><br>
        数量积 a·b = |a||b|cosθ = <b>${fmtN(dot,3)}</b><br>
        <span class="tag">${rel}</span><br>
        检验：|a|+|b| = ${fmtN(sma.value + smb.value,2)} ≥ |a+b| ✓`, `
        a = (<b>${fmtN(ax,2)}</b>, <b>${fmtN(ay,2)}</b>)　b = (<b>${fmtN(bx,2)}</b>, <b>${fmtN(by,2)}</b>)<br>
        a + b = (<b>${fmtN(sx,2)}</b>, <b>${fmtN(sy,2)}</b>), |a+b| = <b>${fmtN(Math.hypot(sx,sy),3)}</b><br>
        Angle θ = <b>${fmtN(angle,1)}°</b><br>
        Dot product a·b = |a||b|cosθ = <b>${fmtN(dot,3)}</b><br>
        <span class="tag">${rel}</span><br>
        Check: |a|+|b| = ${fmtN(sma.value + smb.value,2)} ≥ |a+b| ✓`));
    }
    [sma, sta, smb, stb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
