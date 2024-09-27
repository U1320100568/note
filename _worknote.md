### 2024 09 27
- [npm][release-it] `"release": "npm run build && dotenv release-it --"` in package.json scripts
  - `npm run release` 平常使用的自動升級 minor version
  - `npm run release major` 就會自動升2.x
  - 補充：可加上 `--preRelease=beta` 版本補上beta版 2.x.x-beta.0 ( 可改成 alpha, rc 不同先行版，也可單獨升級先行版號)

### 2024 09 25
- [encrypt] 非對稱加密，適於組織對個體這類的階級關係，適用於大部分狀況，有兩種應用
  - 組織以私鑰加密，個體以公鑰驗證資料正確度
  - 個體以公鑰加密資料給組織，過程中其他人無法解開，組織以私鑰解開
- [encrypt] certificate 證書，包含 metadata(content) + signature (簽名)
  - sign by key，會產生一段signature
  - 像jwt token 就類似一種 certificate，metadata以json格式儲存，可decode觀察metadata，及驗證signature by 公鑰
    
  
### 2024 09 18
- [react-native] widget 在 ios 視為另一個小app，要另外產生Target & app identifier，android 就是在 內部了
- [react-native][ios] app & widget 或是 app & app 間傳遞資料，需勾選permission `App Group`，並且使用 `User Identity`?? 分享資料
- [react-native] 擷取畫面分享 react-native-share react-native-view-shot

### 2024 09 05
- [mongodb] date type on playground `ISODate('2024-09-05')` or `ISODate()`, on js `{$toDate: new Date().toISOString()}`
- [mongodb] aggragate $match compare (gt, eq...) 要用 `$expr`, ex. `$match: { $expr: { $gt: [$field1, $field2] } }`
- [mongodb] aggregate compare to date string like 2024-09-05 11:00:00, use $dateToString convert date to string. ex.
  ```
  {
    $dateToString: {
      date: {$toDate: end_time.toISOString()},
      format: '%Y-%m-%d %H:%M:%S',
    },
  },
  ```


### 2024 08 12
- [node] node 18 test file 
  - **ERROR**: `Cannot use import statement outside a module`
  - SOLUTION: package.json { "type": "module" } 包含 import 的檔案也要
  - **ERROR**: `[ERR_MODULE_NOT_FOUND]: Cannot find module 'xxx..' imported from xxx...`
  - SOLUTION: import 全名包含副檔名 `import {req} from '../../Utils/ApiUtil';` -> `import {req} from '../../Utils/ApiUtil.js';`
  - **ERROR**: `TypeError [ERR_IMPORT_ASSERTION_TYPE_MISSING]: Module "xx../data.json" needs an import attribute of type "json"`
  - SOLUTION: `import Config from '../../../data.json' with { type: "json" };`
- [node] 但是在run develop with type json 會error，改用 `npm install -D esm` & `node -r esm xxx.js`


### 2024 08 12
- [git] 做了new feature and pull request 已經 merge準備上線，客戶突然說新功能先暫緩，要怎麼還原commit呢？
- [git] 1.第一步 revert a PR merge ，注意看merge commit 會有兩個 parent commit，可以 log 看一下要回復成哪一個
  - new branch
  - `git revert 8f937c6 -m 1` 第一個parent，多數情況是這種，回復成原本的tree
  - `git revert 8f937c6 -m 2` 第二個parent，要reinstate the tree
- [git] 2.第二步 revert the revert
  - new branch
  - `git revert <revert-commit-hash>`

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
