import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

export default function KeyboardAvoiding(props) {
  return (
    <ScrollView
        contentContainerStyle={props.style}
        keyboardShouldPersistTaps="handled" //to dismiss keyboard
      >
    <KeyboardAvoidingView
      style={{flexGrow: 1}}
      {...Platform.select({
        ios: {behavior: 'position'},
        android: {behavior: 'height'},
      })}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}>
        {props.children}
    </KeyboardAvoidingView>
    </ScrollView>

    /* DKSH
    <KeyboardAvoidingView
              style={{flex: 1}}
              keyboardVerticalOffset={25}
              {...(Platform.OS === 'ios' ? {behavior: 'padding'} : {})}>
              <ScrollView contentContainerStyle={{padding: 10}}>
                <CmsForm
                  FieldComp={CmsInputField}
                  model={model}
                  instance={instance}
                  getFieldStyle={getFieldStyle}
                  // theme={InputThemes.DARK}
                >
                  {({values, resetValues, renderFields}) => (
                    <>
                      {renderFields()}
                      <Text style={{color: 'red', marginBottom: 5}}>
                        {error}
                      </Text>
                      */
  );
}

// TODO: try this code from Guy
const useKeyboardAvoid = ({scrollViewRef}) => {
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      RNTextInput.State.currentlyFocusedInput().measure(
        (x, y, width, height, pageX, pageY) => {
          scrollViewRef.current.scrollResponderScrollNativeHandleToKeyboard(
            RNTextInput.State.currentlyFocusedInput(),
            height,
            true,
          );
        },
      );
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {});
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [scrollViewRef]);
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  }

})


// guy's perfect version RN version after 64
const useKeyboardAvoiding = offset => {
  const ScrollViewRef = useRef(null);
  useEffect(() => {
    const DidShow = Keyboard.addListener('keyboardDidShow', e => {
      ScrollViewRef.current.scrollResponderScrollNativeHandleToKeyboard(
        TextInput.State.currentlyFocusedInput(),
        offset,
        false,
      );
      ScrollViewRef.current.getInnerViewRef().setNativeProps({
        paddingBottom: offset,
      });
    });
    const DidHide = Keyboard.addListener('keyboardDidHide', async e => {
      ScrollViewRef.current.scrollTo({y: 0});
      await delay(300);
      ScrollViewRef.current.getInnerViewRef().setNativeProps({
        paddingBottom: 0,
      });
    });
    return () => {
      DidShow.remove();
      DidHide.remove();
    };
  }, [offset]);
  return {
    ScrollViewRef,
  };
};
