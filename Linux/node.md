
# install node & npm via nvm 
[reference](https://bobbyhadz.com/blog/nvm-command-not-found)
1. install nvm by github source
```
### 👇️ using curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
他會自動clones the nvm repository to ~/.nvm，然後加環境變數 add 2 lines of code to the correct profile (~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc) 

2. sourcing
```
### 詢問現在系統的 shell, ex. zsh or bash
echo $0
```
```
### if bash shell
source ~/.bashrc 
```
或者重開 terminal

2. 檢查有無完成 

```
### 檢查有無安裝成功
command -v nvm
```
```
nvm --version
```

3. 安裝node
```
nvm install 7
nvm install 7.10.0
```

4. 檢查node & npm 
```
node --version 
npm --version
```
