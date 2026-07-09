# 数理可视课堂 · iOS App（iPhone + iPad）

网站的原生 iOS 外壳：**全部网页内容打包在 App 内，完全离线运行**。网站仍是唯一内容源——网页更新后跑一次 `./sync-web.sh` 再重新打包即可。

## 目录结构

```
ios/
├── MathPhysicsLab.xcodeproj    Xcode 工程（双击打开）
├── MathPhysicsLab/
│   ├── App.swift               SwiftUI 入口
│   ├── WebView.swift           WKWebView 容器（离线加载 Web/，外链交给 Safari）
│   ├── Info.plist              显示名"数理可视课堂"、横竖屏、出口合规声明
│   ├── Assets.xcassets/        App 图标（1024px，无透明通道）
│   └── Web/                    网站文件副本（由 sync-web.sh 生成）
├── sync-web.sh                 同步网站文件 → Web/
└── make-icon.swift             重新生成图标：swift make-icon.swift
```

## 本地运行（模拟器 / 真机）

1. 双击 `MathPhysicsLab.xcodeproj` 用 Xcode 打开；
2. 顶部选一个模拟器（iPhone 或 iPad）→ ⌘R 运行；
3. 真机运行需在 Signing & Capabilities 里选择你的 Team（免费 Apple ID 即可真机调试）。

## 上架 App Store 步骤

**前提：加入 [Apple Developer Program](https://developer.apple.com/programs/)（个人 99 美元/年），这一步只能你本人完成。**

1. **改 Bundle ID**：Xcode → 项目 → Signing & Capabilities，把 `com.ieaglez.mathphysicslab` 改成你自己的反域名（保持唯一），Team 选你的开发者账号，勾选 Automatically manage signing；
2. **同步最新网页**：`./sync-web.sh`；
3. **归档**：Xcode 菜单 Product → Archive（目标选 Any iOS Device）；
4. **上传**：归档完成后在 Organizer 点 Distribute App → App Store Connect → Upload；
5. **App Store Connect**（appstoreconnect.apple.com）新建 App：
   - 名称：数理可视课堂（或 Math & Physics Visualized）；
   - 类别：教育 Education；年龄分级：4+；价格：免费；
   - 隐私政策 URL：`https://ieaglez.github.io/math-physics-visualized/privacy.html`；
   - App 隐私：选择 **"不收集数据 Data Not Collected"**（App 无账号、无统计、无第三方 SDK，如实填写即可）；
   - 截图：模拟器里 ⌘S 截图，需要 6.7" iPhone 和 13" iPad 两组；
6. **提交审核**。

## 关于审核规范（重要，请如实了解）

- 出口合规：Info.plist 已声明 `ITSAppUsesNonExemptEncryption = NO`（不使用加密），提交时不会再询问；
- 隐私：无任何数据收集，隐私标签填"Data Not Collected"完全属实；
- **指南 4.2（最低功能要求）**：Apple 会拒绝"把网址套壳"的 App。本项目的应对是：内容完整打包、**离线可用**、38 个交互实验是真实的应用功能而非网页快照——这类离线教育工具通常可以通过。建议在提交时的"审核备注 (App Review notes)"里写明：
  > This is a fully offline interactive education app: all 38 physics/math simulations are bundled inside the app and work without any network connection. No account, no ads, no data collection.
- 不能保证 100% 过审（4.2 的裁量权在审核员），若被拒可在回复中强调离线交互性，或后续加原生功能（如练习题、通知）增强"App 感"。

## 已知取舍

- 界面字体在无网络时回退到系统苹方字体（Google Fonts 加载失败会优雅降级），显示正常；
- 学习进度存于 App 内 WebView 的 localStorage，删除 App 会清空（与网页版逻辑一致）。
