# Android 
### change bundle id
1. /android/app/build.gradle > defaultConfig > applicationId
2. /android/app/src/main/AndroidManifest.xml > manifest > package

### Java file folder
1. /android/app/src/main/java/xxx/xxx/xxx/MainApplication.java -> 替換成bundle id(以 "/" 分隔)
2. /android/app/src/main/java/xxx/xxx/xxx/MainActivity.java -> 替換成bundle id(以 "/" 分隔)
3. 修改以上兩個檔案最上面 package xxx.xxx.xxx


# iOS
1. Change bundle id on Xcode
2. Change team id on Xcode
3. 檢查info.plist CFBundleURLName bundle id
4. 檢查info.plist CFBundleURLSchemes bundle id

# Javascript
1. 修改config script的 bundle id

