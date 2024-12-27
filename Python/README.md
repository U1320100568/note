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
- [] list
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

