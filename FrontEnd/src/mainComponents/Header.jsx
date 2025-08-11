import React from 'react'
import { Button } from '../cssComponents/ui/button'
import { Link } from 'react-router-dom'

function Header({onAdd}) {
  return (
    <header className='flex justify-between items-center bg-[var(--header-bg)] w-full h-20 p-3 font-extrabold text-[var(--button-bg)] text-4xl fixed'>
      <a href='/'>
        <div>BLOG</div>
      </a>
      <Button variant="cta" onClick={onAdd}>Create new post</Button>
    </header>
  )
}

export default Header
