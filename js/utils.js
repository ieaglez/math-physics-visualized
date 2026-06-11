'use strict';
/* ===== 公共工具：话题注册、DOM、画布绘图、控件、动画 ===== */

window.TOPICS = [];
function registerTopic(t) { window.TOPICS.push(t); }

/* 调色板 */
const C = {
  blue: '#2563eb', red: '#dc2626', green: '#059669', orange: '#ea580c',
  purple: '#7c3aed', cyan: '#0891b2', gray: '#9ca3af', ink: '#111827',
  soft: '#6b7280', grid: '#eceef3', axis: '#94a3b8'
};

function h(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

/* 数字格式化：去掉多余的 0 */
function fmtN(v, d = 2) {
  if (!isFinite(v)) return v > 0 ? '∞' : '−∞';
  let s = v.toFixed(d);
  if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
  if (s === '-0') s = '0';
  return s;
}
const DEG = Math.PI / 180;

/* ---------- 页面骨架：标题 + 实验区(画布/控制台) + 讲解区 ---------- */
function topicPage(root, { title, en, tagline, formula, explainHTML }) {
  root.innerHTML = '';
  const head = h('div', 'topic-head',
    `<h1>${title} <span class="en">${en || ''}</span></h1>` +
    (tagline ? `<p class="tagline">${tagline}</p>` : ''));
  if (formula) {
    head.appendChild(h('div', 'formula-hero',
      `<span class="formula-hero-label">核心公式 KEY FORMULA</span>` +
      `<div class="formula-hero-body">${formula}</div>`));
  }
  const lab = h('div', 'lab');
  const canvasBox = h('div', 'canvas-box');
  const panel = h('aside', 'panel',
    (formula ? `<div class="panel-formula">${formula}</div>` : '') +
    '<div class="panel-title">⚙️ 参数控制台 PARAMETERS</div>');
  lab.append(canvasBox, panel);
  root.append(head, lab);
  if (explainHTML) root.appendChild(h('div', 'explain', explainHTML));
  return { canvasBox, panel };
}

/* ---------- 自适应高清画布 ---------- */
function createCanvas(parent, height = 440) {
  const canvas = document.createElement('canvas');
  parent.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W = 0;
  const cbs = [];
  function resize() {
    const w = Math.max(parent.clientWidth - 0, 320);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w;
    cbs.forEach(f => { try { f(); } catch (e) { console.error(e); } });
  }
  const ro = new ResizeObserver(() => resize());
  ro.observe(parent);
  resize();
  return {
    canvas, ctx,
    get W() { return W; }, get H() { return height; },
    onResize(f) { cbs.push(f); },
    destroy() { ro.disconnect(); }
  };
}

/* ---------- 世界坐标绘图 ---------- */
class Plot {
  constructor(cv, { xmin = -10, xmax = 10, ymin = -10, ymax = 10,
                    padL = 10, padR = 10, padT = 10, padB = 10, equal = false } = {}) {
    Object.assign(this, { cv, xmin, xmax, ymin, ymax, padL, padR, padT, padB, equal });
  }
  setRange(xmin, xmax, ymin, ymax) {
    Object.assign(this, { xmin, xmax, ymin, ymax });
  }
  m() {
    const { W, H } = this.cv;
    const iw = Math.max(W - this.padL - this.padR, 10);
    const ih = Math.max(H - this.padT - this.padB, 10);
    let sx = iw / (this.xmax - this.xmin), sy = ih / (this.ymax - this.ymin);
    if (this.equal) { const s = Math.min(sx, sy); sx = sy = s; }
    return {
      sx, sy,
      cx: (this.xmin + this.xmax) / 2, cy: (this.ymin + this.ymax) / 2,
      px: this.padL + iw / 2, py: this.padT + ih / 2
    };
  }
  X(x) { const m = this.m(); return m.px + (x - m.cx) * m.sx; }
  Y(y) { const m = this.m(); return m.py - (y - m.cy) * m.sy; }
  invX(px) { const m = this.m(); return m.cx + (px - m.px) / m.sx; }
  invY(py) { const m = this.m(); return m.cy - (py - m.py) / m.sy; }
  visible() {
    const { W, H } = this.cv;
    return { x0: this.invX(0), x1: this.invX(W), y0: this.invY(H), y1: this.invY(0) };
  }
  clear(bg) {
    const { ctx, W, H } = this.cv;
    ctx.clearRect(0, 0, W, H);
    if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); }
  }
  /* 网格 + 坐标轴 + 刻度 */
  grid(stepX = 1, stepY = stepX) {
    const { ctx } = this.cv;
    const v = this.visible();
    ctx.save();
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
    for (let x = Math.ceil(v.x0 / stepX) * stepX; x <= v.x1; x += stepX) {
      ctx.beginPath(); ctx.moveTo(this.X(x), 0); ctx.lineTo(this.X(x), this.cv.H); ctx.stroke();
    }
    for (let y = Math.ceil(v.y0 / stepY) * stepY; y <= v.y1; y += stepY) {
      ctx.beginPath(); ctx.moveTo(0, this.Y(y)); ctx.lineTo(this.cv.W, this.Y(y)); ctx.stroke();
    }
    ctx.restore();
  }
  axes({ xLabel = 'x', yLabel = 'y', tickX = 1, tickY = tickX, labels = true } = {}) {
    const { ctx, W, H } = this.cv;
    const v = this.visible();
    const y0px = Math.min(Math.max(this.Y(0), 12), H - 12);
    const x0px = Math.min(Math.max(this.X(0), 12), W - 12);
    ctx.save();
    ctx.strokeStyle = C.axis; ctx.fillStyle = C.soft; ctx.lineWidth = 1.4;
    ctx.font = '11px -apple-system, sans-serif';
    // x 轴
    ctx.beginPath(); ctx.moveTo(0, y0px); ctx.lineTo(W, y0px); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 9, y0px - 4); ctx.lineTo(W, y0px); ctx.lineTo(W - 9, y0px + 4); ctx.stroke();
    ctx.fillText(xLabel, W - 14, y0px - 8);
    // y 轴
    ctx.beginPath(); ctx.moveTo(x0px, H); ctx.lineTo(x0px, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0px - 4, 9); ctx.lineTo(x0px, 0); ctx.lineTo(x0px + 4, 9); ctx.stroke();
    ctx.fillText(yLabel, x0px + 7, 12);
    if (labels) {
      ctx.textAlign = 'center';
      for (let x = Math.ceil(v.x0 / tickX) * tickX; x <= v.x1; x += tickX) {
        if (Math.abs(x) < tickX / 2) continue;
        ctx.fillText(fmtN(x), this.X(x), y0px + 14);
      }
      ctx.textAlign = 'right';
      for (let y = Math.ceil(v.y0 / tickY) * tickY; y <= v.y1; y += tickY) {
        if (Math.abs(y) < tickY / 2) continue;
        ctx.fillText(fmtN(y), x0px - 5, this.Y(y) + 4);
      }
    }
    ctx.restore();
  }
  fn(f, { color = C.blue, width = 2.5, dash, xmin, xmax } = {}) {
    const { ctx, W, H } = this.cv;
    const v = this.visible();
    const a = xmin != null ? xmin : v.x0, b = xmax != null ? xmax : v.x1;
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = width;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    let pen = false;
    const pxa = this.X(a), pxb = this.X(b);
    for (let px = pxa; px <= pxb; px += 2) {
      const x = this.invX(px), y = f(x);
      if (!isFinite(y)) { pen = false; continue; }
      const py = this.Y(y);
      if (py < -2 * H || py > 3 * H) { pen = false; continue; }
      if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }
  seg(x1, y1, x2, y2, { color = C.ink, width = 2, dash } = {}) {
    const { ctx } = this.cv;
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = width;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(this.X(x1), this.Y(y1)); ctx.lineTo(this.X(x2), this.Y(y2)); ctx.stroke();
    ctx.restore();
  }
  arrow(x1, y1, x2, y2, { color = C.ink, width = 2.5, label, labelDx = 8, labelDy = -8, dash } = {}) {
    pxArrow(this.cv.ctx, this.X(x1), this.Y(y1), this.X(x2), this.Y(y2),
      { color, width, label, labelDx, labelDy, dash });
  }
  dot(x, y, { color = C.red, r = 5, label, labelDx = 9, labelDy = -9, stroke } = {}) {
    const { ctx } = this.cv;
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(this.X(x), this.Y(y), r, 0, Math.PI * 2); ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
    if (label) {
      ctx.fillStyle = color; ctx.font = 'bold 13px -apple-system, sans-serif';
      ctx.fillText(label, this.X(x) + labelDx, this.Y(y) + labelDy);
    }
    ctx.restore();
  }
  text(x, y, str, { color = C.ink, font = '13px -apple-system, sans-serif', align = 'left', dx = 0, dy = 0 } = {}) {
    const { ctx } = this.cv;
    ctx.save();
    ctx.fillStyle = color; ctx.font = font; ctx.textAlign = align;
    ctx.fillText(str, this.X(x) + dx, this.Y(y) + dy);
    ctx.restore();
  }
}

