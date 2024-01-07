import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Search = (prop) => {

  
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data,dispatch } = useContext(ChatContext);
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      const arr = []
      querySnapshot.forEach((doc) => {
        // addUser(doc.data());
        arr.push(doc.data())
      });
      setUsers(arr);
      if (arr.length == 0) setErr("No user found");
      else setErr("");
    }
    catch (error) {
      console.log(error);
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async (user) => {
    console.log(user);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      console.log(res.exists())
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        console.log("chats created")
        //create user chats
        const user1 = await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("I am doc 1" + user1)

        const user2 = await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("I am doc2" + user2)
      }
      dispatch({ type: "CHANGE_USER", payload: user });
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [u[0] + ".count"]: 0,
      })
      await updateDoc(doc(db,"userChats",user.uid),{
        [u[0] + ".count"]: 0,
      })
    } catch (err) {

    }

    setUsers([]);
    setUsername("");
    setErr("");
  }
  const closeButton = document.querySelector(".close-search");
  closeButton?.addEventListener("click", (e) => {
    setUsers([]);
    setUsername("");
    setErr("");
  });


  return (
    <div className="search  border-solid border-b-2  border-black">
      <div className="searchForm bg-[#2b2d31]">
        <input
          className="max-w-full border-0 outline-none bg-[#2b2d31]"
          type="textsearch"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => { setUsername(e.target.value) }}
          value={username}
        />
      </div>
      {console.log(users)}
      <div>
        {console.log(prop)}
        {users.map((user) => (
          <div className="flex items-center mt-2 hover:bg-[#2b2d31]" key={user.id} 
          onClick={prop.from ?  null : () => handleSelect(user)}>
            <img width="50px" src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
            {prop?.from === "AddFriend" && <i className="fa-solid fa-check ml-auto mr-2 cursor-pointer" onClick={() => handleSelect(user)}></i> }
          </div>
        ))}
      </div>
      {!err.length && <p>{err}</p>}
    </div>
  );
}

export default Search