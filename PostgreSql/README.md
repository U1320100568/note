### start
```
brew services start postgresql
```
### stop 
```
brew services stop postgresql
```

### restart
```
brew services restart postgresql
```

### start pqsl console
```
psql
```
- create ROLE
  ```sql
  CREATE ROLE chris WITH LOGIN PASSWORD 'password';
  ALTER ROLE chris CREATEDB;
  ```
  `\du` -> to checkout create successful  
  > 共用則不需再建立  
- create database
  ```sql
  CREATE DATABASE xxx
  ```
  `\l` -> to check create successful  
- enter db & check tables  
  `\c xxx` `\dt`


### GUI: 
psequel | vscode sql tools + driver(used)
-|-
<img src="https://psequel.com/screenshot3.png"/> | <img src="https://user-images.githubusercontent.com/971474/85234532-f18d4b00-b3db-11ea-8443-74340269f92c.png"/>


# node js connection
```
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
