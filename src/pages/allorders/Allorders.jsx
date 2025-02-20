import React, { useContext, useEffect, useState } from 'react'
import { authcontext } from '../../contexts/AuthContext'
import axios from 'axios';

export default function Allorders() {
    const { userId } = useContext(authcontext)
    const [orderdata, setorderdata] = useState([])
    console.log(userId);

    useEffect(() => {
        getorders()
    }, [])

    function getorders() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then((data) => {
            console.log(data.data);

            setorderdata(data.data);

        })
    }

    return (
        <div className="p-4 flex flex-col justify-center mt-9 rounded-lg h-50 bg-white shadow-md">
            <div >
                <div className="">
                    <h4 className='font-bold line-clamp-1'>thanks for visit....</h4>
                    <p className='text-slate-200 font-bold'>your order is placed successfully</p>
                    
                </div>
            </div>

        </div>
    )
}
