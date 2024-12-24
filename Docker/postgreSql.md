[strapi with postgres](https://medium.com/dogus-tech-digital-solutions/creating-strapi-app-with-postgresql-e22f00d48b04)
[docker postgres offical](https://hub.docker.com/_/postgres)

# Docker
啟動 container
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

# 進入SQL via bash
在container 裡環境跑bash：
```bash
docker exec -it test-postgres bash
```
`i` 維持input `t` 分配一個終端tty  
進入到bash會看到 command prompt 呈現 `root@2e64b5e8e343:/# `  
  
Connect to DB use user _postgres_  default Superuser = _postgres_ 無密碼  
```bash
psql -U postgres
```
`-U` user   
進入DB會看到 command prompt 呈現 `postgres=# `  
此postgres是預設db _postgres_
可使用\du 查看此DB 有哪些user，一開始應該是只有 _postgres_ supervisor  
```
\du
```
  
# SQL 
create DB:  
```sql
CREATE DATABASE db_name;
# 注意最後的分號 ; 重要
```
  
查看剛剛建立的DB
```
\l
```
  
切換DB
```
\c db_name
```
進入到新的DB test，會看到command prompt 呈現 `test-# `  
  
建立table  
```
CREATE TABLE food (
   name varchar(80),
   price int 
);
```

查看table  
```
\dt
```
  
INSERT   
```SQL
INSERT INTO food  
VALUES ('好吃豬肉', 2000);
```
注意：要用單引號 '
注意：可以直接換行，SQL判斷分號;才會停止

查看資料庫列表： 
```bash
docker exec -it test-postgres psql -U postgres -c "\l"
```
