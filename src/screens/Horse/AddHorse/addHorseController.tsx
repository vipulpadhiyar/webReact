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
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useFormik} from 'formik';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {FilePickerType} from '~/enums';
import {translate} from '~/localization';
import {
  captureImageFromCamera,
  selectImageFromGallery,
  showError,
} from '~/utils';
import {AddHorseSchema} from '~/validation';

/**
 * The `useAddHorseController` hook is returning an object with the following properties and
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
export const useAddHorseController = () => {
  /**
   *  Navigation and Route Params
   */
  const navigation =
    useNavigation<NavigationProp<HorseProfileStackParamList>>();
  const {params} =
    useRoute<
      RouteProp<HorseProfileStackParamList, AppScreens.AddHorseProfileScreen>
    >();
  const from = params?.from;

  /**
   *  Use States
   */
  const [activeType, setActiveType] = useState<string>('');
  const [fromScreen, setFromScreen] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | number>('');

  /**
   * Model Ref
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
   *  formik for add horse profile form
   * @param {AddHorseProfile} values - The form values.
   * @param {FormikHelpers<AddHorseProfile>} helpers - The formik helpers.
   */
  const formik = useFormik({
    initialValues: {
      name: '',
      barnName: '',
      birthYear: '',
      breed: '',
      gender: '',
      color: '',
      height: '',
      note: '',
      images: [],
    },
    validationSchema: AddHorseSchema,
    onSubmit: (values: AddHorseProfile) => onSubmitHandler(values),
  });

  /**
   *  Focus Effect
   * @param {boolean} isFocused - The focus state.
   */
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setFromScreen(fromScreen === 'login' ? 'login' : from || '');
      if (from === 'review') {
        formik.setValues({
          name: '',
          barnName: '',
          birthYear: '',
          breed: '',
          gender: '',
          color: '',
          height: '',
          note: '',
          images: [],
        });
        formik.setTouched({
          name: false,
          barnName: false,
          birthYear: false,
          breed: false,
          gender: false,
          color: false,
          height: false,
          note: false,
        });
      }
    }
  }, [isFocused, from]);

  /**
   *  Submit Form Handler
   */
  const onSubmitHandler = (values: AddHorseProfile) => {
    Keyboard.dismiss();
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.ReviewHorseDetailsScreen,
        params: {horse: values},
      }),
    );
  };

  /**
   *  Image Select Pressed for Horse Image
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
        quality: 1,
        includeBase64: false,
      });
    } else if (buttonIndex === FilePickerType.GALLERY) {
      imageList = await selectImageFromGallery({
        selectionLimit: 5 - alreadySelected,
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      });
    }

    /**
     *  Filter the selected images based on allowed types and size.
     */
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
   *  on Delete Image
   *  @param {number} index - The index of the image to be deleted.
   *  @returns {void} - This function does not return a value.
   */
  const onDeleteImage = (index: number) => {
    let images = formik.values.images;
    images.splice(index, 1);
    formik.setFieldValue('images', images);
  };

  /**
   *  on Back Pressed
   *  @returns {void} - This function does not return a value.
   */
  const onBack = () => {
    navigation.goBack();
  };

  /**
   *  on Skip Pressed
   *  @returns {void} - This function does not return a value.
   */
  const onSkip = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: AppScreens.AppTab}],
      }),
    );
  };

  return {
    formik,
    horseNameInputRef,
    horseBarnNameInputRef,
    imageUri,
    modalRef,
    modalDeleteRef,
    activeType,
    fromScreen,
    setActiveType,
    openModal,
    closeModal,
    openModalDelete,
    closeModalDelete,
    setImageUri,
    onBack,
    onImageSelectPress,
    onDeleteImage,
    onSkip,
  };
};
