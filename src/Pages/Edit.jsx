import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase-config';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const postDoc = doc(db, "All-posts", id);
      const post = await getDoc(postDoc);
      if (post.exists()) {
        setTitle(post.data().title);
        setPostText(post.data().postText);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postDoc = doc(db, "All-posts", id);
    await updateDoc(postDoc, { title, postText });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="createpostPage">
      <form className="cpContainer" onSubmit={editPost}>
        <h1> Update New Post</h1>
        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input
            required
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post:</label>
          <textarea
            required
            placeholder="Post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            cols="30"
            rows="10"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
      {loading && <div className='spinner'>Loading...</div>}
    </div>
  );
};

export default Edit;