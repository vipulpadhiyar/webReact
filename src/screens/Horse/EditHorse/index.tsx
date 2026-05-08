import React from 'react';
import {View} from 'react-native';

import {
  AppButton,
  AppConfirmAlert,
  AppDropdown,
  AppHorseImage,
  AppModal,
  AppScreen,
  AppScrollView,
  AppText,
  AppTextInput,
  AppTouchable,
} from '~/components';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  IcBarn,
  IcCalender,
  IcDownArrow,
  IcGender,
  IcHorse,
  IcHorseHeight,
  IcNote,
  IcUpload,
} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {DropdownType, HorseBreed, HorseColor, HorseGender} from '~/enums/horse';
import {generateList} from '~/helpers/Horse';
import {generateYearOptions} from '~/helpers/YearGenerator';
import {translate} from '~/localization';

import {HorseImageListItem} from '../Components/HorseImageListItem';

import {useEditHorseController} from './editHorseController';
import styles from './styles';

export const EditHorseScreen = () => {
  const {
    formik,
    horseNameInputRef,
    horseBarnNameInputRef,
    imageUri,
    modalRef,
    modalDeleteRef,
    activeType,
    setActiveType,
    setImageUri,
    openModal,
    closeModal,
    openModalDelete,
    closeModalDelete,
    onImageSelectPress,
    onDeleteImage,
    onBack,
  } = useEditHorseController();

  /**
   * function onView takes file type or string and opens modal view for selected image
   */
  const onView = (image: FileType | string) => {
    if (typeof image === 'string') {
      setImageUri(image);
    } else {
      setImageUri(image.uri);
    }
    openModal();
  };
  /**
   *  closeDropdown will close any active dropdown on text input focus
   */
  const closeDropdown = () => setActiveType('');

  /**
   * handleNameInput will handle next key
   */
  const handleNameInput = () => horseBarnNameInputRef.current?.focus();

  /**
   * The `handleSubmit` function dismisses the keyboard and triggers the submission of a form using
   * Formik in a TypeScript React application.
   */
  const handleSubmit = () => {
    formik.handleSubmit();
  };

  /**
   * handle delete will close confirm alert and removed selected image from list
   */
  const handleDelete = () => {
    closeModalDelete();
    onDeleteImage(Number(imageUri));
  };

  /**
   * getYears will be a reverse list from current year - 50 for birth year dropdown
   */
  const getYears = generateYearOptions(
    new Date().getFullYear() - 50,
    new Date().getFullYear(),
  ).reverse();

  return (
    <AppScreen header={translate('EditHorseProfile')} onBack={onBack}>
      <View style={styles.container}>
        <AppScrollView>
          <View style={styles.subcontainer}>
            <AppTextInput
              inputIcon={IcHorse}
              inputRef={horseNameInputRef}
              value={formik.values.name}
              labelText={translate('HorseName')}
              containerStyle={styles.inputContainerStyle}
              onChangeText={formik.handleChange('name')}
              errorText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ''
              }
              placeholder={translate('AddHorseName')}
              keyboardType="default"
              returnKeyType="next"
              onFocus={closeDropdown}
              onSubmitEditing={handleNameInput}
            />

            <AppTextInput
              inputIcon={IcBarn}
              inputRef={horseBarnNameInputRef}
              value={formik.values.barnName}
              labelText={translate('HorseBarnName')}
              containerStyle={styles.inputContainerStyle}
              onChangeText={formik.handleChange('barnName')}
              errorText={
                formik.touched.barnName && formik.errors.barnName
                  ? formik.errors.barnName
                  : ''
              }
              placeholder={translate('AddHorseBarnName')}
              keyboardType="default"
              returnKeyType="next"
              onFocus={closeDropdown}
            />

            <AppDropdown
              inputIcon={IcCalender}
              inputRef={horseBarnNameInputRef}
              value={formik.values.birthYear}
              labelText={translate('HorseBirthYear')}
              containerStyle={styles.inputContainerStyle}
              errorText={
                formik.touched.birthYear && formik.errors.birthYear
                  ? formik.errors.birthYear
                  : ''
              }
              placeholder={translate('SelectHorseBirthYear')}
              data={getYears}
              onSelect={item => {
                formik.setFieldValue('birthYear', item.label);
              }}
              type={DropdownType.BirthYear}
              activeType={activeType}
              onOpen={setActiveType}
            />

            <AppDropdown
              inputIcon={IcHorse}
              value={formik.values.breed}
              labelText={translate('HorseBreed')}
              containerStyle={styles.inputContainerStyle}
              errorText={
                formik.touched.breed && formik.errors.breed
                  ? formik.errors.breed
                  : ''
              }
              placeholder={translate('SelectHorseBreed')}
              data={generateList(HorseBreed)}
              onSelect={item => {
                formik.setFieldValue('breed', item.label);
              }}
              rightIcon={IcDownArrow}
              type={DropdownType.Breed}
              activeType={activeType}
              onOpen={setActiveType}
            />
            <AppDropdown
              inputIcon={IcGender}
              value={formik.values.gender}
              labelText={translate('HorseGender')}
              containerStyle={styles.inputContainerStyle}
              errorText={
                formik.touched.gender && formik.errors.gender
                  ? formik.errors.gender
                  : ''
              }
              placeholder={translate('SelectHorseGender')}
              data={generateList(HorseGender)}
              onSelect={item => {
                formik.setFieldValue('gender', item.value);
              }}
              rightIcon={IcDownArrow}
              type={DropdownType.Gender}
              activeType={activeType}
              onOpen={setActiveType}
            />
            <AppDropdown
              inputIcon={IcHorse}
              value={formik.values.color}
              labelText={translate('HorseColor')}
              containerStyle={styles.inputContainerStyle}
              errorText={
                formik.touched.color && formik.errors.color
                  ? formik.errors.color
                  : ''
              }
              placeholder={translate('SelectHorseColor')}
              data={generateList(HorseColor)}
              onSelect={item => {
                formik.setFieldValue('color', item.label);
              }}
              rightIcon={IcDownArrow}
              type={DropdownType.Color}
              activeType={activeType}
              onOpen={setActiveType}
            />

            <AppTextInput
              inputIcon={IcHorseHeight}
              value={String(formik.values.height)}
              labelText={
                translate('HorseHeight') + ' (' + translate('Hands') + ')'
              }
              containerStyle={styles.inputContainerStyle}
              onChangeText={formik.handleChange('height')}
              errorText={
                formik.touched.height && formik.errors.height
                  ? formik.errors.height
                  : ''
              }
              placeholder={translate('AddHorseHeight')}
              keyboardType="decimal-pad"
              returnKeyType="next"
              maxLength={5}
              onFocus={closeDropdown}
            />

            <AppTextInput
              inputIcon={IcNote}
              value={formik.values.note}
              labelText={translate('PleaseAddDetails')}
              containerStyle={
                formik.values.images.length === 5
                  ? styles.noteInputContainerStyle
                  : styles.inputContainerStyle
              }
              onChangeText={formik.handleChange('note')}
              errorText={
                formik.touched.note && formik.errors.note
                  ? formik.errors.note
                  : ''
              }
              placeholder={translate('ExampleJustinwillpawforfirst')}
              multiline
              onFocus={closeDropdown}
            />

            {formik.values.images.length === 5 ? null : (
              <>
                <AppText
                  text={
                    translate('HorseImages') +
                    ' (' +
                    translate('Optional') +
                    ')'
                  }
                  fontFamily={AppFonts.GentiumBasic_Regular}
                  fontSize={AppFontSizes[16]}
                  containerStyle={styles.inputContainerStyle}
                />

                <AppTouchable onPress={onImageSelectPress}>
                  <View style={styles.uploadContainer}>
                    <IcUpload />
                    <AppText
                      text={translate('ClicktoUpload')}
                      fontFamily={AppFonts.GentiumBasic_Regular}
                      fontSize={AppFontSizes[14]}
                      style={styles.uploadText}
                    />
                    <AppText
                      text={
                        '(' +
                        translate('MaxFileSize') +
                        ' 25 ' +
                        translate('MB') +
                        ')'
                      }
                      fontFamily={AppFonts.GentiumBasic_Regular}
                      fontSize={AppFontSizes[10]}
                    />
                  </View>
                </AppTouchable>
                {formik.errors.images && (
                  <AppText text={String(formik.errors.images)} />
                )}
              </>
            )}
          </View>
          <View>
            <View style={styles.images}>
              {formik.values.images.map((image: any, index) => {
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
                    onDelete={() => {
                      setImageUri(index);
                      openModalDelete();
                    }}
                  />
                );
              })}
            </View>
            <AppButton
              text={translate('Next')}
              containerStyle={styles.btnContainer}
              textColor={AppColors.white}
              onPress={handleSubmit}
            />
          </View>
        </AppScrollView>

        <AppModal ref={modalDeleteRef}>
          <AppConfirmAlert
            title={translate('DeleteHorseImage')}
            message={translate('AreYouSureWantToDeleteHorseImage')}
            leftBtnText={translate('Confirm')}
            rightBtnText={translate('Cancel')}
            onLeftPress={handleDelete}
            onRightPress={closeModalDelete}
          />
        </AppModal>

        <AppModal ref={modalRef}>
          <AppHorseImage image={String(imageUri)} onPressClose={closeModal} />
        </AppModal>
      </View>
    </AppScreen>
  );
};
