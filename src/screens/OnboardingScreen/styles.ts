import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.peanBlue,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.peanBlue,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: SCREEN_WIDTH * 0.64,
    height: SCREEN_WIDTH * 0.64 + AppSpacing[10],
    alignSelf: 'center',
  },
  bottomContainer: {
    height: 'auto',
    borderTopLeftRadius: AppSpacing[37],
    borderTopRightRadius: AppSpacing[37],
    paddingHorizontal: AppSpacing[20],
    paddingVertical: AppSpacing[50],
    backgroundColor: AppColors.white,
  },
  btnOneContainer: {
    marginBottom: AppSpacing[20],
    backgroundColor: AppColors.peanBlue,
  },
  btnTwoContainer: {
    backgroundColor: AppColors.transparent,
  },
});

export default styles;
