import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  content: {
    margin: AppSpacing[20],
    marginTop: 0,
    borderRadius: AppSpacing[30],
    backgroundColor: AppColors.white,
  },
  nameImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppSpacing[30],

    marginHorizontal: AppSpacing[30],
  },
  imageView: {
    width: AppSpacing[70],
    height: AppSpacing[60],
    borderRadius: AppSpacing[10],
    marginRight: AppSpacing[10],
  },
  nameView: {
    flex: 1,
  },
  barnColorView: {
    flexDirection: 'row',
    marginVertical: AppSpacing[20],
    marginHorizontal: AppSpacing[30],
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.peanBlue10,
  },
  viewBtnContainer: {
    alignItems: 'flex-end',
    paddingVertical: AppSpacing[25],
    paddingRight: AppSpacing[20],
  },
  viewBtn: {
    height: AppSpacing[35],
    paddingVertical: 0,
  },
  horseName: {
    textTransform: 'capitalize',
  },
});
export default styles;
