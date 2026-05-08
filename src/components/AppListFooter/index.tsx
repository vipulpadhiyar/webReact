import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';

import {AppColors} from '~/constants';

import {styles} from './styles';

interface AppListFooterProps {
  isVisible: boolean;
}

/* design for infinite scroll loading indicated for flatlist*/

/* This code snippet is defining a functional component named `AppListFooter` using React's `memo`
higher-order component. The component takes in a single prop `isVisible` of type boolean through the
`AppListFooterProps` interface. */
export const AppListFooter = memo((props: AppListFooterProps) => {
  const {isVisible} = props;
  return (
    isVisible && (
      <ActivityIndicator
        size={'small'}
        color={AppColors.black}
        style={styles.bottomLoader}
      />
    )
  );
});
