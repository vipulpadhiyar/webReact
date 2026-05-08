import React, {memo} from 'react';
import {View} from 'react-native';

import {AppHOButton, AppText} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';
import {translate} from '~/localization';

import {styles} from './styles';

type logOutProps = {
  header: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmTestID?: string;
};

export const LogOutModal = memo((props: logOutProps) => {
  const {header, message, confirmTestID, onCancel, onConfirm} = props;
  return (
    <View style={styles.modalContainer}>
      <AppText
        text={header}
        fontFamily={AppFonts.GentiumBasic_Bold}
        fontSize={AppFontSizes[20]}
        // containerStyle={styles.titleText}
      />
      <AppText
        text={message}
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={AppFontSizes[16]}
        fontColor={AppColors.peanBlue80}
        containerStyle={styles.descText}
      />
      <View style={styles.modalBtnContainer}>
        <AppHOButton
          testID={confirmTestID}
          text={translate('Confirm')}
          textFontFamily={AppFonts.GentiumBasic_Bold}
          textSize={AppSpacing[16]}
          containerStyle={styles.confirmBtnStyle}
          onPress={onConfirm}
        />
        <AppHOButton
          text={translate('Cancel')}
          textFontFamily={AppFonts.GentiumBasic_Bold}
          textSize={AppSpacing[16]}
          textColor={AppColors.peanBlue}
          containerStyle={styles.cancelBtnStyle}
          onPress={onCancel}
        />
      </View>
    </View>
  );
});
