'use strict';
/* ===== 电功率与安全用电 Electric Power & Safety（初中） ===== */
registerTopic({
  id: 'epower', cat: 'optics', icon: '💡', stage: 'junior',
  title: '电功率与安全用电', en: 'Electric Power & Safety',
  desc: L('往插线板上加电器，看总电流逼近保险丝极限 —— 明白"不要同时开太多大功率电器"的道理。',
          'Plug appliances into one power strip and watch the current creep toward the fuse limit — why you shouldn\'t run every big appliance at once.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '电功率与安全用电', en: 'Electric Power & Home Safety',
      tagline: L('家庭电路 220V。勾选电器累计功率与电流，超过保险丝额定值就会"跳闸"。',
                 'A 220 V household circuit. Toggle appliances to stack up power and current — exceed the fuse rating and it trips.'),
      formula: L('P = UI　·　I = <span class="frac"><span>P</span><span class="den">U</span></span>　·　电能 W = Pt（度 = kW·h）',
                 'P = UI　·　I = <span class="frac"><span>P</span><span class="den">U</span></span>　·　energy W = Pt (1 "unit" = kW·h)'),
      explainHTML: L(`
        <h2>电功率 <span class="en">Electric Power</span></h2>
        <div class="formula">P = U·I　　结合欧姆定律：P = I²R = <span class="frac"><span>U²</span><span class="den">R</span></span>
          <span class="note">"1000 W" 的电水壶在 220 V 下电流约 4.5 A。额定功率 = 额定电压下的功率</span></div>
        <h2>电能与电费 <span class="en">Energy &amp; the Meter</span></h2>
        <div class="formula">W = P·t　　1 度电 = 1 kW·h = 3.6×10⁶ J
          <span class="note">1000 W 的电器用 1 小时 = 1 度电。电表计的就是它</span></div>
        <h2>安全用电 <span class="en">Safety Rules</span></h2>
        <ul>
          <li>家庭电路电器<b>并联</b>：每加一个电器，总电流<b>增加</b> I = P/U；</li>
          <li><span class="term">保险丝/空气开关 <span class="en">(fuse / breaker)</span></span>串联在干路：电流超限自动熔断/跳闸，防止导线过热起火；</li>
          <li>不能用铜丝代替保险丝（熔点太高不会断）；湿手不碰开关；金属外壳电器要<b>接地</b>；</li>
          <li>人体安全电压不高于 <b>36 V</b>。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 逐个打开电器，看总电流 I = ΣP/220 往上爬；② 同时开空调 + 电水壶 + 电磁炉：超过 10 A 保险丝立刻"跳闸"变红；③ 换成 16 A 保险丝再试 —— 但注意现实中保险丝必须匹配导线粗细，不能随意加大。</div>
        <div class="think"><b>思考一下：</b>"峰谷电价"下，为什么建议深夜用洗衣机？1.5 匹空调（约 1100 W）开 8 小时用几度电、花多少钱？（1100 W × 8 h = 8.8 度。）</div>
      `, `
        <h2>Electric Power <span class="en">电功率</span></h2>
        <div class="formula">P = U·I　　with Ohm's law: P = I²R = <span class="frac"><span>U²</span><span class="den">R</span></span>
          <span class="note">A "1000 W" kettle on 220 V draws about 4.5 A. Rated power = power at rated voltage</span></div>
        <h2>Energy &amp; the Meter <span class="en">电能与电费</span></h2>
        <div class="formula">W = P·t　　1 unit = 1 kW·h = 3.6×10⁶ J
          <span class="note">a 1000 W appliance running 1 hour = 1 kW·h — exactly what the meter counts</span></div>
        <h2>Safety Rules <span class="en">安全用电</span></h2>
        <ul>
          <li>Household appliances connect <b>in parallel</b>: each one added <b>adds</b> current I = P/U;</li>
          <li>The <span class="term">fuse / breaker <span class="en">(保险丝/空气开关)</span></span> sits in series on the main line: overload melts/trips it before wires overheat and burn;</li>
          <li>Never substitute copper wire for a fuse (melting point too high to blow); no wet hands on switches; ground metal-cased appliances;</li>
          <li>Safe voltage for the human body: at most <b>36 V</b>.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Switch appliances on one by one and watch I = ΣP/220 climb; ② Run the AC + kettle + induction cooker together: past 10 A the fuse "trips" red; ③ Swap in a 16 A fuse — but remember real fuses must match the wiring; never upsize casually.</div>
        <div class="think"><b>Think about it:</b> With off-peak pricing, why run the washer late at night? How many kW·h does a 1100 W air conditioner use in 8 hours, and what does it cost? (1100 W × 8 h = 8.8 kW·h.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 430);
    const APPS = [
      { name: L('LED 灯', 'LED lamp'), icon: '💡', P: 10 },
      { name: L('电视', 'TV'), icon: '📺', P: 120 },
      { name: L('冰箱', 'fridge'), icon: '🧊', P: 150 },
      { name: L('洗衣机', 'washer'), icon: '🌀', P: 400 },
      { name: L('空调', 'AC'), icon: '❄️', P: 1100 },
      { name: L('电水壶', 'kettle'), icon: '🫖', P: 1500 },
      { name: L('电磁炉', 'cooker'), icon: '🍳', P: 2000 }
    ];
    const on = [true, true, false, false, false, false, false];
    // 电器开关按钮组
    const grid = h('div', 'tf-chips');
    APPS.forEach((a2, i) => {
      const b = h('a', 'tf-chip' + (on[i] ? ' ok' : ''), `${a2.icon} ${a2.name} ${a2.P}W`);
      b.href = 'javascript:void(0)';
      b.onclick = () => { on[i] = !on[i]; b.classList.toggle('ok', on[i]); draw(); };
      grid.appendChild(b);
    });
    panel.appendChild(grid);
    const sfuse = addSlider(panel, { label: L('保险丝额定电流', 'Fuse rating'), en: L('fuse', '保险丝'), min: 5, max: 20, step: 1, value: 10, unit: 'A' });
    const readout = addReadout(panel);
    const U = 220;

    function draw() {
      const totalP = APPS.reduce((s2, a2, i) => s2 + (on[i] ? a2.P : 0), 0);
      const I = totalP / U;
      const limit = sfuse.value;
      const blown = I > limit;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // 电流表盘
      const cx = W / 2, cy = H * 0.52, R = Math.min(H * 0.34, 150);
      ctx.strokeStyle = '#e3e6f5'; ctx.lineWidth = 16;
      ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 0.75, Math.PI * 2.25); ctx.stroke();
      // 安全区/超载区
      const angOf = i2 => Math.PI * 0.75 + Math.min(i2 / 20, 1) * Math.PI * 1.5;
      ctx.strokeStyle = 'rgba(34,197,94,.5)'; ctx.lineWidth = 16;
      ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 0.75, angOf(limit)); ctx.stroke();
      ctx.strokeStyle = 'rgba(220,38,38,.45)';
      ctx.beginPath(); ctx.arc(cx, cy, R, angOf(limit), Math.PI * 2.25); ctx.stroke();
      // 指针
      const a2 = angOf(I);
      ctx.strokeStyle = blown ? '#dc2626' : '#334155'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (R - 26) * Math.cos(a2), cy + (R - 26) * Math.sin(a2)); ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
      // 刻度
      ctx.fillStyle = '#697086'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      [0, 5, 10, 15, 20].forEach(i2 => {
        const aa = angOf(i2);
        ctx.fillText(i2, cx + (R + 22) * Math.cos(aa), cy + (R + 22) * Math.sin(aa) + 4);
      });
      ctx.font = 'bold 26px sans-serif';
      ctx.fillStyle = blown ? '#dc2626' : '#16181f';
      ctx.fillText(fmtN(I, 2) + ' A', cx, cy + R * 0.62);
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(blown ? L('⚡ 超载！保险丝跳闸', '⚡ Overload! Fuse tripped') : L('总电流（并联累加）', 'total current (parallel sum)'), cx, cy + R * 0.62 + 26);
      ctx.textAlign = 'left';
      const kwhPerHour = totalP / 1000;
      readout.set(L(`
        开启电器总功率 ΣP = <b>${fmtN(totalP,0)} W</b><br>
        总电流 I = ΣP/U = ${fmtN(totalP,0)}/220 = <b>${fmtN(I,2)} A</b><br>
        保险丝额定 <b>${limit} A</b> → ${blown ? '<span class="warn">已超载，跳闸断电！关掉一些电器</span>' : `还能再加约 <b>${fmtN((limit - I) * U,0)} W</b>`}<br>
        照此用 1 小时耗电 = <b>${fmtN(kwhPerHour,2)} 度</b>（kW·h）`, `
        Total power of on-appliances ΣP = <b>${fmtN(totalP,0)} W</b><br>
        Total current I = ΣP/U = ${fmtN(totalP,0)}/220 = <b>${fmtN(I,2)} A</b><br>
        Fuse rated <b>${limit} A</b> → ${blown ? '<span class="warn">overloaded — tripped! Switch something off</span>' : `room for about <b>${fmtN((limit - I) * U,0)} W</b> more`}<br>
        One hour like this uses <b>${fmtN(kwhPerHour,2)} kW·h</b>`));
    }
    sfuse.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
