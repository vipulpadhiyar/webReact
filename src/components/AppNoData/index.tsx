import React, {memo} from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';
import {translate as t} from '~/localization';

import {AppText} from '../AppText';

import {styles} from './styles';

/* The `interface AppNoDataProps` is defining the props that can be passed to the `AppNoData`
component. It specifies three optional properties: */
interface AppNoDataProps {
  text?: string;
  icon?: React.FC<SvgProps>;
  fontSize?: number;
}

/* This code snippet is defining a functional component named `AppNoData` using the `memo` higher-order
component from React. The component takes in props of type `AppNoDataProps`, which specifies three
optional properties: `text`, `icon`, and `fontSize`. */
export const AppNoData = memo((props: AppNoDataProps) => {
  const {text, fontSize} = props;
  return (
    <View style={styles.container}>
      {props.icon ? <props.icon /> : <></>}
      <AppText
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={fontSize ?? AppFontSizes[16]}
        fontColor={AppColors.black}
        text={text || t('NO_DATA_FOUND')}
      />
    </View>
  );
});
