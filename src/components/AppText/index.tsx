import React, {memo, PropsWithChildren, useMemo} from 'react';
import {Platform, Text, TextProps, type TextStyle} from 'react-native';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';

/**
 * Defines the props for the AppText component, which extends TextProps with additional properties.
 */
type AppTextProps = PropsWithChildren<TextProps> & {
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  containerStyle?: TextStyle[] | TextStyle;
  text: string;
  children?: React.ReactNode;
};

/**
 * Represents a memoized text component with customizable font properties.
 * @param {AppTextProps} props - Component props.
 * @returns {JSX.Element} - React element.
 * @exports AppText - Memoized text component.
 */
export const AppText = memo((props: AppTextProps) => {
  const {
    fontSize,
    fontColor,
    containerStyle,
    text,
    fontFamily,
    children = <></>,
  } = props;

  const localStyle: TextStyle = useMemo(() => {
    const fontStyles: TextStyle =
      Platform.OS === 'ios'
        ? {
            fontWeight: '400',
            fontFamily: AppFonts.GentiumBasic_Regular,
          }
        : {
            fontFamily: AppFonts.GentiumBasic_Regular,
          };

    if (fontFamily) {
      switch (fontFamily) {
        case AppFonts.GentiumBasic_Regular:
          fontStyles.fontFamily = AppFonts.GentiumBasic_Regular;
          if (Platform.OS === 'ios') {
            fontStyles.fontWeight = '400';
          }
          break;
        case AppFonts.GentiumBasic_Bold:
          fontStyles.fontFamily = AppFonts.GentiumBasic_Bold;
          if (Platform.OS === 'ios') {
            fontStyles.fontWeight = '700';
          }
          break;
        case AppFonts.GentiumBasic_BoldItalic:
          fontStyles.fontFamily = AppFonts.GentiumBasic_Italic;
          if (Platform.OS === 'ios') {
            fontStyles.fontWeight = '700';
          }

          break;
        case AppFonts.GentiumBasic_Italic:
          fontStyles.fontFamily = AppFonts.GentiumBasic_Italic;
          if (Platform.OS === 'ios') {
            fontStyles.fontWeight = '400';
          }
          break;
      }
    }

    return {
      fontSize: fontSize ?? AppFontSizes[18],
      color: fontColor ?? AppColors.peanBlue,
      ...fontStyles,
    };
  }, [fontFamily, fontSize, fontColor]);

  return (
    <Text style={[localStyle, containerStyle]} {...props}>
      {text}
      {children}
    </Text>
  );
});
