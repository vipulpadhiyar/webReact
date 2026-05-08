type PaginationData<T> = {
  recordsTotal: number;
  recordsFiltered: number;
  result: T;
};

type PaginationRequest = {
  limit?: number;
  offset?: number;
  search?: string;
  sortOrder?: string;
  sortBy?: string;
};
