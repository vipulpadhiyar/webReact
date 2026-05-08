import React, {memo, Ref} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppSpacing} from '~/constants';

import {AppSafeAreaContainer} from '../AppSafeAreaContainer';

import styles from './styles';

interface IAppKeyboardAvoidSafeAreaContainer {
  keyboardAvoidViewStyle?: ViewStyle;
  safeAreaContainerStyle?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  scrollChildren?: React.JSX.Element;
  children?: React.JSX.Element;
  headerChildren?: React.JSX.Element;
  showsVerticalScrollIndicator?: boolean;
  scrollRef?: Ref<ScrollView>;
}

// common component that manage keyboard avoiding issue for both platform.
// headerChildren prop for where you need to put your header component.
// scrollChildren prop for where you need to put your TextInput component and other which need to be in scroll
// children props for the bottom of your screen like submit button or component which should be in keyboard avoid view.

export const AppKeyboardAvoidSafeAreaContainer = memo(
  (props: IAppKeyboardAvoidSafeAreaContainer) => {
    const {
      keyboardAvoidViewStyle,
      safeAreaContainerStyle,
      keyboardShouldPersistTaps = 'handled',
      scrollViewStyle,
      headerChildren = <></>,
      children = <></>,
      scrollChildren,
      showsVerticalScrollIndicator = false,
      scrollRef,
    } = props;

    const {bottom} = useSafeAreaInsets();

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        style={[styles.container, keyboardAvoidViewStyle]}>
        <AppSafeAreaContainer containerStyle={safeAreaContainerStyle}>
          {headerChildren}
          {scrollChildren ? (
            <ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              contentContainerStyle={{paddingBottom: bottom + AppSpacing[20]}}
              style={scrollViewStyle}>
              {scrollChildren}
            </ScrollView>
          ) : (
            <></>
          )}
          {children}
        </AppSafeAreaContainer>
      </KeyboardAvoidingView>
    );
  },
);
