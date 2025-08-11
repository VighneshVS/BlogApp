import Header from '../mainComponents/Header'
import BlogList from '../mainComponents/BlogList'
import { useEffect, useState } from 'react'
import Modal from '../mainComponents/Modal'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUserID } from '../slice.js/userIdSlice.js';

function Home() {

  const [showModal, setShowModal] = useState(false);
  // const localData = localStorage.getItem("blogDetails");
  // const [data, setData] = useState(localData? localData : []);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const localData = JSON.parse(localStorage.getItem("blogData"));
  const [blogData, setBlogData] = useState(localData? localData : []);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.userIdReducer.userId);


  useEffect(() => { 
      axios.get("http://localhost:8000/home",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((response) => {
          setBlogData(response.data[0])
          dispatch(setUserID(response.data[1][0].user_id))
        }).catch((error) => {
          // console.error("Error fetching data:", error);
          if (error.response && error.response.status === 401) {
            setError(true)
            alert("Unauthorized access, redirecting to login");
            navigate('/');
          }
        })
      }
  , []);

  const authorHandler = (e) => {
    setAuthor(e.target.value)
    // console.log(e, "iy")
  }

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }
  
  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const addData = async () => {
    const time= Date.now();
    const updatedData = {
      user: author,
      user_id: user_id,
      title: title,
      description : description,
      time: time,
    }

    console.log("Sending to backend:", updatedData);
    
    // console.log(data);
    // if(JSON.parse(localStorage.getItem("blogData")) === null){
    //   localStorage.setItem("blogData", JSON.stringify([]));
    //   console.log("Inside LocalStorage condition")
    // }

    try{
      const response = await axios.post("http://localhost:8000/home",updatedData, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      // console.log(response, "response")
      if (response.status === 201) {
          navigate('/home');
      }
    }catch(err){
      if(err.response && err.response.status === 401) {
        alert("Session expired, redirecting to login");
        navigate('/');
      }else{
        console.error("Error adding data:", err.response.data);
      }
    }

    
    
    // const data = JSON.parse(localStorage.getItem("blogData"));
    // data.push(updatedData);
    // localStorage.setItem("blogData", JSON.stringify(data));
    // setBlogData(data);
  }

  // const addData = (dataSet) => {
  //   console.log(dataSet)
  //   setData(prevData => [...prevData, dataSet]);
  // }

  // let display;
  // useEffect(() => {
  //   display = <BlogList data = {data} />
  // },[data])

  return (
    <div className='flex flex-col justify-start items-center bg-[var(--home-bg)] min-h-screen'>
      <Header 
        onAdd={openModal} 
        closeModal={closeModal}
      />
      {showModal && 
      <Modal
        closeModal={closeModal}
        addData={addData}
        titleHandler={titleHandler}
        authorHandler={authorHandler}
        descriptionHandler={descriptionHandler}
        //onDataAddition={addData}
      />}
      <main className='flex justify-center w-10/12 bg-white p-20 h-full'>
        {/* {data.length === 0 && <p>No records to show!</p>} */}
        <BlogList  blogData={blogData} />
        {/* title={title} author={author} description={description} */}
      </main>
    </div>
  )
}

export default Home;
