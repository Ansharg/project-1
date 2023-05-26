import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
  return (
    <button className='flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 rounded uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'> <FcGoogle className='mr-2 bg-white rounded-full text-2xl p-[0.1rem] '/> Continue With Google</button>
  )
}
