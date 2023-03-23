import React from 'react'
    
    const NetworkLogo = ({
      logo,
    }) => {
      return (
        <nav className=''>
        <div className=''>
          <img className='cursor-pointer   hover:scale-125 
        rounded-3xl px-1.5 flex-shrink-0 m-5  sm:px-30  hover:animate-bounce ' 
        src ={`https://www.themoviedb.org/t/p/original${logo}`}/>
         </div> 
         </nav>
        
          
      )
    }
    
    export default NetworkLogo