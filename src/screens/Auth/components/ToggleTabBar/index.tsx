import React, {memo} from 'react';
import {View} from 'react-native';

import {AppText, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppFontSizes} from '~/constants';
import {InitialAuthTab} from '~/enums';
import {translate} from '~/localization';

import {styles} from './styles';
// Define the props type for the returned object
type ToggleTabBarProps = {
  isTab: InitialAuthTab | undefined;
  setIsTab: (isTab: InitialAuthTab) => void;
};

export const ToggleTabBar = memo(
  (props: ToggleTabBarProps): React.JSX.Element => {
    const {isTab, setIsTab} = props;

    return (
      <View style={styles.tabBarContainer}>
        <AppTouchable onPress={() => setIsTab(InitialAuthTab.SIGN_IN)}>
          <View style={styles.textContainer}>
            <AppText
              text={translate('SignIn')}
              fontColor={
                isTab === InitialAuthTab.SIGN_IN
                  ? AppColors.peanBlue
                  : AppColors.peanBlue70
              }
              fontSize={
                isTab === InitialAuthTab.SIGN_IN
                  ? AppFontSizes[24]
                  : AppFontSizes[20]
              }
              fontFamily={
                isTab === InitialAuthTab.SIGN_IN
                  ? AppFonts.GentiumBasic_Bold
                  : AppFonts.GentiumBasic_Regular
              }
            />
            {isTab === InitialAuthTab.SIGN_IN ? (
              <View style={styles.borderTitleContainer} />
            ) : (
              <View style={styles.borderTitleContainerTransperent} />
            )}
          </View>
        </AppTouchable>
        <AppTouchable onPress={() => setIsTab(InitialAuthTab.CREATE_ACCOUNT)}>
          <>
            <AppText
              text={translate('CreateAccount')}
              fontColor={
                isTab === InitialAuthTab.CREATE_ACCOUNT
                  ? AppColors.peanBlue
                  : AppColors.peanBlue70
              }
              fontSize={
                isTab === InitialAuthTab.CREATE_ACCOUNT
                  ? AppFontSizes[24]
                  : AppFontSizes[20]
              }
              fontFamily={
                isTab === InitialAuthTab.CREATE_ACCOUNT
                  ? AppFonts.GentiumBasic_Bold
                  : AppFonts.GentiumBasic_Regular
              }
            />
            {isTab === InitialAuthTab.CREATE_ACCOUNT ? (
              <View style={styles.borderTitleContainer} />
            ) : (
              <View style={styles.borderTitleContainerTransperent} />
            )}
          </>
        </AppTouchable>
      </View>
    );
  },
);
