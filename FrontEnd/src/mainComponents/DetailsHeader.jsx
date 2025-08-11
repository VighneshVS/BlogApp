import React from 'react'
import Face from '@/assets/face.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareLinkedin, faSquareXTwitter, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons'


function DetailsHeader({title, author, time}) {
  return (
    <header className='flex flex-col gap-20 justify-center text-center items-center bg-[var(--header-bg)] w-full h-70 p-10 font-extrabold text-[var(--button-bg)] text-4xl'>
      <h1 className='text-5xl'>{title}</h1>
      <div className='flex justify-center items-center gap-5 font-medium text-base'>
        <div className='flex gap-2 justify-between items-center'>
            <img src={Face} className='h-10 w-10' alt='author-icon'/>
            <p>{author}</p>
        </div>
        <div className='text-4xl weight-black'>|</div>
        <div className='flex h-auto w-auto gap-5 justify-center items-center'>
            <FontAwesomeIcon icon={faSquareLinkedin} className='text-2xl cursor-pointer' />
            <FontAwesomeIcon icon={faSquareXTwitter} className='text-2xl cursor-pointer' />
            <FontAwesomeIcon icon={faWhatsappSquare} className='text-2xl cursor-pointer' />
            <FontAwesomeIcon icon={faSquareEnvelope} className='text-2xl cursor-pointer' />
        </div>
      </div>
    </header>
  )
}

export default DetailsHeader
