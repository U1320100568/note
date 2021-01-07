# 前情提要
<img src="https://user-images.githubusercontent.com/35591116/103844760-8f750880-50d5-11eb-8581-11883fb0de3a.png" />  
  
### Article service 文章內容要如何在各個project display?  
1. 各 project 都 install slate.js & copy preview code into it
2. 各 project 使用iframe 瀏覽 rev-dashboard preview page (console.revtel.com)

### 使用iframe 瀏覽需克服難題  
> iframe 不知道內容大小，造成太多內容會有scroll效果  
  

# resize iframe (same domain)
[reference](https://stackoverflow.com/a/9976309/13797221)  
```html
<script>
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
</script>

<iframe src="..." frameborder="0" scrolling="no" onload="resizeIframe(this)" />
```

# resize iframe (different Domain)
[reference](https://stackoverflow.com/a/42308842/13797221)  

*outer*  
`<iframe ... onload="setIframeHeight(this)"/>`
```js
function setIframeHeight(ifrm) {
   var height = ifrm.contentWindow.postMessage("FrameHeight", "*");   
}
```

*inner*
```js
window.addEventListener('message', function (event) {

    // Need to check for safety as we are going to process only our messages
    // So Check whether event with data(which contains any object) contains our message here its "FrameHeight"
   if (event.data == "FrameHeight") {

        //event.source contains parent page window object 
        //which we are going to use to send message back to main page here "abc.com/page"

        //parentSourceWindow = event.source;

        //Calculate the maximum height of the page
        var body = document.body, html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

       // Send height back to parent page "abc.com/page"
        event.source.postMessage({ "FrameHeight": height }, "*");       
    }
});
```
*outer*   
```js
window.addEventListener('message', function (event) {
//Here We have to check content of the message event  for safety purpose
//event data contains message sent from page added in iframe as shown in step 3
if (event.data.hasOwnProperty("FrameHeight")) {
        //Set height of the Iframe
        $("#IframeId").css("height", event.data.FrameHeight);        
    }
});
```

### ⚠ react hook no this, contentWindow is undefined  
方法1: `document.getElementById("frame1").contentWindow`  
方法2: useRef (不確定react or html which load early)  

### ⚠ when outer onload, inner site component not ready
Q: 如何從inner通知 outer re-render?  
- 方法1: 將source暫存起來，involke postMessage  
outer load完成後，會對inner打第一次postMessage，inner 可接收到時候將source暫存，假如內容會刷新（api 取得資料、loading），也可以再次利用source.postMessage，傳遞height給outer。但是，若遇到第一次都沒有接到source的情況，outer loaded，inner 的React尚未set起來，此方法就會fail。
- 方法2: polling state protocal  
outer設置timer post message給inner，若收到時回給outer確定溝通建立。
<img src="https://user-images.githubusercontent.com/35591116/103844294-8cc5e380-50d4-11eb-9277-215c35a0ede5.png" />
