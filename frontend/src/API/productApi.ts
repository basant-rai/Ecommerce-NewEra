import { toast } from "sonner";
import { errorMessage } from "../utils/helper"
import axios from "axios";
import { AppConfig } from "../config/app.config";
import { IProduct } from "../interface/product";
import { useAuth } from "../hooks/useAuth";


export const getProducts = async (url: string) => {
  try {
    const { data } = await axios.get(`${AppConfig.API_URL}/${url}`);
    return data as IProduct[]
  } catch (error) {
    toast.error(errorMessage(error));
  }
}

export const getProductById = async (url: string) => {
  try {
    const { data } = await axios.get(`${AppConfig.API_URL}/${url}`);
    return data as IProduct
  } catch (error) {
    toast.error(errorMessage(error));
  }
}

export const getRelatedProduct = async (url: string) => {
  try {
    const { data } = await axios.get(`${AppConfig.API_URL}/${url}`);
    return data as IProduct[]
  } catch (error) {
    toast.error(errorMessage(error));
  }
}

export const getRecommendedProduct = async (url: string) => {
  try {
    const { data } = await axios.get(`${AppConfig.API_URL}/${url}`);
    return data.products as any[]
  } catch (error) {
    toast.error(errorMessage(error));
  }
}