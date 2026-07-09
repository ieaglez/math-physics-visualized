'use strict';
/* ===== 概率初步 Introduction to Probability（初中） ===== */
registerTopic({
  id: 'probability', cat: 'math', icon: '🎡', stage: 'junior',
  title: '概率初步', en: 'Probability Basics',
  desc: L('设置转盘的中奖扇区，先算理论概率，再转几百次看频率是否真的靠过来 —— 大数定律的第一次见面。',
          'Set the winning sectors, compute the theoretical probability, then spin hundreds of times and watch the frequency close in — your first meeting with the law of large numbers.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '概率初步（转盘实验）', en: 'Probability with a Spinner',
      tagline: L('概率是"理论值"，频率是"实验值"。转的次数越多，两者越接近 —— 但每一转依然完全随机。',
                 'Probability is the theory; frequency is the experiment. More spins bring them closer — yet every single spin stays perfectly random.'),
      formula: L('P(事件) = <span class="frac"><span>有利结果数</span><span class="den">等可能结果总数</span></span>　·　频率 = <span class="frac"><span>发生次数</span><span class="den">试验次数</span></span> → 趋近 P',
                 'P(event) = <span class="frac"><span>favorable outcomes</span><span class="den">equally likely outcomes</span></span>　·　frequency = <span class="frac"><span>hits</span><span class="den">trials</span></span> → approaches P'),
      explainHTML: L(`
        <h2>古典概型 <span class="en">Classical Probability</span></h2>
        <div class="formula">P(A) = <span class="frac"><span>事件 A 包含的结果数 m</span><span class="den">所有等可能结果数 n</span></span>
          <span class="note">前提：每个结果<b>等可能</b>。转盘每个扇区同样大、骰子每面同样重，才能这么算</span></div>
        <ul>
          <li>P 介于 0（不可能）与 1（必然）之间；</li>
          <li>掷骰子出 6 点：P = 1/6；抽到红桃：P = 13/52 = 1/4；</li>
          <li><b>互补</b>：P(不中奖) = 1 − P(中奖)。</li>
        </ul>
        <h2>频率与概率 <span class="en">Frequency vs. Probability</span></h2>
        <ul>
          <li><span class="term">频率 <span class="en">(frequency)</span></span>是做实验数出来的：发生次数 ÷ 试验次数；</li>
          <li>试验次数越多，频率越<b>稳定地靠近</b>概率 —— 这是<span class="term">大数定律 <span class="en">(law of large numbers)</span></span>的雏形；</li>
          <li>但概率<b>没有记忆</b>：连转 5 次没中，第 6 次的中奖概率一分不涨（赌徒谬误！）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 设 8 个扇区、3 个中奖：P = 3/8 = 0.375；② 点「转 1 次」几次，感受结果的随机；③ 点「转 100 次」几轮，看频率折线越抖越小、缠上红色的理论线 —— 这就是保险公司和赌场稳赚的数学原因。</div>
        <div class="think"><b>思考一下：</b>天气预报"降水概率 70%"是什么意思？（在大量"和今天条件相同"的日子里，约 70% 下了雨 —— 概率描述的是长期频率，不是单次保证。）</div>
      `, `
        <h2>Classical Probability <span class="en">古典概型</span></h2>
        <div class="formula">P(A) = <span class="frac"><span>outcomes in event A (m)</span><span class="den">all equally likely outcomes (n)</span></span>
          <span class="note">Requirement: outcomes must be <b>equally likely</b> — equal sectors on the spinner, a fair die</span></div>
        <ul>
          <li>P lies between 0 (impossible) and 1 (certain);</li>
          <li>Rolling a 6: P = 1/6; drawing a heart: P = 13/52 = 1/4;</li>
          <li><b>Complement</b>: P(no win) = 1 − P(win).</li>
        </ul>
        <h2>Frequency vs. Probability <span class="en">频率与概率</span></h2>
        <ul>
          <li><span class="term">Frequency <span class="en">(频率)</span></span> is counted from experiments: hits ÷ trials;</li>
          <li>More trials make the frequency settle <b>steadily closer</b> to the probability — the seed of the <span class="term">law of large numbers <span class="en">(大数定律)</span></span>;</li>
          <li>But probability has <b>no memory</b>: five losing spins in a row raise the sixth spin's chance by exactly nothing (the gambler's fallacy!).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Set 8 sectors with 3 winners: P = 3/8 = 0.375; ② Hit "spin once" a few times and feel the randomness; ③ Hit "spin ×100" several times and watch the frequency line's wobble shrink onto the red theory line — the mathematical reason insurers and casinos always win in the long run.</div>
        <div class="think"><b>Think about it:</b> What does "70% chance of rain" mean? (Across many days with conditions like today's, about 70% saw rain — probability describes long-run frequency, not a single-day guarantee.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const sn = addSlider(panel, { label: L('扇区总数 n', 'Total sectors n'), en: L('sectors', '扇区'), min: 2, max: 12, step: 1, value: 8 });
    const sm = addSlider(panel, { label: L('中奖扇区数 m', 'Winning sectors m'), en: L('winning', '中奖'), min: 1, max: 11, step: 1, value: 3 });
    const row = h('div', 'btn-row');
    const b1 = h('button', 'btn', L('🎯 转 1 次', '🎯 Spin once'));
    const b100 = h('button', 'btn primary', L('⚡ 转 100 次', '⚡ Spin ×100'));
    const b0 = h('button', 'btn', L('↺ 清零', '↺ Reset'));
    row.append(b1, b100, b0);
    panel.appendChild(row);
    const readout = addReadout(panel);
    let trials = 0, hits = 0, history = [], lastAngle = 0.3;

    function spin(times) {
      const n = sn.value, m = Math.min(sm.value, n - 1);
      for (let i = 0; i < times; i++) {
        const r = Math.floor(Math.random() * n);
        trials++;
        if (r < m) hits++;
        if (trials % Math.max(1, Math.round(times / 60)) === 0 || times === 1) {
          history.push(hits / trials);
          if (history.length > 300) history.shift();
        }
        lastAngle = (r + 0.5) / n * Math.PI * 2;
      }
      draw();
    }
    b1.onclick = () => spin(1);
    b100.onclick = () => spin(100);
    b0.onclick = () => { trials = 0; hits = 0; history = []; draw(); };

    function draw() {
      const n = sn.value, m = Math.min(sm.value, n - 1);
      const P = m / n;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 左：转盘 ——
      const cx = W * 0.26, cy = H / 2, R = Math.min(H * 0.36, W * 0.2);
      for (let i = 0; i < n; i++) {
        const a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2;
        ctx.fillStyle = i < m ? '#fbbf24' : '#e3e6f5';
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1); ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      }
      // 指针（指向 lastAngle）
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(lastAngle);
      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.moveTo(R * 0.92, 0); ctx.lineTo(R * 0.55, -8); ctx.lineTo(R * 0.55, 8); ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.fillStyle = '#475569';
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#92400e'; ctx.font = 'bold 12.5px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(L(`黄色 = 中奖（${m}/${n}）`, `gold = win (${m}/${n})`), cx, cy + R + 24);
      ctx.textAlign = 'left';
      // —— 右：频率收敛折线 ——
      const gL = W * 0.5, gR = W - 26, gT = 44, gB = H - 46;
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gL, gT); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif';
      ctx.fillText('1.0', gL - 26, gT + 4);
      ctx.fillText('0', gL - 14, gB + 4);
      ctx.fillText(L('试验进程 →', 'trials →'), gR - 64, gB + 16);
      const FY = p => gB - p * (gB - gT);
      // 理论概率线
      ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
      ctx.beginPath(); ctx.moveTo(gL, FY(P)); ctx.lineTo(gR, FY(P)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.red; ctx.font = 'bold 11.5px sans-serif';
      ctx.fillText('P = ' + fmtN(P, 3), gR - 62, FY(P) - 6);
      // 频率折线
      if (history.length > 1) {
        ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
        ctx.beginPath();
        history.forEach((p, i) => {
          const x = gL + i / (history.length - 1) * (gR - gL);
          i ? ctx.lineTo(x, FY(p)) : ctx.moveTo(x, FY(p));
        });
        ctx.stroke();
      }
      const freq = trials ? hits / trials : 0;
      readout.set(L(`
        理论概率 P = m/n = ${m}/${n} = <b style="color:${C.red}">${fmtN(P,3)}</b><br>
        已转 <b>${trials}</b> 次，中奖 <b>${hits}</b> 次<br>
        实验频率 = <b style="color:${C.blue}">${trials ? fmtN(freq,3) : '—'}</b><br>
        ${trials ? `偏差 |频率−P| = <b>${fmtN(Math.abs(freq - P),3)}</b> ${trials >= 300 ? '<span class="tag">次数多了，贴得很近！</span>' : '（继续转，看它贴近红线）'}` : L('点按钮开始实验', 'Press a button to start')}<br>
        P(不中奖) = 1 − P = <b>${fmtN(1 - P,3)}</b>`, `
        Theoretical P = m/n = ${m}/${n} = <b style="color:${C.red}">${fmtN(P,3)}</b><br>
        Spun <b>${trials}</b> times, won <b>${hits}</b><br>
        Experimental frequency = <b style="color:${C.blue}">${trials ? fmtN(freq,3) : '—'}</b><br>
        ${trials ? `Gap |freq − P| = <b>${fmtN(Math.abs(freq - P),3)}</b> ${trials >= 300 ? '<span class="tag">many trials — hugging the line!</span>' : '(keep spinning and watch it close in)'}` : 'Press a button to start'}<br>
        P(no win) = 1 − P = <b>${fmtN(1 - P,3)}</b>`));
    }
    [sn, sm].forEach(s => s.onChange(() => { trials = 0; hits = 0; history = []; draw(); }));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
