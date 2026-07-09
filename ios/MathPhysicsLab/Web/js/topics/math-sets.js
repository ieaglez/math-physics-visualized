'use strict';
/* ===== 集合与韦恩图 Sets & Venn Diagrams ===== */
registerTopic({
  id: 'sets', cat: 'math', icon: '🫧',
  title: '集合与韦恩图', en: 'Sets & Venn Diagrams',
  desc: L('调整各区域的元素个数，点亮交集、并集、补集，亲手验证容斥原理。',
          'Adjust the element counts, highlight unions, intersections and complements, and verify inclusion–exclusion yourself.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '集合与韦恩图', en: 'Sets & Venn Diagrams',
      tagline: L('高中数学的第一课。切换高亮模式，看清 ∪、∩、∁ 各是哪块区域。',
                 'Lesson one of high-school math. Switch the highlight mode to see exactly which region ∪, ∩ and ∁ mean.'),
      formula: L('|A ∪ B| = |A| + |B| − |A ∩ B|（容斥原理）',
                 '|A ∪ B| = |A| + |B| − |A ∩ B| (inclusion–exclusion)'),
      explainHTML: L(`
        <h2>集合的语言 <span class="en">The Language of Sets</span></h2>
        <p><span class="term">集合 <span class="en">(set)</span></span>是"一些确定对象的整体"，其中每个对象叫<span class="term">元素 <span class="en">(element)</span></span>。
        a ∈ A 读作"a 属于 A"。数学用集合来精确描述"范围"—— 定义域、解集、事件……处处是集合。</p>
        <h2>三种基本运算 <span class="en">Set Operations</span></h2>
        <ul>
          <li><span class="term">交集 <span class="en">(intersection)</span></span> A ∩ B：同时属于 A 和 B 的元素（韦恩图中间的"透镜"区域）；</li>
          <li><span class="term">并集 <span class="en">(union)</span></span> A ∪ B：属于 A 或属于 B 的元素（两个圆的全部）；</li>
          <li><span class="term">补集 <span class="en">(complement)</span></span> ∁<sub>U</sub>A：全集 U 中不属于 A 的元素（圆外面的部分）。</li>
        </ul>
        <h2>容斥原理 <span class="en">Inclusion–Exclusion</span></h2>
        <div class="formula">|A ∪ B| = |A| + |B| − |A ∩ B|
          <span class="note">直接相加会把中间区域算两次，所以要减掉一次 —— 在图上一眼就能看懂</span></div>
        <p>典型应用：班里 30 人喜欢数学、25 人喜欢物理、12 人两者都喜欢，那么至少喜欢一门的有 30 + 25 − 12 = 43 人。</p>
        <div class="tip"><b>实验建议：</b>① 选中「A ∩ B」模式，把"同时属于"的人数调到 0 —— 两个集合<b>互斥 (disjoint)</b>，此时 |A∪B| = |A|+|B|；② 选中「∁U(A∪B)」看补集区域；③ 用读数验证容斥原理的等式在任何参数下都成立。</div>
        <div class="think"><b>思考一下：</b>三个集合的容斥原理是什么样？|A∪B∪C| = |A|+|B|+|C| − |A∩B| − |B∩C| − |A∩C| + |A∩B∩C|，最后为什么要加回一项？</div>
      `, `
        <h2>The Language of Sets <span class="en">集合的语言</span></h2>
        <p>A <span class="term">set <span class="en">(集合)</span></span> is a well-defined collection of objects; each object is an <span class="term">element <span class="en">(元素)</span></span>.
        We write a ∈ A, read "a belongs to A". Math uses sets to describe "ranges" precisely — domains, solution sets, events… sets are everywhere.</p>
        <h2>Three Basic Operations <span class="en">三种基本运算</span></h2>
        <ul>
          <li><span class="term">Intersection <span class="en">(交集)</span></span> A ∩ B: elements in both A and B (the lens-shaped middle region);</li>
          <li><span class="term">Union <span class="en">(并集)</span></span> A ∪ B: elements in A or in B (both circles together);</li>
          <li><span class="term">Complement <span class="en">(补集)</span></span> ∁<sub>U</sub>A: elements of the universal set U not in A (everything outside the circle).</li>
        </ul>
        <h2>Inclusion–Exclusion <span class="en">容斥原理</span></h2>
        <div class="formula">|A ∪ B| = |A| + |B| − |A ∩ B|
          <span class="note">Adding directly counts the middle region twice, so subtract it once — one glance at the diagram makes it obvious</span></div>
        <p>Classic application: 30 students like math, 25 like physics, 12 like both. Then 30 + 25 − 12 = 43 students like at least one subject.</p>
        <div class="tip"><b>Try this:</b> ① Select "A ∩ B" mode and drag the "both" count to 0 — the sets become <b>disjoint (互斥)</b> and |A∪B| = |A|+|B|; ② Select "∁U(A∪B)" to see the complement region; ③ Use the readout to check that inclusion–exclusion holds for any parameters.</div>
        <div class="think"><b>Think about it:</b> What does inclusion–exclusion look like for three sets? |A∪B∪C| = |A|+|B|+|C| − |A∩B| − |B∩C| − |A∩C| + |A∩B∩C| — why must the last term be added back?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const mode = addSeg(panel, {
      options: [
        { label: 'A∪B', value: 'union' },
        { label: 'A∩B', value: 'inter' },
        { label: 'A−B', value: 'diff' },
        { label: '∁U(A∪B)', value: 'comp' }
      ],
      value: 'inter', onChange: () => draw()
    });
    const sx = addSlider(panel, { label: L('只属于 A 的元素', 'Only in A'), en: L('only A', '只属于A'), min: 0, max: 30, step: 1, value: 18 });
    const sz = addSlider(panel, { label: L('同时属于 A 和 B', 'In both A and B'), en: 'A ∩ B', min: 0, max: 30, step: 1, value: 12 });
    const sy = addSlider(panel, { label: L('只属于 B 的元素', 'Only in B'), en: L('only B', '只属于B'), min: 0, max: 30, step: 1, value: 13 });
    const sw = addSlider(panel, { label: L('两者之外（U 中其余）', 'Neither (rest of U)'), en: L('neither', '两者之外'), min: 0, max: 30, step: 1, value: 7 });
    const readout = addReadout(panel);

    function draw() {
      const x = sx.value, y = sy.value, z = sz.value, w = sw.value;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      const cxA = W / 2 - 78, cxB = W / 2 + 78, cy = H / 2 + 10, R = Math.min(H * 0.34, 150);
      const rectX = W / 2 - R * 2.35, rectY = cy - R * 1.52, rectW = R * 4.7, rectH = R * 2.9;
      const circle = (cx) => { ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); };
      // —— 高亮区域（先画，可用合成模式）——
      ctx.save();
      ctx.fillStyle = 'rgba(124,58,237,.32)';
      const m = mode.value;
      if (m === 'union') { circle(cxA); ctx.fill(); circle(cxB); ctx.fill(); }
      else if (m === 'inter') {
        circle(cxA); ctx.save(); ctx.clip(); circle(cxB); ctx.fill(); ctx.restore();
      } else if (m === 'diff') {
        circle(cxA); ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        circle(cxB); ctx.fill();
      } else { // complement of union
        ctx.beginPath(); ctx.rect(rectX, rectY, rectW, rectH); ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        circle(cxA); ctx.fill(); circle(cxB); ctx.fill();
      }
      ctx.restore();
      // —— 全集边框与圆 ——
      ctx.strokeStyle = '#9aa1b5'; ctx.lineWidth = 2;
      ctx.strokeRect(rectX, rectY, rectW, rectH);
      ctx.fillStyle = '#697086'; ctx.font = 'bold 14px sans-serif';
      ctx.fillText(L('全集 U', 'Universal set U'), rectX + 10, rectY + 22);
      ctx.strokeStyle = C.blue; ctx.lineWidth = 3; circle(cxA); ctx.stroke();
      ctx.strokeStyle = C.red; circle(cxB); ctx.stroke();
      ctx.fillStyle = C.blue; ctx.font = 'bold 17px sans-serif';
      ctx.fillText('A', cxA - R * 0.75, cy - R * 0.8);
      ctx.fillStyle = C.red;
      ctx.fillText('B', cxB + R * 0.65, cy - R * 0.8);
      // —— 各区域元素个数 ——
      ctx.font = 'bold 21px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#16181f';
      ctx.fillText(x, cxA - R * 0.42, cy + 7);
      ctx.fillText(z, (cxA + cxB) / 2, cy + 7);
      ctx.fillText(y, cxB + R * 0.42, cy + 7);
      ctx.fillText(w, rectX + rectW - 34, rectY + rectH - 16);
      ctx.font = '11.5px sans-serif'; ctx.fillStyle = '#697086';
      ctx.fillText(L('只属于A', 'only A'), cxA - R * 0.42, cy + 26);
      ctx.fillText('A∩B', (cxA + cxB) / 2, cy + 26);
      ctx.fillText(L('只属于B', 'only B'), cxB + R * 0.42, cy + 26);
      ctx.textAlign = 'left';
      const names = {
        union: L('A ∪ B（并集）', 'A ∪ B (union)'),
        inter: L('A ∩ B（交集）', 'A ∩ B (intersection)'),
        diff: L('A − B（差集：属于A不属于B）', 'A − B (difference: in A, not in B)'),
        comp: L('∁U(A∪B)（并集的补集）', '∁U(A∪B) (complement of the union)')
      };
      const vals = { union: x + y + z, inter: z, diff: x, comp: w };
      readout.set(L(`
        |A| = ${x}+${z} = <b>${x + z}</b>　|B| = ${y}+${z} = <b>${y + z}</b><br>
        高亮区域：<span class="tag">${names[m]}</span>，共 <b>${vals[m]}</b> 个元素<br>
        容斥原理验证：<br>
        |A∪B| = |A|+|B|−|A∩B| = ${x + z}+${y + z}−${z} = <b>${x + y + z}</b> ✓<br>
        全集 |U| = <b>${x + y + z + w}</b>
        ${z === 0 ? '<br><span class="tag">A∩B = ∅：A 与 B 互斥 (disjoint)</span>' : ''}`, `
        |A| = ${x}+${z} = <b>${x + z}</b>　|B| = ${y}+${z} = <b>${y + z}</b><br>
        Highlighted: <span class="tag">${names[m]}</span> — <b>${vals[m]}</b> element(s)<br>
        Inclusion–exclusion check:<br>
        |A∪B| = |A|+|B|−|A∩B| = ${x + z}+${y + z}−${z} = <b>${x + y + z}</b> ✓<br>
        Universal set |U| = <b>${x + y + z + w}</b>
        ${z === 0 ? '<br><span class="tag">A∩B = ∅: A and B are disjoint (互斥)</span>' : ''}`));
    }
    [sx, sy, sz, sw].forEach(s => s.onChange(draw));
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
