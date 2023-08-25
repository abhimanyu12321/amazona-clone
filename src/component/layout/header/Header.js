import React from 'react'
import './header.css'
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";


export default function Header() {
    const options = {
        burgerColorHover: "#eb4034",
        logo,
        logoWidth: "20vmax",
        navColor1: "white",
        logoHoverSize: "10px",
        logoHoverColor: "#eb4034",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.3vmax",
        link1Color: "rgba(35, 35, 35,0.8)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "#eb4034",
        link1Margin: "1vmax",
        profileIconUrl: "/login",
        profileIconColor: "rgba(35, 35, 35,0.8)",
        searchIconColor: "rgba(35, 35, 35,0.8)",
        cartIconColor: "rgba(35, 35, 35,0.8)",
        profileIconColorHover: "#eb4034",
        searchIconColorHover: "#eb4034",
        cartIconColorHover: "#eb4034",
        cartIconMargin: "1vmax",
        profileIcon: true,
        ProfileIconElement: MdAccountCircle,
        searchIcon: true,
        SearchIconElement: MdSearch,
        cartIcon: true,
        CartIconElement: MdAddShoppingCart,
        logoAnimationTime: 0,
        link1AnimationTime: 0,
        link2AnimationTime: 0,
        link3AnimationTime: 0,
        link4AnimationTime: 0,
        link1Transition: 0,
        link2Transition: 0,
        link3Transition: 0,
        link4Transition: 0,
        nav1Transition: 0,
        nav2Transition: 0,
        nav3Transition: 0,
        nav4Transition: 0,
        searchIconAnimationTime: 0,
        cartIconAnimationTime: 0,
        profileIconAnimationTime: 0
    };

    return (

        <ReactNavbar {...options} />
    )
}
