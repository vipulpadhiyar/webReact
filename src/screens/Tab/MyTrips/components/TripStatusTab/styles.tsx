import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  content: {
    marginVertical: AppSpacing[20],
    height: AppSpacing[35],
    paddingLeft: AppSpacing[20],
  },
  activeTab: {
    minWidth: AppSpacing[100],
    backgroundColor: AppColors.peanBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: AppSpacing[20],
    borderRadius: AppSpacing[25],
    borderWidth: 1,
    borderColor: AppColors.peanBlue,
  },
  inactiveTab: {
    minWidth: AppSpacing[100],
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: AppSpacing[20],
    borderRadius: AppSpacing[25],
    borderWidth: 1,
    borderColor: AppColors.peanBlue,
  },
});

export default styles;
