import React from 'react'
import { useState ,useEffect } from 'react';
import axios from "axios";
import BackButton from '../Components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner';


const EditBook = () => {

  
  const [author,setAuthor] = useState("");
  const [title,setTitle] = useState("");
  const [publishYear,setPublishYear] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate= useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    
    axios.get(`http://localhost:3000/books/${id}`)

      .then((response)=>{
        //console.log(response.data);//as you know from createBook, it should be "response.data.author" in the next line instead of "response.data.book.author". book object unnecessarily nested inside the data object
        setAuthor(response.data.book.author);
        setTitle(response.data.book.title);
        setPublishYear(response.data.book.publishYear);
        setLoading(false)
      })
      .catch((error) => {
    
        setLoading(false)
        alert("An error occured. Please try again or contact staff")
        console.log(error);
      });
  },[]);

  const handleEditBook = () => {
    const data={
      title,
      author,
      publishYear
    };

    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`,data)
      .then((response) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) =>{
        setLoading(false);
        alert("Book is not edited due to some error. Please try again. Please contact our customer service if the problem persists ")
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? ( <Spinner/> ) : ""}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
          type='text'
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
          type='text'
          value={author}
          onChange={(e)=>{setAuthor(e.target.value)}}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
          type='number'
          value={publishYear}
          onChange={(e)=>{setPublishYear(e.target.value)}}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
    
  )
}

export default EditBook
