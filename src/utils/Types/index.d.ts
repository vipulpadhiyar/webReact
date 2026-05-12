// Can vary depending on your BE response
export interface IApiSuccess<T> {
  data: T;
  message?: string;
  statusCode?: number;
}
export interface IApiError {
  message?: string;
  status: number;
}
export interface ICommonPagination {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  cityId?: string;
  categoryId?: string;
  isActive?: boolean;
  filter?: string;
  status?: string;
  vendorStatus?: string;
  city?: string;
  role?: string;
  startDate?: any;
  endDate?: any;
  isOnline?: any;
  isOffline?: any;
  isAllTimeAvailable?: any;
  areaId?: string;
  isPrimary?: boolean;
  isManual?: boolean;
}
