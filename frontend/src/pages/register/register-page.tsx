import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../../component/reusable/button/button'


interface IRegisterForm {
  first_name: string,
  last_name: string,
  phone_number: number,
  password: string,
  email: string,
  // agree: boolean
}

const RegisterPage = () => {

  const registerValidation = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email("Please enter a valid email address").required('Email is required'),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      ),
    // agree: yup.boolean().required("required"),
    phone_number: yup.number().required("Phone number is required")
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerValidation),
  });

  const onRegister = useCallback((values: IRegisterForm) => {
    console.log(values);
  }, [])

  return (
    <div className='w-[700px] mx-auto rounded-lg border mt-5 shadow-lg p-4'>
      <h6 className='font-bold text-4xl pb-2 border-b'>Create a new account</h6>
      <form onSubmit={handleSubmit(onRegister)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 pt-4">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John"
            />
            {
              errors.first_name &&
              <span className='text-red-600 text-sm'>{errors.first_name.message}</span>
            }
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" />
            {
              errors.last_name &&
              <span className='text-red-600 text-sm'>{errors.last_name.message}</span>
            }
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input
              type="tel"
              {...register("phone_number")}
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" />
            {
              errors.phone_number &&
              <span className='text-red-600 text-sm'>{errors.phone_number.message}</span>
            }
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" />
          {
            errors.email &&
            <span className='text-red-600 text-sm'>{errors.email.message}</span>
          }
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password" />
          {
            errors.password &&
            <span className='text-red-600 text-sm'>{errors.password.message}</span>
          }
        </div>
        {/* <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
          <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
        </div> */}
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              // {...register("agree")}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            {/* {
              errors.agree &&
              <span className='text-red-600 text-sm'>{errors.agree.message}</span>
            } */}
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link to="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link>.</label>
        </div>
        <Button
          buttonType={'submit'}
          buttonColor={{
            primary: true,
          }} >
          Register
        </Button>
      </form>
    </div>


  )
}

export default RegisterPage