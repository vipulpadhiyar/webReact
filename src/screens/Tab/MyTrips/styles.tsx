import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_HEIGHT} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.containerBg,
    borderTopLeftRadius: AppSpacing[30],
    borderTopRightRadius: AppSpacing[30],
    paddingTop: AppSpacing[30],
  },
  header: {justifyContent: 'center'},
  emptyContainer: {
    paddingTop: SCREEN_HEIGHT * 0.05,
    alignSelf: 'center',
  },
});
export default styles;
