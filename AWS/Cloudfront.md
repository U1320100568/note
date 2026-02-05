# 新的
## 第一階段：建立 Distribution

- Origin Domain (來源網域)
  - 在哪裡找：進入 S3 Bucket 頁面 -> Properties 頁籤 -> 往下找 Amazon Resource Name (ARN) 下方通常會顯示該 Bucket 的網域，或直接在 CloudFront 建立頁面的下拉選單中選擇。
  - 注意：格式應為 <bucket-name>.s3.<region>.amazonaws.com。絕對不可包含 http:// 或 https://。
- Origin Access (存取權限)
  - 選擇 Origin access control settings (recommended)。
  - 點擊 Create control setting，直接使用預設值（會自動產出一個與 Bucket 同名的 OAC 設定）。
- Web Application Firewall (WAF): 選擇 Do not enable security protections (static web site不需要)。
- Price Class (價格費率): pay as you go
- Default Root Object (必填)：index.html
  - 註解：當使用者直接輸入網域（如 `https://example.com/`），而沒有指定路徑時，CloudFront 必須知道要回傳哪一個檔案。若未填寫，CloudFront 會嘗試列出 Bucket 目錄（被禁止）而導致 403 Forbidden。

## 第二階段：權限加固

- 更新 S3 Bucket Policy：
  - 建立完 Distribution 後，CloudFront 會顯示一個黃色橫幅。
  - 點擊 Copy Policy，並依照 [S3 SOP 第二階段](./S3.md) 將其貼入 S3 的 Bucket Policy 中。
- 補充說明：權限控制（只能從 CloudFront 存取 S3 Bucket）
  - OAC (推薦)：新一代標準。支援頻繁的密鑰輪換、支援所有區域、支援 SSE-KMS 加密存取，並支援 POST/PUT 等所有 HTTP 方法。
  - OAI (舊版)：較基本。不支援 2022 年後推出的新 AWS 區域，僅支援 GET/HEAD 請求，且無法與 KMS 加密配合使用。

## 第三階段：驗證與故障排除

- 驗證步驟：
  - 等待 Distribution 狀態變更為 Enabled 且 Last modified 顯示日期（非 Deploying）。
  - 複製 Distribution Domain Name (例如 d12345.cloudfront.net)。
  - 在無痕視窗開啟網址，確認可看到網頁。
- 故障排除 (Troubleshooting)：
  - 問題：看到 403 Access Denied。
  - 驗證方法：
    1. 先將 S3 Bucket Policy 改回 Public (參考 S3 SOP 第一階段)。
    2. 再次測試 CloudFront 網址。
    3. 結果 A：若改回 Public 後 CloudFront 正常，代表問題出在 OAC 或 S3 Bucket Policy 語法錯誤。
    4. 結果 B：若改回 Public 後仍是 403，代表問題出在 CloudFront 設定 (例如 Origin Domain 寫錯或 Default Root Object 沒填)。
    

# 舊的
create distribution
### step
- **Origin**
- origin domain: choose a s3 origin
  Click `use website endpoint` recommend using the S3 website endpoint `xxx.s3-website-ap-northeast-1.amazonaws.com` rather than the bucket endpoint `xxx.s3.ap-northeast-1.amazonaws.com`.
- HTTP only
- **Default cache behavior**
- Compress objects automatically: YES（預設）
- Viewer protocol policy: Redirect HTTP to HTTPS
- 其他預設
- **Function associations**
- set Function associations Viewer request > CloudFront Function > Choose redirect method `GatsbyWWWSite`
- **Web Application Firewall (WAF)**
- Do not enable security protections
- **Setting**
- Alternate domain name (CNAME): `www.xxx.com` `xxx.com` (domain)
- Custom SSL certificate: 等ACM完成後再來加

- (optional) set cloudfront error page 404 behavior to /404.html


### check 
- 等待 deploying about 10 mins
- copy distribution domain name to browser
