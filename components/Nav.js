import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProviderLogo from '../components/ProviderLogo'
import { useRouter } from 'next/router';
import Genre from "components/Genre";





const Nav= () => {
  
  const router = useRouter();

 
  return (
 
<div>
        <nav className='flex flex-grow   '>
        
        <div className=' sm:flex  px-10 flex-grow   justify-evenly'>
          <div></div>

          <button className='  font-sans px-4 cursor-pointer hover:animate-bounce hover:text-white 'onClick = {() => router.push('/home' )} >
          About
          </button>

          <button className='  font-sans px-4 cursor-pointer hover:animate-bounce hover:text-white 'onClick = {() => router.push('/search' )} >
          Search
          </button>



          <button className='  font-family: Arial px-4 cursor-pointer hover:animate-bounce hover:text-white 'onClick = {() => router.push('/trending' )} >
          All
          </button>

          <button className='px-4 cursor-pointer hover:animate-bounce hover:text-white' onClick = {() => router.push('/movies' )}>
          Movies
          </button>

          <button className='px-4 cursor-pointer hover:animate-bounce hover:text-white'onClick = {() => router.push('/series' )}>
          Series
          </button>

         
       

        
          </div>
        

          </nav>

          
          </div>   

          

        
       
        

  )
}

export default Nav