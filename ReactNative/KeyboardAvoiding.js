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
