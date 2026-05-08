import { dashboardApi } from 'services/api/dashboard';

import { duration } from 'utils/constants';

import useFetch from '..';
import { dashboardKeys } from '../queryKeys';

export const useDashboard = () => {
  return useFetch({
    queryKey: dashboardKeys.dashboard(),
    apiFunction: () => dashboardApi.getDashboardCount(),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
