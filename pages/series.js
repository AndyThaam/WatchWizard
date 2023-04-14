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

  const useWatch = (selectedWatch, genreId = '') => {
    if (selectedWatch.length < 1) return "";
  
    const watchIds = selectedWatch.map((g) => g.provider_id);
    const requests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_providers=${watchId}&watch_region=US`)
    });
  
    console.log(requests, "movie data");
    return Promise.all(requests).then((responses) => {
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
      });
  
      // remove duplicates
      const uniqueData = Array.from(new Set(combinedData.map(movie => movie.id)))
        .map(id => {
          return combinedData.find(movie => movie.id === id)
        });
  
      return uniqueData;
    }).catch((error) => {
      console.error(error);
    });
  };
  const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const genreIDS = selectedGenres.map((g) => g.id);
    const requests = genreIDS.map((genreID) => {
      return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`)
    });

    return Promise.all(requests).then((responses) => {
      const combinedData = [];

      responses.forEach((response, index) => {
        const genreforURL = selectedGenres.find((title) => title.id === genreIDS[index]);

        const data = response.data;
        data.results.forEach((movie) => {
          // add genre name to each movie object
          movie.genre = genreforURL.name;
        });

        // do something with the data, such as combining it into one array
        combinedData.push(...data.results)
        combinedData.sort((a, b) => b.popularity - a.popularity);
      });

      return combinedData;
    }).catch((error) => {
      console.error(error);
    });
  };
  useEffect(() => {
    const fetchMovies = async () => {
      let genreData = [];
      let watchData = [];
      const genreIDS = selectedGenres.map((g) => g.id);
  
      if (selectedGenres.length > 0 && selectedWatch.length === 0) {
        // Only selected genres
        genreData = await useGenre(selectedGenres);
        setContent(genreData);
        setNumOfPages(genreData.total_pages);
        console.log("test1")
  
      } else if (selectedGenres.length > 0 && selectedWatch.length > 0) {
        // Both genres and watch providers selected
        const genreId = selectedGenres.length > 0 ? selectedGenres[0].id : '';
        watchData = await useWatch(selectedWatch, genreId);
        
        setContent(watchData);
        setNumOfPages(watchData.total_pages);
  
        console.log("test2")
        console.log( watchData,"data  ")
        console.log( genreId,"genre id  ")
        console.log(selectedGenres.length,"selected gen length  ")
        console.log(selectedGenres[0],"selected gen length  2w ")
        console.log(selectedWatch," streams ")
  
      }
       else if (selectedGenres.length === 0 && selectedWatch.length > 0 ) {
        watchData = await useWatch(selectedWatch);
        
        setContent(watchData);
        setNumOfPages(watchData.total_pages);
         
          console.log("test4")
  
  
      }  else {
        // Default case - fetch trending movies
        genreData = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}`).then((response) => response.data.results);
        setContent(genreData);
        setNumOfPages(genreData.total_pages);
        console.log("test3")
        console.log(selectedGenres.length ," g l ")
  
        console.log(selectedWatch.length ," W l ")
      }
    };
  
    fetchMovies();
  }, [page, selectedGenres, selectedWatch]);

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