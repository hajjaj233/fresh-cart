import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default async function Addproducttocart(productId) {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    }
    )
    toast.success("your product added successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

}