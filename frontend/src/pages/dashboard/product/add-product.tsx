import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import axios from "axios";

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner";
import { errorMessage } from "../../../utils/helper";
import { AppConfig } from "../../../config/app.config";
import Button from "../../../component/reusable/button/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../@/components/ui/select";
import useSWR from "swr";
import { getCategories } from "../../../API/categoryApi";
import { Link } from "react-router-dom";


interface IProductForm {
  product_name: string,
  product_price: number,
  product_description: string,
  product_rating: number,
  product_category: string,
  total_product: number
  product_image?: any
}

const productValidation = yup.object().shape({
  product_name: yup.string().required("Name is required"),
  product_price: yup.number().required("Price is required"),
  product_description: yup.string().required("Description is required"),
  product_rating: yup.number().required("Rating is required"),
  product_category: yup.string().required("Category is required"),
  total_product: yup.number().required("Product is required"),
  product_image: yup.mixed()
})

const AddProductForm = () => {
  const { data: categories } = useSWR("/viewcategory", getCategories)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IProductForm>({
    resolver: yupResolver(productValidation),
  });

  const onAddProduct = useCallback(async (values: IProductForm) => {
    const productImage = values.product_image?.[0]
    const productData = new FormData();

    productData.append('productName', values.product_name);
    productData.append('productPrice', String(values.product_price));
    productData.append('productDescription', String(values.product_description));
    productData.append('productRating', String(values.product_rating));
    productData.append('productCategory', values.product_category);
    productData.append('totalProduct', String(values.total_product));
    productData.append('productImage', productImage);

    try {
      const { data } = await axios.post(`${AppConfig.API_URL}/add-product`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      toast.success(data.response?.message || "Added successfully")
      reset()
    } catch (error: unknown) {
      toast.error(errorMessage(error))
    }
  }, [reset])

  return (
    <div>
      <div className='my-6 flex justify-between container'>
        <h6 className="text-2xl font-bold">Add Product</h6>
        <Link to={"/dashboard/products"}>
          <Button
            buttonType={'button'}
            buttonColor={{
              primary: true,
            }}>
            Go back
          </Button>
        </Link>
      </div>

      <form
        className="max-w-2xl mx-auto border rounded-lg"
        onSubmit={handleSubmit(onAddProduct)}
      >
        <div className="m-5">
          <div className="mb-5">
            <label
              htmlFor="productname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input
              type="text"
              id="productname"
              {...register("product_name")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_name &&
              <span className="text-red-600">{errors.product_name.message}</span>
            }
          </div>

          <div className="mb-5">
            <label
              htmlFor="productprice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="number"
              id="productprice"
              {...register("product_price")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_price &&
              <span className="text-red-600">{errors.product_price.message}</span>
            }
          </div>

          <div className="mb-5">
            <label htmlFor="productdescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
            <input
              type="productdescription"
              id="productdescription"
              {...register("product_description")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_description &&
              <span className="text-red-600">{errors.product_description.message}</span>
            }
          </div>

          <div className="mb-5">
            <label
              htmlFor="productrating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Rating</label>
            <input
              type="number"
              id="productrating"
              {...register("product_rating")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_rating &&
              <span className="text-red-600">{errors.product_rating.message}</span>
            }
          </div>

          <div className="mb-5">
            <label
              htmlFor="totalproduct"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Product</label>
            <input
              type="text"
              id="totalproduct"
              {...register("total_product")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.total_product &&
              <span className="text-red-600">{errors.total_product.message}</span>
            }
          </div>
          <div>
            <label htmlFor="product_category">Product category</label>
            <Controller
              name="product_category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories?.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="mt-5">
            <input
              {...register("product_image")}
              type="file"
              accept="image/*"
            />
          </div>
          <div className="mt-8">
            <Button
              buttonType={'submit'}
              buttonColor={{
                primary: true,
              }}>
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm