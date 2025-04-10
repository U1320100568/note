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
