import ActionSheet from 'react-native-action-sheet';
import {ImageLibraryOptions} from 'react-native-image-picker';

import {AppConstants} from '~/constants';
import {FilePickerType} from '~/enums';
import {translate as t} from '~/localization';
import {FilePickerUtils} from '~/utils';

interface IUseMediaPickerProps {
  onFileSelect: (obj: FileType[]) => void;
}

/**
 * The `useMediaPicker` function in TypeScript is used to handle media selection from camera or gallery
 * using react-native-action-sheet and react-native-image-picker.
 * @param {IUseMediaPickerProps} props - The `props` parameter in the `useMediaPicker` function is of
 * type `IUseMediaPickerProps`. It contains the properties that are passed to the `useMediaPicker`
 * hook. These properties could include callbacks like `onFileSelect` which is called when a file is
 * selected from the
 * @returns The `useMediaPicker` function returns an object with three properties:
 * `openPickerDialogPress`, `launchCamera`, and `launchGallery`. These properties are functions that
 * can be used to interact with media picking functionality in a React Native application.
 */
export const useMediaPicker = (props: IUseMediaPickerProps) => {
  // function use react-native-action-sheet to show dialog and pick media options.
  const openPickerDialogPress = (options: ImageLibraryOptions) => {
    //Created dynamic menu list for android and iOS
    const menuItems =
      AppConstants.PLATFORM_OS === 'ios'
        ? [t('CAMERA'), t('GALLERY'), t('CANCEL')]
        : [t('CAMERA'), t('GALLERY')];
    //Open action sheet to select camera and gallery option
    ActionSheet.showActionSheetWithOptions(
      {
        options: menuItems,
        cancelButtonIndex: FilePickerType.CANCEL,
        destructiveButtonIndex: FilePickerType.CANCEL,
      },
      (i: number) => onOptionSelect(i, options),
    );
  };

  // function use react-native-image-picker to open camera and return file object.
  const launchCamera = async (options: ImageLibraryOptions) =>
    FilePickerUtils.launchCameraUtil(options);

  // function use react-native-image-picker to open gallery and return file object.
  const launchLibrary = async (options: ImageLibraryOptions) =>
    FilePickerUtils.launchLibraryUtil(options);

  const onOptionSelect = async (
    buttonIndex: number,
    options: ImageLibraryOptions,
  ) => {
    const list: FileType[] = [];
    if (buttonIndex === FilePickerType.CAMERA) {
      await launchCamera(options).then(res => {
        list.push(...res);
      });
    } else if (buttonIndex === FilePickerType.GALLERY) {
      await launchLibrary(options).then(res => {
        list.push(...res);
      });
    }
    if (props?.onFileSelect) {
      props.onFileSelect(list);
    }
  };

  return {openPickerDialogPress, launchCamera, launchLibrary};
};
