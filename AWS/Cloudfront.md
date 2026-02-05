# 新的
☐ CloudFront Distribution 建立
  
☐ Origin 設定
  ☐ Origin domain: <YOUR_BUCKET_NAME>.s3.<YOUR_AWS_REGION>.amazonaws.com
     (注意：不含 http:// 或 https://)
  ☐ Protocol: HTTP only（CloudFront 自動升級到 HTTPS）
  ☐ Origin Access: Origin Access Identity (OAI) 或 Origin Access Control (OAC)
  ☐ 建立新 OAI: <YOUR_OAI_NAME> (e.g., my-website-oai)
  ☐ 複製生成的 OAI ID: <YOUR_CLOUDFRONT_OAI_ID>
  
☐ Viewer Protocol Policy
  ☐ 選擇: Redirect HTTP to HTTPS
  
☐ Default Root Object
  ☐ 設定為: index.html
  
☐ Caching Policy
  ☐ 使用預設: CachingOptimized
  
☐ WAF
  ☐ Do not enable
  
☐ Price Plan
  ☐ Standard
  
☐ 建立 Distribution
  ☐ CloudFront Distribution ID: <YOUR_CLOUDFRONT_DISTRIBUTION_ID>
  ☐ CloudFront Domain Name: <YOUR_CLOUDFRONT_DOMAIN> (e.g., d123456.cloudfront.net)
  
☐ 等待 Status 從 "Deploying" 變成 "Enabled"（約 5-10 分鐘）


### 補充說明：權限控制（只能從cloudfront存取s3 bucket）
- OAC(推薦)：支援頻繁的密鑰輪換，支援所有區域，支援 POST/PUT 等所有 HTTP 方法。
- OAI(舊版)：較基本，不支援 2022 年後推出的新 AWS 區域，僅支援 GET/HEAD 請求。


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
