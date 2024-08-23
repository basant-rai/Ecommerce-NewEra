import { AxiosError } from "axios";
import { AppConfig } from "../config/app.config";

// ------------------------------error Message--------------------------------

export function errorMessage(error: unknown) {
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.error
      : "Something went wrong";
  return errorMessage;
}

// ------------------------------display Image--------------------------------

export function displayImage(path?: string) {
  const imageUrl = `${AppConfig.IMAGE_URL}/${path}`
  return imageUrl;
}