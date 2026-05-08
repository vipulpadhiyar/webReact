import React from 'react';
import {View} from 'react-native';

import {
  AppButton,
  AppHorseImage,
  AppModal,
  AppScreen,
  AppScrollView,
  AppSuccessAlert,
  AppText,
} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {translate} from '~/localization';

import {HorseImageListItem} from '../Components/HorseImageListItem';

import {useReviewHorseDetailController} from './reviewHorseDetailsController';
import styles from './styles';

export const ReviewHorseDetailsScreen = () => {
  const {
    horse,
    imageUri,
    modalRef,
    modaSuccessRef,
    modaSuccesEditsRef,
    onBack,
    onSubmit,
    setImageUri,
    openModal,
    closeModal,
    onDone,
    onAddAnother,
  } = useReviewHorseDetailController();

  const onView = (image: FileType | string) => {
    if (typeof image === 'string') {
      setImageUri(image);
    } else {
      setImageUri(image.uri);
    }
    openModal();
  };

  return (
    <AppScreen header={translate('ReviewDetails')} onBack={onBack}>
      <AppScrollView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.detailView}>
            <View style={styles.nameView}>
              <AppText
                text={translate('HorseName')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={horse.name}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
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
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
          <View style={styles.detailView}>
            <View style={styles.nameView}>
              <AppText
                text={translate('HorseBirthYear')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={String(horse.birthYear)}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
            <View style={styles.nameView}>
              <AppText
                text={translate('HorseGender')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={horse.gender}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
          <View style={styles.detailView}>
            <View style={styles.nameView}>
              <AppText
                text={translate('HorseHeight')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={String(horse.height)}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
            <View style={styles.nameView}>
              <AppText
                text={translate('HorseBreed')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={horse.breed}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
          <View style={styles.detailView}>
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
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
          <View style={styles.detailView}>
            <View style={styles.nameView}>
              <AppText
                text={translate('Notes')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={horse.note}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                containerStyle={styles.subtextView}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
          {horse.images.length > 0 && (
            <View style={styles.images}>
              <AppText
                text={translate('Images')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <View>
                {horse.images.map((image: any, index) => {
                  return (
                    <HorseImageListItem
                      bucket={Bucket.HORSE}
                      key={
                        image.name
                          ? String(index + image.name)
                          : String(index + image)
                      }
                      image={image}
                      onView={onView}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </View>
        <View style={styles.buttonView}>
          <AppButton
            text={translate('Submit')}
            containerStyle={styles.confirm}
            textSize={AppFontSizes[16]}
            onPress={onSubmit}
          />
          <AppButton
            text={translate('Edit')}
            containerStyle={styles.cancel}
            textSize={AppFontSizes[16]}
            textColor={AppColors.peanBlue}
            onPress={onBack}
          />
        </View>
      </AppScrollView>
      <AppModal ref={modaSuccessRef}>
        <AppSuccessAlert
          title={translate('HorseProfileAddedSuccessfully')}
          message={translate('ToEditOrDelete')}
          topBtnText={translate('Done')}
          bottomBtnText={translate('AddAnotherHorse')}
          onTopPress={onDone}
          onBottomPress={onAddAnother}
        />
      </AppModal>
      <AppModal ref={modaSuccesEditsRef}>
        <AppSuccessAlert
          title={translate('HorseUpdated')}
          message={translate('HorseProfileUpdatedSuccessfully')}
          topBtnText={translate('Done')}
          onTopPress={onDone}
        />
      </AppModal>
      <AppModal ref={modalRef}>
        <AppHorseImage image={String(imageUri)} onPressClose={closeModal} />
      </AppModal>
    </AppScreen>
  );
};
