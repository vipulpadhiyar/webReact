import {StyleSheet} from 'react-native';

import {AppColors, AppSpacing} from '~/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.peanBlue,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginTop: AppSpacing[20],
    borderTopEndRadius: AppSpacing[18],
    borderTopLeftRadius: AppSpacing[18],
  },
  inputContainerStyle: {
    margin: AppSpacing[12],
    marginBottom: 0,
  },
  buttonContainer: {
    marginVertical: AppSpacing[30],
    marginHorizontal: AppSpacing[80],
    paddingHorizontal: AppSpacing[40],
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  autoCompleteContainer: {},
  separatorView: {
    height: 1,
    backgroundColor: AppColors.greyE8,
    marginVertical: AppSpacing[10],
  },
  contentContainerStyle: {
    paddingTop: AppSpacing[20],
    marginHorizontal: AppSpacing[16],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
    maxHeight: AppSpacing[200],
  },
  timeSLotContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: AppSpacing[15],
    marginHorizontal: AppSpacing[16],
    shadowColor: AppColors.modalOverlay000, // Shadow color
    shadowOffset: {width: 0, height: 3}, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    elevation: 2, // Elevation for Android
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
    position: 'absolute',
    top: AppSpacing[70],
    overflow: 'visible',
  },
  itemWhiteContainer: {
    width: '33%',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: AppSpacing[16],
    paddingVertical: AppSpacing[10],
    gap: AppSpacing[8],
    marginTop: AppSpacing[1],
    alignItems: 'center',
  },
  trailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: AppSpacing[16],
    paddingHorizontal: AppSpacing[16],
    columnGap: AppSpacing[5],
  },
  checkBoxIcon: {
    marginStart: AppSpacing[5],
  },
  roundTripContainer: {
    paddingTop: AppSpacing[16],
    paddingHorizontal: AppSpacing[16],
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: AppSpacing[10],
  },
  dropDownContainerStyle: {
    width: '50%',
  },
});

export default styles;
