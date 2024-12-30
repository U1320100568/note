### Vue
- 多個 Ref 且依照 Id 產生多個 list
  - `:ref="``columnsErrorList-${dataError.dataErrorListId}``"`
  - `this.$refs[``columnsErrorList-${dataErrorListId}``].find(x => x.cells[1].innerHTML === columnName);`
--- 

### [Object.assign Polyfill](https://stackoverflow.com/questions/41144939/what-to-use-instead-of-object-assign-in-typescript)
```javascript
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var map1 = { "key1": "value1", "key2": "value2" };
var map2 = { "key3": ["value3a", "value3b"] };
var combinedMap = __assign({}, map1, map2);
```
---
### [.NET 資料傳到Vue component](https://stu.ratcliffe.io/2017/07/23/integrating-vuejs-with-aspnet-core-mvc)
---

### 資料量太多的搜尋、分頁、全選 in Vue
```HTML
<input v-model="searchStr" v-on:keydown.enter.prevent="撈資料" />
<button  v-on:click.prevent="撈資料">
 <i class="fa fa-search"></i>
</button>

<li v-if="頁數 !== 1">
 <a href="#" aria-label="Previous" v-on:click.prevent="頁數--">
  <span aria-hidden="true">&laquo;</span>
 </a>
</li>
<li v-if="頁數-1 > 1"><span aria-hidden="true">&hellip;</span></li>
<li v-if="頁數-1 >= 1"><a href="#" v-on:click.prevent="頁數--">{{頁數-1}}</a></li>
<li class="active"><a href="#" disabled>{{頁數}}</a></li>
<li v-if="頁數+1 <= 頁數"><a href="#" v-on:click.prevent="頁數++">{{頁數+1}}</a></li>
<li v-if="頁數+1 < 全部頁數"><span aria-hidden="true">&hellip;</span></li>
<li v-if="頁數!== 頁數">
 <a href="#" aria-label="Next" v-on:click.prevent="頁數++">
  <span aria-hidden="true">&raquo;</span>
 </a>
</li>
<li class="to">至 <input type="number" v-on:change="setPage" @keydown.enter.prevent="setPage"  style="width:80px" /> 頁</li>

<tr>
 <th><input  type="checkbox" v-model="SelectAllPresent" />呈現的全選</th>
</tr>
<tr v-for="item in list">
 <td><input type="checkbox" :value="Id" v-model="CheckedPresent" v-on:click="checkIntoChecked(Id)" />item</td>
</tr>
```

```Javascript
setPage(event) {
            if (event && event.target) {
                let value = parseInt(event.target.value, 10);
                if (value && value > 0 && value <= this.TotalPage) {
                    this.Page = value;
                } else if (value > this.TotalPage) {
                    this.Page = this.TotalPage;
                    event.target.value = this.TotalPage;
                } else {
                    this.Page = 1;
                    event.target.value = 1;
                }
            }
        },   //ps. watch Page 有更動就撈資料
TotalPage: {
            get: function () {
                if (this.TotalCount !== 0) {
                    return Math.ceil(this.TotalCount / 10.0);
                }
                return 1;
            }
        }
checkIntoChecked: function (value) {
            var that = this;
            var index = that.Checked.indexOf(value);//Id
            if (index === -1) {
                that.Checked.push(value);
            } else {
                that.Checked.splice(index, 1);
            }
CheckedPresent: {
            get: function () {
                var that = this;
                if (that.SelectAll) {  //若是全選狀態，呈現沒被選到的才是被選到的，要傳去後端的
                    return that.List.filter(function (error) {
                        var existed = that.Checked.indexOf(Id) != -1
                        if (existed) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                        .map((error) => (error.Id));
                } else {    //若不是全選狀態就正常顯示
                    return that.Checked
                }
            },
            set: function () { }
        },
SelectAllPresent: {
            get: function () {
                if (this.Checked.length === 0 && this.SelectAll) {
                    return true;
                }
                return false;
            },
            set: function (value) {
                this.SelectAll = value;
                this.Checked = [];
            }
        },
```
---
### 可增加移除多個select，但選項不能重複 in Vue
```html
//option list 增加isSelect欄位
<div  v-for="item in fileSehemaTransformUnitList">
 <select v-model="item.FileSchemaColumnId" @@change="onChange">
  <option value="-1">請選擇欄位</option>
  <option v-for="column in getRestColumns(item.FileSchemaColumnId)" :value="column.FileschemaColumnId">{{column.ColumnEName}}</option>
 </select>
 <button v-on:click.prevent="removeTransformUnit(item.FileSchemaColumnId, item.TransformUnitId); onChange();"> </button>
</div>
<button v-on:click.prevent="addTransformUnit">        </button>
```

