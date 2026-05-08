import React from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';

import {AppSvgButton, AppText} from '~/components';
import {AppFonts, AppFontSizes, IcBackArrow} from '~/constants';

import styles from './styles';

interface IAppScreen {
  children?: React.JSX.Element | React.JSX.Element[];
  header: string;
  screenStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  testID?: string;
  backTestId?: string;
  onBack?: () => void;
}
export const AppScreen = (props: IAppScreen) => {
  const {
    children,
    header = 'Screen Header',
    onBack,
    screenStyle = {},
    headerStyle = {},
    testID,
    backTestId,
  } = props;
  return (
    <View style={[styles.screen, screenStyle]} testID={testID}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.header, headerStyle]}>
          {onBack && (
            <AppSvgButton
              testID={backTestId}
              icon={IcBackArrow}
              containerStyle={styles.back}
              onPress={onBack}
            />
          )}
          <AppText
            text={header}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppFontSizes[24]}
            containerStyle={styles.headerText}
          />
        </View>
        {children}
      </SafeAreaView>
    </View>
  );
};
