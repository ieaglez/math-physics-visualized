'use strict';
/* ===== 磁现象与电磁铁 Magnetism & Electromagnets（初中） ===== */
registerTopic({
  id: 'magnet', cat: 'optics', icon: '🧲', stage: 'junior',
  title: '磁场与电磁铁', en: 'Magnets & Electromagnets',
  desc: L('看条形磁铁的磁感线，再给螺线管通电 —— 电流一断磁性就消失，这就是电磁铁的妙处。',
          'See a bar magnet\'s field lines, then power a coil — cut the current and the magnetism vanishes: the magic of electromagnets.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '磁现象与电磁铁', en: 'Magnetism & the Electromagnet',
      tagline: L('左边是永磁铁的磁感线（N 出 S 进）。右边的电磁铁：调电流大小和方向，磁性随你开关。',
                 'Left: a permanent magnet\'s field lines (out of N, into S). Right: an electromagnet — its strength and polarity obey your current.'),
      formula: L('磁感线：N 极出发 → S 极进入　·　电磁铁磁性 ∝ 电流大小与线圈匝数（奥斯特：电生磁）',
                 'Field lines: leave N → enter S　·　electromagnet strength ∝ current × turns (Oersted: currents make magnetism)'),
      explainHTML: L(`
        <h2>磁场与磁感线 <span class="en">Fields &amp; Field Lines</span></h2>
        <ul>
          <li>磁体两端磁性最强，叫<span class="term">磁极 <span class="en">(poles)</span></span>：同名相斥、异名相吸 —— 和电荷神似；</li>
          <li><span class="term">磁感线 <span class="en">(field lines)</span></span>：磁体外部从 N 到 S，越密的地方磁场越强；它是"看见"磁场的工具（撒铁屑！）；</li>
          <li>地球本身是块大磁铁 —— 指南针的 N 极指北，说明地理北极附近其实是地磁的 S 极。</li>
        </ul>
        <h2>电生磁：奥斯特的发现 <span class="en">Currents Make Magnetism</span></h2>
        <div class="formula">通电导线周围存在磁场（1820，奥斯特）→ 绕成螺线管 = 一根"条形磁铁"
          <span class="note">右手螺旋定则：四指沿电流方向弯曲，拇指指向螺线管的 N 极</span></div>
        <ul>
          <li><span class="term">电磁铁 <span class="en">(electromagnet)</span></span> = 螺线管 + 铁芯，三大优点：<b>磁性可开关、强弱可调（电流/匝数）、极性可反（换电流方向）</b>；</li>
          <li>应用：电磁起重机（吸放废钢）、电铃、磁悬浮列车、继电器（小电流控制大电流）。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把电流调到 0：铁屑（小磁针）全部"躺平"—— 磁性消失；② 电流反向：N、S 极对调，小磁针集体掉头；③ 增大电流看吸起的回形针数量变多 —— 磁性强弱可调，这是永磁铁做不到的。</div>
        <div class="think"><b>思考一下：</b>电磁起重机搬运钢材时突然停电会发生什么？所以安全规范要求下方绝对不能站人。（另想：门禁的电磁锁为什么断电反而打开？）</div>
      `, `
        <h2>Fields &amp; Field Lines <span class="en">磁场与磁感线</span></h2>
        <ul>
          <li>A magnet is strongest at its ends — the <span class="term">poles <span class="en">(磁极)</span></span>: like poles repel, unlike attract — echoing electric charges;</li>
          <li><span class="term">Field lines <span class="en">(磁感线)</span></span> run from N to S outside the magnet; denser lines mean a stronger field — they let you "see" the field (sprinkle iron filings!);</li>
          <li>Earth itself is a giant magnet — a compass's N points north, so the spot near geographic north is actually a magnetic S pole.</li>
        </ul>
        <h2>Currents Make Magnetism: Oersted <span class="en">电生磁</span></h2>
        <div class="formula">A current-carrying wire is surrounded by a magnetic field (Oersted, 1820) → wind it into a coil = a "bar magnet"
          <span class="note">Right-hand rule: curl your fingers along the current; your thumb points to the coil's N pole</span></div>
        <ul>
          <li>An <span class="term">electromagnet <span class="en">(电磁铁)</span></span> = coil + iron core. Three superpowers: <b>switchable, adjustable (current/turns), reversible (flip the current)</b>;</li>
          <li>Applications: scrapyard cranes, electric bells, maglev trains, relays (small currents commanding big ones).</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Set the current to 0: the compass needles all go limp — magnetism gone; ② Reverse the current: N and S swap and the needles snap around; ③ Raise the current and watch more paper clips cling — adjustable strength, something no permanent magnet offers.</div>
        <div class="think"><b>Think about it:</b> What happens if a scrapyard electromagnet loses power mid-lift? Hence the rule: never stand beneath one. (Also: why do magnetic door locks open when power fails?)</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const si = addSlider(panel, { label: L('电流 I（可反向）', 'Current I (reversible)'), en: L('current', '电流'), min: -5, max: 5, step: 0.5, value: 3, unit: 'A' });
    const sn = addSlider(panel, { label: L('线圈匝数 n', 'Coil turns n'), en: L('turns', '匝数'), min: 4, max: 12, step: 1, value: 8 });
    const readout = addReadout(panel);

    function draw() {
      const I = si.value, n = sn.value;
      const strength = Math.abs(I) * n;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // —— 左：条形磁铁 + 磁感线 ——
      const mx = W * 0.25, my = H * 0.42, mw = 110, mh = 34;
      // 磁感线（椭圆环）
      ctx.strokeStyle = '#b8bdd4'; ctx.lineWidth = 1.4;
      [1.35, 1.9, 2.6].forEach(k => {
        ctx.beginPath();
        ctx.ellipse(mx, my, mw * 0.62 * k, mh * 1.35 * k, 0, 0, Math.PI * 2);
        ctx.stroke();
        // 方向箭头（顶部中点向右 = N→S 外部）
        pxArrow(ctx, mx - 6, my - mh * 1.35 * k, mx + 8, my - mh * 1.35 * k, { color: '#8b93bd', width: 1.6 });
      });
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(mx, my - mh / 2, mw / 2, mh);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(mx - mw / 2, my - mh / 2, mw / 2, mh);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 15px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('S', mx - mw / 4, my + 5);
      ctx.fillText('N', mx + mw / 4, my + 5);
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif';
      ctx.fillText(L('永磁铁：磁感线 N → S', 'permanent magnet: lines N → S'), mx, my + mh * 3.8);
      // —— 右：电磁铁（螺线管） ——
      const ex = W * 0.68, ey = my, coilW = 150, coilH = 44;
      // 铁芯
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(ex - coilW / 2 - 16, ey - 9, coilW + 32, 18);
      // 线圈
      const active = Math.abs(I) > 0.01;
      ctx.strokeStyle = active ? '#d97706' : '#b8bdd4'; ctx.lineWidth = 3;
      for (let i = 0; i < n; i++) {
        const x = ex - coilW / 2 + (i + 0.5) * coilW / n;
        ctx.beginPath();
        ctx.ellipse(x, ey, 6, coilH / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      // 导线到电池
      ctx.strokeStyle = active ? '#d97706' : '#b8bdd4'; ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(ex - coilW / 2, ey + coilH / 2 + 4); ctx.lineTo(ex - coilW / 2, ey + 84);
      ctx.lineTo(ex - 16, ey + 84);
      ctx.moveTo(ex + 16, ey + 84);
      ctx.lineTo(ex + coilW / 2, ey + 84); ctx.lineTo(ex + coilW / 2, ey + coilH / 2 + 4);
      ctx.stroke();
      // 电池符号（方向随 I 正负）
      ctx.save();
      ctx.translate(ex, ey + 84);
      if (I < 0) ctx.scale(-1, 1);
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(-6, -14); ctx.lineTo(-6, 14); ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(6, -7); ctx.lineTo(6, 7); ctx.stroke();
      ctx.restore();
      // N/S 标注（随电流方向）
      if (active) {
        const nRight = I > 0;
        ctx.font = 'bold 17px sans-serif'; ctx.textAlign = 'center';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('N', ex + (nRight ? 1 : -1) * (coilW / 2 + 34), ey + 6);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('S', ex + (nRight ? -1 : 1) * (coilW / 2 + 34), ey + 6);
        // 磁性强弱：吸起的回形针
        const clips = Math.min(6, Math.round(strength / 8));
        ctx.font = '15px sans-serif';
        for (let i = 0; i < clips; i++) {
          ctx.fillText('📎', ex - coilW / 2 + 20 + i * 22, ey + coilH / 2 + 30);
        }
      } else {
        ctx.fillStyle = '#9aa1b5'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(L('电流为 0：没有磁性', 'no current: no magnetism'), ex, ey - coilH);
      }
      ctx.fillStyle = '#697086'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(L('电磁铁：通电才有磁', 'electromagnet: magnetic only when powered'), ex, my + mh * 3.8);
      ctx.textAlign = 'left';
      readout.set(L(`
        电流 I = <b>${fmtN(I,1)} A</b>，匝数 n = <b>${n}</b><br>
        磁性强弱 ∝ |I|×n = <b>${fmtN(strength,0)}</b>${active ? `（能吸 ${Math.min(6, Math.round(strength / 8))} 枚回形针）` : ''}<br>
        ${!active ? '<span class="warn">断电 → 磁性立即消失（永磁铁做不到）</span>'
          : `<span class="tag">N 极在${I > 0 ? '右' : '左'}（右手螺旋定则）</span>`}<br>
        ${I < 0 ? L('电流反向 → 磁极对调 ✓', 'Current reversed → poles swapped ✓') : L('把电流拖成负值试试极性反转', 'Drag the current negative to flip the poles')}`, `
        Current I = <b>${fmtN(I,1)} A</b>, turns n = <b>${n}</b><br>
        Strength ∝ |I|×n = <b>${fmtN(strength,0)}</b>${active ? ` (holding ${Math.min(6, Math.round(strength / 8))} paper clips)` : ''}<br>
        ${!active ? '<span class="warn">Power cut → magnetism gone instantly (no permanent magnet can do that)</span>'
          : `<span class="tag">N pole on the ${I > 0 ? 'right' : 'left'} (right-hand rule)</span>`}<br>
        ${I < 0 ? 'Current reversed → poles swapped ✓' : 'Drag the current negative to flip the poles'}`));
    }
    [si, sn].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
