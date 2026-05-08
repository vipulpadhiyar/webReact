import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    marginTop: AppSpacing[20],
    backgroundColor: AppColors.containerBg,
    borderTopLeftRadius: AppSpacing[30],
    borderTopRightRadius: AppSpacing[30],
  },
  header: {justifyContent: 'center'},
  addBtnContainer: {
    alignItems: 'flex-end',
    paddingTop: AppSpacing[30],
    paddingRight: AppSpacing[20],
    marginBottom: AppSpacing[20],
  },
  addBtn: {
    height: AppSpacing[35],
    paddingVertical: 0,
  },
  listStyle: {},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
});
export default styles;
