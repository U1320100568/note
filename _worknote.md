### 2024 08 02
- [react-native] react native paper v5
  - based on Google’s Material Design guidelines and provides components
  - Color system : 26+ color roles mapped to Material Components
    <img src="https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln4letb9-all-color-roles-diagram.png?alt=media&token=020eaf3d-36bb-477a-8c6c-b588ace2b073"/>
    - 選擇一種產生 color system  
    - 1. [Figma MD3 build tool](https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) : 上傳一張圖片或者輸入key colors，產生自己app的color system，可以從plugin 匯出 json（注意 ）
    - 2. [react-native-paper tool](https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors) : 輸入 key colors 產生color system
    - react-native-paper theme.colors = {} 可以設定（可由上面json copy）
    - 若對比不夠的話，需注意產生出來的 key color會自動調整色調、彩度，從Button mode="contain" 就可以明顯看出
  - [Surface colors](https://m3.material.io/styles/elevation/overview#31b94605-a9fc-4b16-b494-23a42cd6a26f): md3 用不同深淺的來區分 0 ~ 5  elevation (md2 是用陰影區分) ，雖然 react native paper surface 是結合兩種
  - Typography 字體 分成5種roles: display, headline, title, body, label 每種角色各分成 small, medium, large


### 2024 07 12
- [git] `git fetch origin pull/{num}/head:{local branch name}`  
  想要把別人的fork(PR回自己的repo)拉到我電腦的local做測試，並且改一個branch name
- [shell] homebrew unlink {tool_name}  
  例如homebrew自己裝了node，和n裝的node發生衝突，那就解除連結，shell找不到就會找回n裝的（不要自行修改環境變數）


### 2024 07 01
- [react-native][react-native-video] On **samsung** & **bundled** app will throw error `none of the available extractors errorCode 23003 exoplaybackException ERROR_CODE_PARSING_CONTAINER_UNSUPPORTED` and cannot play video  
   - The reason: the video file is put in local asset folder, and there is a same name file but other extension. Like `aaa.mp4` & `aaa.png`  
   - Solution: rename  

### 2024 06 26
- [react-native] react-navigation navigate to **other nested stack** and back to screen of other stack, add `initial: false`
- stackNested1 > (navigate) stackNested3 > (goback) stackNested2
```
|-- stackA
|   |-- stackNested1  
└-- stackB  
    |-- stackNested2  
    └-- stackNested3
```
```js
// navigate
navigation.navigate('stackB', {screen: 'stackNested3'}) // go back will be stackNested1
navigation.navigate('stackB', {screen: 'stackNested3', initial: false}) // go back will be stackNested2
```


### 2024 05 08
- react native upgrade from 6x to 71
  - vision camera upgrade v3
  - [error] android release build will cache previous js bundle, it could release stg to prod env. To fix it, **`./gradlew clean` everytime before release step**.
  - [native error] `Error while updating property 'accessibilityState' of a view managed by: RCTView` Touchable or Button's disable property **must put `true` or `false` only** , issue [https://github.com/facebook/react-native/issues/35119.](https://github.com/facebook/react-native/issues/35119)
