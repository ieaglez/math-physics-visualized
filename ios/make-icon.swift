// 生成 1024×1024 无透明通道的 App 图标（渐变背景 + ∑ 符号）
// 用法：swift make-icon.swift 输出路径.png
import AppKit
import CoreGraphics
import UniformTypeIdentifiers

let out = CommandLine.arguments.count > 1 ? CommandLine.arguments[1]
        : "MathPhysicsLab/Assets.xcassets/AppIcon.appiconset/AppIcon.png"
let S = 1024
let cs = CGColorSpaceCreateDeviceRGB()
let ctx = CGContext(data: nil, width: S, height: S, bitsPerComponent: 8,
                    bytesPerRow: 0, space: cs,
                    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!

// 对角渐变：#5B5BF0 → #9333EA（与网站主视觉一致）
let colors = [CGColor(red: 0.357, green: 0.357, blue: 0.941, alpha: 1),
              CGColor(red: 0.576, green: 0.200, blue: 0.918, alpha: 1)] as CFArray
let grad = CGGradient(colorsSpace: cs, colors: colors, locations: [0, 1])!
ctx.drawLinearGradient(grad, start: CGPoint(x: 0, y: CGFloat(S)),
                       end: CGPoint(x: CGFloat(S), y: 0), options: [])

// 白色 ∑
let nsCtx = NSGraphicsContext(cgContext: ctx, flipped: false)
NSGraphicsContext.current = nsCtx
let attrs: [NSAttributedString.Key: Any] = [
  .font: NSFont.systemFont(ofSize: 560, weight: .bold),
  .foregroundColor: NSColor.white
]
let str = NSAttributedString(string: "∑", attributes: attrs)
let b = str.size()
str.draw(at: NSPoint(x: (CGFloat(S) - b.width) / 2, y: (CGFloat(S) - b.height) / 2))
NSGraphicsContext.current = nil

let img = ctx.makeImage()!
let url = URL(fileURLWithPath: out) as CFURL
let dest = CGImageDestinationCreateWithURL(url, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, img, nil)
CGImageDestinationFinalize(dest)
print("✓ icon written to \(out)")
