'use strict';
/* ===== 理想气体 Ideal Gas ===== */
registerTopic({
  id: 'gas', cat: 'modern', icon: '🎈',
  title: '理想气体定律', en: 'Ideal Gas Law',
  desc: '推动活塞压缩气体、升高温度，观察分子运动加剧与压强变化，验证 pV = nRT。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '理想气体定律', en: 'Ideal Gas Law',
      tagline: '左边是气缸里乱撞的分子（温度越高撞得越快），右边是 p–V 图上的等温线。',
      formula: 'pV = nRT　·　<span class="frac"><span>p₁V₁</span><span class="den">T₁</span></span> = <span class="frac"><span>p₂V₂</span><span class="den">T₂</span></span>（一定质量气体）',
      explainHTML: `
        <h2>气体的三个状态量 <span class="en">State Variables</span></h2>
        <ul>
          <li><b>压强 p <span class="en">(pressure)</span></b>：大量分子撞击器壁的宏观表现；</li>
          <li><b>体积 V <span class="en">(volume)</span></b>：分子活动的空间；</li>
          <li><b>温度 T <span class="en">(temperature)</span></b>：分子平均动能的标志 —— 必须用开尔文 (Kelvin)：T = t℃ + 273。</li>
        </ul>
        <h2>三个实验定律 <span class="en">Three Gas Laws</span></h2>
        <ul>
          <li><span class="term">玻意耳定律 <span class="en">(Boyle's law)</span></span>：T 不变，pV = 常数 —— 压缩一半，压强翻倍（p–V 图上是双曲线，即<b>等温线 isotherm</b>）；</li>
          <li><span class="term">查理定律 <span class="en">(Charles's law)</span></span>：V 不变，p/T = 常数 —— 密闭罐加热会爆的原因；</li>
          <li><span class="term">盖-吕萨克定律 <span class="en">(Gay-Lussac's law)</span></span>：p 不变，V/T = 常数 —— 热气球升空的原理。</li>
        </ul>
        <div class="formula">合并成一个：<span class="frac"><span>pV</span><span class="den">T</span></span> = 常数，即 pV = nRT
          <span class="note">R = 8.31 J/(mol·K)（普适气体常量），n 为物质的量</span></div>
        <h2>微观解释 <span class="en">Microscopic View</span></h2>
        <ul>
          <li>压缩体积 → 分子撞壁更频繁 → p 增大；</li>
          <li>升高温度 → 分子更快、撞得更猛 → p 增大；</li>
          <li>理想气体 = 忽略分子间作用力和分子自身体积的模型，常温常压下的真实气体很接近它。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定 T，把 V 压缩到一半，看 p 是否精确翻倍（玻意耳）；② 固定 V，把 T 从 300 K 升到 600 K，p 也翻倍（查理）；③ 观察右图：改变 V 时状态点沿蓝色等温线滑动，改变 T 时则跳到另一条等温线上。读数里 pV/T 永远不变。</div>
        <div class="think"><b>思考一下：</b>夏天自行车胎为什么容易爆？高原上为什么袋装零食会鼓起来？分别对应哪条定律？</div>
      `
    });

    const cv = createCanvas(canvasBox, 460);
    const sV = addSlider(panel, { label: '体积 V（推动活塞）', en: 'volume', min: 1, max: 4, step: 0.05, value: 2, unit: 'L' });
    const sT = addSlider(panel, { label: '温度 T', en: 'temperature', min: 150, max: 600, step: 5, value: 300, unit: 'K' });
    const readout = addReadout(panel);
    const n = 0.08, Rgas = 8.31;
    const pOf = (V, T) => n * Rgas * T / (V / 1000) / 1000; // kPa
    // 分子
    const parts = Array.from({ length: 42 }, (_, i) => ({
      x: (i * 0.618) % 1, y: (i * 0.382) % 1,
      dx: Math.cos(i * 2.4), dy: Math.sin(i * 2.4)
    }));
    const anim = makeAnimator(dt => {
      const sp = 0.22 * Math.sqrt(sT.value / 300);
      parts.forEach(p => {
        p.x += p.dx * sp * dt; p.y += p.dy * sp * dt;
        if (p.x < 0) { p.x = 0; p.dx *= -1; } if (p.x > 1) { p.x = 1; p.dx *= -1; }
        if (p.y < 0) { p.y = 0; p.dy *= -1; } if (p.y > 1) { p.y = 1; p.dy *= -1; }
      });
      draw();
    });
    addPlayControls(panel, anim, {});
    anim.start();

    function draw() {
      const V = sV.value, T = sT.value, p = pOf(V, T);
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 左：气缸（竖直，活塞在上）——
      const cylX = 46, cylW = Math.min(W * 0.3, 190), cylB = H - 42, cylMaxH = H - 120;
      const gasH = cylMaxH * (V / 4);
      const gasTop = cylB - gasH;
      // 缸壁
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cylX, cylB - cylMaxH - 26); ctx.lineTo(cylX, cylB); ctx.lineTo(cylX + cylW, cylB); ctx.lineTo(cylX + cylW, cylB - cylMaxH - 26);
      ctx.stroke();
      // 气体区域
      ctx.fillStyle = `rgba(91,91,240,${0.05 + (300 / T) * 0.03})`;
      ctx.fillRect(cylX + 2, gasTop, cylW - 4, gasH);
      // 分子（颜色随温度：蓝→红）
      const heat = Math.min(1, (T - 150) / 450);
      ctx.fillStyle = `rgb(${Math.round(80 + heat * 160)},${Math.round(100 - heat * 40)},${Math.round(230 - heat * 160)})`;
      parts.forEach(pt => {
        ctx.beginPath();
        ctx.arc(cylX + 6 + pt.x * (cylW - 12), gasTop + 6 + pt.y * (gasH - 12), 4, 0, Math.PI * 2);
        ctx.fill();
      });
      // 活塞
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cylX + 2, gasTop - 16, cylW - 4, 16);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cylX + cylW / 2 - 5, gasTop - 60, 10, 46);
      pxArrow(ctx, cylX + cylW / 2 + 30, gasTop - 40, cylX + cylW / 2 + 30, gasTop - 8, { color: C.orange, width: 2.4, label: '活塞', labelDx: 6, labelDy: 12 });
      ctx.fillStyle = '#475569'; ctx.font = 'bold 12.5px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(`V = ${fmtN(V,2)} L`, cylX + cylW / 2, cylB + 20);
      ctx.fillText(`T = ${fmtN(T,0)} K（${fmtN(T-273,0)}℃）`, cylX + cylW / 2, cylB + 36);
      ctx.textAlign = 'left';
      // —— 右：p-V 图 ——
      const gL = cylX + cylW + 56, gR = W - 20, gT = 36, gB = H - 46;
      const pMax = pOf(1, 600) * 1.08;
      const GX = v => gL + (v - 0.6) / 3.8 * (gR - gL);
      const GY = pp => gB - pp / pMax * (gB - gT);
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gL, gT); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('V/L', gR - 22, gB + 15);
      ctx.fillText('p/kPa', gL + 4, gT - 6);
      [1, 2, 3, 4].forEach(v => { ctx.fillText(v, GX(v) - 3, gB + 15); });
      // 等温线族
      [200, 300, 450, 600].forEach(TT => {
        ctx.strokeStyle = Math.abs(TT - T) < 3 ? C.blue : '#e3e5f2';
        ctx.lineWidth = Math.abs(TT - T) < 3 ? 2.4 : 1.4;
        ctx.beginPath();
        let pen = false;
        for (let v = 0.7; v <= 4.2; v += 0.05) {
          const pp = pOf(v, TT);
          if (pp > pMax) { pen = false; continue; }
          const X = GX(v), Y = GY(pp);
          pen ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); pen = true;
        }
        ctx.stroke();
        const vl = 4.05, pl = pOf(vl, TT);
        if (pl < pMax) { ctx.fillStyle = '#9aa1b5'; ctx.fillText(TT + 'K', GX(vl), GY(pl) - 4); }
      });
      // 当前等温线（若不在族中）
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2.2;
      ctx.beginPath();
      let pen = false;
      for (let v = 0.7; v <= 4.2; v += 0.05) {
        const pp = pOf(v, T);
        if (pp > pMax) { pen = false; continue; }
        pen ? ctx.lineTo(GX(v), GY(pp)) : ctx.moveTo(GX(v), GY(pp)); pen = true;
      }
      ctx.stroke();
      // 状态点
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(GX(V), GY(p), 6.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11.5px sans-serif';
      ctx.fillText('等温线 pV = 常数（双曲线）', gL + 12, gB - 8);

      readout.set(`
        压强 p = nRT/V = <b>${fmtN(p,1)} kPa</b>
        ${Math.abs(p - 101) < 4 ? '<span class="tag">≈1 个标准大气压</span>' : ''}<br>
        pV = <b>${fmtN(p * V,1)}</b> kPa·L<br>
        pV/T = <b style="color:${C.purple}">${fmtN(p * V / T,4)}</b> kPa·L/K（恒定 ✓）<br>
        分子平均动能 ∝ T：${fmtN(T,0)} K 时约为 300 K 的 <b>${fmtN(T/300,2)}</b> 倍<br>
        （n = 0.08 mol，R = 8.31 J/(mol·K)）`);
    }
    [sV, sT].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
