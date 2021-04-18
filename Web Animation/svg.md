### import svg

1. sourcing the file
```
<img src="/images/xx.svg"/> 
```
2. import file into data uri format 
```
import icon from "../images/xx.svg";
...
<img src={icon}/>
```
> both of above method **CANNOT** control css on it
  
3. copy svg code into html/jsx code
```html
<div>
  <svg path="..."></svg>
</div>
```
4. import svg as react component
precondition: use cli `create-react-app`
```
import { ReactComponent as Icon } from "../images/xx.svg";
...
<Icon storke="#000"/>
```

5. gatsby need plugin `gatsby-plugin-react-svg`  
it not work to importing as component directly. add plugin to resolve it.  
*gatsby-config.js*
```js
{
  resolve: 'gatsby-plugin-react-svg',
  options: {
    rule: {
      include: /assets/,  //caution: regex match the svg in assets folder
    }
  }
}
```

```
import Icon from "../images/xx.svg";
...
<Icon storke="#000"/>
```

## method 3,4,5 CAN control css on svg tags
use wrapper styled-component
```
#line {
  fill: #000;
}
```
