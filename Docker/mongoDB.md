
進入後，可執行以下：  
  
> help            # 檢視和 shell 有關的指令
> db.help()          # 檢視和 db 有關的指令
> db.[collection].help()   # 檢視和 collections 有關的指令

RUN
```
docker run --name some-mongo -d mongo:tag
```

### 連線方式1：Connect via Compass with connection string 
一開始建立時，預設可隨意登入，可後續再建立user
```
mongodb://localhost:27017
```

### 連線方式2：Connect via bash
```bash
docker exec -it test-mongo mongosh
# in mongosh below
# switch db or create new db
use {db name}
# create collection
db.createCollection("{name}");
# insert
db.{collection}.insert({...})
# query
db.{collection}.find();
```

### 連線方式3：Connect via nodejs
[example](https://github.com/U1320100568/note/blob/master/Mongo/Nodejs_connection.md)
