import React, {memo, PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';

/**
 * Represents a memoized container component that wraps its children with SafeAreaView.
 * @param {AppContainerProps} props - Component props.
 * @returns {JSX.Element} - React element.
 *
 * @exports AppContainer - Memoized container component.
 */

// Define the props type for the AppContainer component
type AppContainerProps = PropsWithChildren<{
  children: React.JSX.Element | React.JSX.Element[]; // Children elements
  containerStyle?: ViewStyle[] | ViewStyle; // Optional container style
  testID?: string; // Test ID for testing
}>;

/**
 * Memoized container component.
 */
export const AppContainer = memo(
  ({children, containerStyle, testID}: AppContainerProps) => {
    return (
      // SafeAreaView wrapper for children
      <SafeAreaView
        testID={testID} // Test ID for testing
        style={[styles.container, containerStyle]} // Merged style with default style
        edges={['right', 'top', 'left']} // SafeAreaView edges
      >
        {children}
      </SafeAreaView>
    );
  },
);
