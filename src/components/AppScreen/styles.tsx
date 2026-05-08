import {Platform, StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: AppSpacing[42],
    backgroundColor: AppColors.white,
  },
  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    marginTop: AppSpacing[20],
    marginHorizontal: AppSpacing[24],
    alignItems: 'center',
    // justifyContent: 'center',
  },
  back: {
    width: AppSpacing[24],
    height: AppSpacing[24],
    marginRight: AppSpacing[24],
    marginTop: Platform.OS === 'ios' ? 0 : AppSpacing[5],
  },
  headerText: {},
});
export default styles;
