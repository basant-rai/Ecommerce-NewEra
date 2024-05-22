import { useParams } from 'react-router-dom'
import ProductDetail from '../../component/product/product-details'

const SingleProduct = () => {
  const params = useParams();
  const id = params.id

  return (
    <div>
      {
        id &&
        <ProductDetail id={Number(id)} />
      }
    </div>
  )
}

export default SingleProduct