/* 像素坐标箭头（含箭头头部与标签） */
function pxArrow(ctx, x1, y1, x2, y2, { color = C.ink, width = 2.5, label, labelDx = 8, labelDy = -8, dash } = {}) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  if (len < 1) return;
  const ux = dx / len, uy = dy / len, hs = Math.min(11, 4 + len * 0.08);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hs * 0.6, y2 - uy * hs * 0.6); ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - ux * hs - uy * hs * 0.45, y2 - uy * hs + ux * hs * 0.45);
  ctx.lineTo(x2 - ux * hs + uy * hs * 0.45, y2 - uy * hs - ux * hs * 0.45);
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 13.5px -apple-system, sans-serif';
    ctx.fillText(label, x2 + labelDx, y2 + labelDy);
  }
  ctx.restore();
}

/* 弹簧（像素坐标） */
function drawSpring(ctx, x1, y1, x2, y2, { coils = 9, amp = 9, color = '#475569', width = 2 } = {}) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  if (len < 1) return;
  const px = -dy / len, py = dx / len, n = coils * 2;
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.lineTo(x1 + dx * 0.06, y1 + dy * 0.06);
  for (let i = 1; i < n; i++) {
    const f = 0.06 + (i / n) * 0.88, s = (i % 2 ? 1 : -1) * amp;
    ctx.lineTo(x1 + dx * f + px * s, y1 + dy * f + py * s);
  }
  ctx.lineTo(x2 - dx * 0.06 / 1, y2 - dy * 0.06);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

