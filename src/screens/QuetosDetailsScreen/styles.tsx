import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[30],
    paddingHorizontal: AppSpacing[16],
  },
  tripDetailsContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[24],
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[18],
    marginTop: AppSpacing[24],
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  quetosDetailsContainer: {
    paddingTop: AppSpacing[16],
    rowGap: AppSpacing[5],
  },
  expandViewContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[24],
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[18],
    marginTop: AppSpacing[24],
  },
  listInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: AppSpacing[5],
  },
  viewDateContainer: {width: '50%', rowGap: AppSpacing[5]},
  locationContainer: {
    paddingTop: AppSpacing[16],
    rowGap: AppSpacing[5],
  },
  quetosListContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[24],
    paddingVertical: AppSpacing[16],
    paddingHorizontal: AppSpacing[18],
    rowGap: AppSpacing[8],
  },
  receivedQuetosText: {
    paddingVertical: AppSpacing[16],
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  declineAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppSpacing[12],
  },
  viewButton: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[24],
  },
});
