import { Button } from '@/cssComponents/ui/button'
import { useState } from 'react';
import React from 'react'

function Modal({closeModal, addData, titleHandler, authorHandler, descriptionHandler}) {
    // console.log(onClose,"closeModal")
    
    const onSubmit =() => {
        addData();
        closeModal();
    }

    // const onSubmit = () => {

    //     if(localStorage.getItem("blogDetails") === null) localStorage.setItem("blogDetails", JSON.stringify([]));
    //     const prevData = JSON.parse(localStorage.getItem('blogDetails'));
    //     const newData = {
    //         title,
    //         author,
    //         description
    //     };
    
    //     prevData.length > 0 ? localStorage.setItem(`blogDetails`,JSON.stringify([newData, ...prevData])) : localStorage.setItem("blogDetails", JSON.stringify([newData]));
    //     onDataAddition(newData);
    // }
    return (
        <div>
            <div className='fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] z-1 height-lvh' 
                onClick={closeModal}
            />
            <form className='flex flex-col gap-4 fixed top-20 left-100 w-1/3 max-h-200 bg-white z-1 p-10 rounded-lg' onSubmit={onSubmit}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='title'>Title</label>
                    <input className=" border-1 border-black rounded-sm" id="title" type='text' onChange={titleHandler} required />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='author'>Author</label>
                    <input className=" border-1 border-black rounded-sm" id="author" type='text' onChange={authorHandler} required />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='desc'>Description</label>
                    <textarea className=" border-1 border-black rounded-sm" id='desc' onChange={descriptionHandler} required />
                </div>
                <div className="flex justify-end gap-4">
                    <Button type='button'
                        onClick={closeModal}
                    >Cancel</Button>
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Modal
