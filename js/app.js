'use strict';
/* ===== 应用框架：导航 + 路由 + 首页 + 学习路径 + 进度 ===== */

const CATEGORIES = [
  { id: 'math',   name: '数学 · 函数与几何',     en: 'Functions & Geometry',   color: '#7c3aed' },
  { id: 'mech',   name: '物理 · 力学',           en: 'Mechanics',              color: '#ea580c' },
  { id: 'optics', name: '物理 · 电磁与光学',     en: 'E&M & Optics',           color: '#0891b2' },
  { id: 'modern', name: '物理 · 热学与近代物理', en: 'Thermo & Modern Physics', color: '#059669' }
];

/* ---------- 学习路径：8 站，覆盖全部专题 ---------- */
const LEARNING_PATH = [
  { grade: '高一 · 上', title: '数学起步：从集合到函数',
    desc: '先学会数学的"语言"（集合），再认识两类最重要的函数 —— 这是后面一切的地基。',
    items: ['sets', 'quadratic', 'amgm', 'explog'] },
  { grade: '高一 · 上', title: '物理起步：运动与力',
    desc: '描述运动（怎么动）→ 分析受力（为什么这么动）。牛顿力学的两大支柱。',
    items: ['kinematics', 'forces', 'incline'] },
  { grade: '高一 · 下', title: '三角与向量：旋转的数学',
    desc: '单位圆是三角函数的家。向量和复数则把"方向"变成可以计算的对象。',
    items: ['trig', 'transform', 'triangle', 'vector', 'complex'] },
  { grade: '高一 · 下', title: '曲线运动 · 能量 · 动量',
    desc: '运动不再是直线：抛体、圆周、天体。再用能量和动量两大守恒律俯瞰全局。',
    items: ['projectile', 'circular', 'gravity', 'energy', 'momentum'] },
  { grade: '高二', title: '几何与代数进阶',
    desc: '立体几何练空间想象；解析几何用代数"算"几何；数列和导数打开高等数学的门。',
    items: ['solids', 'linecircle', 'ellipse', 'conics2', 'sequence', 'derivative'] },
  { grade: '高二', title: '电与磁',
    desc: '从静电力到电路，再到磁场和电磁感应 —— 现代文明的全部电力都从这里来。',
    items: ['coulomb', 'circuit', 'lorentz', 'induction', 'ac'] },
  { grade: '高二 · 高三', title: '振动 · 波 · 光',
    desc: '简谐运动是一切振动的原型，波把振动传向远方，光的干涉揭示了它的波动本性。',
    items: ['shm', 'wave', 'refraction', 'lens', 'interference'] },
  { grade: '高三', title: '概率统计与近代物理',
    desc: '用分布描述随机世界；再走进 20 世纪：气体分子、光量子、原子能级。',
    items: ['binomial', 'normal', 'gas', 'photoelectric', 'bohr'] }
];

/* 前置知识（学某专题前建议先学的专题） */
const PREREQS = {
  amgm: ['quadratic'], explog: ['quadratic'],
  trig: ['quadratic'], transform: ['trig'], triangle: ['trig'], vector: ['trig'],
  complex: ['vector', 'trig'], sequence: ['explog'], derivative: ['quadratic', 'trig'],
  linecircle: ['quadratic'], ellipse: ['linecircle'], conics2: ['ellipse'],
  binomial: ['sets'], normal: ['binomial'],
  incline: ['forces'], projectile: ['kinematics', 'trig'], circular: ['trig'],
  gravity: ['circular'], energy: ['incline'], momentum: ['energy'],
  shm: ['trig', 'energy'], wave: ['shm'],
  coulomb: ['forces'], circuit: ['coulomb'], lorentz: ['circular', 'coulomb'],
  induction: ['lorentz', 'circuit'], ac: ['induction', 'transform'],
  refraction: ['trig'], lens: ['refraction'], interference: ['wave', 'refraction'],
  gas: ['energy'], photoelectric: ['energy'], bohr: ['photoelectric']
};

const PATH_ORDER = LEARNING_PATH.flatMap(s => s.items);
const topicById = id => TOPICS.find(t => t.id === id);
const stageIndexOf = id => LEARNING_PATH.findIndex(s => s.items.includes(id));

/* ---------- 学习进度（localStorage，按浏览器保存） ---------- */
const DONE_KEY = 'mpv_done_v1';
function getDone() {
  try { return new Set(JSON.parse(localStorage.getItem(DONE_KEY) || '[]')); }
  catch (e) { return new Set(); }
}
function saveDone(set) {
  try { localStorage.setItem(DONE_KEY, JSON.stringify([...set])); } catch (e) {}
}
function toggleDone(id) {
  const s = getDone();
  s.has(id) ? s.delete(id) : s.add(id);
  saveDone(s);
}

