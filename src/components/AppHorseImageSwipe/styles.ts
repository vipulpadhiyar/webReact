import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

export const styles = StyleSheet.create({
  modal: {},
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
    width: SCREEN_WIDTH - 84,
    height: SCREEN_WIDTH - 84,
    borderRadius: AppSpacing[13],
    overflow: 'hidden',
    backgroundColor: AppColors.containerBg,
  },
  activity: {
    position: 'absolute',
    marginTop: AppSpacing[10],
    width: SCREEN_WIDTH - 80,
    height: SCREEN_WIDTH - 80,
    borderRadius: AppSpacing[13],
    backgroundColor: AppColors.white,
  },
  swiper: {
    position: 'absolute',
  },
  leftSwipe: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: SCREEN_WIDTH / 2,
  },
  rightSwipe: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: SCREEN_WIDTH / 2,
  },
});
