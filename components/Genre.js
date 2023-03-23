import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useEffect } from "react";


const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });


  const Genres = ({
      selectedGenres,
      setSelectedGenres,
      genres,
      setGenres,
      type,
      setPage,
    
  }) => {
   
  
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US`
      );    
      setGenres(data.genres);
      console.log(data.genres)
    };
   
    useEffect(() => {
      fetchGenres();
  
      return () => {
        setGenres({}); // unmounting
      };
      // eslint-disable-next-line
    }, []);

    
  return (
    <ThemeProvider theme={darkTheme}>
      
    
    <Autocomplete
      multiple
      options={genres}  
      disableCloseOnSelect
      getOptionLabel={(genres) => `${genres.name}`}
      key= {genres.id}
      onChange = {(event, newValue) => setSelectedGenres(newValue) }
      renderOption={(props, genres  )  => (
        <li {...props} >
        {genres.name}
       
        </li>
      )}
      style={{ width: 350}}
      renderInput={(params) => (
         <TextField className='px-5 m-1'
         variant="standard"
         {...params} 
        InputProps={{...params.InputProps, disableUnderline: true}}  
        label="Genres"

         /> )}
    /> 
  
     </ThemeProvider>
  );
  
}
export default Genres;



