
> 優點: static build, 整合許多plugins
  
# Create page 3種方法
1. `src/pages/` folder  
  
     gatsby 自動建立此資料夾底下的檔案為static file，檔名即為 path `/path/`  
     若有index.js，就會成為 root path `/`  
     
ps. 就算 gatsby-node 有定義 `path: '/'`，還是由 `pages/index.js` 優先  

---
2. createPage api  
  
在 gatsby-node.js implement `createPages` function  
  
```js
exports.createPages = async ({ graphql, actions }) => {
...
actions.createPage({
    path: '/in-templates',
    component: path.resolve(`./src/templates/in-templates.js`),
    context: {}
  })
```
可建立在隨意的folder  
可自訂 `path`, 或塞入自訂 `context`  
`component` 需帶入 path.resolve的位置 （node library, return absolute path)  

可搭配 graphql 取得 static markdown file 展開成所有頁面  
或是搭配 static file 展開成所有頁面（sens product detail）  
(markdown, json, yaml)  

3. File System Route API
file based route  
