# App Store 提审资料包 · 数理可视课堂

> 本文件的每一节对应 App Store Connect 里的一个填写项，直接复制粘贴即可。
> 商店页做**中英双语**：主要语言 简体中文 + 添加 English (U.S.) 本地化（§5B）。
> 截图在 `ios/AppStore/screenshots/`：中文界面与英文界面各 12 张（iPhone 6.9″ + iPad 13″），尺寸已按 Apple 规范生成。

---

## 0. 提交前置条件（一次性）

| 事项 | 状态 |
|---|---|
| Apple Developer Program（个人 ¥688/年） | ⬜ 需你完成注册（developer.apple.com） |
| Xcode 签名 Team | ✅ 已设置（WP7VFLLBH4） |
| Bundle ID `com.ieaglez.mathphysicslab` | ⬜ 在 developer.apple.com → Identifiers 注册（或 Xcode 自动注册） |
| App 图标 1024×1024（无透明通道） | ✅ 已内置 |
| 出口合规 `ITSAppUsesNonExemptEncryption=false` | ✅ 已写入 Info.plist（提交时不会再问加密问题） |
| 隐私政策网页 | ✅ https://ieaglez.github.io/math-physics-visualized/privacy.html |

**提交流程**：Xcode 顶部设备选 **Any iOS Device (arm64)** → 菜单 Product → **Archive** → 弹出 Organizer 后点 **Distribute App → App Store Connect → Upload**（一路默认）→ 到 [appstoreconnect.apple.com](https://appstoreconnect.apple.com) 新建 App 并按下文填表 → 版本页选中刚上传的构建 → **提交以供审核**。

---

## 1. 新建 App（App Store Connect → 我的 App → ＋）

| 字段 | 填写 |
|---|---|
| 平台 | iOS |
| 名称 | 数理可视课堂 |
| 主要语言 | 简体中文 |
| 套装 ID | com.ieaglez.mathphysicslab |
| SKU | mathphysicslab-001 |
| 用户访问权限 | 完全访问权限 |

> 若名称"数理可视课堂"被占用，备选：**数理可视课堂·初高中数理实验室**（≤30 字符即可）。

**添加英文本地化**：App 创建后，在 App Store Connect 任意信息页右上角的语言下拉菜单 → **添加语言 → English (U.S.)**。名称/副标题/描述/关键词/截图都是**按语言分别填写**的：中文页用 §5A，英文页用 §5B。海外用户看到英文商店页，国内用户看到中文页。

---

## 2. App 信息（App Information）

| 字段 | 填写 |
|---|---|
| 类别（主要） | 教育 Education |
| 类别（次要，可选） | 参考资料 Reference |
| 内容版权 | 不包含第三方内容 |
| 年龄分级 | 全部问题选"无"→ **4+** |

---

## 3. 价格与销售范围

| 字段 | 填写 |
|---|---|
| 价格 | **免费**（0 元档） |
| 销售范围 | 全部国家/地区（或按需只选中国大陆） |
| 是否含广告 | 否 |
| App 内购买 | 无 |

---

## 4. App 隐私（App Privacy）

先填隐私政策网址：

```
https://ieaglez.github.io/math-physics-visualized/privacy.html
```

然后"数据收集"问卷第一题 **"是否从此 App 收集数据？"选「否，我们不从此 App 收集数据」**，即完成（标签显示为"未收集数据 Data Not Collected"）。

> 依据：App 完全离线，无账号、无网络请求、无 SDK；学习进度和语言偏好只存在设备本地 localStorage。

---

## 5A. 版本信息 — 简体中文（主要语言）

### 5.1 副标题（Subtitle，≤30 字符）

```
初高中数学物理 69 个交互实验
```

### 5.2 推广文本（Promotional Text，≤170 字符，可随时改）

```
拖动滑块，公式立刻"动"起来：抛体划出轨迹、单摆来回摆动、正方体切出六边形截面。69 个专题覆盖初一到高三数学物理主干知识，完全免费、无广告、无需注册，离线可用。
```

### 5.3 描述（Description，≤4000 字符）

```
数理可视课堂是一款面向初中和高中学生的数学·物理交互式学习工具。我们相信：公式不是用来背的，是用来"看见"的。

每个专题都是一个可以动手操作的小实验——拖动滑块改变参数，图形和动画实时变化，配上中文原理讲解和英文术语，让抽象概念变得直观。

【69 个专题，覆盖初一到高三】
• 初中数学（14）：有理数与数轴、一元一次方程（天平模型）、一次函数、反比例函数、平行线与角、三角形内角和、勾股定理、相似三角形、圆周角定理、锐角三角函数、统计与概率等
• 初中物理（14）：速度、二力平衡与惯性、声音的特性、压强、密度与浮力、杠杆、滑轮组、机械效率、平面镜成像、物态变化、比热容、电功率与安全用电、电磁铁、电动机等
• 高中数学（19）：集合、二次函数、基本不等式、指数对数、三角函数与单位圆、三角恒等变换、解三角形、向量、数列、复数、导数与切线、直线与圆、圆锥曲线、立体几何与截面、二项分布、正态分布等
• 高中物理（22）：匀变速运动、力的合成与分解、抛体、圆周运动、万有引力与卫星、机械能守恒、动量与碰撞、简谐运动、机械波、库仑定律、电路、洛伦兹力、电磁感应、交流电、折射与全反射、透镜成像、双缝干涉、理想气体、光电效应、氢原子能级、原子核与半衰期等

【为什么选择数理可视课堂】
• 循序渐进的学习路径：13 站从入门到进阶，标注前置知识，跟着走就不会迷路
• 学习打卡：每个专题可标记"已掌握"，进度保存在设备本地
• 中英双语：一键切换，讲解、公式、读数全站双语，兼顾英文术语积累
• 学段筛选：初中 / 高中 / 全部，内容按需展示
• 完全离线：所有内容打包在 App 内，地铁上、飞机上都能学
• 真正免费：无广告、无内购、无注册登录、不收集任何数据

适合：初一到高三学生课内同步与预习复习、教师课堂演示、以及所有对数学物理保有好奇心的人。
```

### 5.4 关键词（Keywords，≤100 字符，半角逗号分隔）

```
物理,数学,初中,高中,中考,高考,函数,几何,力学,电磁,光学,实验,仿真,可视化,公式,课堂,学习,教育
```

### 5.5 技术支持网址（Support URL）

```
https://github.com/ieaglez/math-physics-visualized/issues
```

### 5.6 营销网址（Marketing URL，可选）

```
https://ieaglez.github.io/math-physics-visualized/
```

### 5.7 版权（Copyright）

```
© 2026 Zhang Yi
```

### 5.8 版本新增内容（What's New）

首个版本无需填写（字段不出现）；后续更新示例：

```
• 修复动画播放时面板抖动的问题
• 新增专题若干，欢迎在支持页面反馈想学的内容
```

---

## 5B. 版本信息 — English (U.S.) 本地化

### 名称（Name，≤30 字符）

```
Math & Physics Visualized
```

### 副标题（Subtitle，≤30 字符）

```
Math & physics you can touch
```

### 推广文本（Promotional Text，≤170 字符）

```
Drag a slider — watch projectiles fly, pendulums swing, and a cube reveal its hexagonal cross-section. 69 interactive labs for grades 7-12. Free, offline, no ads.
```

### 描述（Description）

```
Math & Physics Visualized turns middle- and high-school math and physics into hands-on interactive experiments. We believe formulas aren't for memorizing — they're for seeing.

Every topic is a live lab: drag sliders to change parameters and watch graphs, motion and simulations respond in real time, with clear explanations in both English and Chinese.

69 TOPICS COVERING GRADES 7-12
• Middle-school math (14): the number line, linear equations as a balance, linear & inverse functions, systems of equations, angles with parallel lines, triangle angle sum, the Pythagorean theorem, similar triangles, inscribed angles, basic trigonometry, statistics & probability, and more
• Middle-school physics (14): speed, balanced forces & inertia, sound, pressure, density & buoyancy, levers, pulleys, mechanical efficiency, plane mirrors, changes of state, specific heat, electric power & safety, electromagnets, motors & generators, and more
• High-school math (19): sets, quadratic functions, the AM-GM inequality, exponents & logarithms, the unit circle, trig identities, solving triangles, vectors, sequences, complex numbers, derivatives & tangent lines, lines & circles, conic sections, solid geometry & cross-sections, binomial and normal distributions, and more
• High-school physics (22): kinematics, force composition, projectile & circular motion, gravitation & satellites, energy conservation, momentum & collisions, simple harmonic motion, waves, Coulomb's law, circuits, the Lorentz force, electromagnetic induction, AC & transformers, refraction & total internal reflection, lenses, double-slit interference, ideal gases, the photoelectric effect, hydrogen energy levels, radioactive decay, and more

WHY STUDENTS LOVE IT
• A guided learning path: 13 stations from beginner to advanced, with prerequisites marked
• Progress check-offs stored on your device — no account needed
• Fully bilingual: switch between English and Chinese anytime
• Filter by level: middle school / high school / all
• 100% offline: everything ships inside the app
• Truly free: no ads, no in-app purchases, no sign-up, no data collection

For students in grades 7-12, teachers who want live classroom demos, and anyone curious about how math and physics actually work.
```

### 关键词（Keywords，≤100 字符）

```
physics,math,algebra,geometry,trigonometry,calculus,simulation,STEM,school,interactive,formula
```

### 版本新增内容（What's New，更新时用）

```
• Fixed panel jitter during animation playback
• New topics added — tell us what you'd like to learn next on the support page
```

> 技术支持网址 / 营销网址 / 版权与中文页相同（§5A 5.5–5.7）。

---

## 6. 截图上传(本仓库已生成)

| 语言页 | App Store Connect 槽位 | 用哪个文件夹 | 尺寸 |
|---|---|---|---|
| 简体中文 | iPhone 6.9″ 显示屏 | `screenshots/iphone-6.9/`（6 张） | 1320×2868 |
| 简体中文 | iPad 13″ 显示屏 | `screenshots/ipad-13/`（6 张） | 2064×2752 |
| English (U.S.) | iPhone 6.9″ 显示屏 | `screenshots/iphone-6.9-en/`（6 张） | 1320×2868 |
| English (U.S.) | iPad 13″ 显示屏 | `screenshots/ipad-13-en/`（6 张） | 2064×2752 |

> 每组只需这两种尺寸：其余 iPhone/iPad 尺寸 Apple 会自动沿用缩放。按文件名顺序上传：首页 → 学习路径 → 三角函数 → 抛体运动 → 正方体截面 → 电路。中英文截图内容一一对应，界面语言不同。

---

## 7. App 审核信息（App Review Information）

| 字段 | 填写 |
|---|---|
| 登录信息 | **不需要登录**（勾选"不需要登录"） |
| 联系人姓名 | 张易（按你实际姓名） |
| 联系电话 | ⬜ 你的手机号（+86 …） |
| 联系邮箱 | zhangyi@outlook.com |

**备注（Notes）——直接粘贴：**

```
本 App 是面向初高中学生的数学·物理交互式学习工具，全部 69 个交互专题
内容打包在 App 内，完全离线运行，无任何网络请求，无账号系统，不收集
任何数据（App Privacy 已声明 Data Not Collected）。

测试建议：
1. 首页点击任意专题（如"抛体运动"），拖动滑块改变初速度/角度，
   点击"播放"观看实时动画；
2. 左侧栏可切换 初中/高中/全部 学段，也可一键切换中英双语；
3. "学习路径"页展示 13 站循序渐进的学习安排。

关于 4.2（最低功能要求）的说明：本 App 并非网站套壳——所有内容离线
内置，核心体验是 Canvas 实时交互实验（拖动参数→图形/动画即时响应、
物理模拟、3D 截面演示），提供原生应用级的交互体验。

This is a fully offline interactive math & physics learning app for
middle/high school students (69 interactive labs, canvas-based real-time
simulations). No login, no network requests, no data collection.
```

---

## 8. 提交后

- 审核通常 1–3 天；被拒不用慌，回复审核团队说明或按意见修改后重新提交即可。
- 通过后可选择"自动发布"或"手动发布"（版本页顶部设置）。
- 以后每次更新：改网页 → 跑 `ios/sync-web.sh` → Xcode 里把 Version/Build 号 +1 → Archive → Upload → 版本页填 What's New → 提交。
