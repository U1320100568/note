### 2020 02 22
- j storage(mongodb? unix?) date 格式 timestamp 數值單位是 秒  
[parse to js date](https://stackoverflow.com/a/847196/13797221) 需乘1000為毫秒單位: `new Date(1613791932 * 1000)`
- jstoarge dashboard
list 可以看到部分資料（排除content, children, password, created, updated）
- mongodb playground 
https://mongoplayground.net/

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



### 2020 02 02
- <input type="checkbox" /> default value : checked={}   
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
