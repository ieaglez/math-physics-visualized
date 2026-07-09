'use strict';
/* ===== 应用框架：导航 + 路由 + 首页 + 学习路径 + 进度 + 双语 ===== */

const CATEGORIES = [
  { id: 'math',   name: L('数学 · 函数与几何', 'Math · Functions & Geometry'),        en: L('Functions & Geometry', '函数与几何') },
  { id: 'mech',   name: L('物理 · 力学', 'Physics · Mechanics'),                      en: L('Mechanics', '力学') },
  { id: 'optics', name: L('物理 · 电磁与光学', 'Physics · E&M · Optics'),             en: L('E&M & Optics', '电磁与光学') },
  { id: 'modern', name: L('物理 · 热学与近代物理', 'Physics · Thermo & Modern'),      en: L('Thermo & Modern Physics', '热学与近代物理') }
];
CATEGORIES[0].color = '#7c3aed'; CATEGORIES[1].color = '#ea580c';
CATEGORIES[2].color = '#0891b2'; CATEGORIES[3].color = '#059669';

/* ---------- 学习路径：8 站 ---------- */
const LEARNING_PATH = [
  { grade: L('高一 · 上', 'Grade 10 · Fall'),
    title: L('数学起步：从集合到函数', 'Math Foundations: Sets to Functions'),
    desc: L('先学会数学的"语言"（集合），再认识两类最重要的函数 —— 这是后面一切的地基。',
            'Learn the "language" of math (sets) first, then meet the two most important families of functions — the foundation for everything ahead.'),
    items: ['sets', 'quadratic', 'amgm', 'explog'] },
  { grade: L('高一 · 上', 'Grade 10 · Fall'),
    title: L('物理起步：运动与力', 'Physics Foundations: Motion & Forces'),
    desc: L('描述运动（怎么动）→ 分析受力（为什么这么动）。牛顿力学的两大支柱。',
            'Describe motion (how things move), then analyze forces (why they move that way) — the two pillars of Newtonian mechanics.'),
    items: ['kinematics', 'forces', 'incline'] },
  { grade: L('高一 · 下', 'Grade 10 · Spring'),
    title: L('三角与向量：旋转的数学', 'Trigonometry & Vectors: The Math of Rotation'),
    desc: L('单位圆是三角函数的家。向量和复数则把"方向"变成可以计算的对象。',
            'The unit circle is home to the trig functions. Vectors and complex numbers turn "direction" into something you can compute with.'),
    items: ['trig', 'transform', 'triangle', 'vector', 'complex'] },
  { grade: L('高一 · 下', 'Grade 10 · Spring'),
    title: L('曲线运动 · 能量 · 动量', 'Curved Motion · Energy · Momentum'),
    desc: L('运动不再是直线：抛体、圆周、天体。再用能量和动量两大守恒律俯瞰全局。',
            'Motion leaves the straight line: projectiles, circles, orbits. Then survey it all through the two great conservation laws — energy and momentum.'),
    items: ['projectile', 'circular', 'gravity', 'energy', 'momentum'] },
  { grade: L('高二', 'Grade 11'),
    title: L('几何与代数进阶', 'Advanced Geometry & Algebra'),
    desc: L('立体几何练空间想象；解析几何用代数"算"几何；数列和导数打开高等数学的门。',
            'Solid geometry trains spatial thinking; analytic geometry computes shapes with algebra; sequences and derivatives open the door to higher math.'),
    items: ['solids', 'linecircle', 'ellipse', 'conics2', 'sequence', 'derivative'] },
  { grade: L('高二', 'Grade 11'),
    title: L('电与磁', 'Electricity & Magnetism'),
    desc: L('从静电力到电路，再到磁场和电磁感应 —— 现代文明的全部电力都从这里来。',
            'From electrostatic forces to circuits, magnetic fields and induction — every watt of modern civilization starts here.'),
    items: ['coulomb', 'circuit', 'lorentz', 'induction', 'ac'] },
  { grade: L('高二 · 高三', 'Grade 11–12'),
    title: L('振动 · 波 · 光', 'Oscillations · Waves · Light'),
    desc: L('简谐运动是一切振动的原型，波把振动传向远方，光的干涉揭示了它的波动本性。',
            'Simple harmonic motion is the prototype of all vibration; waves carry it outward; interference reveals the wave nature of light.'),
    items: ['shm', 'wave', 'refraction', 'lens', 'interference'] },
  { grade: L('高三', 'Grade 12'),
    title: L('概率统计与近代物理', 'Probability, Statistics & Modern Physics'),
    desc: L('用分布描述随机世界；再走进 20 世纪：气体分子、光量子、原子能级。',
            'Describe randomness with distributions, then step into the 20th century: gas molecules, light quanta, atomic energy levels.'),
    items: ['binomial', 'normal', 'gas', 'photoelectric', 'bohr'] }
];

