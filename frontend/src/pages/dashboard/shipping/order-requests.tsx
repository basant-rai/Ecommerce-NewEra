import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../@/components/ui/table"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useEffect } from "react"
import { getOrderRequest } from "../../../redux/slice/order-slice"
import { Link } from "react-router-dom"

const OrderRequests = () => {
  const dispatch = useAppDispatch()
  const { orderRequests } = useAppSelector((store) => store.order)

  useEffect(() => {
    dispatch(getOrderRequest())
  }, [dispatch])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Request ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {orderRequests && (orderRequests || []).map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order?._id}</TableCell>
              <TableCell>{order?.orderStatus}</TableCell>
              <TableCell>
                <Link to={`/shipping/${order._id}`}>
                  View
                </Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default OrderRequests