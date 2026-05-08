import React, {memo} from 'react';
import {TouchableOpacityProps, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppTouchable} from '../AppTouchable';

import {styles} from './styles';

interface AppSvgButtonProps extends TouchableOpacityProps {
  containerStyle?: ViewStyle;
  icon: React.FC<SvgProps>;
  svgProps?: SvgProps;
}

export const AppSvgButton = memo((props: AppSvgButtonProps) => {
  const {containerStyle, svgProps} = props;

  return (
    <AppTouchable style={[styles.container, containerStyle]} {...props}>
      <props.icon {...svgProps} />
    </AppTouchable>
  );
});
