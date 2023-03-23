import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/Pagination/CustomPagination.js';
import SingleContent from '../components/SingleContent/SingleContent.js';
import Genre from "components/Genre";
import useGenre from "hooks/useGenre.js";
import ProviderLogo from '../components/ProviderLogo'

import Index from "../pages/index"


function series() {

  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watches, setWatch] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState([]);

  const useWatch = (selectedWatch) => {
    if (selectedWatch.length < 1) return "";
  
    const watchIds = selectedWatch.map((g) => g.provider_id);
    const requests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchId}&watch_region=US`)
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
  }; const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
    const genreIDS = selectedGenres.map((g) => g.id);
    const requests = genreIDS.map((genreID) => {
      return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`)
    });
  
  
    
    Promise.all(requests)
  .then((responses) => {
    const combinedData = [];
    
  
    responses.forEach((response, index) => {  
      const genreforURL = selectedGenres.find((title) => title.id === genreIDS[index]);
     
      const data = response.data;
      data.results.forEach((movie) => {
        // add watch provider name to each movie object
        movie.genre = genreforURL.name;
      });
  
      // do something with the data, such as combining it into one array
      combinedData.push(...data.results)
      
      combinedData.sort((a, b) => b.popularity - a.popularity);
      
      setContent(combinedData)
  
      console.log(combinedData, "combined");
      
  
    });
  
  })
  .catch((error) => {
    console.error(error);
  });
  };



  const genreforURL = useGenre(selectedGenres)
  const watchProvider = useWatch(selectedWatch);

    const fetchSeries= async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchProvider}&watch_region=US`);

          console.log(data);
    
        setContent(data.results);
        setNumOfPages(data.total_pages);
      };

      useEffect(() => {
        fetchSeries();
    } , [watchProvider,genreforURL,page]);

  return (
    <> <Index /> 

<div className="m-4 flex px-5 " >
        <ProviderLogo className = "w-1 m-5 px-5   "
        
        selectedWatch={selectedWatch}
        setSelectedWatch={setSelectedWatch}
        watches={watches}
        setWatch={setWatch}
        setPage={setPage}
          disableUnderline 
        
      />
        <Genre className = "m-5 justify-center"
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
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
      media_type = {"tv"} 
      vote_average = {c.vote_average}

         /> )} 


      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
    </>

    )
  }
  export default series