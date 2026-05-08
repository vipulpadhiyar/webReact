import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

/**
 * Stylesheet for the container component.
 *
 * @exports styles - Stylesheet for the Main screen.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
  },
  subContainer: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[30],
    paddingHorizontal: AppSpacing[16],
  },
  viewButton: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[24],
  },
  viewButtonContainer: {
    justifyContent: 'flex-end',
    paddingRight: AppSpacing[8],
    marginTop: AppSpacing[20],
    flexDirection: 'row',
    columnGap: AppSpacing[10],
    marginBottom: AppSpacing[10],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: AppSpacing[40],
  },
});

export default styles;
