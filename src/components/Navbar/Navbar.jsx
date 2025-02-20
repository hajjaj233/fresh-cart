import React, { useContext } from 'react'
import {
    Navbar as HeroNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,

} from "@heroui/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { authcontext } from '../../contexts/AuthContext';
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate()
    const menuItems = [
        "Home",
        "Brands",
        "Categories",
        "Cart",
        "Log Out",
    ];
    const {Isloggedin,setIsloggedin} = useContext(authcontext)
    function logout() {
        localStorage.removeItem("token")
        navigate("/login")
        setIsloggedin(false)
    }
    return (
        <HeroNavbar shouldHideOnScroll className='bg-white shadow-2xl' onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <h3 className=" font-bold text-inherit text-3xl"><i className="text-3xl fa-solid fa-cart-shopping text-green-700"></i> fresh cart</h3>
                </NavbarBrand>
            </NavbarContent>

            {Isloggedin && <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink className='text-lg' color="foreground" to="/">
                        home
                    </NavLink>
                </NavbarItem>
                <NavbarItem >
                    <NavLink className='text-lg' to="/brands">
                        brands
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink className='text-lg' color="foreground" to="/categories">
                        categories
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink className='text-lg' color="foreground" to="/cart">
                        Cart
                    </NavLink>
                </NavbarItem>

            </NavbarContent>

            }

            {Isloggedin ?
                <NavbarContent justify="end">
                    <NavbarItem className="flex">
                        <Button className='text-lg hover:font-bold hover:scale-z-105 hover:text-red-500 transition-all hover:cursor-pointer' onPress={logout} >Log out</Button>
                    </NavbarItem>
                </NavbarContent>
                :
                <NavbarContent justify="end">
                    <NavbarItem className="flex">
                        <NavLink className='text-lg' to="/login">Login</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink className='text-lg' to="/register" >
                            Sign Up
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>


            }



            {Isloggedin && <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem className='w-fit' key={index}>
                        <NavLink color={"foreground"} to={item == menuItems[0] ? "/" : '/' + item}>

                            {item}
                        </NavLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>}
        </HeroNavbar>
    );

}
