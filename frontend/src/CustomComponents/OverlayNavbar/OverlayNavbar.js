import React, { useState } from 'react'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import { useRef } from 'react';
import { MdAccountBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import "./overlaynavbar.css"
import "./burger.css"


const OverlayNavbar = () => {
    const [showOverlay, setShowOverlay] = useState(false)

    const overlay_menu = useRef(null);

    const handleClick = () => {
        overlay_menu.current.classList.toggle("openmenu");
        setShowOverlay(prev => !prev)
    }

    return (
        <>
            <div ref={overlay_menu} onClick={handleClick} className="inner-menu ">
                <span className='slice-1' ></span>
                <span className='slice-2' ></span>
                <span className='slice-3' ></span>
            </div>

            <div style={{  transition: showOverlay ? "0s":"1.5s" ,  transform: showOverlay ? "translateY(0)" : "translateY(-100%)",}} className="overlay-navbar">
                <div style={{
                    transform: showOverlay ? "translateY(0)" : "translateY(-100%)",
                }} className={` items div-1  `}  >
                    <Link onClick={handleClick} style={{  transform: showOverlay ? "translateX(0)" : "translateX(-200%)", transition:"1.2s" }}  className='Link' to="/" > E-Commerce </Link>
                </div>

                <div style={{  transform: showOverlay ? "translateY(0)" : "translateY(-100%)", }} className={` items div-2  `}  >
                    <Link onClick={handleClick}  style={{  animation: showOverlay ? "main_links 1s" : "main_links_Back 0.5s forwards ",  }} className='Link' to="/" > Home </Link>
                    <Link  onClick={handleClick} style={{  animation: showOverlay ? "main_links 2s" : "main_links_Back 0.8s forwards ",   }} className='Link' to="/products" > Products </Link>
                </div>
                <div style={{
                    transform: showOverlay ? "translateY(0)" : "translateY(-100%)",
                }} className={` items div-3 `}  >
                    <Link onClick={handleClick} style={{  animation: showOverlay ? "main_links 3s" : "main_links_Back 0.5s forwards ",   }} className='Link' to="/contact" > Contact </Link>
                    <Link onClick={handleClick} style={{  animation: showOverlay ? "main_links 4s" : "main_links_Back 0.8s forwards ",   }} className='Link' to="/about" > About </Link>
                </div>
                <div style={{
                    transform: showOverlay ? "translateY(0)" : "translateY(-100%)",
                }} className={` items div-4 `}  >
                    <Link onClick={handleClick} style={{  transform: showOverlay ? "translateX(0)" : "translateX(270px)", transition: showOverlay ? "1.5s":"1.5s" , transitionDelay: showOverlay ? "1s":"  "    }} className='Link' to="/Search" > <FaSearch />  </Link>
                    <Link onClick={handleClick} style={{  transform: showOverlay ? "translateX(0)" : "translateX(250px)", transition: showOverlay ? "2s":"1.5s" , transitionDelay: showOverlay ? "1.5s":"  "  }} className='Link' to="/Cart" > <FaShoppingCart />  </Link>
                    <Link onClick={handleClick} style={{  transform: showOverlay ? "translateX(0)" : "translateX(250px)", transition: showOverlay ? "2.5s":"1.5s" , transitionDelay:  showOverlay ? "2s":"  " }} className='Link' to="/login" > <MdAccountBox />  </Link>
                </div>
            </div>
        </>
    )
}

export default OverlayNavbar

