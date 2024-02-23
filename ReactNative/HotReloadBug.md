# React Native Development Hot reload
本篇僅討論 real device 使用情境，因為 simulator 都會正常 hot load。  
real device 連線方式有兩種：1. 接線 2. wifi (ios 第一次接線後，Device select connect via network，且連接同一個wifi)  
ps. real device turn on `developer mode`  
ps. 注意scheme 不是run release mode

問題：修改code儲存後，沒有自動hot reload  
變換wifi就會產生這種現象  
測試rebuild、重開Xcode、`R` hotkey reload都沒用  

解決方式：
```
關掉app，重新開啟app，不要用xcode觸發，不要用 `R` hotkey
```

  
