/* The code you provided is a TypeScript React component called `AppDropdown`. Here's a breakdown of
what it does: */
import React, {memo} from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {AppColors, AppFonts, AppFontSizes} from '~/constants';

import {AppScrollView} from '../AppScrollView';
import {AppSvgButton} from '../AppSvgButton';
import {AppText} from '../AppText';
import {AppTouchable} from '../AppTouchable';

import {styles} from './styles';

/* The `interface AppDropdownProps` is defining the props that the `AppDropdown` component expects to
receive. Here's a breakdown of each prop: */
interface AppDropdownProps extends TextInputProps {
  inputRef?: any;
  testID?: string;
  errorTestId?: string;
  labelText?: string;
  errorText?: string;
  isRequired?: boolean;
  containerStyle?: ViewStyle;
  subContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputIcon: React.FC<SvgProps>;
  rightIcon?: React.FC<SvgProps>;
  data: {
    label: string;
    value: string;
  }[];
  activeType: string;
  type: string;
  onOpen: (type: string) => void;
  onSelect: (item: {label: string; value: string}) => void;
}

/* The `export const AppDropdown` code block is defining a React functional component called
`AppDropdown`. Here's a breakdown of what it does: */
export const AppDropdown = memo((props: AppDropdownProps) => {
  const {
    inputRef,
    testID,
    errorTestId,
    labelText,
    errorText,
    isRequired,
    containerStyle,
    subContainerStyle,
    rightIcon,
    inputStyle,
    inputIcon,
    data,
    activeType,
    type,
    onOpen,
    onSelect,
  } = props;

  const openCloseList = () => {
    onOpen(type);
    // setShowList(!showList);
  };

  const onSelectItem = (item: {label: string; value: string}) => {
    onOpen('');
    onSelect(item);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {labelText && (
        <Text>
          {labelText && (
            <AppText
              text={labelText}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[16]}
              fontColor={AppColors.peanBlue}
            />
          )}
          {isRequired && (
            <AppText
              text={'*'}
              fontFamily={AppFonts.GentiumBasic_Bold}
              fontSize={AppFontSizes[16]}
              fontColor={AppColors.errorText}
            />
          )}
        </Text>
      )}

      <AppTouchable onPress={openCloseList}>
        <View
          style={[styles.subContainer, subContainerStyle]}
          pointerEvents="none">
          {inputIcon && (
            <AppSvgButton
              icon={inputIcon}
              containerStyle={styles.eyeButton}
              disabled
            />
          )}

          <TextInput
            ref={inputRef}
            testID={testID}
            autoCorrect={false}
            placeholderTextColor={AppColors.inputText}
            style={[styles.inputStyle, inputStyle]}
            blurOnSubmit={false}
            {...props}
          />
          {rightIcon && (
            <AppSvgButton
              icon={rightIcon}
              containerStyle={styles.eyeButton}
              disabled
            />
          )}
        </View>
      </AppTouchable>
      {errorText && (
        <AppText
          testID={errorTestId}
          text={errorText}
          fontSize={AppFontSizes[14]}
          fontColor={AppColors.errorText}
          containerStyle={styles.errorTextStyle}
        />
      )}
      {activeType === type && data.length > 0 ? (
        <View style={[styles.dropdownList, styles.box1, styles.box2]}>
          <AppScrollView nestedScrollEnabled>
            {data.map(item => {
              return (
                <>
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => onSelectItem(item)}>
                    <Text style={styles.listItem}>{item.label}</Text>
                  </TouchableOpacity>
                </>
              );
            })}
          </AppScrollView>
        </View>
      ) : null}
    </View>
  );
});
