## In Local
1. download the restore file : Mongodb > Backup Snapshot / download
2. 如果要將cloud 的 backup用local的mongodb 跑起來
   1. 下載backup file 並解壓縮
   2. 用docker 跑起來 run -it -p 27017:27017 -v ~/Downloads/restore-62bcf3f6c497023990928081:/data/db --name=smbbackup mongo
   3. 用compass 連進去 mongodb://localhost:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false
