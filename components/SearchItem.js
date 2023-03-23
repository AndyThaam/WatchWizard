import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleContent from './SingleContent/SingleContent.js';
import CustomPagination from './Pagination/CustomPagination';
import{ SearchIcon,
} from "@heroicons/react/outline";

import Index from "../pages/index"
import { useRouter } from 'next/router';

function Search() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [ searchText,setSearchText,] = useState("")
  const [ numOfPages,setnumOfPages,] = useState()

  const fetchSearch = async  () => {
    try{
     
      const{ data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=a89d091cb78954f6a26c74461aef889a&query=${searchText}&page=${page}`
        )
        setContent(data.results)
        setnumOfPages(data.total_pages)
      } catch(error) {
        console.error(error)
      }
  }
    useEffect(() => {
    window.scroll(0,0)

   },[page])
   const router = useRouter();


   function myfunction(){

    fetchSearch
    router.push('/search')

   }

  return (
    <> 
   
      <div className='flex  flex-grow  h-7  sm:m-6 items-center 
          border-2 rounded-full   hover:text-white
          py-2 bg-#0C151D text-gray-300'>
            
          <input className = 
          " flex-grow right-full inline-flex pl-5 bg-transparent outline-none  " 
          type = "text" placeholder ='Start Your Search' onChange={(e) => setSearchText(e.target.value) }/>

          <SearchIcon className='
          md:inline-flex h-8 text-gray rounded-full cursor-pointer 
          md:mx-2 p-1' onClick = {fetchSearch} />   
          </div>

          

      <div className='flex  justify evenly flex-wrap '>
      {content && content.map((c) => 
      <SingleContent 
      key={c.id} 
      id = {c.id} 
      poster = {c.poster_path} 
      title = {c.title || c.name} 
      date = {c.first_air_date|| c.release_date}
      media_type = {c.media_type} 
      vote_average = {c.vote_average}
         /> )} 
      </div>

   


          
    </>

    )
  }
  export default Search