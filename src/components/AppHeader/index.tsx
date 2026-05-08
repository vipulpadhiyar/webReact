import React, {memo} from 'react';
import {View, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';

import {AppText} from '../AppText';

import styles from './styles';

/* The `interface AppHeaderProps` is defining the prop types that the `AppHeader` functional component
expects to receive. Here's a breakdown of each prop: */
interface AppHeaderProps {
  text: string;
  containerStyle?: ViewStyle;
  isLeftDisable?: boolean;
  isRightDisable?: boolean;
  leftIcon?: React.FC<SvgProps>;
  rightIcon?: React.FC<SvgProps>;
  titleTestId?: string;
  leftButtonTestId?: string;
  rightButtonTestId?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

/* This code snippet is defining a functional component named `AppHeader` using React and TypeScript.
The component takes in props of type `AppHeaderProps`. */
export const AppHeader = memo((props: AppHeaderProps) => {
  const {text, containerStyle, titleTestId} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerRow}>
        <AppText
          testID={titleTestId}
          text={text}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontColor={AppColors.black}
          fontSize={AppFontSizes[24]}
          numberOfLines={1}
        />
      </View>
    </View>
  );
});
