### 2022 09 30
- chrome jsonVue extension color editor
- css: 暗色主題 dark theme `@media prefers-color-scheme: drak {`  
  繼承系統使用的主題  
  搭配 --css-variable 就可以輕鬆切換兩種主題
- _ReportDialog.js_ highlight class design: (1) shared with pdf(use render ?) (2) reduce find loop(col.className, or onCell) > use onRow with col.className
- Xcode > preference > location > Derived Data, Archieves 這可以刪，增加磁碟容量

### 2022 08 19
- use package from git fork repository `npm install xxxxx@{GitHub orginaze}/{repo}`  
- 如果有library 有小錯，只想改(蓋掉)在 local node_module package，且每次npm install or update 都會自動補上，可以使用小工具： **patch package** 


### 2022 08 17
- 計畫停機演算法 array filter array
- repeat-linear-gradient

### 2022 07 20
1. js babel / webpack
   - babel: 編譯成瀏覽器看得懂的語言，transplier 編譯 ES6 => ES5 , typescript => js 
   - bundler 將需要的東西打包一個檔案 require/import dependency，線上的application 沒有module system，都要靠打包的bundle，例如 React Native metro bundler,  webpack or 其他

### 2022 06 27
- [js] `Object.assign(a, b)` = 可用來複製object或是覆寫欄位，相當於spread syntax `{ ...a, ...b }`
```
> var a = { name: '123', age: 123 }
> Object.assign(a, {tel: "0101"})
return = a
a = { name: '123', age: 123, tel: '0101' }
```
- [js] state.selected 儲存 onClick 的 e.target 的 element ，並將上次、這次的element用classList 移除、新增class (特別的控制)
- [disc] static build web app 放在某地方，需要在架設 http server，才是serve 起來
  - s3 放 file, aws 會自己起一個http server
  - gatsby serve 會起一個 http server
  - 也可以用其他的方式起，例如 nginx，也有處理performance traffic 的問題
- [mongo] backup cloud restore in local `run -it -p 27017:27017 -v ~/Downloads/restore-62bcf3f6c497023990928081:/data/db --name=smbbackup mongo`


### 2022 04 13
- Google model viewer ，將iOS, android native 支援 AR VR 包裝成統一介面.  
  Web component  新型的html tag，react 支援 , ex. <model-viewer></model-viewer>

### 2022 03 10
- UTC 時區問題
  - new Date('2022-03-10') -> UTC 時間
  - new Date('2022-03-10T00:00:00') -> 當地時間
  - new Date('2022-03-10T00:00:00Z') -> UTC 時間

### 2022 03 04
- [concept] virtual machine 
  - Virtual machine:  js runtime, EVM(以太幣), python	
  - Virtual machine 跑 byte code
  - CPU(ARM, intel, MIPS) 跑的是 obj code 0xff88…
- [concept] GOF pattern
  - Decorator：  介面(interface)一樣，要增加一些functionality
  - Adapter：	 為了解決介面不一樣，但是functionality 不變
  - Proxy：基於某個理由不該直接串接或看到，需要接一層，interface 很接近

### 2022 03 02
- [JS] functions(methods) inside Object 
  ```js
  const obj = {
      owner: "Zed",
      getOwner: () => this.owner, // non-anonymous 的 this 是由當下involke pattern 該closure 的物件，或是外圍的物件
      getOwner: function () { return this.owner } // Zed  // anonymous function
      getOwner() { return this.owner } // Zed // short anonymous function
  }
  ```
- [JS] 定義在function外面的object `Cannot access 'actions' before initialization`
   - `(function () { }())` 這個因為hoisting在所有定義最前面就定義此function，且因為IIFE所以會拿不到其他初始值，可改成`(() => {}())`，就不會hoisting
- [cli] linux command comvention  
  
| environment variable | command | sub-command | option                             | argument             |
|----------------------|---------|-------------|------------------------------------|----------------------|
|                      | git     | commit      | -v -r (letter usually use -)       | access target(files) |
|                      | npm     |             | --word (word usually use --)       |                      |
|                      | rm      |             | -v <..>                            |                      |
|                      |         |             | option for subcommand if sub exist |                      |
  
- [cli] npm run scripts: `./node_module/.bin`  會寫進這個 file 裏面
- [cli] npm run test -- --watch: 注意有多一串 -- 是要帶給 npm run script 的參數

### 2022 02 07
- [react natvie] 不同的 debug 方式：ios safari > 開發 > 模擬器 , android chrome://inspect/#devices ，例如要 detect webview agency = app


### 2022 01 21
- [js] iframe 可以用 `<img src/>` 嵌入，這樣就可以控制大小了(錯誤)
   - 因為可以用 img 是因為他是 stream type 的 image media 

### 2022 01 10
- [js] jsi  讓 js & native communicate synchronize  ，有些library 會使用ReAnimated 實現，會在native thread 跑完 js code，但是必須要使用react hermes engine
- [react native] Android & Java required
   - java —version
   - (不確定這步驟) cat ~/.zsh/.zprofile 把 下面這句comment out (這句表示指定版本) export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
   - brew uninstall adoptopenjdk/openjdk/adoptopenjdk8
   - brew uninstall  --cask adoptopenjdk/openjdk/adoptopenjdk11
   - Android studio  > android 12.0 api level 31

### 2022 01 07
- [cli] git clean -nd . (先看會發生什麼) 
  - get clean -fd . (-f 強制, -d untracked file)
