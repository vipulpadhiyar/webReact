import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.containerBg,
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[32],
  },
  subContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginVertical: AppSpacing[30],
    marginHorizontal: AppSpacing[20],
    borderRadius: AppSpacing[32],
  },

  inputContainerStyle: {
    margin: AppSpacing[20],
    marginBottom: 0,
  },
  noteInputContainerStyle: {
    margin: AppSpacing[20],
    marginBottom: AppSpacing[20],
  },

  btnContainer: {
    margin: AppSpacing[20],
  },
  uploadText: {
    color: AppColors.blue,
    marginHorizontal: AppSpacing[6],
  },
  uploadContainer: {
    margin: AppSpacing[20],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppColors.inputBorder,
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: AppColors.containerBg,
    borderRadius: AppSpacing[50],
    paddingVertical: AppSpacing[20],
  },
  imageListItem: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: AppSpacing[20],
    backgroundColor: AppColors.aliceBlue,
    paddingVertical: AppSpacing[8],
    borderColor: AppColors.inputBorder,
    borderWidth: 1,
    borderRadius: AppSpacing[22],
    alignItems: 'center',
    marginTop: AppSpacing[16],
    height: AppSpacing[40],
  },
  images: {
    marginHorizontal: AppSpacing[20],
  },
  img: {
    height: AppSpacing[22],
    width: AppSpacing[22],
    marginLeft: AppSpacing[16],
  },
  imgName: {
    maxWidth: SCREEN_WIDTH / 2,
    marginHorizontal: AppSpacing[10],
  },
  iconDelete: {
    height: AppSpacing[16],
    width: AppSpacing[16],
    marginRight: AppSpacing[5],
  },
  icon: {
    height: AppSpacing[16],
    width: AppSpacing[16],
  },
  errorText: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: -16,
    paddingTop: 0,
    marginBottom: AppSpacing[30],
  },
});
export default styles;
