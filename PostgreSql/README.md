# 啟動 PostgresSQL
### 1. Via homebrew
```bash
# start
brew services start postgresql

# stop 
brew services stop postgresql

# restart
brew services restart postgresql

# start pqsl console
psql
```

### 2. Via docker 
https://github.com/U1320100568/note/blob/master/Docker/postgreSql.md


# 連線
### 連線方式1：Connection via bash
```bash
docker exec -it test-postgres bash
```
`i` 維持input `t` 分配一個終端tty  
進入到bash會看到 command prompt 呈現 `root@2e64b5e8e343:/# `  
  
Connect to DB use user _postgres_  default Supervisor = _postgres_ 無密碼  
```bash
psql -U postgres
```
`-U` user   
進入DB會看到 command prompt 呈現 `postgres=# `  
此postgres是預設db _postgres_
可使用\du 查看此DB 有哪些user，一開始應該是只有 _postgres_ supervisor  
```
\du
```
  
建立user(共用則不需再建立)   
```sql
CREATE ROLE chris WITH LOGIN PASSWORD 'password';
ALTER ROLE chris CREATEDB;
```

### 連線方式2：GUI
psequel | vscode sql tools + driver(used)
-|-
<img src="https://psequel.com/screenshot3.png"/> | <img src="https://user-images.githubusercontent.com/971474/85234532-f18d4b00-b3db-11ea-8443-74340269f92c.png"/>
  
VSCODE SQL TOOLS  
https://www.rebellionrider.com/connect-postgresql-with-vs-code/  
- install postgres driver at vscode market
- create connect file (Connect using Server and Port) (password which is created container)

### 連線方式3：connection via node js 
```js
const express = require("express");
const { Client } = require("pg");

const app = express();
const client = new Client({
  user: "postgres",
  password: "123",
  database: "test",
});
let shutting_down = false;

async function query() {
    return await client.query("SELECT * FROM food;");
}
async function queryOne(name) {
    return await client.query(
      `SELECT * FROM food WHERE name = '${name}';`
    );
}

app.use("/", (req, res, next) => {
  if (!shutting_down) {
    return next();
  }

  res.setHeader("Connection", "close");
  res.send(503, "Server is closed");
});

app.get("/products", async (req, res) => {
  const resp = await query();
  res.send(resp);
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const resp = await queryOne(id);
  if (resp) {
    res.send(resp).status(200);
  } else {
    res.send("Not Found").status(404);
  }
});

const server = app.listen("5001", () => {
  client.connect();
});

const cleanup = () => {
  shutting_down = true;
  server.close(() => {
    client.end(); // close db
    process.exit();
  });
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
```


# SQL 語法
create DB:  
```sql
CREATE DATABASE db_name;
# 注意最後的分號 ; 重要
```
  
查看剛剛建立的DB
```
\l
```
  
切換DB
```
\c db_name
```
進入到新的DB test，會看到command prompt 呈現 `test-# `  
  
建立table  
```sql
CREATE TABLE food (
   name varchar(80),
   price int 
);
```

查看table  
```
\dt
```
  
INSERT   
```SQL
INSERT INTO food  
VALUES ('好吃豬肉', 2000);
```
注意：要用單引號 '
注意：可以直接換行，SQL判斷分號;才會停止


