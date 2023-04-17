
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Nav from "../components/Nav"
import { useRouter } from 'next/router';
import SingleContent from '../components/SingleContent/SingleContent';



export default function Home() {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Nav/>

    </div>


    
  )
}


