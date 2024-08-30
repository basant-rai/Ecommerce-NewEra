import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppConfig } from "../../config/app.config";
import { useAuth } from "../../hooks/useAuth";
import { IOrder } from "../../interface/order";

interface IInitialState {
  orderProducts: IOrder[]
}

const initialState: IInitialState = {
  orderProducts: []
}

export const getOrderProducts = createAsyncThunk(
  'product-orders',
  async () => {
    const { userId } = useAuth()
    try {
      const { data } = await axios.get(`${AppConfig.API_URL}/get-order/${userId}`)

      return {
        success: true,
        message: "Successful",
        data
      }

    } catch (error) {
      return {
        success: false,
        message: "Failed to get orders"
      }
    }
  }
)

export const addProductToCart = createAsyncThunk(
  'add-product',
  async ({ productId, totalOrder }: { productId: string, totalOrder: number }) => {
    const { userId } = useAuth()
    try {

      const { data } = await axios.post(`${AppConfig.API_URL}/create-order`, {
        userId: userId,
        productId,
        totalOrder: totalOrder
      })

      return {
        success: true,
        message: "Added to cart",
        data
      }

    } catch (error) {
      return {
        success: false,
        message: "Failed to add order"
      }
    }
  }
)

export const updateProductToCart = createAsyncThunk(
  'update-cart',
  async ({ orderId, totalOrder }: { orderId: string, totalOrder: number }) => {
    const { accessToken } = useAuth()
    try {
      const { data } = await axios.put(`${AppConfig.API_URL}/update-order/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer${accessToken}`
          },
          totalOrder: totalOrder
        }
      )
      console.log("🚀 ~ data:", data)
      return {
        success: true,
        message: "Update to cart",
        data
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to update order"
      }
    }
  }
)


/**
 * 
 */
export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setRemoveProduct: (state, action: PayloadAction<IOrder>) => {
      const updatedProduct = action.payload;
      const orders = state.orderProducts;
      const removeOrder = orders.filter((o) => o._id !== updatedProduct._id)
      state.orderProducts = removeOrder
    }
  },
  extraReducers(builder) {
    builder.addCase(getOrderProducts.fulfilled, (state, action) => {
      state.orderProducts = action.payload.data
    })
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      const product = action.payload.data;
      state.orderProducts.push(product)
    })
    builder.addCase(updateProductToCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        const updatedProduct = action.payload.data;
        const orders = state.orderProducts;
        if (updatedProduct) {
          const index = orders.findIndex((o) => o._id === updatedProduct._id);
          if (index !== -1) {
            orders[index] = updatedProduct;
          }
        }
      }
    })
  },
})

export const { setRemoveProduct } = OrderSlice.actions;
export default OrderSlice.reducer;