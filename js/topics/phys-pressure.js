'use strict';
/* ===== 压强 Pressure（初中） ===== */
registerTopic({
  id: 'pressure', cat: 'mech', icon: '🧊', stage: 'junior',
  title: '压强 p = F/S', en: 'Pressure',
  desc: L('同样的力，接触面越小压强越大 —— 再潜入水中，感受深度每加一米压强怎么涨。',
          'Same force, smaller area, bigger pressure — then dive underwater and feel how each extra meter of depth adds pressure.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '压强：固体与液体', en: 'Pressure: Solids & Liquids',
      tagline: L('左边：改变受力面积看压强（为什么图钉尖那么细）。右边：潜水员下潜，液体压强随深度线性增大。',
                 'Left: change the contact area (why a thumbtack is sharp). Right: a diver descends and liquid pressure climbs linearly with depth.'),
      formula: L('p = <span class="frac"><span>F</span><span class="den">S</span></span>（帕斯卡 Pa = N/m²）　·　液体：p = ρgh',
                 'p = <span class="frac"><span>F</span><span class="den">S</span></span> (pascal Pa = N/m²)　·　liquids: p = ρgh'),
      explainHTML: L(`
        <h2>固体压强 <span class="en">Pressure from Solids</span></h2>
        <div class="formula">p = <span class="frac"><span>F</span><span class="den">S</span></span>
          <span class="note">压力的"作用效果"取决于单位面积上的力。单位：帕斯卡，1 Pa = 1 N/m²</span></div>
        <ul>
          <li><b>增大压强</b>：减小受力面积 —— 图钉尖、刀刃、注射器针头；</li>
          <li><b>减小压强</b>：增大受力面积 —— 书包宽背带、坦克履带、滑雪板、铁轨枕木；</li>
          <li>人站立对地压强约 1.5×10⁴ Pa；一张 A4 纸平放对桌面只有约 0.06 Pa。</li>
        </ul>
        <h2>液体压强 <span class="en">Liquid Pressure</span></h2>
        <div class="formula">p = ρgh
          <span class="note">只与液体密度和深度有关，与容器形状、液体总量无关！</span></div>
        <ul>
          <li>同一深度<b>各个方向</b>压强相等 —— 液体会从任何方向的孔喷出；</li>
          <li>深度每增加 1 m，水中压强增加约 9800 Pa（约 0.1 个大气压）；</li>
          <li>这就是大坝<b>上窄下宽</b>、深海鱼上浮会"爆体"、潜水有深度限制的原因；</li>
          <li><span class="term">连通器 <span class="en">(communicating vessels)</span></span>：静止时各容器液面等高 —— 茶壶、船闸、下水道存水弯。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 固定压力 F，把面积从 0.5 m² 缩到 0.01 m²：压强暴涨 50 倍 —— 这就是"磨刀不误砍柴工"；② 把潜水员拖到 10 m 深：水压 ≈ 1 个大气压，相当于全身再扛一层大气；③ 换成水银（密度 13.6 倍），同样深度压强大 13.6 倍。</div>
        <div class="think"><b>思考一下：</b>三个形状不同、底面积相同的容器装同样深的水，底部受到的压强一样吗？压力呢？（提示：p = ρgh 只看深度 —— 这是著名的"帕斯卡桶裂"实验。）</div>
      `, `
        <h2>Pressure from Solids <span class="en">固体压强</span></h2>
        <div class="formula">p = <span class="frac"><span>F</span><span class="den">S</span></span>
          <span class="note">What matters is force per unit area. Unit: the pascal, 1 Pa = 1 N/m²</span></div>
        <ul>
          <li><b>To increase pressure</b>: shrink the area — tack points, knife edges, needles;</li>
          <li><b>To decrease pressure</b>: enlarge the area — wide backpack straps, tank treads, skis, railway sleepers;</li>
          <li>A standing person exerts ≈ 1.5×10⁴ Pa; a flat sheet of A4 paper only ≈ 0.06 Pa.</li>
        </ul>
        <h2>Liquid Pressure <span class="en">液体压强</span></h2>
        <div class="formula">p = ρgh
          <span class="note">Depends only on the liquid's density and the depth — not on the container's shape or the amount of liquid!</span></div>
        <ul>
          <li>At one depth the pressure is equal <b>in every direction</b> — water jets out of holes facing any way;</li>
          <li>Each extra meter of water adds ≈ 9800 Pa (about 0.1 atmosphere);</li>
          <li>Hence dams built <b>thick at the bottom</b>, deep-sea fish "exploding" when surfaced, and diving depth limits;</li>
          <li><span class="term">Communicating vessels <span class="en">(连通器)</span></span>: at rest all connected surfaces level out — teapots, canal locks, U-bends under sinks.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Fix F and shrink the area from 0.5 m² to 0.01 m²: pressure jumps 50× — why sharpening the axe saves the day; ② Drag the diver to 10 m: water pressure ≈ 1 atmosphere — like carrying a second sky; ③ Switch to mercury (13.6× denser): same depth, 13.6× the pressure.</div>
        <div class="think"><b>Think about it:</b> Three differently-shaped containers with equal base areas hold water to the same depth. Is the pressure on each base the same? And the force? (Hint: p = ρgh cares only about depth — Pascal's famous barrel-bursting experiment.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 450);
    const sF = addSlider(panel, { label: L('压力 F', 'Force F'), en: L('force', '压力'), min: 50, max: 600, step: 10, value: 300, unit: 'N' });
    const sS = addSlider(panel, { label: L('受力面积 S', 'Contact area S'), en: L('area', '面积'), min: 0.01, max: 0.5, step: 0.01, value: 0.2, unit: 'm²' });
    const sh2 = addSlider(panel, { label: L('潜水深度 h', 'Diving depth h'), en: L('depth', '深度'), min: 0, max: 20, step: 0.5, value: 6, unit: 'm' });
    const readout = addReadout(panel);
    const g = 9.8, rho = 1000;

    function draw() {
      const F = sF.value, S = sS.value, hDep = sh2.value;
      const p1 = F / S, p2 = rho * g * hDep;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const half = W * 0.46;
      // —— 左：固体压强（方块压海绵）——
      const gx = half / 2, groundY = H - 90;
      // 海绵（被压出凹陷，深度 ∝ p）
      const dent = Math.min(34, p1 / 900);
      const blockW = 30 + S * 220;
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.moveTo(30, groundY);
      ctx.lineTo(gx - blockW / 2, groundY);
      ctx.quadraticCurveTo(gx, groundY + dent * 2, gx + blockW / 2, groundY);
      ctx.lineTo(half - 20, groundY);
      ctx.lineTo(half - 20, groundY + 36); ctx.lineTo(30, groundY + 36);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2; ctx.stroke();
      // 方块 + 力箭头
      ctx.fillStyle = '#94a3b8'; ctx.strokeStyle = '#475569';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(gx - blockW / 2, groundY + dent - 56, blockW, 56, 4); else ctx.rect(gx - blockW / 2, groundY + dent - 56, blockW, 56);
      ctx.fill(); ctx.stroke();
      pxArrow(ctx, gx, groundY + dent - 96, gx, groundY + dent - 62, { color: C.red, width: 3, label: 'F = ' + fmtN(F, 0) + ' N', labelDx: 8 });
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(L('海绵凹陷程度 = 压强的"效果"', 'the dent shows the pressure\'s effect'), half / 2 + 8, H - 26);
      ctx.textAlign = 'left';
      // —— 右：液体压强（潜水员）——
      const wL = half + 30, wR = W - 30, wT = 40, wB = H - 40;
      const depthToY = d => wT + 16 + d / 20 * (wB - wT - 16);
      ctx.fillStyle = 'rgba(56,140,220,.35)';
      ctx.fillRect(wL, wT + 16, wR - wL, wB - wT - 16);
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(wL, wT + 16); ctx.lineTo(wR, wT + 16); ctx.stroke();
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(wL, wT + 16); ctx.lineTo(wL, wB); ctx.lineTo(wR, wB); ctx.lineTo(wR, wT + 16); ctx.stroke();
      // 深度刻度与压强颜色渐变条
      for (let d = 0; d <= 20; d += 5) {
        ctx.fillStyle = '#475569'; ctx.font = '10.5px sans-serif';
        ctx.fillText(d + 'm', wL - 26, depthToY(d) + 4);
        ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(wL, depthToY(d)); ctx.lineTo(wL + 8, depthToY(d)); ctx.stroke();
      }
      // 潜水员 + 四向压强箭头（同深度各向相等）
      const dy = depthToY(hDep), dx2 = (wL + wR) / 2;
      ctx.font = '24px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('🤿', dx2, dy + 8);
      ctx.textAlign = 'left';
      const aLen = 14 + p2 / 9800 * 14;
      [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([ux, uy]) => {
        pxArrow(ctx, dx2 + ux * (aLen + 22), dy + uy * (aLen + 22), dx2 + ux * 22, dy + uy * 22, { color: '#1d4ed8', width: 2.2 });
      });
      readout.set(L(`
        <b>固体：</b>p = F/S = ${fmtN(F,0)}/${fmtN(S,2)} = <b>${fmtN(p1,0)} Pa</b>
        ${S <= 0.02 ? '<span class="tag">面积小 → 压强巨大（图钉原理）</span>' : ''}<br>
        <b>液体：</b>p = ρgh = 1000×9.8×${fmtN(hDep,1)} = <b>${fmtN(p2,0)} Pa</b><br>
        ≈ <b>${fmtN(p2 / 101000,2)}</b> 个大气压${hDep >= 10 ? '<span class="tag">10m ≈ 多扛一层大气！</span>' : ''}<br>
        同一深度四个方向的压强相等（看箭头）`, `
        <b>Solid:</b> p = F/S = ${fmtN(F,0)}/${fmtN(S,2)} = <b>${fmtN(p1,0)} Pa</b>
        ${S <= 0.02 ? '<span class="tag">tiny area → huge pressure (the thumbtack trick)</span>' : ''}<br>
        <b>Liquid:</b> p = ρgh = 1000×9.8×${fmtN(hDep,1)} = <b>${fmtN(p2,0)} Pa</b><br>
        ≈ <b>${fmtN(p2 / 101000,2)}</b> atmospheres${hDep >= 10 ? '<span class="tag">10 m ≈ one extra sky!</span>' : ''}<br>
        At one depth, pressure is equal in all four directions (see the arrows)`));
    }
    [sF, sS, sh2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
