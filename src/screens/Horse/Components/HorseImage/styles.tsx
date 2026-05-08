import {StyleSheet} from 'react-native';

import {AppSpacing, SCREEN_WIDTH} from '~/constants';

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: AppSpacing[10],
    overflow: 'hidden',
    // flex: 1 / 3,
  },
  img: {
    height: SCREEN_WIDTH * 0.225,
    width: SCREEN_WIDTH * 0.225,
  },
});
export default styles;
