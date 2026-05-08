import Toast from 'react-native-toast-message';

import {AppConstants} from '~/constants';

export const showSuccess = (message: string) => {
  setTimeout(() => {
    Toast.show({
      type: 'tomatoSuccess',
      text1: `✅  ${message}`,
      position: 'top',
      topOffset: 60,
    });
  }, AppConstants.MODEL_DELAY);
};

export const showError = (message: string) => {
  setTimeout(() => {
    Toast.show({
      type: 'tomatoError',
      text1: `❌  ${message}`,
      position: 'top',
      topOffset: 60,
    });
  }, AppConstants.MODEL_DELAY);
};
