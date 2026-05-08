type MarkAsReadRequest = {
  notificationId: string;
};

type MarkAsReadResponse = {
  message: string;
};
/**
 * Type representing the request parameters for fetching a list of notifications.
 */
type INotificationListRequest = {
  page: number;
  limit: number;
};

/**
 * Type representing the structure of a single notification.
 */
type INotification = {
  _id: string;
  title: string;
  body: string;
  data: {
    name: string;
  };
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: string;
};
/**
 * Type representing the response structure for fetching a list of notifications.
 */
type INotificationListResponse = {
  notification: INotification[];
  totalRecords: number;
};
/**
 * Type representing the request payload for deleting a specific notification.
 */
type INotificationDeleteReq = {
  _id: string;
};
/**
 * Type representing the request payload for deleting a specific notification.
 */
type INotificationUnReadResponse = {
  unReadCount: number;
};
/**
 * Type representing the response payload for Toggle Notification
 */
type INotificationToggleRequest = {
  fcmToken?: string;
};
/**
 * Type representing the response payload for Toggle Notification
 */
type INotificationToggleResponse = {
  data: {};
};
