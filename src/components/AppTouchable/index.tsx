import React, {memo, PropsWithChildren} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

/**
 * Defines the props for the AppTouchable component, which extends TouchableOpacityProps with additional properties.
 */
type AppTouchableProps = PropsWithChildren<TouchableOpacityProps> & {
  children?: React.JSX.Element | React.JSX.Element[];
};

/**
 * Represents a memoized touchable component that wraps TouchableOpacity.
 * @param {AppTouchableProps} props - Component props.
 * @returns {JSX.Element} - React element.
 * @exports AppTouchable - Memoized touchable component.
 */
export const AppTouchable = memo(
  (props: AppTouchableProps): React.JSX.Element => {
    const {children} = props;

    return children ? (
      <TouchableOpacity activeOpacity={0.8} {...props}>
        {children}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity activeOpacity={0.8} {...props} />
    );
  },
);
