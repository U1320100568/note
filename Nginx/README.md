## refs 
https://medium.com/starbugs/web-server-nginx-2-bc41c6268646  

# Web server
web server (ex. apache, nginx)：主要處理靜態檔案、代理、附載平衡  
application server (ex.python, nodejs, golang): 主要處理動態資料，也是可以處理靜態檔案  

### 反向代理
> 代理伺服器替用戶發送請求，而後轉發至目的地 ??  (哈摟，請說中文  
   
   
### 提供緩存（不確定有沒有）

### 隱藏ip
外部 及 DNS 看到的都是代理伺服器的ip，免於被攻擊源伺服器的ip  
擴增也便利  

### 附載平衡
分攤 server 的高流量  
防止惡意攻擊  
排除ㄧ些故障伺服器  
config upstream block 可以起多個service

### Apache & nginx
簡單的來說，可以較低資源（記憶體消耗低），效能卻比較好（處理 IO 並發與靜態文檔方面效能），設置也較簡單  


