import { Button } from '@heroui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Addproducttocart from '../../services/CartServices/cartservices';
import axios from 'axios';


export default function Product({ product }) {
    const [Isloading, setIsloading] = useState(false)
    const [color, setcolor] = useState("")
    const [wishlist, setwishlist] = useState([])
    

   async function addtowishlist(productId){
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            "productId": " "
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setwishlist(data.data);
        setcolor("black")
        
    }

    return (
        <div className="p-7 relative flex flex-col justify-center mt-9 rounded-lg h-full bg-white shadow-2xl">
            <Link to={"/product/" + product._id}>
                <div className="overflow-hidden">
                    <img src={product.imageCover} className='w-full rounded-lg hover:scale-107 transition-all' alt="product image" />
                </div>
                <div className="">
                    <h4 className='font-bold line-clamp-1'>{product.title}</h4>
                    <p className='text-gray-950 line-clamp-2'>{product.description}</p>
                    <p className="item-price"><strike>${product.price + 40}</strike> <b className='text-green-500 font-bold'>${product.price}</b></p>

                </div>
            </Link>
            <Button isLoading={Isloading} onPress={() => Addproducttocart(product._id)} className="mt-5 py-3 px-2 border-2 sm:py-2 sm:px1 border-green-400 font-bold text-black rounded-lg hover:bg-green-400 hover:text-white transition-all hover:cursor-pointer w-full mb-2">Add to Cart <i class="fa-solid fa-cart-shopping"></i></Button>

        </div>
    )
}
