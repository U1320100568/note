
![image](https://user-images.githubusercontent.com/35591116/115837724-79ecda00-a44b-11eb-91c9-8ff1b13a71e2.png)

- godaddy 買domain的地方
- aws Route53 可代管domain
- netlify 可代管domain

# 實例
① 假設在godaddy購買`hwh.com`，到DNS代管設定新增我買的domain(netlify: team > domains, aws: route53)，新增後拿到多個name servers(例如dns...,or aws..)  
  
② 填回去godaddy 設定 > 網域伺服器 > DNS 設定（告訴godaddy 這 domain 是netlify 哪些dns代管，並且導過去），有多個name servers可能是因為分流。  
  
  
## Record 類型
在DNS 代管設定 records
- CNAME(name to name): hwh.com -> hwh.netlify.com
  通常設定為sub domain: `www.hwh.com` or `dashboard.hwh.com`
- ARecord(name to ip): hwh.com -> 192.0...1
  通常設定為root domain: `hwh.com` or load-balance root
  ps. 有時設定custom domain in netlify project，有warning `Check Configuration`，可取得ip，填入 domains 設定即可。
- MX(mail transaction): `xx@hwh.com` -> `xx@gmail.com`

## netlify serve application or CDN
- 如果再aws CDN代管，拿到ARecord ip，設定到aws route53
- https設定：project domain management > https > SSL/TLS certificate > click renew certificate，也可自行上傳certificate
  「觀念」在這邊設定是因為serve app by netlify，而不是由DNS，所以是由web server管理
  <img src="https://user-images.githubusercontent.com/35591116/115841605-8bd07c00-a44f-11eb-84d9-7e05b7829533.png" width="500"/>




