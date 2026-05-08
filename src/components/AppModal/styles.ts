import {StyleSheet} from 'react-native';

import {AppColors} from '~/constants';

export const styles = StyleSheet.create({
  keyboardAvoidContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.modalOverlay,
  },
  modalView: {
    width: '100%',
  },
  container: {
    width: '100%',
  },
});
