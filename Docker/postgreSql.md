[strapi with postgres](https://medium.com/dogus-tech-digital-solutions/creating-strapi-app-with-postgresql-e22f00d48b04)
[docker postgres offical](https://hub.docker.com/_/postgres)
  
  
懶人指令：
```bash
docker run --name test-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123 -d postgres
```   
- image postgres from docker hub
- 建立conatiner test-postgres
- user `postgres`，password `123`，並執行起來 port=5432
  
看哪些這在跑的 conatiner 
```bash
docker ps -a
```
  
在container 裡環境跑bash：
```bash
docker exec -it strapi-postgre bash
```
   
在 postgres 執行 sql 指令 in bash: 
```bash
psql -U postgres
```

create DB: 
```sql
CREATE DATABASE db_name;
# 注意最後的分號 ; 重要
``` 

查看資料庫列表： 
```bash
docker exec -it test-postgres psql -U postgres -c "\l"
```
