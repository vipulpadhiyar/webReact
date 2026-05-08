import React, {memo} from 'react';
import {StyleSheet} from 'react-native';

import {AppText, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';

/*
 * Common interface for defining props related to address components.
 */
interface AddressProps {
  data: Prediction;
  testID?: string;
  onPress: (data: Prediction) => void;
}

/*
 * Address component for displaying an address prediction.
 * @param {AddressProps} props - Properties for the Address component.
 * @returns {React.JSX.Element} - Address component.
 */
export const Address = memo((props: AddressProps): React.JSX.Element => {
  const {data, onPress, testID} = props;

  /*
   * Handles the press event on the address item.
   * Calls the onPress function passed as a prop with the address data.
   */
  const onPressHandler = () => {
    onPress(data);
  };

  return (
    <AppTouchable
      testID={testID}
      style={styles.container}
      onPress={onPressHandler}>
      <AppText
        text={`${data?.structured_formatting.main_text} ${data?.structured_formatting.secondary_text}`}
        fontColor={AppColors.black}
        fontSize={AppFontSizes[14]}
        fontFamily={AppFonts.GentiumBasic_Bold}
        numberOfLines={1}
      />
    </AppTouchable>
  );
});

const styles = StyleSheet.create({
  container: {
    rowGap: AppSpacing[5],
    paddingHorizontal: AppSpacing[20],
    paddingBottom: 0,
  },
});
