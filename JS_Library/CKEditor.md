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
疑似免費？  
