/* AppImage with Placeholder image */
import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageResizeMode,
  type ImageSourcePropType,
  ImageStyle,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {
  ImageStyle as FastImageStyle,
  ResizeMode,
} from 'react-native-fast-image';

import {AppPngImages} from '~/constants';
import {isFalsyValue} from '~/utils';

import styles from './styles';

/* The `interface IAppImagePlaceholder` is defining the shape of the props that the
`AppImagePlaceholder` component expects to receive. It specifies the following properties: */
interface IAppImagePlaceholder {
  source: string;
  resizeMode?: ResizeMode;
  imageStyle?: FastImageStyle;
  imageContainerStyle?: ViewStyle;
  placeholderImage?: ImageSourcePropType;
  placeholderImageResizeMode?: ImageResizeMode;
  testID?: string;
}

/* The code is defining a functional component called `AppImagePlaceholder`. It is using the `memo`
function from React to memoize the component, which means that it will only re-render if its props
have changed. */
export const AppImagePlaceholder = memo((props: IAppImagePlaceholder) => {
  const {
    imageStyle,
    source,
    imageContainerStyle,
    testID,
    placeholderImage = AppPngImages.IcPlaceholder,
    placeholderImageResizeMode = 'contain',
    resizeMode = 'contain',
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const placeHolderImageStyle: ImageStyle = useMemo(() => {
    return {
      ...styles.placeholderStyle,
      display: isLoading || hasError ? 'flex' : 'none',
    };
  }, [isLoading, hasError]);

  const mergedImageStyle: FastImageStyle = useMemo(() => {
    return {
      ...imageStyle,
      flex: 1,
    };
  }, [imageStyle]);

  const url: string = useMemo(() => {
    return isFalsyValue(source) ? 'dummy.jpg' : source;
  }, [source]);

  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const onLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  return (
    <View
      testID={testID}
      key={source}
      style={[styles.imageContainerStyle, imageContainerStyle]}>
      <Image
        resizeMode={placeholderImageResizeMode}
        style={placeHolderImageStyle}
        source={placeholderImage}
      />
      <FastImage
        source={{uri: url}}
        style={mergedImageStyle}
        resizeMode={resizeMode}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onError={onError}
      />
    </View>
  );
});
