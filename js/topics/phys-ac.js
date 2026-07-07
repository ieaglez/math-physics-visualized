'use strict';
/* ===== 交流电与变压器 AC & Transformer ===== */
registerTopic({
  id: 'ac', cat: 'optics', icon: '🔌',
  title: '交流电与变压器', en: 'AC & Transformer',
  desc: '观察正弦交流电波形，调节变压器匝数比，看电压如何被升高或降低。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '交流电与变压器', en: 'Alternating Current & Transformer',
      tagline: '上方是输入/输出电压波形，下方是变压器。匝数比决定升压还是降压。',
      formula: 'u = U₀sin(2πft)　·　有效值 U = <span class="frac"><span>U₀</span><span class="den">√2</span></span>　·　<span class="frac"><span>U₁</span><span class="den">U₂</span></span> = <span class="frac"><span>n₁</span><span class="den">n₂</span></span>',
      explainHTML: `
        <h2>什么是交流电 <span class="en">What is AC</span></h2>
        <p>大小和方向随时间做周期性变化的电流叫<span class="term">交流电 <span class="en">(alternating current, AC)</span></span>。
        发电机线圈在磁场中匀速转动，产生正弦式电动势：</p>
        <div class="formula">u = U₀·sin(2πft)
          <span class="note">U₀ 是峰值 (peak value)；我国市电 f = 50 Hz，即每秒方向变化 100 次</span></div>
        <h2>有效值 <span class="en">RMS Value</span></h2>
        <div class="formula">U<sub>有效</sub> = <span class="frac"><span>U₀</span><span class="den">√2</span></span> ≈ 0.707·U₀
          <span class="note">按热效应折算：交流的做功本领相当于多大的直流。"220 V" 是有效值，峰值其实是 311 V！</span></div>
        <h2>变压器 <span class="en">Transformer</span></h2>
        <p>利用<b>电磁感应</b>（互感）改变交流电压 —— 这正是交流电战胜直流电的关键（"电流之战"）：</p>
        <div class="formula"><span class="frac"><span>U₁</span><span class="den">U₂</span></span> = <span class="frac"><span>n₁</span><span class="den">n₂</span></span>
          <span class="note">理想变压器：电压比 = 匝数比；功率不变 U₁I₁ = U₂I₂，所以升压则电流变小</span></div>
        <ul>
          <li>n₂ &gt; n₁：<b>升压变压器</b> —— 远距离输电用高压（几十万伏），因为损耗 P损 = I²R，电流越小损耗越小；</li>
          <li>n₂ &lt; n₁：<b>降压变压器</b> —— 到用户端降回 220 V；手机充电器再降到 5~20 V；</li>
          <li>变压器只对交流有效 —— 恒定直流磁通量不变化，没有感应电动势。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 设 U₀ = 311 V，读数里的有效值是不是恰好 220 V？② 把匝数比调成 10:1 和 1:10，对比输出波形的高矮；③ 输出波形和输入始终同频率 —— 变压器改变电压，不改变频率。</div>
        <div class="think"><b>思考一下：</b>如果用变压器给 5 V 的直流电"升压"，输出会是多少？为什么远距离输电宁可用 50 万伏特高压？</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const sU0 = addSlider(panel, { label: '输入峰值 U₀', en: 'peak voltage', min: 50, max: 400, step: 1, value: 311, unit: 'V' });
    const sf = addSlider(panel, { label: '频率 f', en: 'frequency', min: 10, max: 100, step: 5, value: 50, unit: 'Hz' });
    const sn1 = addSlider(panel, { label: '原线圈匝数 n₁', en: 'primary turns', min: 100, max: 1000, step: 50, value: 500 });
    const sn2 = addSlider(panel, { label: '副线圈匝数 n₂', en: 'secondary turns', min: 100, max: 1000, step: 50, value: 250 });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, { onReset: () => draw() });
    anim.start();

    function draw() {
      const U0 = sU0.value, f = sf.value, n1 = sn1.value, n2 = sn2.value;
      const U2peak = U0 * n2 / n1;
      const tv = anim.t * 0.4; // 视觉时间（放慢）
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 上：波形 ——
      const gL = 52, gR = W - 18, gT = 22, gB = H * 0.52;
      const mid = (gT + gB) / 2;
      const Vmax = Math.max(U0, U2peak) * 1.15;
      const GY = u => mid - u / Vmax * (gB - gT) / 2;
      const cycles = 2.5;
      const GX = t => gL + t / (cycles / f) * (gR - gL);
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gL, mid); ctx.lineTo(gR, mid); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gT); ctx.lineTo(gL, gB); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('u/V', gL + 4, gT + 4);
      ctx.fillText('t', gR - 10, mid - 6);
      // 波形（相位随动画推进）
      const drawWave = (peak, color, width) => {
        ctx.strokeStyle = color; ctx.lineWidth = width;
        ctx.beginPath();
        for (let px = gL; px <= gR; px += 2) {
          const t = (px - gL) / (gR - gL) * (cycles / f);
          const u = peak * Math.sin(2 * Math.PI * f * (t + tv));
          px === gL ? ctx.moveTo(px, GY(u)) : ctx.lineTo(px, GY(u));
        }
        ctx.stroke();
      };
      drawWave(U0, C.blue, 2.6);
      drawWave(U2peak, C.orange, 2.6);
      // 有效值虚线
      ctx.strokeStyle = 'rgba(37,99,235,.4)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(gL, GY(U0 / Math.SQRT2)); ctx.lineTo(gR, GY(U0 / Math.SQRT2)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.blue; ctx.font = 'bold 12px sans-serif';
      ctx.fillText('输入 u₁（峰值 ' + fmtN(U0, 0) + ' V）', gL + 10, gT + 18);
      ctx.fillStyle = C.orange;
      ctx.fillText('输出 u₂（峰值 ' + fmtN(U2peak, 0) + ' V）', gL + 220, gT + 18);
      ctx.fillStyle = 'rgba(37,99,235,.7)'; ctx.font = '11px sans-serif';
      ctx.fillText('U₁有效 = U₀/√2', gR - 108, GY(U0 / Math.SQRT2) - 5);
      // —— 下：变压器示意 ——
      const tx = W / 2, ty = (gB + H) / 2 + 8;
      const coreW = 104, coreH = 108;
      ctx.strokeStyle = '#697086'; ctx.lineWidth = 9;
      ctx.strokeRect(tx - coreW / 2, ty - coreH / 2, coreW, coreH);
      // 线圈（左右两侧半圆圈）
      const coil = (side, nTurns, color) => {
        const x = tx + side * coreW / 2;
        const loops = Math.max(3, Math.round(nTurns / 150));
        const h = 76, step = h / loops;
        ctx.strokeStyle = color; ctx.lineWidth = 3;
        for (let i = 0; i < loops; i++) {
          ctx.beginPath();
          ctx.arc(x, ty - h / 2 + step * (i + 0.5), step * 0.62, Math.PI / 2, -Math.PI / 2, side < 0);
          ctx.stroke();
        }
      };
      coil(-1, n1, C.blue);
      coil(1, n2, C.orange);
      ctx.font = 'bold 12.5px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = C.blue; ctx.fillText(`原线圈 n₁ = ${n1}`, tx - coreW / 2 - 66, ty + coreH / 2 + 20);
      ctx.fillStyle = C.orange; ctx.fillText(`副线圈 n₂ = ${n2}`, tx + coreW / 2 + 66, ty + coreH / 2 + 20);
      ctx.fillStyle = '#697086'; ctx.font = '11.5px sans-serif';
      ctx.fillText('铁芯（磁通量的通道）', tx, ty + coreH / 2 + 20);
      ctx.textAlign = 'left';
      const ratio = n2 / n1;
      readout.set(`
        输入有效值 U₁ = U₀/√2 = <b>${fmtN(U0 / Math.SQRT2,1)} V</b>
        ${Math.abs(U0 - 311) < 2 ? '<span class="tag">≈220V 市电！</span>' : ''}<br>
        匝数比 n₁ : n₂ = ${n1} : ${n2} = <b>${fmtN(n1/n2,2)} : 1</b><br>
        输出有效值 U₂ = U₁·n₂/n₁ = <b>${fmtN(U0 / Math.SQRT2 * ratio,1)} V</b><br>
        输出峰值 = <b>${fmtN(U2peak,1)} V</b>，频率不变 = <b>${fmtN(sf.value,0)} Hz</b><br>
        <span class="tag">${ratio > 1.02 ? '升压变压器 step-up' : ratio < 0.98 ? '降压变压器 step-down' : '1:1 隔离变压器'}</span>`);
    }
    [sU0, sf, sn1, sn2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
