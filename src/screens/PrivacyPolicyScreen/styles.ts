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
  },
  back: {
    width: AppSpacing[24],
    height: AppSpacing[24],
  },
  headerText: {
    marginLeft: AppSpacing[20],
  },
  subContainer: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[30],
  },
  webView: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginHorizontal: AppSpacing[20],
    marginTop: AppSpacing[30],
    borderRadius: AppSpacing[16],
    overflow: 'hidden',
    padding: AppSpacing[10],
    marginBottom: AppSpacing[20],
    paddingVertical: AppSpacing[20],
  },
});
