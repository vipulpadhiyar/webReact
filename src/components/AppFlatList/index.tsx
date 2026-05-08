import React, {memo, useMemo} from 'react';
import {FlatList, FlatListProps, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppSpacing} from '~/constants';
import {keyExtractorHandler} from '~/utils';

import {AppNoData} from '../AppNoData';

interface AppFlatListProps extends FlatListProps<unknown> {
  extraContentContainerStyle?: ViewStyle;
}

/* This code snippet is defining a React functional component named `AppFlatList`. Here's a breakdown
of what it does: */
export const AppFlatList = memo(
  (props: AppFlatListProps): React.JSX.Element => {
    const {bottom} = useSafeAreaInsets();

    const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
      let style = {};
      if (props.data?.length === 0 || props?.data === undefined) {
        style = {
          ...style,
          flexGrow: 1,
          justifyContent: 'center',
        };
      }
      if (props?.data && props?.data.length !== 0) {
        style = {
          ...style,
          paddingBottom: bottom + AppSpacing[20],
        };
      }
      if (props?.extraContentContainerStyle) {
        style = {
          ...style,
          ...props.extraContentContainerStyle,
        };
      }
      return style;
    }, [props]);

    return (
      <FlatList
        bounces={true}
        ListEmptyComponent={AppNoData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractorHandler}
        contentContainerStyle={contentContainerStyle}
        {...props}
      />
    );
  },
);
