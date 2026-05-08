import {AppConstants} from '~/constants';

// function that provides an offset to request a specific page of results.
export const getNextPageParamUtilForOffsetPagination = (
  _lastPage: any,
  _allPages: any[],
  _lastPageParam: any,
  _allPageParams: any[],
) => {
  const totalFetchListLength = _allPages?.flatMap(page => page?.result).length;
  if (totalFetchListLength < _lastPage?.recordsTotal) {
    return totalFetchListLength;
  } else {
    return undefined;
  }
};

// function that provides an next page number to request a specific page of results.
export const getNextPageParamUtilForPagination = (
  _lastPage: any,
  _allPages: any[],
  _lastPageParam: any,
  _allPageParams: any[],
) => {
  if (_lastPage && _lastPageParam && _lastPage?.list?.length !== 0) {
    const totalPages = Math.ceil(
      _lastPage?.totalRecords / AppConstants.PAGE_LIST_SIZE,
    );
    if (totalPages !== _lastPageParam) {
      const newPageParam = _lastPageParam + 1;
      return newPageParam;
    } else {
      return undefined;
    }
  }
  return undefined;
};
