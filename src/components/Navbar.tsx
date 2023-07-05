import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex fixed p-4 py-12 bg-black text-gray-100 h-full w-44 sm:w-52 md:w-60 shadow-md'>
      <div className='flex flex-col gap-6 w-[95%]'>
        <Link to={"/"} className="w-[100%] font-normal uppercase text-base px-4 py-3 text-start rounded-md hover:bg-gray-800">Charts and Maps</Link>
        <Link to={"/contacts"} className="w-[100%] font-normal uppercase text-base px-4 py-3 text-start rounded-md hover:bg-gray-800">Contact</Link>
      </div>
    </div>
  )
}

export default Navbar;