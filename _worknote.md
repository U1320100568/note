### 2025 12 29
- [js][gatsby] SPA but remain list page state 從詳細頁返回後維持 list 的狀態，優化 UX  
  使用 gatsby **navigation state** + wrapPageElement  
  在 wrapPageElement 判斷是否要用 modal 開啟，如果有，就wrap 一個 modal container  
  ```js
  navigate(path, { state: { modal: true } })
  ```
  

### 2025 11 07
- [js] JSDoc 標籤（如 @param, @returns）引用時可以提示，並非一定要用 ts!
```js
/**
* 匯出一個 Utility 函數用於合併 Actions
* @param {object} customActions - 來自專案層的客製化 Actions
* @returns {object} 合併後的 Actions
*/ 
```


### 2025 10 23
- [react-native][android] build error Execution failed for task ':app:externalNativeBuildCleanDebug'. CMake Error in CMakeLists.txt: Imported target "ReactAndroid::jsi" includes non-existent path
  resolve: `rm -rf android/app/.cxx`

### 2025 10 13
- [js] `npm list <package>` `npm explain <package>` 可以檢查 package resolution，因為哪個package有多安裝
- [js] @babel/runtime babel 是轉譯器 (ES6+, ts, jsx)，但如果在轉譯的過程中都用 inline helpers，就會造成bundle過大且重複的過多，改進成在runtime時再把helper function require 進來 `require('@babel/runtime/helpers/...')`，共享的概念

### 2025 09 30
- [react][pdf] @react-pdf/renderer 中文不會換行
  - 特殊處理每個character都拆成個別 Text component
    ```jsx
    import { Text as PdfText } from "@react-pdf/renderer";
    ...
    function Text({ children, style }) {
      if (typeof children === "string") {
        return (
          <View style={[{ flexDirection: "row", flexWrap: "wrap" }, style]}>
            {Array.from(children).map((char) => (
              <PdfText>{char}</PdfText>
            ))}
          </View>
        );
      }
      return <PdfText>{children}</PdfText>;
    }
    ```


### 2025 09 11
- [html] script tag 有分成三種載入方式
  - normal: HTML parsing 會被 script 擋住，等載入+執行完才繼續。
  - async: HTML parsing 和下載同時進行，但一旦下載完成，就會立刻執行 → 可能打斷 parsing。
  - defer: HTML parsing 和下載同時進行，但等 HTML 全部解析完才執行，順序也會保證。 

### 2025 09 05
- [react-native] android play console Warning: alignment 16 bits
  - 事由：project or thirdparty 底層語言有違反的情況
  - 檢查：可用一個alignment.sh (詳情請看Richie npm script)
  - 發現 rn 要升級 76.9 -> 77.3
    - 可查看官方文件 Blog 有提到 和 Alignment 相關的
    - ios new arch 要用swift (但是objective-c可以先照舊)，如果要照舊，需要修改（詳情見官方文件）
  - 發現 rnscreen 要升major才會改，控制變因的情況下，先看他的patch修改
    - 先手動修改native再檢查，確定ok
    - install patch-package
    - 注意create patch 要在沒有build過的情況下（會auto codegen），如果已build過，就 rm node_module/xxx & install
  - 等Richie 的處理好camera後，再修改手上的project

### 2025 08 18
- [js][react-native] ResizeObserver 是瀏覽器 api，有時我們會透過 window.onload or window.onresize get body size，但 Android webview 很不穩定，用ResizeObserver較穩定
  ```js
  const observer = new ResizeObserver(() => {
    window.ReactNativeWebView.postMessage(String(document.body.scrollHeight));
  });
  observer.observe(document.body);
  ```
- [deploy][s3] website deploy 安全問題，應該關閉 public static website，permission config 要加上cloudfront(詳細部分可以看tba-stg Kyle 設置)，github action s3-deploy也要加上 private upload（記得更新文件）
- [mongodb] 後端連線分成兩種
  - VPC peering: 適合用於兩個獨立的 VPC 需要頻繁互相溝通的場景，像是你自己買了一塊地，蓋了一棟房子，然後再想辦法和另一塊地的朋友家連一條私人的地下通道。
  - AWS Private Link: mongo atlas(在aws上運營)，可直接建立VPC Endpoint，將服務串接在一起 （專為這個設計的，用這個好）
