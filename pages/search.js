import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleContent from '../components/SingleContent/SingleContent.js';
import CustomPagination from '../components/Pagination/CustomPagination';
import{ SearchIcon,
} from "@heroicons/react/outline";

import Genre from "components/Genre";
import useGenre from "hooks/useGenre.js";

import ProviderLogo from '../components/ProviderLogo'
import Index from "../pages/index"

function Search() {
  const [type, setType] = useState(0);

  const [page, setPage] = useState(1);
  const [numOfPages, setnumOfPages] = useState();
  const [ searchText,setSearchText,] = useState("")
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreforURL = useGenre(selectedGenres)

  const [watches, setWatch] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState([]);


  const useWatch = (selectedWatch) => {
    if (selectedWatch.length < 1) return "";
  
    const watchIds = selectedWatch.map((g) => g.provider_id);
    const requests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchId}&watch_region=US`)
    });

    Promise.all(requests)
  .then((responses) => {
    const combinedData = [];

    responses.forEach((response, index) => {
      const watchProvider = selectedWatch.find((watch) => watch.provider_id === watchIds[index]);

      const data = response.data;
      data.results.forEach((movie) => {
        // add watch provider name to each movie object
        movie.watch_provider = watchProvider.name;
      });

      // do something with the data, such as combining it into one array
      combinedData.push(...data.results)
      combinedData.sort((a, b) => b.popularity - a.popularity);
      setContent(combinedData)
      

    });

    console.log(combinedData, "combined");
  })
  .catch((error) => {
    console.error(error);
  });
  };

  
  const watchProvider = useWatch(selectedWatch);


  // const fetchSearch = async  () => {
  //   try{
  //     const{ data } = await axios.get(
  //       `https://api.themoviedb.org/3/search/multi?api_key=a89d091cb78954f6a26c74461aef889a&query=${searchText}&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchProvider}&watch_region=US`
  //       )
  //       console.log(data,"search")
  //       setContent(data.results)
  //       setnumOfPages(data.total_pages)
  //       setSearchText(data.searchText)
  //     } catch(error) {
  //       console.error(error)
  //     }
  // }

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
  }

  
    useEffect(() => {
    window.scroll(0,0)
  fetchSearch()
   },[genreforURL,watchProvider,searchText,page])
  

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