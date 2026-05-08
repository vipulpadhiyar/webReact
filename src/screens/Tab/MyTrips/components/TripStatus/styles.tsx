import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  upcomingStatus: {
    backgroundColor: AppColors.upcoming,
    paddingHorizontal: AppSpacing[13],
    paddingVertical: AppSpacing[7],
    borderRadius: AppSpacing[16],
  },
  ongoingStatus: {
    backgroundColor: AppColors.ongoing,
    paddingHorizontal: AppSpacing[13],
    paddingVertical: AppSpacing[7],
    borderRadius: AppSpacing[16],
  },
  completeStatus: {
    backgroundColor: AppColors.complete,
    paddingHorizontal: AppSpacing[13],
    paddingVertical: AppSpacing[7],
    borderRadius: AppSpacing[16],
  },
  cancelStatus: {
    backgroundColor: AppColors.cancel,
    paddingHorizontal: AppSpacing[13],
    paddingVertical: AppSpacing[7],
    borderRadius: AppSpacing[16],
  },
});

export default styles;
