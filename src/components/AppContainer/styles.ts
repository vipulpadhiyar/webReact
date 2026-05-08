import {StyleSheet} from 'react-native';

import {AppColors} from '~/constants';

/**
 * Stylesheet for the container component.
 *
 * @exports styles - Stylesheet for the AppContainer component.
 */
const styles = StyleSheet.create({
  // Style for the container
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});

export default styles;
