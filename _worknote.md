### 2025 04 21
- [js] 發生Global State改變，parent not changed
   <img width="500" alt="截圖 2025-04-21 下午2 57 39" src="https://github.com/user-attachments/assets/96c60162-2933-4fe9-aca1-c2c33b4f9380" />

### 2025 04 16
- [xcode] xcode from 15.0 to 16.2
  - Error: No type named 'terminate_handler' in namespace 'std' upgrade Sentry 5.32.0 https://github.com/getsentry/sentry-react-native/issues/3883#issuecomment-2704585741
  - Pod > excluded architectures > 改成 arm64
  - release warning `The archive did not include a dSYM for the hermes.framework with the UUIDs ` issue https://github.com/facebook/react-native/issues/49059 ， 官方說是xcode 16 的 bug
  - <img style="width:200px;" src="https://private-user-images.githubusercontent.com/51951532/373963702-feb6e7e3-52df-49d2-a566-88505e2ceac3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQ3NzI1NzMsIm5iZiI6MTc0NDc3MjI3MywicGF0aCI6Ii81MTk1MTUzMi8zNzM5NjM3MDItZmViNmU3ZTMtNTJkZi00OWQyLWE1NjYtODg1MDVlMmNlYWMzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDE2VDAyNTc1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlNmI4YjU4NjRmNjg4NTcxNjA1YTI4N2U2MWMzYTcyNGRlYmQ5Yjc4MWZhODc1Njg4NzkzNmNkMTY0NzE0YjImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.p8PBn7JdjNk79FBeQst4wyQo4MAO51AMYPNl4-h2O4o"/>

### 2025 04 09
- [shell][filepath]
  - `./path` 在目前的路徑
  - `../path` 在parent的路徑
  - `~/path` `~` = shorthand of `$HOME`，`$HOME` 相當於 `/home/you` or `/Users/you`
  - `/path` 在root ，絕對路徑
- [xcode] 使用舊版的Xcode
  - https://xcodereleases.com/ (需注意macOS版本)
  - 下載xip，點選即可使用
  - Settings > Locations > Command Line Tools 切換版本
  - 可在terminal檢查 `xcodebuild -version` 是否已切換
- [xcode]  刪除xcode & 移除不必要的檔案
  - Delete app from Applications
  - Delete ~/Library/Developer
  - Delete /Library/Developer
  - Delete ~/Library/Caches/com.apple.dt.*
  - ps. simulator platform. They are installed to /Library/Developer/CoreSimulator/Profiles/Runtimes (Not ~/Library!)
- [xcode] 安裝Xcode 時要求安裝iOS 18.+ component，可在 `Settings > Components` 查看並刪除，也可以看到Show in Finder他是被安裝在 `/Library/Developer/CoreSimulator/Volumes/iOS 18.3.1 simulator` 裡

### 2025 02 21
- [js][python] Iterator, Generator, Yield
  - Yield 會return generator(iterator) 保持closure，所以得到的instance 不是function call 的結果，是一個iterator，next取得該closure 執行的結果，下一個next會記得原本clousre執行下一個世代的結果，
  - 到達最後再next，js會回傳空的，Python 會 exception ，除非有 custom implement next
  ```js
  function* generator() {
    let i = 0;
    while (i < 3) {
      i++;
      yield i;
    }
  }
  
  let gen = generator();
  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.next());
  ```
  ps. function 加上星字號就是generator function  
  ps. generator 會回傳 value & done
  ```py
  def generator () :
    i = 0
    while (i < 3):
      i = i+1
      yield i 
  
  gen = generator()
  
  print(next(gen))
  print(next(gen))
  print(next(gen))
  ```
  - 應用：pymongo，list時才會真正執行資料庫搜尋
  ```python
  list(XX.objects.find(query).sort().skip().limit())
  ```
  - 應用：node fs
  ```js
  run(function* () { 
    var text = yield read('yieldFile.js');
    yield write('yieldFile.bak', text);
  });
  ```
  - 優點：減少callback function
  - 有哪些方式可以遍歷 iterator :
    - next()
    - Array.from
    - let [a, b, c] = gen; // destructure
    - let values = [...gen]; // spread operator
    - for...of loop

  

### 2025 01 21
- [hishop] 為什麼沒有 SendBatchEmail step function > tda 工會系列才有  
- [hishop] on_checkout_validate 為什麼需要step function  > 是用來檢查line pay 是否付款成功
- [serverless] 為什麼要透過 serverless 部署lambda & step function : Serverless Framework 是 for serverless 的部署的框架，以cli 部署方式，其他平台的serverless 也可以處理。用nodeJS 編寫
- [serverless] 除了 serverless 也可以使用原生的AWS Serverless Application Model
- [serverless] serverless 可以透過github action 部署，也可以將resource 放在s3  再透過cloud formation
- [python][fastel] 若是body data 就用type Class base on BaseModel, 其他欄位就是query parameter

### 2025 01 13
- revtel storage design:  
  | - | write | read |
  | - | - | - |
  | public | public_client = 'True' 路人也可上傳 | (預設) upload carry `acl = 'public-read'` |
  | private | （預設） | upload carry `acl: 'private'` 搭配custom api `private_upload/access` |

### 2025 01 08
- [shell]
  - 測試條件
    ```bash
    [ statement ] # 單括號會有些限制
    [[ statement ]]
    [[ -z $db_password ]] # -z 檢查是否為 zero length
    ```
  - 命令替換 command substitution
    ```bash
    $( ... ) # 將子執行的結果代入
    ```
  - 等待 & 讀取 input & 塞進變數
    ```bash
    read db_password
    ```
  - 字串置換 （sed 蠻常見）
    ```bash
    sed -i '' "s/%%client_id%%/$client_id/g" $cfg
    ```
  - array
    ```bash
    keys=( ... ) # 注意是小括號
    ```
  - 分割字串
    ```bash
    cut -d= -f1 # "=" 是分割字元 -f1 取得第一個部分
    ```
  - 分割字串
    ```bash
    awk -F '.' '{ print $1 }' # 以 '.' 為分割字元，取第一個部分
    ```
  - 設定預設值
    ```bash
    template_client_id=$2
    template_client_id=${template_client_id:=defaultValue}
    ```
  - while
    ```bash
    while [[ $i -lt ${#keys[@]} ]]; do
      ...
      (( i++ ))
    done
    ```
    - while do done 是一組的
    - `-lt` 算術比較運算符 less than
    - `${#keys[@]}` 這是用來取得數組 keys 的長度的語法。keys[@] 代表數組的所有元素，而 # 前綴則代表數組的長度。因此，${#keys[@]} 表示 keys 數組中元素的數量。
    - `(( i++ ))` 執行算術運算的語法
  
- [Xcode] new app 要建立 identify，certificate 未必，可用舊的，要建立provisioning profile
  - Provisioning profile 是用來連結 identify & certificate
  - Certificate 和 app 無關，是管理此電腦能否在這個org底下開發及發布
