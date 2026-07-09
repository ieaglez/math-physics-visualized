import SwiftUI
import WebKit

/// 加载打包在 App 内的离线网页（Web/ 目录）。
struct WebView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        // 持久化数据存储：localStorage（学习进度、语言偏好）随 App 保留
        config.websiteDataStore = .default()

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 0.953, green: 0.961, blue: 0.984, alpha: 1)
        webView.allowsBackForwardNavigationGestures = false

        if let index = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") {
            webView.loadFileURL(index, allowingReadAccessTo: index.deletingLastPathComponent())
        }
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate {
        /// 截图/调试直达入口：`simctl launch ... -page trig -autoplay 1`
        /// 正常用户启动时无这些参数，行为不变。
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            let ud = UserDefaults.standard
            guard let page = ud.string(forKey: "page"), !page.isEmpty else { return }
            var js = "location.hash='#\(page)';"
            if ud.bool(forKey: "autoplay") {
                js += "setTimeout(()=>{const b=[...document.querySelectorAll('.btn-row .btn')]"
                js += ".find(x=>/播放|Play/.test(x.textContent));b&&b.click();},600);"
            }
            webView.evaluateJavaScript(js, completionHandler: nil)
        }

        /// 站内是 file:// + hash 路由；任何 http(s) 页面跳转都交给系统浏览器，
        /// 保证 App 内容始终是打包的离线内容（也符合审核预期）。
        func webView(_ webView: WKWebView,
                     decidePolicyFor navigationAction: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if navigationAction.navigationType == .linkActivated,
               let url = navigationAction.request.url,
               ["http", "https"].contains(url.scheme?.lowercased() ?? "") {
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }
    }
}
