import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: AppSpacing[10],
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.64,
    alignSelf: 'center',
  },
  view: {
    position: 'absolute',
  },
  signInBtn: {
    marginBottom: 50,
  },
  signInHeader: {
    marginTop: AppSpacing[50],
    marginBottom: AppSpacing[30],
    paddingBottom: AppSpacing[8],
    borderBottomWidth: AppSpacing[3],
    borderColor: AppColors.peanBlue,
    alignSelf: 'flex-start',
  },
  inputContainerStyle: {marginTop: AppSpacing[20]},
  rememberMe: {
    alignSelf: 'flex-start',
    marginTop: AppSpacing[20],
    marginBottom: AppSpacing[18],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: AppSpacing[12],
  },
});

export default styles;
