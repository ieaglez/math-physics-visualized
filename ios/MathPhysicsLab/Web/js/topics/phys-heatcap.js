'use strict';
/* ===== 比热容 Specific Heat Capacity（初中） ===== */
registerTopic({
  id: 'heatcap', cat: 'modern', icon: '☕', stage: 'junior',
  title: '比热容 Q = cmΔt', en: 'Specific Heat',
  desc: L('同样加热水和沙子，谁升温快？—— 比热容解释海边为什么昼夜温差小。',
          'Heat water and sand identically — which warms faster? Specific heat explains why seaside days and nights differ so little.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '比热容', en: 'Specific Heat Capacity',
      tagline: L('两杯质量相同的水和沙子，同样的火力同时加热 —— 点播放看温度计的差距拉开。',
                 'Equal masses of water and sand over identical flames — press play and watch the thermometers pull apart.'),
      formula: 'Q = c·m·Δt　·　c(水) = 4.2×10³ J/(kg·℃)',
      explainHTML: L(`
        <h2>比热容是什么 <span class="en">What Specific Heat Is</span></h2>
        <div class="formula">Q = c·m·Δt　⟺　c = <span class="frac"><span>Q</span><span class="den">m·Δt</span></span>
          <span class="note">让 1 kg 物质升温 1℃ 需要的热量。水 4200，沙石 ≈ 920，铁 ≈ 460，单位 J/(kg·℃)</span></div>
        <ul>
          <li>c 是物质的<b>属性</b>：同一物质 c 不变，与质量、形状无关；</li>
          <li><b>水的比热容出奇地大</b> —— 同样吸热升温慢、同样放热降温也慢，是天然的"温度缓冲器"。</li>
        </ul>
        <h2>水的大比热容改变世界 <span class="en">Water's Huge c Shapes the World</span></h2>
        <ul>
          <li><b>海边昼夜温差小</b>：白天海水升温慢（吸热大），夜里降温也慢（放热大）；内陆沙漠则早晚"冰火两重天"；</li>
          <li><b>暖气用水</b>循环：一样的水温降落能带出更多热；<b>汽车水箱</b>用水冷却发动机；</li>
          <li>稻田傍晚灌水防霜冻：水降温慢，夜里"捂着"秧苗。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 点播放：同样火力下沙子温度飙升、水慢吞吞 —— c 相差约 4.6 倍，升温速度也差约 4.6 倍；② 点「停止加热」切到冷却：沙子又是先凉的那个；③ 用读数验证 Q = cmΔt：两杯吸收的热量相同，Δt 之比 = c 的反比。</div>
        <div class="think"><b>思考一下：</b>"早穿皮袄午穿纱，围着火炉吃西瓜"说的是新疆沙漠。用比热容解释这句谚语；再想想为什么月球表面昼夜温差高达 300℃？（没有海洋和大气这两个"缓冲器"。）</div>
      `, `
        <h2>What Specific Heat Is <span class="en">比热容是什么</span></h2>
        <div class="formula">Q = c·m·Δt　⟺　c = <span class="frac"><span>Q</span><span class="den">m·Δt</span></span>
          <span class="note">the heat needed to warm 1 kg of a substance by 1 ℃. Water 4200, sand ≈ 920, iron ≈ 460, in J/(kg·℃)</span></div>
        <ul>
          <li>c is a <b>property of the substance</b> — independent of mass or shape;</li>
          <li><b>Water's c is remarkably large</b> — slow to warm and slow to cool: nature's thermal buffer.</li>
        </ul>
        <h2>Water's Huge c Shapes the World <span class="en">水的大比热容</span></h2>
        <ul>
          <li><b>Mild seaside climates</b>: the sea warms slowly by day and cools slowly by night; inland deserts swing wildly;</li>
          <li><b>Hot-water heating</b> carries more heat per degree dropped; <b>car radiators</b> cool engines with water;</li>
          <li>Farmers flood paddies before a frosty night: the slowly-cooling water "blankets" the seedlings.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Press play: over identical flames the sand's temperature rockets while the water dawdles — c differs ~4.6×, so does the warming rate; ② Hit "stop heating" to switch to cooling: sand chills first again; ③ Verify Q = cmΔt in the readout: equal heat absorbed, Δt inversely proportional to c.</div>
        <div class="think"><b>Think about it:</b> "Fur coat at dawn, gauze at noon" describes desert life — explain it with specific heat. And why does the Moon swing ~300 ℃ between day and night? (No ocean, no atmosphere — no buffers.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 430);
    const sm = addSlider(panel, { label: L('每杯质量 m', 'Mass of each m'), en: L('mass', '质量'), min: 0.5, max: 3, step: 0.1, value: 1, unit: 'kg' });
    const sp = addSlider(panel, { label: L('加热功率 P', 'Heating power P'), en: L('power', '功率'), min: 200, max: 1500, step: 50, value: 800, unit: 'W' });
    const mode = addSeg(panel, {
      options: [{ label: L('🔥 加热', '🔥 Heat'), value: 'heat' }, { label: L('❄️ 停止加热(冷却)', '❄️ Cool down'), value: 'cool' }],
      value: 'heat', onChange: () => draw()
    });
    const readout = addReadout(panel);
    const cW = 4200, cS = 920, T0 = 20;
    const anim = makeAnimator(dt => {
      if (anim.t > 90) { anim.stop(); play.sync(); }
      draw();
    });
    const play = addPlayControls(panel, anim, { onReset: () => draw() });

    function temps(t) {
      const m = sm.value, P = sp.value;
      if (mode.value === 'heat') {
        return [Math.min(99, T0 + P * t / (cW * m)), Math.min(240, T0 + P * t / (cS * m))];
      }
      // 冷却：从各自较高温度指数下降（牛顿冷却近似，速率 ∝ 1/c）
      const Tw0 = 80, Ts0 = 80;
      return [25 + (Tw0 - 25) * Math.exp(-t / (cW * m / 55)), 25 + (Ts0 - 25) * Math.exp(-t / (cS * m / 55))];
    }

    function draw() {
      const t = Math.min(anim.t, 90);
      const [Tw, Ts] = temps(t);
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // 两只杯子 + 温度计
      const cup = (x, T, col, lb, emoji) => {
        const byB = H - 70, byT = H * 0.34;
        ctx.fillStyle = col;
        ctx.fillRect(x - 44, byT + 20, 88, byB - byT - 20);
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x - 44, byT); ctx.lineTo(x - 44, byB); ctx.lineTo(x + 44, byB); ctx.lineTo(x + 44, byT); ctx.stroke();
        // 温度计（柱高∝T）
        const th = Math.min(1, T / 150);
        ctx.fillStyle = '#f1f2fa';
        ctx.fillRect(x + 58, byT, 12, byB - byT);
        ctx.fillStyle = T > 90 ? '#dc2626' : '#fb7185';
        ctx.fillRect(x + 58, byB - th * (byB - byT), 12, th * (byB - byT));
        ctx.strokeStyle = '#697086'; ctx.lineWidth = 1.5;
        ctx.strokeRect(x + 58, byT, 12, byB - byT);
        ctx.font = '20px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(emoji, x, (byT + byB) / 2 + 6);
        if (mode.value === 'heat') ctx.fillText('🔥', x, byB + 24);
        ctx.font = 'bold 13px sans-serif'; ctx.fillStyle = '#334155';
        ctx.fillText(lb, x, byT - 10);
        ctx.fillStyle = T > 90 ? '#dc2626' : '#475569';
        ctx.fillText(fmtN(T, 1) + ' ℃', x + 64, byT - 10);
        ctx.textAlign = 'left';
      };
      cup(W * 0.28, Tw, 'rgba(96,165,250,.5)', L('水 c=4200', 'water c=4200'), '💧');
      cup(W * 0.68, Ts, 'rgba(217,164,91,.6)', L('沙 c=920', 'sand c=920'), '🏖️');
      const Q = mode.value === 'heat' ? sp.value * t : 0;
      readout.set(L(`
        ${mode.value === 'heat' ? `已加热 t = <b>${fmtN(t,0)} s</b>，每杯吸热 Q = Pt = <b>${fmtN(Q/1000,1)} kJ</b>` : `冷却中 t = <b>${fmtN(t,0)} s</b>（无火）`}<br>
        水：T = <b>${fmtN(Tw,1)} ℃</b>（Δt = ${fmtN(Math.abs(Tw - (mode.value==='heat'?20:80)),1)} ℃）<br>
        沙：T = <b>${fmtN(Ts,1)} ℃</b>（Δt = ${fmtN(Math.abs(Ts - (mode.value==='heat'?20:80)),1)} ℃）<br>
        ${mode.value === 'heat'
          ? `同样吸热，Δt沙/Δt水 ≈ <b>${fmtN((Ts-20)/(Math.max(Tw-20,0.1)),1)}</b> ≈ c水/c沙 = ${fmtN(cW/cS,1)} ✓`
          : L('沙子凉得快 —— 放热也"没耐心"', 'Sand cools first — quick to shed heat too')}<br>
        <span class="tag">${L('水 = 天然温度缓冲器', 'water = nature\'s thermal buffer')}</span>`, `
        ${mode.value === 'heat' ? `Heating for t = <b>${fmtN(t,0)} s</b>; each cup absorbed Q = Pt = <b>${fmtN(Q/1000,1)} kJ</b>` : `Cooling, t = <b>${fmtN(t,0)} s</b> (no flame)`}<br>
        Water: T = <b>${fmtN(Tw,1)} ℃</b> (Δt = ${fmtN(Math.abs(Tw - (mode.value==='heat'?20:80)),1)} ℃)<br>
        Sand: T = <b>${fmtN(Ts,1)} ℃</b> (Δt = ${fmtN(Math.abs(Ts - (mode.value==='heat'?20:80)),1)} ℃)<br>
        ${mode.value === 'heat'
          ? `Equal heat: Δt_sand/Δt_water ≈ <b>${fmtN((Ts-20)/(Math.max(Tw-20,0.1)),1)}</b> ≈ c_w/c_s = ${fmtN(cW/cS,1)} ✓`
          : 'Sand cools first — quick to shed heat too'}<br>
        <span class="tag">water = nature's thermal buffer</span>`));
    }
    [sm, sp].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
