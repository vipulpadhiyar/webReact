import {useEffect, useRef, useState} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import Loader from '~/helpers/Loader';
import {
  useAcceptQuotationRequest,
  useDeclineAllQuotationRequest,
  useDeclineQuotationRequest,
  useQuetosDetailsApiAction,
} from '~/store/quetos';
import {showError} from '~/utils';

/**
 * The function `useQuetosDetailsController` returns an object with a method `onPressGoBack` that
 * navigates back in the QuotesStack.
 */
export const useQuetosDetailsController = () => {
  /* The line `const {params} = useRoute<RouteProp<QuotesStackParamList,
 AppScreens.QuetosDetailsScreen>>();` is extracting the `params` object from the route prop using
 the `useRoute` hook provided by React Navigation. */
  const {params} =
    useRoute<RouteProp<QuotesStackParamList, AppScreens.QuetosDetailsScreen>>();
  const {goBack} = useNavigation<NavigationProp<QuotesStackParamList>>();
  const [isExpandView, setExpandView] = useState<boolean>(false);
  const [currentQuotation, setCurrentQuotation] = useState<Quotation>();
  const successModelRef = useRef<RefAppModalProps>(null);
  /**
   * Modal reference for confirmation popup
   */
  const modalRef = useRef<RefAppModalProps>(null);
  const declineModalRef = useRef<RefAppModalProps>(null);
  const acceptModalRef = useRef<RefAppModalProps>(null);

  /* The line `const { data: quetosDetails, isLoading, refetch } =
useQuetosDetailsApiAction(params?.id);` is using the `useQuetosDetailsApiAction` custom hook to
fetch details for a specific quote based on the `id` extracted from the route parameters
(`params?.id`). */
  const {data: quetosDetails, refetch} = useQuetosDetailsApiAction(params?.id);

  /* These lines of code are using the `mutateAsync` function returned by custom hooks
`useAcceptQuotationRequest`, `useDeclineQuotationRequest`, and `useDeclineAllQuotationRequest` to
destructure and assign them to variables `acceptQuotation`, `deleteQuotation`, and
`deleteAllQuotation` respectively. */
  const {mutateAsync: acceptQuotation} = useAcceptQuotationRequest();
  const {mutateAsync: deleteQuotation} = useDeclineQuotationRequest();
  const {mutateAsync: deleteAllQuotation} = useDeclineAllQuotationRequest();

  /**
   * Use effect for refetch details
   */
  useEffect(() => {
    refetch();
  }, []);

  /**
   * The onPressGoBack function calls the goBack function.
   */
  const onPressGoBack = () => {
    goBack();
  };

  /**
   * The `onPressAccept` function logs the `data` parameter of type `Quotation`.
   * @param {Quotation} data - The `onPressAccept` function takes a parameter `data` of type `Quotation`.
   * When this function is called, it logs the `data` parameter to the console.
   */
  const onPressAccept = () => {
    closeModalAccept();
    if (currentQuotation?._id) {
      // Loader.showLoader();
      acceptQuotation({_id: currentQuotation?._id})
        .then(() => {
          refetch();
          Loader.hideLoader();
          setTimeout(() => {
            openModalSuccess();
          }, 500);
        })
        .catch(err => {
          showError(err);
          Loader.hideLoader();
        })
        .finally(() => {
          Loader.hideLoader();
        });
    }
  };

  /**
   * The function `onPressDecline` deletes a quotation by its ID and shows a loader while the operation
   * is in progress.
   * @param {Quotation} data - The `data` parameter in the `onPressDecline` function is of type
   * `Quotation`. It is used to access the `_id` property of the quotation data to perform a deletion
   * operation on that specific quotation.
   */
  const onPressDecline = () => {
    closeModalDecline();
    if (currentQuotation?._id) {
      // Loader.showLoader();
      deleteQuotation({_id: currentQuotation?._id})
        .then(() => {
          refetch();
          Loader.hideLoader();
        })
        .catch(err => {
          showError(err);
          Loader.hideLoader();
        })
        .finally(() => {
          Loader.hideLoader();
        });
    }
  };
  /**
   * The function `openModalSuccess` checks if a success modal reference exists and opens it if it does.
   */
  const openModalSuccess = () => {
    successModelRef?.current?.open();
  };

  /**
   * The function `closeModalSuccess` closes a success modal if it is currently open.
   */
  const closeModalSuccess = () => {
    successModelRef?.current?.close();
  };
  /**
   * The `onDone` function closes a success modal.
   */
  const onDone = () => {
    closeModalSuccess();
  };
  /**
   * The function `onPressDeclineAll` deletes all quotations with a specific ID while showing and hiding
   * a loader accordingly.
   * @param {string} id - The `id` parameter in the `onPressDeclineAll` function is a string that
   * represents the unique identifier of a quotation. This function is responsible for deleting all
   * quotations associated with the provided `id`.
   */
  const onPressDeclineAll = () => {
    closeModal();
    if (quetosDetails?._id) {
      // Loader.showLoader();
      deleteAllQuotation({_id: quetosDetails?._id})
        .then(() => {
          Loader.hideLoader();
          setTimeout(() => {
            goBack();
          }, 1000);
        })
        .catch(err => {
          showError(err);
          Loader.hideLoader();
        })
        .finally(() => {
          Loader.hideLoader();
        });
    }
  };

  /**
   * Opens the modal and passes some data to it.
   */
  const openModal = () => {
    modalRef?.current?.open({someData: 'example data'});
  };
  /**
   * Closes the modal
   */
  const closeModal = () => {
    modalRef?.current?.close();
  };
  /**
   * Opens the accept modal and passes some data to it.
   */
  const openModalAccept = () => {
    acceptModalRef?.current?.open();
  };
  /**
   * Closes the accept modal
   */
  const closeModalAccept = () => {
    acceptModalRef?.current?.close();
  };
  /**
   * Opens the decline modal and passes some data to it.
   */
  const openModalDecline = () => {
    declineModalRef?.current?.open();
  };
  /**
   * Closes the decline modal
   */
  const closeModalDecline = () => {
    declineModalRef?.current?.close();
  };

  /**
   * Handles the event when the user presses the decline quote button.
   *
   * @param {Quotation} data - The quotation data that is being declined.
   *
   * Sets the current quotation to the provided data and opens the decline modal.
   */
  const onPressDeclineQuote = (data: Quotation) => {
    setCurrentQuotation(data);
    openModalDecline();
  };
  /**
   * Handles the event when the user presses the accept quote button.
   *
   * @param {Quotation} data - The quotation data that is being accepted.
   *
   * Sets the current quotation to the provided data and opens the accept modal.
   */
  const onPressAcceptQuote = (data: Quotation) => {
    setCurrentQuotation(data);
    openModalAccept();
  };

  return {
    isExpandView,
    quetosDetails,
    successModelRef,
    modalRef,
    acceptModalRef,
    declineModalRef,
    onPressGoBack,
    setExpandView,
    onPressAccept,
    onDone,
    onPressDecline,
    onPressDeclineAll,
    openModal,
    closeModal,
    openModalAccept,
    closeModalAccept,
    openModalDecline,
    closeModalDecline,
    onPressDeclineQuote,
    onPressAcceptQuote,
  };
};
