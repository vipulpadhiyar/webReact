import React from 'react';
import {View} from 'react-native';

import {
  AppButton,
  AppConfirmAlert,
  AppHorseImageSwipe,
  AppModal,
  AppScreen,
  AppScrollView,
  AppSuccessAlert,
  AppText,
} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';
import {translate} from '~/localization';
import {capitalizeFirstLetter} from '~/utils';

import {HorseImage} from '../Components/HorseImage';

import {useHorseDetailController} from './horseDetailsController';
import styles from './styles';

export const HorseDetailsScreen = () => {
  const {
    horse,
    imageUri,
    modalRef,
    modalDeleteRef,
    modalSuccessRef,
    onBack,
    onEdit,
    onDelete,
    setImageUri,
    openModal,
    closeModal,
    openModalDelete,
    closeModalDelete,
    onDone,
  } = useHorseDetailController();
  /**
   *  onView for view selected image in popup view for large viewing experience
   */
  const onView = (index: number) => {
    setImageUri(index);
    openModal();
  };

  /**
   * onDeleteProfile will close confirm popup and will trigger delete horse api
   */
  const onDeleteProfile = () => {
    closeModalDelete();
    setTimeout(() => {
      onDelete(); //timeout for ios issue
    }, 1000);
  };
  return (
    <AppScreen header={translate('HorseProfile')} onBack={onBack}>
      <View style={styles.container}>
        <AppScrollView>
          <View style={styles.subcontainer}>
            <View style={styles.detailView}>
              <View style={styles.nameView}>
                <AppText
                  text={translate('HorseName')}
                  fontFamily={AppFonts.GentiumBasic_Regular}
                  fontSize={AppSpacing[16]}
                />
                <AppText
                  text={capitalizeFirstLetter(horse.name)}
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
              <View style={styles.imageView}>
                <View style={styles.nameView}>
                  <AppText
                    text={translate('HorseImages')}
                    fontFamily={AppFonts.GentiumBasic_Regular}
                    fontSize={AppSpacing[16]}
                  />
                  <View style={styles.grid}>
                    {horse.images.map((image: any, index: number) => {
                      return (
                        <HorseImage
                          key={
                            image.name
                              ? String(index + image.name)
                              : String(index + image)
                          }
                          index={index}
                          image={image}
                          onView={onView}
                        />
                      );
                    })}
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.buttonView}>
            <AppButton
              text={translate('EditProfile')}
              containerStyle={styles.confirm}
              textSize={AppFontSizes[16]}
              onPress={onEdit}
            />
            <AppButton
              text={translate('DeleteProfile')}
              containerStyle={styles.cancel}
              textSize={AppFontSizes[16]}
              textColor={AppColors.peanBlue}
              onPress={openModalDelete}
            />
          </View>
        </AppScrollView>
        <AppModal ref={modalRef}>
          <AppHorseImageSwipe
            imageList={horse.images}
            selectedIndex={Number(imageUri)}
            onPressClose={closeModal}
          />
        </AppModal>
        <AppModal ref={modalDeleteRef}>
          <AppConfirmAlert
            title={translate('DeleteHorseProfile')}
            message={translate('AreYouSureWantToDeleteHorseProfile')}
            leftBtnText={translate('Confirm')}
            rightBtnText={translate('Cancel')}
            onLeftPress={onDeleteProfile}
            onRightPress={closeModalDelete}
          />
        </AppModal>
        <AppModal ref={modalSuccessRef}>
          <AppSuccessAlert
            title={translate('DeleteHorse')}
            message={translate('HorseProfileDeletedSuccessfully')}
            topBtnText={translate('Done')}
            onTopPress={onDone}
          />
        </AppModal>
      </View>
    </AppScreen>
  );
};
