import React from 'react';
import {View} from 'react-native';

import {AppButton, AppImageLoader, AppText} from '~/components';
import {AppColors, AppFonts, AppSpacing} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {translate} from '~/localization';
import {capitalizeFirstLetter, completeUrl} from '~/utils';

import styles from './styles';

interface IHorseListItem {
  horse: HorseProfile;
  onDetails: (horse: HorseProfile) => void;
}

export const HorseListItem = (props: IHorseListItem) => {
  const {horse, onDetails} = props;

  const onDetailsClick = () => onDetails(horse);

  return (
    <View style={styles.content}>
      <View style={styles.nameImageView}>
        {horse.images && horse.images.length > 0 && (
          <AppImageLoader
            source={completeUrl(horse.images[0], Bucket.HORSE)}
            imageStyle={styles.imageView}
          />
        )}
        <View style={styles.nameView}>
          <AppText
            text={capitalizeFirstLetter(horse.name)}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[20]}
          />
          <AppText
            text={horse.breed}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
            fontColor={AppColors.subTextColor}
          />
        </View>
      </View>
      <View style={styles.barnColorView}>
        <View style={styles.nameView}>
          <AppText
            text={translate('HorseBarnName')}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
          />
          <AppText
            text={horse.barnName}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.subTextColor}
          />
        </View>
        <View style={styles.nameView}>
          <AppText
            text={translate('HorseColor')}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
          />
          <AppText
            text={horse.color}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.subTextColor}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.viewBtnContainer}>
        <AppButton
          text={translate('ViewProfile')}
          textFontFamily={AppFonts.GentiumBasic_Bold}
          containerStyle={styles.viewBtn}
          textSize={AppSpacing[14]}
          onPress={onDetailsClick}
        />
      </View>
    </View>
  );
};
