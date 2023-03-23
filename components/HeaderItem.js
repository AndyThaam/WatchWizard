import React from 'react'

function HeaderItem({Icon,title}) {
  return (
    <div className='flex flex-col  cursor-pointer group w-25 sm:w-30  hover:text-white'>
    <Icon className ="h-7 tracking-widest group-hover:animate-bounce" />
    <p className="opacity-0 group-hover:opacity-100 tracking-widest">{title} </p>   

    </div>
  )
}

export default HeaderItem