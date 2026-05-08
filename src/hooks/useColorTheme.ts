import {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {Theme} from '@react-navigation/native';

import {ColorTheme} from '~/constants';
import {useConfigAction} from '~/store';

export const useColorTheme = (styleFn?: (theme: Theme) => any) => {
  const {data: configData} = useConfigAction();

  // variable refers device level theme.
  const deviceColorScheme = useColorScheme() ?? 'light';

  /*
   below snippet will return theme you want to follow, either default device or you selected app level.
   if(true) -> use App Level theme selection
   if(false) -> use Device level theme selection
  */
  const colorScheme = useMemo(() => {
    if (false) {
      return configData.theme;
    } else {
      return deviceColorScheme;
    }
  }, [configData, deviceColorScheme]);

  /* ----- over here we gave a 2 option below  ----- */

  // providerTheme variable provides a color theme object that we gave in NavigationContainer component prop.

  /* use below snippet if you want to follow your device theme */
  const providerTheme =
    colorScheme === 'dark' ? ColorTheme.dark : ColorTheme.light;

  /* use below snippet if you want to follow your app selected theme */
  // const providerTheme =
  //   configData.theme === 'dark' ? ColorTheme.dark : ColorTheme.light;

  /* ----- ----- */

  // below snippet will provide a reusable style variable to make you style customizable based in theme.
  const style = useMemo(
    () => (styleFn ? styleFn(providerTheme) : {}),
    [providerTheme],
  );

  return {
    style,
    colorScheme,
    providerTheme,
  };
};
