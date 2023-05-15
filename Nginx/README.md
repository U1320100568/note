## refs 
https://medium.com/starbugs/web-server-nginx-1-cf5188459108
https://medium.com/starbugs/web-server-nginx-2-bc41c6268646  

# Web server
web server (ex. apache, nginx)：主要處理靜態檔案、代理、附載平衡  
application server (ex.python, nodejs, golang): 主要處理動態資料，也是可以處理靜態檔案  

### 反向代理
> 代理伺服器替用戶發送請求，而後轉發至目的地 ??  (哈摟，請說中文  
  
正向代理：client 透過 proxy 用別的身份，轉發到server  
反向代理：client 連到反向代理 server，但不知道背後是連到哪個真實server，背後可能有多台server在處理  
  
> 正向代理隐藏真實 Client，反向代理隱藏真實 Server  
  
> ME:  📨request 方向由 🙎client ->  🏢server  
> 🛂 反向代理server 面對 🙎 client 接收到  📨request，轉身向 🏢server forward request  
   
### 提供緩存（不確定有沒有）

### 隱藏ip
外部 及 DNS 看到的都是代理伺服器的ip，免於被攻擊源伺服器的ip  
擴增也便利  

### 附載平衡
分攤 server 的高流量  
防止惡意攻擊  
排除ㄧ些故障伺服器  
config upstream block 可以起多個service  
```
upstream api {
        ip_hash;  (round-robin 輪詢, least-connection 最少連線優先, ip_hash 依據ip 連線到固定server)
        server localhost:5000;
        server localhost:5001;
}
```
### Apache & nginx
簡單的來說，可以較低資源（記憶體消耗低），效能卻比較好（處理 IO 並發與靜態文檔方面效能），設置也較簡單  

### Plugins 
- gzip 將資源壓縮再傳輸
- https 用Let's Encrypt 取得 90 天效期的 SSL certificate，並且可將http都轉向https
