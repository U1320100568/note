### 2026 03 13
- [fullstack] 
  用測試的repo `next-test`
  1. init by agent
  2. clone to local
  3. Npm run dev. Run npm script to create management user.
  4. to vercal 
  5. monogdb create a project, cluster. db user. Network access open to all. Copy db connect string to env
  6. jwt secret 正常流程要去 1password 建立一組（測試可以亂填） 
  7. 檔案 Service使用 vercel-blob 2.3.0
  8. 寄信 Service 使用 resend


### 2026 01 30
- [react-native] android apk 第一次安裝就crash，重裝才能測試，第二次點開就正常
  原因：vision camera 4.7.2（包含以前）會在 js ready 前就run getJSModule init https://github.com/mrousavy/react-native-vision-camera/releases/tag/v4.7.3