- [DNS] Route 53 中建立一個 DNS 記錄
  - A Record: 直接告訴你在哪裡 (IP)
  - CName record: 告訴你去問誰 (別名網址)
- [infra] authuntication 分成幾個模式
  - cookie-based: session cookie (memory) + persist cookie (存在瀏覽器)
    - 前端都不用處理
    - 設定好參數就安全
  - token-based: access token(memory) + refresh token(local storage)
    - local storage 容易 xxs攻擊，可用CSP防禦
  - hybrid （最推薦）: access token + persist cookie

### 2025 08 06
- [react-native] Deep Link 定義
  - https://zh.wikipedia.org/zh-tw/%E7%A7%BB%E5%8A%A8%E6%B7%B1%E5%BA%A6%E9%80%A3%E7%B5%90
  - 行動應用conventional deeplink 就是 URI scheme
  - 若要用universal link 需另外處理

### 2025 07 11
- [react-native] rn 69 是最後一版支援新舊架構 new architecture
  - 多一個ReactNativeSpec folder，並且在package.json填spec 的 config
  - codegen 時間點：ios pod install & npm run android
  - codegen 結果在 native codegen 資料夾 可查看 import path
  - ReactNativeSpec folder 包含 ts (真正在定義method的地方) & js 只會留著Turbo getEnforcing 後的 instance
  - 注意若有定義method， android 一定要一一對應那些method，不然會compile error
- [third-party] 開發library 小技巧，可以在一個 production project 裡開發，把該library 從node_module 手動移除，並在該資料夾clone from github，就可以方便開發library

### 2025 06 09
- [security] 總結
  1. script-src 外部連結取得加密放到 integrity
  2. Script-src 如果有用inline script 像是ga那樣，先使用 Content-Security-Policy-Report-Only 會跳出提示的sha- 把它加進去
  3. Style-src Antd ConfigProvider.config 會違反 inline-style (已全開放，可不管)
  4. Style-src styled-components違反 inline style
  5. Connect-src &  img-src 依 client_id 修改
  6. Admin web 用不同的policy
  - web
  ```
  Content-Security-Policy:
    default-src 'self' ; 
    connect-src 'self' auth.revtel-api.com  jstorage.revtel-api.com  tda-api.revtel2.com tda-revtel2-com-prod.s3.ap-northeast-1.amazonaws.com www.google-analytics.com ; 
    script-src 'self' connect.facebook.net 'sha256-X1bDPjOSAiF0R/pf+Tv/Iwcv7QP+ZcaHBfrcQGEGhZA=' 'sha256-FImjSsLrl1Uy8fYqm3+l4N7n8DwAqbnH3XMnlh71ayc='  'sha384-B3zToFsjmaWQbhiK7CS07elu8EflpSzj4tGAnThyy/UJM44H2i3j79U3D3IQQ9cs'  ; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ; 
    object-src 'none'; 
    base-uri 'none'; 
    img-src 'self' tda-revtel2-com-prod.s3.ap-northeast-1.amazonaws.com data:; 
    frame-ancestors 'none'; 
    frame-src www.youtube.com maps.google.com.tw https://www.google.com/maps/embed; 
    form-action 'self';
  ```
  - admin
  ```
  Content-Security-Policy:
    default-src 'self' ; 
    connect-src 'self'  storage.revtel-api.com auth.revtel-api.com jstorage.revtel-api.com tda-api.revtel2.com tda-revtel2-com-prod.s3.ap-northeast-1.amazonaws.com ; 
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *;
    style-src 'self' 'unsafe-inline'  https://fonts.googleapis.com ;
    object-src 'none'; 
    base-uri 'none'; 
    img-src 'self' tda-revtel2-com-prod.s3.ap-northeast-1.amazonaws.com data:; 
    frame-ancestors 'none'; 
    frame-src www.youtube.com; 
    form-action 'self';
  ```

