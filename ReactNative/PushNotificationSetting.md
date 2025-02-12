# React Native Push Notification Setting

## Create certificate
### iOS
1. 產生Certificate Signing Request
  1. Go to keychain.access > 類別選「所有項目」> (滑到畫面右上角，顯示應用程式訊息)鑰匙圈存取 > 憑證輔助程式 > 從憑證授權要求憑證
  2. 填寫email > 儲存到磁碟 > 修改檔名（optional） > 儲存
2. 到 Console 產生 Certificate
  1. Go to Apple Developer https://developer.apple.com/
  2. identifiers > 進入該project 
  3. push notification configure > Production SSL Certificate > create Certificate and upload 剛剛的 request file
  4. download 憑證（aps.cer）
  5. 點擊憑證加入keychain > 進入keychain 右鍵剛剛的憑證輸出 .p12 檔
  6. 將p12檔 給 backend
  
> 將憑證備份，不可弄丟  
  
### Android
1. Go to Firebase Console https://firebase.google.com/
2. 如果已有專案 > 設定 > 雲端通訊  > 伺服器金鑰 > 複製憑證 給 backend
（沒有專案就新建一個）

### AWS
以aws發送（也可以用firebase，但公司統一用aws）  
backend 進入aws SNS，mobile > push notification  > create platform application (建立兩個)  
1. select type ios or android
2. upload certiface p12 (ios) or 填入token (android)

## Install library
```bash
npm install --save react-native-push-notification
npm install --save @react-native-community/push-notification-ios 
```

### In iOS Xcode Capability
- Background Mode capability and tick Remote Notifications.
- Push Notifications capability

### iOS native setting
https://github.com/react-native-push-notification/ios

### Android setting & React Native usage
https://github.com/zo0r/react-native-push-notification?tab=readme-ov-file


## 注意
- IOS PushNotification sandbox 指：local developemnt 環境。只要是經過 Apple （testflight、app store）release 的 app，都「不屬於」sandbox！
