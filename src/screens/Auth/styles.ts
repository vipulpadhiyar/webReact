import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_HEIGHT, SCREEN_WIDTH} from '~/constants';

//  the logo size is set as 40% of the smaller dimension between the screen width and height
const LOGO_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.4;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  subContainer: {
    backgroundColor: AppColors.peanBlue,
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.5,
  },
  imgLogo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  bottomContainer: {
    borderTopLeftRadius: AppSpacing[37],
    borderTopRightRadius: AppSpacing[37],
    paddingHorizontal: AppSpacing[20],
    paddingVertical: AppSpacing[20],
    backgroundColor: AppColors.white,
    marginTop: -(SCREEN_HEIGHT * 0.07),
  },
  lineTitleContainer: {
    flexDirection: 'column',
  },
});
