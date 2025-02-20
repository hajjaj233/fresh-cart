import { Button, Input } from '@heroui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from "yup"

export default function UserDetails() {
    const [Isloading, setIsloading] = useState(false)
    const { cartId } = useParams()

    // async function deliverypayment() {
    //     const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
    //         "shippingAddress": values
    //     }, {
    //         headers: {
    //             token: localStorage.getItem("token")
    //         }
    //     })
    //     // location.href= data.session.url
    //     console.log(data);

    // }
    async function checkout() {
        setIsloading(true)
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {

            "shippingAddress": {
                "details": "details",
                "phone": "01010700999",
                "city": "Cairo"
            }
        }, {
            headers: {
                token: localStorage.getItem("token")
            },
            params: {
                url: "http://localhost:5173"
            }
        })
            setIsloading(false)
        location.href = data.session.url;

    }
    const initialValues = {

        details: '',
        phone: '',
        city: ''
    }
    const validationSchema = Yup.object({

        details: Yup.string().required("details is required"),
        phone: Yup.string().required("phone is required").matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "password must be egyption"),
        city: Yup.string().required("city is required")

    })

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues,
        onSubmit: checkout,
        validationSchema
    })
    return (
        <div>
            <div className="my-10">
                <form onSubmit={handleSubmit}>
                    <div className="w-2/3 grid grid-cols-2 gap-3 mx-auto">
                        <h1 className=' mt-14 mb-6 font-extrabold text-3xl'>complete your details</h1>
                        <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='details'
                            className='rounded-xl border-[1px] col-span-2 border-green-300'
                            value={values.details}
                            type="text"
                            variant="bordered"
                            placeholder="enter your adrress in details"
                        />
                        {touched.details && errors.details && <p className='text-md font-bold text-red-500 '>{errors.details}</p>}

                        <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='rounded-xl border-[1px] col-span-2 border-green-300'
                            value={values.phone}
                            placeholder="Phone number"
                            type="tel"
                            name='phone'
                            variant="bordered"
                        />
                        {touched.phone && errors.phone && <p className='text-md font-bold text-red-500'>{errors.phone} </p>}
                        <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='rounded-xl border-[1px] col-span-2 border-green-300'
                            value={values.city}
                            placeholder="City"
                            type="tel"
                            name='city'
                            variant="bordered"
                        />
                        {touched.city && errors.city && <p className='text-md font-bold text-red-500'>{errors.city} </p>}
                        <Button isLoading={Isloading} type='submit' className='bg-green-500 mt-4 col-span-2 rounded-lg text-white hover:cursor-pointer' color="primary">
                            place order
                        </Button>

                    </div >
                </form>
            </div>
        </div>
    )
}
