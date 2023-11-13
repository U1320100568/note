# 域名哪來的？
- 來自域名商 provider, ex. goddady, 中華電信, aws 也有(`Registered`) ...
- 購買來的域名可以轉移到其他域名商
- 若是在域名商管理就會將 DNS `認證record` 放在域名商設定這邊

# 管理域名
- hosted zone: 從域名商購買來的，可以由別的地方管理，ex. netlify, aws
- hosted zone: 會提供4個name server須填回域名商，**domain lookup 時，就會知道目前是由別的地方管理**

# DNS Domain Name System:
- 存在一些網域紀錄：a record, cname record, mx record(email)

# 實際操作
### route53 associate to cloudfront
1. created hosted zone, hosted zone name 和 cloudfront 名稱一樣 like xxx.com
2. record type = `A`, and turn on alias
3. 選擇 `Alias to CloudFrontDistribution` 會自動連結至 cloudfront distribution
### 託管 DNS
1. 將建立的 route 53 detail name servers 4筆 `ns-xxx` 貼到 goddady(or 其他registration) Name server 設定(注意 ns 最後面的 `.` 要移除)
- godaddy 託管大概1hr, pchome 24~48hr
### 驗證 email 網域
1. 前往google admin(需購買google workspace)
2. in google, 網域驗證 > 建立帳號時，會有一組txt record，新增至route53 record type = txt, like `google-site-verification=xxxx` (若已完成驗證會找不到 txt record，只好重新驗證)
3. in google, 點選 `驗證我的網域`
4. 檢查是否成功: 管理網域 > 設定主網域
5. 指向google mail server > 複製 mx record (其實每個project都一樣)
6. 新增一筆route53 record: type = mx record, 5條都貼在同一筆 record value (注意後面都有 `.`)

# 題外：網域解析 domain lookup
- 瀏覽器詢問某domain 會看緩存（瀏覽器、本機、路由器、城市路由器、總路由器）
- 逐個上去看哪些地方有存在此domain 對應 ip
- 如果都找不到就會去網域管理機構問name server在哪
- 再到name server 取得ip
- 找到ip 就會可以去web server 取得document


### reference
https://www.wpandseo.tw/46/self-media-dns-introduction/
