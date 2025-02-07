uvicorn 是 http server 
Fast api 是 python application 框架
Express 是 http server + application server 合併
Lambda 用來放application server
Api gateway 是http server deploy lambda 只需要啟動 application server
所以在開發時，需要啟動uvicorn 作為 http server

處理routing 可以在http server or application server，目前backend 選擇在 app server 處理
因為lambda有自己的protocal，為了銜接這段，所以可以看到uvicorn帶入 api:main.app，而lambda 是帶入 api.main.handler

### local run http server by uvicorn
```python
if __name__ == "__main__":
    uvicorn.run("api:main.app", host="0.0.0.0", port=8080, reload=True)
```

### python serverless handler
- events 代表 api gateway
```yml
functions:
  app:
    handler: api.main.handler
    events:
      - http:
          method: ANY
          path: /
      - http:
          method: ANY
          path: /{proxy+}
    warmup:
      default:
        enabled: true
```

### node express serverless handler
- local run http server `app.listen`
- put on lambda by appliaction server
```js
const serverless = require("serverless-http");
const {app} = require('./src/app');

if (process.env.RUN_IN_LOCAL) {
  app.listen(9000, '0.0.0.0', () => {
    console.log('server listens on port 9000');
  });
}

module.exports.handler = serverless(app);
```
