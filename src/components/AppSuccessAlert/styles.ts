import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginHorizontal: AppSpacing[20],
    padding: AppSpacing[20],
    borderRadius: AppSpacing[20],
  },
  topContainer: {
    alignItems: 'center',
  },
  title: {
    marginTop: AppSpacing[20],
    textAlign: 'center',
    marginBottom: AppSpacing[10],
    width: '100%',
  },
  message: {
    textAlign: 'center',
    marginBottom: AppSpacing[20],
  },
  buttonView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  confirm: {
    paddingVertical: 0,
    paddingHorizontal: AppSpacing[30],
    height: AppSpacing[45],
  },
  cancel: {
    paddingVertical: 0,
    paddingHorizontal: AppSpacing[30],
    height: AppSpacing[45],
    backgroundColor: AppColors.white,
    marginTop: AppSpacing[20],
  },
});
