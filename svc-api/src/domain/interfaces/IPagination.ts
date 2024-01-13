export interface IPaginationQuery {
  limit?: number
  skip?: number
}

export interface IPagination<T> extends Required<IPaginationQuery> {
  count: number
  data: T[]
}
