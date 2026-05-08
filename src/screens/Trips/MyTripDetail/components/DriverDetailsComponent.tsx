import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {AppText} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';

interface DriverDetailsComponentItemProps {
  /** The value to be displayed in the component. */
  value: string;

  /** The value for testID. */
  testID?: string;

  /** The label for the value to be displayed in the component. */
  label: string;

  /** Optional custom style for the container view. */
  viewContainer?: ViewStyle;
}

/**
 * `DriverDetailsComponent` is a component that displays a label and a corresponding value in a styled container.
 *
 * @param {DriverDetailsComponentItemProps} props - The properties for the `DriverDetailsComponent` component.
 * @param {string} props.label - The label text to display.
 * @param {string} props.value - The value text to display.
 * @param {ViewStyle} [props.viewContainer] - Optional custom style for the container view.
 *
 * @returns {React.JSX.Element} The `DriverDetailsComponent` component.
 */
export const DriverDetailsComponent = memo(
  (props: DriverDetailsComponentItemProps): React.JSX.Element => {
    const {label, value, viewContainer, testID} = props;
    return (
      <View testID={testID} style={[styles.locationContainer, viewContainer]}>
        <AppText
          text={label}
          fontSize={AppFontSizes[16]}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontColor={AppColors.greyLight1}
        />
        <AppText
          text={value}
          fontSize={AppFontSizes[14]}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontColor={AppColors.greyLight8}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  locationContainer: {
    paddingTop: AppSpacing[16],
    rowGap: AppSpacing[5],
  },
});
