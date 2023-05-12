一個上傳檔案的雲端空間  
免費版 容量25GB  

## Steps
strapi add cloudinary https://strapi.io/blog/add-cloudinary-support-to-your-strapi-application  
1. `npm install @strapi/provider-upload-cloudinary`
2. config/plugins.js 需增加 cloudnary 設定
3. 在 .env 填上 cloudiary `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`
4. 重啟  
  
### fix preview
https://strapi.io/blog/add-cloudinary-support-to-your-strapi-application step4 Fixing Preview Issue on Strapi Admin  
1. 在middleware.js 取代 security區塊  
  
在local上傳，看cloudibary 有沒有新增檔案  
