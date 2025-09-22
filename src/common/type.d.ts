interface Pagination {
  page?: number;
  limit?: number;
}

type SortDirection = 'asc' | 'desc';

type ObjectToEnum<T> = T[keyof T] extends string | number ? T[keyof T] : never;
