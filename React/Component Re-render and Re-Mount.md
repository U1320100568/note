[React Reconciliation Doc](https://reactjs.org/docs/reconciliation.html)

> react's diff algorithm  
> re-render 時為了效能，不需re-mount多餘的且不必要的 children。

1. 不同type的element，會產生不同tree  
   type: (built-in: `div`, `span` ... | or composit component: `<OrderTable/>`, `<Title/>`...)
2. 不同key 也視為不同的element


# Nested Component
> parent re-render will trigger nested component re-mount  
[example](https://codesandbox.io/s/component-rerender-and-remount-yk3pg?file=/src/Parent.js)
  
```js
function Parent() {
  function NestedComp () {
    return <div/>
  }
  
  return <NestedComp/>
}
```

### 影響
可能造成image都會重新mount

### debug
寫 useEffect log mount and unmount
  
### 結論
> 寫成 render function 不會re-mount  
> 但是**最佳解**應該是把component提出去寫在外面（extract）
