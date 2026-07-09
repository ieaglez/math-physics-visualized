'use strict';
/* ===== 数据的分析 Statistics: Mean, Median, Mode（初中） ===== */
registerTopic({
  id: 'stats', cat: 'math', icon: '📊', stage: 'junior',
  title: '平均数·中位数·众数', en: 'Mean · Median · Mode',
  desc: L('拖动"土豪"的收入滑块，看平均数被拉飞、中位数稳如泰山 —— 三个"平均"各说各话。',
          'Drag the "billionaire" slider and watch the mean fly away while the median holds firm — three different "averages" telling different stories.'),
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '平均数·中位数·众数', en: 'Mean, Median & Mode',
      tagline: L('7 个人的月收入，其中一人可以变成土豪。哪个统计量最能代表"普通人"？',
                 'Seven people\'s monthly incomes, one of whom can become a billionaire. Which statistic best represents "a typical person"?'),
      formula: L('平均数 = 总和 ÷ 个数　·　中位数 = 排序后中间的数　·　众数 = 出现最多的数',
                 'mean = sum ÷ count　·　median = the middle value when sorted　·　mode = the most frequent value'),
      explainHTML: L(`
        <h2>三个"代表值" <span class="en">Three Representatives</span></h2>
        <ul>
          <li><span class="term">平均数 <span class="en">(mean)</span></span>：总和 ÷ 个数 —— 用到每一个数据，但<b>怕极端值</b>：一个土豪能把全村"平均"成富人；</li>
          <li><span class="term">中位数 <span class="en">(median)</span></span>：排序后正中间的数（偶数个取中间两个的平均）—— <b>抗极端值</b>，所以"人均收入"新闻常用中位数更诚实；</li>
          <li><span class="term">众数 <span class="en">(mode)</span></span>：出现次数最多的数 —— 鞋店老板最关心它（哪个尺码卖得最多）。</li>
        </ul>
        <h2>离散程度：方差 <span class="en">Spread: Variance</span></h2>
        <div class="formula">方差 s² = <span class="frac"><span>(x₁−x̄)² + (x₂−x̄)² + … + (xₙ−x̄)²</span><span class="den">n</span></span>
          <span class="note">衡量数据偏离平均数的程度：方差越大越"散"。两队平均分相同，方差小的发挥更稳定</span></div>
        <h2>怎么选 <span class="en">Which to Use</span></h2>
        <ul>
          <li>数据均匀无极端值 → 平均数最全面；</li>
          <li>有极端值（收入、房价）→ 中位数更代表"典型"；</li>
          <li>关心"最常见" →众数。这也是高中统计与正态分布的起点。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 把最后一人收入从 5 千拖到 10 万：平均数狂奔，中位数与众数不动 —— 这就是"被平均"的数学原理；② 让所有人收入相同：三个统计量重合、方差为 0；③ 观察平均数的红线像"天平支点"，始终在数据的"重心"。</div>
        <div class="think"><b>思考一下：</b>新闻说"我国人均存款 X 万"，你要判断自己是否"拖后腿"，该看平均数还是中位数？为什么两者差距越大说明分布越不均？</div>
      `, `
        <h2>Three Representatives <span class="en">三个"代表值"</span></h2>
        <ul>
          <li><span class="term">Mean <span class="en">(平均数)</span></span>: sum ÷ count — uses every data point, but is <b>fragile to outliers</b>: one billionaire "averages" the whole village into wealth;</li>
          <li><span class="term">Median <span class="en">(中位数)</span></span>: the middle value after sorting (average the middle two if the count is even) — <b>robust to outliers</b>, which is why honest income reporting prefers it;</li>
          <li><span class="term">Mode <span class="en">(众数)</span></span>: the most frequent value — the shoe-store owner's favorite statistic (which size sells most).</li>
        </ul>
        <h2>Spread: Variance <span class="en">离散程度：方差</span></h2>
        <div class="formula">variance s² = <span class="frac"><span>(x₁−x̄)² + (x₂−x̄)² + … + (xₙ−x̄)²</span><span class="den">n</span></span>
          <span class="note">how far data stray from the mean: bigger = more scattered. Two teams with equal means — the one with smaller variance is more consistent</span></div>
        <h2>Which to Use <span class="en">怎么选</span></h2>
        <ul>
          <li>Even data without outliers → the mean is most informative;</li>
          <li>Outliers present (incomes, house prices) → the median represents "typical" better;</li>
          <li>Care about "most common" → the mode. This is also the doorway to high-school statistics and the normal distribution.</li>
        </ul>
        <div class="tip"><b>Try this:</b> ① Drag the last person's income from 5k to 100k: the mean sprints away, the median and mode stand still — the math behind "being averaged up"; ② Make all incomes equal: the three statistics coincide and the variance hits 0; ③ Note how the mean's red line acts like a balance point — the "center of gravity" of the data.</div>
        <div class="think"><b>Think about it:</b> The news says "average savings: X". To judge where you stand, should you compare with the mean or the median? Why does a big gap between them signal an uneven distribution?</div>
      `)
    });

    const cv = createCanvas(canvasBox, 440);
    const base = [3, 4, 4, 5, 5, 6]; // 千元
    const sx = addSlider(panel, { label: L('第 7 人的收入（拖成土豪）', 'Person 7\'s income (make a billionaire)'), en: L('outlier', '极端值'), min: 3, max: 100, step: 1, value: 5, unit: L('千元', 'k') });
    const readout = addReadout(panel);

    function draw() {
      const data = [...base, sx.value];
      const sorted = [...data].sort((a, b) => a - b);
      const n = data.length;
      const mean = data.reduce((s, v) => s + v, 0) / n;
      const median = sorted[(n - 1) / 2];
      const freq = {};
      data.forEach(v => freq[v] = (freq[v] || 0) + 1);
      const maxF = Math.max(...Object.values(freq));
      const modes = Object.keys(freq).filter(k => freq[k] === maxF).map(Number);
      const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      const pad = 60, gB = H - 70, gT = 40;
      const maxV = Math.max(...data, 12);
      const BX = i => pad + (i + 0.5) * (W - 2 * pad) / n;
      const BY = v => gB - v / maxV * (gB - gT);
      // 柱状图（人）
      ctx.textAlign = 'center';
      data.forEach((v, i) => {
        const isLast = i === n - 1;
        const x = BX(i), w = (W - 2 * pad) / n * 0.55;
        ctx.fillStyle = isLast ? 'rgba(234,88,12,.5)' : 'rgba(91,91,240,.4)';
        ctx.fillRect(x - w / 2, BY(v), w, gB - BY(v));
        ctx.fillStyle = '#454c63'; ctx.font = 'bold 12px sans-serif';
        ctx.fillText(fmtN(v, 0), x, BY(v) - 6);
        ctx.font = '15px sans-serif';
        ctx.fillText(isLast ? '🤑' : '🧑', x, gB + 20);
      });
      // 三条统计线
      const line = (v, col, lb, dy) => {
        ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.setLineDash([6, 5]);
        ctx.beginPath(); ctx.moveTo(pad - 14, BY(v)); ctx.lineTo(W - pad + 14, BY(v)); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(lb + ' ' + fmtN(v, 1), W - pad + 18 - 66, BY(v) + dy);
        ctx.textAlign = 'center';
      };
      line(mean, C.red, L('平均', 'mean'), -6);
      line(median, C.green, L('中位', 'median'), 14);
      ctx.textAlign = 'left';
      readout.set(L(`
        数据（千元）：${sorted.join('，')}<br>
        平均数 = <b style="color:${C.red}">${fmtN(mean,2)}</b>　中位数 = <b style="color:${C.green}">${fmtN(median,1)}</b>　众数 = <b>${modes.join('、')}</b><br>
        方差 s² = <b>${fmtN(variance,1)}</b>（越大越分散）<br>
        ${sx.value > 20
          ? `<span class="tag">极端值出现！平均数被拉高到 ${fmtN(mean,1)}，但一半人仍 ≤ ${fmtN(median,0)} 千 —— 中位数更诚实</span>`
          : '<span class="tag">把第 7 人拖到 100 千元试试"被平均"</span>'}`, `
        Data (k): ${sorted.join(', ')}<br>
        Mean = <b style="color:${C.red}">${fmtN(mean,2)}</b>　median = <b style="color:${C.green}">${fmtN(median,1)}</b>　mode = <b>${modes.join(', ')}</b><br>
        Variance s² = <b>${fmtN(variance,1)}</b> (bigger = more scattered)<br>
        ${sx.value > 20
          ? `<span class="tag">Outlier alert! The mean is dragged to ${fmtN(mean,1)}, yet half the people still earn ≤ ${fmtN(median,0)}k — the median tells the truth</span>`
          : '<span class="tag">Drag person 7 to 100k to see "averaged up" in action</span>'}`));
    }
    sx.onChange(draw);
    cv.onResize(draw);
    draw();
    return () => cv.destroy();
  }
});
