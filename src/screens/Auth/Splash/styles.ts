import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.peanBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    // paddingTop: AppSpacing[200],
  },

  bottomContainer: {
    height: 'auto',
    borderTopLeftRadius: AppSpacing[37],
    borderTopRightRadius: AppSpacing[37],
    paddingHorizontal: AppSpacing[20],
    backgroundColor: AppColors.white,
  },
  signInBtn1: {
    marginTop: AppSpacing[100],
    marginBottom: AppSpacing[100],
  },
});

export default styles;
