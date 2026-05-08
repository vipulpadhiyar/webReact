import React from 'react';
import {Image, View} from 'react-native';

import {AppImageLoader, AppSvgButton, AppText} from '~/components';
import {AppFonts, AppFontSizes, IcDelete, IcEyeOpen} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {completeUrl} from '~/utils';

import styles from './styles';

/**
 * Interface defining the props for the HorseImageListItem component.
 *
 * @property {Bucket} bucket - The bucket where the image is stored.
 * @property {string | FileType} image - The image URL or file object.
 * @property {(image: string | FileType) => void} onView - Function to handle image view action.
 * @property {(() => void) | undefined} [onDelete] - Optional function to handle image delete action.
 */
interface IHorseImageListItem {
  bucket: Bucket;
  image: string | FileType;
  onView: (image: string | FileType) => void;
  onDelete?: () => void;
}

/**
 * Component for displaying an image item in a list with view and optional delete actions.
 *
 * This component renders either an image from a URL or a local file, and provides buttons to view
 * or delete the image. It uses different styles and components based on the image type.
 *
 * @param {IHorseImageListItem} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const HorseImageListItem = (props: IHorseImageListItem) => {
  const {bucket, image, onView, onDelete} = props;

  /**
   * Handler function for when the view button is pressed.
   *
   * Determines the appropriate URL or URI to pass to the onView function based on the type of the image.
   */
  const onViewPress = () => {
    if (typeof image === 'string') {
      onView(completeUrl(image, bucket)); // Pass complete URL to the onView function
    } else {
      onView(image.uri); // Pass URI to the onView function
    }
  };

  return (
    <>
      {typeof image === 'string' ? (
        <View key={image} style={styles.imageListItem}>
          <View style={styles.icons}>
            <AppImageLoader
              source={completeUrl(image, bucket)}
              imageStyle={styles.img}
            />
            <AppText
              text={image?.split('horse/')?.[1] ?? image} // Display image name or URL
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[14]}
              containerStyle={styles.imgName}
              numberOfLines={1}
            />
          </View>
          <View style={styles.icons}>
            <AppSvgButton
              icon={IcEyeOpen}
              style={styles.icon}
              onPress={onViewPress} // Trigger view action
            />
            {onDelete && (
              <AppSvgButton
                icon={IcDelete}
                style={styles.iconDelete}
                onPress={onDelete} // Trigger delete action if onDelete is provided
              />
            )}
          </View>
        </View>
      ) : (
        <View key={image.name} style={styles.imageListItem}>
          <View style={styles.icons}>
            <Image
              source={{uri: image.uri}} // Use URI for the Image component
              style={styles.img}
              borderRadius={11} // Rounded corners for the image
            />
            <AppText
              text={image.name} // Display the image name
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[14]}
              containerStyle={styles.imgName}
              numberOfLines={1}
            />
          </View>
          <View style={styles.icons}>
            <AppSvgButton
              icon={IcEyeOpen}
              style={styles.icon}
              onPress={onViewPress} // Trigger view action
            />
            {onDelete && (
              <AppSvgButton
                icon={IcDelete}
                style={styles.iconDelete}
                onPress={onDelete} // Trigger delete action if onDelete is provided
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};
