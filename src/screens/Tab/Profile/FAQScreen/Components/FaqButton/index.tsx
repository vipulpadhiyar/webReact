import React, {memo} from 'react';
import {View} from 'react-native';

import {AppText, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppFontSizes, IcMinus, IcPlus} from '~/constants';

import {styles} from './styles';
type FaqButtonProps = {
  title: string;
  description: string;
  index: number;
  openIndex: number | null;
  onClick: () => void;
};
export const FaqButton = memo((props: FaqButtonProps) => {
  const {title, description, index, openIndex, onClick} = props;
  const toggleTile = () => {
    onClick();
  };
  return (
    <View style={styles.container}>
      <AppTouchable style={styles.buttonStyle} onPress={toggleTile}>
        <AppText
          text={title}
          fontColor={AppColors.peanBlue}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontSize={AppFontSizes[16]}
          containerStyle={styles.titleStyle}
        />
        {openIndex === index ? <IcMinus /> : <IcPlus />}
      </AppTouchable>
      {openIndex === index && (
        <AppText
          text={description}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontColor={AppColors.textColor}
          fontSize={AppFontSizes[14]}
          containerStyle={styles.descStyle}
        />
      )}
    </View>
  );
});
