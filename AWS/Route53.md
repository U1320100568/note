# 域名哪來的？
- 來自域名商 provider, ex. goddady, 中華電信, aws 也有(`Registered`) ...
- 購買來的域名可以轉移到其他域名商
- 若是在域名商管理就會將 DNS `認證record` 放在域名商設定這邊

# 管理域名
- hosted zone: 從域名商購買來的，可以由別的地方管理，ex. netlify, aws
- hosted zone: 會提供4個name server須填回域名商，**domain lookup 時，就會知道目前是由別的地方管理**

# DNS Domain Name System:
- 存在一些網域紀錄：a record, cname record, mx record(email)

# 題外：網域解析 domain lookup
- 瀏覽器詢問某domain 會看緩存（瀏覽器、本機、路由器、城市路由器、總路由器）
- 逐個上去看哪些地方有存在此domain 對應 ip
- 如果都找不到就會去網域管理機構問name server在哪
- 再到name server 取得ip
- 找到ip 就會可以去web server 取得document

### reference
https://www.wpandseo.tw/46/self-media-dns-introduction/
