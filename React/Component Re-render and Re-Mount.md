# Dirrent Algorithm
[React Reconciliation Doc](https://reactjs.org/docs/reconciliation.html)  

> react's diff algorithm   
> - state 改變re-render  
> - 比對有無改變內容，virtual dom 改變才要re-render  
> - 不同的element會直接 unmount 再 mount 新的 element  

1. 不同element.type，會產生不同tree  
   type: (built-in: `div`, `span` ... | or composit component: `<OrderTable/>`, `<Title/>`...)  
2. 不同key 也視為不同的element  


# 注意
> 觀念：**state 改變會造成re-render，但是不應該造成re-mount，re-mount 的 cost 大**  


# Nested Component 會造成 re-mount 
> parent re-render will trigger nested component re-mount  
  
當 NestedComp 也就是在某 Component裡面定義的 Component，每次render會產生視為不同的Component，也就產生不同Type的Element，會以Children 會一直被re-mount。  
[example](https://codesandbox.io/s/component-rerender-and-remount-yk3pg?file=/src/Parent.js) 可開啟inspector 看child有沒有re-mount  
  
```js
function Parent() {
  function NestedComp () {
    useEffect(() => {
      console.log("mount");
      return () => console.log("unmount)
    },[])
    return <div/>
  }
  
  return <NestedComp/>
}
```

### 影響
可能造成image都會重新mount，圖片一直閃  

### debug
寫 useEffect log mount and unmount，往上層追是哪個部分造成re-mount  
在 NestedComp print mount log 會很明顯感受到  
  
### 結論
> 寫成 render function 不會re-mount(原則上不要～)  
> 但是**最佳解**應該是把component提出去寫在外面（extract）  
