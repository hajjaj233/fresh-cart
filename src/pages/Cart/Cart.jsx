import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cartproduct from '../../components/Cartproduct/Cartproduct'
import Loadingscreen from '../../components/loadingscreen/Loadingscreen'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [CartId, setCartId] = useState(null)
  const [CartData, setCartData] = useState(null)
  const [numOfCartItems, setnumOfCartItems] = useState(null)
  const [Isloading, setIsloading] = useState(false)


  useEffect(() => {
    cartproducts()

  }, [])

  async function updateCountOfProducts(productid, count, setdecrementloading, setincrementloading, currentcount) {
    if (count < currentcount) {
      setdecrementloading(true)
    }
    if (count > currentcount) {
      setincrementloading(true)
    }
    const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productid, {
      count
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems)
    setdecrementloading(false)
    setincrementloading(false)
  }





  async function clearallproducts() {
    setIsloading(true)
    const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setCartId(data.cartId);
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems);
    setIsloading(false)
  }

  async function cartproducts() {
    setIsloading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setCartId(data.cartId);
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems);
    setIsloading(false)
  }

  async function deleteoneproduct(productid) {
    setIsloading(true)
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`, {
      headers: {
        token: localStorage.getItem("token")
      }

    })
    setCartId(data.cartId);
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems);
    setIsloading(false)
  }

  if (Isloading) {
    return <Loadingscreen />
  }


  if (numOfCartItems == 0) {
    return <section className='mt-20'>
      <div className="flex items-center justify-between pb-8 border-b border-gray-300">
        <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
        <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{numOfCartItems} Items</h2>
      </div>
      <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
        <div className="col-span-12 md:col-span-7">
          <p className=" text-lg leading-8 font-bold text-gray-600">No products in your cart</p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
            </div>
            <div className="col-span-2">
              <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
            </div>
          </div>
        </div>
      </div>


    </section>
  }
  return (
    <section
      className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div
            className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{numOfCartItems} Items</h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                  </div>
                </div>
              </div>
            </div>
            {
              CartData?.products.map((product) => {
                return <Cartproduct product={product} updateCountOfProducts={updateCountOfProducts} deleteoneproduct={deleteoneproduct} />
              })
            }
            <div className="flex justify-center">
              <Button onPress={() => clearallproducts()} className='px-5 font-bold py-4 border-2 border-red-500 mt-12 rounded-lg hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all'> Clear all cart  <i className="fa-solid fa-trash"></i></Button>

            </div>
          </div>
          <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <div className=" sticky top-5">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary</h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="font-normal text-lg leading-8 text-black">{numOfCartItems} Items</p>
                  <p className="font-medium text-lg leading-8 text-black">${CartData?.totalCartPrice}</p>
                </div>
                <div>
                


                  {
                    numOfCartItems != 0 && <div className="flex justify-center">
                      <div className="flex flex-col gap-5">
                        <Link to={"/userdetails/" + CartId} onPress={() => checkout(CartId)} className="col-span-1 text-center hover:cursor-pointer bg-green-400 rounded-xl  px-5 font-semibold text-lg text-white transition-all p-2 flex justify-center items-center duration-500 hover:bg-white hover:text-black hover:border-2 hover:border-indigo-700">Online payment</Link>

                      </div>
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
