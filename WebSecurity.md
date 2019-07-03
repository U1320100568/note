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
  