```javascript
//更動選項，將更欄位的isSelect重置(選了選項、刪除)
onChange() {
 let seleted = this.fileSehemaTransformUnitList.map(x => x.FileSchemaColumnId);
 this.fileSchemaColumnList = this.fileSchemaColumnList.map(x => {
  if (seleted.indexOf(x.FileschemaColumnId) === -1) {
   x.IsSelected = false;
  } else {
   x.IsSelected = true;
  }
  return x;
 })
},
//取得沒被選的欄位
getRestColumns(id) {
 return this.fileSchemaColumnList.filter(x => !x.IsSelected || x.FileschemaColumnId === id);
 //包含那個select選到的
},
addTransformUnit() {
 var that = this;
 if (!that.checkTransformUnit()) {
  swal('請選擇欄位後，才能新增')
  return
 };
 that.fileSehemaTransformUnitList.push({ FileSchemaColumnId: -1, TransformUnitId: 21 });
},
removeTransformUnit(idA, idB) {
 var that = this;
 that.fileSehemaTransformUnitList = that.fileSehemaTransformUnitList
  .filter(x => !(x.FileSchemaColumnId === idA && x.TransformUnitId === idB));
},
```
---
### .net MVC download 下載 loader #busy #waiting #loading
1. [Jquery File Download 套件](https://stackoverflow.com/a/24548671)
2. [前端設定timer 抓 cookie，後端action結束前 寫上cookie](https://www.codeproject.com/Articles/1095434/Show-an-animation-while-waiting-for-a-download-to)
3. [ajax 到後端把資料存到server端，在reload到下載檔案的另一隻action](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/252797/)
---
### API return custom error  
- 自定義錯誤訊息
  ```C
  //兩種功能相同
  Response.StatusCode = (int)HttpStatusCode.BadRequest;
  Response.StatusDescription = ex.Message;
  
  return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
  ```
  - **注意** http header不能用UTF-8編碼
  - 所以要傳中文改寫status text會產生亂碼，必須[先編碼在解碼](http://lihung00.blogspot.com/2017/07/httppost-server.html)
  - 後端編碼：`Response.StatusDescription = Uri.EscapeDataString("自訂錯誤");`
  - 前端解碼：`console.log(decodeURIComponent(errorThrown));`
- 方法二：直接寫在 response body裡
  - [回傳json](https://stackoverflow.com/a/26605587)
  - [回傳content](https://blog.darkthread.net/blog/aspnetmvc-return-http-400-with-result/)
  - 後端：
  ```C
  //
  Response.StatusCode = (int)HttpStatusCode.BadRequest;  //400
  return Json("找不到條件", System.Net.Mime.MediaTypeNames.Text.Plain);
  //或 這樣效果一樣
  Response.StatusCode = (int)HttpStatusCode.BadRequest;
  Response.TrySkipIisCustomErrors = true;
  return Content("定義參考關聯尚未設定，請先去做設定", "application/json");
  ```
  - 前端：`console.log(jqXHR.responseText);`
---
### 在store procedure跑很快，Application卻很慢
- 因為Parameter sniffing導致查詢計畫不一樣，症狀會有兩種query ARITHABORT 設定不一樣(不懂)，會造成cache plan不一樣，效能落差也很大，所以使用RECOMPILE 來清空cache。
- [Stored Procedure running slow in ADO.NET](https://social.msdn.microsoft.com/Forums/sqlserver/en-US/6e5353b9-4837-4022-a535-5408ed6f852a/stored-procedure-running-slow-in-adonet?forum=sqldataaccess)
- [SET ARITHABORT ON](https://dba.stackexchange.com/questions/9840/why-would-set-arithabort-on-dramatically-speed-up-a-query)
- RECOMPILE  不一定好，[視情況有不同方案](https://retrydb.blogspot.com/2017/07/sql-server-parameter-sniffing_28.html)。
---
### Http get ajax 不能傳太複雜的object
```javascript
var objecta : 
{ 
  a: 1,
  list:[2,3,4]
}
$.ajax({
url : ...,
data : {
   object1 : objecta,
   object2 : 1
},
type : 'get' ,...
})
```
```C#
[HttpGet]
public Action(classA object1, int object2){ // server side
}
```
- 此情況 object1 底下的東西傳不過去，因為太多層
- method:
  1. 前端資料攤平` data: { ...objecta, object2 : 1} `(classA 裡面的屬性名稱要對應到)
  2. 使用post or put


---

### C# Connection String
- Web.confing `<configuration>` 裡面
  - database first 自動產生 /  window驗證
  ```C
  <connectionStrings>
      <add name="IntelligenceCloudEntities" connectionString="metadata=res://*/Models.MemberModel.csdl|res://*/Models.MemberModel.ssdl|res://*/Models.MemberModel.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=ROY-LENOVO13;initial catalog=IntelligenceCloud;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />
  </connectionStrings>
  ```
- code first 手動填入 /  windows驗證
  ```C
  <connectionStrings>
      <add name="DefaultConnection" providerName="System.Data.SqlClient" connectionString="Data Source=ROY-LENOVO13;Initial Catalog=aspnet-Information;Integrated Security=True;MultipleActiveResultSets=True" />
  </connectionStrings>
  ```
- 也可以 另外創建一個  Connection.config 檔案
  - `<connectionStrings configSource="Connections.config"></connectionStrings>`
  - code first 手動填入 /  帳號密碼登入
  ```C
  <connectionStrings>
   <add name="CcdpContext" connectionString="Data Source=某IP;Initial Catalog=CCDP;Persist Security Info=True;User ID=帳號;Password=密碼" providerName="System.Data.SqlClient"/>
  </connectionStrings>
  ```
- 帳密登入 / 和windows 驗證  差別
  ```
  User ID=帳號;Password=密碼;
  Integrated Security=True;
  ```
  - 或者`Integrated Security=SSPI;`
--- 
### ADO.net
```C
string checkStr = "SELECT COL_LENGTH(@TableName,'CensusNo') AS 'Length'";
SqlConnection conn = (SqlConnection)_CcdpContext.Database.Connection;
using (SqlDataAdapter da = new SqlDataAdapter(checkStr.ToString(), conn))
{
  da.SelectCommand.Parameters.AddWithValue("@TableName", TableName);
  da.Fill(DataTable);
}
```
- 防止被檢測出sql injection
  ```C
  //執行sql command
  var sb = new StringBuilder($"");
  SqlConnection cn = (SqlConnection)_CcdpContext.Database.Connection;
  if (cn.State != ConnectionState.Open)
      cn.Open();
  using (SqlCommand cmd = new SqlCommand(sb.ToString(), cn))
  {
    cmd.ExecuteNonQuery();
  }
  cn.Close();
  ```
---
### SQL Performance
[IN vs. JOIN vs. EXISTS](https://explainextended.com/2009/06/16/in-vs-join-vs-exists/)
---
   
### Scss
- [前端純CSS切版體會+技巧雜筆](https://noootown.wordpress.com/2016/01/29/css-scss-tips/)
- [使用scss來加速寫css吧!](http://blog.visioncan.com/2011/sass-scss-your-css/)
- [scss文章](https://blog.user.today/scss/)
---
### Scroll bar
- [把scrolbar 消失](https://stackoverflow.com/a/16671476)
- [改變樣式](https://noootown.wordpress.com/2016/01/23/css-custom-scrollbar/) (margin 稍微改一下 )
### Background
- https://gratisography.com/
- [Perfect Full Page Background](https://css-tricks.com/perfect-full-page-background-image/)
  ```css
  background: url(asset/bg.jpg) no-repeat center center fixed;
  background-size: cover;
  ```
---
### Checkbox & Radio
```css
input[type="checkbox"]{
   margin: -2px 10px 0 0 ;
    vertical-align: middle;
    -webkit-appearance: none;
    border: 1px solid #cacece;
    padding : 9px;
    border-radius:4px;
    display:inline-block;
    position:relative;
    outline:none;
}

input[type="checkbox"]:checked:after{
  content: '\02143';
  font-size:16px;
  position:absolute;
  top:-2px;
  left:5px;
  color:#000000;
  transform:rotate(45deg)
}

input[type="radio"]{
 margin: -2px 10px 0 0 ;
    vertical-align: middle;
    -webkit-appearance: none;
    border: 1px solid #cacece;
    padding : 9px;
    border-radius:50px;
    display:inline-block;
    position:relative;
    outline:none;
}

input[type="radio"]:checked:after{
  content: '\02022';
  font-size:38px;
  position:absolute;
  line-height:18px;
  top:0px;
  left:2.5px;
  color:#000000;
}
```
- [Character Entities](http://www.madore.org/~david/computers/unicode/htmlent.html)
- [costum checkbox radio](http://www.tipue.com/blog/radio-checkbox/)
---
### 置中之一：[Absolute 50 Percentage](https://stackoverflow.com/a/40530404)
```CSS
position: absolute;
left: 50%; //置到容器中心(但是從中心為起始點，未真正置中)
top: 50%;
transform: translate(-50%, -50%);//減掉元素的50%高度，才是真正置中
```
---
### z-index vs translateZ
- translate會建立新的stacking context
- 所以視覺上[translate會疊在上方](https://segmentfault.com/q/1010000002480824)
- 兩者渲染在不同的Z結構 rendering plane
- 若同時使用，且想要控制由哪種渲染方式
- 可附加：
  ```CSS
  //transform-style : preserve-3d; //以3 dimensional rendering plane結構
  //transform-style: flat; //攤平
  ```
- [範例](https://codepen.io/hugosocie/pen/NAOGxq)
---
### Fixed Table Head
- [精簡版]( https://stackoverflow.com/a/39750473)
- [綜合版(包含純CSS, js)](https://stackoverflow.com/a/17380697)
- ps.  以上不能自訂th文字，過常會跑版
```HTML
<div class="scroll">
 <table class="center text-center ">
  <thead>
   <tr>
    <th><div class="fixed" data-content="column1">column1</div></th>
    <th><div class="fixed" data-content="column2">column2</div></th>
   </tr>
  </thead>
  <tbody >
   <tr >
    <td>A{{i}}</td>
    <td>B{{i}}</td>
   </tr>
  </tbody>
 </table>
</div>
```
```CSS
.scroll {
	height: 100px;
	overflow-y: scroll;
	overflow-x: hidden;
	margin-top:16px;
}

.scroll th .fixed{
	visibility: hidden;
}

.scroll th .fixed::before{
	content:attr(data-content) ;
	position:absolute;
	margin-top: -13px;
	background: #e2e2e2;
	padding:5px 0px;
	visibility: visible;
}
```
  
### Web Api Service / RESTful
- http://blog.darkthread.net/post-2012-03-22-restful-websvc-on-aspnet35.aspx
- https://blog.kkbruce.net/2012/03/aspnet-web-api-1.html#.Wz3hzNIzY2w
- https://dotblogs.com.tw/gelis/archive/2012/02/18/69602.aspx
- https://blog.toright.com/posts/5523/restful-api-%E8%A8%AD%E8%A8%88%E6%BA%96%E5%89%87%E8%88%87%E5%AF%A6%E5%8B%99%E7%B6%93%E9%A9%97.html
- 目前專案有用到的：
  - 使用Http傳遞方法：Get、Post、Put、Delete 
  - (可用不同的參數區別同樣的方法，例如Get() 回傳一個列表, Get(id) 回傳一筆資料)
  - 在Action前面加方法tag，和Route tag
  - Response網頁狀態通知 client

- _.Net Mvc Api範本_ 和 _目前專案_ 不同之處
  - MapHttpRoute增加路由設定
  - controller繼承ApiController
  - 回傳**資料型態**為物件或是string，client直接用 json 、xml 接，不是ActtionResult
- 控制API回傳訊息
  ```C
  // 控制status 錯誤訊息
  Response.StatusCode = 400;
  Response.TrySkipIisCustomErrors = true;
  return Content("請正確輸入格式", "application/json");
  ```
  ```C
  //回傳 status 400 和一大堆html
  return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "BadRequest");
  ```
---
### 反轉控制 / 依賴注入
- https://notfalse.net/3/ioc-di
---
### Internet Information Service
- 設定：應用程式 > 程式和功能 > 開起或關閉Windows功能 > IIS功能開啟(可不用全開，但是我全開)
  - 搜尋"IIS" 呼叫IIS管理員  
  - 新增站台 >站台名稱隨便設定 > 實體路徑指向專案的資料夾
  - 繫結 > 連接埠> localhost預設沒輸入是80 ，可改成這個當作首頁，不然就隨便輸入
  
注意：  
1. 權限開放問題：指向的資料夾另外放在一個直接在C:/底下的，權限；安全性 > 進階 >繼承C:/，底下的資料夾都是 (一直遇到組態錯誤)
2. 若專案資料夾沒有預設首頁，會一直跑出錯誤 403.14 - Forbidden，可設定index.html 或是 開啟> 功能檢視 > 瀏覽目錄> 啟用
---
### Vue.js
- [Scrimba上面的課程](https://scrimba.com/playlist/pXKqta)
- [官方教學](https://cn.vuejs.org/v2/guide/index.html)
---
### [Parallel Foreach](https://dotblogs.com.tw/asdtey/2010/05/08/parallelforforeach)
- 一般for cpu 會有所保留，不會超爆
- parallel for 可以衝到100%，多執行緒的概念?
- [Parallax視差滾動](https://keithclark.co.uk/articles/pure-css-parallax-websites/)
- https://keithclark.co.uk/articles/practical-css-parallax/
