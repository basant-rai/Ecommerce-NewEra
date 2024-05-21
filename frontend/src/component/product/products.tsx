import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface IProduct {
  category: string,
  description: string,
  id: number,
  image: string,
  rating: {
    rate: number,
    count: number
  }
  title: string,
  price: number
}

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {

    const getProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        setProducts(products)
      } catch (error: any) {
        console.log(error)
      }
    }

    getProducts();

  }, [])

  console.log(products)

  return (
    <div className="grid grid-cols-4 gap-10 p-10">
      {
        products.map((product) => (
          <div key={product.id} className="border p-5 rounded-lg space-y-5">
            <div className="flex items-center justify-center">
              <img src={product.image} alt={product.title} className="h-32 w-32" />
            </div>
            <div className="border-t mt-2">
              <p className="font-bold capitalize">{product.category}</p>
              <p className="line-clamp-1">{product.title}</p>
              <div><span className="font-bold">Rating:</span> {product.rating.rate}, {product.rating.count}</div>
              <p><span className="font-bold">Price:</span> {product.price}</p>
              <p className="line-clamp-2">{product.description}</p>
            </div>
            <div>
              <Link className="bg-red-500 text-white px-4 py-2 rounded-lg " to={`/products/${product.id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Products