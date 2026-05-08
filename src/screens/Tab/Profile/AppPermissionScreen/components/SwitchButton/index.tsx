import React, {memo} from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import ToggleSwitch from 'toggle-switch-react-native';

import {AppSvgButton, AppText} from '~/components';
import {AppColors, AppFonts, AppFontSizes} from '~/constants';

import {styles} from './styles';
type SwitchButtonProps = {
  title: string;
  leftIcon: React.FC<SvgProps>;
  enable: boolean;
  onToggle: () => void;
};
export const SwitchButton = memo((props: SwitchButtonProps) => {
  const {title, leftIcon, enable, onToggle} = props;

  return (
    <View style={styles.container}>
      <View style={styles.buttonStyle}>
        <View style={styles.iconTextContainer}>
          <AppSvgButton icon={leftIcon} />
          <AppText
            text={title}
            fontColor={AppColors.peanBlue}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppFontSizes[16]}
          />
        </View>
        <View style={styles.switchContainer}>
          <ToggleSwitch
            trackOnStyle={styles.trackOnStyle}
            trackOffStyle={styles.trackOffStyle}
            thumbOnStyle={styles.thumbColor}
            thumbOffStyle={styles.thumbColor}
            onToggle={onToggle}
            isOn={enable}
            size={'small'}
          />
        </View>
      </View>
    </View>
  );
});
