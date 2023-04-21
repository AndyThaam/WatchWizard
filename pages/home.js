

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

      <div className="m-2">
    <h3 className="m-2 text-3xl font-medium leading-tight text-primary">
  About
</h3>

Our platform guides you to legitimate sources for enjoying your preferred movies and TV shows. We keep you informed about the latest additions on popular streaming platforms like Netflix, Amazon Prime, and Apple TV, among others. With our user-friendly filter system, you can conveniently access only the content that matters to you. Additionally, you can track your favorite titles and receive notifications when they become available on your preferred services.

</div>

<div>
<h3 className="m-2 text-3xl font-medium leading-tight text-primary">
  Our Mission
</h3>
At our core, we want to make your streaming experience as hassle-free as possible so we can protect you guys from the dangers piracy. Our platform is designed to help you find the perfect streaming service that hosts all your favorite content. No more searching through shady websites or risking legal troubles - we've got you covered. Sit back, relax, and enjoy your favorite movies and TV shows with ease.
</div>

<div>
<h3 className="m-2  text-3xl font-medium leading-tight text-primary">
Why you should not pirate and illegaly stream movies?
</h3>

Did you know that 1 in 4 people have been affected by viruses and malware? That's just one of the many dangers of watching movies through piracy and illegal streaming. Not only is it against the law and unfair to the people who make these movies and TV shows, but it can also be really risky for our devices. Pirated content often contains viruses and other harmful things that can damage our devices and compromise our personal information. By choosing to watch content through legal means, we can support the entertainment industry and enjoy high-quality, safe viewing experiences without any added risks.
</div>

<div>
<h3 className="m-2 text-3xl font-medium leading-tight text-primary">
How can you make a difference?</h3>

Let's spread the word: pay for your content! It's really important that we let as many people as possible know about the risks of illegally watching movies and TV shows. Share our website with your friends and family, and help us get the message out there. By paying for our content, we can all support the entertainment industry and enjoy our favorites without any added worries. Let's work together to make sure everyone knows that there are ways we can all win!
</div>       

      </div>
    </>
  )
}

export default home