import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleContent from '../components/SingleContent/SingleContent.js';
import CustomPagination from '../components/Pagination/CustomPagination';
import { SearchIcon } from "@heroicons/react/outline";

import Genre from "components/Genre";
import useGenre from "hooks/useGenre.js";

import ProviderLogo from '../components/ProviderLogo'
import Index from "../pages/index"

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watches, setWatch] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState([]);

  const genreforURL = useGenre(selectedGenres);

  useEffect(() => {
    window.scroll(0,0)
   
      fetchSearch();
    
  }, [genreforURL, selectedWatch, searchText, page]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <> <Index /> 

<div className="m-4 flex   px-5 " >
        <ProviderLogo className =  "  w-1 m-5 px-5   "
        
        selectedWatch={selectedWatch}
        setSelectedWatch={setSelectedWatch}
        watches={watches}
        setWatch={setWatch}
        setPage={setPage}
          disableUnderline 
        
      />
         
    
        <Genre className = "m-5 px-5"
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
          </div>
    

<div className='flex  flex-grow  h-19  sm:m-6 items-center 
          border-2 rounded-full   hover:text-white
          py-2 bg-#0C151D text-gray-300'>
            
          <input className = 
          " flex-grow right-full inline-flex pl-5 bg-transparent outline-none  " 
          type = "text" placeholder ='Start Your Search' onChange={(e) => setSearchText(e.target.value) }/>

          <SearchIcon className='
          md:inline-flex h-8 text-gray rounded-full cursor-pointer 
          md:mx-2 p-1' onClick = {fetchSearch} />   
          </div>

    <div>
      <div className='flex flex-grow  justify-evenly flex-wrap '>
      {content && content.map((c) => 
      <SingleContent 
      key={c.id} 
      id = {c.id} 
      poster = {c.poster_path} 
      title = {c.title || c.name} 
      date = {c.first_air_date|| c.release_date}
      media_type = {type ?  "tv":"movie"} 
      vote_average = {c.vote_average}
         /> )} 
      </div>
      <CustomPagination setPage={setPage}  numOfPages={numOfPages}/>
    </div>
    </>

    )
  }
  export default Search