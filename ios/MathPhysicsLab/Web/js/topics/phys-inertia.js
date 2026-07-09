'use strict';
/* ===== 二力平衡与惯性 Balanced Forces & Inertia（初中） ===== */
registerTopic({
  id: 'inertia', cat: 'mech', icon: '🛑', stage: 'junior',
  title: '二力平衡与惯性', en: 'Balanced Forces & Inertia',
  desc: L('推力对拉力、急刹车的乘客 —— 一次看懂牛顿第一定律说的"不受力就不变"。',
          'Tug-of-war forces and a braking bus — see what Newton\'s first law really means by "no net force, no change".'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '二力平衡与惯性', en: 'Balanced Forces & Inertia',
      tagline: L('调两个反向的力：相等时物体保持原状态（静止或匀速），不等时就"改变"。点播放看急刹车 —— 乘客为什么前倾？',
                 'Two opposing forces: equal keeps the state (rest or steady motion), unequal changes it. Press play for the braking bus — why do passengers lurch forward?'),
      formula: L('二力平衡：等大、反向、共线、同物体 ⟹ 合力为 0 ⟹ 保持静止或匀速直线运动',
                 'Balanced pair: equal, opposite, collinear, on one object ⟹ net force 0 ⟹ stays at rest or in uniform motion'),
      explainHTML: L(`
        <h2>牛顿第一定律 <span class="en">Newton's First Law</span></h2>
        <div class="formula">物体不受力（或受平衡力）时，保持<b>静止</b>或<b>匀速直线运动</b>状态
          <span class="note">又叫惯性定律 —— 伽利略的理想斜面实验推翻了"运动需要力来维持"的直觉</span></div>
        <ul>
          <li><span class="term">惯性 <span class="en">(inertia)</span></span>：物体保持原运动状态的性质。<b>质量越大，惯性越大</b>；</li>
          <li>惯性不是力！"由于惯性"可以，"受到惯性力的作用"在初中是错误表述；</li>
          <li>力不是维持运动的原因，而是<b>改变</b>运动的原因 —— 这是全部力学的第一块基石。</li>
        </ul>
        <h2>二力平衡的四个条件 <span class="en">Conditions for a Balanced Pair</span></h2>
        <ul>
          <li>作用在<b>同一物体</b>上（区别于作用力与反作用力！）；</li>
          <li><b>大小相等</b>、<b>方向相反</b>、<b>同一直线</b>；</li>
          <li>四条齐备 → 合力为零 → 运动状态不变。</li>
        </ul>
        <h2>生活中的惯性 <span class="en">Inertia in Life</span></h2>
        <ul>
          <li>急刹车身体前倾：车停了，身体"还想"以原速度前进；</li>
          <li>拍打衣服除灰：衣服动了，灰尘因惯性留在原地；</li>
          <li>系安全带：防止碰撞时身体因惯性继续飞。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把两个力调相等：木箱纹丝不动（或保持匀速）—— 平衡；② 调大左力：合力向左，箱子加速向左；③ 点「急刹车」动画：车减速的瞬间乘客上身前倾 —— 脚被车带停，上身还在"惯性前进"。</div>
        <div class="think"><b>思考一下：</b>在平直轨道上匀速行驶的火车里竖直向上跳，会落回原地还是落在后面？为什么？（提示：起跳时你和火车速度相同。）</div>
      `, `
        <h2>Newton's First Law <span class="en">牛顿第一定律</span></h2>
        <div class="formula">With no force (or balanced forces), an object stays <b>at rest</b> or in <b>uniform straight-line motion</b>
          <span class="note">Also called the law of inertia — Galileo's ideal-incline experiment demolished the intuition that motion needs a force to continue</span></div>
        <ul>
          <li><span class="term">Inertia <span class="en">(惯性)</span></span>: an object's tendency to keep its state of motion. <b>More mass, more inertia</b>;</li>
          <li>Inertia is not a force! "Because of inertia" is fine; "acted on by the force of inertia" is wrong at this level;</li>
          <li>Force is not what <em>maintains</em> motion — it is what <b>changes</b> it. The first cornerstone of all mechanics.</li>
        </ul>
        <h2>Conditions for a Balanced Pair <span class="en">二力平衡的条件</span></h2>
        <ul>
          <li>Acting on the <b>same object</b> (unlike action–reaction pairs!);</li>
          <li><b>Equal size</b>, <b>opposite direction</b>, <b>same line</b>;</li>
          <li>All four met → zero net force → the state of motion persists.</li>
        </ul>
        <h2>Inertia in Life <span class="en">生活中的惯性</span></h2>
        <ul>
          <li>Lurching forward under braking: the bus stops, your body "wants" to continue at the old speed;</li>
          <li>Beating dust out of clothes: the cloth moves, the dust stays put;</li>
          <li>Seat belts: they stop your body from flying on by inertia in a crash.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Make the two forces equal: the crate holds still (or keeps its speed) — balance; ② Increase the left force: net force left, the crate accelerates left; ③ Press "brake" and watch the passenger pitch forward the instant the bus slows — feet stop with the bus, torso keeps going.</div>
        <div class="think"><b>Think about it:</b> Jump straight up inside a smoothly moving train — do you land where you started or behind? Why? (Hint: at takeoff you share the train's velocity.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 430);
    const sf1 = addSlider(panel, { label: L('向左的力 F₁', 'Left force F₁'), en: L('force', '力'), min: 0, max: 30, step: 1, value: 12, unit: 'N' });
    const sf2 = addSlider(panel, { label: L('向右的力 F₂', 'Right force F₂'), en: L('force', '力'), min: 0, max: 30, step: 1, value: 12, unit: 'N' });
    // 急刹车动画
    let braking = false, busX = 0, busV = 0, lean = 0;
    const row = h('div', 'btn-row');
    const bGo = h('button', 'btn primary', L('🚌 急刹车演示', '🚌 Brake demo'));
    bGo.onclick = () => { braking = true; busX = 0; busV = 8; lean = 0; anim.start(); };
    row.append(bGo);
    panel.appendChild(row);
    const readout = addReadout(panel);
    const anim = makeAnimator(dt => {
      if (braking) {
        if (busX > 46 && busV > 0) { busV = Math.max(0, busV - 14 * dt); lean = Math.min(24, lean + 90 * dt); }
        else if (busV > 0) busX += busV * dt * 8;
        if (busV === 0) { lean = Math.max(0, lean - 40 * dt); if (lean === 0) { braking = false; anim.stop(); } }
        else busX += busV * dt * 8;
      }
      draw();
    });

    function draw() {
      const F1 = sf1.value, F2 = sf2.value, net = F2 - F1;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 上：木箱受力 ——
      const cy = 96, cx = W / 2;
      ctx.strokeStyle = '#e2e5f0'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(60, cy + 30); ctx.lineTo(W - 60, cy + 30); ctx.stroke();
      ctx.fillStyle = '#d9a45b'; ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx - 34, cy - 26, 68, 56, 6); else ctx.rect(cx - 34, cy - 26, 68, 56);
      ctx.fill(); ctx.stroke();
      if (F1 > 0) pxArrow(ctx, cx - 40, cy, cx - 40 - F1 * 4, cy, { color: C.blue, width: 3.2, label: 'F₁=' + fmtN(F1, 0) + 'N', labelDx: -70, labelDy: -8 });
      if (F2 > 0) pxArrow(ctx, cx + 40, cy, cx + 40 + F2 * 4, cy, { color: C.red, width: 3.2, label: 'F₂=' + fmtN(F2, 0) + 'N', labelDx: 6, labelDy: -8 });
      const balanced = Math.abs(net) < 0.5;
      ctx.fillStyle = balanced ? '#059669' : '#dc2626'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(balanced ? L('✓ 二力平衡：保持原状态', '✓ balanced: state unchanged')
                            : L(`合力 ${fmtN(Math.abs(net),0)} N 向${net > 0 ? '右' : '左'} → 运动状态改变`, `net ${fmtN(Math.abs(net),0)} N ${net > 0 ? 'right' : 'left'} → state changes`), cx, cy - 44);
      ctx.textAlign = 'left';
      // —— 下：急刹车小剧场 ——
      const by = H - 92;
      ctx.strokeStyle = '#e2e5f0'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(40, by + 42); ctx.lineTo(W - 40, by + 42); ctx.stroke();
      const bx = 70 + busX;
      // 车身
      ctx.fillStyle = '#60a5fa'; ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by - 20, 150, 52, 8); else ctx.rect(bx, by - 20, 150, 52);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#1e3a8a';
      [[bx + 30], [bx + 118]].forEach(([wx]) => { ctx.beginPath(); ctx.arc(wx, by + 38, 9, 0, Math.PI * 2); ctx.fill(); });
      // 乘客（前倾角 lean）
      ctx.save();
      ctx.translate(bx + 75, by + 24);
      ctx.rotate(-lean * DEG);
      ctx.font = '26px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('🧍', 0, -22);
      ctx.restore();
      ctx.textAlign = 'left';
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif';
      ctx.fillText(braking && busV === 0 && lean > 2 ? L('刹车！乘客因惯性前倾 →', 'Braking! The passenger lurches forward →')
                   : L('点「急刹车演示」看惯性', 'Press "Brake demo" to see inertia'), 44, by - 34);
      readout.set(L(`
        F₁（向左）= <b>${fmtN(F1,0)} N</b>，F₂（向右）= <b>${fmtN(F2,0)} N</b><br>
        合力 = <b>${fmtN(Math.abs(net),0)} N</b>${balanced ? '' : `（向${net > 0 ? '右' : '左'}）`}<br>
        ${balanced
          ? '<span class="tag">平衡 → 静止的保持静止，运动的保持匀速</span>'
          : '<span class="warn">不平衡 → 运动状态被改变（加速/减速/转向）</span>'}<br>
        牛顿第一定律：力是<b>改变</b>运动的原因，不是维持运动的原因`, `
        F₁ (left) = <b>${fmtN(F1,0)} N</b>, F₂ (right) = <b>${fmtN(F2,0)} N</b><br>
        Net force = <b>${fmtN(Math.abs(net),0)} N</b>${balanced ? '' : ` (${net > 0 ? 'rightward' : 'leftward'})`}<br>
        ${balanced
          ? '<span class="tag">Balanced → rest stays rest, motion stays uniform</span>'
          : '<span class="warn">Unbalanced → the state of motion changes (speed up / slow / turn)</span>'}<br>
        Newton's first law: force <b>changes</b> motion — it doesn't maintain it`));
    }
    [sf1, sf2].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
