# Android 
### change bundle id
1. /android/app/build.gradle > defaultConfig > applicationId
2. /android/app/src/main/AndroidManifest.xml > manifest > package
3. deep link /android/app/src/main/AndroidManifest.xml > activity > intent-filter  > android:scheme

### Java file folder
1. /android/app/src/main/java/xxx/xxx/xxx/MainApplication.java -> 替換成bundle id(以 "/" 分隔)
   - 修改 MainApplication.java 最上面 package xxx.xxx.xxx
   - 或其他import 有舊的 bundle id
3. /android/app/src/main/java/xxx/xxx/xxx/MainActivity.java -> 替換成bundle id(以 "/" 分隔)
   - 修改 MainActivity.java 最上面 package xxx.xxx.xxx
4. android/app/src/main/java/xxx/xxx/xxx/xxx/newarchitecture/MainApplicationReactNativeHost.java
   - 修改 MainApplicationReactNativeHost.java 最上面 package xxx.xxx.xxx
   - 或其他import 有舊的 bundle id
5. android/app/src/main/java/xxx/xxx/xxx/xxx/newarchitecture/components/MainComponentsRegistry.java
6. android/app/src/main/java/xxx/xx/xxxx/xxx/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java
8. android/app/src/main/jni/MainApplicationTurboModuleManagerDelegate.h
   - 同上
   - kJavaDescriptor 修改 `Lxxx/xxx/xxx/newarchitecture` L 要保留
10. android/app/src/main/jni/MainComponentsRegistry.h
   - 同上
   - kJavaDescriptor 修改 `Lxxx/xxx/xxx/newarchitecture` L 要保留



# iOS
1. Change bundle id on Xcode
2. Change team id on Xcode
3. deep link Target > RevtelApp > Info tab > (滑到最下面) URL Types > Change identifier & URL Scheme 
4. 檢查 project.pbxproj PRODUCT_BUNDLE_IDENTIFIER 有無正確
5. 檢查info.plist CFBundleURLName bundle id
6. 檢查info.plist CFBundleURLSchemes bundle id

# Javascript
1. 修改config script的 bundle id

## 其他
- universal link web apple-app-site-association 修改 team id & bundle id (需等待Cache更新後下載app)
- universal link web assetlinks.json 修改 bundle id (需等待Cache更新後下載app)
- ga firebase 修改後，重新下載 google-service.json (android)
- ga firebase 修改後，重新下載 GoogleService-info.plist (ios)
