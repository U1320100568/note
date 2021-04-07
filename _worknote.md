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
