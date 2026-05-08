import React, {memo} from 'react';
import {TextInput, TextInputProps, View, ViewStyle} from 'react-native';

import {AppColors, IcSearch} from '~/constants';

import styles from './styles';
/* This code snippet is defining an interface named `AppSearchBarProps` in TypeScript. Interfaces in
TypeScript are used to define the structure of objects. In this case, `AppSearchBarProps` is
defining the expected props that can be passed to the `AppSearchBar` component. */
interface AppSearchBarProps {
  placeholderText?: string;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  isVoiceSearch?: boolean;
  inputProps?: TextInputProps;
  rightButton?: React.JSX.Element;
  testId?: string;
}

/* This code snippet is defining a functional component named `AppSearchBar` using React and
TypeScript. The component is created as a memoized component using the `memo` function from React.
Memoization helps in optimizing the performance of functional components by preventing unnecessary
re-renders. */
export const AppSearchBar = memo((props: AppSearchBarProps) => {
  const {containerStyle, placeholderText, inputProps, testId, onChangeText} =
    props;

  return (
    <View testID={testId} style={[styles.container, containerStyle]}>
      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor={AppColors.greyLight}
        placeholder={placeholderText}
        style={styles.textInput}
        {...inputProps}
      />
      <IcSearch style={styles.searchIcon} />
    </View>
  );
});
