// Chứa interface
// Hoặc các type lquan đến login - register

import { User } from './user.type'
import { SuccessResponse } from './utils.type'

// lquan den authen
// xem sever tra ve cgi thi khai bao ra
export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
  user: User
}>

export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>
