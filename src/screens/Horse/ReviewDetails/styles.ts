import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.containerBg,
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[32],
  },
  subcontainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginTop: AppSpacing[30],
    marginHorizontal: AppSpacing[20],
    borderRadius: AppSpacing[32],
    paddingBottom: AppSpacing[30],
  },
  nameImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppSpacing[30],
    marginHorizontal: AppSpacing[30],
  },
  nameView: {
    flex: 1,
  },
  detailView: {
    flexDirection: 'row',
    marginVertical: AppSpacing[20],
    marginHorizontal: AppSpacing[30],
  },
  images: {
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[30],
  },
  subtextView: {
    marginTop: AppSpacing[4],
  },
  imageListItem: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: AppSpacing[20],
    backgroundColor: AppColors.aliceBlue,
    paddingVertical: AppSpacing[8],
    borderColor: AppColors.inputBorder,
    borderWidth: 1,
    borderRadius: AppSpacing[22],
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: AppSpacing[16],
    height: AppSpacing[40],
  },
  img: {
    height: AppSpacing[22],
    width: AppSpacing[22],
    marginLeft: AppSpacing[16],
  },
  imgName: {
    maxWidth: SCREEN_WIDTH / 2,
    marginHorizontal: AppSpacing[10],
  },
  iconDelete: {
    height: AppSpacing[16],
    width: AppSpacing[16],
    marginRight: AppSpacing[16],
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: AppSpacing[20],
    marginVertical: AppSpacing[30],
  },
  confirm: {
    width: SCREEN_WIDTH * 0.4,
  },
  cancel: {
    backgroundColor: AppColors.white,
    width: SCREEN_WIDTH * 0.4,
  },
});
export default styles;
