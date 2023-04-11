

  import React, { useEffect, useState } from 'react'
  import SingleContent from '../components/SingleContent/SingleContent.js';
  import CustomPagination from '../components/Pagination/CustomPagination';
  import Genre from "components/Genre";
  import ProviderLogo from '../components/ProviderLogo'
  import { shuffle } from 'lodash';



  import Index from "../pages/index"

function home() {
  return (
    <> 
    <Index />
   
    <div className=" m-14 flex-col">
          <p className='bold'>About
          </p>
          <p className='bold'>Our mission
          </p>

        <p className='bold'>Why you should not pirate and illegaly stream movies?
          </p>

           <p className='bold'>How can you make a difference?
          </p>


      </div>
    </>
  )
}

export default home