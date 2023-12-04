import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Animal from './Animal.jsx'
import User from './User.jsx'
import { AuthContext } from './context/AuthContext.jsx'
import { signOut } from 'firebase/auth'
import { auth } from './firebase.js'
import Search from './components/Search.jsx'
import Chats from './components/Chats.jsx'
import Chat from './components/Chat.jsx'
import Navbar from './components/Navbar.jsx'
function App() {
  const [count, setCount] = useState(0)
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  return (
    <div className='max-w-screen-md m-auto'>
      {/* { currentUser && <span>Hello {currentUser.displayName}</span>}
      { currentUser && <button className='block m-auto mt-2' onClick={()=> signOut(auth)}>Logout</button> }
      { !currentUser && <a href="http://localhost:5173/login">Login</a>}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <button onClick={()=>setCount((count)=>0)}>Reset Count</button> */}
      {/* <User></User> */}
      <Navbar></Navbar>
      <div className='flex h-[80vh] border-solid border-black border-2'>
        <div className='max-w-[30%]'>
          <Search></Search>
          <Chats></Chats>
        </div>
        <Chat></Chat>
      </div>
    </div>
  )
}

export default App
