import axios from "axios";
import { AppConfig } from "../config/app.config";
import { ICategory } from "../interface/product";
import { errorMessage } from "../utils/helper";
import { toast } from "sonner";


export const getCategories = async (url: string) => {
  try {
    const { data } = await axios.get(`${AppConfig.API_URL}/${url}`);
    return data as ICategory[]
  } catch (error) {
    toast.error(errorMessage(error));
  }
}