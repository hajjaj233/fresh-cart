import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadingscreen from '../../components/loadingscreen/Loadingscreen'

export default function Categories() {
  const [categories, setcategories] = useState([])
  const [Isloading, setIsloading] = useState(false)

  useEffect(() => {
    getcategories()

  }, [])


  async function getcategories() {
    setIsloading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setcategories(data.data);
    setIsloading(false)

  }
  if (Isloading) {
    return <Loadingscreen />
  }
  return (
    <div>
      <h1 className='text-3xl font-extrabold  text-center py-14'>All Categories</h1>

      <div className="grid grid-cols-3 gap-2">
        {
          categories.map((category, index) => {
            return <div key={index} class="relative  flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg ">
              <div class="relative h-full overflow-hidden text-white rounded-md">
                <img src={category.image} className='hover:scale-110 w-fit transition-all' alt="card-image" />
              </div>
              <div class="p-4">
                <h6 class="mb-2 text-slate-800 text-xl font-semibold">
                  {category.name}
                </h6>
              </div>
            </div>
          })
        }
      </div>

    </div>
  )
}
