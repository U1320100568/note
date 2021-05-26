
# Function  High Order Component
> like LoginRequired Component...
  
[reference](https://stackoverflow.com/a/64178585/13797221)

### practice 
https://codesandbox.io/s/functional-hoc-6u14r?file=/src/App.js

```js
export default function HOC(Comp) {
  const [note] = useState("123");

  return (props) => (
    <div style={{ backgroundColor: "red" }}>
      <Comp {...props} note={note} />
    </div>
  );
}
```
### ERROR
`Invalid hook call. Hooks can only be called inside of the body of a function component.`


## 需要 2 function
### 1. normal component
Do something, it's component, not HOC
```js
function HOC({ children, ...props }) {
  const [user] = useState("123");
  // ex. or login action hook

  if (!user) {
    return "not login";
  }

  return children;
}

```
### 2. high order component
do NOTHING, wrap children and fake HOC
```js
export default function withHOC(Comp) {
  return (props) => (
    <HOC>
      <Comp {...props} />
    </HOC>
  );
}
```
