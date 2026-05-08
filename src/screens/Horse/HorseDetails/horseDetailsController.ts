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
import Loader from '~/helpers/Loader';
import {useDeleteHorseApiAction} from '~/store';
import {log, showError} from '~/utils';

export const useHorseDetailController = () => {
  const navigation =
    useNavigation<NavigationProp<HorseProfileStackParamList>>();
  const {params} =
    useRoute<
      RouteProp<
        HorseProfileStackParamList,
        AppScreens.HorseProfileDetailsScreen
      >
    >();

  const horse = params?.horse;
  const {mutateAsync: onDeleteHorse} = useDeleteHorseApiAction();

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

  const modalDeleteRef = useRef<RefAppModalProps>(null);

  const openModalDelete = () => {
    if (modalDeleteRef.current) {
      modalDeleteRef.current.open();
    }
  };

  const closeModalDelete = () => {
    if (modalDeleteRef.current) {
      modalDeleteRef.current.close();
    }
  };

  const modalSuccessRef = useRef<RefAppModalProps>(null);

  const openModalSuccess = () => {
    if (modalSuccessRef.current) {
      modalSuccessRef.current.open();
    }
  };

  const closeModalSuccess = () => {
    if (modalSuccessRef.current) {
      modalSuccessRef.current.close();
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onEdit = () => {
    navigation.navigate(AppScreens.EditHorseProfileScreen, {horse: horse});
  };

  const onDelete = async () => {
    try {
      Loader.showLoader();
      if (horse._id) {
        let req: DeleteHorseRequest = {
          _id: horse._id,
        };
        let res = await onDeleteHorse(req);
        log('onDelete', res);
        openModalSuccess();
      }
      Loader.hideLoader();
    } catch (error) {
      Loader.hideLoader();
      showError(String(error));
    }
  };

  const onDone = () => {
    closeModalSuccess();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: AppScreens.AppTab}],
        }),
      );
    }, 500);
  };
  return {
    horse,
    imageUri,
    modalRef,
    modalDeleteRef,
    modalSuccessRef,
    openModal,
    closeModal,
    openModalDelete,
    closeModalDelete,
    openModalSuccess,
    closeModalSuccess,
    setImageUri,
    onBack,
    onEdit,
    onDelete,
    onDone,
  };
};
