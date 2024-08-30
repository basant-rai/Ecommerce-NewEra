import { useCallback, useEffect } from "react";
import { toast } from "sonner";

// 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../@/components/ui/table"
import { getOrderProducts, setRemoveProduct, updateProductToCart } from "../../../redux/slice/order-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"

// 
import { IOrder } from "../../../interface/order";
import axios from "axios";
import { errorMessage } from "../../../utils/helper";
import { AppConfig } from "../../../config/app.config";


const Cart = () => {
  const dispatch = useAppDispatch();
  const { orderProducts } = useAppSelector((store) => store.order)


  useEffect(() => {
    dispatch(getOrderProducts())
  }, [dispatch])

  const increaseOrder = useCallback((order: IOrder) => {
    let product = order.totalOrder

    const update = {
      orderId: order._id,
      totalOrder: product + 1
    }

    dispatch(updateProductToCart(update))
    toast.success("Updated to cart")
  }, [dispatch])

  /* ************************************* Decrease and delete products ***************************************** */
  const decreaseOrder = useCallback(async (order: IOrder) => {
    let product = order.totalOrder
    if (product > 0) {
      const update = {
        orderId: order._id,
        totalOrder: product - 1
      }
      dispatch(updateProductToCart(update))
      toast.success("Updated to cart")
    } else {
      try {
        await axios.delete(`${AppConfig.API_URL}/delete-order/${order._id}`)
      } catch (error) {
        toast.error(errorMessage(error))
      }
      dispatch(setRemoveProduct(order))
      toast.success("Deleted from cart")
    }
  }, [dispatch])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product name</TableHead>
            <TableHead>Product price</TableHead>
            <TableHead>Total amount</TableHead>
            <TableHead>Total order</TableHead>
            <TableHead className="w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderProducts.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order?.product?.productName}</TableCell>
              <TableCell>{order?.product?.productPrice}</TableCell>
              <TableCell>{Number(order?.product?.productPrice) * Number(order?.totalOrder)}</TableCell>
              <TableCell className="">{order?.totalOrder}</TableCell>
              <TableCell>
                <div
                  className="flex items-center border w-[150px] rounded-[6px] overflow-hidden"
                >
                  <button
                    type="button"
                    className="bg-red-700 px-4 py-1 text-white text-xl font-bold w-full"
                    onClick={() => decreaseOrder(order)}
                  >
                    -
                  </button>
                  <span className="px-2 w-full text-center">{order.totalOrder}</span>
                  <button
                    type="button"
                    className="bg-blue-900 px-4 py-1 text-white text-xl font-bold w-full"
                    onClick={() => increaseOrder(order)}
                  >
                    +
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Cart