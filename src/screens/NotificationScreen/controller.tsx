import {RefObject, useEffect, useRef} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RefAppModalProps} from '~/components/AppModal';
import Loader from '~/helpers/Loader';
import {
  useDeleteNotificationApiAction,
  useNotificationDeleteAllApiAction,
  useNotificationListApi,
} from '~/store';
import {delay, showError, showSuccess} from '~/utils';

/**
 * Interface defining the structure and methods for managing notifications in the hook.
 */
interface IUseNotificationController {
  notificationList: INotification[];
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
  onPressGoBack: () => void;
  onEndReachedHandler: () => void;
  onPressDeleteAllNotification: () => void;
  onPressDeleteNotification: (item: INotification) => void;
  openModal: () => void;
  closeModal: () => void;
  modalRef: RefObject<RefAppModalProps>; // Reference to the modal component
}

/**
 * Custom hook for managing notification-related operations.
 *
 * This hook provides functionality to handle notifications including fetching, deleting, and managing the modal.
 * It uses React Query for API interactions and manages state related to notifications.
 */
export const useNotificationController = (): IUseNotificationController => {
  const {goBack} = useNavigation<NavigationProp<HomeScreenStackParamList>>();

  /*
   * Reference to the modal component
   */
  const modalRef = useRef<RefAppModalProps>(null);

  /* *
   * Destructuring properties from the API action hook for notification list.
   * Initializes the notification list API hook with `enabled` set to false.
   * */
  const {
    data: notificationListResponse,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    refetch,
    fetchNextPage,
  } = useNotificationListApi(false);

  // API hook for deleting all notifications
  const {mutateAsync: deleteAllNotification} =
    useNotificationDeleteAllApiAction();

  // API hook for deleting a specific notification
  const {mutateAsync: deleteNotification} = useDeleteNotificationApiAction();

  /**
   * Fetch notification list when component mounts
   */
  useEffect(() => {
    refetch();
  }, []);

  /**
   * Handles the action for going back in navigation.
   * Invokes the `goBack` function from navigation prop.
   */
  const onPressGoBack = () => {
    goBack();
  };

  /**
   * Computes the notification list from the API response.
   * Uses optional chaining and flattening to extract notifications from the paginated response.
   */
  const notificationList: INotification[] = notificationListResponse?.pages
    ? notificationListResponse.pages.flatMap(page => page?.notification || [])
    : [];

  /**
   * Fetches the next page of notifications if there is a next page available
   * and no fetching operations are currently in progress.
   */
  const onEndReachedHandler = () => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  /**
   * Handles the action for deleting all notifications.
   * Closes the modal, shows a loader, performs the deletion, and refetches the notification list.
   */
  const onPressDeleteAllNotification = async () => {
    closeModal();
    await delay(700);
    Loader.showLoader();
    deleteAllNotification()
      .then(res => {
        Loader.hideLoader();
        showSuccess(res?.message);
        refetch();
      })
      .catch(err => {
        Loader.hideLoader();
        showError(err);
      })
      .finally(() => {
        Loader.hideLoader();
      });
  };

  /**
   * Opens the modal component using the reference.
   */
  const openModal = () => {
    modalRef?.current?.open();
  };

  /**
   * Closes the modal component using the reference.
   */
  const closeModal = () => {
    modalRef?.current?.close();
  };

  /**
   * Handles the action for deleting a specific notification.
   * Shows a loader, performs the deletion, and refetches the notification list.
   *
   * @param item - The notification item to be deleted.
   */
  const onPressDeleteNotification = (item: INotification) => {
    Loader.showLoader();
    if (item?._id) {
      deleteNotification({_id: item._id})
        .then(res => {
          Loader.hideLoader();
          showSuccess(res?.message);
          refetch();
        })
        .catch(err => {
          Loader.hideLoader();
          showError(err);
        })
        .finally(() => {
          Loader.hideLoader();
        });
    }
  };

  return {
    notificationList,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    modalRef,
    refetch,
    fetchNextPage,
    onPressGoBack,
    onEndReachedHandler,
    onPressDeleteAllNotification,
    closeModal,
    openModal,
    onPressDeleteNotification,
  };
};
