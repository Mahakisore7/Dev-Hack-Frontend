import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if(showMobileMenu){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'auto';
    }
    return ()=> {
      document.body.style.overflow = 'auto';
    };
  },[showMobileMenu])

  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32 bg-transparent'>
        <img src={assets.logo} alt="Logo" className='h-8' />
        <ul className='hidden md:flex gap-8 text-gray-700 '>
          <li><a href="#Header" className='cursor-pointer hover:text-black'>Home</a></li>
          <li><a href="#About" className='cursor-pointer hover:text-black'>About</a></li>
          <li><a href="#Projects" className='cursor-pointer hover:text-black'>Projects</a></li>
          <li><a href="#Testimonials" className='cursor-pointer hover:text-black'>Testimonials</a></li>
        </ul>
        <button className='cursor-pointer hidden md:block bg-white px-8 py-2 rounded-full border border-gray-300'>Sign up</button>
        <img src={assets.menu_icon} className='md:hidden w-7 cursor-pointer' onClick={() => setShowMobileMenu(true)}></img>
      </div>
      {/* ------------------mobile-menu------------- */}
      <div className={`md:hidden ${showMobileMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}>
        <div className='flex justify-end p-6 cursor-pointer'>
          <img src={assets.cross_icon} alt="" className='w-6' onClick={() => setShowMobileMenu(false)}/>
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <a onClick={() => setShowMobileMenu(false)} href="#Header" className='px-4 py-2 rounded-full inline-block'>Home</a>
          <a onClick={() => setShowMobileMenu(false)} href="#About" className='px-4 py-2 rounded-full inline-block'>About</a>
          <a onClick={() => setShowMobileMenu(false)} href="#Projects" className='px-4 py-2 rounded-full inline-block'>Projects</a>
          <a onClick={() => setShowMobileMenu(false)} href="#Testimonials" className='px-4 py-2 rounded-full inline-block'>Testimonials</a>
        </ul>
      </div>
    </div>
  )
}

export default Navbar