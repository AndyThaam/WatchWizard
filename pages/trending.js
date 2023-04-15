import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/Pagination/CustomPagination';
import SingleContent from '../components/SingleContent/SingleContent.js';
import Genre from "components/Genre";
import useGenre from "hooks/useGenre.js";
import ProviderLogo from '../components/ProviderLogo'
import { shuffle } from 'lodash';


import Index from "../pages/index"

function trending() {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState([]);

const [watches, setWatch] = useState([]);



const useWatch = (selectedWatch, genreId1 = [""] ) => {
  if (selectedWatch.length < 1) return "";

  const watchIds = selectedWatch.map((g) => g.provider_id);
    
  const requests = []
  genreId1.forEach((genreId) => {
    const genreRequests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_providers=${watchId}&watch_region=US&media_type=movie`)
    })
    requests.push(...genreRequests)
  });

  genreId1.forEach((genreId) => {
    const tvgenreRequests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_providers=${watchId}&watch_region=US&media_type=tv`)
    })
    requests.push(...tvgenreRequests)
  });



  
  console.log(requests, "movie data");
  return Promise.all(requests).then((responses) => {
    const combinedData = [];
    let totalPages = 1;

    responses.forEach((response) => {
      const data = response.data;
      totalPages = data.total_pages;
    
      // add a media_type property to each result based on the response URL
      const resultsWithMediaType = data.results.map(result => {
        if (response.config.url.includes('/movie')) {
          return { ...result, media_type: 'movie' };
        } else if (response.config.url.includes('/tv')) {
          return { ...result, media_type: 'tv' };
        } else {
          return result;
        }
      });
    
      // do something with the data, such as combining it into one array
      combinedData.push(...resultsWithMediaType);
      combinedData.sort((a, b) => b.popularity - a.popularity);
    });

    // remove duplicates
    const uniqueData = Array.from(new Set(combinedData.map(movie => movie.id)))
      .map(id => {
        return combinedData.find(movie => movie.id === id)
      });

    setNumOfPages(totalPages);
    console.log("total",totalPages)
    return shuffle(uniqueData);
  }).catch((error) => {
    console.error(error);
  });
};

  const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
    const genreIDS = selectedGenres.map((g) => g.id);

    const requests = genreIDS.map((genreID) => {
      return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}&media_type=movie`)
    });
  
  
    const tvrequests = genreIDS.map((genreID) => {
      return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}&media_type=tv`)
    });
  
    
    console.log(requests, "movie data");
    const allRequests = [...requests, ...tvrequests];

    return Promise.all(allRequests).then((responses) => {
      const combinedData = [];
      let totalPages = 1;

      responses.forEach((response) => {
        const data = response.data;
        totalPages = data.total_pages;
      
        // add a media_type property to each result based on the response URL
        const resultsWithMediaType = data.results.map(result => {
          if (response.config.url.includes('/movie')) {
            return { ...result, media_type: 'movie' };
          } else if (response.config.url.includes('/tv')) {
            return { ...result, media_type: 'tv' };
          } else {
            return result;
          }
        });
      
        // do something with the data, such as combining it into one array
        combinedData.push(...resultsWithMediaType);
        combinedData.sort((a, b) => b.popularity - a.popularity);
      });
  
      

      const uniqueData = Array.from(new Set(combinedData.map(movie => movie.id)))
      .map(id => {
        return combinedData.find(movie => movie.id === id)
      });
      console.log(combinedData,"comb data genre");
      console.log(uniqueData,"uni genre");

    setNumOfPages(totalPages);

    return shuffle(uniqueData);
    }).catch((error) => {
      console.error(error);
    });
  };
 

  
useEffect(() => {
const fetchMovies = async () => {
let genreData = [];
let watchData = [];
const genreId1 = selectedGenres.map((g) => g.id);

if (selectedGenres.length > 0 && selectedWatch.length === 0) {
  // Only selected genres
  genreData = await useGenre(selectedGenres);
  setContent(genreData);
   console.log("test1")
   console.log( genreData,"data  ")
  console.log( genreId1,"genre id  ")
  console.log(selectedGenres.length,"selected gen length  ")
  console.log(selectedGenres,"selected gen ")
  console.log(selectedWatch," streams ")



} else if (selectedGenres.length > 0 && selectedWatch.length > 0) {
  // Both genres and watch providers selected
  const genreId1 = selectedGenres.map((g) => g.id);
 watchData = await useWatch(selectedWatch, genreId1);
  
  setContent(shuffle(watchData));

  console.log("test2")
  console.log( watchData,"data  ")
  console.log( genreId1,"genre id  ")
  console.log(selectedGenres.length,"selected gen length  ")
  console.log(selectedGenres,"selected gen ")
  console.log(selectedWatch," streams ")

}
 else if (selectedGenres.length === 0 && selectedWatch.length > 0 ) {
  watchData = await useWatch(selectedWatch);
  
  setContent(shuffle(watchData));
    
    console.log("test4")


}  else {
  // Default case - fetch trending movies
let combinedArray = [] 
  const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}`);
  const tvResponse = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}`);
 
combinedArray.push(...response.data.results, ...tvResponse.data.results)

  const { results, total_pages,} = response.data;
  setContent(shuffle(combinedArray));
  setNumOfPages(response.data.total_pages);
  console.log(results, "test3");
  console.log(selectedGenres.length, " g l ");
  console.log(total_pages, " g page ");
  console.log(combinedArray, " comb ");
}
};

fetchMovies();

}, [page, selectedGenres, selectedWatch]);

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
   
    <div>
      <div className='flex flex-grow  justify-evenly flex-wrap '>
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
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
    </>

    )
  }
  export default trending