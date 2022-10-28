# RUN & CMD in Dockerfile
https://stackoverflow.com/questions/37461868/difference-between-run-and-cmd-in-a-dockerfile   
RUN: 在build 的階段執行，可以塞很多RUN，run 完的狀態會給 container  
CMD: 是在 container 在執行的指令時候，只會執行最後一個CMD  

# Image tag 
https://www.timiguo.com/archives/223/   
作業系統版本 docker image  
- `ubuntu` 完整版 187MB
- `alpine` linux 輕量型ubuntu 5MB
- 其他如 `stretch`, `buster`, `jessie`, `slim`, `bullseye`
