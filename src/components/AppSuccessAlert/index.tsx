/* This code snippet is defining a React functional component named `AppDelete`. The component takes in
props of type `IAppDelete`, which includes properties like `title`, `message`, `onConfirm`, and
`onCancel`. */
import React from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppColors, AppFonts, AppFontSizes, IcSuccess} from '~/constants';

import {AppButton} from '../AppButton';
import {AppText} from '../AppText';

import {styles} from './styles';

interface IAppSuccessAlert {
  mainIcon?: React.FC<SvgProps>;
  title: string;
  message: string;
  topBtnText?: string;
  bottomBtnText?: string;
  onTopPress?: () => void;
  onBottomPress?: () => void;
}

export const AppSuccessAlert = (props: IAppSuccessAlert) => {
  const {title, message, topBtnText, bottomBtnText, onTopPress, onBottomPress} =
    props;
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {props.mainIcon ? (
          <View>
            <props.mainIcon />
          </View>
        ) : (
          <IcSuccess />
        )}
        <AppText
          text={title}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontSize={AppFontSizes[20]}
          fontColor={AppColors.peanBlue}
          containerStyle={styles.title}
        />
        <AppText
          text={message}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontSize={AppFontSizes[16]}
          fontColor={AppColors.peanBlue80}
          containerStyle={styles.message}
        />
      </View>
      <View style={styles.buttonView}>
        {topBtnText && onTopPress && (
          <AppButton
            text={topBtnText}
            textSize={AppFontSizes[16]}
            textFontFamily={AppFonts.GentiumBasic_Bold}
            containerStyle={styles.confirm}
            onPress={onTopPress}
          />
        )}
        {bottomBtnText && onBottomPress && (
          <AppButton
            text={bottomBtnText}
            textSize={AppFontSizes[16]}
            textFontFamily={AppFonts.GentiumBasic_Bold}
            containerStyle={styles.cancel}
            textColor={AppColors.peanBlue}
            onPress={onBottomPress}
          />
        )}
      </View>
    </View>
  );
};
