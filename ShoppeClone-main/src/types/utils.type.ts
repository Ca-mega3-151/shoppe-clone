export interface SuccessResponse<Data> {
  message: string
  data: Data
}
// interface tiện ích
export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}
// Cú pháp loại bỏ undefind cua các key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
