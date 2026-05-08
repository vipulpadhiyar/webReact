import React from 'react';
import {Linking, View} from 'react-native';
import WebView from 'react-native-webview';

import {AppScreen} from '~/components';
import {translate} from '~/localization';

import {styles} from './styles';
import {usePrivacyPolicyController} from './usePrivacyPolicyController';

export const PrivacyPolicyScreen = () => {
  /* `usePrivacyPolicyController` hook. This allows you to directly use the `onBack` function in the
  component without having to reference it through the object every time. */
  const {htmlStr, onBack} = usePrivacyPolicyController();

  const webContent = `
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:ital@0;1&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Gentium Book Basic', serif;
          font-size: 40px;
        }
      </style>
    </head>
    <body>
       ${htmlStr}
    </body>
  </html>
`;
  // Prevent url clicks to open in web view
  const onShouldStartLoadWithRequest = (req: any) => {
    if (req === 'about:black') {
      return true;
    } else {
      Linking.openURL(req.url);
      return false;
    }
  };
  return (
    <AppScreen header={translate('PrivacyPolicy')} onBack={onBack}>
      <View style={styles.subContainer}>
        <View style={styles.webView}>
          <WebView
            source={{
              html: webContent,
            }}
            viewportContent={'width=device-width, user-scalable=1.0'}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          />
        </View>
      </View>
    </AppScreen>
  );
};
