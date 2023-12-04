import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
// import {AddFriend} from './AddFriend.jsx'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='flex justify-between items-center '>
      <span className="logo">Chit Chat</span>
      { currentUser && 
       <div className='flex items-center mr-auto ml-2 p-1'>
        <img width = "40px" src={currentUser.photoURL} alt="profile-pic" />
        <span>{currentUser.displayName}</span>
       </div> 
      }
      <div>
        {currentUser && <button onClick={()=> signOut(auth)}>Logout</button>}
        
        {!currentUser && <Link to="/login">Login</Link> }
        {!currentUser && <Link to="/register">Register</Link> }
      </div>
     
    </div>
  )
}

export default Navbar;