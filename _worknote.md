### 2024 06 26
- [react-native] react-navigation navigate to **other nested stack** and back to screen of other stack, add `initial: false`
- stackNested1 > (navigate) stackNested3 > (goback) stackNested2
```
|-- stackA
|   |-- stackNested1  
└-- stackB  
    |-- stackNested2  
    └-- stackNested3
```
```
// navigate
navigation.navigate('stackB', {screen: 'stackNested3'}) // go back will be stackNested1
navigation.navigate('stackB', {screen: 'stackNested3', initial: false}) // go back will be stackNested2
```


### 2024 05 08
- react native upgrade from 6x to 71
  - vision camera upgrade v3
  - [error] android release build will cache previous js bundle, it could release stg to prod env. To fix it, **`./gradlew clean` everytime before release step**.
  - [native error] `Error while updating property 'accessibilityState' of a view managed by: RCTView` Touchable or Button's disable property **must put `true` or `false` only** , issue [https://github.com/facebook/react-native/issues/35119.](https://github.com/facebook/react-native/issues/35119)
