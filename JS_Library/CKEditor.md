- [CKEditor 5](#CKEditor%205)
- [CKEditor 4](#CKEditor%204)

# CKEditor 5
完全重寫的，更易於現代框架嗎？  
### 免費版：
1. GPL: GPL 授權、會有 Powered by CKEditor
2. 免費 account: 
  - GPL 2+
  - 會有 Powered by CKEditor
  - 1,000 editor loads per month		
  - Storage - 1GB
  - Bandwidth - 1GB
  - Image megapixel - 3MP
  - File size - 2MB

### 圖片上傳 adapter：
1. CKBox Upload Adapter 付費
2. Easy Image Upload Adapter 付費 (server-side connector )
3. Simple Upload Adapter 用這個
4. Base64 Upload Adapter
   - Server 需要支援 XMLHttpRequest 
   - Request POST, url, headers, withCredentials
   - response:
    ```
    {
        "url": "https://example.com/images/foo.jpg"
    }
    Or 
    {
        "urls": {
            "default": "https://example.com/images/foo.jpg",
            "800": "https://example.com/images/foo-800.jpg",
            "1024": "https://example.com/images/foo-1024.jpg",
            "1920": "https://example.com/images/foo-1920.jpg"
        }
    }
    ```
5. Uploadcare 整合dropbox google drive Facebook, oneDrive,  or 自己電腦，可以裁切圖片
6. Custom upload adaptor 

# CKEditor 4
### 簡介：
- https://ckeditor.com/docs/ckeditor4/latest/guide/dev_easyimage_integration.html
- 可以選擇 LGPL lisense
- 2023 6 月就停止更新
- React 17 必須使用 v3.x (current)
- React 18 必須使用 v4.x (only) 最新的的是 v5.x (此版本非 CKEditor 5)

### 套件：
- Default buttons list https://stackoverflow.com/a/18637110
- Default plugin list https://stackoverflow.com/a/19605203
- 安裝 plugin 文件很複雜：
  1. Online Builder 選擇要用的下載Editor zip https://ckeditor.com/cke4/builder
      1. 4.22.1 選這個 4.25.1(LTS) 不要這個會壞掉
      2. 安裝，解壓縮後把整個folder放到web root domain，react為例，放到public folder
          ```
          http:localhost:3000/ckeditor/ckeditor.js
          ```
      3. 可開啟此網址測試是否安裝成功：http://localhost:3000/ckeditor/samples/index.html
      4. 在CKEditor editorUrl 填入 domain + /ckeditor/ckeditor.js，editorUrl 是 altered CKEditor script 的行為
      5. 安裝成功
      6. 目前安裝：Color Button, Font Size and Family, Justify
  2. 手動安裝，下載zip檔放在ckeditor4/plugins(安裝的資料夾), 並設定extraPlugins，npm 安裝的所以不可行

### 圖片：
- 圖片上傳有 Default, Enhancement, Easy ( 但是easy 和 CKeditor cloud service 強相關)(tda 舊的看起來是Default or enhance)
- 需要刻制server upload api : filebrowserImageUploadUrl


