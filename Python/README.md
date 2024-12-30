# 環境
1. 先安裝Xcode (和底層c有關係)
2. 安裝 brew
3. 安裝 pyenv by brew
    - 類似n的管理工具
    - `pyenv versions` 查看有安裝哪些 python 
5. 安裝 python by pyenv (m1 使用 3.8.10, 3.8.9 無法安裝)
    -  `which python` 檢查是否使用 pyenv 安裝路徑 /Users/laijiajun/.pyenv/shims/python3
    -  [Set up your shell environment for Pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#b-set-up-your-shell-environment-for-pyenv) 設定環境變數
5. pip 會自動安裝
    - 類似npm安裝python dependency工具
    -  `which pip3` 檢查是否使用 pyenv 安裝路徑 /Users/laijiajun/.pyenv/shims/pip3
    -  和npm的區別是，pip 不是安裝在project local，而是安裝在 python installation 的地方，在project中會有 virtual environment 管理該專案的版本


# 概要

```bash
python test.py arg1 arg2 arg3
```
- python: interpreter
- 執行一個檔案稱為一個module(跟js一樣)，例如test.py
- sys.argv[0] = test.py, sys.argv[1] = arg1, 以此類推
    ```python
    if __name__ == "__main__":
        cmds = [
            ("get_ppe", get_ppe),
            ("prt_ppe", prt_ppe),
            ("put_ppe", put_ppe),
            ("get_cfg", get_cfg),
            ("put_cfg", put_cfg),
            ("gen_secret", gen_secret),
        ]
        if len(sys.argv) > 1:
            action, *args = sys.argv[1:]
            func = next((it[1] for it in cmds if it[0] == action), None)
            if not func:
                print(f"ERROR: cmd [{action}] not found")
                exit(1)
            func(*args)
        else:
            print("Available commands:")
            print("-" * 33)
            for cmd in cmds:
                print(f"{cmd[0]}:\t{str(inspect.signature(cmd[1]))}")
    ```
- `if __name__ == "__main__":` 當module在最root執行時（非import的時候），可用在可被import ，也可單獨來測試的file，區分這兩種情況。
- [ ] list
- `action, *args = sys.argv[1:]` argv[1:] slicing from index 1, destructure as action & args, *args package as rest 像是 js ...rest
- `it[1] for it in cmds if it[0] == action` Comprehension
  - List Comprehension: `[expression for item in iterable (if condition)]`
  - Set & Dictionary Comprehension: `{letter for letter in titles if letter == "e"}`
  - Generator Expression: `(number * 2 for number in range(10))`
  - generator 相當於 iterator，不是取得整個list，必須用迴圈存取，具有延遲性，所以非常適合龐大的資料集合，減少記憶體消耗
  - next 第一個參數是generator，第二個參數可以帶入找不到的預設值 None，利用這個特性實現 js `.find`，若直接在找不到會 Error out of range
  - 相當於 `next(iter([it[1] for it in cmds if it[0] == action]), None)`
- `("get_ppe", get_ppe)` Tuple
- `print(f"{cmd[0]}:\t{str(inspect.signature(cmd[1]))}")` f"{variable}" 相當於 `${varianble}`
- `len()` 類似這種的global function，是會呼叫該物件的 len method，所以只要物件有就call得到
    ```python
    import sys
    import os
    import secrets
    ```
- standard library function : secrets.token_urlsafe(), math.sqrt() datetime.datetime.now() ，需要 import
- built-in function : input, len, next, print
- array & list 差別
- array 只能放一樣型態的element
    - array 看作是矩陣，array*4 = 每個元素*4，array+array = 各index element相加
- default value
    - iter: next(generator, None)
    - dictionary: dic.get(key, None)
    - function: func ( a = None )
- lambda function:
    ```python
    lambda a, b: a + b
    (lambda a, b: a + b)(1 , 2) // IIFE
    
    list(filter(lambda x: x > 0 , [ ] )) // filter
    list(map(lambda x: x * 2 , [ ] )) // map
    // 也有reduce，但要引用 functool
    ```
- Context clean up
    ```python
    with open(f"{service}.{version}.json", "r") as f:
    
    // 相當於
    try {
        f = open(f"{service}.{version}.json", "r");
    } finally {
        f.close()
    }
    ```
  - `with as f:` 當區塊內有需要close時，會進行close
- `is` 是same object,  `==` 是 equivalent
  - Left == right, 底層會去找left 有無實作 special method ，將right 丟進該method，所以能不能不同型別，或是會不會exception 完全取決於 left.special method
  - None 通常都是用 `is None`
- unpackaging:
  ```python
  a, b, *rest = list;
  a, b, *rest = tuple;
  
  for tuple in enumerate(list):
     print tuple; // index & value
  for tuple in dictionary.items():
     print tuple; // key & value
  
  a, b = b, a; // swipe
  combined = [*arr1, *arr2, *arr3]; // list
  combined = [**dic1, **dic2] // dictionary 注意是 **
  ``` 
