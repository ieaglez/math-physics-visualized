'use strict';
/* ===== 氢原子能级 Bohr Model & Energy Levels ===== */
registerTopic({
  id: 'bohr', cat: 'modern', icon: '⚛️',
  title: '氢原子能级', en: 'Hydrogen Energy Levels',
  desc: L('让电子在能级间跃迁，计算放出光子的波长和颜色 —— 原子光谱的秘密。',
          'Make the electron jump between energy levels and compute the emitted photon\'s wavelength and color — the secret of atomic spectra.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '氢原子能级与跃迁', en: 'Bohr Model: Energy Levels & Transitions',
      tagline: L('左边是玻尔模型的电子轨道，右边是能级图。选好初末能级，看放出什么颜色的光子。',
                 'Left: Bohr orbits. Right: the energy-level diagram. Choose the initial and final levels and see what color photon comes out.'),
      formula: 'E<sub>n</sub> = <span class="frac"><span>−13.6</span><span class="den">n²</span></span> eV　·　hν = E<sub>m</sub> − E<sub>n</sub>　·　λ = <span class="frac"><span>1240</span><span class="den">ΔE(eV)</span></span> nm',
      explainHTML: L(`
        <h2>玻尔的量子化轨道 <span class="en">Bohr's Quantized Orbits (1913)</span></h2>
        <p>卢瑟福的"行星模型"有个致命问题：绕转的电子会不断辐射能量，10⁻⁸ 秒内就该坠毁在原子核上。
        玻尔大胆假设：电子只能在一些<b>特定轨道</b>上运动，处于这些<span class="term">定态 <span class="en">(stationary states)</span></span>时不辐射能量：</p>
        <div class="formula">E<sub>n</sub> = <span class="frac"><span>−13.6</span><span class="den">n²</span></span> eV（n = 1, 2, 3, …）
          <span class="note">n 叫量子数。能量为负表示电子被束缚；E∞ = 0 表示恰好电离</span></div>
        <ul>
          <li>n = 1：<span class="term">基态 <span class="en">(ground state)</span></span>，能量最低最稳定，E₁ = −13.6 eV；</li>
          <li>n ≥ 2：<span class="term">激发态 <span class="en">(excited states)</span></span>；能级越高，间隔越挤；</li>
          <li>从基态电离氢原子需要 13.6 eV —— 这叫<b>电离能 (ionization energy)</b>。</li>
        </ul>
        <h2>跃迁与光谱 <span class="en">Transitions & Spectra</span></h2>
        <div class="formula">hν = E<sub>m</sub> − E<sub>n</sub>
          <span class="note">从高能级跳到低能级，放出一个光子，能量恰好等于能级差 —— 所以原子光谱是分立的线状谱！</span></div>
        <ul>
          <li>跃迁到 n = 1：<b>莱曼系 (Lyman)</b>，紫外线；</li>
          <li>跃迁到 n = 2：<b>巴耳末系 (Balmer)</b>，可见光 —— 氢的红线 656 nm 就是 3→2；</li>
          <li>跃迁到 n = 3：<b>帕邢系 (Paschen)</b>，红外线；</li>
          <li>反过来，吸收恰好等于能级差的光子，电子就向上跃迁（吸收光谱）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 设 3→2，得到 656 nm 的红光 —— 这是夜空中氢星云发红的原因；② 依次试 4→2、5→2、6→2，得到巴耳末系的青、蓝、紫线；③ 任何跃迁到 n=1 的光子都在紫外区，验证一下；④ 6→5 呢？能级差小到只能放出远红外光子。</div>
        <div class="think"><b>思考一下：</b>为什么每种元素的光谱像"指纹"一样独一无二？天文学家怎么知道亿万光年外的星星由什么组成？</div>
      `, `
        <h2>Bohr's Quantized Orbits (1913) <span class="en">玻尔的量子化轨道</span></h2>
        <p>Rutherford's "planetary model" had a fatal flaw: an orbiting electron should radiate its energy away and crash into the nucleus within 10⁻⁸ s.
        Bohr's bold postulate: electrons may occupy only <b>certain orbits</b> — the <span class="term">stationary states <span class="en">(定态)</span></span> — and radiate nothing while in them:</p>
        <div class="formula">E<sub>n</sub> = <span class="frac"><span>−13.6</span><span class="den">n²</span></span> eV（n = 1, 2, 3, …）
          <span class="note">n is the quantum number. Negative energy means bound; E∞ = 0 means just barely ionized</span></div>
        <ul>
          <li>n = 1: the <span class="term">ground state <span class="en">(基态)</span></span> — lowest, most stable, E₁ = −13.6 eV;</li>
          <li>n ≥ 2: <span class="term">excited states <span class="en">(激发态)</span></span>; levels crowd together as n grows;</li>
          <li>Ionizing hydrogen from the ground state takes 13.6 eV — the <b>ionization energy (电离能)</b>.</li>
        </ul>
        <h2>Transitions &amp; Spectra <span class="en">跃迁与光谱</span></h2>
        <div class="formula">hν = E<sub>m</sub> − E<sub>n</sub>
          <span class="note">Dropping to a lower level emits one photon carrying exactly the level gap — hence atomic spectra are discrete lines!</span></div>
        <ul>
          <li>Transitions to n = 1: the <b>Lyman series</b> — ultraviolet;</li>
          <li>To n = 2: the <b>Balmer series</b> — visible light; hydrogen's red line at 656 nm is 3→2;</li>
          <li>To n = 3: the <b>Paschen series</b> — infrared;</li>
          <li>Absorbing a photon of exactly the right energy drives the electron upward (absorption spectra).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Set 3→2 and get 656 nm red light — why hydrogen nebulae glow red; ② Try 4→2, 5→2, 6→2 for the Balmer cyan, blue and violet lines; ③ Confirm every jump into n = 1 lands in the ultraviolet; ④ And 6→5? The gap is so small only a far-infrared photon comes out.</div>
        <div class="think"><b>Think about it:</b> Why is each element's spectrum as unique as a fingerprint? How do astronomers know what stars billions of light-years away are made of?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 470);
    const sni = addSlider(panel, { label: L('初态 n（高能级）', 'Initial n (upper)'), en: L('initial', '初态'), min: 2, max: 6, step: 1, value: 3 });
    const snf = addSlider(panel, { label: L('末态 n（低能级）', 'Final n (lower)'), en: L('final', '末态'), min: 1, max: 5, step: 1, value: 2 });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, {});
    anim.start();
    const En = n => -13.6 / (n * n);

    function draw() {
      let ni = sni.value, nf = snf.value;
      const valid = ni > nf;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0b1026'; ctx.fillRect(0, 0, W, H);
      // —— 左：轨道模型 ——
      const cx = W * 0.27, cy = H / 2;
      const orbR = n => 16 + (n * n) * 5.2;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '10px sans-serif';
      ctx.fillText('+', cx - 3, cy + 3);
      for (let n = 1; n <= 6; n++) {
        ctx.strokeStyle = (n === ni && valid) ? 'rgba(96,165,250,.9)' : (n === nf && valid) ? 'rgba(74,222,128,.9)' : 'rgba(255,255,255,.18)';
        ctx.lineWidth = (n === ni || n === nf) && valid ? 1.8 : 1;
        ctx.beginPath(); ctx.arc(cx, cy, orbR(n), 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '10px sans-serif';
        ctx.fillText('n=' + n, cx + orbR(n) * 0.707 + 3, cy - orbR(n) * 0.707 - 3);
      }
      if (valid) {
        // 电子动画：在初轨道转，周期性跳到末轨道
        const t = anim.t % 4;
        const jumping = t > 2.6 && t < 3.1;
        const rNow = t <= 2.6 ? orbR(ni) : t < 3.1 ? orbR(ni) + (orbR(nf) - orbR(ni)) * (t - 2.6) / 0.5 : orbR(nf);
        const ang = anim.t * 2.2;
        const ex = cx + rNow * Math.cos(ang), ey = cy + rNow * Math.sin(ang);
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
        // 跃迁时发射光子
        const dE = En(ni) - En(nf);
        const lam = 1240 / dE;
        const pc = lam >= 380 && lam <= 780 ? waveColor(lam) : lam < 380 ? '#b18cff' : '#ff9d7a';
        if (t >= 3.1) {
          const ph = (t - 3.1) / 0.9;
          const px0 = ex + ph * 90, py0 = ey - ph * 50;
          // 波浪线光子
          ctx.strokeStyle = pc; ctx.lineWidth = 2.2;
          ctx.beginPath();
          for (let i = 0; i <= 30; i++) {
            const f = i / 30;
            const x = px0 + f * 34, y = py0 - f * 18 + Math.sin(f * Math.PI * 5) * 4;
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.stroke();
          ctx.fillStyle = pc; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('hν', px0 + 38, py0 - 24);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.font = '11.5px sans-serif';
      ctx.fillText(L('玻尔轨道模型（r ∝ n²）', 'Bohr orbits (r ∝ n²)'), 20, 26);
      // —— 右：能级图 ——
      const gL = W * 0.56, gR = W - 40, gT = 34, gB = H - 40;
      const EY = E => gT + (E + 13.6) / 13.6 * (gB - gT) * -1 + (gB - gT); // E=-13.6→gB, E=0→gT
      ctx.font = '11px sans-serif';
      for (let n = 1; n <= 6; n++) {
        const y = EY(En(n));
        ctx.strokeStyle = (valid && (n === ni || n === nf)) ? (n === ni ? '#60a5fa' : '#4ade80') : 'rgba(255,255,255,.4)';
        ctx.lineWidth = (valid && (n === ni || n === nf)) ? 2.6 : 1.4;
        ctx.beginPath(); ctx.moveTo(gL, y); ctx.lineTo(gR, y); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.8)';
        ctx.fillText(`n=${n}`, gL - 34, y + 4);
        ctx.fillText(`${fmtN(En(n),2)} eV`, gR + 4, y + 4);
      }
      // E=0 电离线
      ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(gL, EY(0)); ctx.lineTo(gR, EY(0)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.fillText(L('E = 0（电离 ionization）', 'E = 0 (ionization 电离)'), gL + 8, EY(0) - 6);
      if (valid) {
        const dE = En(ni) - En(nf);
        const lam = 1240 / dE;
        const pc = lam >= 380 && lam <= 780 ? waveColor(lam) : lam < 380 ? '#b18cff' : '#ff9d7a';
        pxArrow(ctx, (gL + gR) / 2, EY(En(ni)), (gL + gR) / 2, EY(En(nf)), { color: pc, width: 3.5 });
        ctx.fillStyle = pc; ctx.font = 'bold 12.5px sans-serif';
        ctx.fillText(`${ni} → ${nf}`, (gL + gR) / 2 + 10, (EY(En(ni)) + EY(En(nf))) / 2);
        const series = nf === 1 ? L('莱曼系 Lyman（紫外）', 'Lyman series (UV)') : nf === 2 ? L('巴耳末系 Balmer（可见光）', 'Balmer series (visible)') : nf === 3 ? L('帕邢系 Paschen（红外）', 'Paschen series (IR)') : L(`跃迁到 n=${nf}`, `transition to n=${nf}`);
        const band = lam < 380 ? L('紫外线 UV', 'ultraviolet UV') : lam > 780 ? L('红外线 IR', 'infrared IR') : L('可见光 ✨', 'visible light ✨');
        readout.set(L(`
          E${ni} = <b>${fmtN(En(ni),2)} eV</b> → E${nf} = <b>${fmtN(En(nf),2)} eV</b><br>
          光子能量 ΔE = <b>${fmtN(dE,3)} eV</b><br>
          波长 λ = 1240/ΔE = <b style="color:${pc}">${fmtN(lam,0)} nm</b><br>
          <span class="tag">${series}</span> <span class="tag">${band}</span><br>
          ${ni === 3 && nf === 2 ? '这就是著名的氢-α红线（Hα 656nm）！' : `从 n=1 电离需 13.6 eV（λ ≤ 91 nm）`}`, `
          E${ni} = <b>${fmtN(En(ni),2)} eV</b> → E${nf} = <b>${fmtN(En(nf),2)} eV</b><br>
          Photon energy ΔE = <b>${fmtN(dE,3)} eV</b><br>
          Wavelength λ = 1240/ΔE = <b style="color:${pc}">${fmtN(lam,0)} nm</b><br>
          <span class="tag">${series}</span> <span class="tag">${band}</span><br>
          ${ni === 3 && nf === 2 ? 'This is the famous hydrogen-alpha red line (Hα 656 nm)!' : `Ionization from n=1 takes 13.6 eV (λ ≤ 91 nm)`}`));
      } else {
        readout.set(L(`<span class="warn">初态 n 必须大于末态 n 才会放出光子</span><br>（反之则需要吸收光子向上跃迁）<br>请把"初态"调得比"末态"大。`,
                      `<span class="warn">The initial n must exceed the final n to emit a photon</span><br>(the reverse requires absorbing one)<br>Set "initial" above "final".`));
      }
    }
    [sni, snf].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
