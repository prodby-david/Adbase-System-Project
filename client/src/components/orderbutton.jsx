import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookieBite} from "@fortawesome/free-solid-svg-icons";

const OrderButton = () => {

  return (
    
    <div className=''>
      <a href="/signup" className='p-4 bg-accent-color text-text-color rounded-md cursor-pointer hover:opacity-90 group'>Order Now<FontAwesomeIcon icon={faCookieBite} className='text-text-color ml-1 text-xl group-hover:animate-bounce cursor-pointer'/></a>
    </div>
   
  )
}

export default OrderButton;
