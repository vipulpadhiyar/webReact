/**
 * The `AppHorseImage` component displays an image of a horse with a close button and header text.
 * @param {IAppHorseImageProps} props - The `props` object in the `AppHorseImage` component consists of
 * two properties:
 * @returns The `AppHorseImage` component is being returned. It consists of a View containing a
 * headerView with an `AppText` component and an `AppSvgButton` component, and an Image component
 * displaying the image passed as a prop.
 */
import React from 'react';
import {Image, View} from 'react-native';

import {
  AppColors,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcClose,
} from '~/constants';
import {translate} from '~/localization';

import {AppSvgButton} from '../AppSvgButton';
import {AppText} from '../AppText';

import {styles} from './styles';

interface IAppHorseImageProps {
  image: string;
  onPressClose: () => void;
}

export const AppHorseImage = (props: IAppHorseImageProps) => {
  const {image, onPressClose} = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <AppText
          text={translate('HorseImage')}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontSize={AppFontSizes[20]}
          fontColor={AppColors.peanBlue}
        />
        <AppSvgButton icon={IcClose} onPress={onPressClose} />
      </View>
      <Image
        source={{uri: image}}
        style={styles.img}
        resizeMode={'contain'}
        borderRadius={AppSpacing[13]}
      />
    </View>
  );
};
