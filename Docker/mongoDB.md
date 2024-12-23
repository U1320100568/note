
進入後，可執行以下：  
  
> help            # 檢視和 shell 有關的指令
> db.help()          # 檢視和 db 有關的指令
> db.[collection].help()   # 檢視和 collections 有關的指令

RUN
```
docker run --name some-mongo -d mongo:tag
```

### Compass with connection string 
一開始建立時，預設可隨意登入
```
mongodb://localhost:27017
```

### Bash in Terminal
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

### connect in nodejs
[example](https://github.com/U1320100568/note/blob/master/Mongo/Nodejs_connection.md)
