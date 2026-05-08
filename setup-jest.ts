// import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

// export const mockReplace = jest.fn();
// export const mockNavigate = jest.fn();
// export const mockDispatch = jest.fn();
// export const mockReset = jest.fn();
// export const mockGoBack = jest.fn();
// export const mockPop = jest.fn();
// export const mockGetParent = jest.fn();
// export const addListener = jest.fn();

// export const mockNavigation = {
//   replace: mockReplace,
//   navigate: mockNavigate,
//   dispatch: mockDispatch,
//   goBack: mockGoBack,
//   pop: mockPop,
//   getParent: mockGetParent,
//   addListener: addListener,
//   reset: mockReset,
// };

// export const resetView = {
//   reset: mockReset,
// };

// jest.mock('react-native-keyboard-aware-scroll-view');

// jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// jest.mock('react-native-device-info', () => mockRNDeviceInfo);

// jest.mock('@react-navigation/native', () => {
//   return {
//     ...jest.requireActual('@react-navigation/native'),
//     useNavigation: () => mockNavigation,
//     CommonActions: () => resetView,
//     navigation: {
//       goBack: jest.fn(() => ({})),
//     },
//     CommonActions: {
//       reset: jest.fn(() => ({})),
//     },
//   };
// });

// jest.mock('react-native-keyboard-aware-scroll-view', () => {
//   const KeyboardAwareScrollView = ({children}: any) => children;
//   return {KeyboardAwareScrollView};
// });

// // jest.mock('redux-persist-sensitive-storage', () => {
// //   const createSensitiveStorage = ({children}: any) => children;
// //   return createSensitiveStorage;
// // });

// jest.mock('redux-persist', () => {
//   return {
//     ...jest.requireActual('redux-persist'),
//     persistReducer: jest
//       .fn()
//       .mockImplementation((config, reducers) => reducers),
//   };
// });

// jest.mock('react-native-keys', () => {
//   return {
//     secureFor: jest.fn(),
//   };
// });

// // jest.mock('@react-native-firebase/auth', () => ({
// //   currentUser: jest.fn(() => ({
// //     // Simulate the user's properties or behaviors
// //     uid: 'mocked-user-uid',
// //     email: 'mocked-user@example.com',
// //   })),
// //   signInWithPhoneNumber: jest.fn(async () => {
// //     return {
// //       verificationId: 'mocked-verification-id',
// //     };
// //   }),
// // }));

// // jest.mock('react-native-config', (): any => {
// //   const children = ({child}: any) => child;
// //   return children;
// // });

// jest.mock('react-native-snackbar', () => {
//   const children = ({child}: any) => child;
//   return children;
// });

// // jest.mock('@react-native-firebase/messaging', () => () => ({
// //   messaging: jest.fn(),
// // }));

// // jest.mock('react-native-bootsplash', () => {
// //   return {
// //     hide: jest.fn(),
// //     isVisible: jest.fn().mockResolvedValue(false),
// //     useHideAnimation: jest.fn().mockReturnValue({
// //       container: {},
// //       logo: {source: 0},
// //       brand: {source: 0},
// //     }),
// //   };
// // });

// jest.mock('react-native-country-picker-modal', () => {
//   return {
//     CountryPickerModal: jest.fn().mockReturnValue(null),
//   };
// });

// jest.mock('react-native-permissions', () =>
//   require('react-native-permissions/mock'),
// );

// // jest.mock('react-native-phone-input');

// // jest.mock('react-native-sensitive-info', () => {
// //   const sensitiveInfo = ({children}: any) => children;
// //   return sensitiveInfo;
// // });

// // jest.mock('react-native-video');

// // jest.mock('react-native-vimeo-iframe');

// // jest.mock('react-native-youtube-iframe');

// jest.mock('@react-navigation/bottom-tabs');

// // jest.mock('@react-navigation/stack');

// // jest.mock('react-native-sound', () => () => ({
// //   Sound: jest.fn(),
// // }));

// // jest.mock('redux-persist/lib/storage', () => {
// //   const children = ({props}: any) => props;
// //   return children;
// // });

// // jest.mock('@twotalltotems/react-native-otp-input');

// // jest.mock('react-native-raw-bottom-sheet');

// // jest.mock('react-native-phone-input');
// // jest.mock('react-native-background-timer');

// jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// jest.mock('@notifee/react-native');

// // jest.mock('react-native-pdf', () => {
// //   return {
// //     Pdf: jest.fn(), // Use the mock component
// //   };
// // });

// // jest.mock('react-native-sound', () => {
// //   class SoundMock {}

// //   SoundMock.prototype.setVolume = jest.fn();
// //   SoundMock.prototype.setNumberOfLoops = jest.fn();
// //   SoundMock.prototype.play = jest.fn();
// //   SoundMock.prototype.stop = jest.fn();

// //   SoundMock.setCategory = jest.fn();

// //   return SoundMock;
// // });

// jest.mock('react-native-webview', () => 'View');

// // jest.mock('react-native-snackbar', () => ({
// //   show: jest.fn(),
// // }));

// // jest.mock('react-native-blob-util', () => ({
// //   getConstants: jest.fn(),
// // }));

// // jest.mock('react-native-popup-menu');

// // jest.mock('react-native-share', () => ({
// //   default: jest.fn(),
// //   open: jest.fn(),
// // }));

// jest.mock('react-native-image-picker');
// // jest.mock('react-native-orientation-locker');
// jest.mock('@notifee/react-native', () => {
//   return {
//     __esModule: true,
//     default: {
//       AndroidImportance: {
//         HIGH: 'HIGH',
//         DEFAULT: 'DEFAULT',
//       },
//     },
//   };
// });

// jest.mock('rn-fetch-blob', () => ({
//   fs: {
//     dirs: {
//       CacheDir: './',
//     },
//     unlink: jest.fn(),
//   },
//   config: () => ({
//     fetch: jest.fn(),
//   }),
// }));

import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import mock from '@notifee/react-native/jest-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

import Loader from '~/helpers/Loader';

export const mockReplace = jest.fn();
export const mockNavigate = jest.fn();
export const mockDispatch = jest.fn();
export const mockReset = jest.fn();
export const mockGoBack = jest.fn();
export const mockPop = jest.fn();
export const mockGetParent = jest.fn();
export const addListener = jest.fn();
export const canGoBack = jest.fn();

export const mockNavigation = {
  replace: mockReplace,
  navigate: mockNavigate,
  dispatch: mockDispatch,
  goBack: mockGoBack,
  pop: mockPop,
  getParent: mockGetParent,
  addListener: addListener,
  canGoBack: canGoBack,
};

export const resetView = {
  reset: mockReset,
};

jest.mock('react-native-fs', () => {
  return {
    readFile: jest.fn(),
    CachesDirectoryPath: '',
  };
});
jest.mock('rn-fetch-blob', () => ({
  fs: {
    dirs: {
      CacheDir: './',
    },
    unlink: jest.fn(),
  },
  config: () => ({
    fetch: jest.fn(),
  }),
}));

jest.mock('@notifee/react-native', () => mock);
jest.mock('react-native-zip-archive', () => mock);

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  return {
    KeyboardAwareScrollView: jest.fn().mockImplementation(({children}) => {
      return children;
    }),
  };
});

// jest.mock('@react-navigation/drawer', () => ({
//   createDrawerNavigator: jest.fn().mockReturnValue({
//     Screen: () => 'View',
//   }),
// }));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => {
      return mockNavigation;
    }),
    CommonActions: () => resetView,
    navigation: {
      goBack: jest.fn(() => ({})),
    },
  };
});

// jest.mock('@react-navigation/bottom-tabs', () => ({
//   createBottomTabNavigator: jest.fn().mockReturnValue({
//     Screen: () => 'View',
//   }),
// }));

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-keys', () => {
  return {
    secureFor: jest.fn(),
  };
});

jest.mock('react-native-snackbar', () => {
  const children = ({child}: any) => child;
  return children;
});

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('@react-native-firebase/messaging', () => () => ({
  messaging: jest.fn(),
}));

jest.mock('react-native-webview', () => 'View');

jest.spyOn(Loader, 'showLoader').mockImplementation(() => {});

jest.spyOn(Loader, 'hideLoader').mockImplementation(() => {});

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
}));

jest.mock('moment', () => jest.requireActual('moment'));

jest.mock('formik', () => jest.requireActual('formik'));

jest.mock('react-native-country-picker-modal', () => jest.fn());
