// Importing Icons, React, Firebase Config!

import React from 'react';
import 'firebase/app';
import { CgGoogle } from '@react-icons/all-files/cg/CgGoogle';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { auth } from '../firebase';
import firebase from 'firebase/app';

// Login App

export default function Login() {
    return (
      <div id='login-page'>
        <div id='login-card'>

{/* Welcome Splash Screen */}
          <h2>Welcome to Chat-Engine!</h2>
          <h3>Sign In | Sign Up</h3>
  
{/* Login with Google */}
          <div className='login-button google' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} >
            <FcGoogle/> Sign In with Google
          </div>
  
          <br/><br/>

{/* Signup with Google */}
          <div className='login-button google-up' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} >
            <CgGoogle/> Sign Up with Google
          </div>

        </div>
      </div>
    )
}