### 2023 07 03
- node 16  Cannot use import statement outside a module > 可在 script folder 加上 `package.json` `{ "type": "module" }`

### 2023 06 21
- [infra] 近幾年可以`Lambda`(serverless) + `api gateway`(持續連線) 實作websocket，lambda 不用也無法處理connection  
  Ec2可以持續連線，但是一台機器無法handle 大量運算，如果5000同時搶購  
  - 為什麼使用`redis db`？  
  Websocket.io 本來連線是在global state (memory)，但如果scaling 開啟第二台 websocket，狀態無法共用，這時候就可以存到db，websocket official 使用 Redis  
  可以更快速地存取，相對redis 比較缺少其他優勢，但比較快 ，常被用來快取。  
- [d3] scale interpolation: 整張圖的大小；data 怎麼對到整個圖的座標；座標軸怎麼畫
- [d3] data 怎麼畫在dom 上
```js
function d3Test2() {
  // HTML: <section class='d3-test2'></section>
  let margin = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30
  };
  let width = 400;
  let height = 300;
  const svg = d3
    .select("section.d3-test2")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const data = d3.range(100).map((d) => ({
    x: d * 20,
    y: 100 + Math.sin(d) * 20
  }));

  svg
    .append("g")
    .attr("class", "my-circles")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => 5);

  const root = document.querySelector("section.d3-test2");
  if (root.firstChild) {
    root.firstChild.remove();
  }

  root.appendChild(svg.node());
}
```

### 2023 06 14
- [js] nullish `??` 判斷是否為 null undefined
```
(1) undefined ?? "123" = "123"
(2) null ?? "123" = "123"
(3) 0 ?? 22 = 0
(4) "" ?? "123" = "" 
```
- [react] StrictMode 會 run twice，會造成clean up function 被觸發


### 2023 05 31
- [aws] domain SSL certificate: ACM服務
- [aws] 單獨測試AWS 推波 SNS > platform application (APP + apple or android) > endpoint(device token) > push msg > custom payload   
  (跟notification service 沒有關係)  
  Payload: `notification`（google sdk 自己推，這個不會通知到app） or `data`（由app 自己刻制，app 的背景程式會聽到） 選一個  

### 2023 05 24
- [git] 找到某關鍵字的 log history `git log --grep="notification"`

### 2023 05 12
- [js] link script 參數 `async`, `defer` https://html.spec.whatwg.org/multipage/scripting.html  (參考示意圖)
  - 預設是暫停html parser，執行script
  - `async` 和html parser 同時載入，但是會暫停執行
  - `defer` 和html parser 同時載入，但是在html 處理完，才會執行
- [css] 自己置中（有點trick）  
  ```css
  width: min(720px, 100% - 40px);
  margin-inline: auto;
  ```

### 2023 05 05
- [git] 要捨棄已經上傳到local commit = 還原成 remote 的 branch
  ```
  git fetch origin
  git reset --hard origin/master
  ```
- [react native] React Native upgraded 版本升級 Helper https://react-native-community.github.io/upgrade-helper/
  看完diff後，手動patch
  
### 2023 03 22
- Unresolved symbol error & Duplicated symbol error  
  
  Static library (build time resolve)  
  Dynamic library (run time resolve)  
  
  - Compile (like babel)  
  編譯成一個一個黨(OBJ)  
  - Link (like webpack)  
  把編譯完的的黨都打包起來   
  
  如果在link stage 發生在OBJ檔找不到某個symbol ，就會發生 unresolved symbol error  
  如果在link stage 發生兩個一樣symbol ，就會發生 duplicated symbol error  

  在Gatsby onWebpackConfig 導入node build-in library 就是類似 Link 的動作  

### 2023 03 09
- [js] console warn `mini-css-extract-plugin]Conflicting order ` > how to ignore? https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
- [js] console warn html attribute aria-* 不用寫成 camel case，如果寫成camel會有warning


### 2023 02 23
- [bash] find path --name "xxx" 這個檔名是 excatly 可以搭配 `*`
- [bash] grep -rn pattern path 
- [js] 金錢 formating `nunmber.toLocaleString('en-US', 'currency');`

### 2023 01 11
- markdown collapse
```md
<details>
  <summary>收合部分</summary>

  要隱藏的部分
</details>
```
