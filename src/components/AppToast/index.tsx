// App.jsx
import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';
/*
  1. Create the config
*/
export const toastConfig = {
  tomatoSuccess: ({text1}) => (
    <View style={styles.container}>
      <Text style={styles.textOne}>{text1}</Text>
    </View>
  ),
  tomatoError: ({text1}) => (
    <View style={styles.container}>
      <Text style={styles.textError}>{text1}</Text>
    </View>
  ),
};
