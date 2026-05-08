import {UndefinedInitialDataOptions, useQuery} from '@tanstack/react-query';

import {QueryKeys} from '~/constants';
import {cmsApi} from '~/service';

/**
 * Cms query
 *
 * @param options
 * @returns
 */
export const useCMSApiAction = (
  options?: UndefinedInitialDataOptions<
    CMSResponseType | undefined,
    unknown,
    CMSResponseType | undefined
  >,
) =>
  useQuery({
    queryKey: [QueryKeys.getCms],
    queryFn: () => cmsApi(),
    retry: false,
    ...options,
  });
