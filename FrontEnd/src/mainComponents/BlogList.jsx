import Cards from '../subComponents/Cards'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { Button } from '@/cssComponents/ui/button'

function blogList({blogData}) {
  const [page, setPage] = useState(1);
  const cardsPerPage = 4;
  const endIdx = page * cardsPerPage;
  const startIdx = endIdx - cardsPerPage;
  const [newData, setNewData] = useState(blogData.slice(startIdx, endIdx));
  

  useEffect(() => {
    const endIdx = page * cardsPerPage;
    const startIdx = endIdx - cardsPerPage;
    setNewData(blogData.slice(startIdx, endIdx))
  }, [page, blogData]);
  
  return (

    <ul className='flex flex-col gap-10 w-10/12 pt-10'>
      {newData.length === 0 ? (
        <p className='text-center text-gray-700'>Start the first Blog!</p>
      ) : (
        newData.map((item) => {
          return <Cards id={item.blog_id} key={item.title} title={item.title} description={item.description} author={item.username} time={item.time}/>
        })
      )}
      <div className='flex gap-10 justify-center items-center'>
        { (page > 1)? (
          <Button variant="pagination"
          onClick={
          () => setPage(prevPage => prevPage - 1)
          }>Prev</Button>
        ) : (
          <></>
        )}
        { (page < Math.ceil(blogData.length / 4)) ? (
          <Button variant="pagination"
          onClick={
          () => setPage(prevPage => prevPage + 1)
          }>Next</Button>
        ) : (
          <></>
        )
      }
      </div>
    </ul>
      
  )
}

export default blogList
