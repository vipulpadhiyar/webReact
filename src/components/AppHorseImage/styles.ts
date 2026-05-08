import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginHorizontal: AppSpacing[20],
    padding: AppSpacing[20],
    borderRadius: AppSpacing[20],
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    marginTop: AppSpacing[10],
    width: SCREEN_WIDTH - 80,
    height: SCREEN_WIDTH - 80,
    borderRadius: AppSpacing[13],
  },
});
