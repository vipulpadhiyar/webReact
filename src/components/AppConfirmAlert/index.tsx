/* This code snippet is defining a React functional component named `AppDelete`. The component takes in
props of type `IAppDelete`, which includes properties like `title`, `message`, `onConfirm`, and
`onCancel`. */
import React from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';

import {AppButton} from '../AppButton';
import {AppText} from '../AppText';

import {styles} from './styles';

/**
 *  @interface IAppConfirmAlert
 *  @description This interface defines the props for the AppConfirmAlert component.
 *  @property {React.FC<SvgProps>} icon - The icon to be displayed in the alert.
 *  @property {string} title - The title of the alert.
 *  @property {string} message - The message to be displayed in the alert.
 *  @property {string} leftBtnText - The text for the left button.
 *  @property {string} rightBtnText - The text for the right button.
 *  @property {() => void} onLeftPress - The function to be called when the left button is pressed.
 *  @property {() => void} onRightPress - The function to be called when the right button is pressed.
 */
interface IAppConfirmAlert {
  icon?: React.FC<SvgProps>;
  title: string;
  message: string;
  leftBtnText?: string;
  rightBtnText?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

/**
 *
 * @param props
 *  @description This component displays an alert with a title, message, and two buttons (left and right).
 * @param icon
 * @param title
 * @param message
 * @param leftBtnText
 * @param rightBtnText
 * @param onLeftPress
 * @param onRightPress
 * @returns
 */
export const AppConfirmAlert = (props: IAppConfirmAlert) => {
  const {title, message, leftBtnText, rightBtnText, onLeftPress, onRightPress} =
    props;
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        {props.icon && (
          <View style={styles.icon}>
            <props.icon />
          </View>
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
          fontColor={AppColors.peanBlue}
          containerStyle={styles.message}
        />
      </View>
      <View style={styles.buttonView}>
        {leftBtnText && onLeftPress && (
          <AppButton
            text={leftBtnText}
            containerStyle={styles.confirm}
            onPress={onLeftPress}
          />
        )}
        {rightBtnText && onRightPress && (
          <AppButton
            text={rightBtnText}
            containerStyle={styles.cancel}
            textColor={AppColors.peanBlue}
            onPress={onRightPress}
          />
        )}
      </View>
    </View>
  );
};
