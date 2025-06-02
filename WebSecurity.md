# Web Security
## [XSS attack (cross-site scripting)](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
帶入惡意程式碼攻擊
1. Stored XSS(儲存型)  
  使用者輸入任意文字沒有檢查，將惡意的程式碼存到資料庫
  常見手法：留言、文章輸入<script>
2. Reflected XSS(反射型) 
  後端直接回傳使用者在前端的輸入，沒有檢查
  常見手法：以get方式傳到後端，後端沒有檢查就將惡意程式嵌入前端，導向釣魚網站
3. Dom-Based XSS  
  直接用script產生DOM，沒有做檢查就插入DOM
  常見手法：element.innerHTML ＝ （惡意代碼）
  
> React 可以避免某些injection attack，但有些攻擊還是需要注意，[example](https://stackoverflow.com/a/51852579)
  
  
## Query parameter 在 https 傳輸安全嗎？
SSL/TLS 是加密在 **Transport Layer** under **Application Layer**，所以 query parameter also encrpto with SSL  
但是web server會以明文儲存reqeust log (whole url)，所以重要資訊還是避免加在 query parameter  
📌 Reference:   
https://stackoverflow.com/a/2629241/13797221  
https://blog.httpwatch.com/2009/02/20/how-secure-are-query-strings-over-https/  
  
## CSP Content Security Policy
- 用來處理 XSS attack
- 只允許載入白名單的來源
- html, css, script, font, media...
- 加在cloudfront
  
  
