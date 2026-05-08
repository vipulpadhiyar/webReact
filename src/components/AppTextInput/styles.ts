import {StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  container: {},
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppSpacing[10],
    backgroundColor: AppColors.inputBackground,
    borderRadius: AppSpacing[50],
    borderColor: AppColors.inputBorder,
    borderWidth: 1,
  },
  errorTextStyle: {
    marginTop: AppSpacing[6],
    textAlign: 'left',
  },
  inputStyle: {
    flex: 1,
    fontSize: AppSpacing[14],
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.peanBlue,
    paddingVertical: AppSpacing[15],
    paddingRight: AppSpacing[15],
    // paddingHorizontal: AppSpacing[15],
  },
  eyeButton: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[15],
  },
});
