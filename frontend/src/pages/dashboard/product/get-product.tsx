import useSWR, { mutate } from 'swr'
import { getProducts } from '../../../API/productApi'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table"
import { displayImage, errorMessage } from '../../../utils/helper'
import Button from '../../../component/reusable/button/button'
import { Link } from 'react-router-dom'
import DeleteModal from './delete-modal'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { AppConfig } from '../../../config/app.config'
import { IProduct } from '../../../interface/product'

type IModal = "update" | "delete"


/**
 * 
 * get product component 
 */
const GetProduct = () => {
  const { data: products } = useSWR('products', getProducts)

  const [modal, setModal] = useState<IModal | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null)

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { data } = await axios.delete(`${AppConfig.API_URL}/product/${id}`)

      const updateProduct = products?.filter((p) => p._id !== product?._id);
      mutate('products', updateProduct)

      toast.message(data.message)
      setModal(null)

    } catch (error) {
      toast.error(errorMessage(error))
    }
  }, [product?._id, products])

  return (
    <div className='w-full'>
      <div className='my-6 flex justify-between items-center pb-4 px-4 border-b'>
        <h6 className="text-2xl font-bold">All Products</h6>
        <Link to={"/dashboard/add-product"}>
          <Button
            buttonType={'button'}
            buttonColor={{
              primary: true,
            }}>
            Add Product
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead>Product image</TableHead>
            <TableHead>Product category</TableHead>
            <TableHead>Product price</TableHead>
            <TableHead>Total products</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, idx) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell className="font-medium w-[400px]">
                <img
                  src={displayImage(product.productImage)}
                  alt={product.productName}
                  className='h-20 w-20'
                />
              </TableCell>
              <TableCell>{product.productCategory.categoryName}</TableCell>
              <TableCell className="">{product.productPrice}</TableCell>
              <TableCell className="">{product.totalProduct}</TableCell>
              <TableCell className="">
                <div className='flex items-center gap-2'>
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <Button
                      buttonType={'button'}
                      buttonColor={{
                        primary: true,
                      }}>
                      Update
                    </Button>
                  </Link>

                  <Button
                    buttonType={'button'}
                    buttonColor={{
                      secondary: true,
                    }}
                    onClick={() => { setModal("delete"); setProduct(product) }}
                  >
                    Delete
                  </Button>
                  {/* <DeleteModal onDelete={() => deleteProduct(product._id)} /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ----------------modal--------------- */}
      {
        product &&
        <DeleteModal
          open={modal === "delete"}
          onClose={() => setModal(null)}
          onDelete={() => deleteProduct(product._id)}
        />
      }
    </div>
  )
}

export default GetProduct;