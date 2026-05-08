import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
    shadowColor: AppColors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: AppSpacing[3]},
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
  titleStyle: {
    width: '90%',
  },
  descStyle: {
    paddingHorizontal: AppSpacing[20],
    paddingBottom: AppSpacing[20],
  },
});
