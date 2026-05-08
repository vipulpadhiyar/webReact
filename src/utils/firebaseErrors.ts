import {translate as t} from '~/localization';

export const showFirebaseMessage = (error: any): any => {
  if (
    error?.code === 'auth/code-expired' ||
    error?.code === 'auth/invalid-verification-code'
  ) {
    return t('FIREBASE_MESSAGE');
  } else if (error?.code === 'auth/too-many-requests') {
    return t('TOO_MANY_REQUEST');
  } else if (error?.code === 'auth/invalid-phone-number') {
    return t('INVALID_PHONE_NUMBER');
  } else {
    return t('SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN');
  }
};
