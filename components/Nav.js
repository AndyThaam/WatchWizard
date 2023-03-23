import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProviderLogo from '../components/ProviderLogo'
import { useRouter } from 'next/router';
import Genre from "components/Genre";





const Nav= () => {
  
  const router = useRouter();

  const [selectedWatch, setSelectedWatch] = useState([]);

  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watches, setWatch] = useState([]);
  return (
 
   
        <nav className='flex flex-grow   '>
        
        <div className=' sm:flex  px-10 flex-grow   justify-evenly'>
          <div></div>

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

         
       

        <ProviderLogo  classname = 'flex h-5'
        selectedWatch={selectedWatch}
        setSelectedWatch={setSelectedWatch}
        watches={watches}
        setWatch={setWatch}
        setPage={setPage}
          disableUnderline
                />
         
        <Genre  className = 'flex'
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
          </div>
        
          </nav>
          


          

        
       
        

  )
}

export default Nav