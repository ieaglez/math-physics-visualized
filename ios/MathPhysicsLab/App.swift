import SwiftUI

@main
struct MathPhysicsLabApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    var body: some View {
        WebView()
            .ignoresSafeArea()                                       // 网页自带 safe-area 适配
            .background(Color(red: 0.953, green: 0.961, blue: 0.984)) // 与网站背景 #f3f5fb 一致
            .statusBarHidden(false)
    }
}
