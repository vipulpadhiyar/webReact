import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

/**
 * Stylesheet for the AppButton component.
 *
 * @exports styles - Stylesheet for the AppButton component.
 */
const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
  },
  headerDivider: {
    height: AppSpacing[2],
    backgroundColor: AppColors.white,
  },
  button: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: AppSpacing[10],
  },
});

export default styles;
