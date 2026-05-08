import {StyleSheet} from 'react-native';
import {Theme} from '@react-navigation/native';

/**
 * Stylesheet for the container component.
 *
 * @exports styles - Stylesheet for the Main screen.
 */
const styles = (theme: Theme) =>
  StyleSheet.create({
    // Style for the screen.
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

export default styles;
