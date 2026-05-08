/**
 * Version Number
 */
// const VERSION_NUMBER = 'v2';

/*
  The code snippet is defining a TypeScript constant object `AppEndPoints` that contains a single key-value pair.
*/
export const AppEndPoints = {
  SIGNUP: 'ho/signup',
  SignIn: 'auth/login',
  ForgotPassword: 'auth/forgotPassword',
  ResetPassword: 'auth/resetPassword',
  FaqList: 'cms/faq/getAll',
  TermsOrPrivacy: 'cms/view',
  ViewProfile: 'ho/viewProfile',
  EditProfile: 'ho/editProfile',
  ChangePassword: 'auth/changePassword',
  LogOut: 'auth/logout',

  AddHorse: 'ho/horse/add',
  EditHorse: 'ho/horse/edit',
  ListHorse: '/ho/horse/list',
  DeleteHorse: 'ho/horse/delete',
  ListHorseTrip: 'list/horse',

  UploadFile: '/upload/file',

  //Trip
  CREATE_TRIP: 'ho/trip/add',
  ListTrip: 'ho/trip/list',
  //Quetos Status
  QuotationPending: 'ho/quotation/pending',
  QuotationReceived: 'ho/quotation/received',
  QuotationDecline: 'ho/quotation/decline',
  QuotationAccept: 'ho/quotation/accept',
  QuotationDetails: 'ho/quotation/view',
  QuotationReject: 'ho/quotation/reject',
  QuotationReSubmit: 'ho/quotation/reSubmit',
  QuotationRejectAll: 'ho/quotation/rejectAll',
  ViewTrip: 'ho/trip/view',
  CancelTrip: 'ho/trip/cancel',
  EditTrip: 'ho/trip/edit',
  //Review
  TripReview: 'ho/review/add',
  //notification
  NotificationList: 'notification/findAll',
  NotificationDeleteAll: 'notification/deleteAll',
  NotificationDelete: 'notification/delete',
  NotificationRead: 'notification/read',
  NotificationUnRead: 'notification/unread',
  NotificationOnOff: 'notification/notificationAccess',
};

/* The code snippet is defining a TypeScript constant object `SOCKET_EVENTS` that contains various
event names as keys and their corresponding values as strings. These event names are related to
socket communication in a web application. Here's a breakdown of the events defined in
`SOCKET_EVENTS`: */
export const SOCKET_EVENTS = {
  USER_CONNECTED: 'user-connected',
  SEND_MESSAGE: 'send-message',
  CHAT_HISTORY: 'chat-history',
  SERVER_RECEIVE_MESSAGE: 'server-receive-message',
  CMS_DETAILS_UPDATED: 'cms-details-updated',
};

/* This code snippet is defining another TypeScript constant object `SOCKET_DEFAULT_EVENTS` that
contains different socket events as keys and their corresponding values as strings. These events are
related to socket communication in a web application. */
export const SOCKET_DEFAULT_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  RECONNECTING_ATTEMPT: 'reconnection_attempt',
};

/*
 * Constants for Google Places API endpoints.
 * These URLs are used to interact with various Google Places services.
 */
export const GOOGLE_PLACES_ENDPOINTS = {
  details: 'https://maps.googleapis.com/maps/api/place/details/json',
  autoComplete: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  locationDirection: 'https://maps.googleapis.com/maps/api/directions/json',
  locationAddress: 'https://maps.googleapis.com/maps/api/geocode/json',
};
/**
 * This code snippet is defining a TypeScript constant object `SOCKET_CUSTOM_EVENTS` that contains
custom event names as keys and their corresponding values as strings. These custom events are related
to socket communication in a web application, specifically for handling trip-related events. Here's
a breakdown of the custom events defined in `SOCKET_CUSTOM_EVENTS`:
*/
export const SOCKET_CUSTOM_EVENTS = {
  CONNECT_TRIP_ROOM: 'userConnected', // user connect event
  SEND_LOCATION: 'driverLocation', // send location
  RECEIVE_LOCATION: 'locationReceive', // receive location
};
