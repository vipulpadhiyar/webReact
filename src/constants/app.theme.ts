import {Theme} from '@react-navigation/native';

import {AppColors} from './app.colors';

const LightColorsTheme: Theme = {
  dark: false,
  colors: {
    background: 'white',
    border: 'black',
    card: 'red',
    notification: 'white',
    primary: 'white',
    text: 'black',
    containerColor: 'white',
    textColor: 'black',
  },
};

const DarkColorsTheme: Theme = {
  dark: true,
  colors: {
    background: AppColors.gray34,
    border: 'white',
    card: 'yellow',
    notification: AppColors.gray34,
    primary: AppColors.gray34,
    text: 'white',
    containerColor: AppColors.gray34,
    textColor: 'white',
  },
};

export const ColorTheme = {
  dark: DarkColorsTheme,
  light: LightColorsTheme,
};
