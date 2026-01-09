export interface ApiError {
  code?: string;
  message: string;
  field?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: ApiError[];
  message?: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
