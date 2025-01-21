### 2025 01 21
- [hishop] 為什麼沒有 SendBatchEmail step function > tda 工會系列才有  
- [hishop] on_checkout_validate 為什麼需要step function  > 是用來檢查line pay 是否付款成功
- [serverless] 為什麼要透過 serverless 部署lambda & step function : Serverless Framework 是 for serverless 的部署的框架，以cli 部署方式，其他平台的serverless 也可以處理。用nodeJS 編寫
- [serverless] 除了 serverless 也可以使用原生的AWS Serverless Application Model
- [serverless] serverless 可以透過github action 部署，也可以將resource 放在s3  再透過cloud formation

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
