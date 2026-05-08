/**
 * The `useAddHorseController` function in TypeScript React handles form validation, image selection,
 * modals, and navigation for adding a horse profile.
 * @returns The `useAddHorseController` hook is returning an object with the following properties and
 * functions:
 */
import {useEffect, useRef, useState} from 'react';
import {Keyboard, Platform, TextInput} from 'react-native';
import ActionSheetIOS from 'react-native-action-sheet';
import {Asset} from 'react-native-image-picker';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useFormik} from 'formik';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {FilePickerType} from '~/enums';
import {translate} from '~/localization';
import {
  capitalizeFirstLetter,
  captureImageFromCamera,
  selectImageFromGallery,
  showError,
} from '~/utils';
import {EditHorseSchema} from '~/validation';
/**
 * The `useEditHorseController` hook is returning an object with the following properties and
 * functions:
 * - `formik`: An object containing formik state and helper functions.
 * - `horseNameInputRef`: A reference to the horse name input field.
 * - `horseBarnNameInputRef`: A reference to the horse barn name input field.
 * - `imageUri`: The URI of the selected image.
 * - `modalRef`: A reference to the modal component.
 * - `modalDeleteRef`: A reference to the delete modal component.
 * - `activeType`: The currently active type (e.g., "breed", "gender", etc.).
 * - `setActiveType`: A function to set the active type.
 * - `setImageUri`: A function to set the image URI.
 * - `openModal`: A function to open the modal.
 * - `closeModal`: A function to close the modal.
 * - `openModalDelete`: A function to open the delete modal.
 * - `closeModalDelete`: A function to close the delete modal.
 * - `fromScreen`: The screen from which the user navigated to add a horse profile.
 */
export const useEditHorseController = () => {
  /**
   * Navigation Props
   */
  const navigation =
    useNavigation<NavigationProp<HorseProfileStackParamList>>();

  /**
   * useState Variables
   */
  const [activeType, setActiveType] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | FileType | number>('');

  /**
   *  Modal Reference for View Image and Delete Image Alert
   */
  const modalRef = useRef<RefAppModalProps>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const modalDeleteRef = useRef<RefAppModalProps>(null);

  const openModalDelete = () => {
    modalDeleteRef.current?.open();
  };

  const closeModalDelete = () => {
    modalDeleteRef.current?.close();
  };

  const horseNameInputRef = useRef<TextInput>();
  const horseBarnNameInputRef = useRef<TextInput>();

  /**
   * Route Params for Existing Horse Profile
   */
  const {params} =
    useRoute<
      RouteProp<HorseProfileStackParamList, AppScreens.EditHorseProfileScreen>
    >();

  const horse = params?.horse;
  const initialValues = {
    _id: '',
    name: '',
    barnName: '',
    birthYear: '',
    breed: '',
    gender: '',
    color: '',
    height: '',
    note: '',
    images: [],
  };

  /**
   * Formik with Initial Values
   */
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditHorseSchema,
    onSubmit: (values: EditHorseProfile) => onSubmitHandler(values),
  });
  /**
   * useEffect with Update Formik Values from Existing Horse Profile
   */
  useEffect(() => {
    formik.setValues(initialValues);
    if (horse) {
      formik.setValues({...horse} as EditHorseProfile);
      formik.setFieldValue('gender', capitalizeFirstLetter(horse.gender));
    }
    return () => {};
  }, [horse]);

  /**
   *  Submit Form for Review
   */
  const onSubmitHandler = (values: EditHorseProfile) => {
    Keyboard.dismiss();
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.ReviewHorseDetailsScreen,
        params: {horse: values},
      }),
    );
  };

  /**
   * On Select Image Upload Option Function
   */
  const onImageSelectPress = async () => {
    const menuItems =
      Platform.OS === 'ios'
        ? [translate('CAMERA'), translate('GALLERY'), translate('CANCEL')]
        : [translate('CAMERA'), translate('GALLERY')];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: menuItems,
        cancelButtonIndex: FilePickerType.CANCEL,
        destructiveButtonIndex: FilePickerType.CANCEL,
      },
      (i: number) => onOptionSelect(i),
    );
  };

  /**
   * Handle the option selection from the action sheet.
   * @param {number} buttonIndex - The index of the selected option.
   */
  const onOptionSelect = async (buttonIndex: number) => {
    let imageList: FileType[] = [];
    let alreadySelected = formik.values.images.length;
    if (buttonIndex === FilePickerType.CAMERA) {
      imageList = await captureImageFromCamera({
        selectionLimit: 5 - alreadySelected,
        mediaType: 'photo',
        quality: 0.2,
      });
    } else if (buttonIndex === FilePickerType.GALLERY) {
      imageList = await selectImageFromGallery({
        selectionLimit: 5 - alreadySelected,
        mediaType: 'photo',
        quality: 0.2,
      });
    }

    // Filter for Images and Size
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 25 * 1024 * 1024; // 25 MB

    let updatedImageList: Asset[] = [];
    imageList.forEach(image => {
      if (allowedTypes.includes(image.type) && image.fileSize <= maxSize) {
        updatedImageList.push(image);
      }
    });

    if (updatedImageList && updatedImageList.length > 0) {
      formik.setFieldValue('images', [
        ...formik.values.images,
        ...updatedImageList,
      ]);
    }
    if (updatedImageList.length !== imageList.length) {
      showError(translate('ImagesIgnored'));
    }
  };

  /**
   * Delete Image based on Index
   */
  const onDeleteImage = (index: number) => {
    let images = [...formik.values.images];
    images.splice(index, 1);
    formik.setFieldValue('images', images);
  };

  /**
   * On Back Pressed Function
   */
  const onBack = () => {
    navigation.goBack();
  };

  return {
    formik,
    horseNameInputRef,
    horseBarnNameInputRef,
    imageUri,
    activeType,
    modalRef,
    modalDeleteRef,
    setActiveType,
    openModal,
    closeModal,
    openModalDelete,
    closeModalDelete,
    setImageUri,
    onBack,
    onImageSelectPress,
    onDeleteImage,
  };
};
