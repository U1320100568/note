**2020 02 26**
1. rev-cms-core  Select stlying

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
