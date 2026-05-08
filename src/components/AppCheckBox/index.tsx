import React, {memo} from 'react';
import {StyleSheet, TouchableOpacityProps, View} from 'react-native';

import {
  AppColors,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcCheckboxSelected,
  IcCheckboxUnSelected,
} from '~/constants';

import {AppText} from '../AppText';
import {AppTouchable} from '../AppTouchable';

interface AppCheckBoxProps extends TouchableOpacityProps {
  isSelected: boolean;
  labelText?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const AppCheckBox = memo((props: AppCheckBoxProps) => {
  const {labelText, isSelected, onPress} = props;

  return (
    <AppTouchable disabled={!onPress} onPress={onPress} {...props}>
      <View style={styles.container}>
        {isSelected ? <IcCheckboxSelected /> : <IcCheckboxUnSelected />}
        {labelText && (
          <AppText
            text={labelText}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontColor={AppColors.peanBlue}
            fontSize={AppFontSizes[16]}
          />
        )}
      </View>
    </AppTouchable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppSpacing[12],
  },
});
