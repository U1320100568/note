**2020 12 07**  
- [intelligence only oneline](https://stackoverflow.com/a/64817846/13797221)  
- setState - updater 最常使用在 toggle  
大多使用在event function closure，真正執行時的value可能不是當下的，所以可能錯誤。  
<table>
   <tr>
      <th>class</th>
      <th>hook</th>
   </tr>
   <tr>
      <td>
         <pre>
const { show } = this.props;
...
this.setState({ show: !show })
// updater
this.setState(state => { show: !state.show })
         </pre>
      </td>
      <td>
         <pre>
const [show, setShow] = useState(false);
...
setShow(show)
// updater 
setShow(preShow => !preShow)
         </pre>
      </td>
   </tr>
</table>
- vsCode: Color hightlight plugin
- [zsh](https://github.com/revtel/zsh): mac shell 逐漸從bash轉換成 zsh
- base64: 用 64 字元 編碼（像Hex的概念） 
- 多國語系 library：react.i18next
- 中文 regex `/\p{Script=Han}/`
- GMT(有時區的概念，相對的) UTC(沒有時區的概念，絕對的時間)



**2020 11 26**  
Revtel Dashboard: https://console.revtel2.com/
- article service

前情提要：  
> 傳大檔導致server當掉，所以傳檔改成傳到micro service(lambda/serverless)  
>  藉由 lambda 傳檔會有size、traffic、timeout的問題，所以我們是由lambda給我們一個合法的s3 url，直接上傳到s3  

一般小檔的傳檔 micro service，已經有此api     
大型檔案（10M up），apply uppy   
uppy 可支援大型檔案分割上傳至s3   
需整 `@uppy/aws-s3-multipart` `@uppy/core`   
大致步驟： 建立"上傳事件" > 分割成不同parts、取得各自sign過的url > 各自上傳 > 通知aws完成 > 取得file path   
   
優點：較快、不會導致server當掉、沒有檔案大小限制


**2020 11 17**
- [push notification certificate](https://github.com/revtel/how-to/blob/master/push-notification/create-certificate.md)
- aps.cer & p12 ?
> The .p12 contains both the private and the public key, and also information about the owner (name, email address, etc. ) all being certified by a third party. With such certificate, a user can identify himself and authenticate himself to any organization trusting the third party.
- android push notification [文件更新 ](https://github.com/revtel/how-to/blob/master/push-notification/push-notification-v2.md)

- vscode extension 
1. glean : 幫助refactor extracting for react 
2. easy motion: 快速移動游標
- bash, vim, node: `option + click` 快速移動游標
- code-snippet vscode 快捷
- html input for



**2020 11 09**  
- android sdk 需要升級至 29，才能上google play https://github.com/revtel/revtel-app-62/commit/c7c2e4d5d55e5ec369fbc8b3292eff1599add946
- Ant.Table 設置 empty comp: 
```jsx
<Ant.Table 
   locale={{
       emptyText: ( <img src="/images/empty-order.svg" height="80" width="80" /> )
   }}
...
```
- google login ERROR code 10: key的sha1 or package_name 對應不到firebase config，原因：app/build.gradle 改成debug key 在 project某處，但是我沒有產生，而sha1由global debug key 而來，所以把build.gradle的debug config拿掉，就會用global debug key。
![image](https://user-images.githubusercontent.com/35591116/98626293-5e35c180-234c-11eb-91c7-9402f4b17119.png)
- apple login 有些設定跟之前不一樣 https://github.com/revtel/how-to/blob/master/social-signin/Apple%20Signin%20SDK.md
- appDelegate.m import googlesign or fbsign.h 時，注意要在Flipper.h 下面，因為他前面有個if debug，會在archive and release fail 
- webClientId 有設定android 才會return idToken(JWT), 設定後android, ios會是同一把, 可直接取用web client的那把

 Revtel Doamin規則：
 - GoDaddy: 只買domain,  
 - AWS: Route53 產生record,
 - netlify: 新增record get nameserver(4個) 貼到godaddy
 DNS


**2020 11 06**
serve backend server: 看app在哪個port serve(process_id) > 砍掉process > 重新 serve  
gitbook  
css: flex-order  


**2020 10 30**
- dummy picture: https://unsplash.com/
- [html5] js multiple thread : web-worker
- [html5] web db: indexedDB (worker無法使用localStorgae)

**2020 10 23**
- next.js 和 gatsby 一樣 可以static build, 還可以server rendering
- window.open () 開的new window 可以取道原本的window global variable: window.opener.variable
- cloud coding : codeSandbox(web), expo snake(app)
- electron: web porject turn to desktop app 

**2020 10 05**
- ref 
```react
<Comp ref={this.onRef}  />
...
onRef = ref => {this._comp = ref}
```
使用此Comp this的function or variable
> ⚠️ 使用redux connect，無法取得內容（沒有傳遞到上層

export Comp|export connect(Comp) 
-|- 
![image](https://user-images.githubusercontent.com/35591116/95060510-efea5780-072c-11eb-8871-d04b61f9720b.png)|![image](https://user-images.githubusercontent.com/35591116/95060559-042e5480-072d-11eb-9025-0d47a4c9d8c6.png)

兩種方法：
1. [redux connect refforward](https://react-redux.js.org/api/connect#forwardref-boolean) //react-redux >= 6.0
2. 將ref function pass to Comp (要注意life-cycle)
   ```js
   class Comp ...
     componentDidMount() {
      if (this.props.onMyRef) {
        this.props.onMyRef(this);
      }
     }
   ```

**2020 09 22**
- keyboard avoiding
```jsx
<KeyboardAvoidingView
      style={{
        // flex: 1 // it will hide the fields
        ...props.style,
      }}
      {...Platform.select({
        ios: {behavior: 'position'},
        android: {behavior: 'height'},
      })}
      keyboardVerticalOffset={Platform.select({ios: 0 , android: 0})}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled" //to dismiss keyboard
      >
        {props.children}
      </ScrollView>
</KeyboardAvoidingView>
```
    1. keyboardavoiding 不能加flex:1，android input 會消失
    2. 只有不想要被擋到的東西，才需放在children (本來包在abstract form
    3. behavior ios position, android height (測很久
    4. scroll view keyboardShouldPersistTaps="handled" 點空白處隱藏keyboard
    
- Content-Length: size in decimal number of OCTETs ? bytes `13851`
- Ant.Upload `action`, `beforeUpload` 不直接上傳 return false ,`onChange`, `fileList`

- DEBUD
    ![image](https://user-images.githubusercontent.com/35591116/94637846-21b58580-030b-11eb-8ce3-2ebf25376097.png)
    1. UnhandledPromiseRejectionWarning: 沒有catch 的error
    2. gatsby build error沒有標明在哪位置: 1. 全域搜尋（數量少的話）2. 夾擊法（import 也要拿掉）
- ❌ if(window)  ✔️ if(typeof window !== undefined)
- componentWillMount 裡有用到 window, document 也是會報錯
- 使用 thirt party 有可能在import 時，他就使用documnet or window，造成gatsby build error
    
- Deeplinking   [ # commit](https://github.com/revtel/sethtv-app/commit/8987d344399137978786acd30a8d8b2feefc12ea)
1. [跳到detail，被reset home] 
   - get url at AppLinking, but reset home at Landing，兩個同步在跑
   - 情況：從web or 其他app 跳至 product detail
   - getInitialURL, addEventListener 一般都設置在Applinking
   - 解法: 把getInitialURL提到 autologin & reset home 之後
   
2. [inital url = null] Linking.getInitalUrl in react native debug mode : get null
   - debug on XCode 設置中斷點，觀察有無值帶入native
   - 中斷在intital time and lanuch by deeplinking: 不能直接Xcode run, 需run完後，以deeplinking 開啟  
     Project > Scheme > edit > Wait for executable to be launched  
    ![image](https://user-images.githubusercontent.com/35591116/93989546-9d1fb000-fdbc-11ea-86b7-1e945df48dd6.png)  
3. [deeplinking 跳2次] react-navigation 2.X 4.X 預設handle deeplinking: disable it by  `<AppNavigator enableURLHandling={false} `  

- push registry 也會有[跳到detail，被reset home]問題。
  


**2020 09 07**
- useEffect 
```
const Component = ({ prop1, prop2 }) => {
  useEffect(() => {
    console.log("prop1 has changed", prop1);
  }, [prop1]);
  useEffect(() => () => {
    console.log("prop2 has changed", prop2);
  }, [prop2]);

  return <div>...</div>;
};
```
- [mbps](https://github.com/U1320100568/note/issues/13)
- 🙅‍ build and 🆗develop 的 web css差異
![image](https://user-images.githubusercontent.com/35591116/92459435-47160e80-f1f9-11ea-8eb9-5dd690597bf3.png)
算完再render會比較好


**2020 08 17**
- set env variable (token , apihost
- android release: [multidex over heap](https://stackoverflow.com/a/25013822/13797221)
```
> Task :app:processReleaseGoogleServices
...
Expiring Daemon because JVM heap space is exhausted

> Task :app:transformClassesWithMultidexlistForRelease FAILED
* What went wrong:
Execution failed for task ':app:transformClassesWithMultidexlistForRelease'.
> GC overhead limit exceeded
```
- js getter 結構上轉換的 interface
1 不確定api會不會調整 2 前後端同時進行，所以model長不一樣  
```
return item ; //no
return new itemModel(item);
...
item.id
...
class itemModel {
  constructor(data) {
    this._data = data;
  }
  
  get id() { //getter
    return this._data.trans_id
  }
}
```

**2020 08 13**
- console.table
- 詢問 expect 不會因為某個fail就停止: 用某個test function 撈資料，資料存在describe scope
- react native Spinner 
- 賽斯導fastlane
  - brew 安裝
  - 準備RevtleTech ios and apple distibution key
  - generate App專用密碼 on develop site, and input at fastlane config phase
- react hook
  - 用來封裝單一的邏輯
  - useEffect 
  ```
  //執行render 都會執行這function，可以有多個
  useEffect(() => { // function as arg , not async, because return value
    do something
    return function cleanup () {} //若return function，有想要清除的東西可以在這解決，像是listener
  }, [props.id]) 
  // 帶入第2參數是dependency array，如果變數有變動就會乎叫一次，所以componentDidMount 就要帶這參數，componentDidUpdate就不用帶
  ```
  - decorator: 在function 執行前後可以執行的 function 例如 logger(js 也有)
  - `git stash`: 可以將修改的東西暫存，轉移到別的branch，到另一個branch `git pop`, `git reflog`: reset 後還是可以看到原本的commit 

 
**2020 08 06**
- Ant design theme color: *gatsby-config*
  ```
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#da3043',
          'font-family': 'Arial',
          'layout-body-background': '#66ff79'
        }
      }
    }
  ]
  ```
- 賽斯影片

**2020 07 30**
- [css filter] (https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur)
- react native [image blur](https://stackoverflow.com/a/40776982/13797221) : `blurRadius={10}` (image.props)
- [css content](https://stackoverflow.com/questions/10393462/placing-unicode-character-in-css-content-value)



**2020 07 20**
- react-csv async onClick not working [workaround](https://github.com/react-csv/react-csv/issues/189#issue-525778778)
- bash ex. bigsnag-cli
    - 空白很重要, -f file 檢察檔案是否存在
    - source file : apply file 
    - echo "Enter something"
    - read VarName < 讀input到變數
    - curl 'url path' > 'path/filename.xx' > 取的request file store to other path
    - assert $? 0 'error message': $? 前一行指令的resp , 0 if 指令完成 return 0
    - 帶入變數方式：1. session define 2.source file 3. 執行指令時帶入
    - **jq**(third party) bash 讀取json file, ex. cat package.json | jq .version
- requestAnimationFrame [CDN](https://developer.cdn.mozilla.net/pl/docs/Web/API/Window/requestAnimationFrame)
- [web socket in react native](https://reactnative.dev/docs/network#websocket-support) 
- [placeimg.com](http://placeimg.com/)

**2020 07 17**
- react native fetch url path 最後面是數字，會自動加slash而出錯
- discuss 地區選擇mirco service

**2020 07 03**
- jest / mock test tool/ jest.fn / fn.mock
- react-messenger-customer-chat configuration
- aws s3 gatsby-s3-?
~/.aws/credential 
AWS_PROFILE 
CDN Route3 cloudfront pchome goDaddy ,or netlify domain manage

**2020 06 23**
- [gif in react native](https://github.com/U1320100568/note/issues/12)
- animation in react js
    - mount then trigger  https://stackoverflow.com/questions/52231320/how-to-replay-a-css3-animation-in-reactjs
    - trigger by event https://stackoverflow.com/a/37073268/13797221

**2020 06 16**
- git log ..origin/master //see what's in origin/master but not in your current branch
- dns? 
- aws > Route53
- godaddy : buy domain name
- cname > name map to name
- a record (ipv4) > ip map to name 
- a record also name map to map for low balance(scalibility)
- real device always use a record
- serverless web use cname(netlify)



**2020 05 19**
- [RN] [back and refresh](https://stackoverflow.com/a/54550032) 
    1. callback by props, on pop or unmount
    2. `onWillFocus from react-navigation` 適合用在太多地方返回，且每次回來都觸發，version 4.X use event listner instead of component
- write null into sharedKey -> 高ios version crash
- github cli and [mongodb](https://github.com/revtel/how-to/blob/master/rd-meeting-note/200602.md)


**2020 05 18**
- [cp google service cli](https://github.com/revtel/rev-cms-core/commit/21dd63baf64b19ac88676a01069603d730f4f8ec)
- [setting bitbucket ssh](https://github.com/revtel/adenovo-aifian-app/wiki/Bitbucket-Setting)
- React native Dimension window長寬會隨著orietation 改變  
- shell script `awk`  
    `wc -c 123.jpg | awk '{print $1}'` -> `4192  123.jpg` -> `4192`  
      
    `version: "v0.0.1"`  -> `...| awk -F'"' '{print $2}'` -> `v0.0.1`
- <img/> max-width: 100% hieght: auto 

**2020 05 04**
- [change bundle id](https://github.com/revtel/rev-cms-app/wiki/Change-Package-Name)
- [ant grid vs flexbox](https://ant.design/components/grid/) 
- web font family
    1. font file
    2. web font(just font)
- OAuth JWT token, access token, client id,api key https://blog.yorkxin.org/2013/09/30/oauth2-1-introduction.html
- google facebook signin SDK and account 
- 自己網路的andriod emulator nework fail

**2020 04 06**
- [Http without Encrypt](https://github.com/U1320100568/note/issues/10)
- rn60 font family
    1. [Steps](https://github.com/facebook/react-native/issues/25852#issuecomment-521044060) (mkdir ./assets/fonts 字體丟進去)
    2. .ttf測試成功
    3. 因為vector icon pod install已經有連結，造成 `Multiple commands produce`，所以[刪掉link的關聯](https://github.com/oblador/react-native-vector-icons/issues/1074)
- [scrollview fill screen](https://stackoverflow.com/a/46909422)
    1. 想在scroll view 放入spinner , empty hint並且置中
    2. flex: 1 造成 無法滑動
    3. containerContentStyle={ flexGrow: 1 ~flex:1~ }


**2020 03 18**
- cli tool from devDependency
    1. add npm script { "appcenter": "appcenter" }
    2. use: `npm run appcenter -- param1 param2...`
- fork library  
> code-push need to patch (non-build)  

      1. fork to github repo
      2. checkout to specific tag (to XX version)
      3. git checkout -b new_branch (branch out)
      4. edit & git push
      5. npm i revtel/repo_name#tag_or_branch_name
- https://github.com/microsoft/react-native-code-push/blob/v5.4.2/docs/api-js.md#codepushgetcurrentpackage
- https://gist.github.com/whitedogg13/0b761e8278522c585495fe500a60d5b4
  
**2020 02 26**
1. rev-cms-core  Select stlying
2. [call qragphql by fetch](https://github.com/graphql/graphql-js/issues/960)
serverless faas, continaer
blob :use case file store
in memory: global variable , use case chat ,  cached

static Timer.XXX
class method Timer.prototype.XXX
instance method timer.XXX, arrow function in class

**2020 02 18**
1. react native animated interpolate, stagger 

**interpolate**
```js
let imageOffset = this.state.secctionOneOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
      extrapolate: "clamp" //prevent input out of range, lead to output out of range
    })
```
**stagger**
``` js
Animated.stagger( 300, // first param is delay from previous animation
      [
        Animated.timing(...),
        Animated.timing(...),
        Animated.timing(...)
      ]
    ).start();
```
2. bash command: `cp 123 (1).png` -> `cp 123\ \(1\).png`
3. [requestAnimationFrame](https://developer.mozilla.org/zh-TW/docs/Web/API/Window.requestAnimationFrame)
4. web assembly, web worker：js背景執行


**2020 02 04**
1. [fetching data moment(compile and bundle, build , run)](https://github.com/U1320100568/note/issues/6)
2. [return promise](https://github.com/U1320100568/note/issues/4)
3. 「提問」直接require("cdn js file")  
 `<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>`
4. `npx`: 暫時載入需要的cli libaray(暫存當下的folder)，結束後自動除掉，常用於cmd react-native, gatsby...
5. `tree` command 


**2020 01 31**
1. 防止點兩下：[debounce, throttle](https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html)
2. rev-cms-core form rating, textarea, styling

**2020 01 16**
1. [webview cache clear](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md)  
`incognito` 這是無痕視窗模式
2. [encodeURIComponent & encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)  
懶惰的方式是整串url丟進encodeURI，但是若paramter有+之類的特殊符號(url規則保留字)，不會被encode，最好的方式是parameter丟進encodeURIComponent()
3. html5 似乎可以取得kind of agent info，可以做到，以什麼裝置可以讀取
4. Aws -> DynamoDB -> Tables -> Items

 **2019 12 23**
1. youtube link need to transfer
2. android reflect https://github.com/revtel/smart-screen-app/issues/47
3. rn pick image https://github.com/revtel/smart-screen-app/issues/27
