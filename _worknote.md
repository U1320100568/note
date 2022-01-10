### 2022 01 10
- jsi  讓 js & native communicate synchronize  ，有些library 會使用ReAnimated 實現，會在native thread 跑完 js code，但是必須要使用react hermes engine
- Android & Java required
   - java —version
   - (不確定這步驟) cat ~/.zsh/.zprofile 把 下面這句comment out (這句表示指定版本) export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
   - brew uninstall adoptopenjdk/openjdk/adoptopenjdk8
   - brew uninstall  --cask adoptopenjdk/openjdk/adoptopenjdk11
   - Android studio  > android 12.0 api level 31

### 2022 01 07
- git clean -nd . (先看會發生什麼) 
 - get clean -fd . (-f 強制, -d untracked file)
