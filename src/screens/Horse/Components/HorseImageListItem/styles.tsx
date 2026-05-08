import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  imageListItem: {
    width: 'auto',
    flexDirection: 'row',
    backgroundColor: AppColors.aliceBlue,
    paddingVertical: AppSpacing[8],
    borderColor: AppColors.inputBorder,
    borderWidth: 1,
    borderRadius: AppSpacing[22],
    alignItems: 'center',
    marginTop: AppSpacing[16],
    height: AppSpacing[40],
    justifyContent: 'space-between',
    paddingHorizontal: AppSpacing[16],
  },
  img: {
    height: AppSpacing[22],
    width: AppSpacing[22],
    borderRadius: AppSpacing[11],
  },
  imgName: {
    maxWidth: SCREEN_WIDTH * 0.5,
    marginHorizontal: AppSpacing[10],
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    height: AppSpacing[16],
    width: AppSpacing[16],
  },
  iconDelete: {
    marginLeft: AppSpacing[10],
    height: AppSpacing[16],
    width: AppSpacing[16],
  },
});
export default styles;
