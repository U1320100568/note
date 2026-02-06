# 方案一：輕量快速版 (個人專案 / 內部系統)

- 適用場景： 不在意 SEO、追求開發效率、內部工具。 架構特點： S3 開放 Public Access，設定極簡。

## 1. S3 Bucket 設定

    - 權限控制：

        - Block Public Access: 全部 關閉 (Disabled)。

        - Object Ownership: ACLs disabled。

    - Static Website Hosting: 啟用 (Enabled)。

        - Index document: index.html

        - Error document: 404.html

    - Bucket Policy:
    ```JSON

    {
        "Version": "2012-10-17",
        "Statement": [{
            "Sid": "PublicReadForGetBucketObjects",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
        }]
    }
    ```

## 2. CloudFront 設定

    - Origin Domain: 選擇 S3 Static Website Endpoint (手動貼上網址)。

    - Viewer Protocol Policy: Redirect HTTP to HTTPS。

    - WAF: Do not enable。

    - 驗證方式: 直接訪問 CloudFront 域名或自定義網域。
