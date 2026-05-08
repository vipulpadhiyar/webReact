import React, {memo, useState} from 'react';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {
  AppColors,
  AppFonts,
  AppSpacing,
  IcCheckboxSelected,
  IcClose,
  IcEmptyCheckBox,
  IcPlus,
  IcUpArrow,
} from '~/constants';
import {capitalizeFirstLetter} from '~/utils';

import {AppText} from '../AppText';
import {AppTouchable} from '../AppTouchable';

interface CustomPickerProps {
  inputIcon: React.FC<SvgProps>;
  inputRightIcon: React.FC<SvgProps>;
  placeHolderText?: string;
  errorText?: string | undefined | any;
  addText?: string;
  onPress: (index: number) => void;
  data: DropdownPickerType[];
  dropDownContainerStyle?: ViewStyle;
  onPressAdd?: () => void;
}

/*
 * Custom picker component to select items from a dropdown list.
 * @param {CustomPickerProps} props - Properties for the picker component.
 * @returns {React.JSX.Element} - Custom picker component.
 */
export const AppPickerCustom = memo(
  (props: CustomPickerProps): React.JSX.Element => {
    const [isDisplayListPopup, setDisplayListPopup] = useState<boolean>(false);
    const {onPress, placeHolderText, data, errorText, onPressAdd} = props;
    const selectedOptions = data && data.filter(item => item.isSelected);

    /*
     * Renders an item in the dropdown list.
     * @param {DropdownPickerType} item - The item to be rendered.
     * @returns {JSX.Element} - The rendered item.
     */
    const renderDropdownItem = (item: DropdownPickerType, index: number) => {
      return (
        <View
          key={item?.value}
          style={[styles.itemWhiteContainer, props.dropDownContainerStyle]}>
          <View style={styles.itemContainer}>
            {item.isSelected ? (
              <IcCheckboxSelected onPress={() => onPress(index)} />
            ) : (
              <AppTouchable onPress={() => onPress(index)}>
                <IcEmptyCheckBox />
              </AppTouchable>
            )}
            <AppText
              text={capitalizeFirstLetter(item.label)}
              fontSize={AppSpacing[16]}
              fontColor={AppColors.peanBlue}
            />
          </View>
        </View>
      );
    };

    /*
     * Renders the selected item in the picker.
     * @param {DropdownPickerType} item - The item to be rendered.
     * @param {number} index - The index of the item.
     * @returns {JSX.Element} - The rendered selected item.
     */
    const renderSelectedItem = (item: DropdownPickerType, index: number) => {
      if (index < 2) {
        return (
          <View key={item.value} style={styles.selectedItemContainer}>
            <AppText
              text={capitalizeFirstLetter(item.label)}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.peanBlue}
              fontFamily={AppFonts.GentiumBasic_Regular}
            />
            <AppTouchable onPress={() => onPress(index)}>
              <IcClose
                style={styles.closeIcon}
                height={AppSpacing[12]}
                width={AppSpacing[12]}
              />
            </AppTouchable>
          </View>
        );
      } else if (selectedOptions && index === selectedOptions.length - 1) {
        return (
          <View style={styles.selectedItemContainer}>
            <AppText
              text={selectedOptions.length - 2 + '+'}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.peanBlue}
              fontFamily={AppFonts.GentiumBasic_Regular}
            />
          </View>
        );
      }
    };

    return (
      <View>
        <AppTouchable
          onPress={() => setDisplayListPopup(!isDisplayListPopup)}
          style={styles.subContainer}>
          {<props.inputIcon />}
          {selectedOptions && selectedOptions.length > 0 ? (
            <ScrollView
              style={styles.selectedViewContainer}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {selectedOptions.map(renderSelectedItem)}
            </ScrollView>
          ) : (
            <AppText
              text={placeHolderText ?? ''}
              fontSize={AppSpacing[14]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight}
              containerStyle={styles.placeHolderText}
            />
          )}
          {!isDisplayListPopup ? <IcUpArrow /> : <props.inputRightIcon />}
        </AppTouchable>
        {errorText && (
          <AppText
            text={errorText}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.errorText}
            fontFamily={AppFonts.GentiumBasic_Regular}
            containerStyle={styles.errorText}
          />
        )}

        {isDisplayListPopup && (
          <>
            <View style={styles.timeSLotContainer}>
              <View style={styles.listContainer}>
                {data?.map((item: DropdownPickerType, index: number) =>
                  renderDropdownItem(item, index),
                )}
              </View>
              {props?.addText ? (
                <AppTouchable style={styles.addContainer} onPress={onPressAdd}>
                  <IcPlus />
                  <AppText
                    text={props.addText ?? ''}
                    fontSize={AppSpacing[16]}
                    fontFamily={AppFonts.GentiumBasic_Regular}
                    containerStyle={styles.addImage}
                  />
                </AppTouchable>
              ) : null}
            </View>
          </>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    borderWidth: AppSpacing[1],
    paddingVertical: AppSpacing[12],
    paddingHorizontal: AppSpacing[12],
    marginHorizontal: AppSpacing[12],
    marginTop: AppSpacing[20],
    alignItems: 'center',
    backgroundColor: AppColors.inputBackground,
    borderRadius: AppSpacing[50],
    borderColor: AppColors.inputBorder,
  },
  placeHolderText: {
    paddingStart: AppSpacing[10],
    flex: 1,
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.peanBlueLight,
    borderRadius: AppSpacing[20],
    paddingVertical: AppSpacing[4],
    paddingHorizontal: AppSpacing[8],
    // marginVertical: AppSpacing[2],
    marginRight: AppSpacing[10],
  },
  closeIcon: {
    paddingHorizontal: AppSpacing[8],
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
  timeSLotContainer: {
    marginTop: AppSpacing[15],
    marginHorizontal: AppSpacing[16],
    shadowColor: AppColors.modalOverlay000, // Shadow color
    shadowOffset: {width: 0, height: 3}, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: AppSpacing[3], // Shadow radius
    elevation: AppSpacing[2], // Elevation for Android
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
  },
  selectedViewContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: AppSpacing[10],
    overflow: 'scroll',
  },
  addContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: AppSpacing[16],
  },
  addImage: {
    textDecorationLine: 'underline',
    paddingStart: AppSpacing[8],
  },
  errorText: {
    paddingHorizontal: AppSpacing[16],
    paddingTop: AppSpacing[5],
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
