import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppScrollView} from '~/components';
import {AppColors, AppSpacing} from '~/constants';

import {Address} from './Address';

/**
 * Props interface for the AppScrollViewComponent.
 * This component renders a scrollable list of addresses.
 */
interface AppScrollViewComponentProps {
  addressList: Prediction[];
  onPressAddress: (item: Prediction) => void;
  testID?: string;
}

/**
 * @returns Scroll view for listed address
 */
export const AppScrollViewComponent = memo(
  (props: AppScrollViewComponentProps): React.JSX.Element => {
    const {addressList, testID, onPressAddress} = props;

    /**
     * Render address item for the FlatList.
     * @param {Prediction} item - The address prediction item.
     * @returns {React.ReactElement} - The Address component.
     */
    const renderAddress = (
      item: Prediction,
      onPress: (item: Prediction) => void,
    ): React.ReactElement => {
      /*
       *on press event for address list and selection
       */
      const onPressItem = () => {
        onPress(item);
      };
      return <Address key={item?.place_id} data={item} onPress={onPressItem} />;
    };

    /**
     * Render separator component for the FlatList.
     * @returns {React.ReactElement} - The separator view.
     */
    const renderSeparator = (): React.ReactElement => {
      return <View style={styles.separatorView} />;
    };

    return (
      <AppScrollView
        testID={testID}
        nestedScrollEnabled
        keyboardShouldPersistTaps="always"
        style={styles.contentContainerStyle}>
        {addressList.map((item, index) => (
          <View key={item?.place_id}>
            {renderAddress(item, onPressAddress)}
            {index < addressList.length - 1 && renderSeparator()}
          </View>
        ))}
      </AppScrollView>
    );
  },
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: AppSpacing[20],
    marginHorizontal: AppSpacing[16],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[10],
    maxHeight: AppSpacing[200],
  },
  separatorView: {
    height: 1,
    backgroundColor: AppColors.greyE8,
    marginVertical: AppSpacing[10],
  },
});
