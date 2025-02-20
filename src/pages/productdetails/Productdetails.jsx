import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loadingscreen from '../../components/loadingscreen/Loadingscreen';
import Slider from "react-slick";
import "../productdetails/productdetails.css"
import Product from '../../components/Product/Product';
import Addproducttocart from '../../services/CartServices/cartservices';
import { Button } from '@heroui/react';


export default function Productdetails() {
    let { id } = useParams()
    const [productdata, setproductdata] = useState(null)
    const [Isloading, setIsloading] = useState(true)
    const [Relatedproducts, setRelatedproducts] = useState([])
    useEffect(() => {
        getproductdetails()

    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    async function getproductdetails() {
        setIsloading(true)
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id);
        setproductdata(data.data)
        relatedproducts(data.data.category._id)
        setIsloading(false)

    }
    async function relatedproducts(categoryId) {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
        setRelatedproducts(data.data)
        console.log(data);

    }


    if (Isloading) {
        return <Loadingscreen />
    }
    return (

        <div className=" mx-auto bg-white py-3 px-5 mt-20">
            <div className="flex flex-col items-center md:flex-row">

                <div className="md:w-1/3 p-4 relative">
                    <div className=" ">
                        <Slider {...settings}>
                            {
                                productdata?.images.map((img) => {
                                    return <img src={img} alt={productdata?.title} className="w-full h-auto object-cover rounded-lg" />
                                })
                            }

                        </Slider>
                    </div>
                </div>


                <div className="md:w-2/3 p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{productdata?.title}</h1>
                    <h1 className="text-md font-bold text-gray-800 mb-2"> {productdata?.category.name}</h1>

                    <p className="text-sm text-gray-600 mb-2">{productdata?.description}</p>
                    <p className='font-bold mb-2 '> {productdata?.brand.name} </p>

                    <div className="flex justify-between items-center mb-4">
                        <div className="">
                            <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{productdata?.ratingsAverage} ★</span>
                            <span className="text-sm text-gray-500 ml-2">{productdata?.ratingsQuantity} reviews</span>
                        </div>

                        <div className=" flex flex-col font-bold">
                            <span className="text-sm text-gray-500 ml-2">Sold : {productdata?.sold} </span>
                            <span className="text-sm text-gray-500 ml-2">Quantity : {productdata?.quantity} </span>
                        </div>
                    </div>




                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-3xl font-bold text-gray-900">${productdata?.price}</span>
                            <span className="ml-2 text-sm font-medium text-gray-500 line-through">${productdata?.price + 50}</span>
                        </div>
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
                    </div>

                    <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>

                    <div className="flex space-x-4">
                    <Button isLoading={Isloading} onPress={() => Addproducttocart(productdata?._id)} className="mt-5 py-3 px-2 border-2 sm:py-2 sm:px1 border-green-400 font-bold text-black rounded-lg hover:bg-green-400 hover:text-white transition-all hover:cursor-pointer w-full mb-2">Add to Cart <i class="fa-solid fa-cart-shopping"></i></Button>
                    <button href="#" className="mt-5 py-3 px-2 border-2 sm:py-2 sm:px1 border-white font-bold text-white bg-green-500 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-green-300 transition-all hover:cursor-pointer w-full mb-2"> Buy Now  <i class="fa-solid fa-money-check-dollar"></i></button>

                    </div>

                </div>
            </div>
            <br />
            <br />
            <div className="flex justify-center">
            <h2 className='mx-auto font-serif mt10 text-3xl font-bold mb-5 text-black'> Related Products <i className="fa-solid fa-store text-green-400"></i> </h2>
            </div>
            <div className=" border-t-2 border-green-200 w-full  grid md:grid-cols-3 lg:grid-cols-4 gap-4  ">
                {
                    Relatedproducts.map((product, index) => {
                        return <Product key={index} product={product} />
                    })
                }
            </div>
        </div >


    )
}
