// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import SingleContent from '../components/SingleContent/SingleContent.js';
// import CustomPagination from '../components/Pagination/CustomPagination';
// import Genre from "components/Genre";
// import ProviderLogo from '../components/ProviderLogo'



// import Index from "../pages/index"
// import { data } from 'autoprefixer';

// function movies() {
//   const [page, setPage] = useState(1);
//   const [numOfPages, setNumOfPages] = useState();
//   const [content, setContent] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [watches, setWatch] = useState([]);
//   const [selectedWatch, setSelectedWatch] = useState([]);


  
//   const useWatch = (selectedWatch) => {
//     if (selectedWatch.length < 1) return "";
  
//     const watchIds = selectedWatch.map((g) => g.provider_id);
//     const requests = watchIds.map((watchId) => {
//       return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchId}&watch_region=US`)
//     });
//     console.log(requests, "movie data");
//     Promise.all(requests)
//   .then((responses) => {
//     const combinedData = [];

//     responses.forEach((response, index) => {
//       const watchProvider = selectedWatch.find((watch) => watch.provider_id === watchIds[index]);
      
//       const data = response.data;
     
//       data.results.forEach((movie) => {
//         // add watch provider name to each movie object
//         movie.watch_provider = watchProvider.name;
//       });

//       // do something with the data, such as combining it into one array
//       combinedData.push(...data.results)
//       combinedData.sort((a, b) => b.popularity - a.popularity);
//       setContent(combinedData)
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// };

// const useGenre = (selectedGenres) => {
//   if (selectedGenres.length < 1) return "";

//   const genreIDS = selectedGenres.map((g) => g.id);
//   const requests = genreIDS.map((genreID) => {
//     return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`)
//   });


  
//   Promise.all(requests)
// .then((responses) => {
//   const combinedData = [];
  

//   responses.forEach((response, index) => {  
//     const genreforURL = selectedGenres.find((title) => title.id === genreIDS[index]);
   
//     const data = response.data;
//     data.results.forEach((movie) => {
//       // add watch provider name to each movie object
//       movie.genre = genreforURL.name;
//     });

//     // do something with the data, such as combining it into one array
//     combinedData.push(...data.results)
    
//     combinedData.sort((a, b) => b.popularity - a.popularity);
    
//     setContent(combinedData)

//     console.log(combinedData, "combined");
    

//   });

// })
// .catch((error) => {
//   console.error(error);
// });
// };

// function fetchCombinedData(selectedGenres, selectedWatch) {
    
//   //const genreforURL = useGenre(selectedGenres);
//   //const watchProvider = useWatch(selectedWatch)
//   const genreIDS = selectedGenres.map((g) => g.id);
//   const watchIds = selectedWatch.map((g) => g.provider_id);

//   const genreRequests = genreIDS.map((genreID) => {
//     return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`)
//   });

//   const watchRequests = watchIds.map((watchId) => {
//     return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchId}&watch_region=US`)
//   });

//   return Promise.all([...genreRequests, ...watchRequests])
//     .then((responses) => {
//       const combinedData = [];

//       responses.forEach((response, index) => {
//         const isWatchRequest = index >= genreIDS.length;
//         const provider = isWatchRequest ? selectedWatch.find((watch) => watch.provider_id === watchIds[index - genreIDS.length]).name : null;
//         const genre = isWatchRequest ? null : selectedGenres.find((title) => title.id === genreIDS[index]).name;
//         const data = response.data;
       
//         data.results.forEach((movie) => {
//           // add watch provider and genre name to each movie object
//           movie.watch_provider = provider;
//           movie.genre = genre;
//         });

//         // do something with the data, such as combining it into one array
//         combinedData.push(...data.results);
//       });

//       combinedData.sort((a, b) => b.popularity - a.popularity);
//       return combinedData;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }


// ;

  
//     const fetchMovies= async () => {
//         const { data } = await axios.get(
//           `https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_providers=${watchProvider}&watch_region=US`

//           );
//           console.log(data);
    
//         setContent(data.results);
//         setNumOfPages(data.total_pages);
//       };

//       useEffect(() => {
//         {(selectedWatch.length < 1 && selectedGenres < 1) 
//           fetchTrending
//         }
//         fetchCombinedData(selectedGenres, selectedWatch).then((combinedData) => {
//           setContent(combinedData);
//         });
//       }, [selectedGenres, selectedWatch, page]);
  import axios from 'axios';
  import React, { useEffect, useState } from 'react'
  import SingleContent from '../components/SingleContent/SingleContent.js';
  import CustomPagination from '../components/Pagination/CustomPagination';
  import Genre from "components/Genre";
  import ProviderLogo from '../components/ProviderLogo'
  import { shuffle } from 'lodash';



  import Index from "../pages/index"



  function movies() {
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [content, setContent] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [watches, setWatch] = useState([]);
    const [selectedWatch, setSelectedWatch] = useState([]);
    const [numOfResults, setNumOfResults] = useState(0);

    const useWatch = (selectedWatch, genreId1 = [""] ) => {
      if (selectedWatch.length < 1) return "";
    
      const watchIds = selectedWatch.map((g) => g.provider_id);
        
      const requests = []
      genreId1.forEach((genreId) => {
        const genreRequests = watchIds.map((watchId) => {
          return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_providers=${watchId}&watch_region=US`)
        })
        requests.push(...genreRequests)
      });
      
      console.log(requests, "movie data");
      return Promise.all(requests).then((responses) => {
        const combinedData = [];
        let totalPages = 1;
    
        responses.forEach((response) => {
          const data = response.data;
          totalPages = data.total_pages;
          combinedData.push(...data.results)
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
          return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`)
        });
    
        return Promise.all(requests).then((responses) => {
          const combinedData = [];
          let totalPages = 1;
    
          responses.forEach((response) => {
            const data = response.data;
            totalPages = data.total_pages;
    
           
    
            // do something with the data, such as combining it into one array
            combinedData.push(...data.results)
            combinedData.sort((a, b) => b.popularity - a.popularity);
          });
    
          const uniqueData = Array.from(new Set(combinedData.map(movie => movie.id)))
          .map(id => {
            return combinedData.find(movie => movie.id === id)
          });
        setNumOfPages(totalPages);
    
          return uniqueData;
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
       console.log("test1")

    } else if (selectedGenres.length > 0 && selectedWatch.length > 0) {
      // Both genres and watch providers selected
      const genreId1 = selectedGenres.map((g) => g.id);
       const genreId = selectedGenres.length > 0 ? selectedGenres.id : '';
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
      
      setContent(watchData);
        
        console.log("test4")


    }  else {
      // Default case - fetch trending movies
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=a89d091cb78954f6a26c74461aef889a&page=${page}`);
      const { results, total_pages } = response.data;
      setContent(shuffle(results));
      setNumOfPages(total_pages);
      console.log(results, "test3");
      console.log(selectedGenres.length, " g l ");
      console.log(total_pages, " g page ");
      console.log(selectedWatch.length, " W l ");
    }
  };

  fetchMovies();
  
}, [page, selectedGenres, selectedWatch]);

  return (
    <> 
    <Index />
   
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
      media_type = {"movie"} 
      vote_average = {c.vote_average}
         /> )} 
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
    </>

    )
  }
  export default movies

