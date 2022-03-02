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
- linux command comvention  
  
| environment variable | command | sub-command | option                             | argument             |
|----------------------|---------|-------------|------------------------------------|----------------------|
|                      | git     | commit      | -v -r (letter usually use -)       | access target(files) |
|                      | npm     |             | --word (word usually use --)       |                      |
|                      | rm      |             | -v <..>                            |                      |
|                      |         |             | option for subcommand if sub exist |                      |
  
- npm run scripts: `./node_module/.bin`  會寫進這個 file 裏面
- npm run test -- --watch: 注意有多一串 -- 是要帶給 npm run script 的參數

### 2022 02 07
react natvie 不同的 debug 方式：ios safari > 開發 > 模擬器 , android chrome://inspect/#devices ，例如要 detect webview agency = app


### 2022 01 21
- iframe 可以用 `<img src/>` 嵌入，這樣就可以控制大小了(錯誤)
   - 因為可以用 img 是因為他是 stream type 的 image media 

### 2022 01 10
- jsi  讓 js & native communicate synchronize  ，有些library 會使用ReAnimated 實現，會在native thread 跑完 js code，但是必須要使用react hermes engine
- Android & Java required
   - java —version
   - (不確定這步驟) cat ~/.zsh/.zprofile 把 下面這句comment out (這句表示指定版本) export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
   - brew uninstall adoptopenjdk/openjdk/adoptopenjdk8
   - brew uninstall  --cask adoptopenjdk/openjdk/adoptopenjdk11
   - Android studio  > android 12.0 api level 31

### 2022 01 07
- git clean -nd . (先看會發生什麼) 
 - get clean -fd . (-f 強制, -d untracked file)
