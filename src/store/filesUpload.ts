import {useMutation, UseMutationOptions} from '@tanstack/react-query';

import {MutationQueryKeys} from '~/constants';
import {fileUploadApi} from '~/service';

export const useFileUploadApiAction = (
  options?: UseMutationOptions<
    FileResponseItemType | undefined,
    Error,
    FileUploadRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.fileUploadMutate],
    mutationFn: (param: FileUploadRequestType) => fileUploadApi(param),
    networkMode: 'always',
    ...options,
  });
