### 2021 06 28 
- ant.table column: 有帶dataIndex `render: value => {}` v.s. 沒帶dataIndex `render: record => {}`
- mime type.  
  資料的媒體型別，瀏覽器可決定如何呈現資料  
  `text/HTML` `application/json` `application/pdf`   
  multi part file upload 支援 帶入body `Content-type: {type}`.  
  http response Content-Type `binary/octet-stream`(無設定是什麼類型) or `image/png`（有設定）   
- porting gatsby-ssr https://github.com/revtel/sensationsprint/commit/da8da3ea9f5f505b10254056ed147f02731b01ce  
  `wrapPageElement`, `wrapRootElement` of `gatsby-ssr` & `gatsby-browser`  
  `pageContainer` 包 layout, page 邏輯  
  `AppRoot` 包 Provider, root 邏輯  
  所有舊的 withPage 都拿掉  
- refactor with `reconnect.js` https://github.com/revtel/sensationsprint/commit/a4dae5e49d322ae4986188ad8b2056d12e71a581  
  token, profile 問題：原本 redux 範圍太廣，所以在autologin & login時也把profile token 存到 reconnect裡  
  `ActionCreator`, class component 無法使用hook: 所以要用 `getOutlet` or `getNewOutlet`（class component 還是建議改成 function ）.  
  global state & actions 有兩種 寫法:  
  1. 寫成 primitive js   
     create js file and use `getNewOutlet` configure state & actions， import this file into root file(AppRoot)  
  2. 包成 function component  
     use `useOutlet` configure state & actions ，actions先用 useRef 存成 object，import and wrap AppRoot.  
    

