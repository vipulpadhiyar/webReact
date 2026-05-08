import React, {memo, useMemo} from 'react';
import {ScrollView, ScrollViewProps, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppSpacing} from '~/constants';

interface AppScrollViewProps extends ScrollViewProps {
  extraContentContainerStyle?: ViewStyle;
  children?: React.JSX.Element | React.JSX.Element[];
}

export const AppScrollView = memo(
  (props: AppScrollViewProps): React.JSX.Element => {
    const {children, extraContentContainerStyle} = props;

    const {bottom} = useSafeAreaInsets();

    const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
      let style = {};
      if (children) {
        style = {
          paddingBottom: bottom + AppSpacing[20],
        };
      }
      if (extraContentContainerStyle) {
        style = {
          ...style,
          ...extraContentContainerStyle,
        };
      }
      return style;
    }, [props, bottom, extraContentContainerStyle]);

    return (
      <ScrollView
        bounces={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...props}>
        {children}
      </ScrollView>
    );
  },
);
