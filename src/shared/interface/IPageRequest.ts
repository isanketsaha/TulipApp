export interface IPageRequest<T> {
  page: number
  pageSize?: number
  data: T     
}