import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    padding: AppSpacing[30],
    marginHorizontal: AppSpacing[20],
    borderRadius: AppSpacing[20],
  },
  modalBtnContainer: {
    flexDirection: 'row',
    gap: AppSpacing[8],
  },
  titleText: {
    // textAlign: 'center',
  },
  descText: {
    marginVertical: AppSpacing[20],
    textAlign: 'center',
  },
  confirmBtnStyle: {
    paddingHorizontal: AppSpacing[40],
  },
  cancelBtnStyle: {
    paddingHorizontal: AppSpacing[40],
    paddingVertical: 0,
    backgroundColor: AppColors.white,
    borderColor: AppColors.peanBlue,
  },
});
