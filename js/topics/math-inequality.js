'use strict';
/* ===== 不等式与解集 Inequalities on the Number Line（初中） ===== */
registerTopic({
  id: 'inequality', cat: 'math', icon: '🚦', stage: 'junior',
  title: '不等式与解集', en: 'Inequalities',
  desc: L('解不等式 ax + b < c，在数轴上看解集 —— 并亲眼见证"乘除负数要变号"。',
          'Solve ax + b < c and see the solution set on a number line — witnessing why multiplying by a negative flips the sign.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '不等式与解集', en: 'Inequalities & Solution Sets',
      tagline: L('把 a 调成负数，注意不等号方向"啪"地翻转 —— 这是不等式最容易错的地方。',
                 'Slide a below zero and watch the inequality sign snap the other way — the single most common mistake, made visible.'),
      formula: L('两边同乘/除<b>负数</b>，不等号方向要改变　·　解集是数轴上的一段（空心圈不含端点）',
                 'Multiplying/dividing both sides by a <b>negative</b> flips the sign　·　the solution set is a ray on the number line (open circle = endpoint excluded)'),
      explainHTML: L(`
        <h2>不等式的性质 <span class="en">Properties of Inequalities</span></h2>
        <ul>
          <li><b>性质 1</b>：两边同加/减同一个数，不等号方向<b>不变</b>；</li>
          <li><b>性质 2</b>：两边同乘/除同一个<b>正数</b>，方向<b>不变</b>；</li>
          <li><b>性质 3</b>：两边同乘/除同一个<b>负数</b>，方向<b>改变</b>！—— 因为乘负数会把数轴"整个翻转"（3 &lt; 5，但 −3 &gt; −5）。</li>
        </ul>
        <h2>解集与数轴表示 <span class="en">Solution Sets on the Number Line</span></h2>
        <div class="formula">ax + b &lt; c　→　x ${'&lt;'} <span class="frac"><span>c − b</span><span class="den">a</span></span>（a &gt; 0）　或　x &gt; <span class="frac"><span>c − b</span><span class="den">a</span></span>（a &lt; 0）</div>
        <ul>
          <li>不等式的解不是一个数，而是<b>一段数</b> —— 数轴上的一条射线；</li>
          <li><b>空心圈</b>：不含端点（&lt; 或 &gt;）；<b>实心点</b>：含端点（≤ 或 ≥）；</li>
          <li>方向口诀：解出 x &lt; 边界 → 向左画；x &gt; 边界 → 向右画。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 摆一个 2x + 1 &lt; 7，看解集 x &lt; 3 的红色射线朝左；② 保持 b、c 不变，把 a 从 2 慢慢拖到 −2：跨过 0 的瞬间，不等号翻转、射线掉头；③ 切换 ≤ 模式，端点从空心变实心。</div>
        <div class="think"><b>思考一下：</b>"至少 60 分及格""限速 40 以内""身高不超过 1.2 米免票"—— 各对应哪种不等号？端点算不算在内？</div>
      `, `
        <h2>Properties of Inequalities <span class="en">不等式的性质</span></h2>
        <ul>
          <li><b>Property 1</b>: adding/subtracting the same number on both sides keeps the direction;</li>
          <li><b>Property 2</b>: multiplying/dividing by the same <b>positive</b> number keeps the direction;</li>
          <li><b>Property 3</b>: multiplying/dividing by a <b>negative</b> number <b>flips</b> it! Multiplying by a negative mirrors the whole number line (3 &lt; 5, yet −3 &gt; −5).</li>
        </ul>
        <h2>Solution Sets on the Number Line <span class="en">解集与数轴表示</span></h2>
        <div class="formula">ax + b &lt; c　→　x &lt; <span class="frac"><span>c − b</span><span class="den">a</span></span> (a &gt; 0)　or　x &gt; <span class="frac"><span>c − b</span><span class="den">a</span></span> (a &lt; 0)</div>
        <ul>
          <li>The solution isn't one number but a <b>range</b> — a ray on the number line;</li>
          <li><b>Open circle</b>: endpoint excluded (&lt; or &gt;); <b>filled dot</b>: endpoint included (≤ or ≥);</li>
          <li>Direction rule: x &lt; boundary → shade left; x &gt; boundary → shade right.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Set up 2x + 1 &lt; 7 and see the ray for x &lt; 3 point left; ② Keep b, c fixed and drag a from 2 to −2: the instant it crosses 0, the sign flips and the ray swings around; ③ Switch to ≤ mode — the endpoint fills in.</div>
        <div class="think"><b>Think about it:</b> "Pass with at least 60", "speed limit under 40", "free ticket if height doesn't exceed 1.2 m" — which inequality sign fits each, and is the endpoint included?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 360);
    const mode = addSeg(panel, {
      options: [
        { label: '<', value: 'lt' },
        { label: '≤', value: 'le' }
      ],
      value: 'lt', onChange: () => draw()
    });
    const sa = addSlider(panel, { label: L('系数 a', 'Coefficient a'), en: L('coefficient', '系数'), min: -3, max: 3, step: 0.5, value: 2 });
    const sb = addSlider(panel, { label: L('常数 b', 'Constant b'), en: L('constant', '常数'), min: -6, max: 6, step: 0.5, value: 1 });
    const sc = addSlider(panel, { label: L('右边 c', 'Right side c'), en: L('right side', '右边'), min: -8, max: 8, step: 0.5, value: 7 });
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value, c = sc.value;
      const inc = mode.value === 'le';
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const pad = 46, midY = H * 0.56;
      const X = v => pad + (v + 10) / 20 * (W - 2 * pad);
      // 数轴
      pxArrow(ctx, pad - 16, midY, W - pad + 22, midY, { color: '#475569', width: 2.4 });
      ctx.fillStyle = '#697086'; ctx.font = '11.5px sans-serif'; ctx.textAlign = 'center';
      for (let v = -10; v <= 10; v += 1) {
        ctx.strokeStyle = v === 0 ? '#16181f' : '#b8bdd4';
        ctx.lineWidth = v === 0 ? 2.2 : v % 5 === 0 ? 1.8 : 1;
        ctx.beginPath(); ctx.moveTo(X(v), midY - (v % 5 === 0 ? 10 : 6)); ctx.lineTo(X(v), midY + (v % 5 === 0 ? 10 : 6)); ctx.stroke();
        if (v % 5 === 0) ctx.fillText(v, X(v), midY + 26);
      }
      ctx.textAlign = 'left';
      // 标题：原不等式
      const sym = inc ? '≤' : '<';
      ctx.fillStyle = '#16181f'; ctx.font = 'bold 21px "STIX Two Math", serif'; ctx.textAlign = 'center';
      ctx.fillText(`${fmtN(a,1)}x ${b >= 0 ? '+ ' + fmtN(b,1) : '− ' + fmtN(Math.abs(b),1)} ${sym} ${fmtN(c,1)}`, W / 2, 44);
      ctx.textAlign = 'left';
      if (Math.abs(a) < 0.01) {
        const truth = inc ? b <= c : b < c;
        readout.set(L(`<span class="warn">a = 0：不等式退化为 ${fmtN(b,1)} ${sym} ${fmtN(c,1)}，${truth ? '恒成立（解集为全体实数）' : '恒不成立（无解）'}。</span>`,
                      `<span class="warn">a = 0: the inequality degenerates to ${fmtN(b,1)} ${sym} ${fmtN(c,1)} — ${truth ? 'always true (all real numbers)' : 'never true (no solution)'}.</span>`));
        return;
      }
      const bound = (c - b) / a;
      const flip = a < 0;                       // 除以负数 → 变号
      const solSym = flip ? (inc ? '≥' : '>') : sym;
      const goRight = flip;                     // x > bound 时射线向右
      // 解集射线
      const bx = Math.max(-10, Math.min(10, bound));
      ctx.strokeStyle = C.red; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(X(bx), midY - 34);
      ctx.lineTo(goRight ? W - pad + 10 : pad - 10, midY - 34);
      ctx.stroke();
      ctx.lineCap = 'butt';
      pxArrow(ctx, goRight ? W - pad - 30 : pad + 30, midY - 34, goRight ? W - pad + 14 : pad - 14, midY - 34, { color: C.red, width: 5 });
      // 端点：空心/实心
      ctx.beginPath(); ctx.arc(X(bx), midY - 34, 8, 0, Math.PI * 2);
      if (inc) { ctx.fillStyle = C.red; ctx.fill(); }
      else { ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 3; ctx.stroke(); }
      ctx.fillStyle = C.red; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(fmtN(bound, 2), X(bx), midY - 50);
      ctx.textAlign = 'left';
      readout.set(L(`
        两边 − b：${fmtN(a,1)}x ${sym} ${fmtN(c - b,1)}<br>
        两边 ÷ a${flip ? '（<b>a 为负，变号！</b>）' : '（a 为正，不变号）'}<br>
        解集：<b style="color:${C.red}">x ${solSym} ${fmtN(bound,2)}</b><br>
        数轴：${inc ? '实心点（含端点）' : '空心圈（不含端点）'}，射线向${goRight ? '右' : '左'}<br>
        ${flip ? '<span class="tag">性质 3：乘除负数，方向翻转</span>' : '<span class="tag">试试把 a 拖成负数！</span>'}`, `
        Both sides − b: ${fmtN(a,1)}x ${sym} ${fmtN(c - b,1)}<br>
        Both sides ÷ a${flip ? ' (<b>a is negative — flip the sign!</b>)' : ' (a positive — direction kept)'}<br>
        Solution set: <b style="color:${C.red}">x ${solSym} ${fmtN(bound,2)}</b><br>
        Number line: ${inc ? 'filled dot (endpoint included)' : 'open circle (endpoint excluded)'}, ray points ${goRight ? 'right' : 'left'}<br>
        ${flip ? '<span class="tag">Property 3: negative multiplier flips the sign</span>' : '<span class="tag">Now drag a below zero!</span>'}`));
    }
    [sa, sb, sc].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
