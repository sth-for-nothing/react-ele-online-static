# 静态页面 部署 github page

# 效果展示
[https://sth-for-nothing.github.io/react-ele-online-static/](https://sth-for-nothing.github.io/react-ele-online-static/)

1. 代码本地运行正常 npm run build
2. 代码 push 到 github（git add/commit/push）
3. package.json 修改
```json
"homepage": "https://你的github名称.github.io/你的项目名称",
"scripts": {
  // 添加这俩
  "predeploy": "npm run build", // 将项目编译成静态文件放在 build目录
  "deploy": "gh-pages -d build" // 使用 gh-pages 部署你的build文件夹下的内容
}
```
4. 安装 gh-pages
> gh-pages 实际是 自动在 git 仓库下新建一个 gh-pages 分支，然后在setting下将主页设置为上传的 `build` 文件夹中的index.html就会自动读取页面内容。
```bash
npm install gh-pages --save-dev
```
5. yarn run deploy (前提已安装好 yarn)

## 小问题: 主页不显示，不报错
> 由于使用 react-router ，主页 pathname 为 '/'，而 https://sth-for-nothing.github.io/react-ele-online-static 的 pathname 为 '/react-ele-online-static'
解决方法：
`<BrowserRouter basename="/react-ele-online-static">`