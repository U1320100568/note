### rebase
1. git checkout `to target branch`
2. git rebase master
3. if conflict
  1. resolve conflict
  2. add change file
  3. git commit 
4. git rebase --continue
5. if error 
  - git rebase --abort

### fix conflict
- manual fix
- auto apply > git checkout (--ours, --theirs) (. or specify file) 
