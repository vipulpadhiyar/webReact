import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
  },
  mapStyle: {
    marginTop: AppSpacing[20],
    flex: 1,
  },
  tripUpdate: {},
  scrollView: {
    paddingBottom: AppSpacing[100],
  },
  tripDetails: {
    marginTop: AppSpacing[10],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportIncident: {
    height: AppSpacing[35],
    paddingVertical: 0,
  },
  driverDetails: {
    marginTop: AppSpacing[20],
    backgroundColor: AppColors.white,
  },
  incidentDetails: {
    marginTop: AppSpacing[10],
    backgroundColor: AppColors.white,
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
  viewDateContainer: {
    width: '50%',
    rowGap: AppSpacing[5],
  },
  incidentText: {
    marginTop: AppSpacing[10],
  },
  bottomSheet: {
    marginHorizontal: AppSpacing[35],
    paddingBottom: AppSpacing[35],
  },
  border: {
    height: 1,
    backgroundColor: AppColors.peanBlue10,
    marginTop: AppSpacing[50],
    marginBottom: AppSpacing[15],
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: AppColors.white,
  },
  locationIcon: {
    height: 20,
    width: 24,
  },
  deliveryVehicle: {
    height: 32,
    width: 60,
  },
});
export default styles;
