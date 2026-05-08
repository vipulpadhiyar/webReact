import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

export const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  borderTitleContainer: {
    width: '80%',
    borderBottomWidth: AppSpacing[3],
    borderBottomColor: AppColors.peanBlue,
    marginVertical: AppSpacing[5],
    borderRadius: AppSpacing[10],
  },
  borderTitleContainerTransperent: {
    width: '80%',
    height: 3,
    marginVertical: AppSpacing[5],
    borderRadius: AppSpacing[10],
  },
  textContainer: {
    marginRight: AppSpacing[40],
  },
});
