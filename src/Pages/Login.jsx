import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { provider, auth } from '../../Firebase-config';
const Login = ({setIsAuth}) => {

  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true)
      navigate('/createpost')
    }).catch((error) => {
      console.log(error.message);
    })
  };
  

  return (
    <div className='loginPage'>
      <p>Sign in with Google</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}> Sign in with Google </button>
    </div>
  )
}

export default Login;
