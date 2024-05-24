import ProductWithContext from '../../component/product/product-context'
import Products from '../../component/product/products'

const Product = () => {
  return (
    <div>
      <Products />
      <ProductWithContext/>
    </div>
  )
}

export default Product