import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/cssComponents/ui/card"
import { Button } from '@/cssComponents/ui/button';

function Cards({id, title, description, author, time}) {
  const navigate = useNavigate();

  const handleViewDetails = (details) => {
    navigate(`/details/${details.id}`, { state: details})
  }

  const timeStamp = (lastUpdatedTime) => {
    const now = new Date();
    const diffInMins = now - lastUpdatedTime;

    const minutes = Math.floor(diffInMins / (1000 * 60));
    const hours = Math.floor(diffInMins / (1000 * 60 * 60));
    const days = Math.floor(diffInMins / (1000 * 60 * 60 * 24));

    let displayTime = "";
    if(minutes < 2) {
      displayTime = "Just Now"
    }else if(minutes < 60){
      displayTime = `${minutes} minutes ago`
    }else if(hours < 24){
      displayTime = `${hours} hour${hours > 1 ? "s" : ""} ago`
    }else{
      displayTime = `${days} day${days > 1 ? "s" : ""} ago`
    }

    return <p className='text-sm text-muted-foreground'>Updated {displayTime}</p>
  }
  return (
    // <div className='w-70 flex-col gap-5 border-2 border-indigo-500 rounded-sm text-left'>
      <Card className="w-full max-h-195 cursor-pointer rounded-md" onClick={() => handleViewDetails({
        id: id,
        title: title, 
        description: description, 
        author: author,
      })}>
        <CardHeader>
          {id && <p className='text-sm text-muted-foreground'>{id}</p>}
          <CardTitle>{title}</CardTitle>
          <p className='text-sm text-muted-foreground'>By {author}</p>
          {timeStamp(time)}
        </CardHeader>

        <CardContent>
          <p className='mt-2 line-clamp-3'>{description}</p>
        </CardContent>

        <CardFooter >
          <Button variant="outline" onClick={() => handleViewDetails({
            id: id,
            title: title, 
            description: description, 
            author: author,
          })}>More Details</Button>
        </CardFooter>
      </Card>
  )
      {/* <h3>{title}</h3>
      <p>{description}</p>
      <p>{author}</p>
      <button onClick={() => handleViewDetails({
        title: title, 
        description: description, 
        author: author
        })}>More Details</button> */}
    // </div>
  
}

export default Cards

