# 数理可视课堂 · Math & Physics Visualized

面向高中生的**交互式数学·物理可视化学习网站**。每个专题包含：

- 🎛 **交互实验**：拖动滑块改变参数，图形/动画实时变化
- 📖 **中文原理讲解** + 英文术语 (English terms)
- 🧮 **核心公式** + 实时读数验证
- 💡 实验建议与思考题

纯静态网页（HTML + CSS + 原生 JavaScript Canvas），**零依赖、无需构建**。

## 本地使用

直接双击打开 `index.html` 即可；或启动任意静态服务器：

```bash
npx http-server -p 8080
# 打开 http://localhost:8080
```

## 部署上线（免费）

整个目录就是网站本身，可直接部署到：

- **GitHub Pages**：仓库 Settings → Pages → 选择分支根目录
- **Netlify / Vercel / Cloudflare Pages**：拖拽文件夹即可

## 课程目录

| 分类 | 专题 |
|---|---|
| 数学 · 函数与几何 | 二次函数 · 指数与对数函数 · 三角函数与单位圆 · 解三角形 · 平面向量 · 数列 · 复数与复平面 · 导数与切线 · 椭圆 · 双曲线与抛物线 · 正态分布 |
| 物理 · 力学 | 匀变速直线运动 · 斜面受力分析 · 抛体运动 · 匀速圆周运动 · 万有引力与卫星 · 机械能守恒（单摆）· 动量守恒与碰撞 · 简谐运动（弹簧振子）· 机械波 |
| 物理 · 电磁与光学 | 库仑定律与电场 · 欧姆定律与电路 · 带电粒子在磁场中（洛伦兹力）· 电磁感应 · 光的折射与全反射 · 凸透镜成像 |

## 如何新增专题

1. 在 `js/topics/` 下新建一个文件，调用 `registerTopic({ id, cat, icon, title, en, desc, render })`；
   - `cat` 取值：`math` / `mech` / `optics`（在 `js/app.js` 的 `CATEGORIES` 中可增加新分类）
   - `render(root)` 中用 `topicPage()` 搭骨架、`createCanvas()` + `Plot` 画图、`addSlider()` 加控件，返回清理函数
2. 在 `index.html` 中加一行 `<script src="js/topics/xxx.js"></script>`（在 `app.js` 之前）

公共工具见 `js/utils.js`：坐标系绘图 `Plot`、箭头 `pxArrow`、弹簧 `drawSpring`、动画器 `makeAnimator`、滑块/分段选择/读数面板等。
