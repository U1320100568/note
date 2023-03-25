- 官方文件 https://docs.strapi.io/
- headless cms
- 語言nodejs （注意）version
- 不用管資料庫(預設SQLite), 不用管backend api，只要處理前端

## Content-Type builder
a plugin to create a collection (resource)  
just like build schema

## Content Manager
create content by add new entry
just like create and edit content
don't forget to publish


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
TODO: use render.com to deploy   
TODO: 取消卡號
TODO: 刪掉env/production
TODO: 刪掉render.yaml 

