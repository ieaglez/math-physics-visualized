'use strict';
/* ===== 原子核物理 Nuclear Physics ===== */
registerTopic({
  id: 'nuclear', cat: 'modern', icon: '☢️',
  title: '原子核与半衰期', en: 'Nuclear Physics',
  desc: L('看 400 个放射性原子核随机衰变：单个原子完全不可预测，整体却精确服从半衰期规律。',
          'Watch 400 radioactive nuclei decay at random: each atom is utterly unpredictable, yet the crowd obeys the half-life law with precision.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '原子核与半衰期', en: 'The Nucleus & Half-Life',
      tagline: L('点播放：蓝点（未衰变）随机变灰。每过一个半衰期 T，剩余数量减半 —— 右侧曲线紧贴理论指数线。',
                 'Press play: blue dots (undecayed) flip gray at random. Every half-life T the survivors halve — and the curve hugs the theoretical exponential.'),
      formula: L('N = N₀·(½)<sup>t/T</sup>　·　α：氦核 ⁴₂He　β：电子 e⁻　γ：光子　·　E = mc²',
                 'N = N₀·(½)<sup>t/T</sup>　·　α: helium nucleus ⁴₂He　β: electron e⁻　γ: photon　·　E = mc²'),
      explainHTML: L(`
        <h2>原子核的组成 <span class="en">Inside the Nucleus</span></h2>
        <p>原子核由<span class="term">质子 <span class="en">(protons)</span></span>和<span class="term">中子 <span class="en">(neutrons)</span></span>组成，
        记作 <sup>A</sup><sub>Z</sub>X：Z 是质子数（决定元素种类），A 是质量数（质子 + 中子）。
        同 Z 不同 A 的核互为<span class="term">同位素 <span class="en">(isotopes)</span></span>（如碳-12 与碳-14）。</p>
        <h2>三种射线 <span class="en">Three Kinds of Radiation</span></h2>
        <ul>
          <li><b>α 射线</b>：氦核 ⁴₂He —— 电离能力最强，穿透最弱（一张纸就挡住）；衰变后 Z−2、A−4；</li>
          <li><b>β 射线</b>：高速电子（中子变质子放出）—— 穿透中等（几毫米铝板）；衰变后 Z+1、A 不变；</li>
          <li><b>γ 射线</b>：高频光子 —— 不带电、穿透最强（需厚铅板/混凝土），常伴随 α、β 产生。</li>
        </ul>
        <h2>半衰期：统计的确定性 <span class="en">Half-Life: Statistical Certainty</span></h2>
        <div class="formula">N = N₀·(½)<sup>t/T</sup>
          <span class="note">T 是半衰期：任何时刻起，再过 T，剩余未衰变的核减半。碳-14 的 T = 5730 年 —— 考古测年的时钟</span></div>
        <ul>
          <li><b>单个核何时衰变完全随机</b>，不受温度、压强、化学状态影响 —— 但大量核的整体行为精确可预测；</li>
          <li>过 1 个 T 剩 1/2，2 个 T 剩 1/4，10 个 T 剩约千分之一。</li>
        </ul>
        <h2>裂变、聚变与 E = mc² <span class="en">Fission, Fusion &amp; E = mc²</span></h2>
        <ul>
          <li><span class="term">裂变 <span class="en">(fission)</span></span>：重核（铀-235）分裂 + 链式反应 —— 核电站与原子弹；</li>
          <li><span class="term">聚变 <span class="en">(fusion)</span></span>：轻核（氢）聚合成氦 —— 太阳发光、氢弹、"人造太阳"托卡马克；</li>
          <li>能量来自<b>质量亏损</b>：Δm 的质量凭空"消失"，变成 E = Δmc² 的能量 —— 1 克质量 ≈ 9×10¹³ J ≈ 2.1 万吨 TNT。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 点播放，盯住任何一个蓝点 —— 你无法预测它何时变灰；② 看读数：每过一个 T，剩余数几乎恰好减半（有随机涨落，这正是统计规律的味道）；③ 多按几次重置，蓝线每次路径不同，却始终缠着红色理论线。</div>
        <div class="think"><b>思考一下：</b>考古学家测出某古木中碳-14 只剩活树的 1/8，这棵树死了多少年？（1/8 = (½)³ → 3 个半衰期 ≈ 17190 年。）</div>
      `, `
        <h2>Inside the Nucleus <span class="en">原子核的组成</span></h2>
        <p>A nucleus holds <span class="term">protons <span class="en">(质子)</span></span> and <span class="term">neutrons <span class="en">(中子)</span></span>,
        written <sup>A</sup><sub>Z</sub>X: Z counts protons (fixing the element), A the mass number (protons + neutrons).
        Same Z, different A → <span class="term">isotopes <span class="en">(同位素)</span></span> (carbon-12 vs carbon-14).</p>
        <h2>Three Kinds of Radiation <span class="en">三种射线</span></h2>
        <ul>
          <li><b>α rays</b>: helium nuclei ⁴₂He — most ionizing, least penetrating (a sheet of paper stops them); daughter: Z−2, A−4;</li>
          <li><b>β rays</b>: fast electrons (a neutron turning into a proton) — medium penetration (mm of aluminium); daughter: Z+1, A unchanged;</li>
          <li><b>γ rays</b>: high-frequency photons — uncharged, most penetrating (thick lead/concrete), usually alongside α or β.</li>
        </ul>
        <h2>Half-Life: Statistical Certainty <span class="en">半衰期</span></h2>
        <div class="formula">N = N₀·(½)<sup>t/T</sup>
          <span class="note">T is the half-life: from any moment, wait T and the surviving nuclei halve. Carbon-14: T = 5730 years — archaeology's clock</span></div>
        <ul>
          <li><b>When a single nucleus decays is pure chance</b> — untouched by temperature, pressure or chemistry — yet the crowd is precisely predictable;</li>
          <li>After 1 T: ½ left; 2 T: ¼; 10 T: about one in a thousand.</li>
        </ul>
        <h2>Fission, Fusion &amp; E = mc² <span class="en">裂变、聚变与质能方程</span></h2>
        <ul>
          <li><span class="term">Fission <span class="en">(裂变)</span></span>: heavy nuclei (U-235) split, chain-reacting — power plants and the atomic bomb;</li>
          <li><span class="term">Fusion <span class="en">(聚变)</span></span>: light nuclei (hydrogen) merge into helium — the Sun, H-bombs, tokamak "artificial suns";</li>
          <li>The energy comes from the <b>mass defect</b>: a missing Δm becomes E = Δmc² — one gram ≈ 9×10¹³ J ≈ 21 kilotons of TNT.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Press play and stare at one blue dot — you cannot tell when it will flip; ② Watch the readout: after each T the survivors nearly exactly halve (with fluctuations — the very flavor of statistics); ③ Reset several times: the blue curve wanders differently each run yet always hugs the red theory line.</div>
        <div class="think"><b>Think about it:</b> An ancient timber holds only 1/8 of a living tree's carbon-14 — how old is it? (1/8 = (½)³ → 3 half-lives ≈ 17,190 years.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sT = addSlider(panel, { label: L('半衰期 T', 'Half-life T'), en: L('half-life', '半衰期'), min: 2, max: 12, step: 0.5, value: 5, unit: 's' });
    const readout = addReadout(panel);
    const N0 = 400, COLS = 25, ROWS = 16;
    let alive = new Array(N0).fill(true);
    let history = [[0, N0]];
    const anim = makeAnimator(dt => {
      const T = sT.value;
      const p = 1 - Math.pow(0.5, dt / T);
      let changed = false;
      for (let i = 0; i < N0; i++) {
        if (alive[i] && Math.random() < p) { alive[i] = false; changed = true; }
      }
      const n = alive.filter(Boolean).length;
      history.push([anim.t, n]);
      if (anim.t > 5 * T || n === 0) { anim.stop(); play.sync(); }
      draw();
    });
    const play = addPlayControls(panel, anim, {
      onReset: () => { alive = new Array(N0).fill(true); history = [[0, N0]]; draw(); }
    });

    function draw() {
      const T = sT.value;
      const t = anim.t;
      const n = alive.filter(Boolean).length;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 左：原子点阵 ——
      const gridW = W * 0.44, m0 = 24;
      const cellX = (gridW - m0 * 2) / COLS, cellY = (H - 92) / ROWS;
      for (let i = 0; i < N0; i++) {
        const gx = m0 + (i % COLS) * cellX + cellX / 2;
        const gy = 44 + Math.floor(i / COLS) * cellY + cellY / 2;
        ctx.fillStyle = alive[i] ? '#5b5bf0' : '#d7dae8';
        ctx.beginPath(); ctx.arc(gx, gy, Math.min(cellX, cellY) * 0.32, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif';
      ctx.fillText(L(`未衰变 ${n} / ${N0}`, `${n} / ${N0} undecayed`), m0, 28);
      // —— 右：衰变曲线 ——
      const gL = gridW + 46, gR = W - 24, gT = 40, gB = H - 46;
      const tMax = 5 * T;
      const GX = tt => gL + Math.min(tt / tMax, 1) * (gR - gL);
      const GY = nn => gB - nn / N0 * (gB - gT);
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gL, gT); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('N', gL + 4, gT + 4);
      ctx.fillText('t', gR - 8, gB + 14);
      // 半衰期网格：T, 2T, 3T... 与 N0/2, N0/4...
      for (let k = 1; k <= 5; k++) {
        ctx.strokeStyle = '#eef0f8';
        ctx.beginPath(); ctx.moveTo(GX(k * T), gT); ctx.lineTo(GX(k * T), gB); ctx.stroke();
        ctx.fillStyle = '#9aa1b5';
        ctx.fillText(k + 'T', GX(k * T) - 6, gB + 14);
        if (k <= 3) {
          const nk = N0 / Math.pow(2, k);
          ctx.strokeStyle = '#f6e7c8'; ctx.setLineDash([4, 4]);
          ctx.beginPath(); ctx.moveTo(gL, GY(nk)); ctx.lineTo(gR, GY(nk)); ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillText('N₀/' + Math.pow(2, k), gL - 38, GY(nk) + 4);
        }
      }
      // 理论曲线
      ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.setLineDash([7, 5]);
      ctx.beginPath();
      for (let tt = 0; tt <= tMax; tt += tMax / 150) {
        const X = GX(tt), Y = GY(N0 * Math.pow(0.5, tt / T));
        tt === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.red; ctx.font = 'bold 11px sans-serif';
      ctx.fillText(L('理论 N₀(½)^(t/T)', 'theory N₀(½)^(t/T)'), gR - 118, gT + 12);
      // 实验曲线
      if (history.length > 1) {
        ctx.strokeStyle = C.blue; ctx.lineWidth = 2.4;
        ctx.beginPath();
        history.forEach(([tt, nn], i) => {
          const X = GX(tt), Y = GY(nn);
          i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
        });
        ctx.stroke();
      }
      const theo = N0 * Math.pow(0.5, t / T);
      const halves = t / T;
      readout.set(L(`
        t = <b>${fmtN(t,1)} s</b> = <b>${fmtN(halves,2)}</b> 个半衰期（T = ${fmtN(T,1)} s）<br>
        实验剩余 N = <b style="color:${C.blue}">${n}</b>　理论值 = <b style="color:${C.red}">${fmtN(theo,0)}</b><br>
        已衰变 <b>${N0 - n}</b> 个（${fmtN((N0 - n) / N0 * 100,0)}%）<br>
        ${halves >= 0.9 && halves <= 1.1 ? '<span class="tag">恰好一个半衰期：剩约一半 ✓</span>' :
          n === 0 ? '<span class="tag">全部衰变完毕</span>' : L('单个原子不可预测，整体精确减半', 'One atom: unpredictable. The crowd: halves on schedule')}<br>
        E = mc²：1 g 质量亏损 ≈ <b>9×10¹³ J</b>`, `
        t = <b>${fmtN(t,1)} s</b> = <b>${fmtN(halves,2)}</b> half-lives (T = ${fmtN(T,1)} s)<br>
        Surviving N = <b style="color:${C.blue}">${n}</b>　theory = <b style="color:${C.red}">${fmtN(theo,0)}</b><br>
        Decayed: <b>${N0 - n}</b> (${fmtN((N0 - n) / N0 * 100,0)}%)<br>
        ${halves >= 0.9 && halves <= 1.1 ? '<span class="tag">exactly one half-life: about half remain ✓</span>' :
          n === 0 ? '<span class="tag">all decayed</span>' : 'One atom: unpredictable. The crowd: halves on schedule'}<br>
        E = mc²: a 1 g mass defect ≈ <b>9×10¹³ J</b>`));
    }
    sT.onChange(() => { alive = new Array(N0).fill(true); history = [[0, N0]]; anim.stop(); anim.t = 0; play.sync(); draw(); });
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
