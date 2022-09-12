## reference
https://dev.to/andrewbaisden/how-to-use-docker-in-your-node-and-react-applications-597e

## 1. get a gatsby project
ex. `gatsby new gatsby-test && cd gatsby-test`
## 2. create docker file
vi Dockerfile


## 產生一個docker image
```
# Build the image: docker build -t <image-name> <relative-path-to-dockerfile>
docker build -t client . 
```
nginx ?

## docker-compose
一次要跑多個 image
方便管理

