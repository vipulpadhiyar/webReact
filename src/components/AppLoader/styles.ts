import {StyleSheet} from 'react-native';

import {AppColors} from '~/constants';

/**
 * Stylesheet for the AppLoader component.
 *
 * @exports styles - Stylesheet for the AppLoader component.
 */
const styles = StyleSheet.create({
  // Style for the container of the modal loader
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.modalOverlay,
  },
});

export default styles;
