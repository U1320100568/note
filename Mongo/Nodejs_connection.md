# NodeJS express connection

### DB 盡量使用相同connection，並且在離開app時關閉連線
> Database connections are resource-intensive and should be established as few times as possible and shared as much as possible.
>
  
or use the mongoose module for managing  
  
### Express 
- app.get: 針對每一個route處理
- app.use: middleware before arrive route

### Example
```js
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let shutting_down = false;

async function query() {
    const db = client.db("test");
    const collection = db.collection("product");
    return await collection.find({}).limit(50).toArray();
}
async function queryOne(id) {
    const db = client.db("test");
    const collection = db.collection("product");
    return await collection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
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

const server = app.listen("5001", () => console.log("listening 5001"));

const cleanup = () => {
  shutting_down = true;
  server.close(() => {
    client.close();
    process.exit();
  });
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
```