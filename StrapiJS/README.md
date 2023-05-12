## Introduction
- 官方文件 https://docs.strapi.io/
- open source headless cms
- base on nodejs（注意）version
- design api & manage content 不用管資料庫(預設SQLite), 不用管backend api，只要處理前端
- example https://strapi.io/blog/postgre-sql-and-strapi-setup

## Content-Type builder
a plugin to create a collection (resource)  
just like build schema

## Content Manager
create content by add new entry
just like create and edit content
don't forget to publish

### Folder Structure
```
    |---- config
    |     |- api.js // 通用設定 for api
    |     |- admin.js // admin 介面的設定
    |     |- database.js // database 基本設定（預設 sqlite）
    |     |- middleware.js
    |     |- server.js // host server 基本設定
    |     |- cron-tasks.js // 設定cron job
    |     |- plugins.js
```

## Database
- default sqlite
- sqlite to postgres  https://strapi.io/blog/postgre-sql-and-strapi-setup
- postgres command https://github.com/U1320100568/note/tree/master/PostgreSql
- create role  (詳見上面command)
- create db (詳見上面command)

## Env
`.env` (local), `environment variable` (render.com)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=xxx
API_TOKEN_SALT=xxx
ADMIN_JWT_SECRET=xxx
TRANSFER_TOKEN_SALT=xxx
JWT_SECRET=xxx
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=xxx
DATABASE_USERNAME=xxx
DATABASE_PASSWORD=xxx

```


## Settings Permission
### public
user & permission plugin > Roles > Public

## Docker
https://razinj.dev/how-to-run-strapi-4-in-a-docker-container-using-docker-compose/  
照著裡面做，process exit  
  
`resolved` try to run docker only  
原Dockerfile `FROM starpi:base` 改成 `node:16`  > successful !
  
render 不支援docker-compose 只有 docker  
docker-compose local run error  

<span style="background-color:aquamarine;">docker</span>
<span style="color:aquamarine;">strapi</span>
<span style="color:aquamarine;">sqlite</span>
  
  

## Deploy 
免費api server render.com、Fly.io、Deta.sh、Google Cloud Run  

### Render.com
- web service(NODE or DOCKER)
- use webserver `NOT` blueprint!!
- env 的資料放在 `Environment Variable` 裡 (不要放在Secret file)
- 資料庫的資料不會轉移，只有schema
- env 注意事項
  ```
  HOST=不用放
  PORT=不用放
  DATABASE_HOST=由external url 中擷取host
  DATABASE_PORT=from DB
  DATABASE_NAME=from DB
  DATABASE_USERNAME=from DB
  DATABASE_PASSWORD=from DB
  DATABASE_SSL=true
  ```
 
## Plugins
- [cloudinary](./Cloudinary.md)

