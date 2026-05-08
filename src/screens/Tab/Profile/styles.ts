import {Platform, StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingTop: Platform.OS === 'ios' ? AppSpacing[42] : 0,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    marginTop: AppSpacing[24],
    marginHorizontal: AppSpacing[24],
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyle: {
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
    shadowColor: AppColors.black,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: AppSpacing[3]},
    borderWidth: 0,
    elevation: 5,
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[20],
  },
  subContainer: {
    backgroundColor: AppColors.containerBg,
    height: '100%',
    marginTop: AppSpacing[20],
    paddingTop: AppSpacing[50],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[30],
  },
  content: {paddingBottom: 100},
});
