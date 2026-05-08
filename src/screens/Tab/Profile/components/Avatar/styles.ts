import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: AppSpacing[80],
    height: AppSpacing[80],
    borderRadius: AppSpacing[40],
    backgroundColor: AppColors.avatar,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameContainer: {
    marginTop: AppSpacing[10],
    textTransform: 'capitalize',
  },
  textStyles: {},
});
