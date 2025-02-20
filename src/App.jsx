
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Brands from './pages/Brands/Brands'
import Categories from './pages/Categories/Categories'
import Notfound from './pages/Notfound/Notfound'
import Cart from './pages/Cart/Cart'
import { HeroUIProvider } from "@heroui/react";
import Protectedroute from './protect/Protectedroute'
import AuthContextProvider from './contexts/AuthContext'
import Authprotect from './protect/Authprotect'
import Productdetails from './pages/productdetails/Productdetails'
import { ToastContainer } from 'react-toastify';
import UserDetails from './pages/userdetails/UserDetails'
import Allorders from './pages/allorders/Allorders'

function App() {
  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Protectedroute><Home/></Protectedroute> },
        { path: "/login", element:<Authprotect><Login/></Authprotect>  },
        { path: "/register", element:<Authprotect><Register/></Authprotect>  },
        { path: "/brands", element: <Protectedroute><Brands/></Protectedroute> },
        { path: "/categories", element: <Protectedroute><Categories/></Protectedroute> },
        { path: "/cart", element: <Protectedroute><Cart/></Protectedroute> },
        { path: "/userdetails/:cartId", element: <Protectedroute><UserDetails/></Protectedroute> },
        { path: "/product/:id", element: <Protectedroute><Productdetails/></Protectedroute> },
        { path: "/allorders", element: <Protectedroute><Allorders/></Protectedroute> },
        { path: "*", element: <Notfound /> }


      ]
    }
  ])
  return (
    <>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer/>
        </HeroUIProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
