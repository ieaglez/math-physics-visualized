'use strict';
/* ===== 应用框架：导航 + 路由 + 首页 ===== */

const CATEGORIES = [
  { id: 'math',   name: '数学 · 函数与几何', en: 'Functions & Geometry', color: '#7c3aed' },
  { id: 'mech',   name: '物理 · 力学',       en: 'Mechanics',            color: '#ea580c' },
  { id: 'optics', name: '物理 · 电磁与光学', en: 'E&M & Optics',         color: '#0891b2' }
];

const mainEl = document.getElementById('main');
const navEl = document.getElementById('nav');
const sidebar = document.getElementById('sidebar');
let currentCleanup = null;

/* 侧边导航 */
function buildNav() {
  navEl.innerHTML = '';
  const home = h('a', 'nav-item', '<span class="ico">🏠</span> 课程首页 Home');
  home.href = '#home';
  home.dataset.route = 'home';
  navEl.appendChild(home);
  CATEGORIES.forEach(cat => {
    navEl.appendChild(h('div', 'nav-cat', cat.name));
    TOPICS.filter(t => t.cat === cat.id).forEach(t => {
      const a = h('a', 'nav-item', `<span class="ico">${t.icon}</span> ${t.title}`);
      a.href = '#' + t.id;
      a.dataset.route = t.id;
      navEl.appendChild(a);
    });
  });
}

/* 首页 */
function renderHome(root) {
  root.innerHTML = '';
  const hero = h('div', 'home-hero', `
    <h1>数理可视课堂 <span class="en">Interactive Math &amp; Physics for High School</span></h1>
    <p>把高中数学与物理的核心原理变成<b>可以动手操作的图形和动画</b>：拖动滑块改变参数，
    亲眼看到函数曲线如何变化、物体如何运动、光线如何折射。比死记公式更直观，比刷题更有趣。</p>
    <p style="font-size:13px">💡 点击下方任意卡片开始探索，每个专题都包含：交互实验 · 原理讲解 · 公式 · 英文术语 (English terms)。</p>
  `);
  root.appendChild(hero);
  CATEGORIES.forEach(cat => {
    const sec = h('div', 'home-cat',
      `<h2><span class="dot" style="background:${cat.color}"></span>${cat.name} <span style="color:#9ca3af;font-size:13px;font-weight:500">${cat.en}</span></h2>`);
    const grid = h('div', 'card-grid');
    TOPICS.filter(t => t.cat === cat.id).forEach(t => {
      const card = h('a', 'card', `
        <span class="ico">${t.icon}</span>
        <h3>${t.title}<span class="en">${t.en}</span></h3>
        <p>${t.desc}</p>`);
      card.href = '#' + t.id;
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    root.appendChild(sec);
  });
}

/* 路由 */
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
    document.title = topic.title + ' · 数理可视课堂';
  } else {
    renderHome(mainEl);
    document.title = '数理可视课堂 · Math & Physics Visualized';
  }
}

document.getElementById('menu-btn').onclick = () => sidebar.classList.toggle('open');
window.addEventListener('hashchange', route);
buildNav();
route();
