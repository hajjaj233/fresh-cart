import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authcontext = createContext()

export default function AuthContextProvider({ children }) {
    const [Isloggedin, setIsloggedin] = useState(false);
    const [Isloading, setIsloading] = useState(true)
    const [userId, setuserId] = useState()

    useEffect(() => {
        if (localStorage.getItem("token")){
        Verifytoken()
        }   
    }, [])

    function Verifytoken() {
        setIsloading(true)
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data: { decoded: { id } } }) => {
            setuserId(id)
            setIsloggedin(true)

        }).catch((err) => {
            setIsloggedin(false)
            localStorage.removeItem("token")

        }).finally(() => {
            setIsloading(false)
        })
    }


    return <authcontext.Provider value={{ Isloggedin, setIsloggedin, Isloading,userId }}>
        {children}
    </authcontext.Provider>

}