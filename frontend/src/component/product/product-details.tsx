import { useEffect, useState } from "react"
import { IProduct } from "../../interface/product";

interface Props {
  id: number
}

const ProductDetail = ({ id }: Props) => {
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const productDetail = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        setProduct(product);
      } catch (error: any) {
        console.log(error);
      }
    }
    productDetail()
  }, [id])

  return (
    <div className="border p-5 rounded-lg space-y-5 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-center">
        <img src={product?.image} alt={product?.title} className="h-[500px]" />
      </div>
      <div className="border-t mt-2">
        <p className="font-bold capitalize">{product?.category}</p>
        <p className="line-clamp-1">{product?.title}</p>
        <div><span className="font-bold">Rating:</span> {product?.rating?.rate}, {product?.rating?.count}</div>
        <p><span className="font-bold">Price:</span>${product?.price}</p>
        <p className="">{product?.description}</p>
      </div>

    </div>

  )
}

export default ProductDetail