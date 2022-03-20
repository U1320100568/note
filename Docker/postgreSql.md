https://medium.com/dogus-tech-digital-solutions/creating-strapi-app-with-postgresql-e22f00d48b04

  
  
懶人指令：`docker run -d --name my-postgres -p 8080:5432 -e POSTGRES_PASSWORD=admin postgres` 
沒有image時會自動拉，並建立conatiner `my-postgres`，user `postgres`，password `123`，並執行起來 port=5432

看哪些這在跑的 conatiner `docker ps -a`

在container 裡環境跑bash：`docker exec -it strapi-postgre bash`

在 postgres 執行 sql 指令 by bash: `psql -U postgres`

create DB: `CREATE DATABASE db_name;` 注意最後的 `;`

查看資料庫列表： `docker exec -it my-postgres psql -U postgres -c "\l"`
