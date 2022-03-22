import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Constants from './Constants';
import {Platform, Linking, Alert} from 'react-native';

const AndroidSenderId = Constants.androidSenderId;
let deviceToken = null;

// called after reset to home and deeplinking on landing screen
function register({appActions}) {
  try {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function(tokenData) {
        try {
          console.log('TOKEN:', tokenData.token);
          deviceToken = tokenData.token;
          let resp = await appActions.setDeviceToken({
            token: deviceToken,
          });
          //await appActions.bindNotification({token: deviceToken});
          return;
        } catch (err) {
          console.warn('fail to registry device to remote', err);
          return;
        }
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: async function(notification) {
        console.log('NOTIFICATION:', notification);
        try {
          let url = '';
          // IOS {
          //   badge: undefined
          //   data:
          //   {
          //    aps: {alert: {…}}
          //    url: "com.revtel.sethtv://productDetail?id=1"
          //   }
          //   finish: ƒ finish(res)
          //   foreground: true
          //   id: undefined
          //   message: "456"
          //   soundName: undefined
          //   title: "測試"
          //   userInteraction: true
          // }

          // ANDROID {
          //   color: null
          //   data: {url: "com.revtel.sethtv://productDetail?id=1"}
          //   finish: ƒ finish()
          //   foreground: true
          //   id: "1079159961"
          //   message: "456"
          //   sound: null
          //   title: "測試"
          //   userInteraction: false
          // }

          // 1. we only handle for user explicity click the notification,
          // if app is in foreground, we show our own popup.
          // 2. the notification format is different according to Platform
          // so we need to handle for getting url for different Platform.
          if (Platform.OS === 'ios') {
            if (notification.foreground) {
              _triggerPopUp(notification);
            }
          } else {
            if (notification.foreground) {
              _triggerPopUp(notification);
            }
          }
          let {data} = notification;
          url = data.url;
          // otherwise we open url link
          await Linking.openURL(url);
        } catch (err) {
          console.warn('notification err', err);
        }

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: AndroidSenderId,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  } catch (err) {
    console.warn('fail to register device for push notification');
  }
}

function _triggerPopUp(notification) {
  // pop-up format: {
  //   title: 'notification-title',
  //   message: 'notification-message',
  //   url: '',
  //   data: {...}
  // }
  return;
  let popUpData = {
    title: '',
    message: '',
    url: '',
    data: {
      ...notification,
    },
  };
  try {
    if (Platform.OS === 'ios') {
      popUpData.title = notification.alert.title;
      popUpData.message = notification.alert.body;
      popUpData.url = notification.data.url;
    } else {
      popUpData.title = notification.title;
      popUpData.message = notification.message;
      popUpData.url = notification.url;
    }
    Alert.alert(popUpData.title, popUpData.message + popUpData.url);
  } catch (err) {
    //
  }
}

function getDeviceToken() {
  return deviceToken;
}

export default {register, getDeviceToken};
