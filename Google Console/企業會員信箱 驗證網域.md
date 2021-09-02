[ref](http://afersontalk.blogspot.com/2017/01/google-g-suite-dnstxt-mx.html)

# 目的
> 通知信都存在此企業帳號的寄件備份
  
# Step 1 購買企業帳號(G Suite) & 認證網域
> 申請的同時會要求認證網域  
> 告訴google此網域是我購買的  
  
⚠️ 客戶購買時，跟他要txt 驗證紀錄
  
[官方文件](https://support.google.com/a/answer/183895?hl=zh-Hant)  
1. 進入workspace初始化認證網域，認證的步驟中 要取得 **txt 驗證紀錄**  
類似： `google-site-verification=EAaeLLjlZl5wXCfLaurQQcdpTVKTGXXXXXXXXXX1Uuo`  
**一定要記得，已驗證過找不到txt**  

2. 貼到 DNS(netlify, godday, or aws)  
新增到 DNS setting 裡，type=TXT  
此過程不確定（因為網域已被驗證） 
3. 回到 google workspace
點選 驗證我的網域  

4. 設定完成，可見 > 管理網域 > 設定主網域


# Step 2 設定DNS中的MX紀錄值
> 指向 Google 郵件伺服器  
   
[官方文件](https://support.google.com/a/answer/174125?hl=zh-Hant)  
1. 查看網域可能看到 *主網域設定 MX 記錄*  
此步驟要取得 **MX紀錄**  
類似：  `AXXXX.X.GOOGLE.COM` 5個  
新增到 DNS setting 裡，type=MX 


# 注意事項
沒有收到backend寄到的信，檢查backend configuration 是否將此email列在 bcc list

### note. 
dns(domain name service)
