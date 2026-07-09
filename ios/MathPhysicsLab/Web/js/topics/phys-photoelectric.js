'use strict';
/* ===== 光电效应 Photoelectric Effect ===== */
registerTopic({
  id: 'photoelectric', cat: 'modern', icon: '💡',
  title: '光电效应', en: 'Photoelectric Effect',
  desc: L('换金属、调波长，看电子能否被打出来 —— 爱因斯坦靠解释它拿了诺贝尔奖。',
          'Swap metals and tune the wavelength to see whether electrons fly out — explaining this won Einstein his Nobel Prize.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '光电效应', en: 'Photoelectric Effect',
      tagline: L('光强再大，频率不够也打不出电子；频率够高，再弱的光也立刻有电子飞出。',
                 'However intense, low-frequency light ejects nothing; above the threshold, even faint light frees electrons instantly.'),
      formula: L('E<sub>k,max</sub> = hν − W₀　·　光子能量 E = hν = <span class="frac"><span>hc</span><span class="den">λ</span></span>　·　截止频率 ν<sub>c</sub> = <span class="frac"><span>W₀</span><span class="den">h</span></span>',
                 'E<sub>k,max</sub> = hν − W₀　·　photon energy E = hν = <span class="frac"><span>hc</span><span class="den">λ</span></span>　·　cutoff frequency ν<sub>c</sub> = <span class="frac"><span>W₀</span><span class="den">h</span></span>'),
      explainHTML: L(`
        <h2>经典物理解释不了的现象 <span class="en">A Classical Puzzle</span></h2>
        <p>光照射金属表面能打出电子（<span class="term">光电子 <span class="en">(photoelectrons)</span></span>），但实验发现：</p>
        <ul>
          <li>存在<span class="term">截止频率 <span class="en">(cutoff frequency)</span></span>：频率低于 ν<sub>c</sub> 时，光再强、照再久也<b>没有</b>电子飞出；</li>
          <li>光电子的最大动能只与<b>频率</b>有关，与光强无关；</li>
          <li>只要频率够高，光一照<b>瞬间</b>就有电子飞出。</li>
        </ul>
        <p>按"光是连续的波"来解释，这三条全都说不通。</p>
        <h2>爱因斯坦的光子说 <span class="en">Einstein's Photon Theory (1905)</span></h2>
        <div class="formula">E<sub>k,max</sub> = hν − W₀
          <span class="note">h = 6.63×10⁻³⁴ J·s（普朗克常量）；W₀ 是逸出功 (work function)，由金属决定</span></div>
        <p>光的能量是一份一份的：每个<span class="term">光子 <span class="en">(photon)</span></span>携带 E = hν。
        一个电子一次只吸收一个光子：够付"出场费" W₀ 就能飞出，剩余变成动能。
        <b>光强大 = 光子多 = 电子多，但每个电子的能量不变</b> —— 三个疑难全部冰解。这项工作让爱因斯坦获得 1921 年诺贝尔物理学奖。</p>
        <h2>实用换算 <span class="en">Handy Conversion</span></h2>
        <div class="formula">E(eV) ≈ <span class="frac"><span>1240</span><span class="den">λ(nm)</span></span>
          <span class="note">例：500 nm 绿光的光子能量 ≈ 2.48 eV</span></div>
        <div class="tip"><b>实验建议：</b>① 选锌（W₀ = 4.31 eV），把波长拖遍整个可见光段 —— 全都打不出电子（所以需要紫外线）；② 换成铯（W₀ = 2.14 eV），慢慢调短波长，在 ≈580 nm 处电子突然出现；③ 把光强调大：飞出的电子变多了，但读数里的 Ek,max 一动不动。</div>
        <div class="think"><b>思考一下：</b>右图中不同金属的直线互相平行 —— 斜率是什么？（都是普朗克常量 h！密立根正是用这个方法精确测出了 h。）</div>
      `, `
        <h2>A Puzzle Classical Physics Couldn't Solve <span class="en">经典物理解释不了的现象</span></h2>
        <p>Light striking a metal can knock out electrons (<span class="term">photoelectrons <span class="en">(光电子)</span></span>), but experiments showed:</p>
        <ul>
          <li>There is a <span class="term">cutoff frequency <span class="en">(截止频率)</span></span>: below ν<sub>c</sub>, <b>no</b> electrons emerge — no matter how bright or how long the light shines;</li>
          <li>The electrons' maximum kinetic energy depends only on the <b>frequency</b>, not the intensity;</li>
          <li>Above the threshold, emission is <b>instantaneous</b>.</li>
        </ul>
        <p>If light were a continuous wave, none of this makes sense.</p>
        <h2>Einstein's Photon Theory (1905) <span class="en">爱因斯坦的光子说</span></h2>
        <div class="formula">E<sub>k,max</sub> = hν − W₀
          <span class="note">h = 6.63×10⁻³⁴ J·s (Planck's constant); W₀ is the work function (逸出功), a property of the metal</span></div>
        <p>Light comes in packets: each <span class="term">photon <span class="en">(光子)</span></span> carries E = hν.
        One electron absorbs one photon: if it covers the "exit fee" W₀, the electron escapes with the remainder as kinetic energy.
        <b>Brighter light = more photons = more electrons — but no more energy each.</b> All three puzzles dissolve. This work earned Einstein the 1921 Nobel Prize.</p>
        <h2>A Handy Conversion <span class="en">实用换算</span></h2>
        <div class="formula">E(eV) ≈ <span class="frac"><span>1240</span><span class="den">λ(nm)</span></span>
          <span class="note">e.g. a 500 nm green photon carries ≈ 2.48 eV</span></div>
        <div class="tip"><b>Try this:</b> ① Pick zinc (W₀ = 4.31 eV) and sweep the whole visible range — nothing comes out (you need ultraviolet); ② Switch to cesium (W₀ = 2.14 eV) and shorten the wavelength: electrons suddenly appear near 580 nm; ③ Crank the intensity: more electrons fly, but Ek,max in the readout doesn't move.</div>
        <div class="think"><b>Think about it:</b> The lines for different metals in the right graph are parallel — what is their slope? (Planck's constant h! Millikan measured h precisely this way.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const METALS = { cs: { name: L('铯 Cs', 'Cesium Cs'), W: 2.14 }, na: { name: L('钠 Na', 'Sodium Na'), W: 2.75 }, zn: { name: L('锌 Zn', 'Zinc Zn'), W: 4.31 } };
    const metal = addSeg(panel, {
      options: [
        { label: L('铯 2.14eV', 'Cs 2.14eV'), value: 'cs' },
        { label: L('钠 2.75eV', 'Na 2.75eV'), value: 'na' },
        { label: L('锌 4.31eV', 'Zn 4.31eV'), value: 'zn' }
      ],
      value: 'cs', onChange: () => draw()
    });
    const sl = addSlider(panel, { label: L('入射光波长 λ', 'Wavelength λ'), en: L('wavelength', '波长'), min: 200, max: 800, step: 5, value: 450, unit: 'nm' });
    const si = addSlider(panel, { label: L('光强（光子数）', 'Intensity (photon count)'), en: L('intensity', '光强'), min: 1, max: 10, step: 1, value: 5 });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, {});
    anim.start();

    function draw() {
      const lam = sl.value, I = si.value, W0 = METALS[metal.value].W;
      const E = 1240 / lam;              // eV
      const nu = 3e8 / (lam * 1e-9);     // Hz
      const Ek = E - W0;
      const emits = Ek > 0;
      const col = lam >= 380 ? waveColor(lam) : '#b18cff'; // 紫外用淡紫表示
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 左：金属板 + 光子 + 电子 ——
      const plateX = W * 0.30, plateT = 66, plateB = H - 66;
      ctx.fillStyle = '#d5dae6';
      ctx.fillRect(plateX, plateT, 20, plateB - plateT);
      ctx.strokeStyle = '#697086'; ctx.lineWidth = 2;
      ctx.strokeRect(plateX, plateT, 20, plateB - plateT);
      ctx.fillStyle = '#475569'; ctx.font = 'bold 12.5px sans-serif';
      ctx.fillText(L(`金属板：${METALS[metal.value].name}（W₀ = ${W0} eV）`, `metal plate: ${METALS[metal.value].name} (W₀ = ${W0} eV)`), plateX - 60, plateB + 24);
      // 光子（斜向下入射，数量∝光强）
      const t = anim.t;
      for (let i = 0; i < I; i++) {
        const phase = ((t * 90 + i * 53) % 160) / 160;
        const y0 = plateT + 14 + (i / I) * (plateB - plateT - 40);
        const x = 20 + phase * (plateX - 48);
        pxArrow(ctx, x, y0, x + 22, y0 + 8, { color: col, width: 2.2 });
      }
      ctx.fillStyle = lam < 380 ? '#7c3aed' : col;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(lam < 380 ? L('紫外线 UV', 'ultraviolet UV') : L('入射光', 'incident light'), 24, plateT - 10);
      // 电子（若发射）
      if (emits) {
        const eCount = I;
        for (let i = 0; i < eCount; i++) {
          const phase = ((t * (60 + Ek * 30) + i * 71) % 140) / 140;
          const y0 = plateT + 24 + (i / eCount) * (plateB - plateT - 48);
          const x = plateX + 26 + phase * 120;
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath(); ctx.arc(x, y0 - phase * 6, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#1e40af'; ctx.font = '9px sans-serif';
          ctx.fillText('e⁻', x - 4, y0 - phase * 6 - 7);
        }
      } else {
        ctx.fillStyle = '#b91c1c'; ctx.font = 'bold 13px sans-serif';
        ctx.fillText(L('❌ hν < W₀，无电子飞出', '❌ hν < W₀ — no electrons'), plateX + 34, (plateT + plateB) / 2);
        ctx.font = '11.5px sans-serif'; ctx.fillStyle = '#697086';
        ctx.fillText(L('（无论光强多大、照多久）', '(no matter how bright or how long)'), plateX + 34, (plateT + plateB) / 2 + 18);
      }
      // —— 右：Ek–ν 图 ——
      const gL = W * 0.56, gR = W - 24, gB = H - 56, gT = 40;
      const nuMax = 2.2e15, EkMax = 4.6;
      const GX = n => gL + n / nuMax * (gR - gL);
      const GY = e => gB - e / EkMax * (gB - gT);
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gL, gT); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('ν/Hz', gR - 28, gB + 15);
      ctx.fillText('Ek,max/eV', gL - 8, gT - 8);
      // 三种金属的直线（斜率同为 h）
      const hEV = 4.136e-15; // eV·s
      Object.entries(METALS).forEach(([k, m]) => {
        const cur = k === metal.value;
        const nu0 = m.W / hEV;
        ctx.strokeStyle = cur ? C.blue : '#dfe2f2';
        ctx.lineWidth = cur ? 2.6 : 1.5;
        ctx.beginPath();
        ctx.moveTo(GX(nu0), GY(0));
        const nuEnd = Math.min(nuMax, (EkMax + m.W) / hEV);
        ctx.lineTo(GX(nuEnd), GY(hEV * nuEnd - m.W));
        ctx.stroke();
        ctx.fillStyle = cur ? C.blue : '#b0b6cf'; ctx.font = '10.5px sans-serif';
        ctx.fillText(m.name.split(' ')[0], GX(nu0) - 8, GY(0) + 14);
      });
      // 当前工作点
      if (emits) {
        ctx.fillStyle = C.red;
        ctx.beginPath(); ctx.arc(GX(nu), GY(Ek), 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      } else if (nu < nuMax) {
        ctx.fillStyle = '#9aa1b5';
        ctx.beginPath(); ctx.arc(GX(nu), GY(0), 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText(L('斜率 = 普朗克常量 h（三线平行）', 'slope = Planck constant h (all parallel)'), gL + 12, gT + 6);
      const nuC = W0 / 4.136e-15, lamC = 1240 / W0;
      readout.set(L(`
        光子能量 E = 1240/λ = <b>${fmtN(E,2)} eV</b><br>
        逸出功 W₀ = <b>${W0} eV</b>，截止波长 λc = <b>${fmtN(lamC,0)} nm</b><br>
        ${emits
          ? `<span class="tag">发生光电效应 ✓</span><br>最大动能 Ek = hν − W₀ = <b>${fmtN(Ek,2)} eV</b><br>遏止电压 Uc = <b>${fmtN(Ek,2)} V</b>`
          : `<span class="warn">不发生光电效应（E &lt; W₀）</span><br>需要 λ &lt; ${fmtN(lamC,0)} nm 的光`}<br>
        光强只改变<b>电子数目</b>，不改变 Ek,max`, `
        Photon energy E = 1240/λ = <b>${fmtN(E,2)} eV</b><br>
        Work function W₀ = <b>${W0} eV</b>, cutoff wavelength λc = <b>${fmtN(lamC,0)} nm</b><br>
        ${emits
          ? `<span class="tag">Photoemission occurs ✓</span><br>Max kinetic energy Ek = hν − W₀ = <b>${fmtN(Ek,2)} eV</b><br>Stopping voltage Uc = <b>${fmtN(Ek,2)} V</b>`
          : `<span class="warn">No photoemission (E &lt; W₀)</span><br>Need light with λ &lt; ${fmtN(lamC,0)} nm`}<br>
        Intensity changes the <b>number of electrons</b>, never Ek,max`));
    }
    [sl, si].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
