import { yupResolver } from "@hookform/resolvers/yup";
import Stepper from "../../../component/stepper/Stepper"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../component/reusable/button/button";
import { useCallback } from "react";
import { toast } from "sonner";
import { errorMessage } from "../../../utils/helper";
import axios from "axios";
import { AppConfig } from "../../../config/app.config";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Payment from "./payment";
import { useParams } from "react-router-dom";
import { getOrderRequestById } from "../../../redux/slice/order-slice";



interface IFormData {
  address: string
  zipCode: string
  phoneNumber: string
}

/**
 * 
 */
const registerValidation = yup.object().shape({
  address: yup.string().required("Required"),
  zipCode: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required")
})

const Shipping = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { orderRequest } = useAppSelector((store) => store.order)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(registerValidation),
  });

  const handleSubmitShipping = useCallback(async (value: IFormData) => {
    try {
      if (orderRequest) {
        const { data } = await axios.put(`${AppConfig.API_URL}/order-request/${orderRequest._id}`, {
          orderStatus: "payment",
          address: value.address
        })
        if (id) {
          dispatch(getOrderRequestById(id))
        }
        toast.success("Successful")
        console.log("🚀 ~ handleSubmitShipping ~ data:", data)
      }
    } catch (error) {
      toast.error(errorMessage(error))
    }
  }, [orderRequest, id, dispatch])

  return (
    <div>
      <Stepper />

      <div className="w-[500px] mx-auto">
        {
          orderRequest?.orderStatus === "payment" &&
          <>
            {
              orderRequest &&
              <Payment orderId={orderRequest?._id} />
            }
          </>
        }
        {
          orderRequest?.orderStatus === "shipping" &&
          <div>
            <h6 className="text-xl font-bold mb-4">Shipping Address</h6>
            <form
              className="space-y-5"
              onSubmit={handleSubmit(handleSubmitShipping)}
            >
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your address"
                />
                {
                  errors.address &&
                  <span className='text-red-600 text-sm'>{errors.address.message}</span>
                }
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your phoneNumber"
                />
                {
                  errors.phoneNumber &&
                  <span className='text-red-600 text-sm'>{errors.phoneNumber.message}</span>
                }
              </div>
              <div>
                <label htmlFor="zip-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip Code</label>
                <input
                  type="text"
                  {...register("zipCode")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your zipCode"
                />
                {
                  errors.zipCode &&
                  <span className='text-red-600 text-sm'>{errors.zipCode.message}</span>
                }
              </div>
              <Button
                buttonType={"submit"}
                buttonColor={{
                  primary: true,
                }}
              >
                Submit
              </Button>
            </form>
          </div>
        }
        {

          orderRequest?.orderStatus === "delivered" &&
          <div className="text-5xl text-center font-bold">Delivered Successfully</div>
        }
      </div>
    </div>
  )
}

export default Shipping