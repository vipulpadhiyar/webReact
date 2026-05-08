import {Platform} from 'react-native';
import {defaultSystemFonts, MixedStyleRecord} from 'react-native-render-html';
import {moderateScale} from 'react-native-size-matters';

import {AppColors} from './app.colors';

/**
 * Defines font names used throughout the application.
 * @exports AppFonts - Object containing font names.
 */
export const AppFonts = {
  GentiumBasic_Regular:
    Platform.OS === 'android' ? 'GentiumBasic-Regular' : 'GentiumBasic',
  GentiumBasic_Bold: 'GentiumBasic-Bold',
  GentiumBasic_BoldItalic: 'GentiumBasic-BoldItalic',
  GentiumBasic_Italic: 'GentiumBasic-Italic',
};

/**
 * Defines font sizes using the moderateScale function for consistent scaling across the application.
 * @exports AppFontSizes - Object containing font sizes.
 */
export const AppFontSizes = {
  1: moderateScale(1),
  2: moderateScale(2),
  3: moderateScale(3),
  4: moderateScale(4),
  5: moderateScale(5),
  6: moderateScale(6),
  7: moderateScale(7),
  8: moderateScale(8),
  9: moderateScale(9),
  10: moderateScale(10),
  11: moderateScale(11),
  12: moderateScale(12),
  13: moderateScale(13),
  14: moderateScale(14),
  15: moderateScale(15),
  16: moderateScale(16),
  17: moderateScale(17),
  18: moderateScale(18),
  19: moderateScale(19),
  20: moderateScale(20),
  21: moderateScale(21),
  22: moderateScale(22),
  23: moderateScale(23),
  24: moderateScale(24),
  25: moderateScale(25),
};

// font config in html view.
export const HtmlSystemFonts = [
  ...defaultSystemFonts,
  AppFonts.GentiumBasic_Bold,
  AppFonts.GentiumBasic_BoldItalic,
  AppFonts.GentiumBasic_Italic,
  AppFonts.GentiumBasic_Regular,
];

// html tags config in styles.
export const HtmlTagsStyle: MixedStyleRecord = {
  body: {
    color: AppColors.black,
    fontSize: AppFontSizes[15],
    fontFamily: AppFonts.GentiumBasic_Regular,
  },
  a: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  p: {
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.black,
    fontSize: AppFontSizes[15],
    marginBottom: AppFontSizes[10],
  },
  ul: {
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.black,
  },
  i: {
    color: AppColors.black,
  },
  b: {
    fontFamily: AppFonts.GentiumBasic_Bold,
    color: AppColors.black,
  },
  strong: {
    fontFamily: AppFonts.GentiumBasic_Bold,
    color: AppColors.black,
  },
  u: {
    fontFamily: AppFonts.GentiumBasic_Bold,
    color: AppColors.black,
    textAlign: 'justify',
    textDecorationLine: 'underline',
  },
  img: {display: 'none'},
  em: {
    color: AppColors.black,
  },
  h1: {
    fontSize: AppFontSizes[18],
    color: AppColors.black,
    fontFamily: AppFonts.GentiumBasic_Bold,
  },
  h2: {
    fontSize: AppFontSizes[16],
    color: AppColors.black,
    fontFamily: AppFonts.GentiumBasic_Bold,
  },
  h3: {
    fontSize: AppFontSizes[14],
    color: AppColors.black,
    fontFamily: AppFonts.GentiumBasic_Bold,
  },
  h4: {
    fontSize: AppFontSizes[12],
    color: AppColors.black,
    fontFamily: AppFonts.GentiumBasic_Bold,
  },
  h5: {
    fontSize: AppFontSizes[10],
    color: AppColors.black,
    fontFamily: AppFonts.GentiumBasic_Bold,
  },
  h6: {
    fontSize: AppFontSizes[8],
    color: AppColors.black,
    fontFamily: AppFonts.GentiumBasic_Bold,
  },
  span: {
    fontFamily: AppFonts.GentiumBasic_Bold,
    color: AppColors.black,
    marginTop: -AppFontSizes[5],
    fontSize: AppFontSizes[22],
  },
};
