import React, {memo, PropsWithChildren, useCallback, useMemo} from 'react';
import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppText, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';

import styles from './styles';

/**
 * Defines the props for the AppHOButton component, which extends TouchableOpacityProps with additional properties.
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
export const AppHOButton = memo((props: AppButtonProps): React.JSX.Element => {
  const {
    text,
    containerStyle,
    textStyle,
    textFontFamily: fontFamily,
    textColor: fontColor,
    textSize: fontSize,
    disabled,
  } = props;

  /* The `useMemo` hook is used to memoize the value of `textColor` based on the `fontColor` prop. */
  const textColor = useMemo(() => {
    return fontColor ?? AppColors.white;
  }, [fontColor]);

  /* The `useMemo` hook in the provided code snippet is used to memoize the value of the `textSize`
variable based on the `fontSize` prop. */
  const textSize = useMemo(() => {
    return fontSize ?? AppFontSizes[18];
  }, [fontSize]);

  /* The code snippet you provided is utilizing the `useMemo` hook to memoize the value of the
`textFontFamily` variable based on the `fontFamily` prop. */
  const textFontFamily = useMemo(() => {
    return fontFamily ?? AppFonts.GentiumBasic_Bold;
  }, [fontFamily]);

  /* The `renderLeftIcon` constant is using the `useCallback` hook to define a memoized callback
function. This function checks if the `leftIcon` prop exists in the `props` object. If the
`leftIcon` prop is defined, it returns the corresponding SVG component specified by
`props.leftIcon`. If the `leftIcon` prop is not defined, it returns an empty fragment `<>`. */
  const renderLeftIcon = useCallback(() => {
    if (props?.leftIcon !== undefined) {
      return <props.leftIcon height={AppSpacing[24]} width={AppSpacing[24]} />;
    } else {
      return <></>;
    }
  }, [props?.leftIcon]);

  /* The `renderRightIcon` constant is using the `useCallback` hook to define a memoized callback
function. This function checks if the `rightIcon` prop exists in the `props` object. If the
`rightIcon` prop is defined, it returns the corresponding SVG component specified by
`props.rightIcon`. If the `rightIcon` prop is not defined, it returns an empty fragment `<>`. This
ensures that the rendering of the right icon is handled efficiently and only re-evaluated when the
`rightIcon` prop changes. */
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
