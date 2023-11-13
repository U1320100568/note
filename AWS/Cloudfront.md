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
