// Importing React, Icons, images, chat-engine, auth!

import logo from '../logo.png';
import { RiLogoutBoxRLine } from '@react-icons/all-files/ri/RiLogoutBoxRLine'
import React, { useRef, useState, useEffect } from "react"
import axios from 'axios'
import { HiRefresh } from '@react-icons/all-files/hi/HiRefresh'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'
import { useAuth } from "../contexts/AuthContext"
import { auth } from "../firebase"

// Chats App
export default function Chats() {

    const didMountRef = useRef(false)
    const [ loading, setLoading ] = useState(true)
    const { user } = useAuth()
    const history = useHistory()

// Function Refresh
    async function handleRefresh(){
      window.location.reload(false);
    }

// Function Logout
    async function handleLogout() {
        await auth.signOut()
        history.push('/')
      }

// Get the Avatar as the Profile Picture of Google Account
  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
  }


    useEffect(() => {

        if (!didMountRef.current) {
            didMountRef.current = true

            if (!user || user === null) {
                history.push("/chats")
                return
              }

// Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

        .then(() => setLoading(false))

// From the Google it collects the email and UID(Unoque Identifier)
        .catch(e => {
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

// The Profile Picture collected earlier is set to the 'Avatar'
            getFile(user.photoURL)
            .then(avatar => {
                formdata.append('avatar', avatar, avatar.name)
      
// Adds the Users or Collects it from the Private Key!
                axios.post(
                  'https://api.chatengine.io/users/',
                  formdata,
                  { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY }}
                )
                .then(() => setLoading(false))
                .catch(e => console.log('e', e.response))
            })
        })
    }
    }, [user, history]);

// If the user is FirstTime then it will fix the problem
    if (!user || loading) return <div />

// Design and Divisions of the Chats
    return(
        <div className='chats-page'>
            <div className='nav-bar'>

              {/* Logo and Text */}
             <img src={logo} className='logo' alt="logo" />
                <div className='logo-tab' >
                 Chat Engine
                </div>

                {/* Refresh */}
                <div className='refresh-tab'onClick={ handleRefresh }>
                  <HiRefresh/>
                </div>

              {/* Logout */}
                <div className='logout-tab'onClick={ handleLogout }>
                <RiLogoutBoxRLine/> Logout 
                </div>
            </div>

            {/* The Chat Engine */}
            <ChatEngine
                height='calc(100vh - 66px)'
                projectID = {process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    );
}