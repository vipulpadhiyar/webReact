import {useColorTheme} from '~/hooks';

export const useRootController = () => {
  const {providerTheme} = useColorTheme();
  return {providerTheme};
};
