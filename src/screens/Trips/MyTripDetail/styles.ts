import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: AppColors.containerBg,
    height: '100%',
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[30],
  },
  tripDetails: {
    margin: AppSpacing[20],
    marginTop: AppSpacing[30],
    paddingBottom: AppSpacing[30],
    borderRadius: AppSpacing[30],
    backgroundColor: AppColors.white,
  },
  nameImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[30],
  },
  detailsStatusView: {
    flexDirection: 'row',
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[30],
    justifyContent: 'space-between',
  },
  twoColumnView: {
    flexDirection: 'row',
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[30],
  },
  nameView: {
    flex: 1,
  },
  cancelBtn: {
    marginHorizontal: AppSpacing[20],
    marginVertical: AppSpacing[30],
  },
  scrollView: {
    paddingBottom: AppSpacing[100],
  },
  driverDetails: {
    margin: AppSpacing[20],
    marginTop: AppSpacing[20],
    paddingBottom: AppSpacing[30],
    borderRadius: AppSpacing[30],
    backgroundColor: AppColors.white,
    padding: AppSpacing[16],
    paddingHorizontal: AppSpacing[30],
  },
  starContainer: {
    marginStart: AppSpacing[10],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: AppSpacing[4],
    backgroundColor: AppColors.yellow2,
    paddingHorizontal: AppSpacing[8],
    paddingVertical: AppSpacing[4],
    borderRadius: AppSpacing[10],
    width: AppSpacing[40],
  },
  myStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: AppSpacing[4],
    backgroundColor: AppColors.yellow2,
    paddingHorizontal: AppSpacing[8],
    paddingVertical: AppSpacing[4],
    borderRadius: AppSpacing[10],
    width: AppSpacing[40],
    marginTop: AppSpacing[16],
    marginBottom: AppSpacing[6],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: AppSpacing[10],
  },
  flexContainer: {
    flex: 1,
  },
  mainStarContainer: {
    flexDirection: 'row',
    marginTop: AppSpacing[4],
  },
  innerDetailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: AppSpacing[20],
  },
  listInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: AppSpacing[5],
    marginTop: AppSpacing[8],
  },
  viewDateContainer: {width: '50%', rowGap: AppSpacing[5]},
  incidentText: {
    marginTop: AppSpacing[10],
  },
  pickUpDate: {marginBottom: AppSpacing[4]},
  pickUpDateText: {marginBottom: AppSpacing[12]},
  statusContainer: {flexDirection: 'row', columnGap: AppSpacing[12]},
  iconContainer: {width: AppSpacing[40]},
  textView: {paddingRight: AppSpacing[16]},
  dashedLineStyle: {
    borderWidth: 0.9,
    borderColor: AppColors.peanBlue,
    flex: 1,
  },
  statusInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDisableContainer: {
    alignItems: 'center',
  },
  tripStatus: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: AppSpacing[30],
    maxWidth: AppSpacing[120],
  },
  tripStatusText: {
    paddingHorizontal: AppSpacing[14],
    paddingVertical: 0,
  },
});

export default styles;
