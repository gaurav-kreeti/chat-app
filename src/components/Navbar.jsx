import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Search from './Search'
// import {AddFriend} from './AddFriend.jsx'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='flex justify-between items-center '>
      <span className="logo"><Link to="/">Chit Chat</Link></span>
      {currentUser &&
        <div className='flex items-center mr-auto ml-2 p-1'>
          <img width="40px" src={currentUser.photoURL} alt="profile-pic" />
          <span>{currentUser.displayName}</span>
        </div>
      }
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn mr-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Add Friend</button>
      <dialog id="my_modal_2" className="modal bg-[#2b2d31] p-5">
        <Search from={"AddFriend"}></Search>
        <form method="dialog" className="modal-backdrop">
          <button className='close-search mt-2'>close</button>
        </form>
      </dialog>
      <div>
        {currentUser && <button onClick={() => signOut(auth)}>Logout</button>}

        {!currentUser && <Link to="/login">Login</Link>}
        {!currentUser && <Link to="/register">Register</Link>}
      </div>

    </div>
  )
}

export default Navbar;