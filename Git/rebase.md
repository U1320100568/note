### rebase
- git checkout `to target branch`
- git rebase master
- if conflict
  - resolve conflict
  - add change file
  - git commit 
- git rebase --continue
- if error 
  - git rebase --abort

### fix conflict
- manual fix
- auto apply > git checkout (--ours, --theirs) (. or specify file) 
