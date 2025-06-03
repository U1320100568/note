# Web Security
## XSS attack (cross-site scripting)
- 帶入惡意程式碼攻擊
- 📌 Reference: https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267
- 種類：
  1. Stored XSS(儲存型) ：  
    使用者輸入任意文字沒有檢查，將惡意的程式碼存到資料庫  
    常見手法：留言、文章輸入<script>
  2. Reflected XSS(反射型)：   
    後端直接回傳使用者在前端的輸入，沒有檢查  
    常見手法：以get方式傳到後端，後端沒有檢查就將惡意程式嵌入前端，導向釣魚網站
  3. Dom-Based XSS：  
    直接用script產生DOM，沒有做檢查就插入DOM  
    常見手法：element.innerHTML ＝ （惡意代碼）
  
> React 可以避免某些injection attack，但有些攻擊還是需要注意，[example](https://stackoverflow.com/a/51852579)
  
  
## Query parameter 在 https 傳輸安全嗎？
- SSL/TLS 是加密在 **Transport Layer** under **Application Layer**，所以 query parameter also encrpto with SSL  
- 但是web server會以明文儲存reqeust log (whole url)，所以重要資訊還是避免加在 query parameter
  
### 📌 Reference:   
- https://stackoverflow.com/a/2629241/13797221  
- https://blog.httpwatch.com/2009/02/20/how-secure-are-query-strings-over-https/  
  
## CSP Content Security Policy
- 用來處理 XSS attack
- 只允許載入白名單的來源
- 加在cloudfront
- html, css, script, font, media...
- ```
  Content-Security-Policy: 
  // fallback
  default-src 'self';
  
  // 可以打哪些request, api, micro service, 
  connect-src www.google-analytics.com ... ;

  // 允許哪些iframe嵌入 like YouTube, ig , map, article youtube
  frame-src www.youtube.com ... ;

  // 允許哪些網頁把我嵌入，避免clickjacking
  frame-ancestors 'none';

  // 嵌入flash, pdf 這些比較少用了
  object-src 'none';

  // google , adobe
  font-src 'self' fonts.gstatic.com;

  // image, article image 可能包含別的網站的
  img-src 'self' www.google-analytics.com i.imgur.com data: ;

  // 不可使用unsafe-inline ，請參考下面sha256
  script-src 'self' 'unsafe-inline' www.google.com apis.google.com;

  // 若是 inline ，請參考下面sha256 or unsafe-inline
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;

  // 自動將http upgrade https，沒有參數
  upgrade-insecure-requests;

  // 可填入 report servie 用來 log violations
  report-uri https://savjee.report-uri.com/r/d/csp/enforce;


  
  // Inline style or script 需要用 base64 encoded SHA256 hash or nonce，記得單引號
  script-src: 'nonce-rAnd0m123' 'sha256-TBqllJlBMexSGRieFFU5KWd8G9KEcSOtCu0N0HD2OLQ=' ... ;
  style-src: 'nonce-rAnd0m123' 'sha256-TBqllJlBMexSGRieFFU5KWd8G9KEcSOtCu0N0HD2OLQ=' ... ;
  ```
- 📌 Reference: https://simplyexplained.com/blog/Content-security-policy-and-aws-s3-cloudfront/
- 可在 CloudFront 增加或是在包一層 Lambda@Edge修改header
- 測試：可以先用 `Content-Security-Policy-Report-Only` 搭配 `report-uri`，不會真的擋，但可以看 哪些不該擋的被擋掉了，然後再改回 Content-Security-Policy
- 測試：也可以用 https://csp-evaluator.withgoogle.com/ 檢查格式正確
- inline script 可以用 `nonce`, `hash` 方式處理
  - `nonce` 要搭配伺服器每次 request 更新nonce較難做
  - `hash` 整個inline區塊去做hash，但是要注意只要任何程式碼不一樣（包含空白多寡）都會造成hash 不一致


## X-Frame-Options
- 自己的網頁被嵌入惡意網頁，會有clickjacking的風險
- 避免方式有兩種：（1）js 判斷window location是否一致，(2) response header x-frame-options (3) CSP frame-ancestors
- 新的瀏覽器不支援 x-frame-options ALLOW-FROM，CSP level2 以上的瀏覽器才支援 CSP frame-ancestors，所以建議 (2)(3) 一起使用
- 📌 Reference: https://blog.huli.tw/2021/09/26/what-is-clickjacking/#x-frame-options
- ```
  // 不允許
  Content-Security-Policy: frame-ancestors ‘none’
  X-Frame-Options: DENY
  
  // 只能自己
  Content-Security-Policy: frame-ancestors ‘self’
  X-Frame-Options: SAMEORIGIN
  
  // 特定url
  Content-Security-Policy: frame-ancestors https://a.example.com https://b.example.com
  X-Frame-Options: ALLOW-FROM https://example.com/  <- 這個支援度不佳且只能一個
  ```
  
## X-Content-Type-Options
- 當 resource 回傳不正確的 MIME type時，瀏覽器需要猜測(sniff) 哪種 MIME type，才能執行，當猜測的過程中，就有可能有漏洞
- ```
  X-Content-Type-Options: nosniff
  ```

## Strict-Transport-Security
- 限制只能用https access
- ```
  Strict-Transport-Security: max-age=31536000; preload
  ```

## X-XSS-Protection
- Cross-site scripting attacks (XSS) 是injects script code攻擊，CSP inline scripts & unsafe resources 就可以防止，但舊的瀏覽器不支援就需要這個
- 也可以增加report url
- 檢查 dangerouslySetInnerHTML 是否會被擋掉
- ```
  X-XSS-Protection: 1; mode=block; report=https://savjee.report-uri.com/r/d/xss/enforce
  ```

## Referrer policy
- 當我的網站點擊外部連結，瀏覽器會send a `referrer`，從哪來的意思，若參數包含使用者資訊就會洩漏，所以增加這個
- ```
  Referrer-Policy: strict-origin-when-cross-origin
  ```

## CORS Cross-Origin Resource Sharing 同源政策
- 同 domain, 同 protocal, 同 port 才是同源，custom domain 不算
- 瀏覽器帶origin -> 伺服器回傳 -> 若非同源瀏覽器接收後，會攔截並報錯（注意：是擋在瀏覽器接收後）
- preflight: 所以在non simple request，才會多打preflight，例如惡意的非同源delete request，就會在preflight 擋下避免真的刪除
- 📌 Reference: https://www.explainthis.io/zh-hant/swe/what-is-cors

