import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

import {MutationQueryKeys, QueryKeys} from '~/constants';
import {
  addHorseApi,
  deleteHorseApi,
  editHorseApi,
  getHorseListPaginationApi,
} from '~/service/horse';
import {getNextPageParamUtilForPagination} from '~/utils';

export const useHorseListApiAction = (enabled: boolean) =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.listHorse],
    queryFn: getHorseListPaginationApi,
    getNextPageParam: getNextPageParamUtilForPagination,
    enabled: enabled,
    retry: false,
  });

export const useAddHorseApiAction = (
  options?: UseMutationOptions<
    AddHorseResponse | undefined,
    Error,
    AddHorseRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.addHorseMutate],
    mutationFn: (param: AddHorseRequest) => addHorseApi(param),
    networkMode: 'always',
    ...options,
  });

export const useEditHorseApiAction = (
  options?: UseMutationOptions<
    EditHorseResponse | undefined,
    Error,
    EditHorseRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.addHorseMutate],
    mutationFn: (param: EditHorseRequest) => editHorseApi(param),
    networkMode: 'always',
    ...options,
  });

export const useDeleteHorseApiAction = (
  options?: UseMutationOptions<
    DeleteHorseResponse | undefined,
    Error,
    DeleteHorseRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.deleteHorseMutate],
    mutationFn: (param: DeleteHorseRequest) => deleteHorseApi(param),
    networkMode: 'always',
    ...options,
  });
