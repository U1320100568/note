# Install npm & node 
from NodeSource  
https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/  
1. `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`
注意: 12.x 版本會關係到node 安裝會是12.x 版本  
2. `sudo apt install nodejs` 
3. `node --version` 檢查
4. `npm --version` 檢查


### 清除已安裝檔案
```
sudo apt remove --purge nodejs npm
sudo apt clean
sudo apt autoclean
sudo apt install -f
sudo apt autoremove
```

### completely uninstall npm & node on windows
> 若沒有解除安裝，會遇到安裝node 完成，npm 怎樣也無法安裝。  
  
https://stackoverflow.com/a/20711410
1. Run npm cache clean --force
2. Uninstall from Programs & Features with the uninstaller.
3. Reboot (or you probably can get away with killing all node-related processes from Task Manager).
4. Look for these folders and remove them (and their contents) if any still exist. Depending on the version you installed, UAC settings, and CPU architecture, these may or may not exist:
```
C:\Program Files (x86)\Nodejs
C:\Program Files\Nodejs
C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)
C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)
C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)
C:\Users\{User}\AppData\Local\Temp\npm-*
```
5. Check your %PATH% environment variable to ensure no references to Nodejs or npm exist.
6. If it's still not uninstalled, type where node at the command prompt and you'll see where it resides -- delete that (and probably the parent directory) too.
7. Reboot, for good measure.
