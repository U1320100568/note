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
  );
}
