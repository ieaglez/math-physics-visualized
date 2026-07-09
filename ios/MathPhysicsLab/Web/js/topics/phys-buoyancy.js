'use strict';
/* ===== 密度与浮力 Density & Buoyancy（初中） ===== */
registerTopic({
  id: 'buoyancy', cat: 'mech', icon: '🛟', stage: 'junior',
  title: '密度与浮力', en: 'Density & Buoyancy',
  desc: L('调整物体和液体的密度，看它漂浮、悬浮还是下沉 —— 阿基米德原理一目了然。',
          'Tune the densities of object and liquid to see it float, hover, or sink — Archimedes\' principle at a glance.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '密度与浮力', en: 'Density & Buoyancy (Archimedes)',
      tagline: L('把物体密度调到比液体小，它就"探出头"；调到相等，它停在水中任意位置 —— 潜艇就是这么工作的。',
                 'Make the object lighter than the liquid and it pokes above the surface; match the densities and it hovers — exactly how a submarine works.'),
      formula: L('F<sub>浮</sub> = ρ<sub>液</sub>·g·V<sub>排</sub>（阿基米德原理）　·　漂浮时 F<sub>浮</sub> = G',
                 'F<sub>b</sub> = ρ<sub>liquid</sub>·g·V<sub>displaced</sub> (Archimedes)　·　floating: F<sub>b</sub> = G'),
      explainHTML: L(`
        <h2>密度 <span class="en">Density</span></h2>
        <div class="formula">ρ = <span class="frac"><span>m</span><span class="den">V</span></span>
          <span class="note">单位体积的质量。水 1.0、冰 0.9、木头约 0.5、铁 7.9、水银 13.6（单位 g/cm³）</span></div>
        <h2>阿基米德原理 <span class="en">Archimedes' Principle</span></h2>
        <p>浸在液体中的物体受到竖直向上的<span class="term">浮力 <span class="en">(buoyant force)</span></span>，
        大小等于它<b>排开的液体所受的重力</b>：</p>
        <div class="formula">F<sub>浮</sub> = ρ<sub>液</sub> g V<sub>排</sub>
          <span class="note">V排 是浸入部分的体积 —— 只跟"排开多少液体"有关，跟物体本身是什么无关！</span></div>
        <h2>浮沉条件 <span class="en">Float or Sink</span></h2>
        <ul>
          <li><b>ρ物 &lt; ρ液</b>：漂浮 <span class="en">(floats)</span> —— 上浮直到"露出一部分"，使 F浮 = G。浸入比例恰好 = ρ物/ρ液（冰山 90% 在水下！）；</li>
          <li><b>ρ物 = ρ液</b>：悬浮 <span class="en">(neutrally buoyant)</span> —— 停在液体中任何位置（潜艇、鱼鳔的原理）；</li>
          <li><b>ρ物 &gt; ρ液</b>：下沉 <span class="en">(sinks)</span> —— 浮力小于重力，但浮力依然存在（水中提石头更轻）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 木头（0.5）放进水（1.0）：正好一半露出水面 —— 浸入比例 = 0.5/1.0；② 铁（7.9）放进水会沉，但放进水银（13.6）居然漂起来！③ 把两者密度调相等，看"悬浮"状态；④ 观察读数：无论沉浮，F浮 = ρ液gV排 始终成立。</div>
        <div class="think"><b>思考一下：</b>钢铁的密度比水大得多，万吨巨轮为什么能浮在海上？（提示：船是空心的 —— 整体的"平均密度"小于水。）</div>
      `, `
        <h2>Density <span class="en">密度</span></h2>
        <div class="formula">ρ = <span class="frac"><span>m</span><span class="den">V</span></span>
          <span class="note">mass per unit volume. Water 1.0, ice 0.9, wood ≈ 0.5, iron 7.9, mercury 13.6 (g/cm³)</span></div>
        <h2>Archimedes' Principle <span class="en">阿基米德原理</span></h2>
        <p>An object immersed in liquid feels an upward <span class="term">buoyant force <span class="en">(浮力)</span></span>
        equal to <b>the weight of the liquid it displaces</b>:</p>
        <div class="formula">F<sub>b</sub> = ρ<sub>liquid</sub> g V<sub>displaced</sub>
          <span class="note">V is the submerged volume — buoyancy cares only about how much liquid is pushed aside, not what the object is!</span></div>
        <h2>Float or Sink <span class="en">浮沉条件</span></h2>
        <ul>
          <li><b>ρ<sub>obj</sub> &lt; ρ<sub>liq</sub></b>: it floats — rising until enough sticks out that F<sub>b</sub> = G. The submerged fraction is exactly ρ<sub>obj</sub>/ρ<sub>liq</sub> (an iceberg is 90% underwater!);</li>
          <li><b>ρ<sub>obj</sub> = ρ<sub>liq</sub></b>: neutrally buoyant — it hovers anywhere (submarines, fish bladders);</li>
          <li><b>ρ<sub>obj</sub> &gt; ρ<sub>liq</sub></b>: it sinks — buoyancy loses to gravity, but never disappears (rocks feel lighter underwater).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Wood (0.5) in water (1.0): exactly half pokes above the surface — submerged fraction = 0.5/1.0; ② Iron (7.9) sinks in water yet floats on mercury (13.6)! ③ Match the two densities and watch it hover; ④ Check the readout: floating or sunk, F<sub>b</sub> = ρgV always holds.</div>
        <div class="think"><b>Think about it:</b> Steel is far denser than water — how does a 10,000-ton ship float? (Hint: ships are hollow — the <em>average</em> density of the whole hull is less than water's.)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 460);
    const srho = addSlider(panel, { label: L('物体密度 ρ物', 'Object density ρ_obj'), en: L('object density', '物体密度'), min: 0.2, max: 12, step: 0.1, value: 0.5, unit: 'g/cm³' });
    const sliq = addSlider(panel, { label: L('液体密度 ρ液', 'Liquid density ρ_liq'), en: L('liquid density', '液体密度'), min: 0.6, max: 13.6, step: 0.1, value: 1.0, unit: 'g/cm³' });
    const sV = addSlider(panel, { label: L('物体体积 V', 'Object volume V'), en: L('volume', '体积'), min: 100, max: 1000, step: 50, value: 400, unit: 'cm³' });
    const readout = addReadout(panel);
    const g = 9.8;

    function draw() {
      const rho = srho.value, rliq = sliq.value, Vcm = sV.value;
      const V = Vcm * 1e-6;                       // m³
      const G = rho * 1000 * V * g;               // N
      const floats = rho < rliq - 0.005;
      const neutral = Math.abs(rho - rliq) <= 0.005;
      const frac = floats ? rho / rliq : 1;       // 浸入比例
      const Fb = rliq * 1000 * V * frac * g;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // 容器与液面
      const tankL = W * 0.18, tankR = W * 0.82, tankT = 60, tankB = H - 40;
      const surfY = tankT + 46;
      // 液体（颜色随密度：水蓝 → 水银灰）
      const hg = Math.min(1, (rliq - 0.6) / 13);
      ctx.fillStyle = `rgba(${Math.round(56 + hg * 120)},${Math.round(140 - hg * 40)},${Math.round(220 - hg * 90)},.45)`;
      ctx.fillRect(tankL, surfY, tankR - tankL, tankB - surfY);
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tankL, tankT); ctx.lineTo(tankL, tankB); ctx.lineTo(tankR, tankB); ctx.lineTo(tankR, tankT);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(37,99,235,.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(tankL, surfY); ctx.lineTo(tankR, surfY); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '12px sans-serif';
      ctx.fillText(L('液面', 'surface'), tankR + 6, surfY + 4);
      // 物体（立方体，边长 ∝ ∛V）
      const side = 46 + Math.cbrt(Vcm) * 6.2;
      const cx = (tankL + tankR) / 2;
      let topY;
      if (neutral) topY = surfY + 70;                       // 悬浮：停在中部
      else if (floats) topY = surfY - side * (1 - frac);    // 漂浮：露出 (1−frac)
      else topY = tankB - side;                             // 下沉：底部
      const heat = Math.min(1, rho / 12);
      ctx.fillStyle = `rgb(${Math.round(200 - heat * 90)},${Math.round(150 - heat * 60)},${Math.round(90 + heat * 60)})`;
      ctx.strokeStyle = '#6b4e2e'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx - side / 2, topY, side, side, 6); else ctx.rect(cx - side / 2, topY, side, side);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#3b2f1e'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('ρ = ' + fmtN(rho, 1), cx, topY + side / 2 + 4);
      ctx.textAlign = 'left';
      // 力箭头
      const fScale = Math.min(60 / Math.max(G, Fb), 8);
      pxArrow(ctx, cx - side / 4, topY + side / 2, cx - side / 4, topY + side / 2 + G * fScale,
        { color: C.red, width: 3, label: 'G = ' + fmtN(G, 1) + ' N', labelDx: -100, labelDy: 4 });
      pxArrow(ctx, cx + side / 4, topY + side / 2, cx + side / 4, topY + side / 2 - Fb * fScale,
        { color: C.blue, width: 3, label: L('F浮 = ', 'F_b = ') + fmtN(Fb, 1) + ' N', labelDx: 8 });
      const state = neutral ? L('悬浮（停在任意深度）', 'neutrally buoyant (hovers)') :
                    floats ? L('漂浮（部分露出）', 'floating (partly above)') :
                    L('下沉（沉到底）', 'sinking (rests on the bottom)');
      readout.set(L(`
        重力 G = ρ物·g·V = <b>${fmtN(G,1)} N</b><br>
        浸入体积 V排 = <b>${fmtN(Vcm * frac,0)} cm³</b>（${fmtN(frac*100,0)}%）<br>
        浮力 F浮 = ρ液·g·V排 = <b>${fmtN(Fb,1)} N</b><br>
        <span class="tag">${state}</span><br>
        ${floats ? `露出比例 = 1 − ρ物/ρ液 = <b>${fmtN((1-frac)*100,0)}%</b>` :
          neutral ? 'ρ物 = ρ液：F浮 恰好 = G' :
          `沉底后支持力 N = G − F浮 = <b>${fmtN(G - Fb,1)} N</b>`}`, `
        Gravity G = ρ_obj·g·V = <b>${fmtN(G,1)} N</b><br>
        Submerged volume = <b>${fmtN(Vcm * frac,0)} cm³</b> (${fmtN(frac*100,0)}%)<br>
        Buoyancy F_b = ρ_liq·g·V_disp = <b>${fmtN(Fb,1)} N</b><br>
        <span class="tag">${state}</span><br>
        ${floats ? `Fraction above surface = 1 − ρ_obj/ρ_liq = <b>${fmtN((1-frac)*100,0)}%</b>` :
          neutral ? 'ρ_obj = ρ_liq: F_b exactly balances G' :
          `Normal force from the bottom N = G − F_b = <b>${fmtN(G - Fb,1)} N</b>`}`));
    }
    [srho, sliq, sV].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
