## reference
https://dev.to/andrewbaisden/how-to-use-docker-in-your-node-and-react-applications-597e

## 1. get a gatsby project
ex. `gatsby new gatsby-test && cd gatsby-test`

## 2. create docker file
`touch Dockerfile .dockerignore`  
  
_Dockerfile_
```
# Dockerfile
FROM node:14.18.2-bullseye-slim AS builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . . 
EXPOSE 9000
RUN ["npm", "run", "build"]

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "9000"]
```

_.dockerignore_
```
.cache/
node_modules
public/
```

## 產生一個docker image

```bash
# Build the image: docker build -t <image-name> <relative-path-to-dockerfile>
docker build -t gatsby-test .
```


```bash
# run a container
# --name + container_name
# -p port mapping
# -d = detach
# last argument = image_name
docker run --name gatsby-test -p 9000:9000 -d gatsby-test
```
nginx ?

## docker-compose
一次要跑多個 image  
方便管理  

## Caveats 注意項目
1. npm run build error   
[node version](https://github.com/lovell/sharp/issues/2875#issuecomment-940227974)
 for Apple M1
```
FROM node:14.18.2-bullseye-slim
```
2. port mapping not working  
serve default ip is localhost = 127.0.0.1, and must
[set container ip to 0.0.0.0](https://stackoverflow.com/questions/39525820/docker-port-forwarding-not-working)