### 2025 06 02
- [security] 解決zap弱掃的警告
  - 原圖
  - <img width="402" alt="image" src="https://github.com/user-attachments/assets/812f743e-80fe-4e51-b4c5-ee6fdd5c1211" />
  - require-trusted-types-for 'script'： error This document requires 'TrustedScriptURL' or 'TrustedHTML' assignment. 很多第三方套件都會觸發
    - 測試先拿掉 require-trusted-types-for 'script'; trusted-types default;？
      - 🅰️ error 消失
 	  - 測試 [workaround](https://github.com/zoosewu/PTTChatOnYoutube/issues/133#issuecomment-2700347682) 是否生效？
      - 🅰️ 確實有消失
    - ckeditor 無法處理
  	- 討論是否要用這個csp？
      - 🅰️ 
  - media host tda-revtel2-com-prod.s3.ap-northeast-1.amazonaws.com or tda-api.revtel2.com 會有 connect-src error
    - 討論如何處理？
      - 🅰️
  - 若有許多 external script 就要加上許多 script-src list
  - useFacebook script 會出現 script-src error
    - 測試將 useFacebook script print > hash 填入 script-src ？
      - 🅰️ 確實有消失
    - 但 script 包含 project id 不能共用，討論如何處理？
      - 🅰️
  - customLayout carousel-slick 包含 font 會有 src-font error
    - 測試拿掉？
      - 🅰️ error 消失
  - customLayout 有許多 external script，尤其是admin
    - 每個連結都透過 [hash generator](https://www.srihash.org/) 產生Subresource Integrity 增加 attibute & script-src
  - Sentry script-src-elem Blocked 'script' from 'inline:'
    - 在console 顯示為 `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src ... Either the 'unsafe-inline' keyword, a hash ('sha256-FImjSsLrl1Uy8fYqm3+l4N7n8DwAqbnH3XMnlh71ayc='), or a nonce ('nonce-...') is required to enable inline execution.`
    - 應該是有inline script `document.createElement` or `<script>` 需要加上 hash or nonce
    - 打開console就會出現error msg 拿裡面的 hash 就可以了
  - 改成 真正的 Content-Security-Policy時，會出現error Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'component---src-templates-product-list-index-js')
    - 但畫面正常
    - 討論如何處理？
      - 🅰️
  - ckeditor 導致畫面壞掉
    - trust-type-for TrustedHtml 恐怕要拿掉 require-trusted-types-for 'script' ？
      - 🅰️
    - inner script
      - 直接用 'unsafe-inline' 也會被 `sha-` 影響並忽略，還是會被擋下，這部分衝突！！?
      - 🅰️
  - error script-src bootstrap 使用 eval
      - 🅰️ 直接用 'unsafe-eval'
  - style-src unsafe-inline 移除後會出現
    - 1. antd provider
      - 🅰️ 用別的方式取代
      2. gatsby style
      3. 嘗試用 gatsby-plugin-csp 是加在<meta>，效果更糟
      4. 嘗試用 gatsby-plugin-csp-nonce 只是幫 gatsby-plugin-image 增加nonce，並且還是要幫 nonce 加入到style-src
      5. 其實應該是 styled-component 產生的 css-in-js，網路上只有文章說使用另一個export css file 的 linaria (callstack 開發)
       



### 2025 04 25
- [react-native] 升級 RN 0.76.9 Android 開發環境問題
  1. 更新JDK
      - `brew update`
      - `brew upgrade`  
      Follow step https://reactnative.dev/docs/0.76/set-up-your-environment   
      - `brew install --cask zulu@17`
      - `open /opt/homebrew/Caskroom/zulu@17/<version number>` 然後安裝
      - 寫入環境變數 `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
  2. 更新 android SDK 
      - 打開 android studio SDK manager （點選 Show Package Details）
      - 安裝 Android SDK Platform 35
      - 安裝 Google APIs ARM 64 v8a System Image
      - 遇到ERROR >  Task :app:checkDebugAarMetadata FAILED  
  	     \> Java heap space  
        解：npm run android:clean
  3. 測試 third party 以TDA當sample
    - react-native-webview > 活動報名
      -  iOS	ok
      - android 閃退
    - react-native-push-notification
      - iOS dev mode 未收到remote 
      - iOS release mode 有收到 remote	
      - android dev mode 有收到，但比較慢
    - react-native-barcode-builder > 沒在使用 可移除 
    - react-native-vision-camera > 司法院律師QR Code > 綁定
      - iOS	ok
      - android	ok
    - react-native-qrcode-svg > 司法院律師QR Code
      - iOS	ok
      - android	ok
    - react-native-inappbrowser-reborn > profile > 問題回報
      - iOS	ok
      - iOS	ok


### 2025 04 21
- [js] 發生Global State改變，parent not changed  
  <img width="500" alt="截圖 2025-04-21 下午2 57 39" src="https://github.com/user-attachments/assets/96c60162-2933-4fe9-aca1-c2c33b4f9380" />

### 2025 04 16
- [xcode] xcode from 15.0 to 16.2
  - Error: No type named 'terminate_handler' in namespace 'std' upgrade Sentry 5.32.0 https://github.com/getsentry/sentry-react-native/issues/3883#issuecomment-2704585741
  - Pod > excluded architectures > 改成 arm64
  - release warning `The archive did not include a dSYM for the hermes.framework with the UUIDs ` issue https://github.com/facebook/react-native/issues/49059 ， 官方說是xcode 16 的 bug
  - <img style="width:200px;" src="https://private-user-images.githubusercontent.com/51951532/373963702-feb6e7e3-52df-49d2-a566-88505e2ceac3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQ3NzI1NzMsIm5iZiI6MTc0NDc3MjI3MywicGF0aCI6Ii81MTk1MTUzMi8zNzM5NjM3MDItZmViNmU3ZTMtNTJkZi00OWQyLWE1NjYtODg1MDVlMmNlYWMzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDE2VDAyNTc1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlNmI4YjU4NjRmNjg4NTcxNjA1YTI4N2U2MWMzYTcyNGRlYmQ5Yjc4MWZhODc1Njg4NzkzNmNkMTY0NzE0YjImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.p8PBn7JdjNk79FBeQst4wyQo4MAO51AMYPNl4-h2O4o"/>

### 2025 04 09
- [shell][filepath]
  - `./path` 在目前的路徑
  - `../path` 在parent的路徑
  - `~/path` `~` = shorthand of `$HOME`，`$HOME` 相當於 `/home/you` or `/Users/you`
  - `/path` 在root ，絕對路徑
- [xcode] 使用舊版的Xcode
  - https://xcodereleases.com/ (需注意macOS版本)
  - 下載xip，點選即可使用
  - Settings > Locations > Command Line Tools 切換版本
  - 可在terminal檢查 `xcodebuild -version` 是否已切換
- [xcode]  刪除xcode & 移除不必要的檔案
  - Delete app from Applications
  - Delete ~/Library/Developer
  - Delete /Library/Developer
  - Delete ~/Library/Caches/com.apple.dt.*
  - ps. simulator platform. They are installed to /Library/Developer/CoreSimulator/Profiles/Runtimes (Not ~/Library!)
- [xcode] 安裝Xcode 時要求安裝iOS 18.+ component，可在 `Settings > Components` 查看並刪除，也可以看到Show in Finder他是被安裝在 `/Library/Developer/CoreSimulator/Volumes/iOS 18.3.1 simulator` 裡

### 2025 02 21
- [js][python] Iterator, Generator, Yield
  - Yield 會return generator(iterator) 保持closure，所以得到的instance 不是function call 的結果，是一個iterator，next取得該closure 執行的結果，下一個next會記得原本clousre執行下一個世代的結果，
  - 到達最後再next，js會回傳空的，Python 會 exception ，除非有 custom implement next
  ```js
  function* generator() {
    let i = 0;
    while (i < 3) {
      i++;
      yield i;
    }
  }
  
  let gen = generator();
  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.next());
  ```
  ps. function 加上星字號就是generator function  
  ps. generator 會回傳 value & done
  ```py
  def generator () :
    i = 0
    while (i < 3):
      i = i+1
      yield i 
  
  gen = generator()
  
  print(next(gen))
  print(next(gen))
  print(next(gen))
  ```
  - 應用：pymongo，list時才會真正執行資料庫搜尋
  ```python
  list(XX.objects.find(query).sort().skip().limit())
  ```
  - 應用：node fs
  ```js
  run(function* () { 
    var text = yield read('yieldFile.js');
    yield write('yieldFile.bak', text);
  });
  ```
  - 優點：減少callback function
  - 有哪些方式可以遍歷 iterator :
    - next()
    - Array.from
    - let [a, b, c] = gen; // destructure
    - let values = [...gen]; // spread operator
    - for...of loop

  

### 2025 01 21
- [hishop] 為什麼沒有 SendBatchEmail step function > tda 工會系列才有  
- [hishop] on_checkout_validate 為什麼需要step function  > 是用來檢查line pay 是否付款成功
- [serverless] 為什麼要透過 serverless 部署lambda & step function : Serverless Framework 是 for serverless 的部署的框架，以cli 部署方式，其他平台的serverless 也可以處理。用nodeJS 編寫
- [serverless] 除了 serverless 也可以使用原生的AWS Serverless Application Model
- [serverless] serverless 可以透過github action 部署，也可以將resource 放在s3  再透過cloud formation
- [python][fastel] 若是body data 就用type Class base on BaseModel, 其他欄位就是query parameter

### 2025 01 13
- revtel storage design:  
  | - | write | read |
  | - | - | - |
  | public | public_client = 'True' 路人也可上傳 | (預設) upload carry `acl = 'public-read'` |
  | private | （預設） | upload carry `acl: 'private'` 搭配custom api `private_upload/access` |

### 2025 01 08
- [shell]
  - 測試條件
    ```bash
    [ statement ] # 單括號會有些限制
    [[ statement ]]
    [[ -z $db_password ]] # -z 檢查是否為 zero length
    ```
  - 命令替換 command substitution
    ```bash
    $( ... ) # 將子執行的結果代入
    ```
  - 等待 & 讀取 input & 塞進變數
    ```bash
    read db_password
    ```
  - 字串置換 （sed 蠻常見）
    ```bash
    sed -i '' "s/%%client_id%%/$client_id/g" $cfg
    ```
  - array
    ```bash
    keys=( ... ) # 注意是小括號
    ```
  - 分割字串
    ```bash
    cut -d= -f1 # "=" 是分割字元 -f1 取得第一個部分
    ```
  - 分割字串
    ```bash
    awk -F '.' '{ print $1 }' # 以 '.' 為分割字元，取第一個部分
    ```
  - 設定預設值
    ```bash
    template_client_id=$2
    template_client_id=${template_client_id:=defaultValue}
    ```
  - while
    ```bash
    while [[ $i -lt ${#keys[@]} ]]; do
      ...
      (( i++ ))
    done
    ```
    - while do done 是一組的
    - `-lt` 算術比較運算符 less than
    - `${#keys[@]}` 這是用來取得數組 keys 的長度的語法。keys[@] 代表數組的所有元素，而 # 前綴則代表數組的長度。因此，${#keys[@]} 表示 keys 數組中元素的數量。
    - `(( i++ ))` 執行算術運算的語法
  
- [Xcode] new app 要建立 identify，certificate 未必，可用舊的，要建立provisioning profile
  - Provisioning profile 是用來連結 identify & certificate
  - Certificate 和 app 無關，是管理此電腦能否在這個org底下開發及發布