### 2021 06 25
- fb developer 提供 檢查分享og data 的功能 [link](https://developers.facebook.com/tools/debug/)
- $0.scroll > $0 可以直接 access 選到的 html element DOM，可以對他操作web api
- 綠界可以支援 四大超商 物流（但是不能超商互相送），問凹豆 這個可以嗎？
- import x from "y/z or y.z"; 可以減輕 bundle size, import { w, u } 不一定可以減輕
- run web on mobile > gatsby develop -H 0.0.0.0
- RPC remote procedure call: 一個概念， 延伸應用 json rpc

### 2021 06 16
- [unicode & utf8](https://github.com/U1320100568/note/issues/16)
- bytes 應用
  `Charset`: Unicode standard
  `Character Encoding`: UTF8 standard
- node dev require: 
  - require package: `var moment = require("moment")`
  - require my-util: `var {getDeadline} = require("./src/Utils/billingUtil")`
  

### 2020 06 09
- Set : membership testing  
  塞進一個  iterable => `new Set ( [ 1, 2, 3 ] )`  
  distinct element   
  [js] Common Operation : `has` , `add` , `delete` , `clear` 只支援單個element 操作.  
  [js] 不能用`for in`, not Object   

### 2020 05 28
- [apply article service](https://github.com/revtel/rev-dashboard-web/wiki/Apply-Article-Service) 
- gatsby navigate(-1) page not found
  <img height="400" src="https://user-images.githubusercontent.com/35591116/120282232-7a02b400-c2ec-11eb-96c5-7cdaa528dc6c.png" alt=""/>
- [scroll container's absolute child](https://codesandbox.io/s/overflow-and-absolute-issue-kx3ub?file=/index.css)
  其他child過多造成container scroll， 其他 absolute child 會跟著滾動。
- [re-mount issue](https://github.com/U1320100568/note/blob/master/React/Component%20Re-render%20and%20Re-Mount.md)
- `console.trace()`：debug 可以追到哪一層報錯
- 拿到children 對children element 沒有支配權，想要帶入其他props 可以使用 `React.cloneElement`
- Husky v6.  
  Husky 整lint 工具  
  lint-staged   


### 2020 05 26
- [functional HOC](https://github.com/U1320100568/note/blob/master/React/functional%20HOC.md)
- [react-jsonschema](https://dashboard-stg-eculture.netlify.app/)  
   適合結構不複雜的dashboard(不在意style)  
   太多層的結構，很難custom  
   ArrayTemplate, Custom Field, Custom Object  
- starter project.  
  npm revtel > init app    
  開發：npm start , node cli or node cli.js   
  npx   
  cli template resource table search and paging  
  nodejs 專用library，gatsby v2 web pack 有特別處理，v3 沒有需特別注意  
  
### 2020 05 19
- [article reference](https://rick38yip.medium.com/testflight-not-showing-the-latest-build-of-ios-app-2020-may-33735b0380d6) add this setting into ios info.plist App Uses Non-Exempt Encryption = NO
- run mongo instance on docker and db aggregation syntax [tutorial](https://github.com/revtel/revteltech.dev/tree/main/src/_drafts/mongodb-aggregation-intro-by-example)
- user custom ordering
   - sort by other field
   - set priority field
   - mapping array [賽斯]
     ```
     list.sort((a, b) => sorting(a, b, ["賽斯小學堂", "許醫師講座", "最新熱播"], maxlength))
     
     function sorting(x, y, order = [], lng = 0) {
	  let xIdx = order.indexOf(x.name);
	  let yIdx = order.indexOf(y.name);
	  return (xIdx === -1 ? lng : xIdx) - (yIdx === -1 ? lng : yIdx);
     }
     ```
- SQS simple queue service
  separate action 某事件觸發另外一個action
  SNS simple notification service
- csv to string `=“”${order.id}””`
- css sticky: 黏住某個部份，讓其他部分可以滾動，常用於 two column layout

### 2020 05 10
- seo
Title, description, image, alt  
Url 不要用id =1 之類的，盡量用有效文字（如商品名稱）（商品不多的情況下）.  
直接給Site route robot.txt or sitemap..txt(gatsby) ??  
Light house 評分工具.  
[Sam seo, ga, pixel 分享](https://www.evernote.com/shard/s236/sh/74e2ea33-3236-222b-ab50-0800aef94b94/188e03b74595b57d443869ce18064671)


### 2020 05 05
- GitHub actions
  - actions/setup-node@v2 <  other repo
  - ${{ variable }} < 變數
  - run |   < multi line   
    npm xx  
    npm xx   
  - cron < 定時做的排程 
  - workflow_dispatch < 外部系統 或是 GitHub trigger action
  - input.article.name < 可以取得input value

### 2020 04 25
- react-images deprecated > react-responsive-carousel
- message.loading create dispatch flow
- react-pdf
ReactPDF.render(不能用), ReactPDF.renderToStream(不能用), < PDFViewer />, PDFDownloadLink
- 不用class 寫 物件導向(object-orientation)
`return Object.freeze({ name, eat })`  
外部不能修改要透過setter  
繼承的function 覆寫, 改寫
  - Extend 原本class沒有 
  - overwrite 覆寫原本的function
  - Delegate 基於原本的function，還要做額外的事
  ```
  Function eat() {
	base.eat();
	console.log(“extra action”)
  }
  ```

- get resource 前端有需要轉換成 custom object嗎？（class）.     
  1. 不推薦 
      - 無法 Object spread（freeze）
      - State management > render (class instacne沒辦法偵測有無改變).  
  2. 可使用狀況
  如果有backend 比較慢的情況，可能可以做class getter setter。   
  3. compute property.  
  如果有個compute property可以建立一個util在get list 附加上每個instance上.  
  x.name = function getName() {return this.first + this.last }    
  Ps. Normal function this = 當下的closure instance(involking pattern)，不能是arrow function.  


### 2020 04 23
- OAuth
  authentication 身份認證 who r u 
  authorization 授權 what can you do
  Open authorization 授權什麼程式可以用這個權限
  為了解釋第三方程式可以代理，存取的權限，而不是直接給漲密

### 2020 04 14
- [設定企業帳號gmail](https://github.com/U1320100568/note/blob/master/Google%20Console/%E4%BC%81%E6%A5%AD%E6%9C%83%E5%93%A1email%20setting.md)
- EventEmitter e.emit(“name”, data) or e.on / e.off / e.one
- html <script async /> `async` attribute，不會等他載完，是異步的，通常會聽ready event，才會call 他的global symbol(執行)



### 2020 04 07
- Android debugging in release mode  
`react-native run-android --variant=release`  
   - *wireless debugging*  
`adb tcpip <port>`  
`adb connect <ip>:<port>`  
`adb disconnect`  
   - *log & process & thread*  
印出log或是儲存成檔案觀看  
辨識是問題是出在react native 還是 native？  
看某個react native app 的log ，就可以找到特定的process id & grep it  
而 react native js engine 只會跑在某thread 下  
- Netlify add new domain
Netlify > revtel > Domains > Add or register domain  
順著流程，最後把四台server名稱貼到godaddy > 該domain > DNS管理 > 我要用自己的名稱伺服器 下  
如果遇到 您的連線不是私人連線問題：  
Netlify > proj > domain settings >下面certificate要renew  
概念：sensationsprint.com.tw -> 找到godaddy 的dns, godaddy 跟browser說 這個ip 是在netlify的server上（netlify管的）  


### 2020 03 22
- article service preview 最近會更新（控制鈕固定在最上方、換行行距很大問題、粗體沒有apply）
- gatsby 上一頁 https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#how-to-use-the-navigate-helper-function
```
if(typeof window !== “undefined” && window.history.length > 0) {
	navigate(-1);
}
```
- prevent animate when preload https://github.com/U1320100568/note/issues/14  
- class & prototype & this & functions  
Const t = new Test();  
Prototype,  static 存在於 Class   
一般function 會存到class .prototype. 
Arrow function 是 該instance (this) 的function. 
若呼叫instance.fn()，會去找this裡的function，找不到的話，會找產生他的constructor裡的 prototype function 。
- checksum 特定規則驗證號碼對錯，例如：訊號輸入（硬體檢查）、身分證字號
- 
  
### 2020 03 19
- SHELL ENV VARIABLE 環境變數
`KEY=VALUE node` (開啟一個獨立的process)  
`Process.env.KEY  = ‘VALUE’;`  
  
在外部 shell `echo $KEY` 拿不到  
但是在外部 (外部的shell，會另外開起一個root process)  
```
KEY=VALUE  
echo $KEY = ‘VALUE’   
```
  
- Javascript engine (js runtime)   
``` 
┣ Web  
┃ ┣ Chrome v8  
┃ ┣ Firefox spider monkey  
┃ ┗ Safari JSC (javascript core)  
┗ React native   
  ┣ IOS build in OS JSC (每個OS 都不同)  
  ┣ Android JSC package （每個OS 都是一樣的package）  
  ┗ RN 0.64 Hermes (fb 官方推的runtime)  
```
  
### 2020 03 17
實作global modal or message
React.forwardRef 
Modal Component 帶進 (props, ref)
Modal Component ref.current = { 可供外部call的東西 } : 在useEffect 裡 assign
外部 useRef 帶進ref={ref}，外部可以call ref 的 function

### 2020 03 12
- custom hook render component
**return Component(function) vs JSX Element**  
render component: 每次call hook 裡的 render component(1) 會產生的 element 是不同的，所以如果有input text會loose focus  
```
function useHook() {
	const C = () => {} //1. component
	return { C }
	const D = <div/>  // 2. jsx Element
	return { D }
	
}

const {C} = useHook();
<C/>
<C'/>
```
原因：composite element 不同type(function reference) ，react 會認為是不同的component被re-render  


### 2020 02 22
- j storage(mongodb? unix?) date 格式 timestamp 數值單位是 秒  
[parse to js date](https://stackoverflow.com/a/847196/13797221) 需乘1000為毫秒單位: `new Date(1613791932 * 1000)`
- jstoarge dashboard
list 可以看到部分資料（排除content, children, password, created, updated）
- mongodb playground 
https://mongoplayground.net/
- Error Handle: Exception vs return error value
	- Exception: `throw new Error(message) or ErrCustom(message) `
	- Error Value: `return message`
Exception 好處 Cross calls stack 時，不用特別處理Propagation，但要注意catch位置 
	


- iterator & iterable & generator
for of iterable (js)
for in iterable (pyhton) 
Iterable 包含 iterator 
Iterator 包含Local state & next()
Custom iteration protocol :  gerenetor
```js
// this is generator
function* Iterable(data) {
	for (let i =0; data.length; I++) {
		yield	 data[I];
	}
}
 
```
- css 多行文字 刪節號 line-clamp



### 2020 02 02
- `<input type="checkbox" />` default value : checked={}   
Ant design  
defaultChecked 不管是否被選到的初始值  
group 的 value, defaultValue  

- custom static component  
條件：容許不同project有不同內容，內容只有靜態的純文字的呈現，由我們自己編輯  
可考慮使用  
  1. 寫成html file，直接import "xxx.html"  
      不確定能否這樣使用  
  2. 寫成html file，build script將html讀取轉成字串存成json，需要用的時候import，塞入`dangerouslysetinnerhtml` 
  ⚠ 需注意：generate `html.json` gatsby build 會 error，以其他名稱替代
  
- jump {}: `cmd + shift + \`  
select scope: `ctrl + shift + →`. 
  
- OAuth: 知道是哪個 user 在 access
- api key: server secret, server to server, 不需要其他驗證了，還可以知道是哪個project
- fs.readdirSync 取folder's files
- timestamp當作snapshot filename
- execa: node js 執行shell 

### 2020 01 28
- css variable 會找最近scope 定義的數值
```
//shared key frame
keyframe {
...
transfrom: translate(var(--ball-offset));

//在使用的 element 定義css variable
& .ball-1 {
--ball-offset=1000px;
```

- RegExp - find the match word
```
1.
result = "I love JavaScript".match(/Java(Script)/)
result[0] = JavaScript 
result[1] = Script
2.
valid = /(Y+)/.test("YYYY-MM")
RegExp.$1 = YYYY
3. 
"Amy Bob".replace(/(\w+)\s(\w+)/, '$2, $1') = Bob, Amy


```
- react native animated 中斷後 start(callback) 可以實作回復最終狀態
- functional programing
- js invocation pattern: this
- arrow function 會freeze當下的this (bind)


### 2021 01 20
- a js application  
**step 1. build**  
Build webpack  
**step 2. copy**  
Copy file to public  
**step 3. serve**  
https-server public  
  
`nodemon` thirdparty to develop watchfile change
- 如何用pure js 實作 global state 更新觸發re-render?   
用 state manager 管理state提供subscribe 供各comp 傳入render function，  
提供manipulate state function (add, delete) 裡面會觸發notify，  
Notify 執行所有的subscribe。  

### 2021 01 13
- react scroll to invalid input
  - forwardRef((props, ref) => ) 可以不用手動binding Ref
  - useRef( ).current; 可以不用一直取 current
  - getBoundClientRect() DOM api，取得element的位置，相對於viewport
  - scrollBy({ top: x, ...}) window api，相對滑動位置
  
- vscode shortcut
  - ctrl + shift + 左右：選取目前的scope
  - alt + 左右：游標快速移動至下一個word 位置
  
- react native debugger 可以看到 Network api 
  
### 2021 01 04
- iframe resizer
- github project(archive)
- skeleton 骨架
- gatsby sourcing 

- custom hook
當component需要複雜的邏輯，且會和其他component共用，此時很適合refactor 成 custom hook。
- db cluster
- Semantic element 語意化 元件
