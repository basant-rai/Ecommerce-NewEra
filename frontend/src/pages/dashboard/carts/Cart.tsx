import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// 
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../@/components/ui/table"
import { getOrderProducts, setRemoveProduct, updateProductToCart } from "../../../redux/slice/order-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"

// 
import { IOrder } from "../../../interface/order";
import axios from "axios";
import { errorMessage } from "../../../utils/helper";
import { AppConfig } from "../../../config/app.config";
import Button from "../../../component/reusable/button/button";
import { useAuth } from "../../../hooks/useAuth";


const Cart = () => {
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)


  const dispatch = useAppDispatch();
  const { orderProducts } = useAppSelector((store) => store.order)

  const { userId } = useAuth()


  useEffect(() => {
    dispatch(getOrderProducts())
  }, [dispatch])

  useEffect(() => {
    const order = orderProducts.reduce((accumulator, currentValue) => accumulator + currentValue.totalOrder, 0)
    const amount = orderProducts.reduce((accumulator, currentValue) => accumulator + currentValue.totalOrder * Number(currentValue.product.productPrice), 0)

    setTotalOrder(order)
    setTotalPrice(amount)
  }, [orderProducts])

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

  /* ------------------------ create order ------------------------- */
  const handleCreateOrderRequest = useCallback(async () => {
    try {
      const { data } = await axios.post(`${AppConfig.API_URL}/order-request`, {
        products: orderProducts.map((o) => o.product._id),
        totalOrder: totalOrder,
        totalPrice: totalPrice,
        userId: userId
      })
      console.log("🚀 ~ handleCreateOrderRequest ~ data:", data)
      toast.success("Order requested successfully")
      
    } catch (error) {
      toast.error(errorMessage(error))
    }
  }, [orderProducts, totalOrder, totalPrice, userId])

  return (
    <div>
      <div className='my-6 flex justify-between items-center pb-4 px-4 border-b'>
        <h6 className="text-2xl font-bold">Cart</h6>
        <Button
          buttonType={'button'}
          buttonColor={{
            primary: true,
          }}
          onClick={handleCreateOrderRequest}
        >
          Create order
        </Button>
      </div>
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
              <TableCell>{order?.product.productPrice}</TableCell>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-xl font-bold">Total</TableCell>
            <TableCell className="text-xl font-bold">{totalPrice}</TableCell>
            <TableCell colSpan={2} className="text-xl font-bold">{totalOrder}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default Cart