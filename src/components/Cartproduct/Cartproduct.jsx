import { Button } from '@heroui/react'
import React, { useState } from 'react'

export default function Cartproduct({ product, deleteoneproduct, updateCountOfProducts }) {
    const [decrementloading, setdecrementloading] = useState(false)
    const [incrementloading, setincrementloading] = useState(false)



    return (
        <div
            className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
            <div className="w-full md:max-w-[126px]">
                <img src={product.product.imageCover} alt="perfume bottle image"
                    className="mx-auto rounded-xl object-cover" />
            </div>
            <div className="grid grid-cols-1 relative md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">{product.product.title}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{product.product.category.name}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${product.price}</h6>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center justify-center h-full">
                        <Button onPress={() => updateCountOfProducts(product.product._id, product.count - 1, setdecrementloading, setincrementloading, product.count)}
                            className='cursor-pointer py-2 px-4 flex justify-center items-center rounded-md bg-gray-100 hover:bg-gray-300'> {decrementloading ?<i className='fas fa-spinner fa-spin text-blue-400 '></i> : "-"} </Button>

                        <input
                            type="text"
                            value={product.count}
                            className=" border-gray-200 outline-none text-gray-900 font-semibold text-lg w-fit max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1" />

                        <Button onPress={() => updateCountOfProducts(product.product._id, product.count + 1, setdecrementloading, setincrementloading, product.count)}
                            className='cursor-pointer py-2 px-4 flex justify-center items-center rounded-md bg-gray-100 hover:bg-gray-300 '> {incrementloading ?<i className='fas fa-spinner fa-spin text-blue-400'></i> : "+"}</Button>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">${product.price * product.count}</p>
                </div>
                <i onClick={() => deleteoneproduct(product.product._id)} className="fa-solid fa-trash text-red-500 absolute bottom-0 end-0 hover:font-bold hover:text-lg hover:text-red-800 hover:cursor-pointer"></i>
            </div>
        </div>
    )
}
