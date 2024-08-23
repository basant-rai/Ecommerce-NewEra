import { useParams } from 'react-router-dom'
import ProductDetail from '../../component/product/product-details'

const SingleProduct = () => {
  const params = useParams();
  const id = params.id
  console.log("🚀 ~ SingleProduct ~ id:", id)

  return (
    <div>
      {
        id &&
        <ProductDetail id={id} />
      }
    </div>
  )
}

export default SingleProduct