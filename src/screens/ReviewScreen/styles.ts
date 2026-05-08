import {StyleSheet} from 'react-native';

import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';

/**
 * Stylesheet for the container component.
 *
 * @exports styles - Stylesheet for the Main screen.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
  },
  subContainer: {
    backgroundColor: AppColors.containerBg,
    flex: 1,
    marginTop: AppSpacing[20],
    borderTopLeftRadius: AppSpacing[32],
    borderTopRightRadius: AppSpacing[30],
    paddingHorizontal: AppSpacing[16],
  },
  feedbackStarContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[24],
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[24],
    marginTop: AppSpacing[30],
  },
  starContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    columnGap: AppSpacing[15],
    marginVertical: AppSpacing[16],
  },
  inputContainerStyle: {
    borderRadius: 0,
    fontFamily: AppFonts.GentiumBasic_Regular,
    fontSize: AppFontSizes[14],
    borderColor: AppColors.greyE8,
    textAlignVertical: 'top',
    height: AppSpacing[140],
    color: AppColors.black,
  },
  input: {
    padding: AppSpacing[15],
    marginTop: AppSpacing[8],
    borderRadius: AppSpacing[16],
    borderWidth: AppSpacing[1],
    fontFamily: AppFonts.GentiumBasic_Regular,
    fontSize: AppFontSizes[14],
    borderColor: AppColors.inputBorder,
    textAlignVertical: 'top',
    height: AppSpacing[140],
    color: AppColors.black,
    backgroundColor: AppColors.containerBg,
  },
  submitButton: {
    marginHorizontal: AppSpacing[20],
    marginVertical: AppSpacing[30],
  },
  flexContainer: {flex: 1},
  errorTextStyle: {
    marginTop: AppSpacing[6],
    textAlign: 'left',
  },
  errorRating: {
    paddingBottom: AppSpacing[10],
  },
});

export default styles;
