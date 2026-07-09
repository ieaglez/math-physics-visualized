'use strict';
/* ===== 功、功率与机械效率 Work, Power & Efficiency（初中） ===== */
registerTopic({
  id: 'workjr', cat: 'mech', icon: '🏗️', stage: 'junior',
  title: '功·功率·机械效率', en: 'Work, Power & Efficiency',
  desc: L('用滑轮组提货物：算有用功、总功和机械效率 —— 看清"额外功"偷偷花在了哪里。',
          'Hoist a crate with a pulley: compute useful work, total work and efficiency — and catch where the "wasted work" sneaks off to.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '功、功率与机械效率', en: 'Work, Power & Mechanical Efficiency',
      tagline: L('调动滑轮自重和摩擦，看效率如何跌破 100% —— 图中的"能量条"告诉你每一焦耳的去向。',
                 'Add pulley weight and friction and watch efficiency dip below 100% — the energy bar shows where every joule goes.'),
      formula: L('W = F·s　·　P = <span class="frac"><span>W</span><span class="den">t</span></span>　·　η = <span class="frac"><span>W有用</span><span class="den">W总</span></span> × 100%',
                 'W = F·s　·　P = <span class="frac"><span>W</span><span class="den">t</span></span>　·　η = <span class="frac"><span>W_useful</span><span class="den">W_total</span></span> × 100%'),
      explainHTML: L(`
        <h2>功 <span class="en">Work</span></h2>
        <div class="formula">W = F·s
          <span class="note">力 × 沿力方向移动的距离。单位：焦耳 J。两个"不做功"：有力没距离（推墙）、有距离没力（惯性滑行）</span></div>
        <h2>功率 <span class="en">Power</span></h2>
        <div class="formula">P = <span class="frac"><span>W</span><span class="den">t</span></span> = F·v
          <span class="note">做功的快慢。单位：瓦特 W = J/s。爬同样的楼，跑上去功相同、功率更大</span></div>
        <h2>机械效率 <span class="en">Mechanical Efficiency</span></h2>
        <div class="formula">η = <span class="frac"><span>W<sub>有用</sub></span><span class="den">W<sub>总</sub></span></span> × 100%
          <span class="note">有用功：直接达成目的的功（把货物提高 G·h）；额外功：花在滑轮自重、摩擦上的"冤枉功"</span></div>
        <ul>
          <li>W总 = W有用 + W额外，所以 η 永远 <b>&lt; 100%</b>；</li>
          <li>提高效率的办法：减轻动滑轮、加润滑减摩擦、增大负载（让"冤枉功"占比变小）；</li>
          <li>典型值：滑轮组 60%~80%，斜面 ~70%，杠杆可达 90% 以上。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把"滑轮自重"和"摩擦"都调到 0：η = 100%（理想机械）；② 逐渐加大滑轮自重，能量条里橙色的"额外功"变宽、效率下滑；③ 保持机械不变、把货物 G 调大：η 反而升高 —— 想想为什么"重载更划算"。</div>
        <div class="think"><b>思考一下：</b>"功率大"等于"效率高"吗？（不等 —— 挖掘机功率大但效率未必高；效率说的是"花的功里有多少是有用的"。）</div>
      `, `
        <h2>Work <span class="en">功</span></h2>
        <div class="formula">W = F·s
          <span class="note">force × distance moved along the force. Unit: joule J. Two "no work" traps: force without distance (pushing a wall), distance without force (coasting)</span></div>
        <h2>Power <span class="en">功率</span></h2>
        <div class="formula">P = <span class="frac"><span>W</span><span class="den">t</span></span> = F·v
          <span class="note">how fast work is done. Unit: watt W = J/s. Running upstairs does the same work as walking — at greater power</span></div>
        <h2>Mechanical Efficiency <span class="en">机械效率</span></h2>
        <div class="formula">η = <span class="frac"><span>W<sub>useful</sub></span><span class="den">W<sub>total</sub></span></span> × 100%
          <span class="note">useful work: what achieves the goal (raising the load, G·h); wasted work: spent on pulley weight and friction</span></div>
        <ul>
          <li>W_total = W_useful + W_wasted, so η is always <b>&lt; 100%</b>;</li>
          <li>To raise efficiency: lighter pulleys, lubrication, and heavier loads (shrinking the wasted share);</li>
          <li>Typical values: pulley systems 60–80%, inclined planes ~70%, levers can top 90%.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Zero out "pulley weight" and "friction": η = 100% (an ideal machine); ② Grow the pulley weight and watch the orange "wasted" band widen as η slides; ③ Keep the machine fixed and raise the load G: η actually climbs — why does heavy lifting pay better?</div>
        <div class="think"><b>Think about it:</b> Does "high power" mean "high efficiency"? (No — an excavator is powerful but not necessarily efficient; efficiency asks what fraction of the spent work was useful.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 430);
    const sG = addSlider(panel, { label: L('货物重 G', 'Load G'), en: L('load', '货物'), min: 100, max: 800, step: 20, value: 400, unit: 'N' });
    const sGp = addSlider(panel, { label: L('动滑轮自重 G轮', 'Pulley weight'), en: L('pulley weight', '轮重'), min: 0, max: 100, step: 5, value: 40, unit: 'N' });
    const sf = addSlider(panel, { label: L('摩擦折算 f', 'Friction (equivalent)'), en: L('friction', '摩擦'), min: 0, max: 60, step: 5, value: 20, unit: 'N' });
    const sh2 = addSlider(panel, { label: L('提升高度 h', 'Lift height h'), en: L('height', '高度'), min: 0.5, max: 4, step: 0.25, value: 2, unit: 'm' });
    const st = addSlider(panel, { label: L('用时 t', 'Time t'), en: L('time', '用时'), min: 2, max: 20, step: 1, value: 8, unit: 's' });
    const readout = addReadout(panel);
    const n = 2; // 两段绳的动滑轮组

    function draw() {
      const G = sG.value, Gp = sGp.value, f = sf.value, hh = sh2.value, t = st.value;
      const F = (G + Gp + f) / n;           // 绳端拉力
      const s = n * hh;
      const Wtotal = F * s;
      const Wuse = G * hh;
      const Wextra = Wtotal - Wuse;
      const eta = Wuse / Wtotal * 100;
      const P = Wtotal / t;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // 能量条（横向堆叠）
      const bx = 60, bw = W - 120, by = H * 0.34, bh = 44;
      ctx.fillStyle = '#f1f2fa';
      ctx.fillRect(bx, by, bw, bh);
      const useW = bw * (Wuse / Wtotal);
      ctx.fillStyle = 'rgba(34,197,94,.75)';
      ctx.fillRect(bx, by, useW, bh);
      ctx.fillStyle = 'rgba(251,146,60,.8)';
      ctx.fillRect(bx + useW, by, bw - useW, bh);
      ctx.strokeStyle = '#697086'; ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by, bw, bh);
      ctx.font = 'bold 12.5px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = '#14532d';
      ctx.fillText(L('有用功 ', 'useful ') + fmtN(Wuse, 0) + ' J', bx + useW / 2, by + bh / 2 + 4);
      if (Wextra > Wtotal * 0.06) {
        ctx.fillStyle = '#7c2d12';
        ctx.fillText(L('额外功 ', 'wasted ') + fmtN(Wextra, 0) + ' J', bx + useW + (bw - useW) / 2, by + bh / 2 + 4);
      }
      ctx.fillStyle = '#454c63';
      ctx.fillText(L(`总功 W总 = F·s = ${fmtN(F,0)} N × ${fmtN(s,1)} m = ${fmtN(Wtotal,0)} J`,
                     `total W = F·s = ${fmtN(F,0)} N × ${fmtN(s,1)} m = ${fmtN(Wtotal,0)} J`), bx + bw / 2, by - 14);
      // 效率大字
      ctx.font = 'bold 40px sans-serif';
      ctx.fillStyle = eta > 85 ? '#059669' : eta > 65 ? '#d97706' : '#dc2626';
      ctx.fillText('η = ' + fmtN(eta, 1) + '%', W / 2, by + bh + 66);
      ctx.font = '12px sans-serif'; ctx.fillStyle = '#697086';
      ctx.fillText(L('（绿色占比就是效率）', '(the green share IS the efficiency)'), W / 2, by + bh + 90);
      ctx.textAlign = 'left';
      readout.set(L(`
        拉力 F = (G+G轮+f)/n = <b>${fmtN(F,0)} N</b>（n = ${n} 段）<br>
        有用功 W有用 = G·h = <b>${fmtN(Wuse,0)} J</b><br>
        总功 W总 = F·s = <b>${fmtN(Wtotal,0)} J</b>（s = ${fmtN(s,1)} m）<br>
        机械效率 η = <b>${fmtN(eta,1)}%</b>
        ${Gp === 0 && f === 0 ? '<span class="tag">理想机械：η = 100%</span>' : ''}<br>
        功率 P = W总/t = <b>${fmtN(P,0)} W</b>`, `
        Pull F = (G+G_p+f)/n = <b>${fmtN(F,0)} N</b> (n = ${n} strands)<br>
        Useful work = G·h = <b>${fmtN(Wuse,0)} J</b><br>
        Total work = F·s = <b>${fmtN(Wtotal,0)} J</b> (s = ${fmtN(s,1)} m)<br>
        Efficiency η = <b>${fmtN(eta,1)}%</b>
        ${Gp === 0 && f === 0 ? '<span class="tag">ideal machine: η = 100%</span>' : ''}<br>
        Power P = W/t = <b>${fmtN(P,0)} W</b>`));
    }
    [sG, sGp, sf, sh2, st].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
