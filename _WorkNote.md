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
