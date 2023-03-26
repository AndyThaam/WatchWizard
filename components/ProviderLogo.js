    import React from 'react'
    import { useEffect } from "react";
    import axios from "axios";
    import TextField from '@mui/material/TextField';
    import Autocomplete from '@mui/material/Autocomplete';
    import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

    const ProviderLogo = ({
     
      selectedWatch,
      setSelectedWatch,
      watches,
      setWatch,
      type,
      setPage,
    }) => {
    


       const fetchLogos = async () => {
    const {data} = await axios.get (
      
      `https://api.themoviedb.org/3/watch/providers/tv?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US&watch_region=FR  `    
     
      );
      console.log(data ,"watchprov")
      setWatch(data.results)
    
    }
      
    useEffect(() => {
    fetchLogos();
    return () => {
      setWatch({}); // unmounting
    };

  },[] )
    
  
  
      return (

        <ThemeProvider theme={darkTheme}>
      
    
    <Autocomplete
      multiple
      options={watches}  
      disableCloseOnSelect
      getOptionLabel={(watches) => `${watches.provider_name}`}
      key= {watches.provider_id}
      onChange = {(event, newValue1) => setSelectedWatch(newValue1) }
      renderOption={(props, watches  )  => (
        <li {...props} >
        {watches.provider_name}
       
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => ( 
      <TextField className=''
      variant="standard"
         {...params}
        InputProps={{...params.InputProps, disableUnderline: true}} 
         label="Streaming Service" /> )}
    /> 
  
     </ThemeProvider>
  );
  
}
    
    export default ProviderLogo