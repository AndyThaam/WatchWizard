import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleContent from '../components/SingleContent/SingleContent.js';
import CustomPagination from '../components/Pagination/CustomPagination';
import { SearchIcon } from "@heroicons/react/outline";
import Header from '../components/Header'
import Nav from "../components/Nav"
import Genre from "components/Genre";
import { shuffle } from 'lodash';

import ProviderLogo from '../components/ProviderLogo'
import Index from "../pages/index"
import { request } from 'http';

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



const useWatch = (selectedWatch, genreId1 = [""] ) => {
  if (selectedWatch.length < 1) return "";

  const watchIds = selectedWatch.map((g) => g.provider_id);
    
  const requests = []
  genreId1.forEach((genreId) => {
    const genreRequests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_providers=${watchId}&watch_region=US&media_type=movie&query=${searchText}`)
    })
    requests.push(...genreRequests)
  });

  genreId1.forEach((genreId) => {
    const tvgenreRequests = watchIds.map((watchId) => {
      return axios.get(`https://api.themoviedb.org/3/search/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_providers=${watchId}&watch_region=US&media_type=tv&query=${searchText}`)
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
    return uniqueData;
  }).catch((error) => {
    console.error(error);
  });
};

  
 



  const fetchMovies = async () => {
    let genreData = [];
    let watchData = [];
    const genreId1 = selectedGenres.map((g) => g.id);
    
    if (selectedGenres.length > 0 && selectedWatch.length === 0) {  
      // Only selected genres
     
      const genreIDS = selectedGenres.map((g) => g.id);

      console.log(selectedGenres.length,"selected gen length  ")
      console.log(selectedGenres,"selected gen ")
      console.log(genreIDS,"selected gen ")

      const requests = genreIDS.map((genreID) => {
        return axios.get(`https://api.themoviedb.org/3/search/multi?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false
        &page=${page}&with_genres=${genreID}&query=${searchText}`)
        
      });
    console.log(requests,"fefef")
      
      return Promise.all(requests).then((responses) => {
        const combinedData = [];
        let totalPages = 1;
        console.log(requests,"selected gen ")

        responses.forEach((response) => {
          const data = response.data;
          totalPages = data.total_pages;
          console.log(data,"DATAAA ")

          const filteredData =data.results.filter((item) =>
          item.genre_ids.some((id) => genreIDS.includes(id))
          
        )
        
        const resultsWithMediaType = filteredData.map(result => {
          if (response.config.url.includes('/movie')) {
            return { ...result, media_type: 'movie' };
          } else if (response.config.url.includes('/tv')) {
            return { ...result, media_type: 'tv' };
          } else {
            return result;
          }
        });
        
        
        
        console.log(resultsWithMediaType,"LOLOLOL ")
          // do something with the data, such as combining it into one array
          combinedData.push(...resultsWithMediaType);
          combinedData.sort((a, b) => b.popularity - a.popularity);
          console.log(combinedData,"comb ")

  
        });
        
        console.log(combinedData , "test2323232 ");
       
  
        const uniqueData = Array.from(new Set(combinedData.map(movie => movie.id)))
        .map(id => {
          return combinedData.find(movie => movie.id === id)
        });


        console.log(uniqueData, "end")
      setNumOfPages(totalPages);
      console.log("test1")
      console.log( genreData,"data  ")
     console.log( genreId1,"genre id  ")
     console.log(selectedGenres.length,"selected gen length  ")
     console.log(selectedGenres,"selected gen ")
     console.log(selectedWatch," streams ")
      setContent(shuffle(uniqueData));

      }).
      catch((error) => {
        console.error(error);
      });
    ;

      
    
    } 
    
    else if (selectedGenres.length === 0 && selectedWatch.length > 0) {


      const data1 = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&query=${searchText}`
      );

    console.log(data1,"432323")

      data1.results.forEach((item) => {
         axios .get(
            `https://api.themoviedb.org/3/movie/${item.id}?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&append_to_response=watch/providers`
          )
          .then((response) => {
            const movie = response.data;
    
            // filter movies by watch provider
            const filteredData = movie.results.filter((item) =>
              item.provider_id.some((id) => watchIds.includes(id))
            );
    
            const resultsWithMediaType = filteredData.map((result) => {
              if (response.config.url.includes('/movie')) {
                return { ...result, media_type: 'movie' };
              } else if (response.config.url.includes('/tv')) {
                return { ...result, media_type: 'tv' };
              } else {
                return result;
              }
            });
    
            combinedData.push(...resultsWithMediaType);
            combinedData.sort((a, b) => b.popularity - a.popularity);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    
      const uniqueData = Array.from(new Set(combinedData.map((movie) => movie.id))).map(
        (id) => {
          return combinedData.find((movie) => movie.id === id);
        }
      );
    
      setNumOfPages(totalPages);
      setContent(shuffle(uniqueData));
    }


     else {
      // Default case - fetch trending movies
    let combinedArray = [] 
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}&query=${searchText}&media_type=movie`);
      const tvResponse = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}&query=${searchText}&media_type=tv`);
     
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






  
useEffect(() => {


fetchMovies();

}, [page, selectedGenres, selectedWatch,searchText]);

  return (
    <>   <Header/>
    <Nav/>
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
          md:mx-2 p-1' onClick = {fetchMovies} />   
          </div>

    <div>
      <div className='flex flex-grow  justify-evenly flex-wrap '>
      {content.length > 0 ? (
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))
          ) : (
            <h2>No titles found</h2>
          )}
      

      </div>
      <CustomPagination setPage={setPage}  numOfPages={numOfPages}/>
    </div>
    </>

    )
  }
  export default Search