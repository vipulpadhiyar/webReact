import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginHorizontal: AppSpacing[20],
    padding: AppSpacing[30],
    borderRadius: AppSpacing[20],
  },
  textView: {
    alignItems: 'center',
  },
  icon: {
    // marginTop: AppSpacing[20],
    marginBottom: AppSpacing[10],
  },
  title: {
    textAlign: 'center',
    marginBottom: AppSpacing[10],
  },
  message: {
    textAlign: 'center',
    marginBottom: AppSpacing[20],
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirm: {
    paddingVertical: 0,
    // paddingHorizontal: AppSpacing[30],
    width: SCREEN_WIDTH * 0.33,
    height: AppSpacing[45],
  },
  cancel: {
    paddingVertical: 0,
    // paddingHorizontal: AppSpacing[30],
    width: SCREEN_WIDTH * 0.33,
    height: AppSpacing[45],
    backgroundColor: AppColors.white,
  },
});
