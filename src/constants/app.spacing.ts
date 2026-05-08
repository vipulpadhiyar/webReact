import {Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

/* Defines device screen width and height */
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * Defines spacing values using the moderateScale function for consistent spacing across the application.
 *
 * @exports AppSpacing - Object containing spacing values
 */
export const AppSpacing = {
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
  18: moderateScale(18),
  20: moderateScale(20),
  22: moderateScale(22),
  23: moderateScale(23),
  24: moderateScale(24),
  25: moderateScale(25),
  30: moderateScale(30),
  32: moderateScale(32),
  34: moderateScale(34),
  35: moderateScale(35),
  37: moderateScale(37),
  40: moderateScale(40),
  42: moderateScale(42),
  45: moderateScale(45),
  46: moderateScale(46),
  48: moderateScale(48),
  50: moderateScale(50),
  54: moderateScale(54),
  55: moderateScale(55),
  56: moderateScale(56),
  60: moderateScale(60),
  65: moderateScale(65),
  70: moderateScale(70),
  75: moderateScale(75),
  80: moderateScale(80),
  90: moderateScale(90),
  95: moderateScale(95),
  120: moderateScale(120),
  140: moderateScale(140),
  180: moderateScale(180),
  200: moderateScale(200),
  210: moderateScale(210),
  500: moderateScale(500),
  100: moderateScale(100),
  104: moderateScale(104),
};
