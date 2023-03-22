### 2023 03 22
- Unresolved symbol error & Duplicated symbol error  
  
  Static library (build time resolve)  
  Dynamic library (run time resolve)  
  
  - Compile (like babel)  
  編譯成一個一個黨(OBJ)  
  - Link (like webpack)  
  把編譯完的的黨都打包起來   
  
  如果在link stage 發生在OBJ檔找不到某個symbol ，就會發生 unresolved symbol error  
  如果在link stage 發生兩個一樣symbol ，就會發生 duplicated symbol error  

  在Gatsby onWebpackConfig 導入node build-in library 就是類似 Link 的動作  

### 2023 03 09
- [js] console warn `mini-css-extract-plugin]Conflicting order ` > how to ignore? https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
- [js] console warn html attribute aria-* 不用寫成 camel case，如果寫成camel會有warning


### 2023 02 23
- [bash] find path --name "xxx" 這個檔名是 excatly 可以搭配 `*`
- [bash] grep -rn pattern path 
- [js] 金錢 formating `nunmber.toLocaleString('en-US', 'currency');`

### 2023 01 11
- markdown collapse
```md
<details>
  <summary>收合部分</summary>

  要隱藏的部分
</details>
```
