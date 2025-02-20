import React, { useState } from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate()
    const [isloading, setisloading] = useState(false)
    const [ErrMsg, setErrMsg] = useState("")

    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '+20',
    }

    const onSubmit = () => {
        setisloading(true)
        setErrMsg("")
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((res) => {
            navigate("/login")
        }).catch((err) => {
            setErrMsg(err.response.data.message)

        }).finally(() => {
            setisloading(false)
        })
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("name is required").min(3, "minimum characters is 3").max(20, "maximum characters is 21"),
        email: Yup.string().required("email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email incorrect"),
        password: Yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must contain one digit,one lowercase letter,one uppercase letter,one special character"),
        rePassword: Yup.string().required("required").oneOf([Yup.ref('password')], 'should be similar to password'),
        phone: Yup.string().required("phone is required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'incorrect phone number')

    })

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    return (
        <div className="my-10">
            <form onSubmit={handleSubmit}>
                <div className="w-2/3 grid grid-cols-2 gap-3 mx-auto">
                    <h1 className=' mt-14 mb-6 font-extrabold text-3xl'>register now</h1>
                    <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='name'
                        className='rounded-xl border-[1px] col-span-2 border-green-300'
                        value={values.name}
                        placeholder="Enter your name"
                        type="name"
                        variant="bordered"

                    />
                    {touched.name && errors.name && <p className='text-md font-bold text-red-500'>{errors.name}</p>}
                    <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='rounded-xl border-[1px] col-span-2 border-green-300'
                        value={values.email}
                        placeholder="Enter your email"
                        type="text"
                        variant="bordered"
                        name='email'
                    />
                    {touched.email && errors.email && <p className='text-md font-bold text-red-500 '>{errors.email}</p>}

                    <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='rounded-xl border-[1px] col-span-2 border-green-300'
                        value={values.password}
                        placeholder="Enter your Password"
                        type="password"
                        name='password'
                        variant="bordered"
                    />
                    {touched.password && errors.password && <p className='text-md font-bold text-red-500'>{errors.password} </p>}

                    <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='rounded-xl border-[1px] col-span-2 border-green-300'
                        value={values.rePassword}
                        placeholder="re-enter your password"
                        type="password"
                        name='rePassword'
                        variant="bordered"
                    />
                    {touched.rePassword && errors.rePassword && <p className='text-md font-bold text-red-500'>{errors.rePassword}</p>}

                    <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='rounded-xl border-[1px] col-span-2 border-green-300'
                        value={values.phone}
                        placeholder="enter your phone"
                        type="tel"
                        name='phone'
                        variant="bordered"

                    />
                    {touched.phone && errors.phone && <p className='text-md font-bold text-red-500'>{errors.phone}</p>}

                    <Button type='submit' isLoading={isloading} className='bg-green-500 mt-4 col-span-2 rounded-lg text-white hover:cursor-pointer' color="primary">
                        submit
                    </Button>
                    <p>Already have an account?  <Link to={"/login"} className='text-blue-500'>Sign in</Link> </p>
                    {ErrMsg && <p className='font-bold text-red-500'>{ErrMsg}</p>}
                </div >
            </form>
        </div>
    )
}
