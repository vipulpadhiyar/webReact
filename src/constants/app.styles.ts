import {ViewStyle} from 'react-native-size-matters';

import {AppColors} from './app.colors';
import {AppSpacing} from './app.spacing';

/* The `export const commonShadowStyle` is defining a constant named `commonShadowStyle` of type
`ViewStyle`. This constant represents a common shadow style configuration that can be applied to
components in the application. It includes properties such as `shadowColor`, `shadowOffset`,
`shadowOpacity`, `shadowRadius`, and `elevation` with values taken from the `AppColors` and
`AppSpacing` constants defined in the application. This style can be used to give components a
consistent shadow effect across the application. */
export const commonShadowStyle: ViewStyle = {
  shadowColor: AppColors.black,
  shadowOffset: {
    width: 0,
    height: AppSpacing[2],
  },
  shadowOpacity: 0.25,
  shadowRadius: AppSpacing[4],
  elevation: AppSpacing[5],
};