const mainEl = document.getElementById('main');
const navEl = document.getElementById('nav');
const sidebar = document.getElementById('sidebar');
let currentCleanup = null;

/* ---------- 侧边导航 ---------- */
function buildNav() {
  navEl.innerHTML = '';
  const home = h('a', 'nav-item', '<span class="ico">🏠</span> 课程首页 Home');
  home.href = '#home'; home.dataset.route = 'home';
  const path = h('a', 'nav-item', '<span class="ico">🗺️</span> 学习路径 Path');
  path.href = '#path'; path.dataset.route = 'path';
  navEl.append(home, path);
  CATEGORIES.forEach(cat => {
    navEl.appendChild(h('div', 'nav-cat', cat.name));
    TOPICS.filter(t => t.cat === cat.id).forEach(t => {
      const a = h('a', 'nav-item',
        `<span class="ico">${t.icon}</span><span class="nav-txt">${t.title}</span><span class="nav-check">✓</span>`);
      a.href = '#' + t.id;
      a.dataset.route = t.id;
      navEl.appendChild(a);
    });
  });
  refreshNavDone();
}
function refreshNavDone() {
  const done = getDone();
  navEl.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('done', done.has(a.dataset.route));
  });
}

/* ---------- 首页 ---------- */
function renderHome(root) {
  root.innerHTML = '';
  const done = getDone();
  const total = PATH_ORDER.length;
  const pct = Math.round(done.size / total * 100);
  const hero = h('div', 'home-hero', `
    <h1>数理可视课堂 <span class="en">Interactive Math &amp; Physics for High School</span></h1>
    <p>把高中数学与物理的核心原理变成<b>可以动手操作的图形和动画</b>：拖动滑块改变参数，
    亲眼看到函数曲线如何变化、物体如何运动、光线如何折射。${total} 个交互专题，覆盖高一到高三的主干知识。</p>
    <div class="hero-actions">
      <a class="hero-btn primary" href="#path">🗺️ 从零开始 · 查看学习路径</a>
      <a class="hero-btn" href="#${PATH_ORDER.find(id => !done.has(id)) || PATH_ORDER[0]}">▶ ${done.size ? '继续学习' : '直接开始第一课'}</a>
    </div>
    ${done.size ? `<div class="hero-progress"><div class="hero-progress-bar"><span style="width:${pct}%"></span></div>已掌握 ${done.size}/${total} 个专题（${pct}%）</div>` : ''}
  `);
  root.appendChild(hero);
  CATEGORIES.forEach(cat => {
    const sec = h('div', 'home-cat',
      `<h2><span class="dot" style="background:${cat.color}"></span>${cat.name} <span style="color:#9ca3af;font-size:13px;font-weight:500">${cat.en}</span></h2>`);
    const grid = h('div', 'card-grid');
    TOPICS.filter(t => t.cat === cat.id).forEach(t => {
      const si = stageIndexOf(t.id);
      const isDone = done.has(t.id);
      const card = h('a', 'card' + (isDone ? ' card-done' : ''), `
        <div class="card-top">
          <span class="ico">${t.icon}</span>
          <span class="card-badges">
            ${si >= 0 ? `<span class="badge">第${si + 1}站·${LEARNING_PATH[si].grade}</span>` : ''}
            ${isDone ? '<span class="badge done-badge">✓ 已掌握</span>' : ''}
          </span>
        </div>
        <h3>${t.title}<span class="en">${t.en}</span></h3>
        <p>${t.desc}</p>`);
      card.href = '#' + t.id;
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    root.appendChild(sec);
  });
}

/* ---------- 学习路径页 ---------- */
function renderPath(root) {
  root.innerHTML = '';
  const done = getDone();
  const total = PATH_ORDER.length;
  const pct = Math.round(done.size / total * 100);
  const firstUndone = PATH_ORDER.find(id => !done.has(id));
  root.appendChild(h('div', 'home-hero', `
    <h1>学习路径 <span class="en">A Guided Journey from Zero</span></h1>
    <p>按下面 8 站的顺序学习，每一站都建立在前一站之上 —— 与高中教材进度（人教版）大体同步。
    学完一个专题后，点页面底部的「✓ 标记为已掌握」，进度会保存在这台设备的浏览器里。</p>
    <div class="hero-progress"><div class="hero-progress-bar"><span style="width:${pct}%"></span></div>
    总进度：${done.size}/${total}（${pct}%）</div>
    ${firstUndone ? `<div class="hero-actions"><a class="hero-btn primary" href="#${firstUndone}">▶ 继续学习：${topicById(firstUndone).title}</a></div>` : '<div class="hero-actions"><span class="hero-btn primary">🎉 恭喜！全部专题已掌握</span></div>'}
  `));
  const wrap = h('div', 'path-wrap');
  LEARNING_PATH.forEach((stage, si) => {
    const doneCount = stage.items.filter(id => done.has(id)).length;
    const card = h('div', 'path-stage' + (doneCount === stage.items.length ? ' stage-done' : ''));
    card.innerHTML = `
      <div class="path-num">${si + 1}</div>
      <div class="path-body">
        <div class="path-head">
          <span class="badge">${stage.grade}</span>
          <h3>${stage.title}</h3>
          <span class="path-count">${doneCount}/${stage.items.length}</span>
        </div>
        <p class="path-desc">${stage.desc}</p>
        <div class="path-items"></div>
      </div>`;
    const box = card.querySelector('.path-items');
    stage.items.forEach((id, i) => {
      const t = topicById(id);
      if (!t) return;
      const a = h('a', 'path-item' + (done.has(id) ? ' done' : ''),
        `<span class="pi-idx">${i + 1}</span><span class="pi-ico">${t.icon}</span>
         <span class="pi-title">${t.title}<em>${t.en}</em></span>
         <span class="pi-check">${done.has(id) ? '✓' : ''}</span>`);
      a.href = '#' + id;
      box.appendChild(a);
    });
    wrap.appendChild(card);
  });
  root.appendChild(wrap);
}

/* ---------- 专题页底部：学习导航（前置 / 打卡 / 下一站） ---------- */
function appendTopicFooter(topic) {
  const done = getDone();
  const foot = h('div', 'topic-footer');
  // 前置知识
  const pre = (PREREQS[topic.id] || []).map(id => topicById(id)).filter(Boolean);
  const idx = PATH_ORDER.indexOf(topic.id);
  const next = idx >= 0 && idx < PATH_ORDER.length - 1 ? topicById(PATH_ORDER[idx + 1]) : null;
  const si = stageIndexOf(topic.id);
  foot.innerHTML = `
    <div class="tf-row">
      <div class="tf-block">
        <div class="tf-label">📚 学前建议掌握 PREREQUISITES</div>
        <div class="tf-chips">${pre.length ? pre.map(p =>
          `<a class="tf-chip ${done.has(p.id) ? 'ok' : ''}" href="#${p.id}">${done.has(p.id) ? '✓ ' : ''}${p.icon} ${p.title}</a>`).join('') :
          '<span class="tf-none">无 —— 这是一个入门专题，直接开始吧！</span>'}</div>
      </div>
      <button class="tf-done-btn ${done.has(topic.id) ? 'on' : ''}">${done.has(topic.id) ? '✓ 已掌握（点击取消）' : '✓ 标记为已掌握'}</button>
    </div>
    <div class="tf-next">
      ${si >= 0 ? `<a class="tf-chip" href="#path">🗺️ 返回学习路径（第 ${si + 1} 站）</a>` : ''}
      ${next ? `<a class="tf-next-link" href="#${next.id}">下一站：${next.icon} ${next.title} →</a>` : '<span class="tf-next-link">🎓 这是路径的最后一个专题！</span>'}
    </div>`;
  foot.querySelector('.tf-done-btn').onclick = e => {
    toggleDone(topic.id);
    const on = getDone().has(topic.id);
    e.target.classList.toggle('on', on);
    e.target.textContent = on ? '✓ 已掌握（点击取消）' : '✓ 标记为已掌握';
    refreshNavDone();
  };
  mainEl.appendChild(foot);
}

/* ---------- 路由 ---------- */
function route() {
  const id = (location.hash || '#home').slice(1);
  if (currentCleanup) { try { currentCleanup(); } catch (e) { console.error(e); } currentCleanup = null; }
  navEl.querySelectorAll('.nav-item').forEach(a =>
    a.classList.toggle('active', a.dataset.route === id));
  sidebar.classList.remove('open');
  window.scrollTo(0, 0);
  const topic = TOPICS.find(t => t.id === id);
  if (topic) {
    currentCleanup = topic.render(mainEl) || null;
    appendTopicFooter(topic);
    document.title = topic.title + ' · 数理可视课堂';
  } else if (id === 'path') {
    renderPath(mainEl);
    document.title = '学习路径 · 数理可视课堂';
  } else {
    renderHome(mainEl);
    document.title = '数理可视课堂 · Math & Physics Visualized';
  }
}

document.getElementById('menu-btn').onclick = () => sidebar.classList.toggle('open');
window.addEventListener('hashchange', route);
buildNav();
route();
