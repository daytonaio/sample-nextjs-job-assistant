import { Link } from "react-router-dom"
import AppLogo from "../assets/img/logo.png";
import React, { useState } from 'react';
import Hamburger from './Hamburger';
import Close from './Close';


export default function NavBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOn, setBurger] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const burgerClicked = () => {
    setBurger(!burgerOn);
  };

  return (
    <nav className={`flex justify-between space-x-6  font-semibold px-8 ${burgerOn ? 'mb-32' : 'mb-8'}`}>

      {/* Desktop Menu */}
      <Link to="/">
          <div className="logo-img pr-5 flex items-center">
            <img src={AppLogo} alt="Logo img" className="h-16 w-16 mt-4" />

            <div className="pl-4 font-bold text-xl max-md:hidden">Ex-Cons Thrive</div>
          </div>
        </Link>
      <div className='hidden md:p-6 md:flex md:justify-around items-center md:space-x-6 '>
      
        <Link to="/features"  className="cursor-pointer">Features</Link>
        <Link to="/faq"  className="cursor-pointer">FAQ</Link>
        <Link to="/services"  className="cursor-pointer">Explore</Link>
      </div>

      {/* Hamburger Menu Button */}
      <button className='md:hidden p-6' onClick={burgerClicked}>
        {!burgerOn ? <Hamburger/> : <Close/>}
        </button>

      {/* Mobile Menu */}
      {burgerOn && (
        <div className='absolute top-16 right-0 w-full   p-4 shadow-lg z-20 md:hidden'>
          <Link to="/features" className=" block px-4 py-2 text-sm text-gray-700" onClick={burgerClicked}>Features</Link>
          <Link to="/faq" className=" block px-4 py-2 text-sm text-gray-700" onClick={burgerClicked}>FAQ</Link>
          <Link to="/services"  className=" block px-4 py-2 text-sm text-gray-700" onClick={burgerClicked}>Explore</Link>

          
          
        </div>
      )}
    </nav>
  );
}
