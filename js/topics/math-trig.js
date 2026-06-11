'use strict';
/* ===== 三角函数与单位圆 Unit Circle & Trigonometric Functions ===== */
registerTopic({
  id: 'trig', cat: 'math', icon: '🌀',
  title: '三角函数与单位圆', en: 'Unit Circle & Trig Functions',
  desc: '转动角度 θ，看 sin、cos 如何从单位圆上“长”出来，并形成波形曲线。',
  render(root) {
    const { canvasBox, panel } = topicPage(root, {
      title: '三角函数与单位圆', en: 'Unit Circle & Trigonometric Functions',
      tagline: '左边是单位圆，右边是正弦/余弦曲线 —— 拖动角度或点击播放，看它们如何一一对应。',
      formula: 'sin θ = y　cos θ = x　tan θ = <span class="frac"><span>sin θ</span><span class="den">cos θ</span></span>　·　sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1',
      explainHTML: `
        <h2>单位圆定义 <span class="en">Unit Circle Definition</span></h2>
        <p>在直角坐标系中，以原点为圆心、半径为 1 的圆叫<span class="term">单位圆 <span class="en">(unit circle)</span></span>。
        设角 θ 的终边与单位圆交于点 P(x, y)，则定义：</p>
        <div class="formula">sin θ = y　　cos θ = x　　tan θ = <span class="frac"><span>y</span><span class="den">x</span></span> = <span class="frac"><span>sin θ</span><span class="den">cos θ</span></span></div>
        <ul>
          <li><b>正弦 <span class="en">sine</span></b>：P 点的纵坐标（图中红色竖线段）；</li>
          <li><b>余弦 <span class="en">cosine</span></b>：P 点的横坐标（图中蓝色横线段）；</li>
          <li><b>正切 <span class="en">tangent</span></b>：过 (1,0) 的切线上截出的线段长（图中橙色），这正是 tangent（切线）一词的来历。</li>
        </ul>
        <h2>基本性质 <span class="en">Basic Properties</span></h2>
        <div class="formula">sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1 <span class="note">（勾股定理 Pythagorean identity：P 点在单位圆上）</span></div>
        <ul>
          <li><b>周期性 <span class="en">(periodicity)</span></b>：sin 和 cos 的周期都是 360°（2π rad）—— P 点转一圈回到原处；</li>
          <li><b>有界性</b>：−1 ≤ sin θ ≤ 1，−1 ≤ cos θ ≤ 1 —— P 点永远在圆上；</li>
          <li><b>奇偶性</b>：sin(−θ) = −sin θ（奇函数 odd），cos(−θ) = cos θ（偶函数 even）；</li>
          <li>cos θ = sin(θ + 90°)：余弦曲线就是正弦曲线向左平移 90°。</li>
        </ul>
        <div class="tip"><b>实验建议：</b>① 点击播放，盯住右图：红点的高度永远等于左图红色线段的长度 —— 正弦曲线就是“圆周运动的影子”；② 把 θ 调到 90° 附近，观察 tan θ 如何冲向无穷大；③ 验证特殊角：θ = 30°, 45°, 60° 时的读数是否和课本表格一致。</div>
        <div class="think"><b>思考一下：</b>为什么 tan 90° 不存在？从单位圆上的橙色切线段角度解释一下。</div>
      `
    });

    const cv = createCanvas(canvasBox, 430);
    const sTheta = addSlider(panel, { label: '角度 θ', en: 'angle', min: 0, max: 360, step: 1, value: 50, unit: '°' });
    const speed = addSlider(panel, { label: '播放速度', en: 'speed', min: 10, max: 120, step: 5, value: 45, unit: '°/s' });
    const readout = addReadout(panel);
    const anim = makeAnimator(dt => {
      sTheta.value = (sTheta.value + speed.value * dt) % 360;
      draw();
    });
    addPlayControls(panel, anim, { onReset: () => { sTheta.value = 0; draw(); } });

    function draw() {
      const th = sTheta.value * DEG;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

      // —— 左：单位圆（等比例）——
      const circleW = Math.min(W * 0.42, H);
      const pc = new Plot(cv, { xmin: -1.55, xmax: 1.55, ymin: -1.45, ymax: 1.45, equal: true, padL: 8, padR: 0, padT: 8, padB: 8 });
      // 把单位圆映射限制在左侧区域：用偏移实现
      const cx0 = circleW / 2 + 10, cy0 = H / 2, R = Math.min(circleW, H) / 2 - 30;
      const PX = x => cx0 + x * R, PY = y => cy0 - y * R;
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(PX(-1.35), PY(0)); ctx.lineTo(PX(1.35), PY(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(PX(0), PY(-1.3)); ctx.lineTo(PX(0), PY(1.3)); ctx.stroke();
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx0, cy0, R, 0, Math.PI * 2); ctx.stroke();
      const px = Math.cos(th), py = Math.sin(th);
      // 角度弧
      ctx.strokeStyle = C.purple; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx0, cy0, R * 0.22, 0, -th, true); ctx.stroke();
      ctx.fillStyle = C.purple; ctx.font = 'bold 13px sans-serif';
      ctx.fillText('θ', cx0 + R * 0.3 * Math.cos(th / 2), cy0 - R * 0.3 * Math.sin(th / 2) + 4);
      // tan 切线段（过 (1,0) 的竖直切线）
      const tanv = Math.tan(th);
      if (Math.abs(tanv) < 3.2) {
        ctx.strokeStyle = C.orange; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(PX(1), PY(0)); ctx.lineTo(PX(1), PY(tanv)); ctx.stroke();
        ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(cx0, cy0); ctx.lineTo(PX(1), PY(tanv)); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = C.orange; ctx.fillText('tanθ', PX(1) + 6, PY(tanv / 2));
      }
      // cos（横）、sin（竖）
      ctx.strokeStyle = C.blue; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(PX(0), PY(0)); ctx.lineTo(PX(px), PY(0)); ctx.stroke();
      ctx.fillStyle = C.blue; ctx.fillText('cosθ', PX(px / 2) - 16, PY(0) + (py >= 0 ? 16 : -8));
      ctx.strokeStyle = C.red; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(PX(px), PY(0)); ctx.lineTo(PX(px), PY(py)); ctx.stroke();
      ctx.fillStyle = C.red; ctx.fillText('sinθ', PX(px) + (px >= 0 ? 6 : -38), PY(py / 2));
      // 半径与 P 点
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx0, cy0); ctx.lineTo(PX(px), PY(py)); ctx.stroke();
      ctx.fillStyle = C.ink;
      ctx.beginPath(); ctx.arc(PX(px), PY(py), 5.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('P(cosθ, sinθ)', PX(px) + 8, PY(py) - 8);

      // —— 右：sin / cos 曲线 ——
      const gx0 = circleW + 40;
      const gp = {
        X: deg => gx0 + (deg / 360) * (W - gx0 - 16),
        Y: v => cy0 - v * R
      };
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gx0 - 4, gp.Y(0)); ctx.lineTo(W - 8, gp.Y(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx0, gp.Y(-1.25)); ctx.lineTo(gx0, gp.Y(1.25)); ctx.stroke();
      ctx.fillStyle = C.soft; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      [90, 180, 270, 360].forEach(d => {
        ctx.strokeStyle = '#eceef3';
        ctx.beginPath(); ctx.moveTo(gp.X(d), gp.Y(-1.1)); ctx.lineTo(gp.X(d), gp.Y(1.1)); ctx.stroke();
        ctx.fillText(d + '°', gp.X(d), gp.Y(0) + 14);
      });
      ctx.textAlign = 'left';
      ctx.fillText('1', gx0 - 12, gp.Y(1) + 4);
      ctx.fillText('−1', gx0 - 16, gp.Y(-1) + 4);
      const curve = (f, color) => {
        ctx.strokeStyle = color; ctx.lineWidth = 2.4; ctx.beginPath();
        for (let d = 0; d <= 360; d += 2) {
          const X = gp.X(d), Y = gp.Y(f(d * DEG));
          d === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
        }
        ctx.stroke();
      };
      curve(Math.sin, C.red);
      curve(Math.cos, 'rgba(37,99,235,.45)');
      ctx.fillStyle = C.red; ctx.font = 'bold 12.5px sans-serif';
      ctx.fillText('y = sin θ', W - 90, gp.Y(1) - 4);
      ctx.fillStyle = 'rgba(37,99,235,.75)';
      ctx.fillText('y = cos θ', W - 90, gp.Y(1) + 14);
      // 当前角度标记 + 连接虚线
      const deg = sTheta.value;
      ctx.strokeStyle = '#d1d5db'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(PX(px), PY(py)); ctx.lineTo(gp.X(deg), gp.Y(py)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = C.gray;
      ctx.beginPath(); ctx.moveTo(gp.X(deg), gp.Y(-1.1)); ctx.lineTo(gp.X(deg), gp.Y(1.1)); ctx.stroke();
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(gp.X(deg), gp.Y(Math.sin(th)), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.blue;
      ctx.beginPath(); ctx.arc(gp.X(deg), gp.Y(Math.cos(th)), 5, 0, Math.PI * 2); ctx.fill();

      const tanStr = Math.abs(Math.cos(th)) < 0.0015 ? '不存在 (undefined)' : fmtN(tanv, 3);
      readout.set(`
        θ = <b>${fmtN(deg,0)}°</b> = <b>${fmtN(th / Math.PI, 3)}π</b> rad<br>
        sin θ = <b>${fmtN(Math.sin(th),3)}</b>　cos θ = <b>${fmtN(Math.cos(th),3)}</b><br>
        tan θ = <b>${tanStr}</b><br>
        验证：sin²θ + cos²θ = <b>${fmtN(Math.sin(th)**2 + Math.cos(th)**2, 3)}</b> ✓<br>
        所在象限：<span class="tag">第 ${['一','二','三','四'][Math.floor((deg % 360) / 90)] || '一'} 象限</span>`);
    }
    sTheta.onChange(draw);
    speed.onChange(() => {});
    cv.onResize(draw);
    draw();
    return () => { anim.stop(); cv.destroy(); };
  }
});
