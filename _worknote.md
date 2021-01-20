### 2021 01 20
- a js application  
**step 1. build**  
Build webpack  
**step 2. copy**  
Copy file to public  
**step 3. serve**  
https-server public  
  
`nodemon` thirdparty to develop watchfile change
- 如何用pure js 實作 global state 更新觸發re-render?   
用 state manager 管理state提供subscribe 供各comp 傳入render function，  
提供manipulate state function (add, delete) 裡面會觸發notify，  
Notify 執行所有的subscribe。  

### 2021 01 13
- react scroll to invalid input
  - forwardRef((props, ref) => ) 可以不用手動binding Ref
  - useRef( ).current; 可以不用一直取 current
  - getBoundClientRect() DOM api，取得element的位置，相對於viewport
  - scrollBy({ top: x, ...}) window api，相對滑動位置
  
- vscode shortcut
  - ctrl + shift + 左右：選取目前的scope
  - alt + 左右：游標快速移動至下一個word 位置
  
- react native debugger 可以看到 Network api 
  
### 2021 01 04
- iframe resizer
- github project(archive)
- skeleton 骨架
- gatsby sourcing 

- custom hook
當component需要複雜的邏輯，且會和其他component共用，此時很適合refactor 成 custom hook。
- db cluster
- Semantic element 語意化 元件
