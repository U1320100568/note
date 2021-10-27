> 如果我要 pull request 別人的 library，那我可能要 snyc 別人的 code，別人有更新，我這邊也要跟上。  
> 或者，如果我有一個template repository，要這個repo多個project，如果template有更新也要可以拉到最新的。  
> 手動貼 patch 太費工，  
> 此時就可以用Fork。  

# Fork
- 在別人的account的repository點Fork
- `git clone`
- `cat .git/config` or `git remote -v` 可看一下現在的 git remote 有哪些，此時可以看到沒有別人的repository
- `git remote add upstream https://github.com/xxx/xxx.git` 新增原本別人的repo
- `git fetch --all` + `cat .git/config` or `git remote -v` 可以看到已經連動到別人的repo `upstream/xxx`
- 也可以看到 `git branch -r`
- contribute 一般會開在另一個 origin.branch 上避免 origin.main 髒掉 `git checkout -b feature1`
- 之後只要`git pull upstream/origin` or `git checkout upstream/origin && git pull && git checkout feature1 && git merge upstream/origin` 就可同步到最新的code


# Manual Fork
> github 不允許一個 account 有多個 fork，
> 只要是 file diff 就一定是 conflict，除非他們有 common commit point，開 template 時沒有 common history，和複製專案砍掉git folder一樣。
-  一開出來時，直接加一個 remote (ex, template url)，然後 merge 下來(下一行)，這時候就有 common entry 了（因為一開出來所以 code 一定一樣，以後merge不會嚴重conflict）
-  `git merge -X theirs template/master --allow-unrelated-histories`
-  如果沒有一開始就merge，可以checkout 到最初的commit，merge upstream ，在checkout 最新 merge 
