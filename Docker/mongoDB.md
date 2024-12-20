
進入後，可執行以下：  
  
> help            # 檢視和 shell 有關的指令
> db.help()          # 檢視和 db 有關的指令
> db.[collection].help()   # 檢視和 collections 有關的指令

RUN
```
docker run --name some-mongo -d mongo:tag
```

### Get connection string
一開始建立時，預設可隨意登入
```
mongodb://localhost:27017
```

