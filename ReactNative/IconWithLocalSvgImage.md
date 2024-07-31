- npm install react-native-svg@15.3.0  
  (ps. 15.4.0 android build error)
- npm install --save-dev react-native-svg-transformer
  https://www.npmjs.com/package/react-native-svg-transformer
- edit metro.config.js (react-native-svg-transformer)
  ```js
  const {getDefaultConfig} = require('metro-config');
  ...
  module.exports = (async () => {
    const {
      resolver: {sourceExts, assetExts},
    } = await getDefaultConfig();
  
    return {
        babelTransformerPath: require.resolve(
        'react-native-svg-transformer/react-native',
        ),
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    };
  })();
  
  ```
  (ps. only for react-native v0.59 ~ v0.71)
- create .svgrrc (react-native-svg-transformer)
  ```json
  {
    "replaceAttrValues": {
      "#000": "{props.fill}"
    }
  }
  ```
  (ps. after edit, need to restart packager `npm run start -- --reset-cache`)
