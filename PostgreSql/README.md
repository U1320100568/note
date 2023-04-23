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


### GUI: psequel
