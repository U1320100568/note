### 2026 01 30
- [react-native] android apk 第一次安裝就crash，重裝才能測試，第二次點開就正常
  原因：vision camera 4.7.2（包含以前）會在 js ready 前就run getJSModule init https://github.com/mrousavy/react-native-vision-camera/releases/tag/v4.7.3
