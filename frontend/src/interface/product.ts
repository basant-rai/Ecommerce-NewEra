export interface IProduct {
  productCategory: ICategory,
  productDescription: string,
  productName: string,
  productPrice: string,
  productRating: string,
  totalProduct: number
  createdAt: string
  productImage: string
  _id: string
}

export interface ICategory {
  _id: string
  categoryName: string
}