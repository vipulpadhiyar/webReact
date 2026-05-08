import React from 'react';
import {View} from 'react-native';

import {AppText} from '~/components';
import {AppColors, AppFonts, AppFontSizes} from '~/constants';

import {styles} from './styles';

type AvatarType = {
  getInitials: string;
  name: string;
};

const Avatar = (props: AvatarType) => {
  const {getInitials, name} = props;
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <AppText
          fontSize={AppFontSizes[24]}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontColor={AppColors.white}
          text={getInitials}
        />
      </View>
      <AppText
        fontSize={AppFontSizes[20]}
        fontFamily={AppFonts.GentiumBasic_Bold}
        fontColor={AppColors.peanBlue}
        containerStyle={styles.nameContainer}
        text={name}
      />
    </View>
  );
};

export default Avatar;
