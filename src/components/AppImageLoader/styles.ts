import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  loaderStyle: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
  },
  imageContainerStyle: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  placeholderStyle: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
  },
});

export default style;
