import React from 'react'
import ContentModal from '../ContentModal'
const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
    <div className='justify-evenly '> 
     <img className=' m-6 md:w-48 cursor-pointer flex rounded-xl hover:scale-105 '   
     src ={`https://image.tmdb.org/t/p/w300/${poster}`}/>

    </div>
  </ContentModal>
  )
}

export default SingleContent