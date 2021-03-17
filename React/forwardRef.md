# React.forwardRef

### 實例
global modal or message，非帶入props 的open or message，將這些東西封裝，外部只需要call 此Component內部的function控制。  
React.forwardRef(Component)   
Modal Component 帶進 `(props, ref)`  注意第2參數是 `ref`  
Modal Component `ref.current = { 可供外部call的東西 } `: 在 useEffect 裡 assign  
外部 useRef 帶進ref={ref}，外部可以call ref 的 function  


```
import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
function AndroidPrompt(props, ref) {
  const [visible, setVisible] = React.useState(false);
  const [_visible, _setVisible] = React.useState(false);
  const [hint, setHint] = React.useState('');
  const animValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [_visible, animValue]);
  React.useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible,
        setHint,
      };
    }
  }, [ref]);
  const backdropAnimStyle = {
    opacity: animValue,
  };
  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]}
        />
        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <Text>{hint || 'Hello Modal!'}</Text>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => _setVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  prompt: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default React.forwardRef(AndroidPrompt);
```
