import React, {memo, PropsWithChildren, useCallback, useMemo} from 'react';
import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppText, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppFontSizes} from '~/constants';

import styles from './styles';

/**
 * Defines the props for the AppButton component, which extends TouchableOpacityProps with additional properties.
 */
type AppButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  disabled?: boolean;
  text: string;
  textColor?: string;
  textSize?: number;
  textFontFamily?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle[] | TextStyle;
  leftIcon?: React.FC<SvgProps>;
  rightIcon?: React.FC<SvgProps>;
};

/**
 * Represents a memoized button component, which utilizes TouchableOpacity and SVG components.
 * @param {AppButtonProps} props - Component props.
 * @returns {JSX.Element} - React element.
 */
export const AppButton = memo((props: AppButtonProps): React.JSX.Element => {
  const {
    text,
    containerStyle,
    textStyle,
    textFontFamily: fontFamily,
    textColor: fontColor,
    textSize: fontSize,
    disabled,
  } = props;

  const textColor = useMemo(() => {
    return fontColor ?? AppColors.white;
  }, [fontColor]);

  const textSize = useMemo(() => {
    return fontSize ?? AppFontSizes[18];
  }, [fontSize]);

  const textFontFamily = useMemo(() => {
    return fontFamily ?? AppFonts.GentiumBasic_Bold;
  }, [fontFamily]);

  const renderLeftIcon = useCallback(() => {
    if (props?.leftIcon !== undefined) {
      return <props.leftIcon />;
    } else {
      return <></>;
    }
  }, [props?.leftIcon]);

  const renderRightIcon = useCallback(() => {
    if (props?.rightIcon !== undefined) {
      return <props.rightIcon />;
    } else {
      return <></>;
    }
  }, [props?.rightIcon]);

  return (
    <AppTouchable
      style={[
        disabled ? styles.containerDisabled : styles.container,
        containerStyle,
      ]}
      {...props}>
      {renderLeftIcon()}
      <AppText
        text={text}
        fontFamily={textFontFamily}
        fontSize={textSize}
        fontColor={textColor}
        containerStyle={textStyle}
      />
      {renderRightIcon()}
    </AppTouchable>
  );
});
