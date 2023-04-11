import{
    HomeIcon,
    CollectionIcon,
    LightningBoltIcon,
    LogoutIcon,
    LoginIcon

} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import Image from 'next/image';
import HeaderItem from "components/HeaderItem";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


function Header() {

  const { data: session, status } = useSession();

  
  
    useEffect(() => {
    
   },[])

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

</div>
             
      </div>
      
     
      
      </header>

    
    
    </>
  )}

export default Header