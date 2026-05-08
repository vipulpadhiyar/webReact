import {Platform, StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollContainer: {
    flex: 1,
    marginTop: AppSpacing[12],
    paddingHorizontal: AppSpacing[16],
    borderTopLeftRadius: AppSpacing[24],
    borderTopRightRadius: AppSpacing[24],
    backgroundColor: AppColors.containerBg,
  },
  header: {justifyContent: 'center'},
  statusContainer: {
    flexDirection: 'row',
    columnGap: AppSpacing[10],
    paddingVertical: AppSpacing[20],
  },
  searchAddressStyle: {
    fontFamily: AppFonts.GentiumBasic_Bold,
    fontSize: AppFontSizes[14],
    color: AppColors.peanBlue,
    padding: 0,
    marginHorizontal: AppSpacing[10],
    flex: 1,
  },
  searchContainerStyle: {
    marginVertical: AppSpacing[16],
    marginHorizontal: AppSpacing[16],
  },
  statusStyle: {
    paddingRight: AppSpacing[16],
  },
  statusListStyle: {
    padding: AppSpacing[10],
    height: AppSpacing[20],
  },
  flatListStyle: {
    height: AppSpacing[50],
  },
  flatListContainer: {alignItems: 'center'},
  contentContainerStyle: {
    rowGap: AppSpacing[25],
    marginVertical: AppSpacing[20],
    paddingBottom: AppSpacing[40],
  },
  listStatusContainer: {
    marginVertical: AppSpacing[16],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : AppSpacing[10],
  },
});
export default styles;
