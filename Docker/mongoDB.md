

RUN container
```
docker run --name test-mongo -p 27017:27017 -d mongo
```
  
連線  
https://github.com/U1320100568/note/blob/master/Mongo/Connection.md



連線後，可執行以下：  
  
> help            # 檢視和 shell 有關的指令  
> db.help()          # 檢視和 db 有關的指令  
> db.[collection].help()   # 檢視和 collections 有關的指令  
