import React from 'react'
import { Link } from 'react-router-dom'
import {BsArrowLeft} from "react-icons/bs"

const BackButton = ({destination = "/"}) => { //destination is given because this BackButton is made for Showdetails page and when click BackButton, it should go to the "/"(root directory) after which show details came from
  return (
    <div className='flex'>
      <Link 
        to={destination} 
        className='bg-sky-800 text-white px-4 rounded-lg w-fit'>
            <BsArrowLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default BackButton
