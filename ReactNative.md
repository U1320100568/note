# React native bridge Android
## Adnroid part
1. create native module (android/app/java/com.appname/newModule.java)  
  
  module inherite `ReactContextBaseJavaModule`  
  override getName ，reactnative 的nativemodule就可以讀取此module  
  
  有`@ReactMethod` tag就會成為module的bridge method  
  void method return value can use callback function  
  `callback.involk(null, result)` 當有error產生第一個參數是error

2. create package (android/app/java/com.appname/newPackage.java)  
  
註冊module in `createNativeModules`

3. add into ReactPackageList (android/app/java/com.appname/MainApplication.java)

## React Part
```js
import { NativeModule } from 'react-native'
...
Promise((resolve, reject) => 
NativeModule.newModule.method([input], (err, [result]) => {
  if(err)
    return resolve(result)
  else
    return reject(err)
}))
```
此module 和 method要和native端相同名稱
因為react module是用異步，所以要用promise包起來




---
### Refrence
https://hackernoon.com/react-native-bridge-for-ios-and-android-43feb9712fcb
