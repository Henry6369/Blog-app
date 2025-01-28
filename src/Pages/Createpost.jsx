import React from 'react'
import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../Firebase-config';
import { useNavigate } from "react-router-dom";

const Createpost = ({isAuth}) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("")
  const [loading, setLoading] = useState(false);

  const postCollectionRef = collection(db, "All-posts");

  const Createpost = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(postCollectionRef, {
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, email: auth.currentUser.email},
      title,
      postText,
      timestamp: serverTimestamp()
    });
    setLoading(false);
    navigate('/');
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth]);
    return (
        <div className='createpostPage'>
    
        <form className="cpContainer" onSubmit={Createpost}>
          <h1>Create New Post</h1>
          <div className="inputGp">
            <label htmlFor="">Title:</label>
            <input 
            required
            type="text"  
            placeholder='Title...'
            onChange={(e) => 
            setTitle(e.target.value)}
            />
          </div>
          <div className="inputGp">
            <label htmlFor="">Post:</label>
            <textarea 
            name=""
            required 
            placeholder='Post...'
            onChange={(e) => 
            setPostText(e.target.value)} 
            id="" 
            cols="30" 
            rows="10" 
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </form>
        {loading && <div className="spinner">Loading...</div>}
        </div>
      )
    }
    
  

export default Createpost;