/* ---------- 控件 ---------- */
function addSlider(panel, { label, en = '', min, max, step = 1, value, unit = '', fmt }) {
  const d = step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  fmt = fmt || (v => fmtN(v, d));
  const row = h('div', 'ctl',
    `<div class="ctl-label">${label}${en ? `<span class="en">${en}</span>` : ''}<span class="ctl-val"></span></div>`);
  const input = document.createElement('input');
  input.type = 'range'; input.min = min; input.max = max; input.step = step; input.value = value;
  row.appendChild(input);
  panel.appendChild(row);
  const valEl = row.querySelector('.ctl-val');
  const listeners = [];
  function refresh(fire = true) {
    valEl.textContent = fmt(parseFloat(input.value)) + (unit ? ' ' + unit : '');
    if (fire) listeners.forEach(f => f());
  }
  input.addEventListener('input', () => refresh());
  refresh(false);
  return {
    input,
    get value() { return parseFloat(input.value); },
    set value(v) { input.value = v; refresh(false); },
    onChange(f) { listeners.push(f); }
  };
}

/* 分段选择器 */
function addSeg(panel, { options, value, onChange }) {
  const seg = h('div', 'seg');
  let cur = value != null ? value : options[0].value;
  options.forEach(o => {
    const b = h('button', null, o.label);
    if (o.value === cur) b.classList.add('on');
    b.onclick = () => {
      cur = o.value;
      seg.querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      if (onChange) onChange(cur);
    };
    seg.appendChild(b);
  });
  panel.appendChild(seg);
  return { get value() { return cur; } };
}

function addReadout(panel, title = '📊 实时读数 READOUT') {
  panel.appendChild(h('div', 'panel-title', title));
  const d = h('div', 'readout');
  panel.appendChild(d);
  return { set(html) { d.innerHTML = html; } };
}

/* ---------- 动画器 ---------- */
function makeAnimator(step) {
  let raf = null, last = 0, playing = false;
  const a = {
    t: 0,
    get playing() { return playing; },
    start() {
      if (playing) return;
      playing = true; last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() { playing = false; if (raf) cancelAnimationFrame(raf); raf = null; },
    toggle() { playing ? a.stop() : a.start(); }
  };
  function frame(ts) {
    if (!playing) return;
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;
    a.t += dt;
    step(dt, a.t);
    raf = requestAnimationFrame(frame);
  }
  return a;
}

/* 播放/暂停 + 重置按钮 */
function addPlayControls(panel, anim, { onReset } = {}) {
  const row = h('div', 'btn-row');
  const play = h('button', 'btn primary', '▶ 播放');
  const reset = h('button', 'btn', '↺ 重置');
  function sync() { play.innerHTML = anim.playing ? '⏸ 暂停' : '▶ 播放'; }
  play.onclick = () => { anim.toggle(); sync(); };
  reset.onclick = () => { anim.stop(); anim.t = 0; sync(); if (onReset) onReset(); };
  row.append(play, reset);
  panel.appendChild(row);
  return { sync };
}
