import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/Pagination/CustomPagination';
import SingleContent from '../components/SingleContent/SingleContent.js';
import Genre from "components/Genre";
import useGenre from "hooks/useGenre.js";
import ProviderLogo from '../components/ProviderLogo'


import Index from "../pages/index"

function trending() {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres)
const [watches, setWatch] = useState([]);
const requests = []



const useWatch = (selectedWatch) => {
  if (selectedWatch.length < 1) return "";

  const watchIds = selectedWatch.map((g) => g.provider_id);

  const requestsMovie = watchIds.map((watchId) => {
    const { data } =  axios.get (`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchId}&watch_region=US`)
    
  });

  const requestsTv = watchIds.map((watchId) => {
    const { data } =  axios.get( `https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchId}&watch_region=US`)
  });

  

  Promise.all([...requestsMovie, ...requestsTv])
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


  const [selectedWatch, setSelectedWatch] = useState([]);
  const watchProvider = useWatch(selectedWatch);
  
// let results = []

//     const fetchTrendingMovie= async () => {
//         const { data } = await axios.get(
//         `https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchProvider}&watch_region=US`
 
//         );
//         return data.results;
//       };

//       const fetchTrendingSeries= async () => {
//         const { data } = await axios.get(
//           `https://api.themoviedb.org/3/discover/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchProvider}&watch_region=US`
          
//           );
//           return data.results;
//       };

//       const combineBoth = () => {
//         Promise.all([fetchTrendingSeries(), fetchTrendingMovie()]).then(([movies, tv]) => {
//           results = [...movies,...tv].sort((a, b) => b.popularity - a.popularity);
//           console.log(results);
//           setNumOfPages(results.total_pages);
//           setContent(results);
//         });
//       }

const fetchTrending= async () => {
  const { data } = await axios.get(
  `https://api.themoviedb.org/3/trending/all/week?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}&with_genres=${genreforURL}}&with_watch_providers=${watchProvider}&watch_region=US`
    );
    console.log(data , "fetchTrending")
    setContent(data.results)
    setNumOfPages(data.total_pages);
  }







      useEffect(() => {
      fetchTrending()
       ;
    } , [watchProvider,genreforURL,page]);

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