'use strict';
/* ===== 物态变化 Changes of State（初中） ===== */
registerTopic({
  id: 'phase', cat: 'modern', icon: '🧊', stage: 'junior',
  title: '物态变化', en: 'Changes of State',
  desc: L('给冰持续加热，画出温度-时间曲线 —— 为什么熔化和沸腾时温度"卡住不动"？',
          'Heat ice steadily and plot temperature vs. time — why does the temperature "stall" during melting and boiling?'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '物态变化（熔化与沸腾）', en: 'Melting & Boiling Curves',
      tagline: L('点播放，看冰 → 水 → 水蒸气的完整旅程：两个"平台"就是熔点 0℃ 和沸点 100℃。',
                 'Press play for the full journey ice → water → steam: the two plateaus are the melting point 0 ℃ and boiling point 100 ℃.'),
      formula: L('晶体熔化/沸腾时：持续吸热，温度保持不变（平台段）',
                 'While a crystal melts or a liquid boils: heat keeps flowing in, yet the temperature holds still (the plateau)'),
      explainHTML: L(`
        <h2>六种物态变化 <span class="en">Six Changes of State</span></h2>
        <ul>
          <li><b>吸热</b>：熔化（固→液）、汽化（液→气：蒸发与沸腾）、升华（固→气，如冻干、樟脑丸）；</li>
          <li><b>放热</b>：凝固（液→固）、液化（气→液，如"白气"、露水）、凝华（气→固，如霜、雾凇）。</li>
        </ul>
        <h2>为什么会有"平台" <span class="en">Why the Plateau</span></h2>
        <div class="formula">熔化平台 = 熔点（冰 0℃）　·　沸腾平台 = 沸点（水 100℃，标准大气压）
          <span class="note">平台期间吸收的热量没有用来升温，而是用来"拆散"分子间的束缚 —— 潜热</span></div>
        <ul>
          <li><span class="term">晶体 <span class="en">(crystalline)</span></span>（冰、海波、金属）有固定熔点 → 曲线有平台；<span class="term">非晶体 <span class="en">(amorphous)</span></span>（玻璃、蜡、沥青）没有 → 曲线一路缓升；</li>
          <li>熔化过程中固液<b>共存</b>：冰水混合物恒为 0℃；</li>
          <li>沸点随气压变化：高山上水不到 100℃ 就开（饭煮不熟），高压锅里超过 100℃（熟得快）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 点播放，观察两个平台的温度读数恰为 0℃ 和 100℃；② 调大加热功率：升温段变陡、平台变短，但<b>平台高度不变</b>（熔点沸点是物质属性）；③ 调小气压滑块（模拟高山），看沸腾平台整体下移。</div>
        <div class="think"><b>思考一下：</b>夏天吃冰棒时周围冒的"白气"是什么物态变化？（水蒸气遇冷<b>液化</b>成小水珠 —— 白气不是气，是雾。）出汗为什么能降温？（蒸发吸热。）</div>
      `, `
        <h2>Six Changes of State <span class="en">六种物态变化</span></h2>
        <ul>
          <li><b>Absorbing heat</b>: melting (solid→liquid), vaporization (liquid→gas: evaporation & boiling), sublimation (solid→gas — freeze-drying, mothballs);</li>
          <li><b>Releasing heat</b>: freezing (liquid→solid), condensation (gas→liquid — "steam clouds", dew), deposition (gas→solid — frost, rime).</li>
        </ul>
        <h2>Why the Plateau <span class="en">为什么会有"平台"</span></h2>
        <div class="formula">Melting plateau = melting point (ice: 0 ℃)　·　boiling plateau = boiling point (water: 100 ℃ at standard pressure)
          <span class="note">During a plateau the incoming heat isn't raising the temperature — it's prying molecules apart: latent heat</span></div>
        <ul>
          <li><span class="term">Crystalline solids <span class="en">(晶体)</span></span> (ice, metals) have a sharp melting point → the curve has a plateau; <span class="term">amorphous ones <span class="en">(非晶体)</span></span> (glass, wax, asphalt) don't → the curve just keeps climbing;</li>
          <li>During melting, solid and liquid <b>coexist</b>: an ice–water mixture sits at exactly 0 ℃;</li>
          <li>Boiling point tracks pressure: on a mountain water boils below 100 ℃ (rice undercooks); in a pressure cooker it exceeds 100 ℃ (dinner is faster).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Press play and check the two plateau temperatures: exactly 0 ℃ and 100 ℃; ② Raise the heating power: the ramps steepen, the plateaus shorten — but their <b>heights never move</b> (melting/boiling points are properties of the substance); ③ Lower the pressure slider (a mountain top) and watch the boiling plateau slide down.</div>
        <div class="think"><b>Think about it:</b> The "white mist" around a summer popsicle — which change of state is that? (Water vapor <b>condensing</b> into droplets: the mist is not gas but fog.) And why does sweating cool you? (Evaporation absorbs heat.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sp = addSlider(panel, { label: L('加热功率', 'Heating power'), en: L('power', '功率'), min: 0.5, max: 2.5, step: 0.1, value: 1 });
    const spr = addSlider(panel, { label: L('气压（影响沸点）', 'Pressure (sets boiling point)'), en: L('pressure', '气压'), min: 0.4, max: 1.4, step: 0.05, value: 1, unit: 'atm' });
    const readout = addReadout(panel);
    const anim = makeAnimator(dt => {
      if (anim.t > 60) { anim.stop(); play.sync(); }
      draw();
    });
    const play = addPlayControls(panel, anim, { onReset: () => draw() });

    // 温度模型：-20℃冰升温(0~6s基准) → 0℃平台(6~18) → 升到沸点(18~38) → 沸腾平台(38~55) → 汽化完(留在沸点后略升)
    function tempAt(tRaw, power, boilT) {
      const t = tRaw * power; // 功率加速进程
      const seg1 = 6, seg2 = 18, seg3v = boilT, seg3 = 18 + (boilT - 0) / 5, seg4 = seg3 + 17;
      if (t < seg1) return -20 + t / seg1 * 20;
      if (t < seg2) return 0;
      if (t < seg3) return (t - seg2) / (seg3 - seg2) * boilT;
      if (t < seg4) return boilT;
      return boilT + Math.min(12, (t - seg4) * 0.8);
    }
    function stateAt(tRaw, power, boilT) {
      const t = tRaw * power;
      const seg3 = 18 + boilT / 5, seg4 = seg3 + 17;
      if (t < 6) return 0;         // 冰
      if (t < 18) return 1;        // 冰水共存
      if (t < seg3) return 2;      // 水
      if (t < seg4) return 3;      // 沸腾
      return 4;                    // 蒸气
    }

    function draw() {
      const power = sp.value;
      const boilT = 100 * Math.pow(spr.value, 0.28); // 简化：气压→沸点
      const t = Math.min(anim.t, 60);
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const gL = 62, gR = W - 130, gT = 34, gB = H - 44;
      const GX = tt => gL + tt / 60 * (gR - gL);
      const GY = T => gB - (T + 25) / 145 * (gB - gT);
      // 轴
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gL, gT); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('T/℃', gL + 4, gT - 6 + 14);
      ctx.fillText('t/min', gR - 26, gB + 16);
      [-20, 0, 50, 100].forEach(T => {
        ctx.fillText(T, gL - 30, GY(T) + 4);
        ctx.strokeStyle = '#eef0f8';
        ctx.beginPath(); ctx.moveTo(gL, GY(T)); ctx.lineTo(gR, GY(T)); ctx.stroke();
      });
      // 参考线：熔点/沸点
      [[0, L('熔点 0℃', 'melting 0℃'), '#38bdf8'], [boilT, L(`沸点 ${fmtN(boilT,0)}℃`, `boiling ${fmtN(boilT,0)}℃`), '#f87171']].forEach(([T, lb, col]) => {
        ctx.strokeStyle = col; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(gL, GY(T)); ctx.lineTo(gR, GY(T)); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col; ctx.font = 'bold 11px sans-serif';
        ctx.fillText(lb, gR - 74, GY(T) - 5);
      });
      // 曲线
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2.8;
      ctx.beginPath();
      for (let tt = 0; tt <= t; tt += 0.2) {
        const X = GX(tt), Y = GY(tempAt(tt, power, boilT));
        tt === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
      }
      ctx.stroke();
      const Tnow = tempAt(t, power, boilT);
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(GX(t), GY(Tnow), 5.5, 0, Math.PI * 2); ctx.fill();
      // 右侧烧杯示意
      const st = stateAt(t, power, boilT);
      const bx = W - 96, byT = H * 0.3, byB = H * 0.72;
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(bx - 30, byT); ctx.lineTo(bx - 30, byB); ctx.lineTo(bx + 30, byB); ctx.lineTo(bx + 30, byT); ctx.stroke();
      ctx.font = '26px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(['🧊', '🧊💧', '💧', '💧♨️', '♨️'][st], bx, (byT + byB) / 2 + 8);
      ctx.font = '11.5px sans-serif'; ctx.fillStyle = '#475569';
      ctx.fillText([L('冰', 'ice'), L('冰水共存', 'ice + water'), L('水', 'water'), L('沸腾中', 'boiling'), L('水蒸气', 'steam')][st], bx, byB + 18);
      ctx.fillText('🔥'.repeat(Math.round(power)), bx, byB + 38);
      ctx.textAlign = 'left';
      readout.set(L(`
        当前温度 T = <b>${fmtN(Tnow,1)} ℃</b>，状态：<b>${[L('固态（冰）','solid'), '冰水共存 0℃', '液态（水）', `沸腾 ${fmtN(boilT,0)}℃`, '气态'][st]}</b><br>
        熔化平台：<b>0 ℃</b>（吸热但不升温 —— 热量在拆冰的晶格）<br>
        沸腾平台：<b>${fmtN(boilT,0)} ℃</b>（气压 ${fmtN(spr.value,2)} atm${spr.value < 0.95 ? '，像在高山上' : spr.value > 1.05 ? '，像高压锅' : ''}）<br>
        ${st === 1 || st === 3 ? '<span class="tag">正处平台期：温度卡住不动！</span>' : L('加热功率只改变过程快慢，不改变平台高度', 'Power changes the pace, never the plateau heights')}`, `
        Current T = <b>${fmtN(Tnow,1)} ℃</b>, state: <b>${['solid (ice)', 'ice + water at 0℃', 'liquid water', `boiling at ${fmtN(boilT,0)}℃`, 'steam'][st]}</b><br>
        Melting plateau: <b>0 ℃</b> (heat flows in, temperature stalls — it's dismantling the ice lattice)<br>
        Boiling plateau: <b>${fmtN(boilT,0)} ℃</b> (pressure ${fmtN(spr.value,2)} atm${spr.value < 0.95 ? ' — like a mountain top' : spr.value > 1.05 ? ' — like a pressure cooker' : ''})<br>
        ${st === 1 || st === 3 ? '<span class="tag">On a plateau right now: temperature pinned!</span>' : 'Power changes the pace, never the plateau heights'}`));
    }
    [sp, spr].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
