'use strict';
/* ===== 欧姆定律与电路 Ohm's Law & Circuits ===== */
registerTopic({
  id: 'circuit', cat: 'optics', icon: '🔋',
  title: '欧姆定律与电路', en: "Ohm's Law & Circuits",
  desc: '切换串联/并联，调节电压与电阻，观察电流、分压分流和小灯泡的亮度变化。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '欧姆定律与电路', en: "Ohm's Law & Series/Parallel Circuits",
      tagline: '灯泡的亮度代表功率。试试串联和并联哪种接法灯更亮？',
      formula: 'I = <span class="frac"><span>U</span><span class="den">R</span></span>　·　串联 R = R₁+R₂　·　并联 <span class="frac"><span>1</span><span class="den">R</span></span> = <span class="frac"><span>1</span><span class="den">R₁</span></span> + <span class="frac"><span>1</span><span class="den">R₂</span></span>',
      explainHTML: `
        <h2>欧姆定律 <span class="en">Ohm's Law</span></h2>
        <div class="formula">I = <span class="frac"><span>U</span><span class="den">R</span></span>
          <span class="note">通过导体的电流与电压成正比、与电阻 (resistance) 成反比</span></div>
        <p>电压 U 像"水压"，电阻 R 像"管道的粗细"，电流 I 就是"水流量"。功率 P = UI = I²R = U²/R。</p>
        <h2>串联电路 <span class="en">Series Circuit</span></h2>
        <ul>
          <li>电流处处相等：I₁ = I₂ = I；</li>
          <li>总电压等于各部分之和：U = U₁ + U₂（<b>分压</b>：电阻大的分得多）；</li>
          <li>总电阻 R = R₁ + R₂ —— 串得越多电阻越大。</li>
        </ul>
        <h2>并联电路 <span class="en">Parallel Circuit</span></h2>
        <ul>
          <li>各支路电压相等：U₁ = U₂ = U；</li>
          <li>干路电流等于支路之和：I = I₁ + I₂（<b>分流</b>：电阻小的分得多）；</li>
          <li>总电阻 1/R = 1/R₁ + 1/R₂ —— 并联总电阻<b>比最小的支路电阻还小</b>（相当于管道加宽）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 同样的 U 和 R₁R₂，切换串/并联，比较总电流和灯泡亮度 —— 家里电器为什么都并联？② 串联时把 R₂ 调到最大，看 R₁ 上的电压被"抢走"多少（分压原理，电位器就是这么工作的）；③ 并联时断开一条支路（把它的电阻调到最大），另一条支路受影响吗？</div>
        <div class="think"><b>思考一下：</b>节日彩灯一坏全灭，是串联还是并联？保险丝为什么必须串联在电路里？</div>
      `
    });

    const cv = createCanvas(canvasBox, 420);
    const mode = addSeg(panel, {
      options: [
        { label: '串联 Series', value: 's' },
        { label: '并联 Parallel', value: 'p' }
      ],
      value: 's', onChange: () => draw()
    });
    const sU = addSlider(panel, { label: '电源电压 U', en: 'voltage', min: 1, max: 24, step: 0.5, value: 12, unit: 'V' });
    const sR1 = addSlider(panel, { label: '电阻 R₁（灯 1）', en: 'resistance', min: 1, max: 30, step: 0.5, value: 6, unit: 'Ω' });
    const sR2 = addSlider(panel, { label: '电阻 R₂（灯 2）', en: 'resistance', min: 1, max: 30, step: 0.5, value: 12, unit: 'Ω' });
    const readout = addReadout(panel);

    // 灯泡绘制：亮度由功率决定
    function bulb(ctx, x, y, P, label) {
      const glow = Math.min(1, P / 18);
      if (glow > 0.04) {
        const g = ctx.createRadialGradient(x, y, 2, x, y, 26 + glow * 22);
        g.addColorStop(0, `rgba(253,224,71,${0.85 * glow + 0.1})`);
        g.addColorStop(1, 'rgba(253,224,71,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 26 + glow * 22, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = glow > 0.04 ? `rgba(254,240,138,${0.35 + 0.65 * glow})` : '#f3f4f6';
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 9, y - 9); ctx.lineTo(x + 9, y + 9);
      ctx.moveTo(x - 9, y + 9); ctx.lineTo(x + 9, y - 9); ctx.stroke();
      ctx.fillStyle = '#475569'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(label, x, y + 32);
      ctx.textAlign = 'left';
    }
    // 电池符号
    function battery(ctx, x, y, U) {
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x - 4, y); ctx.stroke();
      ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(x - 4, y - 16); ctx.lineTo(x - 4, y + 16); ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x + 4, y - 7); ctx.lineTo(x + 4, y + 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 4, y); ctx.lineTo(x + 14, y); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('＋  ' + fmtN(U, 1) + ' V  −', x, y + 34);
      ctx.textAlign = 'left';
    }
    // 电流箭头沿导线
    function flow(ctx, x1, y1, x2, y2, I) {
      if (I < 0.02) return;
      pxArrow(ctx, (x1 + x2) / 2 - (x2 - x1) * 0.1, (y1 + y2) / 2 - (y2 - y1) * 0.1,
        (x1 + x2) / 2 + (x2 - x1) * 0.1, (y1 + y2) / 2 + (y2 - y1) * 0.1,
        { color: C.green, width: Math.min(4, 1.5 + I * 0.8) });
    }

    function draw() {
      const U = sU.value, R1 = sR1.value, R2 = sR2.value;
      const series = mode.value === 's';
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const L = Math.max(60, W * 0.18), Rr = W - L, T = 70, B = H - 80;
      const midX = (L + Rr) / 2;
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
      let Rtot, I, I1, I2, U1, U2;
      if (series) {
        Rtot = R1 + R2; I = U / Rtot; I1 = I2 = I; U1 = I * R1; U2 = I * R2;
        // 回路：左下电池，上边两个灯
        ctx.strokeRect(L, T, Rr - L, B - T);
        ctx.clearRect(midX - 80, T - 20, 50, 40);   // 灯1 缺口
        ctx.clearRect(midX + 30, T - 20, 50, 40);   // 灯2 缺口
        ctx.clearRect(midX - 16, B - 18, 32, 36);   // 电池缺口
        // 重画导线（带缺口）
        ctx.beginPath();
        ctx.moveTo(L, T); ctx.lineTo(midX - 80, T);
        ctx.moveTo(midX - 30, T); ctx.lineTo(midX + 30, T);
        ctx.moveTo(midX + 80, T); ctx.lineTo(Rr, T);
        ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(midX - 16, B);
        ctx.moveTo(midX + 16, B); ctx.lineTo(Rr, B); ctx.lineTo(Rr, T);
        ctx.stroke();
        bulb(ctx, midX - 55, T, I * I * R1, `R₁=${fmtN(R1,1)}Ω  U₁=${fmtN(U1,1)}V`);
        bulb(ctx, midX + 55, T, I * I * R2, `R₂=${fmtN(R2,1)}Ω  U₂=${fmtN(U2,1)}V`);
        battery(ctx, midX, B, U);
        flow(ctx, L, B * 0.6 + T * 0.4, L, T, I);          // 左边向上
        flow(ctx, Rr, T, Rr, B * 0.6 + T * 0.4, I);        // 右边向下
        ctx.fillStyle = C.green; ctx.font = 'bold 12px sans-serif';
        ctx.fillText('I = ' + fmtN(I, 2) + ' A（处处相等）', L + 8, (T + B) / 2);
      } else {
        Rtot = R1 * R2 / (R1 + R2); I1 = U / R1; I2 = U / R2; I = I1 + I2; U1 = U2 = U;
        const midY = (T + B) / 2;
        ctx.beginPath();
        // 外框
        ctx.moveTo(L, T); ctx.lineTo(Rr, T); ctx.lineTo(Rr, B);
        ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(midX - 16, B);
        ctx.moveTo(midX + 16, B); ctx.lineTo(Rr, B);
        // 中间支路（R2）
        ctx.moveTo(L, midY); ctx.lineTo(midX - 80, midY);
        ctx.moveTo(midX - 30, midY); ctx.lineTo(Rr, midY);
        ctx.stroke();
        // 上支路灯 R1 缺口重画
        ctx.clearRect(midX - 80, T - 20, 50, 40);
        ctx.beginPath();
        ctx.moveTo(L, T); ctx.lineTo(midX - 80, T);
        ctx.moveTo(midX - 30, T); ctx.lineTo(Rr, T);
        ctx.stroke();
        bulb(ctx, midX - 55, T, I1 * I1 * R1, `R₁=${fmtN(R1,1)}Ω  I₁=${fmtN(I1,2)}A`);
        bulb(ctx, midX - 55, midY, I2 * I2 * R2, `R₂=${fmtN(R2,1)}Ω  I₂=${fmtN(I2,2)}A`);
        battery(ctx, midX, B, U);
        flow(ctx, L, B, L, midY, I);
        flow(ctx, L, midY - 6, L, T, I1);
        flow(ctx, Rr, T, Rr, midY, I1);
        flow(ctx, Rr, midY + 6, Rr, B, I);
        ctx.fillStyle = C.green; ctx.font = 'bold 12px sans-serif';
        ctx.fillText('干路 I = ' + fmtN(I, 2) + ' A', L + 8, B - 10);
      }
      const P = U * I;
      readout.set(`
        总电阻 R = <b>${fmtN(Rtot,2)} Ω</b>${series ? '（R₁+R₂）' : '（小于任一支路！）'}<br>
        ${series
          ? `电流 I = U/R = <b>${fmtN(I,2)} A</b>（处处相等）<br>分压：U₁ = <b>${fmtN(U1,2)} V</b>，U₂ = <b>${fmtN(U2,2)} V</b>（U₁+U₂=U ✓）`
          : `支路：I₁ = <b>${fmtN(I1,2)} A</b>，I₂ = <b>${fmtN(I2,2)} A</b><br>干路 I = I₁+I₂ = <b>${fmtN(I,2)} A</b>（分流 ✓）`}<br>
        灯 1 功率 P₁ = <b>${fmtN(series ? I*I*R1 : I1*I1*R1,2)} W</b>，灯 2 功率 P₂ = <b>${fmtN(series ? I*I*R2 : I2*I2*R2,2)} W</b><br>
        总功率 P = UI = <b>${fmtN(P,2)} W</b>`);
    }
    [sU, sR1, sR2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
