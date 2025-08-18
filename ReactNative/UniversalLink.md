# Universal Link
  
使用情境：當 user 打開網頁，系統會從 asociate file 得知相關連的手機應用，並直接打開app  
  
## IOS
- ✅ dev mode 可測試
- ✅ TestFlight 可測試

### 作法
1. iOS Xcode 新增capability > associated domains “applinks:{domain}”
    - [ ] 檢查 apple developer 有沒有加
    - [ ] 檢查 ios/RevtelApp/RevtelAppRelease.entitlements 有沒有增加
- Local debug (未使用過)  
    https://medium.com/zrealm-ios-dev/universal-links-%E6%96%B0%E9%AE%AE%E4%BA%8B-12c5026da33d
2. 在web上加入 associate file，直接上傳到S3 /.well-known folder and 指定 content-type（GitHub action 不會上傳.well-known 所以不會被蓋掉）
    - 可查看`[domain]/.well-known/apple-app-site-association`
    - 若有新增修改associate file 要去cloudfront invalid
    - Apple cache 會隔一段時間才更新，user 是在更新app 時候抓，所以如果有關universal link 功能都要app升版
    - Apple cache verify https://yurl.chayev.com/ios-results?url=https%3A%2F%2Flaya-next.revtel2.com&prefix=&bundle=
    - (不確定)如果是開發中的App，後面要再加入”?mode=developer” (ios14 up)
    - (不確定)開發者模式開啟associate domain link (ios14 up)



## Android
- Android dev mode(未測試過)
- ✅ apk 可測試
- google console 內部群組（未測試、不確定是否要審核）
  
### 作法：
1. 在web上加入 assetlinks.json，裡面包含SHA256 certificate，local build & play store 的SHA256都要加入
    - 取得local SHA `keytool -list -v -keystore [keystore_name].keystore -alias [your_alias] -storepass [your_keystore_pass] -keypass [your_keypass]`
    - 取得play store SHA，登入google play console (就算local sign 過一次，上傳到play 還是會再sign 一次)
    - 檢查 `[domain]/.well-known/assetlinks.json`
2. 加上這段 in AndroidManifest.xml
   有幾個就要加幾個 intent-filter (不要蓋到原本的bundle id 的 intent-filter)
    ```xml
    <intent-filter android:autoVerify="true" tools:targetApi="m">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https"
              android:host="laya-next.revtel2.com"  />
        <data android:path="/"/>
        <data android:pathPrefix="/table"/>
        <data android:pathPrefix="/products"/>
        <data android:pathPrefix="/product"/>
    </intent-filter>
    <intent-filter android:autoVerify="true" tools:targetApi="m">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https"
              android:host="now.laya.com.tw" />
        <data android:path="/"/>
        <data android:pathPrefix="/table"/>
        <data android:pathPrefix="/products"/>
        <data android:pathPrefix="/product"/>
    </intent-filter>
    ```

- 測試是否能開啟  
    ```shell
    adb shell am start -a android.intent.action.VIEW -c android.intent.category.BROWSABLE -d "https://laya-next.revtel2.com/table" 
    ```
    (可在最後+ <your.app.pkg> 指定某個app 開啟，不加就由系統競爭)  
