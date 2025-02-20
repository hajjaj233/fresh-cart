import React, { useContext, useState } from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from '../../contexts/AuthContext';
export default function Login() {
  const navigate = useNavigate()
  const [isloding, setisloding] = useState(false)
  const [ErrMsg, setErrMsg] = useState("")
  const initialValues = {

    email: '',
    password: '',
  }

  const { setIsloggedin } = useContext(authcontext)

  const validationSchema = Yup.object({

    email: Yup.string().required("email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email incorrect"),
    password: Yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "password must contain one digit,one lowercase letter,one uppercase letter,one special character"),

  })

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues,
    onSubmit: async () => {
      setisloding(true)
      setErrMsg("")
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsloggedin(true);
        navigate("/");
        setisloding(false);
      }).catch((err) => {
        setErrMsg(err.response.data.message)

      }).finally(() => {
        setisloding(false)
      })

    },
    validationSchema
  })
  return (
    <div className="my-10">
      <form onSubmit={handleSubmit}>
        <div className="w-2/3 grid grid-cols-2 gap-3 mx-auto">
          <h1 className=' mt-14 mb-6 font-extrabold text-3xl'>Login now</h1>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name='email'
            className='rounded-xl border-[1px] col-span-2 border-green-300'
            value={values.email}
            placeholder="Enter your name"
            type="text"
            variant="bordered"

          />
          {touched.email && errors.email && <p className='text-md font-bold text-red-500 '>{errors.email}</p>}

          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            className='rounded-xl border-[1px] col-span-2 border-green-300'
            value={values.password}
            placeholder="Enter your password"
            type="password"
            name='password'
            variant="bordered"
          />
          {touched.password && errors.password && <p className='text-md font-bold text-red-500'>{errors.password} </p>}
          <Button isLoading={isloding} type='submit' className='bg-green-500 mt-4 col-span-2 rounded-lg text-white hover:cursor-pointer' color="primary">
            submit
          </Button>
          <p>don't have an account?  <Link to={"/register"} className='text-blue-500'>Sign up</Link> </p>
          <br />
          {ErrMsg && <p className='font-bold text-red-500'>{ErrMsg}</p>}
        </div >
      </form>
    </div>
  )
}
