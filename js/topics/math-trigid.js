'use strict';
/* ===== 三角恒等变换 Trigonometric Identities ===== */
registerTopic({
  id: 'trigid', cat: 'math', icon: '🎛️',
  title: '三角恒等变换', en: 'Trig Identities',
  desc: L('a·sin x + b·cos x 两个波相加，居然还是一个正弦波 —— 辅助角公式与和角公式的可视化证明。',
          'Add a·sin x and b·cos x and you still get one clean sine wave — the auxiliary-angle and sum formulas, visualized.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '三角恒等变换', en: 'Trigonometric Identities',
      tagline: L('模式一：合成 a·sinx + b·cosx，看两个虚线波叠成实线波。模式二：数值验证和角公式，误差恒为 0。',
                 'Mode 1: synthesize a·sinx + b·cosx and watch two dashed waves merge into one. Mode 2: verify the sum formulas numerically — the error is forever 0.'),
      formula: L('a·sin x + b·cos x = <span style="white-space:nowrap">√(a²+b²)</span>·sin(x + φ)　·　sin(α±β) = sinαcosβ ± cosαsinβ',
                 'a·sin x + b·cos x = <span style="white-space:nowrap">√(a²+b²)</span>·sin(x + φ)　·　sin(α±β) = sinαcosβ ± cosαsinβ'),
      explainHTML: L(`
        <h2>两角和差公式 <span class="en">Sum &amp; Difference Formulas</span></h2>
        <div class="formula">
          sin(α ± β) = sinα·cosβ ± cosα·sinβ<br>
          cos(α ± β) = cosα·cosβ ∓ sinα·sinβ
          tan(α ± β) = <span class="frac"><span>tanα ± tanβ</span><span class="den">1 ∓ tanα·tanβ</span></span>
        </div>
        <p>令 β = α 得<span class="term">倍角公式 <span class="en">(double-angle formulas)</span></span>：
        sin2α = 2sinαcosα，cos2α = cos²α − sin²α = 1 − 2sin²α = 2cos²α − 1。</p>
        <h2>辅助角公式：本章的"大招" <span class="en">The Auxiliary Angle Formula</span></h2>
        <div class="formula">a·sin x + b·cos x = √(a²+b²) · sin(x + φ)，其中 tanφ = <span class="frac"><span>b</span><span class="den">a</span></span>
          <span class="note">任何"正弦 + 余弦"的组合都能收拢成<b>一个</b>正弦波 —— 振幅 √(a²+b²)，只是相位移了 φ</span></div>
        <ul>
          <li><b>为什么成立</b>：把 a、b 看成点 (a, b)，则 a = Rcosφ、b = Rsinφ，代入正是 sin 的和角公式展开；</li>
          <li><b>它有多重要</b>：求 y = 3sinx + 4cosx 的最大值？答案立刻是 √(9+16) = 5；</li>
          <li>物理上这就是"同频波叠加仍是同频波"—— 交流电、简谐振动、声波干涉全靠它。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 模式一设 a = 3、b = 4：合成波振幅恰好 5（读数验证 √(a²+b²)）；② 调 a 或 b，注意合成波<b>永远是标准正弦形</b>，只是高矮和左右位置变；③ 切模式二，随意拖 α、β：sin(α+β) 与展开式的差值始终是 0.000000。</div>
        <div class="think"><b>思考一下：</b>cos2α 有三种写法，解题时怎么选？（看目标：想消 sin² 用 1−2sin²α，想消 cos² 用 2cos²α−1 —— 恒等变换的精髓是"定向变形"。）</div>
      `, `
        <h2>Sum &amp; Difference Formulas <span class="en">两角和差公式</span></h2>
        <div class="formula">
          sin(α ± β) = sinα·cosβ ± cosα·sinβ<br>
          cos(α ± β) = cosα·cosβ ∓ sinα·sinβ
          tan(α ± β) = <span class="frac"><span>tanα ± tanβ</span><span class="den">1 ∓ tanα·tanβ</span></span>
        </div>
        <p>Set β = α to get the <span class="term">double-angle formulas <span class="en">(倍角公式)</span></span>:
        sin2α = 2sinαcosα, cos2α = cos²α − sin²α = 1 − 2sin²α = 2cos²α − 1.</p>
        <h2>The Auxiliary Angle Formula: the Finishing Move <span class="en">辅助角公式</span></h2>
        <div class="formula">a·sin x + b·cos x = √(a²+b²) · sin(x + φ), where tanφ = <span class="frac"><span>b</span><span class="den">a</span></span>
          <span class="note">Any mix of sine and cosine collapses into <b>one</b> sine wave — amplitude √(a²+b²), phase shifted by φ</span></div>
        <ul>
          <li><b>Why it works</b>: read a, b as the point (a, b); then a = Rcosφ, b = Rsinφ — substitute and you're looking at the sine sum formula;</li>
          <li><b>Why it matters</b>: maximum of y = 3sinx + 4cosx? Instantly √(9+16) = 5;</li>
          <li>In physics this is "same-frequency waves add to a same-frequency wave" — AC circuits, harmonic motion and interference all lean on it.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① In mode 1 set a = 3, b = 4: the combined wave's amplitude is exactly 5 (check √(a²+b²) in the readout); ② Vary a or b — the sum is <b>always a perfect sine shape</b>, only taller/shorter and shifted; ③ Switch to mode 2 and drag α, β anywhere: sin(α+β) minus its expansion stays 0.000000.</div>
        <div class="think"><b>Think about it:</b> cos2α has three forms — how do you choose? (Aim at the target: to eliminate sin² use 1−2sin²α; to eliminate cos² use 2cos²α−1 — identity work is <em>directed</em> rewriting.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 450);
    const mode = addSeg(panel, {
      options: [
        { label: L('波形合成', 'Synthesis'), value: 'syn' },
        { label: L('和角验证', 'Sum check'), value: 'sum' }
      ],
      value: 'syn', onChange: () => { sync(); draw(); }
    });
    const sa = addSlider(panel, { label: 'a（sin x 系数）', en: L('coefficient', '系数'), min: -4, max: 4, step: 0.1, value: 3 });
    const sb = addSlider(panel, { label: 'b（cos x 系数）', en: L('coefficient', '系数'), min: -4, max: 4, step: 0.1, value: 4 });
    const sal = addSlider(panel, { label: '角 α', en: L('angle', '角'), min: 0, max: 180, step: 1, value: 35, unit: '°' });
    const sbe = addSlider(panel, { label: '角 β', en: L('angle', '角'), min: 0, max: 180, step: 1, value: 25, unit: '°' });
    const readout = addReadout(panel);
    function sync() {
      const syn = mode.value === 'syn';
      sa.input.parentElement.style.display = syn ? '' : 'none';
      sb.input.parentElement.style.display = syn ? '' : 'none';
      sal.input.parentElement.style.display = syn ? 'none' : '';
      sbe.input.parentElement.style.display = syn ? 'none' : '';
    }

    function draw() {
      const { ctx, W, H } = cv;
      if (mode.value === 'syn') {
        const a = sa.value, b = sb.value;
        const R = Math.hypot(a, b);
        const phi = Math.atan2(b, a);
        const plot = new Plot(cv, { xmin: -7, xmax: 7, ymin: -6.2, ymax: 6.2, padB: 18 });
        plot.clear('#fff');
        plot.grid(Math.PI / 2, 1);
        plot.axes({ tickX: 1e9, tickY: 2 });
        ctx.fillStyle = C.soft; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        [[-1, '−π'], [1, 'π'], [2, '2π']].forEach(([m, lb2]) => ctx.fillText(lb2, plot.X(m * Math.PI), plot.Y(0) + 16));
        ctx.textAlign = 'left';
        // 包络线 ±R
        plot.seg(-7, R, 7, R, { color: '#fbbf24', width: 1.3, dash: [6, 5] });
        plot.seg(-7, -R, 7, -R, { color: '#fbbf24', width: 1.3, dash: [6, 5] });
        plot.text(6.8, R, '+R', { color: '#b45309', dy: -6, align: 'right' });
        // 分量与合成
        plot.fn(x => a * Math.sin(x), { color: 'rgba(37,99,235,.45)', width: 1.8, dash: [6, 5] });
        plot.fn(x => b * Math.cos(x), { color: 'rgba(220,38,38,.45)', width: 1.8, dash: [6, 5] });
        plot.fn(x => a * Math.sin(x) + b * Math.cos(x), { color: C.purple, width: 3.2 });
        plot.text(-6.8, a > 0 ? 1.6 : -1.6, 'a·sin x', { color: 'rgba(37,99,235,.8)', font: 'bold 12px sans-serif' });
        plot.text(-6.8, b > 0 ? 3.6 : -3.6, 'b·cos x', { color: 'rgba(220,38,38,.8)', font: 'bold 12px sans-serif' });
        // 峰值点
        const xPk = Math.PI / 2 - phi;
        plot.dot(xPk, R, { color: C.purple, r: 5.5, label: L('峰值 = R', 'peak = R'), labelDy: -10 });
        readout.set(L(`
          ${fmtN(a,1)}·sin x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}·cos x<br>
          = <b style="color:${C.purple}">${fmtN(R,3)}</b>·sin(x ${phi >= 0 ? '+' : '−'} ${fmtN(Math.abs(phi),3)})<br>
          振幅 R = √(a²+b²) = √(${fmtN(a*a,1)}+${fmtN(b*b,1)}) = <b>${fmtN(R,3)}</b><br>
          相位 φ = arctan(b/a) = <b>${fmtN(phi / DEG,1)}°</b><br>
          最大值 = <b>${fmtN(R,3)}</b>，最小值 = <b>−${fmtN(R,3)}</b>
          ${Math.abs(a - 3) < 0.05 && Math.abs(b - 4) < 0.05 ? '<span class="tag">3-4-5！最大值恰为 5</span>' : ''}`, `
          ${fmtN(a,1)}·sin x ${b >= 0 ? '+' : '−'} ${fmtN(Math.abs(b),1)}·cos x<br>
          = <b style="color:${C.purple}">${fmtN(R,3)}</b>·sin(x ${phi >= 0 ? '+' : '−'} ${fmtN(Math.abs(phi),3)})<br>
          Amplitude R = √(a²+b²) = √(${fmtN(a*a,1)}+${fmtN(b*b,1)}) = <b>${fmtN(R,3)}</b><br>
          Phase φ = arctan(b/a) = <b>${fmtN(phi / DEG,1)}°</b><br>
          Maximum = <b>${fmtN(R,3)}</b>, minimum = <b>−${fmtN(R,3)}</b>
          ${Math.abs(a - 3) < 0.05 && Math.abs(b - 4) < 0.05 ? '<span class="tag">3-4-5! The max is exactly 5</span>' : ''}`));
      } else {
        // 和角验证：单位圆上叠加 α、β
        const al = sal.value * DEG, be = sbe.value * DEG;
        const plot = new Plot(cv, { xmin: -1.9, xmax: 1.9, ymin: -1.5, ymax: 1.5, equal: true });
        plot.clear('#fff');
        plot.axes({ tickX: 1, labels: false });
        ctx.save();
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(plot.X(0), plot.Y(0), Math.abs(plot.X(1) - plot.X(0)), 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
        // α 弧、β 弧（叠加）、α+β 终边
        const arc = (r0, a1, a2, col, w2) => {
          ctx.strokeStyle = col; ctx.lineWidth = w2;
          ctx.beginPath();
          ctx.arc(plot.X(0), plot.Y(0), r0, -a2, -a1);
          ctx.stroke();
        };
        const Rpx = Math.abs(plot.X(1) - plot.X(0));
        arc(Rpx * 0.3, 0, al, C.blue, 3);
        arc(Rpx * 0.42, al, al + be, C.red, 3);
        plot.seg(0, 0, Math.cos(al), Math.sin(al), { color: 'rgba(37,99,235,.5)', width: 1.6, dash: [5, 4] });
        plot.arrow(0, 0, Math.cos(al + be), Math.sin(al + be), { color: C.purple, width: 3, label: 'α+β' });
        plot.dot(Math.cos(al + be), Math.sin(al + be), { color: C.purple, r: 6 });
        plot.text(0.42 * Math.cos(al / 2), 0.42 * Math.sin(al / 2), 'α', { color: C.blue, font: 'bold 14px sans-serif' });
        plot.text(0.56 * Math.cos(al + be / 2), 0.56 * Math.sin(al + be / 2), 'β', { color: C.red, font: 'bold 14px sans-serif' });
        const lhsS = Math.sin(al + be), rhsS = Math.sin(al) * Math.cos(be) + Math.cos(al) * Math.sin(be);
        const lhsC = Math.cos(al + be), rhsC = Math.cos(al) * Math.cos(be) - Math.sin(al) * Math.sin(be);
        readout.set(L(`
          α = ${fmtN(sal.value,0)}°，β = ${fmtN(sbe.value,0)}°，α+β = <b>${fmtN(sal.value + sbe.value,0)}°</b><br>
          sin(α+β) = <b>${fmtN(lhsS,6)}</b><br>
          sinαcosβ + cosαsinβ = <b>${fmtN(rhsS,6)}</b>　差 = ${fmtN(Math.abs(lhsS - rhsS),6)} ✓<br>
          cos(α+β) = <b>${fmtN(lhsC,6)}</b><br>
          cosαcosβ − sinαsinβ = <b>${fmtN(rhsC,6)}</b> ✓<br>
          ${Math.abs(sal.value - sbe.value) < 0.5 ? `<span class="tag">α = β：sin2α = 2sinαcosα = ${fmtN(2*Math.sin(al)*Math.cos(al),4)}</span>` : L('把 α、β 调相等看倍角公式', 'Make α = β to see the double angle')}`, `
          α = ${fmtN(sal.value,0)}°, β = ${fmtN(sbe.value,0)}°, α+β = <b>${fmtN(sal.value + sbe.value,0)}°</b><br>
          sin(α+β) = <b>${fmtN(lhsS,6)}</b><br>
          sinαcosβ + cosαsinβ = <b>${fmtN(rhsS,6)}</b>　gap = ${fmtN(Math.abs(lhsS - rhsS),6)} ✓<br>
          cos(α+β) = <b>${fmtN(lhsC,6)}</b><br>
          cosαcosβ − sinαsinβ = <b>${fmtN(rhsC,6)}</b> ✓<br>
          ${Math.abs(sal.value - sbe.value) < 0.5 ? `<span class="tag">α = β: sin2α = 2sinαcosα = ${fmtN(2*Math.sin(al)*Math.cos(al),4)}</span>` : 'Make α = β to see the double angle'}`));
      }
    }
    [sa, sb, sal, sbe].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    sync();
    draw();
    return () => cv.destroy();
  }
});
