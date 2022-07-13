> 想要跑一個 web application 一個 process 一直處在那兒

### check sessions
`tmux ls`

### kill session
`tmux kill-session -t 'name'`

### attach session
`tmux a -t 'name'`

### 進入 session 後，hotkey
- ctrl + b,d -- 斷連session
- ctrl + b,n -- 切換bash
- ctrl + b,c -- 創建bash
- ctrl + b,, -- 命名bash
- ctrl + b,& -- 關閉bash
- ctrl + b,% -- 垂直切割視窗
- ctrl + b," -- 水平切割視窗
- ctrl + b,o -- 切換視窗
- ctrl + b,x -- 關閉當前視窗
- ctrl + b,[ -- 使用滾輪
