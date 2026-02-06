# 方案二：正式生產版 (外部網站 / 企業級)

適用場景： 正式上線產品、注重安全性、SEO 友善、成本保護。 架構優點： * 安全性：S3 完全封閉，防止帳單被惡意刷爆。

- SEO 友善：避免重複內容，權限集中於單一網域。

- 專業性：符合 AWS 資安最佳實踐 (Least Privilege)。

## 1. S3 Bucket 設定 (Private)

- 權限控制：

    - Block Public Access: 全部 開啟 (Enabled)。

    - Static Website Hosting: 關閉 (Disabled)。

- Bucket Policy: (待 CloudFront OAC 建立後回頭貼上)

    - 從 CloudFront 控制台點擊 "Copy Policy"。

    - 確保 Condition 包含該 Distribution 的 SourceArn。

## 2. CloudFront 設定

- Origin Domain: 從下拉選單選擇 S3 REST Endpoint。

- Origin Access: 選擇 Origin access control settings (OAC)。

    - 若無現成 OAC，點擊 Create control setting。

- Default Root Object: index.html (必填)。

## 3. CloudFront Function (處理子目錄路由)

- 建立 Function: 命名為 GatsbyOACSite。

- 程式碼:
```JavaScript

function handler(event) {
    var request = event.request;
    var uri = request.uri;
    if (!uri.includes('.')) {
        if (uri.endsWith('/')) { request.uri += 'index.html'; }
        else { request.uri += '/index.html'; }
    }
    return request;
}
```

- 發佈: 點擊 Publish。

- 關聯: 在 Distribution 的 Behaviors -> Viewer Request 關聯此 Function。

## 4. CloudFront Error Pages (處理 404)

- 進入 Error pages 頁籤，新增規則：

    - 403 Forbidden: → /404.html (Status: 404)

## 5. 驗證方式

- 確認訪問 domain.com/ 正常顯示。

- 確認訪問 domain.com/contact (無斜線) 正常跳轉。

- 確認訪問 domain.com/non-exist 正確顯示 Gatsby 的 404 頁面。
