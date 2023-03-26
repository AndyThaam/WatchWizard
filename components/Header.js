import{
    HomeIcon,
    UserIcon,
    CollectionIcon,
    LightningBoltIcon,
    LogoutIcon,
    SearchIcon,
    LoginIcon

} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/react";

import Link from 'next/link'
import Image from 'next/image';
import HeaderItem from "components/HeaderItem";
import axios from 'axios';
import CustomPagination from '../components/Pagination/CustomPagination.js';
import SingleContent from '../components/SingleContent/SingleContent.js';
import React, { useEffect, useState } from 'react'
import Index from "../pages/index"
import { useRouter } from 'next/router';
import Search from "./SearchItem.js";
import Genre from "components/Genre";


function Header() {
  const [ searchText,setSearchText,] = useState("")
  const [ numOfPages,setnumOfPages,] = useState()
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);


  const { data: session, status } = useSession();


  
  const fetchSearch = async  () => {
    
    try{
      const{ data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=a89d091cb78954f6a26c74461aef889a&query=${searchText}&page=${page}`
        )
        setContent(data.results)
        setnumOfPages(data.total_pages)
      } catch(error) {
        console.error(error)
      }
  }
    useEffect(() => {
    window.scroll(0,0)
    fetchSearch()
   },[page])

  
   const router = useRouter();


  return (
    <>
    <header className="flex flex-col   "> 

          
          < div className='sm:flex  '>

          <div className='flex  cursor-pointer justify-center px-5 md:w-125  sm:h-30 ' onClick = {() => router.push('/trending' )} >
          <Image className="flex  justify-center"
          src = "https://www.freepnglogos.com/uploads/film-reel-png/film-reel-file-filmreel-icon-svg-wikipedia-21.png"  
          alt="film reel the movies owens valley"  width ={140} height ={40} />
          </div>

         
           
{/*           
          <div className="flex flex-grow  w-25   max-w-1xl m-3 sm:m-7  ">
          <HeaderItem title="HOME" Icon={HomeIcon} />
         
          <HeaderItem title="WATCHLIST" Icon={CollectionIcon} />
          <HeaderItem title="PROFILE" Icon={UserIcon} />
          <HeaderItem title="SIGN OUT" Icon={LogoutIcon} />  
          </div> */}


         <div className="flex flex-grow w-25 max-w-1xl m-3 sm:m-7 justify-end">
  <HeaderItem title="HOME" Icon={HomeIcon} />

  <Link href="/trending">
    <a>
      <HeaderItem title="TRENDING" Icon={LightningBoltIcon} />
      </a>
         </Link>

  <Link href="/watchlist">
    <a>
  <HeaderItem title="WATCHLIST" Icon={CollectionIcon} />
  </a>
  </Link>

  <HeaderItem title="PROFILE" Icon={UserIcon} />
 
    <div onClick={!session ?signIn :signOut}>

        <HeaderItem title="LOGIN" Icon={LoginIcon} />
     </div>
     <p>
      {session ? `Hello  ${session.user.name}` :"Sign In" }
     
      </p>

  <div onClick = {signOut}
  className="ml-auto">
    <HeaderItem title="SIGN OUT" Icon={LogoutIcon} />
  </div>

{/* {!session ? (
  <div className="ml-auto"  onClick={signIn}>
    <HeaderItem title={"SIGN IN"} Icon={LoginIcon} />
  </div>
) : (
  
  <div className="ml-auto" onClick={signOut}>
    <HeaderItem  title={`LOGOUT (${session.user.name})`} Icon={LogoutIcon} />
    <p>Hello {session.user.name}</p>
  </div>
)} */}
  
</div>
          
         
          
        
      </div>
      <div>
    
      </div>
     
      
      </header>

    
    
    </>
  )}

export default Header