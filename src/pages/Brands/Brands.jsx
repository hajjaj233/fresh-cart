import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadingscreen from '../../components/loadingscreen/Loadingscreen'

export default function Brands() {
  const [brands, setbrands] = useState([])
  const [Isloading, setIsloading] = useState(false)
  useEffect(() => {
    getbrands()

  }, [])


  async function getbrands() {
    setIsloading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setbrands(data.data)
    setIsloading(false)

  }

  if (Isloading) {
    return <Loadingscreen />
  }
  return (
    <div >
      <h1 className='text-3xl font-extrabold  text-center py-14'>All Brands</h1>
      <div className="grid grid-cols-4 gap-5">
        {
          brands.map((brand, index) => {
            return <div key={index} class="flex flex-col bg-slate-100 shadow-sm border border-slate-200 rounded-lg ">
              <div className=" overflow-hidden rounded-md h-full flex justify-center items-center">
                <img className="w-full h-full hover:scale-110 transition-all object-cover" src={brand.image} alt="profile-picture" />
              </div>
              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-bold text-slate-800">
                  {brand.name}
                </h4>


              </div>

            </div>
          })
        }
      </div>

    </div>
  )
}
