import useSWR from 'swr';
import { getRecommendedProduct } from '../../API/productApi';
import { displayImage } from '../../utils/helper';
import { Link } from 'react-router-dom';
import StarRating from '../ratings/rating';

interface Props {
  userId: string
}

const RecommendProducts = ({ userId }: Props) => {
  const { data: products } = useSWR(`recommend-product/${userId}`, getRecommendedProduct);

  return (
    <div className="grid grid-cols-4 gap-10 p-10">
      {
        products?.map((product) => (
          <div key={product._id} className="border p-5 rounded-lg space-y-5">
            <div className="flex items-center justify-center">
              <img
                src={product?.productImage || displayImage(product.productImage)}
                alt={product.productName}
                className="h-32 w-32"
              />
            </div>
            <div className="border-t mt-2">
              <p className="font-bold capitalize">{product?.productCategory?.categoryName}</p>
              <p className="line-clamp-1">{product.productName}</p>
              <div><span className="font-bold">Rating:</span> {product.productRating}
                <StarRating count={product?.productRating || 0} />
              </div>
              <p><span className="font-bold">Price:</span> {product.productPrice}</p>
              <p className="line-clamp-2">{product.productDescription}</p>
            </div>
            <div>
              <Link className="bg-red-500 text-white px-4 py-2 rounded-lg " to={`/products/${product._id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default RecommendProducts