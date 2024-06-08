import { Product } from './product.type'
// // Các kiểu trả về của giỏ hàng theo api

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0
// // Quy định kiểu trả về

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  // status: number
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