/* 前置知识 */
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
const tName = t => L(t.title, t.en || t.title);
const tSub = t => L(t.en || '', t.title);

/* ---------- 学习进度 ---------- */
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

/* ---------- 语言切换按钮 ---------- */
(function buildLangToggle() {
  const box = document.getElementById('lang-toggle');
  if (!box) return;
  const zh = h('button', LANG === 'zh' ? 'on' : null, '中文');
  const en = h('button', LANG === 'en' ? 'on' : null, 'English');
  zh.onclick = () => { if (LANG !== 'zh') setLang('zh'); };
  en.onclick = () => { if (LANG !== 'en') setLang('en'); };
  box.append(zh, en);
  const foot = document.getElementById('sidebar-foot');
  if (foot) foot.textContent = L('免费 · 开源 · 适用于高中阶段', 'Free · Open Source · For High School');
})();

/* ---------- 侧边导航 ---------- */
function buildNav() {
  navEl.innerHTML = '';
  const home = h('a', 'nav-item', `<span class="ico">🏠</span> ${L('课程首页 Home', 'Home 首页')}`);
  home.href = '#home'; home.dataset.route = 'home';
  const path = h('a', 'nav-item', `<span class="ico">🗺️</span> ${L('学习路径 Path', 'Learning Path 路径')}`);
  path.href = '#path'; path.dataset.route = 'path';
  navEl.append(home, path);
  CATEGORIES.forEach(cat => {
    navEl.appendChild(h('div', 'nav-cat', cat.name));
    TOPICS.filter(t => t.cat === cat.id).forEach(t => {
      const a = h('a', 'nav-item',
        `<span class="ico">${t.icon}</span><span class="nav-txt">${tName(t)}</span><span class="nav-check">✓</span>`);
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
  const firstUndone = PATH_ORDER.find(id => !done.has(id)) || PATH_ORDER[0];
  const hero = h('div', 'home-hero', `
    <h1>${L('数理可视课堂', 'Math & Physics, Visualized')} <span class="en">${L('Interactive Math & Physics for High School', '交互式高中数学·物理可视化课堂')}</span></h1>
    <p>${L(`把高中数学与物理的核心原理变成<b>可以动手操作的图形和动画</b>：拖动滑块改变参数，
    亲眼看到函数曲线如何变化、物体如何运动、光线如何折射。${total} 个交互专题，覆盖高一到高三的主干知识。`,
    `Every core idea of high-school math and physics turned into <b>graphics and animations you can play with</b>: drag a slider and watch curves reshape, objects move, and light bend — ${total} interactive topics covering Grades 10–12.`)}</p>
    <div class="hero-actions">
      <a class="hero-btn primary" href="#path">${L('🗺️ 从零开始 · 查看学习路径', '🗺️ Start from Zero · Learning Path')}</a>
      <a class="hero-btn" href="#${firstUndone}">▶ ${done.size ? L('继续学习', 'Continue Learning') : L('直接开始第一课', 'Jump into Lesson 1')}</a>
    </div>
    ${done.size ? `<div class="hero-progress"><div class="hero-progress-bar"><span style="width:${pct}%"></span></div>${L(`已掌握 ${done.size}/${total} 个专题（${pct}%）`, `${done.size}/${total} topics mastered (${pct}%)`)}</div>` : ''}
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
            ${si >= 0 ? `<span class="badge">${L(`第${si + 1}站·${LEARNING_PATH[si].grade}`, `Stop ${si + 1} · ${LEARNING_PATH[si].grade}`)}</span>` : ''}
            ${isDone ? `<span class="badge done-badge">${L('✓ 已掌握', '✓ Mastered')}</span>` : ''}
          </span>
        </div>
        <h3>${tName(t)}<span class="en">${tSub(t)}</span></h3>
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
    <h1>${L('学习路径', 'Learning Path')} <span class="en">${L('A Guided Journey from Zero', '从零开始的系统学习路线')}</span></h1>
    <p>${L(`按下面 8 站的顺序学习，每一站都建立在前一站之上 —— 与高中教材进度（人教版）大体同步。
    学完一个专题后，点页面底部的「✓ 标记为已掌握」，进度会保存在这台设备的浏览器里。`,
    `Follow the 8 stops below in order — each builds on the last, roughly matching a standard high-school sequence.
    After finishing a topic, click “✓ Mark as mastered” at the bottom of its page; progress is saved in this browser.`)}</p>
    <div class="hero-progress"><div class="hero-progress-bar"><span style="width:${pct}%"></span></div>
    ${L(`总进度：${done.size}/${total}（${pct}%）`, `Overall progress: ${done.size}/${total} (${pct}%)`)}</div>
    ${firstUndone
      ? `<div class="hero-actions"><a class="hero-btn primary" href="#${firstUndone}">▶ ${L('继续学习：', 'Continue: ')}${tName(topicById(firstUndone))}</a></div>`
      : `<div class="hero-actions"><span class="hero-btn primary">${L('🎉 恭喜！全部专题已掌握', '🎉 Congratulations! All topics mastered')}</span></div>`}
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
         <span class="pi-title">${tName(t)}<em>${tSub(t)}</em></span>
         <span class="pi-check">${done.has(id) ? '✓' : ''}</span>`);
      a.href = '#' + id;
      box.appendChild(a);
    });
    wrap.appendChild(card);
  });
  root.appendChild(wrap);
}

