

import Backdrop from '@mui/material/Backdrop';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularRate from './CircularRate';
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape 
  
} from '../config.js/config.js'


import styles from './ContentModal.module.css'
import SingleContent from './SingleContent/SingleContent';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../components/Carousel.js';
import FCarousel from '../components/RelatedFCarousel.js';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  height: "100%",
  backgroundColor: '#021221', 
  border: '1px solid #282c34',
 boxShadow: 5,
  borderRadius: 0,
  p: 0,
  },
}));

export default function ContentModal({children,media_type,id,poster}) {
  const classes = useStyles();
  const [type, setType] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [content,setContent]= useState();
  const [watch,setWatch] =useState([]);
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US`

    );
    setContent(data);
 
  };
  
  const fetchWatch = async () => {
    
 

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=a89d091cb78954f6a26c74461aef889a&watch_region=US&language=en-US&include_adult=false&with_original_language=en`
    );
    setWatch(data);
  };
  
  const fetchVideo = async () => {


    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=a89d091cb78954f6a26c74461aef889a&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData()
    fetchVideo()
    fetchWatch();
    
   
  },[])
 

  return (
    <>

    <div className= {styles.media}
    style={{ cursor: "pointer" }}
    color="inherit"
    onClick={handleOpen} >
      {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className= {classes.Modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
        <Box   >
        {content && (   
        <div className={classes.paper}>
          
              <div className={styles.ContentModal}>
              <span>
              { <img src = {content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className={styles.ContentModal__portrait}
                  
                /> }
                
                <img
                  src={
                    content.backdrop_path 
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  } 
                  alt={content.name || content.title}
                  className={styles.ContentModal__landscape}
                  
                />

                
                      <span className='m-2.5'> 
                        Rating : 
                        <CircularRate className='p-4'
                         value={content.vote_average} />
                         </span>
           
                  <Button
                  className='m-2.5'
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
              
                 </span>
                

                 <div className={styles.ContentModal__about}>
                  
                  <span className={styles.ContentModal__title}>
                    
                    
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  
                  {content.tagline && (
                    <i className={styles.tagline}>{content.tagline}</i>
                  )}

                  <span className={styles.ContentModal__description}>
                    {content.overview}
                  </span>

                 
                    <div className={styles.textHead1}>
                  <span className='flex-row flex sm:flex ' >Companies:{content.production_companies.map((company) => (
                    <img
                    className='cursor-pointer flex-row  
                    px-2 m-2 sm:m-4 flex w-15 h-7 ' 
                    src={`https://www.themoviedb.org/t/p/original${company.logo_path}`}
                    alt={`${company.name} logo`} />
                    ))}
                    
                    </span>

                  
                                      
                      {/* {Object.values(watch.results)[0].map((company) => (
                    <img 
                    className='cursor-pointer flex-row  
                    px-2 m-2 sm:m-4 flex w-15 h-7 ' 
                    src={`https://www.themoviedb.org/t/p/original${company.logo_path}`}
                    alt={`${company.provider_name} logo`} />
                    ))}
                    
                     */}
                  
                     
                  <span>  Genres :  {content.genres.map((genre, index) => (
                      <Chip className=' p-2  m-2   '
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))} </span> 
                     </div>
                 
                 <div>
                 <h2 className={styles.textHead}> Casts :</h2>
                    <Carousel id={id} media_type={media_type}/>
                    </div>

                    <div>

                 <h2 className={styles.textHead}>You May Also Like :</h2>
                    <FCarousel id={id} media_type={media_type}/>
                    </div>
                    
                
                  
                  </div>
                  
                </div>
                
                </div>
        )}        
                
          </Box>
        </Fade>
      </Modal>
    </>
  );
}