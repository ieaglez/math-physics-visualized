'use strict';
/* ===== 滑轮与滑轮组 Pulleys（初中） ===== */
registerTopic({
  id: 'pulley', cat: 'mech', icon: '🪝', stage: 'junior',
  title: '滑轮与滑轮组', en: 'Pulleys',
  desc: L('增加承担重物的绳子段数 n，拉力变成 G/n —— 但要多拉 n 倍的绳子。省力不省功！',
          'Add rope strands n and the pull drops to G/n — but you must haul n times the rope. Force saved, work never.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '滑轮与滑轮组', en: 'Pulleys & Pulley Systems',
      tagline: L('点播放拉起重物：数一数有几段绳子吊着动滑轮，拉力就除以几 —— 代价是手要拉得更长。',
                 'Press play to hoist the load: count the strands holding the movable pulley — the pull divides by that number, at the cost of pulling more rope.'),
      formula: L('拉力 F = <span class="frac"><span>G</span><span class="den">n</span></span>（n = 承重绳段数，不计摩擦与轮重）　·　绳端移动距离 s = n·h',
                 'Pull F = <span class="frac"><span>G</span><span class="den">n</span></span> (n = supporting strands; friction & pulley weight ignored)　·　rope pulled s = n·h'),
      explainHTML: L(`
        <h2>两种滑轮 <span class="en">Two Kinds of Pulley</span></h2>
        <ul>
          <li><span class="term">定滑轮 <span class="en">(fixed pulley)</span></span>：轴固定不动。<b>不省力</b>（F = G），只<b>改变力的方向</b> —— 升旗杆顶端那个；本质是等臂杠杆；</li>
          <li><span class="term">动滑轮 <span class="en">(movable pulley)</span></span>：随重物一起动。<b>省一半力</b>（F = G/2），但要拉两倍绳；本质是动力臂 = 2×阻力臂的杠杆；</li>
          <li><span class="term">滑轮组 <span class="en">(pulley system)</span></span>：定滑轮 + 动滑轮组合 —— 既省力又能改方向。</li>
        </ul>
        <h2>关键：数绳子段数 <span class="en">Count the Strands</span></h2>
        <div class="formula">F = <span class="frac"><span>G</span><span class="den">n</span></span>　　s = n·h　　（n = 吊着动滑轮的绳子段数）</div>
        <ul>
          <li>重物升高 h，绳端要拉出 n·h —— <b>省几倍力，就费几倍距离</b>；</li>
          <li>功不打折：F·s = (G/n)·(n·h) = G·h —— <span class="term">功的原理 <span class="en">(principle of work)</span></span>：任何机械都不省功；</li>
          <li>实际还要克服摩擦和动滑轮自重，所以真实拉力略大于 G/n（机械效率 &lt; 100%，下一课细说）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① n = 1（定滑轮）：拉力 = 重力，只是方向变了；② 把 n 调到 4：拉力变 1/4，但注意读数里绳端要拉 4 倍距离；③ 点播放对比：重物慢慢升，手上的绳"呼呼"地出 —— 亲眼看到"费距离"。</div>
        <div class="think"><b>思考一下：</b>起重机、健身房的配重器械、窗帘拉绳里都藏着滑轮组。如果想用 100 N 的力吊起 500 N 的货物，至少需要几段绳子承重？</div>
      `, `
        <h2>Two Kinds of Pulley <span class="en">两种滑轮</span></h2>
        <ul>
          <li><span class="term">Fixed pulley <span class="en">(定滑轮)</span></span>: axle fixed. <b>No force saved</b> (F = G) — it only <b>redirects</b> the pull (the one atop a flagpole); really an equal-arm lever;</li>
          <li><span class="term">Movable pulley <span class="en">(动滑轮)</span></span>: rides with the load. <b>Halves the force</b> (F = G/2) at the cost of double rope; really a lever with effort arm = 2 × load arm;</li>
          <li><span class="term">Pulley system <span class="en">(滑轮组)</span></span>: fixed + movable combined — saves force <em>and</em> redirects it.</li>
        </ul>
        <h2>The Key: Count the Strands <span class="en">数绳子段数</span></h2>
        <div class="formula">F = <span class="frac"><span>G</span><span class="den">n</span></span>　　s = n·h　　(n = strands holding the movable pulley)</div>
        <ul>
          <li>Raising the load by h pulls out n·h of rope — <b>save force n times, pay distance n times</b>;</li>
          <li>Work never discounts: F·s = (G/n)·(n·h) = G·h — the <span class="term">principle of work <span class="en">(功的原理)</span></span>: no machine saves work;</li>
          <li>Real systems also fight friction and the pulley's own weight, so the true pull slightly exceeds G/n (efficiency &lt; 100% — next lesson).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① n = 1 (fixed pulley): pull = weight, only the direction changes; ② Set n to 4: the pull drops to 1/4 — but check the readout: you must haul 4× the rope; ③ Press play and compare: the load creeps up while rope streams through your hand — "paying with distance", visible.</div>
        <div class="think"><b>Think about it:</b> Cranes, gym weight stacks and curtain cords all hide pulley systems. To lift 500 N with only 100 N of pull, how many supporting strands do you need at minimum?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const sG = addSlider(panel, { label: L('重物 G', 'Load G'), en: L('load', '重物'), min: 100, max: 600, step: 20, value: 400, unit: 'N' });
    const sn = addSlider(panel, { label: L('承重绳段数 n', 'Strands n'), en: L('strands', '段数'), min: 1, max: 5, step: 1, value: 2 });
    const readout = addReadout(panel);
    let hLift = 0;
    const anim = makeAnimator(dt => {
      hLift += dt * 0.35;
      if (hLift >= 1.6) { hLift = 1.6; anim.stop(); play.sync(); }
      draw();
    });
    const play = addPlayControls(panel, anim, { onReset: () => { hLift = 0; draw(); } });

    function draw() {
      const G = sG.value, n = sn.value;
      const F = G / n;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const cx = W / 2 - 40, topY = 54;
      const scale = 70;
      const loadY0 = H - 96, loadY = loadY0 - hLift * scale;
      // 天花板
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx - 140, topY); ctx.lineTo(cx + 180, topY); ctx.stroke();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
      for (let x = cx - 130; x <= cx + 172; x += 16) {
        ctx.beginPath(); ctx.moveTo(x, topY); ctx.lineTo(x - 8, topY - 9); ctx.stroke();
      }
      const R = 18;
      const pulley = (x, y, col) => {
        ctx.fillStyle = col; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.beginPath(); ctx.arc(x, y, 3.4, 0, Math.PI * 2); ctx.fill();
      };
      const fixedY = topY + 34;
      const movY = loadY - 34;
      // 绳段：在定滑轮与动滑轮间画 n 段承重绳（等间距排布）
      const spread = 26;
      const x0 = cx - (n - 1) * spread / 2;
      ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2.4;
      for (let i = 0; i < n; i++) {
        const x = x0 + i * spread;
        ctx.beginPath();
        ctx.moveTo(x, i === 0 && n > 1 ? topY : fixedY);
        ctx.lineTo(x, movY);
        ctx.stroke();
      }
      // 定滑轮吊架 + 定滑轮（引出拉力方向）
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx + 120, topY); ctx.lineTo(cx + 120, fixedY - R); ctx.stroke();
      pulley(cx + 120, fixedY, '#dbe3ff');
      // 从动滑轮最右绳段引到定滑轮再向下到手
      ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x0 + (n - 1) * spread, movY);
      ctx.lineTo(x0 + (n - 1) * spread, fixedY - R);
      ctx.arc(cx + 120, fixedY, R, Math.PI, Math.PI * 0.5, true);
      const handY = fixedY + 30 + hLift * scale * n * 0.5;
      ctx.moveTo(cx + 120 + R, fixedY);
      ctx.lineTo(cx + 120 + R, handY);
      ctx.stroke();
      // 手 + 拉力箭头
      ctx.font = '20px sans-serif';
      ctx.fillText('✊', cx + 120 + R - 10, handY + 16);
      pxArrow(ctx, cx + 120 + R, handY + 26, cx + 120 + R, handY + 26 + Math.min(70, F / 4), { color: C.green, width: 3, label: 'F = ' + fmtN(F, 0) + ' N', labelDx: 8 });
      // 动滑轮 + 重物
      if (n > 1) pulley(cx, movY, '#fde68a');
      ctx.fillStyle = '#f59e0b'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
      const bw = 46 + G / 12;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx - bw / 2, loadY, bw, 44, 6); else ctx.rect(cx - bw / 2, loadY, bw, 44);
      ctx.fill(); ctx.stroke();
      if (n > 1) { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(cx, movY + R); ctx.lineTo(cx, loadY); ctx.stroke(); }
      ctx.fillStyle = '#7c2d12'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('G = ' + fmtN(G, 0) + ' N', cx, loadY + 27);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif';
      ctx.fillText(L(`承重绳 n = ${n} 段`, `supporting strands n = ${n}`), cx - 130, topY + 24);
      readout.set(L(`
        拉力 F = G/n = ${fmtN(G,0)}/${n} = <b style="color:${C.green}">${fmtN(F,0)} N</b>
        ${n === 1 ? '<span class="tag">定滑轮：只改方向不省力</span>' : `<span class="tag">省力 ${n} 倍</span>`}<br>
        重物升高 h = <b>${fmtN(hLift,2)} m</b> → 绳端拉出 s = n·h = <b>${fmtN(n * hLift,2)} m</b><br>
        功的核对：F·s = ${fmtN(F,0)}×${fmtN(n * hLift,2)} = <b>${fmtN(F * n * hLift,0)} J</b><br>
        　　　　  G·h = ${fmtN(G,0)}×${fmtN(hLift,2)} = <b>${fmtN(G * hLift,0)} J</b> —— 相等 ✓<br>
        <span class="tag">省力不省功（功的原理）</span>`, `
        Pull F = G/n = ${fmtN(G,0)}/${n} = <b style="color:${C.green}">${fmtN(F,0)} N</b>
        ${n === 1 ? '<span class="tag">fixed pulley: redirects only</span>' : `<span class="tag">force ÷ ${n}</span>`}<br>
        Load raised h = <b>${fmtN(hLift,2)} m</b> → rope pulled s = n·h = <b>${fmtN(n * hLift,2)} m</b><br>
        Work check: F·s = ${fmtN(F,0)}×${fmtN(n * hLift,2)} = <b>${fmtN(F * n * hLift,0)} J</b><br>
        　　　　　 G·h = ${fmtN(G,0)}×${fmtN(hLift,2)} = <b>${fmtN(G * hLift,0)} J</b> — equal ✓<br>
        <span class="tag">force saved, work never (principle of work)</span>`));
    }
    [sG, sn].forEach(s => s.onChange(() => { draw(); }));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
