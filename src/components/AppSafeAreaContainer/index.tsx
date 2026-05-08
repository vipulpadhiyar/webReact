import React, {memo} from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';

import {styles} from './styles';

interface AppSafeAreaContainerProps {
  children: React.JSX.Element | React.JSX.Element[];
  containerStyle?: ViewStyle[] | ViewStyle;
  testID?: string;
}

export const AppSafeAreaContainer = memo((props: AppSafeAreaContainerProps) => {
  const {children, containerStyle, testID} = props;

  return (
    <SafeAreaView testID={testID} style={[styles.container, containerStyle]}>
      {children}
    </SafeAreaView>
  );
});
