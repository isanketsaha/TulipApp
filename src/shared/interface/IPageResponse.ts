export interface IPageResponse<T> {
  number: number
  size: number
  totalElements: number
  totalPages: number
  content: T[]
}