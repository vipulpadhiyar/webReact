import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
    shadowColor: AppColors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    elevation: 2,
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[20],
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[20],
  },
  iconTextContainer: {
    flexDirection: 'row',
    gap: AppSpacing[10],
  },
  switchContainer: {
    height: AppSpacing[30], // Adjust height as needed
    justifyContent: 'center',
  },
  switch: {
    transform: [{scaleX: 0.5}, {scaleY: 0.5}], // Adjust scale as needed
  },
  trackOnStyle: {backgroundColor: AppColors.peanBlue},
  trackOffStyle: {backgroundColor: AppColors.trackColorInActive},
  thumbColor: {backgroundColor: AppColors.white},
});
