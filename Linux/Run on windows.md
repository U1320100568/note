# Windows Subsystem for Linux

https://xenby.com/b/226-%E6%8E%A8%E8%96%A6-wsl-windows-subsystem-for-linux-%E5%AE%89%E8%A3%9D%E8%88%87%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8

# 啟用
1. 以管理員開啟power shell
2. 輸入 `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
3. 自動重開機
4. 去store安裝Ubuntu (例如Ubuntu 18.04 LTS)
5. 開啟輸入帳密

# 使用
- 在powershell 輸入 `wsl`
- 或在 powershell 輸入 `wsl [linux 指令]`
- 存取 window 檔案: 會在`/mnt/` 底下，可能包含c or d (槽)
     windows 的檔案系統會被 mount 在 /mnt/ 下，例如 D槽 就會是對應在 /mnt/d
- Ubuntu 安裝套件指令 `apt-get install [package-name]`
