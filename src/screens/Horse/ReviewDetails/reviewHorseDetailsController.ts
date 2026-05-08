import {useRef, useState} from 'react';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import Loader from '~/helpers/Loader';
import {
  useAddHorseApiAction,
  useEditHorseApiAction,
  useFileUploadApiAction,
} from '~/store';
import {log, showError} from '~/utils';

export const useReviewHorseDetailController = () => {
  const navigation =
    useNavigation<NavigationProp<HorseProfileStackParamList>>();
  /**
   * Handle navigation for home screen
   */
  const navigationTypeHome =
    useNavigation<NavigationProp<HomeScreenStackParamList>>();
  /**
   * Handle navigation for quotes screen
   */
  const navigationTypeQuotes =
    useNavigation<NavigationProp<QuotesStackParamList>>();
  const {params} =
    useRoute<
      RouteProp<HorseProfileStackParamList, AppScreens.ReviewHorseDetailsScreen>
    >();
  /**
   * Params for edit trip
   */
  const {params: editTrip} =
    useRoute<RouteProp<QuotesStackParamList, AppScreens.EditTripDetails>>();

  const {mutateAsync: fileUpload} = useFileUploadApiAction();
  const {mutateAsync: addHorse} = useAddHorseApiAction();
  const {mutateAsync: editHorse} = useEditHorseApiAction();

  const horse = params?.horse;

  const [imageUri, setImageUri] = useState<string | number>('');

  const modalRef = useRef<RefAppModalProps>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const modaSuccessRef = useRef<RefAppModalProps>(null);

  const openModalSuccess = () => {
    if (modaSuccessRef.current) {
      modaSuccessRef.current.open();
    }
  };

  const closeModalSuccess = () => {
    if (modaSuccessRef.current) {
      modaSuccessRef.current.close();
    }
  };

  const modaSuccesEditsRef = useRef<RefAppModalProps>(null);

  const openModalEditSuccess = () => {
    if (modaSuccesEditsRef.current) {
      modaSuccesEditsRef.current.open();
    }
  };

  const closeModalEditSuccess = () => {
    if (modaSuccesEditsRef.current) {
      modaSuccesEditsRef.current.close();
    }
  };
  const onBack = () => {
    navigation.goBack();
  };
  const onSubmit = async () => {
    try {
      Loader.showLoader();
      let res = await uploadImages(horse);
      if (horse._id) {
        let req: EditHorseRequest = {
          _id: horse._id,
          ...horse,
          birthYear: Number(horse.birthYear),
          gender: horse.gender.toLowerCase(),
          images: res as string[],
          height: Number(horse.height),
        };
        let resEditHorse = await editHorse(req);
        log(resEditHorse);
        Loader.hideLoader();
        setTimeout(() => {
          openModalEditSuccess();
        }, 500);
      } else {
        let req: AddHorseRequest = {
          ...horse,
          birthYear: Number(horse.birthYear),
          gender: horse.gender.toLowerCase(),
          images: res as string[],
          height: Number(horse.height),
        };
        let resAddHorse = await addHorse(req);
        log(resAddHorse);
        Loader.hideLoader();
        setTimeout(() => {
          openModalSuccess();
        }, 500);
      }
    } catch (error) {
      Loader.hideLoader();
      showError(String(error));
    }
  };

  /**
   * Upload Images One By One in horse module
   */
  const uploadImages = async (horseProfile: AddHorseProfile) => {
    try {
      let arrUri = [];
      for await (const file of horseProfile.images) {
        if (typeof file === 'string') {
          arrUri.push(file);
          continue;
        }
        let req: FileUploadRequestType = {
          file: file,
          moduleName: Bucket.HORSE,
        };

        let res = await fileUpload(req);
        arrUri.push(res?.name);
      }
      return arrUri;
    } catch (error) {
      showError(String(error));
    }
  };

  /**
   * Handles the completion of a task by navigating to different screens based on the current navigation state.
   * - Closes success modals.
   * - Determines the current route and navigates accordingly.
   * - Resets the navigation stack if needed.
   */
  const onDone = () => {
    closeModalSuccess();
    closeModalEditSuccess();
    const state = navigation.getState();
    if (state?.routes?.length > 0) {
      let indexHomeScreen = state.routes.findIndex(
        route => route.name.toString() === AppScreens.HomeScreen,
      );
      let indexEditTrip = state.routes.findIndex(
        route => route.name.toString() === AppScreens.EditTripDetails,
      );
      if (indexHomeScreen >= 0) {
        navigationTypeHome.navigate(AppScreens.HomeScreen, {});
      } else if (indexEditTrip >= 0) {
        navigationTypeQuotes.navigate(AppScreens.EditTripDetails, {
          id: editTrip?.id,
        });
      } else {
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: AppScreens.AppTab}],
            }),
          );
        }, 500);
      }
    } else {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: AppScreens.AppTab}],
          }),
        );
      }, 500);
    }
  };

  const onAddAnother = () => {
    closeModalSuccess();
    setTimeout(() => {
      navigation.navigate(AppScreens.AddHorseProfileScreen, {
        from: 'review',
      });
    }, 2000);
  };

  return {
    horse,
    imageUri,
    modalRef,
    modaSuccessRef,
    modaSuccesEditsRef,
    openModal,
    closeModal,
    openModalSuccess,
    closeModalSuccess,
    openModalEditSuccess,
    closeModalEditSuccess,
    setImageUri,
    onBack,
    onSubmit,
    onDone,
    onAddAnother,
  };
};
