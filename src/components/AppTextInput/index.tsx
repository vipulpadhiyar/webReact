import React, {memo, useCallback, useState} from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';
import {IcEyeClose, IcEyeOpen} from '~/constants/app.svg';

import {AppSvgButton} from '../AppSvgButton';
import {AppText} from '../AppText';

import {styles} from './styles';

interface AppTextInputProps extends TextInputProps {
  inputRef?: any;
  testID?: string;
  errorTestId?: string;
  labelText?: string;
  errorText?: string;
  isRequired?: boolean;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  subContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputIcon?: React.FC<SvgProps>;
  rightIcon?: React.FC<SvgProps>;
  rightIconPress?: () => void;
}

// design for making  password visible or invisible when user clicks on the icon , title label on top and error text on bottom.

/* The `export const AppTextInput` function is a React component that creates a customizable text input
field. Here's a breakdown of what it does: */
export const AppTextInput = memo((props: AppTextInputProps) => {
  const {
    inputRef,
    testID,
    errorTestId,
    labelText,
    errorText,
    isRequired,
    containerStyle,
    subContainerStyle,
    isPassword = false,
    rightIcon,
    inputStyle,
    inputIcon,
    rightIconPress = () => {},
  } = props;

  const [secureText, setSecureText] = useState<boolean>(isPassword);

  const setSecureTextHandler = useCallback(() => {
    setSecureText(prev => !prev);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      {labelText && (
        <Text>
          {labelText && (
            <AppText
              text={labelText}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[16]}
              fontColor={AppColors.peanBlue}
            />
          )}
          {isRequired && (
            <AppText
              text={'*'}
              fontFamily={AppFonts.GentiumBasic_Bold}
              fontSize={AppFontSizes[16]}
              fontColor={AppColors.errorText}
            />
          )}
        </Text>
      )}

      <View style={[styles.subContainer, subContainerStyle]}>
        {inputIcon && (
          <AppSvgButton icon={inputIcon} containerStyle={styles.eyeButton} />
        )}
        <TextInput
          ref={inputRef}
          testID={testID}
          autoCorrect={false}
          placeholderTextColor={AppColors.inputText}
          style={[styles.inputStyle, inputStyle]}
          blurOnSubmit={false}
          secureTextEntry={secureText}
          {...props}
        />
        {isPassword &&
          (secureText ? (
            <AppSvgButton
              icon={IcEyeClose}
              containerStyle={styles.eyeButton}
              onPress={setSecureTextHandler}
            />
          ) : (
            <AppSvgButton
              icon={IcEyeOpen}
              containerStyle={styles.eyeButton}
              onPress={setSecureTextHandler}
            />
          ))}

        {rightIcon && (
          <AppSvgButton
            icon={rightIcon}
            containerStyle={styles.eyeButton}
            onPress={rightIconPress}
          />
        )}
      </View>

      {errorText && (
        <AppText
          testID={errorTestId}
          text={errorText}
          fontSize={AppFontSizes[14]}
          fontColor={AppColors.errorText}
          containerStyle={styles.errorTextStyle}
        />
      )}
    </View>
  );
});
