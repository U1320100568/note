# Docker

> 一種快速執行的虛擬機？  
> 特點1 解決環境問題(任何機器都可以有一樣的環境，就算沒有某種資料庫一樣可以使用)  
> 特點2 處理sclalibility  

### 1.  安裝DOCKER，並啟動
若沒有啟動輸入docker，會出現error `docker: command not found`
  
### 2.  下載EXIST BACKEND PROJECT
`git clone [a backend project]` 

### 3.  GENERATE DOCKER FILES
```bash
cd [project] && npm i
npm run config:cms-dev //產生一些docker file
```

### 4. CREATE DOCKER IMAGE
`docker build -t [maybe project name]`  
`-t` 表示這image name 可看做 tag  
此動作會根據DockerFile 產生 docker image，裡面可能包含server device info, some software installation, some script, listen which port, bash docker-start.sh，所以會耗一些時間  
  
>  通常docker project 都會有DockerFile   
  
`docker image ls` 完成後，可以看 image 是已建立  

if fail due to require one argument  
`docker build -t [image_name] .` add `.` after, means location here  
  
### 5. RUN DOCKER CONTAINER
`docker run --name [container name] -p 8000:8000 -d [image name]` 以一個docker image run 一個 docker container    
`--name` contianer 名稱  
`-d` image name  
`-p` docker port: 本機的port (注意：DockerFile裡的port 是 docker 裡面的 port)
  
`docker ps` `docker container ls`  可看現在有哪些docker container 再跑   
可以去 `localhost:8000` 就可以看到docker已經跑起來  

### 5.1 STOP CONTAINER
 `docker stop [container_name]`
  
### 6. BACKEND 環境設定
此時還有可能是錯誤的，因為backend環境還沒有設定好（例如資料庫沒有initial），所以要進入docker做setting  
 `docker exec -it [container name] /bin/bash`    
 將`/bin/bash`指令在container 執行？  
   
進入後container即可做backend設定，例如：`python3 ./manage.py makemigrations`  `python3 ./manage.py migrate`  
 
 
### 7. 移除 RUNNING CONTAINER
`docker container rm -f [container name]`

