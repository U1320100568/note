`import { Linking } from "react-native"`  
  
## 共有兩個常用function:  
1.  `Linking.getInitailUrl`  
一開始啟動app偵測到傳進來的url  
例：從sms的 deeplink 啟動  
> 注意：push-notification 裡 url 不會從這邊被接收，請在 onNotification 處理。  
> 注意：react native debug mode 接收到的都是 null，請關閉。  
   
2. `Linking.addEventListener('url', this._handleUrlEvent)`  
偵測有無url改變，並且跳轉  
建議 create Deeplinking.js   
將getInitailUrl 及 跳轉的邏輯 放在此檔案方便管理  
在 *landing screen* 呼叫 `getInitailUrl`   
在 *Applinking* 呼叫 `addEventListener`  
  
> Q: 若跳到detail screen 又跳回 home screen，A: 應該是呼叫的時間點錯誤，跳轉的動作都需要在landing reset home 之後  
> Q: 畫面跳轉兩次，A: react-navigation 2.X 4.X 預設handle deeplinking ，可關掉 `<AppNavigator enableURLHandling={false} `  

# Debug  
因為用一般方式開啟無法偵測deeplink 帶來的 initail url (code start狀態)  
可用方式：Xcode run but not launch  
step:  
  1. Project > Scheme > edit > Wait for executable to be launched  
    <img src="https://user-images.githubusercontent.com/35591116/93989546-9d1fb000-fdbc-11ea-86b7-1e945df48dd6.png" width="700"/>
  2. Xcode run
  3. 以deeplinking 開啟
  4. 可下中斷點在Xcode
