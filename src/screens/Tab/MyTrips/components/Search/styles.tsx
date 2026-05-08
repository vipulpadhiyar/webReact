import {StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  input: {
    paddingLeft: AppSpacing[30],
    flex: 1,
    fontFamily: AppFonts.GentiumBasic_Regular,
    fontSize: AppSpacing[14],
    color: AppColors.peanBlue,
  },
  inputContainer: {
    marginHorizontal: AppSpacing[20],
    marginBottom: AppSpacing[20],
  },
});

export default styles;
