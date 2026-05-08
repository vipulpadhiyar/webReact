import {StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';

/**
 * Stylesheet for the AppButton component.
 *
 * @exports styles - Stylesheet for the AppButton component.
 */
const styles = StyleSheet.create({
  container: {
    padding: AppSpacing[12],
    backgroundColor: AppColors.inputBackground,
    borderRadius: AppSpacing[30],
    flexDirection: 'row',
    height: AppSpacing[50],
    borderWidth: AppSpacing[1],
    borderColor: AppColors.inputBorder,
  },
  textInput: {
    flex: 1,
    padding: 0,
    color: AppColors.greyE8,
    marginHorizontal: AppSpacing[16],
    fontFamily: AppFonts.GentiumBasic_Regular,
    fontSize: AppFontSizes[14],
  },
  searchIcon: {
    marginHorizontal: AppSpacing[8],
  },
});

export default styles;
