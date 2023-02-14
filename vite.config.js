import {resolve} from "path"
import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

// 所有頁面進入點都放在 /src/pages 底下
const root = resolve(__dirname, "src", "pages")
// 編譯輸出檔案放在 /dist
const outputDir = resolve(__dirname, "dist")

// https://vitejs.dev/config/
export default defineConfig({
    // 重新指定index.html所在的根目錄
    root,
    plugins: [vue()],
    build: {
        outDir: outputDir,
        // vite.js 透過 rollup 打包，此處可自定義底層的 rollup 打包設定
        rollupOptions: {
            // 網站入口點設定
            // ref:https://rollupjs.org/configuration-options/#input
            input: {
                // 網站的超連結路徑必須要加上尾巴的"/"，如 <a href="/monster/">monster</a>
                home: resolve(root, "index.html"),
                monster: resolve(root, "monster", "index.html"),
                about: resolve(root, "about", "index.html"),
            },
        },
    },
    resolve: {
        // 此處定義路徑替換的別名
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
})
