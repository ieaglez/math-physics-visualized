'use strict';
/* ===== 声音的特性 Properties of Sound（初中） ===== */
registerTopic({
  id: 'sound', cat: 'mech', icon: '🔊', stage: 'junior',
  title: '声音的特性', en: 'Properties of Sound',
  desc: L('调节频率和振幅，看波形如何变化 —— 音调、响度、音色，原来都写在波形里。',
          'Tune frequency and amplitude and watch the waveform change — pitch, loudness and timbre are all written in the wave.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '声音的特性', en: 'Properties of Sound',
      tagline: L('同一个音符，长笛和小提琴为什么听起来不同？切换"音色"看看波形的差别。',
                 'Why do a flute and a violin sound different on the same note? Switch the "timbre" and compare the waveforms.'),
      formula: L('音调 ↔ 频率 f（Hz）　·　响度 ↔ 振幅 A　·　音色 ↔ 波形　·　T = 1/f',
                 'Pitch ↔ frequency f (Hz)　·　Loudness ↔ amplitude A　·　Timbre ↔ waveform　·　T = 1/f'),
      explainHTML: L(`
        <h2>声音是振动 <span class="en">Sound is Vibration</span></h2>
        <p>一切发声体都在<span class="term">振动 <span class="en">(vibrating)</span></span>：声带、琴弦、音叉……
        振动通过空气以<span class="term">声波 <span class="en">(sound wave)</span></span>的形式传到耳朵。声音不能在真空中传播；15℃ 空气中声速约 340 m/s。</p>
        <h2>三个特性 <span class="en">The Three Properties</span></h2>
        <ul>
          <li><b>音调 <span class="en">(pitch)</span></b>：由<b>频率</b>决定 —— 每秒振动次数越多，音越"高"。人耳能听到约 20 Hz ~ 20000 Hz；女高音、小提琴 E 弦是高频，大鼓是低频；</li>
          <li><b>响度 <span class="en">(loudness)</span></b>：由<b>振幅</b>决定 —— 振动幅度越大，声音越"响"。用力敲鼓，鼓面振幅变大；</li>
          <li><b>音色 <span class="en">(timbre)</span></b>：由<b>波形</b>决定 —— 同样的频率和响度，波形不同听感就不同。乐器的"个性"来自基音上叠加的<span class="term">泛音 <span class="en">(overtones)</span></span>。</li>
        </ul>
        <h2>频率与周期 <span class="en">Frequency &amp; Period</span></h2>
        <div class="formula">T = <span class="frac"><span>1</span><span class="den">f</span></span>　　波长 λ = <span class="frac"><span>v</span><span class="den">f</span></span>
          <span class="note">440 Hz 的标准音 A：每秒振动 440 次，周期约 2.27 ms，波长约 0.77 m</span></div>
        <div class="tip"><b>实验建议：</b>① 把频率从 200 Hz 拉到 2000 Hz，波形被"压密"—— 这就是音调升高；② 只调振幅：波形变高但疏密不变 —— 响度变了、音调没变；③ 切换三种音色，注意它们频率相同（一样"高"）但形状不同 —— 这就是你能分辨乐器的原因。</div>
        <div class="think"><b>思考一下：</b>蚊子和蜜蜂从耳边飞过，为什么蚊子是尖锐的"嗡——"而蜜蜂低沉？（提示：翅膀每秒扇动次数：蚊子约 600 次，蜜蜂约 200 次。）</div>
      `, `
        <h2>Sound is Vibration <span class="en">声音是振动</span></h2>
        <p>Everything that makes sound is <span class="term">vibrating <span class="en">(振动)</span></span>: vocal cords, strings, tuning forks…
        The vibration travels through air as a <span class="term">sound wave <span class="en">(声波)</span></span>. Sound cannot travel in vacuum; in 15 ℃ air it moves at about 340 m/s.</p>
        <h2>The Three Properties <span class="en">三个特性</span></h2>
        <ul>
          <li><b>Pitch <span class="en">(音调)</span></b>: set by <b>frequency</b> — more vibrations per second means a "higher" sound. Human hearing spans roughly 20 Hz–20,000 Hz; a soprano or violin E string is high-frequency, a bass drum low;</li>
          <li><b>Loudness <span class="en">(响度)</span></b>: set by <b>amplitude</b> — a bigger swing means a louder sound. Hit the drum harder and its skin swings wider;</li>
          <li><b>Timbre <span class="en">(音色)</span></b>: set by the <b>waveform</b> — same pitch and loudness can still sound different. An instrument's "personality" comes from the <span class="term">overtones <span class="en">(泛音)</span></span> stacked on the fundamental.</li>
        </ul>
        <h2>Frequency &amp; Period <span class="en">频率与周期</span></h2>
        <div class="formula">T = <span class="frac"><span>1</span><span class="den">f</span></span>　　wavelength λ = <span class="frac"><span>v</span><span class="den">f</span></span>
          <span class="note">Concert pitch A at 440 Hz: 440 vibrations per second, period ≈ 2.27 ms, wavelength ≈ 0.77 m</span></div>
        <div class="tip"><b>Try this:</b> ① Sweep the frequency from 200 Hz to 2000 Hz — the waveform gets "squeezed": that's pitch rising; ② Change only the amplitude: taller waves, same spacing — louder, not higher; ③ Switch among the three timbres: same frequency (equally "high") but different shapes — why you can tell instruments apart.</div>
        <div class="think"><b>Think about it:</b> A mosquito whines shrilly while a bee hums low as they pass your ear — why? (Hint: wingbeats per second — mosquito ≈ 600, bee ≈ 200.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 430);
    const timbre = addSeg(panel, {
      options: [
        { label: L('纯音', 'Pure tone'), value: 'sine' },
        { label: L('小提琴感', 'Violin-ish'), value: 'violin' },
        { label: L('方波', 'Square'), value: 'square' }
      ],
      value: 'sine', onChange: () => draw()
    });
    const sf = addSlider(panel, { label: L('频率 f（音调）', 'Frequency f (pitch)'), en: L('frequency', '频率'), min: 100, max: 2000, step: 10, value: 440, unit: 'Hz' });
    const sA = addSlider(panel, { label: L('振幅 A（响度）', 'Amplitude A (loudness)'), en: L('amplitude', '振幅'), min: 0.1, max: 1, step: 0.05, value: 0.6 });
    const readout = addReadout(panel);
    const anim = makeAnimator(() => draw());
    addPlayControls(panel, anim, {});
    anim.start();

    function waveAt(ph) { // ph 为相位（周期数）
      const t = timbre.value;
      if (t === 'sine') return Math.sin(2 * Math.PI * ph);
      if (t === 'square') return Math.sign(Math.sin(2 * Math.PI * ph)) * 0.85;
      // 小提琴感：基频 + 2、3 次泛音
      return 0.7 * Math.sin(2 * Math.PI * ph) + 0.35 * Math.sin(4 * Math.PI * ph) + 0.2 * Math.sin(6 * Math.PI * ph);
    }

    function draw() {
      const f = sf.value, A = sA.value;
      const win = 0.01; // 显示 10ms
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0b1026'; ctx.fillRect(0, 0, W, H);
      const gL = 54, gR = W - 20, midY = H / 2;
      const GX = t => gL + t / win * (gR - gL);
      const GY = y => midY - y * (H / 2 - 46);
      // 网格与轴
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1;
      for (let ms = 0; ms <= 10; ms += 1) {
        ctx.beginPath(); ctx.moveTo(GX(ms / 1000), 30); ctx.lineTo(GX(ms / 1000), H - 34); ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(255,255,255,.35)';
      ctx.beginPath(); ctx.moveTo(gL, midY); ctx.lineTo(gR, midY); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = '11px sans-serif';
      [0, 2, 4, 6, 8, 10].forEach(ms => ctx.fillText(ms + ' ms', GX(ms / 1000) - 10, H - 16));
      // 波形（随时间滚动）
      const t0 = anim.t * 0.35;
      ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (let px = gL; px <= gR; px += 1.5) {
        const t = (px - gL) / (gR - gL) * win;
        const y = A * waveAt(f * (t + t0));
        px === gL ? ctx.moveTo(px, GY(y)) : ctx.lineTo(px, GY(y));
      }
      ctx.stroke();
      // 周期标注（第一个完整周期）
      const T = 1 / f;
      if (T < win * 0.9) {
        ctx.strokeStyle = '#facc15'; ctx.lineWidth = 1.6;
        const y0 = 40;
        ctx.beginPath(); ctx.moveTo(GX(0.001), y0); ctx.lineTo(GX(0.001 + T), y0); ctx.stroke();
        ctx.fillStyle = '#facc15'; ctx.font = 'bold 12px sans-serif';
        ctx.fillText(L('一个周期 T', 'one period T'), GX(0.001) + 4, y0 - 6);
      }
      // 振幅标注
      ctx.strokeStyle = 'rgba(251,146,60,.8)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(gL, GY(A)); ctx.lineTo(gR, GY(A)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fb923c'; ctx.font = '11.5px sans-serif';
      ctx.fillText('A', gL - 16, GY(A) + 4);
      const lam = 340 / f;
      const note = f < 300 ? L('低沉（像大鼓/男低音）', 'low (bass drum / bass voice)') :
                   f < 800 ? L('中音区（像人声/吉他）', 'mid range (voice / guitar)') :
                   L('尖锐（像哨声/小提琴高把位）', 'shrill (whistle / high violin)');
      readout.set(L(`
        频率 f = <b>${fmtN(f,0)} Hz</b>（每秒振动 ${fmtN(f,0)} 次）<br>
        周期 T = 1/f = <b>${fmtN(1000/f,2)} ms</b><br>
        波长 λ = 340/f = <b>${fmtN(lam,2)} m</b>（15℃ 空气）<br>
        听感：<span class="tag">${note}</span><br>
        ${Math.abs(f - 440) < 6 ? '<span class="tag">≈440 Hz：乐队调音的标准音 A！</span>' : L('振幅越大响度越大，但音调不变', 'Bigger amplitude = louder, pitch unchanged')}`, `
        Frequency f = <b>${fmtN(f,0)} Hz</b> (${fmtN(f,0)} vibrations per second)<br>
        Period T = 1/f = <b>${fmtN(1000/f,2)} ms</b><br>
        Wavelength λ = 340/f = <b>${fmtN(lam,2)} m</b> (air, 15 ℃)<br>
        It sounds: <span class="tag">${note}</span><br>
        ${Math.abs(f - 440) < 6 ? '<span class="tag">≈440 Hz: concert pitch A — the tuning standard!</span>' : 'Bigger amplitude = louder; the pitch stays put'}`));
    }
    [sf, sA].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
