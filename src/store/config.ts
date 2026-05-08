import {
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';

import {QueryKeys} from '~/constants';

// We need add explicitly type declaration when we are not using queryFn in query.
// queryFn is set implicitly type declaration in hook.
// api function return type will set automatically in query data type.
// please refer any query which  has `queryFn` property for more detail and check deference.

type UseConfigQueryType = UndefinedInitialDataOptions<
  ConfigDataType,
  Error,
  ConfigDataType,
  QueryKey
>;

/**
 *
 * @param options
 * @returns
 */
export const useConfigAction = (options?: UseConfigQueryType) =>
  useQuery({
    queryKey: [QueryKeys.getConfig],
    initialData: {
      isFreshInstall: true,
      theme: 'light',
    },
    ...options,
  });
