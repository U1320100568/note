- [strapi with postgres](https://medium.com/dogus-tech-digital-solutions/creating-strapi-app-with-postgresql-e22f00d48b04)
- [docker postgres offical](https://hub.docker.com/_/postgres)

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

# 連線方式＋SQL語法  
https://github.com/U1320100568/note/blob/master/PostgreSql/README.md  
  
