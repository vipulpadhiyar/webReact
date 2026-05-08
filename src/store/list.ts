import {useInfiniteQuery} from '@tanstack/react-query';

import {QueryKeys} from '~/constants';
import {getFaqListPaginationApi} from '~/service';
import {getNextPageParamUtilForPagination} from '~/utils';

export const useFaqListApiAction = () =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.getListWithFaqPagination],
    queryFn: ({pageParam}) =>
      getFaqListPaginationApi({
        pageParam: pageParam as number,
      }),
    getNextPageParam: getNextPageParamUtilForPagination,
    retry: false,
  });
