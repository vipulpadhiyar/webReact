import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

/**
 * Stylesheet for the AppButton component.
 *
 * @exports styles - Stylesheet for the AppButton component.
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.peanBlue,
    gap: AppSpacing[8],
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[24],
    borderWidth: AppSpacing[1],
    borderRadius: AppSpacing[100],
  },
  containerDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.peanBlue,
    gap: AppSpacing[8],
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[24],
    borderWidth: AppSpacing[1],
    borderRadius: AppSpacing[100],
    opacity: 0.5,
  },
});

export default styles;
