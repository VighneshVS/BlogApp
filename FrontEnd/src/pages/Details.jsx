import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import DetailsHeader from '../mainComponents/DetailsHeader';
import BreadCrumbs from '@/subComponents/BreadCrumbs';


function Details() {
    const {state, pathname} = useLocation();
    const details = state;
    
    useEffect(() =>{
      window.scrollTo({
        top: 0,
        behaviour: "smooth"
      })
    },[pathname])
    
  return (
    <div className='flex flex-col justify-start items-center bg-[var(--home-bg)] min-h-screen'>
      <DetailsHeader title={details.title} author={details.author} time={details.time}/>
      <BreadCrumbs id={details.id} />
      <article className='flex justify-center w-10/12 bg-white p-20 h-full'>
        <span>{details.description}</span>
      </article>
    </div>
    // <section className='flex flex-col items-center justify-center'>
    //   <h1>{details.title}</h1>
    //   <p>{details.author}</p>
    //   <p>{details.id}</p>
    //   <span>{details.description}</span>
    // </section>
  )
}

export default Details
