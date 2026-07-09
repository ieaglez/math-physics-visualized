'use strict';
/* ===== 一元一次方程：天平模型 Linear Equations as a Balance（初中） ===== */
registerTopic({
  id: 'equation1', cat: 'math', icon: '🧮', stage: 'junior',
  title: '一元一次方程（天平）', en: 'Equations as a Balance',
  desc: L('方程就是一架天平：两边同时做同样的操作，天平永远平衡 —— 这就是解方程的全部秘密。',
          'An equation is a balance scale: do the same thing to both sides and it stays level — that is the whole secret of solving equations.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '一元一次方程（天平模型）', en: 'Linear Equations as a Balance',
      tagline: L('左盘放着 a 个未知数 x 和一些砝码，右盘放砝码。点按钮"两边同时"操作，看方程一步步变成 x = 答案。',
                 'The left pan holds a copies of x plus some weights; the right pan holds weights. Press the buttons to operate on both sides and watch the equation reduce to x = answer.'),
      formula: L('等式性质：两边同加/减同一个数，或同乘/除同一个非零数，等式仍成立',
                 'Properties of equality: add/subtract the same number, or multiply/divide by the same nonzero number, on both sides — equality survives'),
      explainHTML: L(`
        <h2>方程 = 平衡的天平 <span class="en">Equation = A Balanced Scale</span></h2>
        <p><span class="term">方程 <span class="en">(equation)</span></span>是"含未知数的等式"。把等号想成天平的横梁：
        左盘 ax + b，右盘 c，天平此刻是平的。<b>解方程 = 保持平衡地拆天平</b>，直到左盘只剩一个 x。</p>
        <h2>等式的两条性质 <span class="en">Two Properties of Equality</span></h2>
        <ul>
          <li><b>性质 1</b>：两边同时<b>加或减</b>同一个数，等式仍成立 —— 对应"移项要变号"的真正原因；</li>
          <li><b>性质 2</b>：两边同时<b>乘或除</b>同一个<b>非零</b>数，等式仍成立 —— 最后"系数化为 1"用的就是它。</li>
        </ul>
        <h2>标准解法四步 <span class="en">The Standard Recipe</span></h2>
        <div class="formula">ax + b = c　→（两边 −b）→　ax = c − b　→（两边 ÷a）→　x = <span class="frac"><span>c − b</span><span class="den">a</span></span></div>
        <p>课本里的"移项、合并同类项、系数化 1"，每一步都是对天平两边做同一件事 —— 只对一边做，天平立刻歪掉，等式就错了。</p>
        <div class="tip"><b>实验建议：</b>① 用滑块摆一个方程（比如 3x + 2 = 11），先心算答案；② 点「两边 − b」再点「两边 ÷ a」，看天平全程保持水平、方程变成 x = 3；③ 故意想象只给一边减 b 会发生什么 —— 天平会歪，这就是"忘记变号"错在哪。</div>
        <div class="think"><b>思考一下：</b>为什么性质 2 要求"非零"？两边同乘 0 会得到什么？（0 = 0 —— 对，但解丢了。）</div>
      `, `
        <h2>Equation = A Balanced Scale <span class="en">方程 = 平衡的天平</span></h2>
        <p>An <span class="term">equation <span class="en">(方程)</span></span> is "an equality containing an unknown". Read the equals sign as the beam of a balance:
        left pan ax + b, right pan c, currently level. <b>Solving = dismantling the scale while keeping it level</b>, until a single x remains on the left.</p>
        <h2>Two Properties of Equality <span class="en">等式的两条性质</span></h2>
        <ul>
          <li><b>Property 1</b>: <b>add or subtract</b> the same number on both sides — the real reason "moving a term flips its sign";</li>
          <li><b>Property 2</b>: <b>multiply or divide</b> both sides by the same <b>nonzero</b> number — the final "make the coefficient 1" step.</li>
        </ul>
        <h2>The Standard Recipe <span class="en">标准解法</span></h2>
        <div class="formula">ax + b = c　→ (both sides −b) →　ax = c − b　→ (both sides ÷a) →　x = <span class="frac"><span>c − b</span><span class="den">a</span></span></div>
        <p>The textbook moves — transpose, combine, normalize — are each "do the same thing to both pans". Touch only one pan and the scale tips: the equality breaks.</p>
        <div class="tip"><b>Try this:</b> ① Set up an equation (say 3x + 2 = 11) and solve it in your head first; ② Click "both −b" then "both ÷a": the scale stays level all the way to x = 3; ③ Imagine subtracting b from one side only — the scale tips: that's exactly the "forgot to flip the sign" mistake.</div>
        <div class="think"><b>Think about it:</b> Why must Property 2 exclude zero? What happens if you multiply both sides by 0? (You get 0 = 0 — true, but the solution is gone.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 420);
    const sa = addSlider(panel, { label: L('系数 a（x 的个数）', 'Coefficient a (copies of x)'), en: L('coefficient', '系数'), min: 1, max: 5, step: 1, value: 3 });
    const sb = addSlider(panel, { label: L('常数 b（左盘砝码）', 'Constant b (left weights)'), en: L('constant', '常数'), min: -8, max: 8, step: 1, value: 2 });
    const sc = addSlider(panel, { label: L('右边 c（右盘砝码）', 'Right side c'), en: L('right side', '右边'), min: -10, max: 20, step: 1, value: 11 });
    // 操作按钮
    let step = 0; // 0 原始, 1 已减 b, 2 已除 a
    const row = h('div', 'btn-row');
    const btn1 = h('button', 'btn', L('① 两边 − b', '① both − b'));
    const btn2 = h('button', 'btn', L('② 两边 ÷ a', '② both ÷ a'));
    const btn0 = h('button', 'btn', L('↺ 重置', '↺ Reset'));
    btn1.onclick = () => { if (step === 0) { step = 1; draw(); } };
    btn2.onclick = () => { if (step === 1) { step = 2; draw(); } };
    btn0.onclick = () => { step = 0; draw(); };
    row.append(btn1, btn2, btn0);
    panel.appendChild(row);
    const readout = addReadout(panel);

    function draw() {
      const a = sa.value, b = sb.value, c = sc.value;
      const x = (c - b) / a;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, beamY = H * 0.34, beamHalf = Math.min(W * 0.3, 230);
      // 支柱与横梁（始终平衡）
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.moveTo(cx, beamY); ctx.lineTo(cx - 20, H - 60); ctx.lineTo(cx + 20, H - 60); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - beamHalf, beamY); ctx.lineTo(cx + beamHalf, beamY); ctx.stroke();
      ctx.lineCap = 'butt';
      // 吊绳与托盘
      const panY = beamY + 66;
      [[-1, cx - beamHalf * 0.8], [1, cx + beamHalf * 0.8]].forEach(([, px]) => {
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(px, beamY); ctx.lineTo(px - 56, panY); ctx.moveTo(px, beamY); ctx.lineTo(px + 56, panY); ctx.stroke();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(px - 62, panY); ctx.lineTo(px + 62, panY); ctx.stroke();
      });
      const leftX = cx - beamHalf * 0.8, rightX = cx + beamHalf * 0.8;
      // 物品绘制：x 方块（蓝）与砝码（灰圆）
      const drawX = (px, py) => {
        ctx.fillStyle = '#5b5bf0';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(px - 13, py - 26, 26, 26, 5); else ctx.rect(px - 13, py - 26, 26, 26);
        ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('x', px, py - 8);
        ctx.textAlign = 'left';
      };
      const drawW = (px, py, n) => { // 数值砝码
        ctx.fillStyle = n >= 0 ? '#94a3b8' : '#fca5a5';
        ctx.beginPath(); ctx.arc(px, py - 12, 13, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(fmtN(n, 0), px, py - 8);
        ctx.textAlign = 'left';
      };
      // 当前状态的两盘内容
      const nx = step < 2 ? a : 1;
      const lConst = step === 0 ? b : 0;
      const rVal = step === 0 ? c : step === 1 ? c - b : x;
      // 左盘：nx 个 x + lConst 砝码
      for (let i = 0; i < nx; i++) drawX(leftX - (nx - 1) * 15 + i * 30, panY);
      if (lConst !== 0) drawW(leftX + nx * 16 + 16, panY, lConst);
      // 右盘：一个大砝码显示数值
      drawW(rightX, panY, rVal);
      // 当前方程文字
      ctx.fillStyle = '#16181f'; ctx.font = 'bold 20px "STIX Two Math", serif'; ctx.textAlign = 'center';
      const eqText = step === 0 ? `${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${c}` :
                     step === 1 ? `${a}x = ${fmtN(c - b, 0)}` : `x = ${fmtN(x, 2)}`;
      ctx.fillText(eqText, cx, H - 24);
      ctx.font = '12px sans-serif'; ctx.fillStyle = '#697086';
      ctx.fillText(step === 0 ? L('原方程（天平平衡）', 'the original equation (balanced)') :
                   step === 1 ? L('两边都减去了 b —— 依然平衡', 'subtracted b from both sides — still level') :
                   L('两边都除以了 a —— 解出来了！', 'divided both sides by a — solved!'), cx, H - 6);
      ctx.textAlign = 'left';
      readout.set(L(`
        方程：<b>${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${c}</b><br>
        第 1 步（−b）：${a}x = ${fmtN(c - b,0)} ${step >= 1 ? '✓' : ''}<br>
        第 2 步（÷a）：x = ${fmtN(c - b,0)}/${a} ${step >= 2 ? '✓' : ''}<br>
        解：x = <b>${fmtN(x,2)}</b><br>
        验算：${a}×${fmtN(x,2)} ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = <b>${fmtN(a*x+b,1)}</b> = 右边 ✓`, `
        Equation: <b>${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${c}</b><br>
        Step 1 (−b): ${a}x = ${fmtN(c - b,0)} ${step >= 1 ? '✓' : ''}<br>
        Step 2 (÷a): x = ${fmtN(c - b,0)}/${a} ${step >= 2 ? '✓' : ''}<br>
        Solution: x = <b>${fmtN(x,2)}</b><br>
        Check: ${a}×${fmtN(x,2)} ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = <b>${fmtN(a*x+b,1)}</b> = right side ✓`));
    }
    [sa, sb, sc].forEach(s => s.onChange(() => { step = 0; draw(); }));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