/* ---------- 专题页底部：学习导航 ---------- */
function appendTopicFooter(topic) {
  const done = getDone();
  const foot = h('div', 'topic-footer');
  const pre = (PREREQS[topic.id] || []).map(id => topicById(id)).filter(Boolean);
  const idx = PATH_ORDER.indexOf(topic.id);
  const next = idx >= 0 && idx < PATH_ORDER.length - 1 ? topicById(PATH_ORDER[idx + 1]) : null;
  const si = stageIndexOf(topic.id);
  const btnOn = L('✓ 已掌握（点击取消）', '✓ Mastered (click to undo)');
  const btnOff = L('✓ 标记为已掌握', '✓ Mark as mastered');
  foot.innerHTML = `
    <div class="tf-row">
      <div class="tf-block">
        <div class="tf-label">${L('📚 学前建议掌握 PREREQUISITES', '📚 PREREQUISITES 学前建议')}</div>
        <div class="tf-chips">${pre.length ? pre.map(p =>
          `<a class="tf-chip ${done.has(p.id) ? 'ok' : ''}" href="#${p.id}">${done.has(p.id) ? '✓ ' : ''}${p.icon} ${tName(p)}</a>`).join('') :
          `<span class="tf-none">${L('无 —— 这是一个入门专题，直接开始吧！', 'None — this is a starter topic. Dive right in!')}</span>`}</div>
      </div>
      <button class="tf-done-btn ${done.has(topic.id) ? 'on' : ''}">${done.has(topic.id) ? btnOn : btnOff}</button>
    </div>
    <div class="tf-next">
      ${si >= 0 ? `<a class="tf-chip" href="#path">${L(`🗺️ 返回学习路径（第 ${si + 1} 站）`, `🗺️ Back to Path (Stop ${si + 1})`)}</a>` : ''}
      ${next
        ? `<a class="tf-next-link" href="#${next.id}">${L('下一站：', 'Next: ')}${next.icon} ${tName(next)} →</a>`
        : `<span class="tf-next-link">${L('🎓 这是路径的最后一个专题！', '🎓 This is the final topic on the path!')}</span>`}
    </div>`;
  foot.querySelector('.tf-done-btn').onclick = e => {
    toggleDone(topic.id);
    const on = getDone().has(topic.id);
    e.target.classList.toggle('on', on);
    e.target.textContent = on ? btnOn : btnOff;
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
  const site = L('数理可视课堂', 'Math & Physics Visualized');
  if (topic) {
    currentCleanup = topic.render(mainEl) || null;
    appendTopicFooter(topic);
    document.title = tName(topic) + ' · ' + site;
  } else if (id === 'path') {
    renderPath(mainEl);
    document.title = L('学习路径', 'Learning Path') + ' · ' + site;
  } else {
    renderHome(mainEl);
    document.title = site + ' · ' + L('Math & Physics Visualized', '数理可视课堂');
  }
}

document.getElementById('menu-btn').onclick = () => sidebar.classList.toggle('open');
window.addEventListener('hashchange', route);
buildNav();
route();
