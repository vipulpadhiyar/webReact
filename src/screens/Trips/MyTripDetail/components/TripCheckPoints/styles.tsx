import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  tripCheckView: {
    flexDirection: 'row',
    marginTop: AppSpacing[20],
  },
  rowView: {
    flexDirection: 'row',
  },
  pickUpCheck: {
    backgroundColor: AppColors.white,
    height: AppSpacing[24],
    width: AppSpacing[24],
    borderRadius: AppSpacing[20],
    borderWidth: AppSpacing[2],
    borderColor: AppColors.peanBlue18,
  },
  pickUpCheckActive: {
    backgroundColor: AppColors.peanBlue,
    height: AppSpacing[24],
    width: AppSpacing[24],
    borderRadius: AppSpacing[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropOffCheck: {
    backgroundColor: AppColors.white,
    height: AppSpacing[24],
    width: AppSpacing[24],
    borderRadius: AppSpacing[20],
    borderWidth: AppSpacing[2],
    borderColor: AppColors.peanBlue18,
  },
  dropOffCheckActive: {
    backgroundColor: AppColors.peanBlue,
    height: AppSpacing[24],
    width: AppSpacing[24],
    borderRadius: AppSpacing[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  vLine: {
    width: AppSpacing[2],
    flex: 1,
    marginLeft: AppSpacing[10],
    backgroundColor: AppColors.peanBlue18,
  },
  vLineActive: {
    width: AppSpacing[2],
    flex: 1,
    borderWidth: AppSpacing[2],
    marginLeft: AppSpacing[10],
    backgroundColor: AppColors.peanBlue,
  },

  address: {
    marginLeft: AppSpacing[15],
    marginRight: AppSpacing[20],
    minHeight: AppSpacing[104],
  },
});
export default styles;
