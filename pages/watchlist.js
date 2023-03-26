
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleContent from '../components/SingleContent/SingleContent.js';
import CustomPagination from '../components/Pagination/CustomPagination';
import Genre from "components/Genre";
import useGenre from "hooks/useGenre.js";
import ProviderLogo from '../components/ProviderLogo'
import Index from "../pages/index"

function watchlist() {
  return (
  <>
    <Index />
    <main className='lg:flex max-w-screen-2xl mx-auto'>
<div className='flex flex-col p-5 space-y-10 '>
    <h1 className='text-3xl  pb-4'> Your Watchlist Is Empty</h1>
</div>

    </main>
    </>
  )
}

export default watchlist