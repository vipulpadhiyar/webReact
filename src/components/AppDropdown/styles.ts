import {StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
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
    pointerEvents: 'none',
  },
  eyeButton: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[15],
  },
  dropdownList: {
    maxHeight: AppSpacing[180],
    marginVertical: AppSpacing[20],
    paddingLeft: AppSpacing[54],
    borderRadius: AppSpacing[10],
  },
  box1: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
    marginBottom: 20,
  },
  box2: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.14,
    shadowRadius: 25,
    elevation: 10, // For Android shadow
  },
  listItem: {
    fontSize: AppSpacing[16],
    fontFamily: AppFonts.GentiumBasic_Regular,
    color: AppColors.peanBlue,
    marginTop: AppSpacing[13],
    textTransform: 'capitalize',
  },
});
