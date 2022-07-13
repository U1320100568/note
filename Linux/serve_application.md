### Enter release machine
1. ssh 登入 `ssh user@host`
2. enter password 

### Clone Project
1. download source code or git clone(skip 2, 3)
2. create release version on github and download zip
3. move zip to release machine
   - copy local zip file to remote `scp test.zip USER@HOST:~/workspaces/`
   - or download file on remote `curl -O https://xxxxx` (FAILURE! zip is broken!)
4. unzip `unzip xxxx.zip`

### Configuration
1. `npm install`
2. `npm run configxxx`
3. `npm run build`

### Serve
1. `npm run serve -- --host 0.0.0.0 ---port 9000`
2. create tmux session and serve
3. check success open browser xx.xx.xxx:9000
4. check which process occupy port `netstat -ntlp`, maybe add `sudo`
5. check docker container `docker ps` , maybe add `sudo`
