import {StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';

export const styles = StyleSheet.create({
  main: {borderWidth: 0, borderRadius: 10},
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: AppColors.white,
    borderRadius: 20,
    maxWidth: '80%',
  },
  textOne: {
    fontSize: AppFontSizes[16],
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.peanBlue,
  },
  textTwo: {
    fontSize: AppFontSizes[14],
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.peanBlue,
  },
  textError: {
    fontSize: AppFontSizes[16],
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.errorText,
  },
});
