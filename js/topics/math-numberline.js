'use strict';
/* ===== 有理数与数轴 Rational Numbers & the Number Line（初中） ===== */
registerTopic({
  id: 'numberline', cat: 'math', icon: '🌡️', stage: 'junior',
  title: '有理数与数轴', en: 'The Number Line',
  desc: L('拖动两个点，直观理解负数、相反数、绝对值和"谁大谁小"。',
          'Drag two points to feel negatives, opposites, absolute value, and which number is bigger.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '有理数与数轴', en: 'Rational Numbers & the Number Line',
      tagline: L('数轴是数学第一件"可视化工具"：每个数都是一个位置，绝对值就是到原点的距离。',
                 'The number line is math\'s first visualization tool: every number is a location, and absolute value is simply its distance from zero.'),
      formula: L('|a| = 数 a 到原点的距离　·　相反数：a 与 −a 关于原点对称　·　右边的数总比左边大',
                 '|a| = the distance from a to 0　·　opposites a and −a mirror about 0　·　right is always greater than left'),
      explainHTML: L(`
        <h2>数轴三要素 <span class="en">The Number Line</span></h2>
        <p><span class="term">数轴 <span class="en">(number line)</span></span>由<b>原点、正方向、单位长度</b>组成。
        它把"数"变成"位置"：正数在原点右边，<span class="term">负数 <span class="en">(negative numbers)</span></span>在左边 —— 温度零下、海拔负值、欠账，都是负数的原型。</p>
        <h2>三个核心概念 <span class="en">Three Key Ideas</span></h2>
        <ul>
          <li><span class="term">相反数 <span class="en">(opposite)</span></span>：a 和 −a 关于原点<b>对称</b>，相加得 0；</li>
          <li><span class="term">绝对值 <span class="en">(absolute value)</span></span>：|a| 是 a 到原点的<b>距离</b>，所以永远 ≥ 0。|−5| = |5| = 5；</li>
          <li><b>比大小</b>：数轴上<b>右边的数一定大于左边的数</b> —— 所以 −1 &gt; −100（负数绝对值越大反而越小）。</li>
        </ul>
        <h2>两点间的距离 <span class="en">Distance Between Points</span></h2>
        <div class="formula">A、B 两点的距离 = |a − b|
          <span class="note">高中"数轴上的距离"、坐标系距离公式，都从这里生长出来</span></div>
        <div class="tip"><b>实验建议：</b>① 把 A 拖到 −3：注意 |−3| = 3，它和 +3 关于原点对称；② 让 A = −1、B = −100，看读数确认 −1 更大；③ 拖动两点验证距离 |a − b| —— 交换两点位置距离不变。</div>
        <div class="think"><b>思考一下：</b>为什么"减去一个数等于加上它的相反数"（a − b = a + (−b)）？在数轴上表示"向左走 b 步"试试。</div>
      `, `
        <h2>The Number Line <span class="en">数轴三要素</span></h2>
        <p>A <span class="term">number line <span class="en">(数轴)</span></span> needs an <b>origin, a positive direction, and a unit length</b>.
        It turns numbers into locations: positives to the right, <span class="term">negatives <span class="en">(负数)</span></span> to the left — think temperatures below zero, depths below sea level, debts.</p>
        <h2>Three Key Ideas <span class="en">三个核心概念</span></h2>
        <ul>
          <li><span class="term">Opposites <span class="en">(相反数)</span></span>: a and −a are <b>mirror images</b> about 0, and they sum to 0;</li>
          <li><span class="term">Absolute value <span class="en">(绝对值)</span></span>: |a| is a's <b>distance</b> from 0 — hence never negative. |−5| = |5| = 5;</li>
          <li><b>Comparing</b>: on the line, <b>right always beats left</b> — so −1 &gt; −100 (for negatives, a bigger absolute value means a smaller number).</li>
        </ul>
        <h2>Distance Between Points <span class="en">两点间的距离</span></h2>
        <div class="formula">distance between A and B = |a − b|
          <span class="note">High-school "distance on an axis" and the coordinate distance formula both grow from this</span></div>
        <div class="tip"><b>Try this:</b> ① Drag A to −3: note |−3| = 3 and its mirror symmetry with +3; ② Set A = −1, B = −100 and confirm in the readout that −1 is larger; ③ Verify the distance |a − b| — swapping the points changes nothing.</div>
        <div class="think"><b>Think about it:</b> Why does subtracting a number equal adding its opposite (a − b = a + (−b))? Act out "walk b steps to the left" on the line.</div>
      `)
    });

    const cv = createCanvas(canvasBox, 340);
    const sa = addSlider(panel, { label: L('点 A 的位置', 'Point A'), en: L('point', '位置'), min: -10, max: 10, step: 0.5, value: -3 });
    const sb = addSlider(panel, { label: L('点 B 的位置', 'Point B'), en: L('point', '位置'), min: -10, max: 10, step: 0.5, value: 5 });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const pad = 46, midY = H * 0.52;
      const X = v => pad + (v + 10) / 20 * (W - 2 * pad);
      // 轴
      pxArrow(ctx, pad - 16, midY, W - pad + 22, midY, { color: '#475569', width: 2.4 });
      ctx.fillStyle = '#697086'; ctx.font = '11.5px sans-serif'; ctx.textAlign = 'center';
      for (let v = -10; v <= 10; v += 1) {
        ctx.strokeStyle = v === 0 ? '#16181f' : '#b8bdd4';
        ctx.lineWidth = v === 0 ? 2.4 : v % 5 === 0 ? 1.8 : 1;
        const tick = v === 0 ? 13 : v % 5 === 0 ? 10 : 6;
        ctx.beginPath(); ctx.moveTo(X(v), midY - tick); ctx.lineTo(X(v), midY + tick); ctx.stroke();
        if (v % 5 === 0) ctx.fillText(v === 0 ? '0' : v, X(v), midY + 28);
      }
      ctx.fillStyle = '#16181f'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText(L('原点', 'origin'), X(0), midY - 20);
      // |a| 距离弧（原点到 A）
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(X(0), midY - 44); ctx.lineTo(X(a), midY - 44); ctx.stroke();
      [X(0), X(a)].forEach(x => { ctx.beginPath(); ctx.moveTo(x, midY - 49); ctx.lineTo(x, midY - 39); ctx.stroke(); });
      ctx.fillStyle = C.purple;
      ctx.fillText('|a| = ' + fmtN(Math.abs(a), 1), (X(0) + X(a)) / 2, midY - 52);
      // A-B 距离
      ctx.strokeStyle = C.green; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(X(a), midY + 46); ctx.lineTo(X(b), midY + 46); ctx.stroke();
      [X(a), X(b)].forEach(x => { ctx.beginPath(); ctx.moveTo(x, midY + 41); ctx.lineTo(x, midY + 51); ctx.stroke(); });
      ctx.fillStyle = C.green;
      ctx.fillText(L('距离 |a−b| = ', 'distance |a−b| = ') + fmtN(Math.abs(a - b), 1), (X(a) + X(b)) / 2, midY + 66);
      // 相反数（−a 的浅色影子）
      ctx.fillStyle = 'rgba(124,58,237,.35)';
      ctx.beginPath(); ctx.arc(X(-a), midY, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(124,58,237,.8)'; ctx.font = '11.5px sans-serif';
      ctx.fillText('−a', X(-a), midY - 14);
      // 两个点
      ctx.textAlign = 'left';
      const dot = (v, col, lb) => {
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(X(v), midY, 9, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lb + ' = ' + fmtN(v, 1), X(v), midY - (lb === 'A' ? 24 : -38) + (lb === 'A' ? 0 : -14));
        ctx.textAlign = 'left';
      };
      dot(a, C.blue, 'A');
      dot(b, C.red, 'B');
      const cmp = a > b ? '>' : a < b ? '<' : '=';
      readout.set(L(`
        A = <b>${fmtN(a,1)}</b>（${a > 0 ? '正数' : a < 0 ? '负数' : '零'}），B = <b>${fmtN(b,1)}</b><br>
        绝对值：|A| = <b>${fmtN(Math.abs(a),1)}</b>，|B| = <b>${fmtN(Math.abs(b),1)}</b><br>
        A 的相反数 = <b>${fmtN(-a,1)}</b>（图中淡紫点，关于原点对称）<br>
        比大小：A ${cmp} B <span class="tag">${a >= b ? 'A 在右边' : 'B 在右边'}，右边的大</span><br>
        距离 |A − B| = <b>${fmtN(Math.abs(a-b),1)}</b>`, `
        A = <b>${fmtN(a,1)}</b> (${a > 0 ? 'positive' : a < 0 ? 'negative' : 'zero'}), B = <b>${fmtN(b,1)}</b><br>
        Absolute values: |A| = <b>${fmtN(Math.abs(a),1)}</b>, |B| = <b>${fmtN(Math.abs(b),1)}</b><br>
        Opposite of A = <b>${fmtN(-a,1)}</b> (the pale purple dot, mirrored about 0)<br>
        Comparison: A ${cmp} B <span class="tag">${a >= b ? 'A is to the right' : 'B is to the right'} — right wins</span><br>
        Distance |A − B| = <b>${fmtN(Math.abs(a-b),1)}</b>`));
    }
    [sa, sb].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
