import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../../components/Product/Product'
import Loadingscreen from '../../components/loadingscreen/Loadingscreen'
import Slider from "react-slick";


export default function Home() {
  const [Isloading, setIsloading] = useState(true)
  const [products, setproducts] = useState([])
  useEffect(() => {

    getproduct()
  }, [])

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  async function getproduct() {
    setIsloading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    console.log(data.data);
    
    setproducts(data.data)
    setIsloading(false)

  }
  if (Isloading) {
    return <Loadingscreen />
  }
  return (
    <div>
      {/* <Slider {...settings}>
        {
          products?.images.map((img) => {
            return <img src={img} alt={productdata?.title} className="w-full h-auto object-cover rounded-lg" />
          })
        }

      </Slider> */}
      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-5 ">
        {
          products.map((product, index) => {
            return <Product key={index} product={product} />
          })



        }
      </div>
    </div>
  )
}
