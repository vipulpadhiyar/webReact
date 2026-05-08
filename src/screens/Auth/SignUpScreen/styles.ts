import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.peanBlue,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.peanBlue,
  },
  imgLogo: {
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.64,
    alignSelf: 'center',
  },
  bottomContainer: {
    height: '40%',
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    paddingHorizontal: 20,
    paddingTop: AppSpacing[20],
    backgroundColor: AppColors.white,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderTopRightRadius: AppSpacing[30],
    borderTopLeftRadius: AppSpacing[30],
    paddingHorizontal: AppSpacing[20],
    paddingVertical: AppSpacing[30],
  },
  btnContainer: {
    marginVertical: AppSpacing[10],
  },
  tAndcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppSpacing[15],
    marginRight: AppSpacing[20],
  },
  txtDecorationStyle: {textDecorationLine: 'underline'},
  tAndcErrorStyle: {
    textAlign: 'left',
    marginTop: AppSpacing[4],
  },
  checkBoxStyle: {
    marginRight: AppSpacing[4],
  },
  inputContainerStyle: {marginTop: AppSpacing[20]},
});

export default styles;
