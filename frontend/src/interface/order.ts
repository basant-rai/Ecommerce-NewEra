import { IProduct } from "./product";

export interface IOrder {
  _id: string
  product: IProduct
  totalOrder: number
  createdAt: string
  updatedAt: string
}